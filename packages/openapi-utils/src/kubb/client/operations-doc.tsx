import { File, jsxRenderer } from "kubb/jsx";
import { ast, defineGenerator } from "kubb/kit";
import type { OperationsDoc, PluginClient } from "../plugin";
import { operationName, tagKey } from "../utils";

const defaultOperationsDoc: OperationsDoc = { callPrefix: "client.api", requestTarget: "client" };

function tableCell(text: string): string {
	return text.replace(/\s+/g, " ").trim().replace(/\|/g, "\\|");
}

function summaryOf(node: ast.HttpOperationNode): string {
	const text = node.summary || node.description?.split(/\n\s*\n/)[0] || "";
	return tableCell(text);
}

export const operationsDocGenerator = defineGenerator<PluginClient>({
	name: "operations-doc",
	renderer: jsxRenderer,
	operations(nodes, ctx) {
		const { callPrefix, requestTarget } = ctx.options.operationsDoc ?? defaultOperationsDoc;
		const operations = nodes.filter((node) => ast.isHttpOperationNode(node));

		const file = ctx.resolver.file({
			name: "OPERATIONS",
			extname: ".md",
			root: ctx.root,
			output: { path: "./OPERATIONS.md", mode: "file" },
		});

		// Grouped like operationsByTag, so the call column matches the client.api namespace.
		const nodesByTag = new Map<string, ast.HttpOperationNode[]>();
		for (const node of operations) {
			const tags = node.tags.length > 0 ? node.tags : ["default"];
			for (const key of new Set(tags.map(tagKey))) {
				nodesByTag.set(key, [...(nodesByTag.get(key) ?? []), node]);
			}
		}

		const header = callPrefix
			? "| Call | Request | Summary |\n| --- | --- | --- |"
			: "| Request | Summary |\n| --- | --- |";

		const sections = Array.from(nodesByTag, ([tag, tagNodes]) => {
			const rows = tagNodes.map((node) => {
				const request = `\`${node.method.toUpperCase()} ${node.path}\``;
				const cells = callPrefix
					? [`\`${callPrefix}.${tag}.${operationName(ctx, node)}\``, request, summaryOf(node)]
					: [request, summaryOf(node)];
				return `| ${cells.join(" | ")} |`;
			});
			return `## ${tag}\n\n${header}\n${rows.join("\n")}`;
		});

		const api = [ctx.meta?.title, ctx.meta?.version].filter(Boolean).join(" ");
		const usage = callPrefix
			? `Call an operation as \`${callPrefix}.<tag>.<operation>(params)\`, or by its request as \`${requestTarget}.request("<METHOD> <path>", params)\`.`
			: `Call an operation by its request as \`${requestTarget}.request("<METHOD> <path>", params)\`.`;

		const intro = [
			"# Operations",
			`Generated from the ${api ? `${api} ` : ""}OpenAPI spec; do not edit. ${operations.length} operations. ${usage}`,
		].join("\n\n");

		return (
			<File baseName={file.baseName} path={file.path} meta={file.meta}>
				<File.Source>{`${intro}\n\n${sections.join("\n\n")}\n`}</File.Source>
			</File>
		);
	},
});
