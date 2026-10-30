import { describe, expect, it } from "vitest";
import { accessGroupBudgetSchema } from "./schemas";

describe("schemas", () => {
	it("accept a date-time with any RFC 3339 offset", () => {
		for (const budget_reset_at of [
			"2026-10-30T12:00:00Z",
			"2026-10-30T12:00:00.123456+00:00",
			"2026-10-30T14:00:00+02:00",
		]) {
			expect(accessGroupBudgetSchema.parse({ budget_id: "b", budget_reset_at })).toMatchObject({
				budget_reset_at,
			});
		}
	});
});
