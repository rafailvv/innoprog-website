import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ChildrenMobileMenu from "./ChildrenMobileMenu";

describe("children mobile menu", () => {
  it("uses the main landing menu and expands links to all six child courses", () => {
    const onOpenChange = vi.fn();
    const onApplication = vi.fn();
    render(<ChildrenMobileMenu open onOpenChange={onOpenChange} onApplication={onApplication} />);
    expect(screen.getByRole("dialog")).toHaveClass("site-mobile-menu", "site-mobile-menu--open");
    expect(screen.queryByRole("link", { name: "Программирование на Python" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Показать направления для детей" }));
    expect(screen.getByRole("link", { name: "Программирование на Python" })).toHaveAttribute("href", "/children/courses/python");
    expect(screen.getByRole("link", { name: "Игры своими руками" })).toHaveAttribute("href", "/children/courses/game-development");
    fireEvent.click(screen.getByRole("button", { name: "подобрать направление" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(onApplication).toHaveBeenCalledOnce();
  });
});
