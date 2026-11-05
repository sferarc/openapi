import { ApiConfig, createEffectApi, createEffectByPath } from "@sferadev/openapi-utils/effect";
import { Effect, Layer } from "effect";
import {
	operationsByPath as accountOperationsByPath,
	operationsByTag as accountOperationsByTag,
} from "./account/generated/components";
import { operationsByPath, operationsByTag } from "./admin/generated/components";
import { realmBaseUrl } from "./utils/realm";

export const AdminApiService = createEffectApi(operationsByTag);
export const adminEffectByPath = createEffectByPath(operationsByPath);

export const AccountApiService = createEffectApi(accountOperationsByTag);
export const accountEffectByPath = createEffectByPath(accountOperationsByPath);

// Account paths sit under the realm, so the server-wide layer's baseUrl is rebased onto it.
export const makeAccountLayer = (realm: string): Layer.Layer<ApiConfig, never, ApiConfig> =>
	Layer.effect(
		ApiConfig,
		Effect.gen(function* () {
			const config = yield* ApiConfig;
			return { ...config, baseUrl: realmBaseUrl(config.baseUrl ?? "", realm) };
		}),
	);

export type { ApiToken, EffectApi, EffectByPath } from "@sferadev/openapi-utils/effect";
export {
	ApiConfig,
	ApiError,
	makeApiLayer,
	NetworkError,
	ValidationError,
} from "@sferadev/openapi-utils/effect";
