import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "./CodeBlock";
import { CopyCodeButton } from "./CopyCodeButton";

beforeEach(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, get: () => undefined }); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); Reflect.deleteProperty(navigator, "clipboard"); Reflect.deleteProperty(document, "execCommand"); });

const code = 'if amount < 0:\n\tprint("<script>& test")\n';

describe("article code", () => {
  it("renders highlighted Python in source HTML without changing code or interpreting markup", () => {
    const html = renderToStaticMarkup(<CodeBlock block={{ type: "code", language: "python", caption: "Пример Python", code }} />);
    const node = document.createElement("div"); node.innerHTML = html;
    expect(node.querySelector("code")?.textContent).toBe(code);
    expect(node.querySelector("script")).toBeNull();
    expect(node.querySelector(".token.keyword")?.textContent).toBe("if");
    expect(node.querySelector("pre")?.tabIndex).toBe(0);
  });
  it("styles multiline Python literals using the grammar string alias", () => {
    const code = 'DATA = """category,amount\nЕда,350.50\n"""';
    const { container } = render(<CodeBlock block={{ type: "code", language: "python", caption: "CSV", code }} />);
    expect(container.querySelector(".token.triple-quoted-string.string")?.textContent).toBe('"""category,amount\nЕда,350.50\n"""');
    expect(container.querySelector("code")?.textContent).toBe(code);
  });
  it("highlights SQL and keeps plain text unchanged", () => {
    const { container, rerender } = render(<CodeBlock block={{ type: "code", language: "sql", caption: "SQL", code: "SELECT 1;" }} />);
    expect(container.querySelector(".token.keyword")?.textContent).toBe("SELECT");
    rerender(<CodeBlock block={{ type: "code", language: "text", caption: "Вывод", code: "  1\n  2\n" }} />);
    expect(container.querySelector("code")?.textContent).toBe("  1\n  2\n");
  });
  it("copies the original whitespace and reports success accessibly", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue({ writeText } as unknown as Clipboard);
    render(<CopyCodeButton code={code} caption="Python" />);
    fireEvent.click(screen.getByRole("button", { name: "Копировать код: Python" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Код скопирован"));
    expect(writeText).toHaveBeenCalledWith(code);
  });
  it("keeps focus and ignores repeat activation while a copy is pending", async () => {
    let finish!: () => void;
    const writeText = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue({ writeText } as unknown as Clipboard);
    render(<CopyCodeButton code={code} caption="Python" />);
    const button = screen.getByRole("button"); button.focus();
    fireEvent.click(button); fireEvent.click(button);
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled(); expect(button).toHaveFocus();
    expect(writeText).toHaveBeenCalledTimes(1);
    finish();
    await waitFor(() => expect(button).toHaveAttribute("aria-disabled", "false"));
    expect(button).toHaveFocus();
  });
  it("falls back when clipboard access is denied and restores focus", async () => {
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue({ writeText: vi.fn().mockRejectedValue(new Error("Denied")) } as unknown as Clipboard);
    const exec = vi.fn(() => true);
    Object.defineProperty(document, "execCommand", { value: exec, configurable: true });
    render(<CopyCodeButton code={code} caption="Python" />);
    const button = screen.getByRole("button"); button.focus(); fireEvent.click(button);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Код скопирован"));
    expect(exec).toHaveBeenCalledWith("copy"); expect(document.querySelector("textarea")).toBeNull();
    expect(button).toHaveFocus();
  });
  it("shows a useful error instead of false success when copying is unavailable", async () => {
    vi.spyOn(navigator, "clipboard", "get").mockReturnValue(undefined as unknown as Clipboard);
    Object.defineProperty(document, "execCommand", { value: vi.fn(() => false), configurable: true });
    render(<CopyCodeButton code={code} caption="Python" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Выделите код"));
    expect(screen.queryByText("Скопировано")).toBeNull();
    expect(document.querySelector("textarea")).toBeNull();
  });
});
