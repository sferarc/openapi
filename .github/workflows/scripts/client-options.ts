import { readFileSync } from "node:fs";
import path from "node:path";

function clientSource(root: string, pkg: string): string {
	return readFileSync(path.join(root, "packages", pkg, "src/client.ts"), "utf8");
}

export function clientClasses(root: string, pkg: string): string[] {
	return [...clientSource(root, pkg).matchAll(/^export class (\w+) \{/gm)].map(
		([, name]) => name ?? "",
	);
}

// The properties of a class's constructor options type, with whether each is optional.
export function constructorOptions(
	root: string,
	pkg: string,
	className: string,
): Map<string, boolean> {
	const source = clientSource(root, pkg);
	const classBody = source.split(`export class ${className} {`)[1] ?? "";
	const typeName = classBody.match(/constructor\(options: (\w+)\)/)?.[1];
	const declaration = source
		.split(new RegExp(`export (?:interface|type) ${typeName}\\b`))[1]
		?.split(/\n(?:\}|\);)\n/)[0];
	if (!typeName || !declaration)
		throw new Error(`No constructor options for ${className} in ${pkg}`);
	const withoutComments = declaration.replace(/\/\*[\s\S]*?\*\//g, "");
	return new Map(
		[...withoutComments.matchAll(/(\w+)(\??):/g)].map(([, name, optional]) => [
			name ?? "",
			optional === "?",
		]),
	);
}
