import { describe, expect, it } from "vitest";
import { siteUrl } from "../lib/site";
import robots from "./robots";
import sitemap from "./sitemap";

describe("metadata routes", () => {
	it("allows every crawler and points at the sitemap on the canonical host", () => {
		expect(robots()).toEqual({
			rules: { userAgent: "*", allow: "/" },
			sitemap: "https://openapi.sferadev.com/sitemap.xml",
		});
	});

	it("lists the home page on the canonical host", () => {
		expect(sitemap().map((entry) => entry.url)).toEqual([siteUrl]);
	});
});
