import { describe, expect, it } from "vitest";
import { toolCategories, tools } from "./registry";

describe("tool registry", () => {
  it("assigns every tool to one stable category", () => {
    const categoryIds = toolCategories.map((category) => category.id);
    expect(new Set(categoryIds).size).toBe(categoryIds.length);
    expect(tools.every((tool) => categoryIds.includes(tool.category))).toBe(true);
  });
});
