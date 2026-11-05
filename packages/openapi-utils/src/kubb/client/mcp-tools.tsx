import { pluginZodName } from "@kubb/plugin-zod";
import { File, jsxRenderer } from "kubb/jsx";
import { ast, defineGenerator } from "kubb/kit";
import type { McpTools, PluginClient } from "../plugin";
import { fileBanner } from "../utils";

// The tool name pattern MCP clients such as Claude accept.
const TOOL_NAME = /^[A-Za-z0-9_-]{1,64}$/;

function snakeCase(text: string): string {
	return text
		.replace(/([a-z0-9])([A-Z])/g, "$1_$2")
		.replace(/[^A-Za-z0-9]+/g, "_")
		.replace(/^_+|_+$/g, "")
		.toLowerCase();
}

function withoutPrefix(path: string, prefix: string | undefined): string {
	if (!prefix || !path.startsWith(`${prefix}/`)) return path;
	return path.slice(prefix.length);
}

/** `GET /users/{userId}/groups` becomes `get_users_groups`; a param not followed by a literal segment stays as `by_<name>`. */
export function toolName(
	method: string,
	path: string,
	{ stripPathPrefix, everyParam = false }: McpTools & { everyParam?: boolean },
): string {
	const segments = withoutPrefix(path, stripPathPrefix).split("/").filter(Boolean);
	const parts = [method.toLowerCase()];
	segments.forEach((segment, index) => {
		const param = /^\{(.+)\}$/.exec(segment)?.[1];
		if (param === undefined) {
			parts.push(snakeCase(segment));
			return;
		}
		const next = segments[index + 1];
		if (everyParam || next === undefined || next.startsWith("{")) {
			parts.push(`by_${snakeCase(param)}`);
		}
	});
	return parts.filter(Boolean).join("_");
}

function firstSentence(node: ast.HttpOperationNode): string {
	const text = (node.summary || node.description?.split(/\n\s*\n/)[0] || "")
		.replace(/\s+/g, " ")
		.trim();
	return /^.+?[.!?](?=\s|$)/.exec(text)?.[0] ?? text;
}

function toolDescription(node: ast.HttpOperationNode): string {
	const sentence = firstSentence(node);
	const pathParams = node.parameters.filter((param) => param.in === "path").map((p) => p.name);
	const params = pathParams.length > 0 ? `Path parameters: ${pathParams.join(", ")}.` : "";
	const ending = sentence && !/[.!?]$/.test(sentence) ? "." : "";
	return [sentence && `${sentence}${ending}`, params].filter(Boolean).join(" ");
}

function annotations(method: string): string {
	if (method === "GET" || method === "HEAD") return "{ readOnlyHint: true }";
	return `{ readOnlyHint: false, destructiveHint: ${method === "DELETE"} }`;
}

function paramsObject(schemas: [string, string][]): string {
	if (schemas.length === 0) return "{}";
	return `{ ${schemas.map(([key, schema]) => `${key}: ${schema}`).join(", ")} }`;
}

/** Gives each operation its short tool name, or the every-param form where short names collide. */
function uniqueToolNames(operations: ast.HttpOperationNode[], options: McpTools): string[] {
	const short = operations.map((node) => toolName(node.method, node.path, options));
	const counts = new Map<string, number>();
	for (const name of short) counts.set(name, (counts.get(name) ?? 0) + 1);

	const names = operations.map((node, index) =>
		(counts.get(short[index]) ?? 0) > 1
			? toolName(node.method, node.path, { ...options, everyParam: true })
			: short[index],
	);

	const seen = new Set<string>();
	const problems: string[] = [];
	names.forEach((name, index) => {
		const request = `${operations[index].method.toUpperCase()} ${operations[index].path}`;
		if (!TOOL_NAME.test(name)) problems.push(`${request}: "${name}" is not a valid MCP tool name`);
		if (seen.has(name)) problems.push(`${request}: "${name}" is already taken`);
		seen.add(name);
	});
	if (problems.length > 0) throw new Error(`MCP tool names:\n${problems.join("\n")}`);
	return names;
}

export const mcpToolsGenerator = defineGenerator<PluginClient>({
	name: "mcp-tools",
	renderer: jsxRenderer,
	operations(nodes, ctx) {
		const options = ctx.options.mcpTools;
		if (!options) return null;

		// The same operations operationsByPath keys, so every tool's request resolves there.
		const operations = nodes
			.filter((node) => ast.isHttpOperationNode(node))
			.filter((node) => node.operationId !== undefined);

		const file = ctx.resolver.file({
			name: "mcp-tools",
			extname: ".ts",
			root: ctx.root,
			output: { path: "./mcp-tools.ts", mode: "file" },
		});

		const zodOutput = ctx.requirePlugin(pluginZodName).options?.output ?? ctx.options.output;
		const zodResolver = ctx.getResolver(pluginZodName);
		const names = uniqueToolNames(operations, options);

		const imports = new Map<string, Set<string>>();
		const entries = operations.map((node, index) => {
			const zodFile = zodResolver.file({
				name: node.operationId,
				extname: ".ts",
				tag: node.tags[0] ?? "default",
				path: node.path,
				root: ctx.root,
				output: zodOutput,
			});
			const first = (where: ast.ParameterLocation) =>
				node.parameters.find((param) => param.in === where);
			const path = first("path");
			const query = first("query");
			const header = first("header");
			const params = {
				pathParams: path && zodResolver.param.path(node, path),
				queryParams: query && zodResolver.param.query(node, query),
				headers: header && zodResolver.param.headers(node, header),
				body: node.requestBody?.content?.[0]?.schema ? zodResolver.response.body(node) : undefined,
			};

			const schemas = Object.entries(params).filter(
				(entry): entry is [string, string] => entry[1] !== undefined,
			);
			const fileImports = imports.get(zodFile.path) ?? new Set();
			for (const [, schema] of schemas) fileImports.add(schema);
			imports.set(zodFile.path, fileImports);

			const method = node.method.toUpperCase();
			return [
				"\t{",
				`\t\tname: ${JSON.stringify(names[index])},`,
				`\t\trequest: ${JSON.stringify(`${method} ${node.path}`)},`,
				`\t\tdescription: ${JSON.stringify(toolDescription(node))},`,
				`\t\tannotations: ${annotations(method)},`,
				`\t\tparams: ${paramsObject(schemas)},`,
				"\t}",
			].join("\n");
		});

		return (
			<File baseName={file.baseName} path={file.path} meta={file.meta} {...fileBanner(ctx, file)}>
				{Array.from(imports, ([path, names]) => (
					<File.Import key={path} name={Array.from(names)} root={file.path} path={path} />
				))}

				<File.Source>{`\nexport const mcpTools = [\n${entries.join(",\n")}\n] as const;\n`}</File.Source>
			</File>
		);
	},
});
