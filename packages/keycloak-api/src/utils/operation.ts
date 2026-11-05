import type { FetcherConfig } from "./fetcher";

export type CallParams = Record<string, unknown> & { config?: Partial<FetcherConfig> };

type Operation = (params: CallParams) => Promise<unknown>;

export function findOperation(operations: Record<string, unknown>, endpoint: string): Operation {
	if (!Object.hasOwn(operations, endpoint)) throw new Error(`Unknown endpoint: ${endpoint}`);
	return operations[endpoint] as Operation;
}
