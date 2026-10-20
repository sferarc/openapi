import { describe, expect, it } from "vitest";
import { pluginClient, pluginClientName } from "./plugin";

const options = { output: { path: "generated" }, importPath: "../utils/fetcher" };

describe("pluginClient", () => {
	it("is a plugin named plugin-client that depends on plugin-ts", () => {
		const plugin = pluginClient(options);
		expect(plugin.name).toBe(pluginClientName);
		expect(plugin.meta).toEqual({ name: pluginClientName });
		expect(plugin.dependencies).toEqual(["plugin-ts"]);
		expect(plugin.options).toEqual(options);
	});

	it("defines setup instead of the pre-5.11 kubb:plugin:setup hook", () => {
		const plugin = pluginClient(options);
		expect(plugin.setup).toBeTypeOf("function");
		expect(plugin.hooks).not.toHaveProperty("kubb:plugin:setup");
	});
});
