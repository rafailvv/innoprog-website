import { act, cleanup, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { YandexSmartCaptcha, type YandexSmartCaptchaHandle } from "./YandexSmartCaptcha";

const widget = vi.hoisted(() => ({ props: null as null | {
  visible: boolean;
  onSuccess: (token: string) => void;
  onNetworkError: () => void;
  onJavascriptError: () => void;
  onChallengeHidden: () => void;
} }));
vi.mock("@yandex/smart-captcha", () => ({
  InvisibleSmartCaptcha: (props: NonNullable<typeof widget.props>) => {
    widget.props = props;
    return <div data-testid="captcha-widget" />;
  },
}));
afterEach(() => { cleanup(); widget.props = null; vi.useRealTimers(); });

function setup() {
  const ref = createRef<YandexSmartCaptchaHandle>();
  const result = render(<YandexSmartCaptcha ref={ref} />);
  return { ref, ...result };
}
function request(ref: React.RefObject<YandexSmartCaptchaHandle>) {
  let promise!: Promise<string>;
  act(() => { promise = ref.current!.requestToken(); });
  return promise;
}
describe("on-demand mandatory CAPTCHA", () => {
  it("does not mount the external widget on ordinary page visits", () => {
    const { queryByTestId } = setup();
    expect(queryByTestId("captcha-widget")).toBeNull();
    expect(widget.props).toBeNull();
  });
  it("keeps the first request pending until the loaded widget returns a token", async () => {
    const { ref, getByTestId } = setup();
    const token = request(ref);
    const settled = vi.fn();
    void token.then(settled);
    await act(async () => { await Promise.resolve(); });
    expect(settled).not.toHaveBeenCalled();
    expect(getByTestId("captcha-widget")).toBeTruthy();
    expect(widget.props?.visible).toBe(true);
    act(() => widget.props!.onSuccess("verified-token"));
    await expect(token).resolves.toBe("verified-token");
    expect(widget.props?.visible).toBe(false);
  });
  it("rejects a simultaneous request without replacing the pending one", async () => {
    const { ref } = setup();
    const token = request(ref);
    await expect(request(ref)).rejects.toThrow("captcha-in-progress");
    act(() => widget.props!.onSuccess("first-token"));
    await expect(token).resolves.toBe("first-token");
  });
  it.each(["onNetworkError", "onChallengeHidden"] as const)("rejects %s and permits another challenge", async (callback) => {
    const { ref } = setup();
    const token = request(ref);
    const rejected = expect(token).rejects.toThrow(callback === "onChallengeHidden" ? "captcha-closed" : "captcha-failed");
    act(() => widget.props![callback]());
    await rejected;
    const retry = request(ref);
    expect(widget.props?.visible).toBe(true);
    act(() => widget.props!.onSuccess("retry-token"));
    await expect(retry).resolves.toBe("retry-token");
  });
  it("rejects a failed script load immediately on retry so the form can explain reload", async () => {
    const { ref } = setup();
    const token = request(ref);
    const rejected = expect(token).rejects.toThrow("captcha-script-failed");
    act(() => widget.props!.onJavascriptError());
    await rejected;
    expect(widget.props?.visible).toBe(false);
    await expect(request(ref)).rejects.toThrow("captcha-script-failed");
  });
  it("times out a failed or indefinitely slow first load and permits retry", async () => {
    vi.useFakeTimers();
    const { ref } = setup();
    const token = request(ref);
    const rejected = expect(token).rejects.toThrow("captcha-timeout");
    await act(async () => { vi.advanceTimersByTime(120_000); });
    await rejected;
    const retry = request(ref);
    act(() => widget.props!.onSuccess("late-ready-token"));
    await expect(retry).resolves.toBe("late-ready-token");
    expect(vi.getTimerCount()).toBe(0);
  });
  it("rejects a pending request on unmount and ignores a late callback", async () => {
    const { ref, unmount } = setup();
    const token = request(ref);
    const callback = widget.props!.onSuccess;
    const rejected = expect(token).rejects.toThrow("captcha-unmounted");
    unmount();
    await rejected;
    expect(() => callback("late-token")).not.toThrow();
  });
});
