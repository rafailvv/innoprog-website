import { afterEach, describe, expect, it, vi } from "vitest";
import { trackApplicationSuccess, trackContactClick } from "./analytics";

describe("conversion tracking", () => {
  afterEach(() => { vi.unstubAllGlobals(); window.history.replaceState({}, "", "/"); });
  it("records only page, audience and form ID, excluding query data", () => {
    const ym = vi.fn(); vi.stubGlobal("ym", ym);
    window.history.replaceState({}, "", "/children/courses/python?email=private@example.test");
    trackApplicationSuccess("children-python");
    expect(ym).toHaveBeenCalledWith(110454081, "reachGoal", "application_success", { page_path: "/children/courses/python", audience: "children", form_id: "children-python" });
  });
  it("counts only the intended contact hosts without sending destination details", () => {
    const ym = vi.fn(); vi.stubGlobal("ym", ym);
    for (const href of ["https://t.me/innoprog_admin?start=private", "https://wa.me/79934099057?text=private", "tel:+79586067980", "https://t.me.example.test/", "/application"]) trackContactClick(href);
    expect(ym.mock.calls.map(call => call[2])).toEqual(["contact_telegram", "contact_whatsapp", "contact_phone"]);
    for (const call of ym.mock.calls) expect(call[3]).toEqual({ page_path: "/", audience: "adults" });
  });
  it("does not break applications when analytics is blocked", () => {
    vi.stubGlobal("ym", undefined);
    expect(() => trackApplicationSuccess("application-page")).not.toThrow();
    vi.stubGlobal("ym", () => { throw new Error("blocked"); });
    expect(() => trackApplicationSuccess("application-page")).not.toThrow();
  });
});
