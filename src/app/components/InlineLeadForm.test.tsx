import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { InlineLeadForm } from "./InlineLeadForm";
import { HomeLeadSection } from "./HomeLeadSection";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe("inline callback progressive disclosure", () => {
  it.each([false,true])("reveals the picker after a complete phone and clears it when the phone is removed (course=%s)", (course) => {
    const { container } = render(<InlineLeadForm course={course} />);
    const phone = screen.getByRole("textbox", { name:"Номер телефона" });
    expect(screen.queryByRole("radio")).toBeNull();
    expect(container.querySelector('[data-callback-reveal]')).toBeNull();
    fireEvent.change(phone, {target:{value:"+7 999"}});
    expect(screen.queryByRole("radio")).toBeNull();
    fireEvent.change(phone, {target:{value:"+7 (999) 000-00-00"}});
    expect(screen.getAllByRole("radio")).toHaveLength(6);
    fireEvent.click(screen.getByRole("radio",{name:"14:00–16:00"}));
    fireEvent.change(phone, {target:{value:"+7 (999) 000-00-01"}});
    expect(screen.getByRole("radio",{name:"14:00–16:00"})).toBeChecked();
    fireEvent.change(phone, {target:{value:""}});
    expect(screen.queryByRole("radio")).toBeNull();
    fireEvent.change(phone, {target:{value:"89990000000"}});
    expect(screen.getByRole("radio",{name:"Любое время"})).toBeChecked();
  });
  it("resets the phone and callback alongside native form fields after confirmed submission", () => {
    const { container } = render(<InlineLeadForm course />);
    fireEvent.change(screen.getByRole("textbox",{name:"Ваше имя"}),{target:{value:"Тест"}});
    fireEvent.change(screen.getByRole("textbox",{name:"Номер телефона"}),{target:{value:"89990000000"}});
    fireEvent.click(screen.getByRole("radio",{name:"16:00–18:00"}));
    act(()=>container.querySelector('form')!.reset());
    expect(screen.getByRole("textbox",{name:"Ваше имя"})).toHaveValue("");
    expect(screen.getByRole("textbox",{name:"Номер телефона"})).toHaveValue("");
    expect(screen.queryByRole("radio")).toBeNull();
  });
  it("keeps the home form and decorative background inside a single normal-flow section", () => {
    const { container } = render(<HomeLeadSection />);
    const section = container.querySelector('[data-home-lead-section]')!;
    expect(section.querySelector('form[data-inline-lead-form]')).not.toBeNull();
    expect(section.querySelector('[style]')).toBeNull();
    expect(section.querySelector('[data-captcha-notice]')?.previousElementSibling?.tagName).toBe("BUTTON");
  });
});
