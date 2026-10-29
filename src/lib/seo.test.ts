import { describe, expect, it } from "vitest";
import { absolute, pageMetadata } from "./seo";

const base = { description: "d", path: "/x" };

describe("pageMetadata", () => {
  it("adds the name suffix to short titles", () => {
    expect(pageMetadata({ ...base, title: "Research" }).title).toBe("Research");
  });

  it("skips the suffix when the title would pass 60 characters", () => {
    const title = "Read NRB Working Paper No. 65 online, page by page, with downloads";
    expect(pageMetadata({ ...base, title }).title).toEqual({ absolute: title });
  });

  it("skips the suffix when the title already names the person", () => {
    const title = "CV: Swostik Nepal, Software Developer";
    expect(pageMetadata({ ...base, title }).title).toEqual({ absolute: title });
  });

  it("sets the canonical URL to the page path", () => {
    expect(pageMetadata({ ...base, title: "T" }).alternates?.canonical).toBe("/x");
  });
});

describe("absolute", () => {
  it("does not add a trailing slash for the home page", () => expect(absolute("/")).toBe(absolute()));
  it("joins paths onto the site URL", () => expect(absolute("/research")).toMatch(/^https?:\/\/[^/]+\/research$/));
});
