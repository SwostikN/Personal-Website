import { describe, expect, it } from "vitest";
import { formatDate, formatRange, rfc822 } from "./format";

describe("formatDate", () => {
  it("formats a month", () => expect(formatDate("2025-09")).toBe("Sep 2025"));
  it("formats a full date without a leading zero", () => expect(formatDate("2026-10-02")).toBe("2 Oct 2026"));
  it("passes a bare year through", () => expect(formatDate("2026")).toBe("2026"));
});

describe("formatRange", () => {
  it("joins start and end with an en dash", () => expect(formatRange("2025-05", "2025-07")).toBe("May 2025 – Jul 2025"));
  it("says Present when there is no end", () => expect(formatRange("2025-09")).toBe("Sep 2025 – Present"));
});

describe("rfc822", () => {
  it("works out the weekday without a Date object", () => {
    expect(rfc822("2026-10-29")).toBe("Thu, 29 Oct 2026 00:00:00 +0545");
    expect(rfc822("2024-02-29")).toBe("Thu, 29 Feb 2024 00:00:00 +0545");
    expect(rfc822("2026-01-01")).toBe("Thu, 01 Jan 2026 00:00:00 +0545");
  });
});
