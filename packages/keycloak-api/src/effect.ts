import { createEffectApi, createEffectByPath } from "@sferadev/openapi-utils/effect";
import { operationsByPath, operationsByTag } from "./admin/generated/components";

export const AdminApiService = createEffectApi(operationsByTag);
export const adminEffectByPath = createEffectByPath(operationsByPath);

export type { ApiToken, EffectApi, EffectByPath } from "@sferadev/openapi-utils/effect";
export {
	ApiConfig,
	ApiError,
	makeApiLayer,
	NetworkError,
	ValidationError,
} from "@sferadev/openapi-utils/effect";
