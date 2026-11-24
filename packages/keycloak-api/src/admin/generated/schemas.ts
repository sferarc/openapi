// @ts-nocheck

import * as z from "zod";

export const logicSchema = z.enum(["NEGATIVE", "POSITIVE"]);

export const decisionStrategySchema = z.enum(["AFFIRMATIVE", "CONSENSUS", "UNANIMOUS"]);

export const policyRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	type: z.string().optional(),
	policies: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	resources: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	logic: logicSchema.optional(),
	decisionStrategy: decisionStrategySchema.optional(),
	owner: z.string().optional(),
	resourceType: z.string().optional(),
	get resourcesData(): z.ZodOptional<z.ZodArray<typeof resourceRepresentationSchema>> {
		return z
			.array(resourceRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	get scopesData(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	config: z.record(z.string(), z.string()).optional(),
});

export const scopeRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	iconUri: z.string().optional(),
	get policies(): z.ZodOptional<z.ZodArray<typeof policyRepresentationSchema>> {
		return z.array(policyRepresentationSchema).optional();
	},
	get resources(): z.ZodOptional<z.ZodArray<typeof resourceRepresentationSchema>> {
		return z.array(resourceRepresentationSchema).optional();
	},
	displayName: z.string().optional(),
});

export const resourceOwnerRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
});

export const resourceRepresentationSchema = z.object({
	_id: z.string().optional(),
	name: z.string().optional(),
	uris: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	type: z.string().optional(),
	get scopes(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	icon_uri: z.string().optional(),
	owner: resourceOwnerRepresentationSchema.optional(),
	ownerManagedAccess: z.boolean().optional(),
	displayName: z.string().optional(),
	attributes: z.record(z.string(), z.array(z.string())).optional(),
	uri: z.string().optional(),
	get scopesUma(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
});

export const abstractPolicyRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	type: z.string().optional(),
	policies: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	resources: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	logic: logicSchema.optional(),
	decisionStrategy: decisionStrategySchema.optional(),
	owner: z.string().optional(),
	resourceType: z.string().optional(),
	get resourcesData(): z.ZodOptional<z.ZodArray<typeof resourceRepresentationSchema>> {
		return z
			.array(resourceRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	get scopesData(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
});

export const accessSchema = z.object({
	roles: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	verify_caller: z.boolean().optional(),
});

export const permissionSchema = z.object({
	rsid: z.string().optional(),
	rsname: z.string().optional(),
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	claims: z
		.record(
			z.string(),
			z.array(z.string()).refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			}),
		)
		.optional(),
});

export const authorizationSchema = z.object({
	permissions: z.array(permissionSchema).optional(),
});

export const confirmationSchema = z.object({
	"x5t#S256": z.string().optional(),
	jkt: z.string().optional(),
	"kc-jkt-type": z.string().optional(),
});

export const authorizationDetailsJSONRepresentationSchema = z.object({
	type: z.string().optional(),
	locations: z.array(z.string()).optional(),
	actions: z.array(z.string()).optional(),
	datatypes: z.array(z.string()).optional(),
	identifier: z.string().optional(),
	privileges: z.array(z.string()).optional(),
	customData: z.record(z.string(), z.unknown()).optional(),
});

export const accessTokenSchema = z.object({
	jti: z.string().optional(),
	exp: z.int().optional(),
	nbf: z.int().optional(),
	iat: z.int().optional(),
	iss: z.string().optional(),
	sub: z.string().optional(),
	typ: z.string().optional(),
	azp: z.string().optional(),
	otherClaims: z.record(z.string(), z.unknown()).optional(),
	nonce: z.string().optional(),
	auth_time: z.int().optional(),
	sid: z.string().optional(),
	at_hash: z.string().optional(),
	c_hash: z.string().optional(),
	name: z.string().optional(),
	given_name: z.string().optional(),
	family_name: z.string().optional(),
	middle_name: z.string().optional(),
	nickname: z.string().optional(),
	preferred_username: z.string().optional(),
	profile: z.string().optional(),
	picture: z.string().optional(),
	website: z.string().optional(),
	email: z.string().optional(),
	email_verified: z.boolean().optional(),
	gender: z.string().optional(),
	birthdate: z.string().optional(),
	zoneinfo: z.string().optional(),
	locale: z.string().optional(),
	phone_number: z.string().optional(),
	phone_number_verified: z.boolean().optional(),
	updated_at: z.int().optional(),
	claims_locales: z.string().optional(),
	acr: z.string().optional(),
	s_hash: z.string().optional(),
	"trusted-certs": z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	"allowed-origins": z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	realm_access: accessSchema.optional(),
	resource_access: z.record(z.string(), accessSchema).optional(),
	authorization: authorizationSchema.optional(),
	cnf: confirmationSchema.optional(),
	scope: z.string().optional(),
	authorization_details: z.array(authorizationDetailsJSONRepresentationSchema).optional(),
});

export const authDetailsRepresentationSchema = z.object({
	realmId: z.string().optional(),
	clientId: z.string().optional(),
	userId: z.string().optional(),
	ipAddress: z.string().optional(),
});

export const adminEventRepresentationSchema = z.object({
	id: z.string().optional(),
	time: z.int().optional(),
	realmId: z.string().optional(),
	authDetails: authDetailsRepresentationSchema.optional(),
	operationType: z.string().optional(),
	resourceType: z.string().optional(),
	resourcePath: z.string().optional(),
	representation: z.string().optional(),
	error: z.string().optional(),
	details: z.record(z.string(), z.string()).optional(),
});

export const protocolMapperRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	protocol: z.string().optional(),
	protocolMapper: z.string().optional(),
	consentRequired: z.boolean().optional(),
	consentText: z.string().optional(),
	config: z.record(z.string(), z.string()).optional(),
});

export const policyEnforcementModeSchema = z.enum(["DISABLED", "ENFORCING", "PERMISSIVE"]);

export const resourceTypeSchema = z.object({
	type: z.string().optional(),
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	scopeAliases: z
		.record(
			z.string(),
			z.array(z.string()).refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			}),
		)
		.optional(),
	groupType: z.string().optional(),
});

export const authorizationSchemaSchema = z.object({
	resourceTypes: z.record(z.string(), resourceTypeSchema).optional(),
});

export const resourceServerRepresentationSchema = z.object({
	id: z.string().optional(),
	clientId: z.string().optional(),
	name: z.string().optional(),
	allowRemoteResourceManagement: z.boolean().optional(),
	policyEnforcementMode: policyEnforcementModeSchema.optional(),
	get resources(): z.ZodOptional<z.ZodArray<typeof resourceRepresentationSchema>> {
		return z.array(resourceRepresentationSchema).optional();
	},
	get policies(): z.ZodOptional<z.ZodArray<typeof policyRepresentationSchema>> {
		return z.array(policyRepresentationSchema).optional();
	},
	get scopes(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z.array(scopeRepresentationSchema).optional();
	},
	decisionStrategy: decisionStrategySchema.optional(),
	authorizationSchema: authorizationSchemaSchema.optional(),
});

export const claimRepresentationSchema = z.object({
	name: z.boolean().optional(),
	username: z.boolean().optional(),
	profile: z.boolean().optional(),
	picture: z.boolean().optional(),
	website: z.boolean().optional(),
	email: z.boolean().optional(),
	gender: z.boolean().optional(),
	locale: z.boolean().optional(),
	address: z.boolean().optional(),
	phone: z.boolean().optional(),
});

/**
 * @deprecated
 */
export const applicationRepresentationSchema = z.object({
	id: z.string().optional(),
	clientId: z.string().optional(),
	description: z.string().optional(),
	type: z.string().optional(),
	rootUrl: z.string().optional(),
	adminUrl: z.string().optional(),
	baseUrl: z.string().optional(),
	surrogateAuthRequired: z.boolean().optional(),
	enabled: z.boolean().optional(),
	alwaysDisplayInConsole: z.boolean().optional(),
	clientAuthenticatorType: z.string().optional(),
	secret: z.string().optional(),
	registrationAccessToken: z.string().optional(),
	defaultRoles: z.array(z.string()).optional(),
	redirectUris: z.array(z.string()).optional(),
	webOrigins: z.array(z.string()).optional(),
	notBefore: z.int32().optional(),
	bearerOnly: z.boolean().optional(),
	consentRequired: z.boolean().optional(),
	standardFlowEnabled: z.boolean().optional(),
	implicitFlowEnabled: z.boolean().optional(),
	directAccessGrantsEnabled: z.boolean().optional(),
	serviceAccountsEnabled: z.boolean().optional(),
	authorizationServicesEnabled: z.boolean().optional(),
	directGrantsOnly: z.boolean().optional(),
	publicClient: z.boolean().optional(),
	frontchannelLogout: z.boolean().optional(),
	protocol: z.string().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	authenticationFlowBindingOverrides: z.record(z.string(), z.string()).optional(),
	fullScopeAllowed: z.boolean().optional(),
	nodeReRegistrationTimeout: z.int32().optional(),
	registeredNodes: z.record(z.string(), z.int32()).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
	clientTemplate: z.string().optional(),
	useTemplateConfig: z.boolean().optional(),
	useTemplateScope: z.boolean().optional(),
	useTemplateMappers: z.boolean().optional(),
	defaultClientScopes: z.array(z.string()).optional(),
	optionalClientScopes: z.array(z.string()).optional(),
	authorizationSettings: resourceServerRepresentationSchema.optional(),
	access: z.record(z.string(), z.boolean()).optional(),
	origin: z.string().optional(),
	name: z.string().optional(),
	claims: claimRepresentationSchema.optional(),
});

export const authenticationExecutionExportRepresentationSchema = z.object({
	authenticatorConfig: z.string().optional(),
	authenticator: z.string().optional(),
	authenticatorFlow: z.boolean().optional(),
	requirement: z.string().optional(),
	priority: z.int32().optional(),
	autheticatorFlow: z.boolean().optional(),
	flowAlias: z.string().optional(),
	userSetupAllowed: z.boolean().optional(),
});

export const authenticationExecutionInfoRepresentationSchema = z.object({
	id: z.string().optional(),
	requirement: z.string().optional(),
	displayName: z.string().optional(),
	alias: z.string().optional(),
	description: z.string().optional(),
	requirementChoices: z.array(z.string()).optional(),
	configurable: z.boolean().optional(),
	authenticationFlow: z.boolean().optional(),
	providerId: z.string().optional(),
	authenticationConfig: z.string().optional(),
	flowId: z.string().optional(),
	level: z.int32().optional(),
	index: z.int32().optional(),
	priority: z.int32().optional(),
});

export const authenticationExecutionRepresentationSchema = z.object({
	authenticatorConfig: z.string().optional(),
	authenticator: z.string().optional(),
	authenticatorFlow: z.boolean().optional(),
	requirement: z.string().optional(),
	priority: z.int32().optional(),
	autheticatorFlow: z.boolean().optional(),
	id: z.string().optional(),
	flowId: z.string().optional(),
	parentFlow: z.string().optional(),
});

export const authenticationFlowRepresentationSchema = z.object({
	id: z.string().optional(),
	alias: z.string().optional(),
	description: z.string().optional(),
	providerId: z.string().optional(),
	topLevel: z.boolean().optional(),
	builtIn: z.boolean().optional(),
	authenticationExecutions: z.array(authenticationExecutionExportRepresentationSchema).optional(),
});

export const configPropertyRepresentationSchema = z.object({
	name: z.string().optional(),
	label: z.string().optional(),
	helpText: z.string().optional(),
	type: z.string().optional(),
	defaultValue: z.unknown().optional(),
	options: z.array(z.string()).optional(),
	secret: z.boolean().optional(),
	required: z.boolean().optional(),
	readOnly: z.boolean().optional(),
});

export const authenticatorConfigInfoRepresentationSchema = z.object({
	name: z.string().optional(),
	providerId: z.string().optional(),
	helpText: z.string().optional(),
	properties: z.array(configPropertyRepresentationSchema).optional(),
});

export const authenticatorConfigRepresentationSchema = z.object({
	id: z.string().optional(),
	alias: z.string().optional(),
	config: z.record(z.string(), z.string()).optional(),
});

export const bruteForceStrategySchema = z.enum(["LINEAR", "MULTIPLE"]);

export const certificateRepresentationSchema = z.object({
	privateKey: z.string().optional(),
	publicKey: z.string().optional(),
	certificate: z.string().optional(),
	kid: z.string().optional(),
	jwks: z.string().optional(),
});

export const clientInitialAccessCreatePresentationSchema = z.object({
	expiration: z.int32().optional(),
	count: z.int32().optional(),
	webOrigins: z.array(z.string()).optional(),
});

export const clientInitialAccessPresentationSchema = z.object({
	id: z.string().optional(),
	token: z.string().optional(),
	timestamp: z.int32().optional(),
	expiration: z.int32().optional(),
	count: z.int32().optional(),
	remainingCount: z.int32().optional(),
});

export const compositesSchema = z.object({
	realm: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	client: z.record(z.string(), z.array(z.string())).optional(),
	application: z.record(z.string(), z.array(z.string())).optional(),
});

export const roleRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	scopeParamRequired: z.boolean().optional(),
	composite: z.boolean().optional(),
	composites: compositesSchema.optional(),
	clientRole: z.boolean().optional(),
	containerId: z.string().optional(),
	attributes: z.record(z.string(), z.array(z.string())).optional(),
});

export const clientMappingsRepresentationSchema = z.object({
	id: z.string().optional(),
	client: z.string().optional(),
	mappings: z.array(roleRepresentationSchema).optional(),
});

export const rawJsonValueSchema = z.object({
	value: z.unknown().optional(),
	empty: z.boolean().optional(),
});

export const clientPolicyConditionRepresentationSchema = z.object({
	condition: z.string().optional(),
	configuration: rawJsonValueSchema.optional().describe("Configuration settings as a JSON object"),
});

export const clientPolicyRepresentationSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	enabled: z.boolean().optional(),
	mode: z.string().optional(),
	conditions: z.array(clientPolicyConditionRepresentationSchema).optional(),
	profiles: z.array(z.string()).optional(),
});

export const clientPoliciesRepresentationSchema = z.object({
	policies: z.array(clientPolicyRepresentationSchema).optional(),
	globalPolicies: z.array(clientPolicyRepresentationSchema).optional(),
});

export const clientPolicyExecutorRepresentationSchema = z.object({
	executor: z.string().optional(),
	configuration: rawJsonValueSchema.optional().describe("Configuration settings as a JSON object"),
});

export const clientProfileRepresentationSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	executors: z.array(clientPolicyExecutorRepresentationSchema).optional(),
});

export const clientProfilesRepresentationSchema = z.object({
	profiles: z.array(clientProfileRepresentationSchema).optional(),
	globalProfiles: z.array(clientProfileRepresentationSchema).optional(),
});

export const clientRepresentationSchema = z.object({
	id: z.string().optional(),
	clientId: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	type: z.string().optional(),
	rootUrl: z.string().optional(),
	adminUrl: z.string().optional(),
	baseUrl: z.string().optional(),
	surrogateAuthRequired: z.boolean().optional(),
	enabled: z.boolean().optional(),
	alwaysDisplayInConsole: z.boolean().optional(),
	clientAuthenticatorType: z.string().optional(),
	secret: z.string().optional(),
	registrationAccessToken: z.string().optional(),
	defaultRoles: z.array(z.string()).optional(),
	redirectUris: z.array(z.string()).optional(),
	webOrigins: z.array(z.string()).optional(),
	notBefore: z.int32().optional(),
	bearerOnly: z.boolean().optional(),
	consentRequired: z.boolean().optional(),
	standardFlowEnabled: z.boolean().optional(),
	implicitFlowEnabled: z.boolean().optional(),
	directAccessGrantsEnabled: z.boolean().optional(),
	serviceAccountsEnabled: z.boolean().optional(),
	authorizationServicesEnabled: z.boolean().optional(),
	directGrantsOnly: z.boolean().optional(),
	publicClient: z.boolean().optional(),
	frontchannelLogout: z.boolean().optional(),
	protocol: z.string().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	authenticationFlowBindingOverrides: z.record(z.string(), z.string()).optional(),
	fullScopeAllowed: z.boolean().optional(),
	nodeReRegistrationTimeout: z.int32().optional(),
	registeredNodes: z.record(z.string(), z.int32()).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
	clientTemplate: z.string().optional(),
	useTemplateConfig: z.boolean().optional(),
	useTemplateScope: z.boolean().optional(),
	useTemplateMappers: z.boolean().optional(),
	defaultClientScopes: z.array(z.string()).optional(),
	optionalClientScopes: z.array(z.string()).optional(),
	authorizationSettings: resourceServerRepresentationSchema.optional(),
	access: z.record(z.string(), z.boolean()).optional(),
	origin: z.string().optional(),
});

export const clientScopeRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	protocol: z.string().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
});

/**
 * @deprecated
 */
export const clientTemplateRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	protocol: z.string().optional(),
	fullScopeAllowed: z.boolean().optional(),
	bearerOnly: z.boolean().optional(),
	consentRequired: z.boolean().optional(),
	standardFlowEnabled: z.boolean().optional(),
	implicitFlowEnabled: z.boolean().optional(),
	directAccessGrantsEnabled: z.boolean().optional(),
	serviceAccountsEnabled: z.boolean().optional(),
	publicClient: z.boolean().optional(),
	frontchannelLogout: z.boolean().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
});

export const propertyConfigSchema = z.object({
	applicable: z.boolean().optional(),
	value: z.unknown().optional(),
});

export const clientTypeRepresentationSchema = z.object({
	name: z.string().optional(),
	provider: z.string().optional(),
	parent: z.string().optional(),
	config: z.record(z.string(), propertyConfigSchema).optional(),
});

export const clientTypesRepresentationSchema = z.object({
	"client-types": z.array(clientTypeRepresentationSchema).optional(),
	"global-client-types": z.array(clientTypeRepresentationSchema).optional(),
});

export const multivaluedHashMapStringComponentExportRepresentationSchema = z.record(
	z.string(),
	z.array(z.lazy(() => componentExportRepresentationSchema)),
);

export const multivaluedHashMapStringStringSchema = z.record(z.string(), z.array(z.string()));

export const componentExportRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	providerId: z.string().optional(),
	subType: z.string().optional(),
	get subComponents(): z.ZodOptional<
		typeof multivaluedHashMapStringComponentExportRepresentationSchema
	> {
		return multivaluedHashMapStringComponentExportRepresentationSchema.optional();
	},
	config: multivaluedHashMapStringStringSchema.optional(),
});

export const componentRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	providerId: z.string().optional(),
	providerType: z.string().optional(),
	parentId: z.string().optional(),
	subType: z.string().optional(),
	config: multivaluedHashMapStringStringSchema.optional(),
});

export const componentTypeRepresentationSchema = z.object({
	id: z.string().optional(),
	helpText: z.string().optional(),
	properties: z.array(configPropertyRepresentationSchema).optional(),
	clientProperties: z.array(configPropertyRepresentationSchema).optional(),
	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const credentialRepresentationSchema = z.object({
	id: z.string().optional(),
	type: z.string().optional(),
	userLabel: z.string().optional(),
	createdDate: z.int().optional(),
	secretData: z.string().optional(),
	credentialData: z.string().optional(),
	priority: z.int32().optional(),
	value: z.string().optional(),
	temporary: z.boolean().optional(),
	device: z.string().optional(),
	hashedSaltedValue: z.string().optional(),
	salt: z.string().optional(),
	hashIterations: z.int32().optional(),
	counter: z.int32().optional(),
	algorithm: z.string().optional(),
	digits: z.int32().optional(),
	period: z.int32().optional(),
	config: multivaluedHashMapStringStringSchema.optional(),
	federationLink: z.string().optional(),
});

export const decisionEffectSchema = z.enum(["DENY", "PERMIT"]);

export const errorRepresentationSchema = z.object({
	field: z.string().optional(),
	errorMessage: z.string().optional(),
	params: z.array(z.unknown()).optional(),
	get errors(): z.ZodOptional<z.ZodArray<typeof errorRepresentationSchema>> {
		return z.array(errorRepresentationSchema).optional();
	},
});

export const policyResultRepresentationSchema = z.object({
	get policy(): z.ZodOptional<typeof policyRepresentationSchema> {
		return policyRepresentationSchema.optional();
	},
	status: decisionEffectSchema.optional(),
	get associatedPolicies(): z.ZodOptional<z.ZodArray<typeof policyResultRepresentationSchema>> {
		return z.array(policyResultRepresentationSchema).optional();
	},
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	resourceType: z.string().optional(),
});

export const evaluationResultRepresentationSchema = z.object({
	get resource(): z.ZodOptional<typeof resourceRepresentationSchema> {
		return resourceRepresentationSchema.optional();
	},
	get scopes(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z.array(scopeRepresentationSchema).optional();
	},
	get policies(): z.ZodOptional<z.ZodArray<typeof policyResultRepresentationSchema>> {
		return z
			.array(policyResultRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	status: decisionEffectSchema.optional(),
	get allowedScopes(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
	get deniedScopes(): z.ZodOptional<z.ZodArray<typeof scopeRepresentationSchema>> {
		return z
			.array(scopeRepresentationSchema)
			.refine((items) => new Set(items).size === items.length, {
				message: "Array entries must be unique",
			})
			.optional();
	},
});

export const eventRepresentationSchema = z.object({
	id: z.string().optional(),
	time: z.int().optional(),
	type: z.string().optional(),
	realmId: z.string().optional(),
	clientId: z.string().optional(),
	userId: z.string().optional(),
	sessionId: z.string().optional(),
	ipAddress: z.string().optional(),
	error: z.string().optional(),
	details: z.record(z.string(), z.string()).optional(),
});

export const federatedIdentityRepresentationSchema = z.object({
	identityProvider: z.string().optional(),
	userId: z.string().optional(),
	userName: z.string().optional(),
});

export const globalRequestResultSchema = z.object({
	successRequests: z.array(z.string()).optional(),
	failedRequests: z.array(z.string()).optional(),
});

export const groupRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	path: z.string().optional(),
	parentId: z.string().optional(),
	subGroupCount: z.int().optional(),
	get subGroups(): z.ZodOptional<z.ZodArray<typeof groupRepresentationSchema>> {
		return z.array(groupRepresentationSchema).optional();
	},
	attributes: z.record(z.string(), z.array(z.string())).optional(),
	realmRoles: z.array(z.string()).optional(),
	clientRoles: z.record(z.string(), z.array(z.string())).optional(),
	access: z.record(z.string(), z.boolean()).optional(),
});

export const IDTokenSchema = z.object({
	jti: z.string().optional(),
	exp: z.int().optional(),
	nbf: z.int().optional(),
	iat: z.int().optional(),
	iss: z.string().optional(),
	sub: z.string().optional(),
	typ: z.string().optional(),
	azp: z.string().optional(),
	otherClaims: z.record(z.string(), z.unknown()).optional(),
	nonce: z.string().optional(),
	auth_time: z.int().optional(),
	sid: z.string().optional(),
	at_hash: z.string().optional(),
	c_hash: z.string().optional(),
	name: z.string().optional(),
	given_name: z.string().optional(),
	family_name: z.string().optional(),
	middle_name: z.string().optional(),
	nickname: z.string().optional(),
	preferred_username: z.string().optional(),
	profile: z.string().optional(),
	picture: z.string().optional(),
	website: z.string().optional(),
	email: z.string().optional(),
	email_verified: z.boolean().optional(),
	gender: z.string().optional(),
	birthdate: z.string().optional(),
	zoneinfo: z.string().optional(),
	locale: z.string().optional(),
	phone_number: z.string().optional(),
	phone_number_verified: z.boolean().optional(),
	updated_at: z.int().optional(),
	claims_locales: z.string().optional(),
	acr: z.string().optional(),
	s_hash: z.string().optional(),
});

export const identityProviderMapperRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	identityProviderAlias: z.string().optional(),
	identityProviderMapper: z.string().optional(),
	config: z.record(z.string(), z.string()).optional(),
});

export const identityProviderMapperTypeRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	category: z.string().optional(),
	helpText: z.string().optional(),
	properties: z.array(configPropertyRepresentationSchema).optional(),
});

export const organizationIdentityProviderLinkRepresentationSchema = z.object({
	organizationId: z.string().optional(),
	autoMembership: z.boolean().optional(),
	membershipType: z.string().optional(),
});

export const identityProviderRepresentationSchema = z.object({
	alias: z.string().optional(),
	displayName: z.string().optional(),
	internalId: z.string().optional(),
	providerId: z.string().optional(),
	enabled: z.boolean().optional(),
	updateProfileFirstLoginMode: z.string().optional(),
	trustEmail: z.boolean().optional(),
	storeToken: z.boolean().optional(),
	addReadTokenRoleOnCreate: z.boolean().optional(),
	authenticateByDefault: z.boolean().optional(),
	linkOnly: z.boolean().optional(),
	hideOnLogin: z.boolean().optional(),
	firstBrokerLoginFlowAlias: z.string().optional(),
	postBrokerLoginFlowAlias: z.string().optional(),
	organizationLinks: z.array(organizationIdentityProviderLinkRepresentationSchema).optional(),
	config: z.record(z.string(), z.string()).optional(),
	types: z.array(z.string()).optional(),
	updateProfileFirstLogin: z.boolean().optional(),
	organizationId: z.string().optional(),
});

export const issuedVerifiableCredentialRepresentationSchema = z.object({
	id: z.string().optional(),
	userId: z.string().optional(),
	credentialType: z.string().optional(),
	issuedAt: z.int().optional(),
	expiresAt: z.int().optional(),
	clientId: z.string().optional(),
	clientName: z.string().optional(),
	clientBaseUrl: z.string().optional(),
	revision: z.string().optional(),
});

export const keyUseSchema = z.enum(["ENC", "JWT_SVID", "SIG"]);

export const keyMetadataRepresentationSchema = z.object({
	providerId: z.string().optional(),
	providerPriority: z.int().optional(),
	kid: z.string().optional(),
	status: z.string().optional(),
	type: z.string().optional(),
	algorithm: z.string().optional(),
	publicKey: z.string().optional(),
	certificate: z.string().optional(),
	use: keyUseSchema.optional(),
	validTo: z.int().optional(),
});

export const keyStoreConfigSchema = z.object({
	realmCertificate: z.boolean().optional(),
	storePassword: z.string().optional(),
	keyPassword: z.string().optional(),
	keyAlias: z.string().optional(),
	realmAlias: z.string().optional(),
	format: z.string().optional(),
	keySize: z.int32().optional(),
	validity: z.int32().optional(),
});

export const keysMetadataRepresentationSchema = z.object({
	active: z.record(z.string(), z.string()).optional(),
	keys: z.array(keyMetadataRepresentationSchema).optional(),
});

export const managementPermissionReferenceSchema = z.object({
	enabled: z.boolean().optional(),
	resource: z.string().optional(),
	scopePermissions: z.record(z.string(), z.string()).optional(),
});

export const mappingsRepresentationSchema = z.object({
	realmMappings: z.array(roleRepresentationSchema).optional(),
	clientMappings: z.record(z.string(), clientMappingsRepresentationSchema).optional(),
});

export const userProfileAttributeMetadataSchema = z.object({
	name: z.string().optional(),
	displayName: z.string().optional(),
	required: z.boolean().optional(),
	readOnly: z.boolean().optional(),
	annotations: z.record(z.string(), z.unknown()).optional(),
	validators: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
	group: z.string().optional(),
	multivalued: z.boolean().optional(),
	defaultValue: z.string().optional(),
});

export const userProfileAttributeGroupMetadataSchema = z.object({
	name: z.string().optional(),
	displayHeader: z.string().optional(),
	displayDescription: z.string().optional(),
	annotations: z.record(z.string(), z.unknown()).optional(),
});

export const userProfileMetadataSchema = z.object({
	attributes: z.array(userProfileAttributeMetadataSchema).optional(),
	groups: z.array(userProfileAttributeGroupMetadataSchema).optional(),
});

export const userConsentRepresentationSchema = z.object({
	clientId: z.string().optional(),
	grantedClientScopes: z.array(z.string()).optional(),
	createdDate: z.int().optional(),
	lastUpdatedDate: z.int().optional(),
	grantedRealmRoles: z.array(z.string()).optional(),
});

export const userVerifiableCredentialRepresentationSchema = z.object({
	credentialScopeName: z.string().optional(),
	credentialConfigurationId: z.string().optional(),
	revision: z.string().optional(),
	createdDate: z.int().optional(),
	updatedDate: z.int().optional(),
	userAttributes: z.record(z.string(), z.array(z.string())).optional(),
});

export const socialLinkRepresentationSchema = z.object({
	socialProvider: z.string().optional(),
	socialUserId: z.string().optional(),
	socialUsername: z.string().optional(),
});

export const membershipTypeSchema = z.enum(["MANAGED", "UNMANAGED"]);

export const memberRepresentationSchema = z.object({
	id: z.string().optional(),
	username: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().optional(),
	emailVerified: z.boolean().optional(),
	attributes: z.record(z.string(), z.array(z.string())).optional(),
	userProfileMetadata: userProfileMetadataSchema.optional(),
	enabled: z.boolean().optional(),
	self: z.string().optional(),
	origin: z.string().optional(),
	createdTimestamp: z.int().optional(),
	totp: z.boolean().optional(),
	federationLink: z.string().optional(),
	serviceAccountClientId: z.string().optional(),
	credentials: z.array(credentialRepresentationSchema).optional(),
	disableableCredentialTypes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	requiredActions: z.array(z.string()).optional(),
	federatedIdentities: z.array(federatedIdentityRepresentationSchema).optional(),
	realmRoles: z.array(z.string()).optional(),
	clientRoles: z.record(z.string(), z.array(z.string())).optional(),
	clientConsents: z.array(userConsentRepresentationSchema).optional(),
	notBefore: z.int32().optional(),
	verifiableCredentials: z.array(userVerifiableCredentialRepresentationSchema).optional(),
	issuedVerifiableCredentials: z.array(issuedVerifiableCredentialRepresentationSchema).optional(),
	applicationRoles: z.record(z.string(), z.array(z.string())).optional(),
	socialLinks: z.array(socialLinkRepresentationSchema).optional(),
	groups: z.array(z.string()).optional(),
	access: z.record(z.string(), z.boolean()).optional(),
	membershipType: membershipTypeSchema.optional(),
});

/**
 * @deprecated
 */
export const oAuthClientRepresentationSchema = z.object({
	id: z.string().optional(),
	clientId: z.string().optional(),
	description: z.string().optional(),
	type: z.string().optional(),
	rootUrl: z.string().optional(),
	adminUrl: z.string().optional(),
	baseUrl: z.string().optional(),
	surrogateAuthRequired: z.boolean().optional(),
	enabled: z.boolean().optional(),
	alwaysDisplayInConsole: z.boolean().optional(),
	clientAuthenticatorType: z.string().optional(),
	secret: z.string().optional(),
	registrationAccessToken: z.string().optional(),
	defaultRoles: z.array(z.string()).optional(),
	redirectUris: z.array(z.string()).optional(),
	webOrigins: z.array(z.string()).optional(),
	notBefore: z.int32().optional(),
	bearerOnly: z.boolean().optional(),
	consentRequired: z.boolean().optional(),
	standardFlowEnabled: z.boolean().optional(),
	implicitFlowEnabled: z.boolean().optional(),
	directAccessGrantsEnabled: z.boolean().optional(),
	serviceAccountsEnabled: z.boolean().optional(),
	authorizationServicesEnabled: z.boolean().optional(),
	directGrantsOnly: z.boolean().optional(),
	publicClient: z.boolean().optional(),
	frontchannelLogout: z.boolean().optional(),
	protocol: z.string().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	authenticationFlowBindingOverrides: z.record(z.string(), z.string()).optional(),
	fullScopeAllowed: z.boolean().optional(),
	nodeReRegistrationTimeout: z.int32().optional(),
	registeredNodes: z.record(z.string(), z.int32()).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
	clientTemplate: z.string().optional(),
	useTemplateConfig: z.boolean().optional(),
	useTemplateScope: z.boolean().optional(),
	useTemplateMappers: z.boolean().optional(),
	defaultClientScopes: z.array(z.string()).optional(),
	optionalClientScopes: z.array(z.string()).optional(),
	authorizationSettings: resourceServerRepresentationSchema.optional(),
	access: z.record(z.string(), z.boolean()).optional(),
	origin: z.string().optional(),
	name: z.string().optional(),
	claims: claimRepresentationSchema.optional(),
});

export const organizationDomainRepresentationSchema = z.object({
	name: z.string().optional(),
	verified: z.boolean().optional(),
	identityProviderAlias: z.string().optional(),
	autoRedirect: z.boolean().optional(),
});

export const statusSchema = z.enum(["EXPIRED", "PENDING"]);

export const organizationInvitationRepresentationSchema = z.object({
	id: z.string().optional(),
	organizationId: z.string().optional(),
	email: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	sentDate: z.int32().optional(),
	expiresAt: z.int32().optional(),
	status: statusSchema.optional(),
	inviteLink: z.string().optional(),
});

export const organizationRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	alias: z.string().optional(),
	enabled: z.boolean().optional(),
	description: z.string().optional(),
	redirectUrl: z.string().optional(),
	attributes: z.record(z.string(), z.array(z.string())).optional(),
	domains: z
		.array(organizationDomainRepresentationSchema)
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	members: z.array(memberRepresentationSchema).optional(),
	identityProviders: z.array(identityProviderRepresentationSchema).optional(),
	get groups(): z.ZodOptional<z.ZodArray<typeof groupRepresentationSchema>> {
		return z.array(groupRepresentationSchema).optional();
	},
});

export const policyEvaluationRequestSchema = z.object({
	context: z.record(z.string(), z.record(z.string(), z.string())).optional(),
	get resources(): z.ZodOptional<z.ZodArray<typeof resourceRepresentationSchema>> {
		return z.array(resourceRepresentationSchema).optional();
	},
	resourceType: z.string().optional(),
	clientId: z.string().optional(),
	userId: z.string().optional(),
	roleIds: z.array(z.string()).optional(),
	entitlements: z.boolean().optional(),
});

export const policyEvaluationResponseSchema = z.object({
	results: z.array(evaluationResultRepresentationSchema).optional(),
	entitlements: z.boolean().optional(),
	status: decisionEffectSchema.optional(),
	rpt: accessTokenSchema.optional(),
});

export const policyProviderRepresentationSchema = z.object({
	type: z.string().optional(),
	name: z.string().optional(),
	group: z.string().optional(),
	description: z.string().optional(),
	code: z.string().optional(),
});

export const protocolMapperEvaluationRepresentationSchema = z.object({
	mapperId: z.string().optional(),
	mapperName: z.string().optional(),
	containerId: z.string().optional(),
	containerName: z.string().optional(),
	containerType: z.string().optional(),
	protocolMapper: z.string().optional(),
});

export const publishedRealmRepresentationSchema = z.object({
	realm: z.string().optional(),
	public_key: z.string().optional(),
	"token-service": z.string().optional(),
	"account-service": z.string().optional(),
	"tokens-not-before": z.int32().optional(),
});

export const realmEventsConfigRepresentationSchema = z.object({
	eventsEnabled: z.boolean().optional(),
	eventsExpiration: z.int().optional(),
	eventsListeners: z.array(z.string()).optional(),
	enabledEventTypes: z.array(z.string()).optional(),
	adminEventsEnabled: z.boolean().optional(),
	adminEventsDetailsEnabled: z.boolean().optional(),
});

export const rolesRepresentationSchema = z.object({
	realm: z.array(roleRepresentationSchema).optional(),
	client: z.record(z.string(), z.array(roleRepresentationSchema)).optional(),
	application: z.record(z.string(), z.array(roleRepresentationSchema)).optional(),
});

export const userRepresentationSchema = z.object({
	id: z.string().optional(),
	username: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().optional(),
	emailVerified: z.boolean().optional(),
	attributes: z.record(z.string(), z.array(z.string())).optional(),
	userProfileMetadata: userProfileMetadataSchema.optional(),
	enabled: z.boolean().optional(),
	self: z.string().optional(),
	origin: z.string().optional(),
	createdTimestamp: z.int().optional(),
	totp: z.boolean().optional(),
	federationLink: z.string().optional(),
	serviceAccountClientId: z.string().optional(),
	credentials: z.array(credentialRepresentationSchema).optional(),
	disableableCredentialTypes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	requiredActions: z.array(z.string()).optional(),
	federatedIdentities: z.array(federatedIdentityRepresentationSchema).optional(),
	realmRoles: z.array(z.string()).optional(),
	clientRoles: z.record(z.string(), z.array(z.string())).optional(),
	clientConsents: z.array(userConsentRepresentationSchema).optional(),
	notBefore: z.int32().optional(),
	verifiableCredentials: z.array(userVerifiableCredentialRepresentationSchema).optional(),
	issuedVerifiableCredentials: z.array(issuedVerifiableCredentialRepresentationSchema).optional(),
	applicationRoles: z.record(z.string(), z.array(z.string())).optional(),
	socialLinks: z.array(socialLinkRepresentationSchema).optional(),
	groups: z.array(z.string()).optional(),
	access: z.record(z.string(), z.boolean()).optional(),
});

export const scopeMappingRepresentationSchema = z.object({
	self: z.string().optional(),
	client: z.string().optional(),
	clientTemplate: z.string().optional(),
	clientScope: z.string().optional(),
	roles: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
});

export const userFederationProviderRepresentationSchema = z.object({
	id: z.string().optional(),
	displayName: z.string().optional(),
	providerName: z.string().optional(),
	config: z.record(z.string(), z.string()).optional(),
	priority: z.int32().optional(),
	fullSyncPeriod: z.int32().optional(),
	changedSyncPeriod: z.int32().optional(),
	lastSync: z.int32().optional(),
});

export const userFederationMapperRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	federationProviderDisplayName: z.string().optional(),
	federationMapperType: z.string().optional(),
	config: z.record(z.string(), z.string()).optional(),
});

export const requiredActionProviderRepresentationSchema = z.object({
	alias: z.string().optional(),
	name: z.string().optional(),
	providerId: z.string().optional(),
	enabled: z.boolean().optional(),
	defaultAction: z.boolean().optional(),
	priority: z.int32().optional(),
	config: z.record(z.string(), z.string()).optional(),
});

export const realmRepresentationSchema = z.object({
	id: z.string().optional(),
	realm: z.string().optional(),
	displayName: z.string().optional(),
	displayNameHtml: z.string().optional(),
	notBefore: z.int32().optional(),
	defaultSignatureAlgorithm: z.string().optional(),
	revokeRefreshToken: z.boolean().optional(),
	refreshTokenMaxReuse: z.int32().optional(),
	accessTokenLifespan: z.int32().optional(),
	accessTokenLifespanForImplicitFlow: z.int32().optional(),
	ssoSessionIdleTimeout: z.int32().optional(),
	ssoSessionMaxLifespan: z.int32().optional(),
	ssoSessionIdleTimeoutRememberMe: z.int32().optional(),
	ssoSessionMaxLifespanRememberMe: z.int32().optional(),
	offlineSessionIdleTimeout: z.int32().optional(),
	offlineSessionMaxLifespanEnabled: z.boolean().optional(),
	offlineSessionMaxLifespan: z.int32().optional(),
	clientSessionIdleTimeout: z.int32().optional(),
	clientSessionMaxLifespan: z.int32().optional(),
	clientOfflineSessionIdleTimeout: z.int32().optional(),
	clientOfflineSessionMaxLifespan: z.int32().optional(),
	accessCodeLifespan: z.int32().optional(),
	accessCodeLifespanUserAction: z.int32().optional(),
	accessCodeLifespanLogin: z.int32().optional(),
	actionTokenGeneratedByAdminLifespan: z.int32().optional(),
	actionTokenGeneratedByUserLifespan: z.int32().optional(),
	oauth2DeviceCodeLifespan: z.int32().optional(),
	oauth2DevicePollingInterval: z.int32().optional(),
	enabled: z.boolean().optional(),
	sslRequired: z.string().optional(),
	passwordCredentialGrantAllowed: z.boolean().optional(),
	registrationAllowed: z.boolean().optional(),
	registrationEmailAsUsername: z.boolean().optional(),
	rememberMe: z.boolean().optional(),
	verifyEmail: z.boolean().optional(),
	loginWithEmailAllowed: z.boolean().optional(),
	duplicateEmailsAllowed: z.boolean().optional(),
	resetPasswordAllowed: z.boolean().optional(),
	editUsernameAllowed: z.boolean().optional(),
	userCacheEnabled: z.boolean().optional(),
	realmCacheEnabled: z.boolean().optional(),
	bruteForceProtected: z.boolean().optional(),
	permanentLockout: z.boolean().optional(),
	maxTemporaryLockouts: z.int32().optional(),
	bruteForceStrategy: bruteForceStrategySchema.optional(),
	maxFailureWaitSeconds: z.int32().optional(),
	minimumQuickLoginWaitSeconds: z.int32().optional(),
	waitIncrementSeconds: z.int32().optional(),
	quickLoginCheckMilliSeconds: z.int().optional(),
	maxDeltaTimeSeconds: z.int32().optional(),
	failureFactor: z.int32().optional(),
	maxSecondaryAuthFailures: z.int32().optional(),
	privateKey: z.string().optional(),
	publicKey: z.string().optional(),
	certificate: z.string().optional(),
	codeSecret: z.string().optional(),
	roles: rolesRepresentationSchema.optional(),
	get groups(): z.ZodOptional<z.ZodArray<typeof groupRepresentationSchema>> {
		return z.array(groupRepresentationSchema).optional();
	},
	defaultRoles: z.array(z.string()).optional(),
	defaultRole: roleRepresentationSchema.optional(),
	adminPermissionsClient: clientRepresentationSchema.optional(),
	defaultGroups: z.array(z.string()).optional(),
	requiredCredentials: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	passwordPolicy: z.string().optional(),
	otpPolicyType: z.string().optional(),
	otpPolicyAlgorithm: z.string().optional(),
	otpPolicyInitialCounter: z.int32().optional(),
	otpPolicyDigits: z.int32().optional(),
	otpPolicyLookAheadWindow: z.int32().optional(),
	otpPolicyPeriod: z.int32().optional(),
	otpPolicyCodeReusable: z.boolean().optional(),
	otpSupportedApplications: z.array(z.string()).optional(),
	localizationTexts: z.record(z.string(), z.record(z.string(), z.string())).optional(),
	webAuthnPolicyRpEntityName: z.string().optional(),
	webAuthnPolicySignatureAlgorithms: z.array(z.string()).optional(),
	webAuthnPolicyRpId: z.string().optional(),
	webAuthnPolicyAttestationConveyancePreference: z.string().optional(),
	webAuthnPolicyAuthenticatorAttachment: z.string().optional(),
	webAuthnPolicyRequireResidentKey: z.string().optional(),
	webAuthnPolicyResidentKey: z.string().optional(),
	webAuthnPolicyUserVerificationRequirement: z.string().optional(),
	webAuthnPolicyCreateTimeout: z.int32().optional(),
	webAuthnPolicyAvoidSameAuthenticatorRegister: z.boolean().optional(),
	webAuthnPolicyAcceptableAaguids: z.array(z.string()).optional(),
	webAuthnPolicyExtraOrigins: z.array(z.string()).optional(),
	webAuthnPolicyPasswordlessRpEntityName: z.string().optional(),
	webAuthnPolicyPasswordlessSignatureAlgorithms: z.array(z.string()).optional(),
	webAuthnPolicyPasswordlessRpId: z.string().optional(),
	webAuthnPolicyPasswordlessAttestationConveyancePreference: z.string().optional(),
	webAuthnPolicyPasswordlessAuthenticatorAttachment: z.string().optional(),
	webAuthnPolicyPasswordlessRequireResidentKey: z.string().optional(),
	webAuthnPolicyPasswordlessResidentKey: z.string().optional(),
	webAuthnPolicyPasswordlessUserVerificationRequirement: z.string().optional(),
	webAuthnPolicyPasswordlessCreateTimeout: z.int32().optional(),
	webAuthnPolicyPasswordlessAvoidSameAuthenticatorRegister: z.boolean().optional(),
	webAuthnPolicyPasswordlessAcceptableAaguids: z.array(z.string()).optional(),
	webAuthnPolicyPasswordlessExtraOrigins: z.array(z.string()).optional(),
	webAuthnPolicyPasswordlessPasskeysEnabled: z.boolean().optional(),
	webAuthnPolicyPasswordlessMediation: z.string().optional(),
	clientProfiles: clientProfilesRepresentationSchema.optional(),
	clientPolicies: clientPoliciesRepresentationSchema.optional(),
	users: z.array(userRepresentationSchema).optional(),
	federatedUsers: z.array(userRepresentationSchema).optional(),
	scopeMappings: z.array(scopeMappingRepresentationSchema).optional(),
	clientScopeMappings: z.record(z.string(), z.array(scopeMappingRepresentationSchema)).optional(),
	clients: z.array(clientRepresentationSchema).optional(),
	clientScopes: z.array(clientScopeRepresentationSchema).optional(),
	defaultDefaultClientScopes: z.array(z.string()).optional(),
	defaultOptionalClientScopes: z.array(z.string()).optional(),
	browserSecurityHeaders: z.record(z.string(), z.string()).optional(),
	smtpServer: z.record(z.string(), z.string()).optional(),
	userFederationProviders: z.array(userFederationProviderRepresentationSchema).optional(),
	userFederationMappers: z.array(userFederationMapperRepresentationSchema).optional(),
	loginTheme: z.string().optional(),
	accountTheme: z.string().optional(),
	adminTheme: z.string().optional(),
	emailTheme: z.string().optional(),
	eventsEnabled: z.boolean().optional(),
	eventsExpiration: z.int().optional(),
	eventsListeners: z.array(z.string()).optional(),
	enabledEventTypes: z.array(z.string()).optional(),
	adminEventsEnabled: z.boolean().optional(),
	adminEventsDetailsEnabled: z.boolean().optional(),
	identityProviders: z.array(identityProviderRepresentationSchema).optional(),
	identityProviderMappers: z.array(identityProviderMapperRepresentationSchema).optional(),
	protocolMappers: z.array(protocolMapperRepresentationSchema).optional(),
	get components(): z.ZodOptional<
		typeof multivaluedHashMapStringComponentExportRepresentationSchema
	> {
		return multivaluedHashMapStringComponentExportRepresentationSchema.optional();
	},
	internationalizationEnabled: z.boolean().optional(),
	supportedLocales: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	defaultLocale: z.string().optional(),
	authenticationFlows: z.array(authenticationFlowRepresentationSchema).optional(),
	authenticatorConfig: z.array(authenticatorConfigRepresentationSchema).optional(),
	requiredActions: z.array(requiredActionProviderRepresentationSchema).optional(),
	browserFlow: z.string().optional(),
	registrationFlow: z.string().optional(),
	directGrantFlow: z.string().optional(),
	resetCredentialsFlow: z.string().optional(),
	clientAuthenticationFlow: z.string().optional(),
	dockerAuthenticationFlow: z.string().optional(),
	firstBrokerLoginFlow: z.string().optional(),
	attributes: z.record(z.string(), z.string()).optional(),
	keycloakVersion: z.string().optional(),
	userManagedAccessAllowed: z.boolean().optional(),
	organizationsEnabled: z.boolean().optional(),
	organizations: z.array(organizationRepresentationSchema).optional(),
	verifiableCredentialsEnabled: z.boolean().optional(),
	adminPermissionsEnabled: z.boolean().optional(),
	social: z.boolean().optional(),
	updateProfileOnInitialSocialLogin: z.boolean().optional(),
	socialProviders: z.record(z.string(), z.string()).optional(),
	applicationScopeMappings: z
		.record(z.string(), z.array(scopeMappingRepresentationSchema))
		.optional(),
	applications: z.array(applicationRepresentationSchema).optional(),
	oauthClients: z.array(oAuthClientRepresentationSchema).optional(),
	clientTemplates: z.array(clientTemplateRepresentationSchema).optional(),
	scimApiEnabled: z.boolean().optional(),
});

export const requiredActionConfigInfoRepresentationSchema = z.object({
	properties: z.array(configPropertyRepresentationSchema).optional(),
});

export const requiredActionConfigRepresentationSchema = z.object({
	config: z.record(z.string(), z.string()).optional(),
});

export const samlExampleResponseSchema = z.object({
	samlResponse: z.string().optional(),
});

export const stepExecutionStatusSchema = z.enum(["COMPLETED", "PENDING"]);

export const UPAttributeRequiredSchema = z.object({
	roles: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
});

export const UPAttributePermissionsSchema = z.object({
	view: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
	edit: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
});

export const UPAttributeSelectorSchema = z.object({
	scopes: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional(),
});

export const UPAttributeSchema = z.object({
	name: z.string().optional(),
	displayName: z.string().optional(),
	validations: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
	annotations: z.record(z.string(), z.unknown()).optional(),
	required: UPAttributeRequiredSchema.optional(),
	permissions: UPAttributePermissionsSchema.optional(),
	selector: UPAttributeSelectorSchema.optional(),
	group: z.string().optional(),
	multivalued: z.boolean().optional(),
	defaultValue: z.string().optional(),
});

export const UPGroupSchema = z.object({
	name: z.string().optional(),
	displayHeader: z.string().optional(),
	displayDescription: z.string().optional(),
	annotations: z.record(z.string(), z.unknown()).optional(),
});

export const unmanagedAttributePolicySchema = z.enum(["ADMIN_EDIT", "ADMIN_VIEW", "ENABLED"]);

export const UPConfigSchema = z.object({
	attributes: z.array(UPAttributeSchema).optional(),
	groups: z.array(UPGroupSchema).optional(),
	unmanagedAttributePolicy: unmanagedAttributePolicySchema.optional(),
});

export const userSessionRepresentationSchema = z.object({
	id: z.string().optional(),
	username: z.string().optional(),
	userId: z.string().optional(),
	ipAddress: z.string().optional(),
	start: z.int().optional(),
	lastAccess: z.int().optional(),
	rememberMe: z.boolean().optional(),
	clients: z.record(z.string(), z.string()).optional(),
	transientUser: z.boolean().optional(),
});

export const verifiableCredentialOfferActionConfigSchema = z.object({
	credentialConfigurationId: z.string().optional(),
	clientId: z.string().optional(),
	preAuthorized: z.boolean().optional(),
});

export const workflowConcurrencyRepresentationSchema = z.object({
	"cancel-in-progress": z.string().optional(),
	"restart-in-progress": z.string().optional(),
});

export const workflowScheduleRepresentationSchema = z.object({
	after: z.string().optional(),
	"batch-size": z.int32().optional(),
});

export const workflowStepRepresentationSchema = z.object({
	uses: z.string().optional(),
	after: z.string().optional(),
	"scheduled-at": z.int().optional(),
	status: stepExecutionStatusSchema.optional(),
	id: z.string().optional(),
	config: multivaluedHashMapStringStringSchema.optional(),
});

export const workflowStateRepresentationSchema = z.object({
	errors: z.array(z.string()).optional(),
});

export const workflowRepresentationSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	enabled: z.boolean().optional(),
	on: z.string().optional(),
	schedule: workflowScheduleRepresentationSchema.optional(),
	concurrency: workflowConcurrencyRepresentationSchema.optional(),
	if: z.string().optional(),
	steps: z.array(workflowStepRepresentationSchema).optional(),
	state: workflowStateRepresentationSchema.optional(),
	with: multivaluedHashMapStringStringSchema.optional(),
	cancelInProgress: z.string().optional(),
	restartInProgress: z.string().optional(),
});

export const gETAdminRealmsQueryBriefRepresentationSchema = z.boolean().optional().default(false);

export const gETAdminRealmsStatus200Schema = z.array(realmRepresentationSchema);

export const gETAdminRealmsStatus403Schema = z.unknown();

export const gETAdminRealmsResponseSchema = gETAdminRealmsStatus200Schema;

export const gETAdminRealmsErrorSchema = gETAdminRealmsStatus403Schema;

export const gETAdminRealmsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsQueryBriefRepresentationSchema,
});

export const pOSTAdminRealmsStatus201Schema = z.unknown();

export const pOSTAdminRealmsStatus400Schema = z.unknown();

export const pOSTAdminRealmsStatus403Schema = z.unknown();

export const pOSTAdminRealmsStatus409Schema = z.unknown();

export const pOSTAdminRealmsStatus500Schema = z.unknown();

export const pOSTAdminRealmsResponseSchema = pOSTAdminRealmsStatus201Schema;

export const pOSTAdminRealmsErrorSchema = z.union([
	pOSTAdminRealmsStatus400Schema,
	pOSTAdminRealmsStatus403Schema,
	pOSTAdminRealmsStatus409Schema,
	pOSTAdminRealmsStatus500Schema,
]);

export const pOSTAdminRealmsBodySchema = z.unknown().optional();

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmPathRealmSchema = z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmStatus200Schema = realmRepresentationSchema;

export const gETAdminRealmsRealmStatus403Schema = z.unknown();

export const gETAdminRealmsRealmResponseSchema = gETAdminRealmsRealmStatus200Schema;

export const gETAdminRealmsRealmErrorSchema = gETAdminRealmsRealmStatus403Schema;

export const gETAdminRealmsRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmPathRealmSchema = z.string().describe("realm name (not id!)");

export const pUTAdminRealmsRealmStatus204Schema = z.void();

export const pUTAdminRealmsRealmStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmResponseSchema = pUTAdminRealmsRealmStatus204Schema;

export const pUTAdminRealmsRealmErrorSchema = z.union([
	pUTAdminRealmsRealmStatus400Schema,
	pUTAdminRealmsRealmStatus403Schema,
	pUTAdminRealmsRealmStatus404Schema,
	pUTAdminRealmsRealmStatus409Schema,
	pUTAdminRealmsRealmStatus500Schema,
]);

export const pUTAdminRealmsRealmBodySchema = realmRepresentationSchema.optional();

export const pUTAdminRealmsRealmPathSchema = z.object({
	realm: pUTAdminRealmsRealmPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmPathRealmSchema = z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmStatus204Schema = z.void();

export const dELETEAdminRealmsRealmStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmResponseSchema = dELETEAdminRealmsRealmStatus204Schema;

export const dELETEAdminRealmsRealmErrorSchema = z.union([
	dELETEAdminRealmsRealmStatus400Schema,
	dELETEAdminRealmsRealmStatus403Schema,
	dELETEAdminRealmsRealmStatus404Schema,
]);

export const dELETEAdminRealmsRealmPathSchema = z.object({
	realm: dELETEAdminRealmsRealmPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAdminEventsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAdminEventsQueryAuthClientSchema = z.string().optional();

export const gETAdminRealmsRealmAdminEventsQueryAuthIpAddressSchema = z.string().optional();

export const gETAdminRealmsRealmAdminEventsQueryAuthRealmSchema = z.string().optional();

/**
 * user id
 */
export const gETAdminRealmsRealmAdminEventsQueryAuthUserSchema = z
	.string()
	.optional()
	.describe("user id");

/**
 * From (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)
 */
export const gETAdminRealmsRealmAdminEventsQueryDateFromSchema = z
	.string()
	.optional()
	.describe(
		"From (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)",
	);

/**
 * To (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)
 */
export const gETAdminRealmsRealmAdminEventsQueryDateToSchema = z
	.string()
	.optional()
	.describe(
		"To (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)",
	);

/**
 * The direction to sort events by (asc or desc)
 */
export const gETAdminRealmsRealmAdminEventsQueryDirectionSchema = z
	.string()
	.optional()
	.describe("The direction to sort events by (asc or desc)");

export const gETAdminRealmsRealmAdminEventsQueryFirstSchema = z.int32().optional();

/**
 * Maximum results size (defaults to 100)
 */
export const gETAdminRealmsRealmAdminEventsQueryMaxSchema = z
	.int32()
	.optional()
	.describe("Maximum results size (defaults to 100)");

export const gETAdminRealmsRealmAdminEventsQueryOperationTypesSchema = z
	.array(z.string())
	.optional();

export const gETAdminRealmsRealmAdminEventsQueryResourcePathSchema = z.string().optional();

export const gETAdminRealmsRealmAdminEventsQueryResourceTypesSchema = z
	.array(z.string())
	.optional();

export const gETAdminRealmsRealmAdminEventsStatus200Schema = z.array(
	adminEventRepresentationSchema,
);

export const gETAdminRealmsRealmAdminEventsStatus400Schema = z.unknown();

export const gETAdminRealmsRealmAdminEventsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmAdminEventsResponseSchema =
	gETAdminRealmsRealmAdminEventsStatus200Schema;

export const gETAdminRealmsRealmAdminEventsErrorSchema = z.union([
	gETAdminRealmsRealmAdminEventsStatus400Schema,
	gETAdminRealmsRealmAdminEventsStatus403Schema,
]);

export const gETAdminRealmsRealmAdminEventsPathSchema = z.object({
	realm: gETAdminRealmsRealmAdminEventsPathRealmSchema,
});

export const gETAdminRealmsRealmAdminEventsQuerySchema = z.object({
	authClient: gETAdminRealmsRealmAdminEventsQueryAuthClientSchema,
	authIpAddress: gETAdminRealmsRealmAdminEventsQueryAuthIpAddressSchema,
	authRealm: gETAdminRealmsRealmAdminEventsQueryAuthRealmSchema,
	authUser: gETAdminRealmsRealmAdminEventsQueryAuthUserSchema,
	dateFrom: gETAdminRealmsRealmAdminEventsQueryDateFromSchema,
	dateTo: gETAdminRealmsRealmAdminEventsQueryDateToSchema,
	direction: gETAdminRealmsRealmAdminEventsQueryDirectionSchema,
	first: gETAdminRealmsRealmAdminEventsQueryFirstSchema,
	max: gETAdminRealmsRealmAdminEventsQueryMaxSchema,
	operationTypes: gETAdminRealmsRealmAdminEventsQueryOperationTypesSchema,
	resourcePath: gETAdminRealmsRealmAdminEventsQueryResourcePathSchema,
	resourceTypes: gETAdminRealmsRealmAdminEventsQueryResourceTypesSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAdminEventsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmAdminEventsStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAdminEventsStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmAdminEventsResponseSchema =
	dELETEAdminRealmsRealmAdminEventsStatus204Schema;

export const dELETEAdminRealmsRealmAdminEventsErrorSchema =
	dELETEAdminRealmsRealmAdminEventsStatus403Schema;

export const dELETEAdminRealmsRealmAdminEventsPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAdminEventsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersResponseSchema =
	dELETEAdminRealmsRealmAttackDetectionBruteForceUsersStatus204Schema;

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAttackDetectionBruteForceUsersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathUserIdSchema = z.string();

export const gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdStatus200Schema = z.record(
	z.string(),
	z.unknown(),
);

export const gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdResponseSchema =
	gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdStatus200Schema;

export const gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathRealmSchema,
	userId: gETAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathUserIdSchema =
	z.string();

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdResponseSchema =
	dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdStatus204Schema;

export const dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathRealmSchema,
	userId: dELETEAdminRealmsRealmAttackDetectionBruteForceUsersUserIdPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationAuthenticatorProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationAuthenticatorProvidersStatus200Schema = z.array(
	z.record(z.string(), z.unknown()),
);

export const gETAdminRealmsRealmAuthenticationAuthenticatorProvidersResponseSchema =
	gETAdminRealmsRealmAuthenticationAuthenticatorProvidersStatus200Schema;

export const gETAdminRealmsRealmAuthenticationAuthenticatorProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationAuthenticatorProvidersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersStatus200Schema = z.array(
	z.record(z.string(), z.unknown()),
);

export const gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersResponseSchema =
	gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersStatus200Schema;

export const gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationClientAuthenticatorProvidersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmAuthenticationConfigStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationConfigStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationConfigResponseSchema =
	pOSTAdminRealmsRealmAuthenticationConfigStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationConfigErrorSchema =
	pOSTAdminRealmsRealmAuthenticationConfigStatus409Schema;

export const pOSTAdminRealmsRealmAuthenticationConfigBodySchema =
	authenticatorConfigRepresentationSchema.optional();

export const pOSTAdminRealmsRealmAuthenticationConfigPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationConfigPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdPathProviderIdSchema =
	z.string();

export const gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdStatus200Schema =
	authenticatorConfigInfoRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdResponseSchema =
	gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdStatus200Schema;

export const gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdPathRealmSchema,
	providerId: gETAdminRealmsRealmAuthenticationConfigDescriptionProviderIdPathProviderIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationConfigIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Configuration id
 */
export const gETAdminRealmsRealmAuthenticationConfigIdPathIdSchema = z
	.string()
	.describe("Configuration id");

export const gETAdminRealmsRealmAuthenticationConfigIdStatus200Schema =
	authenticatorConfigRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationConfigIdResponseSchema =
	gETAdminRealmsRealmAuthenticationConfigIdStatus200Schema;

export const gETAdminRealmsRealmAuthenticationConfigIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationConfigIdPathRealmSchema,
	id: gETAdminRealmsRealmAuthenticationConfigIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmAuthenticationConfigIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Configuration id
 */
export const pUTAdminRealmsRealmAuthenticationConfigIdPathIdSchema = z
	.string()
	.describe("Configuration id");

export const pUTAdminRealmsRealmAuthenticationConfigIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmAuthenticationConfigIdResponseSchema =
	pUTAdminRealmsRealmAuthenticationConfigIdStatus204Schema;

export const pUTAdminRealmsRealmAuthenticationConfigIdBodySchema =
	authenticatorConfigRepresentationSchema.optional();

export const pUTAdminRealmsRealmAuthenticationConfigIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmAuthenticationConfigIdPathRealmSchema,
	id: pUTAdminRealmsRealmAuthenticationConfigIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAuthenticationConfigIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Configuration id
 */
export const dELETEAdminRealmsRealmAuthenticationConfigIdPathIdSchema = z
	.string()
	.describe("Configuration id");

export const dELETEAdminRealmsRealmAuthenticationConfigIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAuthenticationConfigIdResponseSchema =
	dELETEAdminRealmsRealmAuthenticationConfigIdStatus204Schema;

export const dELETEAdminRealmsRealmAuthenticationConfigIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAuthenticationConfigIdPathRealmSchema,
	id: dELETEAdminRealmsRealmAuthenticationConfigIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmAuthenticationExecutionsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationExecutionsResponseSchema =
	pOSTAdminRealmsRealmAuthenticationExecutionsStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationExecutionsBodySchema =
	authenticationExecutionRepresentationSchema.optional();

export const pOSTAdminRealmsRealmAuthenticationExecutionsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationExecutionsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdPathExecutionIdSchema =
	z.string();

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdStatus200Schema =
	authenticationExecutionRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdResponseSchema =
	gETAdminRealmsRealmAuthenticationExecutionsExecutionIdStatus200Schema;

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationExecutionsExecutionIdPathRealmSchema,
	executionId: gETAdminRealmsRealmAuthenticationExecutionsExecutionIdPathExecutionIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Execution id
 */
export const dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdPathExecutionIdSchema = z
	.string()
	.describe("Execution id");

export const dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdResponseSchema =
	dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdStatus204Schema;

export const dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdPathRealmSchema,
	executionId: dELETEAdminRealmsRealmAuthenticationExecutionsExecutionIdPathExecutionIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Execution id
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigPathExecutionIdSchema = z
	.string()
	.describe("Execution id");

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigResponseSchema =
	pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigErrorSchema =
	pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigStatus409Schema;

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigBodySchema =
	authenticatorConfigRepresentationSchema.optional();

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigPathRealmSchema,
	executionId: pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigPathExecutionIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Execution id
 */
export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathExecutionIdSchema = z
	.string()
	.describe("Execution id");

/**
 * Configuration id
 */
export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathIdSchema = z
	.string()
	.describe("Configuration id");

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdStatus200Schema =
	authenticatorConfigRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdResponseSchema =
	gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdStatus200Schema;

export const gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathRealmSchema,
	executionId: gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathExecutionIdSchema,
	id: gETAdminRealmsRealmAuthenticationExecutionsExecutionIdConfigIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Execution id
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityPathExecutionIdSchema =
	z.string().describe("Execution id");

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityResponseSchema =
	pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityStatus204Schema;

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityPathRealmSchema,
		executionId:
			pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdLowerPriorityPathExecutionIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Execution id
 */
export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityPathExecutionIdSchema =
	z.string().describe("Execution id");

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityResponseSchema =
	pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityStatus204Schema;

export const pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityPathRealmSchema,
		executionId:
			pOSTAdminRealmsRealmAuthenticationExecutionsExecutionIdRaisePriorityPathExecutionIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationFlowsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationFlowsStatus200Schema = z.array(
	authenticationFlowRepresentationSchema,
);

export const gETAdminRealmsRealmAuthenticationFlowsResponseSchema =
	gETAdminRealmsRealmAuthenticationFlowsStatus200Schema;

export const gETAdminRealmsRealmAuthenticationFlowsPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationFlowsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmAuthenticationFlowsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsResponseSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsErrorSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsStatus409Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsBodySchema =
	authenticationFlowRepresentationSchema.optional();

export const pOSTAdminRealmsRealmAuthenticationFlowsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationFlowsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * name of the existing authentication flow
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyPathFlowAliasSchema = z
	.string()
	.describe("name of the existing authentication flow");

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyResponseSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyErrorSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyStatus409Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyBodySchema = z
	.record(z.string(), z.string())
	.optional();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyPathRealmSchema,
	flowAlias: pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasCopyPathFlowAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Flow alias
 */
export const gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathFlowAliasSchema = z
	.string()
	.describe("Flow alias");

export const gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus200Schema = z.array(
	authenticationExecutionInfoRepresentationSchema,
);

export const gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsResponseSchema =
	gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus200Schema;

export const gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathRealmSchema,
	flowAlias: gETAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathFlowAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Flow alias
 */
export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathFlowAliasSchema = z
	.string()
	.describe("Flow alias");

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus204Schema = z.void();

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsResponseSchema =
	pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus204Schema;

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsErrorSchema =
	pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsStatus409Schema;

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsBodySchema =
	authenticationExecutionInfoRepresentationSchema.optional();

export const pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathRealmSchema,
	flowAlias: pUTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsPathFlowAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of parent flow
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionPathFlowAliasSchema =
	z.string().describe("Alias of parent flow");

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionResponseSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionBodySchema = z
	.record(z.string(), z.unknown())
	.optional();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionPathRealmSchema,
		flowAlias:
			pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsExecutionPathFlowAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of parent authentication flow
 */
export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowPathFlowAliasSchema = z
	.string()
	.describe("Alias of parent authentication flow");

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowResponseSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowStatus201Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowErrorSchema =
	pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowStatus409Schema;

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowBodySchema = z
	.record(z.string(), z.unknown())
	.optional();

export const pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowPathRealmSchema,
	flowAlias: pOSTAdminRealmsRealmAuthenticationFlowsFlowAliasExecutionsFlowPathFlowAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Flow id
 */
export const gETAdminRealmsRealmAuthenticationFlowsIdPathIdSchema = z.string().describe("Flow id");

export const gETAdminRealmsRealmAuthenticationFlowsIdStatus200Schema =
	authenticationFlowRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationFlowsIdResponseSchema =
	gETAdminRealmsRealmAuthenticationFlowsIdStatus200Schema;

export const gETAdminRealmsRealmAuthenticationFlowsIdPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema,
	id: gETAdminRealmsRealmAuthenticationFlowsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmAuthenticationFlowsIdPathIdSchema = z.string();

export const pUTAdminRealmsRealmAuthenticationFlowsIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmAuthenticationFlowsIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmAuthenticationFlowsIdResponseSchema =
	pUTAdminRealmsRealmAuthenticationFlowsIdStatus204Schema;

export const pUTAdminRealmsRealmAuthenticationFlowsIdErrorSchema =
	pUTAdminRealmsRealmAuthenticationFlowsIdStatus409Schema;

export const pUTAdminRealmsRealmAuthenticationFlowsIdBodySchema =
	authenticationFlowRepresentationSchema.optional();

export const pUTAdminRealmsRealmAuthenticationFlowsIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema,
	id: pUTAdminRealmsRealmAuthenticationFlowsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Flow id
 */
export const dELETEAdminRealmsRealmAuthenticationFlowsIdPathIdSchema = z
	.string()
	.describe("Flow id");

export const dELETEAdminRealmsRealmAuthenticationFlowsIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAuthenticationFlowsIdResponseSchema =
	dELETEAdminRealmsRealmAuthenticationFlowsIdStatus204Schema;

export const dELETEAdminRealmsRealmAuthenticationFlowsIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAuthenticationFlowsIdPathRealmSchema,
	id: dELETEAdminRealmsRealmAuthenticationFlowsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationFormActionProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationFormActionProvidersStatus200Schema = z.array(
	z.record(z.string(), z.unknown()),
);

export const gETAdminRealmsRealmAuthenticationFormActionProvidersResponseSchema =
	gETAdminRealmsRealmAuthenticationFormActionProvidersStatus200Schema;

export const gETAdminRealmsRealmAuthenticationFormActionProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationFormActionProvidersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationFormProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationFormProvidersStatus200Schema = z.array(
	z.record(z.string(), z.unknown()),
);

export const gETAdminRealmsRealmAuthenticationFormProvidersResponseSchema =
	gETAdminRealmsRealmAuthenticationFormProvidersStatus200Schema;

export const gETAdminRealmsRealmAuthenticationFormProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationFormProvidersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionStatus200Schema = z.record(
	z.string(),
	z.array(configPropertyRepresentationSchema),
);

export const gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionResponseSchema =
	gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionStatus200Schema;

export const gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationPerClientConfigDescriptionPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionStatus204Schema = z.void();

export const pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionResponseSchema =
	pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionStatus204Schema;

export const pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionBodySchema = z
	.record(z.string(), z.string())
	.optional();

export const pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionPathSchema = z.object({
	realm: pOSTAdminRealmsRealmAuthenticationRegisterRequiredActionPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationRequiredActionsStatus200Schema = z.array(
	requiredActionProviderRepresentationSchema,
);

export const gETAdminRealmsRealmAuthenticationRequiredActionsResponseSchema =
	gETAdminRealmsRealmAuthenticationRequiredActionsStatus200Schema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationRequiredActionsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasStatus200Schema =
	requiredActionProviderRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasResponseSchema =
	gETAdminRealmsRealmAuthenticationRequiredActionsAliasStatus200Schema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema,
	alias: gETAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasStatus204Schema = z.void();

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasResponseSchema =
	pUTAdminRealmsRealmAuthenticationRequiredActionsAliasStatus204Schema;

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasBodySchema =
	requiredActionProviderRepresentationSchema.optional();

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasPathSchema = z.object({
	realm: pUTAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema,
	alias: pUTAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasStatus204Schema = z.void();

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasResponseSchema =
	dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasStatus204Schema;

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasPathRealmSchema,
	alias: dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus200Schema =
	requiredActionConfigRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigResponseSchema =
	gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus200Schema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema,
	alias: gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus204Schema = z.void();

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigResponseSchema =
	pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus204Schema;

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigBodySchema =
	requiredActionConfigRepresentationSchema.optional();

export const pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathSchema = z.object({
	realm: pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema,
	alias: pUTAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigResponseSchema =
	dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigStatus204Schema;

export const dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathSchema = z.object({
	realm: dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathRealmSchema,
	alias: dELETEAdminRealmsRealmAuthenticationRequiredActionsAliasConfigPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionPathAliasSchema =
	z.string().describe("Alias of required action");

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionStatus200Schema =
	requiredActionConfigInfoRepresentationSchema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionResponseSchema =
	gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionStatus200Schema;

export const gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionPathSchema =
	z.object({
		realm: gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionPathRealmSchema,
		alias: gETAdminRealmsRealmAuthenticationRequiredActionsAliasConfigDescriptionPathAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityResponseSchema =
	pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityStatus204Schema;

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityPathRealmSchema,
		alias: pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasLowerPriorityPathAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Alias of required action
 */
export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityPathAliasSchema = z
	.string()
	.describe("Alias of required action");

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityResponseSchema =
	pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityStatus204Schema;

export const pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityPathRealmSchema,
		alias: pOSTAdminRealmsRealmAuthenticationRequiredActionsAliasRaisePriorityPathAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsStatus200Schema = z.array(
	z.record(z.string(), z.string()),
);

export const gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsResponseSchema =
	gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsStatus200Schema;

export const gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsPathSchema = z.object({
	realm: gETAdminRealmsRealmAuthenticationUnregisteredRequiredActionsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientDescriptionConverterPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientDescriptionConverterStatus200Schema =
	clientRepresentationSchema;

export const pOSTAdminRealmsRealmClientDescriptionConverterStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmClientDescriptionConverterStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmClientDescriptionConverterResponseSchema =
	pOSTAdminRealmsRealmClientDescriptionConverterStatus200Schema;

export const pOSTAdminRealmsRealmClientDescriptionConverterErrorSchema = z.union([
	pOSTAdminRealmsRealmClientDescriptionConverterStatus403Schema,
	pOSTAdminRealmsRealmClientDescriptionConverterStatus404Schema,
]);

export const pOSTAdminRealmsRealmClientDescriptionConverterBodySchema = z.string().optional();

export const pOSTAdminRealmsRealmClientDescriptionConverterPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientDescriptionConverterPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientPoliciesPoliciesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientPoliciesPoliciesQueryIncludeGlobalPoliciesSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmClientPoliciesPoliciesStatus200Schema =
	clientPoliciesRepresentationSchema;

export const gETAdminRealmsRealmClientPoliciesPoliciesResponseSchema =
	gETAdminRealmsRealmClientPoliciesPoliciesStatus200Schema;

export const gETAdminRealmsRealmClientPoliciesPoliciesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientPoliciesPoliciesPathRealmSchema,
});

export const gETAdminRealmsRealmClientPoliciesPoliciesQuerySchema = z.object({
	"include-global-policies":
		gETAdminRealmsRealmClientPoliciesPoliciesQueryIncludeGlobalPoliciesSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientPoliciesPoliciesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientPoliciesPoliciesStatus200Schema = z.unknown();

export const pUTAdminRealmsRealmClientPoliciesPoliciesResponseSchema =
	pUTAdminRealmsRealmClientPoliciesPoliciesStatus200Schema;

export const pUTAdminRealmsRealmClientPoliciesPoliciesBodySchema =
	clientPoliciesRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientPoliciesPoliciesPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientPoliciesPoliciesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientPoliciesProfilesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientPoliciesProfilesQueryIncludeGlobalProfilesSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmClientPoliciesProfilesStatus200Schema =
	clientProfilesRepresentationSchema;

export const gETAdminRealmsRealmClientPoliciesProfilesResponseSchema =
	gETAdminRealmsRealmClientPoliciesProfilesStatus200Schema;

export const gETAdminRealmsRealmClientPoliciesProfilesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientPoliciesProfilesPathRealmSchema,
});

export const gETAdminRealmsRealmClientPoliciesProfilesQuerySchema = z.object({
	"include-global-profiles":
		gETAdminRealmsRealmClientPoliciesProfilesQueryIncludeGlobalProfilesSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientPoliciesProfilesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientPoliciesProfilesStatus200Schema = z.unknown();

export const pUTAdminRealmsRealmClientPoliciesProfilesResponseSchema =
	pUTAdminRealmsRealmClientPoliciesProfilesStatus200Schema;

export const pUTAdminRealmsRealmClientPoliciesProfilesBodySchema =
	clientProfilesRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientPoliciesProfilesPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientPoliciesProfilesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientRegistrationPolicyProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientRegistrationPolicyProvidersStatus200Schema = z.array(
	componentTypeRepresentationSchema,
);

export const gETAdminRealmsRealmClientRegistrationPolicyProvidersResponseSchema =
	gETAdminRealmsRealmClientRegistrationPolicyProvidersStatus200Schema;

export const gETAdminRealmsRealmClientRegistrationPolicyProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmClientRegistrationPolicyProvidersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmClientScopesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientScopesResponseSchema =
	gETAdminRealmsRealmClientScopesStatus200Schema;

export const gETAdminRealmsRealmClientScopesErrorSchema =
	gETAdminRealmsRealmClientScopesStatus403Schema;

export const gETAdminRealmsRealmClientScopesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientScopesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientScopesStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmClientScopesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmClientScopesStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmClientScopesResponseSchema =
	pOSTAdminRealmsRealmClientScopesStatus201Schema;

export const pOSTAdminRealmsRealmClientScopesErrorSchema = z.union([
	pOSTAdminRealmsRealmClientScopesStatus403Schema,
	pOSTAdminRealmsRealmClientScopesStatus409Schema,
]);

export const pOSTAdminRealmsRealmClientScopesBodySchema =
	clientScopeRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientScopesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientScopesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientSessionStatsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientSessionStatsStatus200Schema = z.array(
	z.record(z.string(), z.string()),
);

export const gETAdminRealmsRealmClientSessionStatsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientSessionStatsResponseSchema =
	gETAdminRealmsRealmClientSessionStatsStatus200Schema;

export const gETAdminRealmsRealmClientSessionStatsErrorSchema =
	gETAdminRealmsRealmClientSessionStatsStatus403Schema;

export const gETAdminRealmsRealmClientSessionStatsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientSessionStatsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmClientTemplatesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientTemplatesResponseSchema =
	gETAdminRealmsRealmClientTemplatesStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesErrorSchema =
	gETAdminRealmsRealmClientTemplatesStatus403Schema;

export const gETAdminRealmsRealmClientTemplatesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientTemplatesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientTemplatesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientTemplatesStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmClientTemplatesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmClientTemplatesStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmClientTemplatesResponseSchema =
	pOSTAdminRealmsRealmClientTemplatesStatus201Schema;

export const pOSTAdminRealmsRealmClientTemplatesErrorSchema = z.union([
	pOSTAdminRealmsRealmClientTemplatesStatus403Schema,
	pOSTAdminRealmsRealmClientTemplatesStatus409Schema,
]);

export const pOSTAdminRealmsRealmClientTemplatesBodySchema =
	clientScopeRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientTemplatesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientTemplatesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTypesStatus200Schema = clientTypesRepresentationSchema;

export const gETAdminRealmsRealmClientTypesResponseSchema =
	gETAdminRealmsRealmClientTypesStatus200Schema;

export const gETAdminRealmsRealmClientTypesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientTypesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientTypesStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientTypesResponseSchema =
	pUTAdminRealmsRealmClientTypesStatus204Schema;

export const pUTAdminRealmsRealmClientTypesBodySchema = clientTypesRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientTypesPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientTypesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * filter by clientId
 */
export const gETAdminRealmsRealmClientsQueryClientIdSchema = z
	.string()
	.optional()
	.describe("filter by clientId");

/**
 * the first result
 */
export const gETAdminRealmsRealmClientsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("the first result");

/**
 * the max results to return
 */
export const gETAdminRealmsRealmClientsQueryMaxSchema = z
	.int32()
	.optional()
	.describe("the max results to return");

export const gETAdminRealmsRealmClientsQueryQSchema = z.string().optional();

/**
 * whether this is a search query or a getClientById query
 */
export const gETAdminRealmsRealmClientsQuerySearchSchema = z
	.boolean()
	.optional()
	.default(false)
	.describe("whether this is a search query or a getClientById query");

/**
 * filter clients that cannot be viewed in full by admin
 */
export const gETAdminRealmsRealmClientsQueryViewableOnlySchema = z
	.boolean()
	.optional()
	.default(false)
	.describe("filter clients that cannot be viewed in full by admin");

export const gETAdminRealmsRealmClientsStatus200Schema = z.array(clientRepresentationSchema);

export const gETAdminRealmsRealmClientsResponseSchema = gETAdminRealmsRealmClientsStatus200Schema;

export const gETAdminRealmsRealmClientsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsPathRealmSchema,
});

export const gETAdminRealmsRealmClientsQuerySchema = z.object({
	clientId: gETAdminRealmsRealmClientsQueryClientIdSchema,
	first: gETAdminRealmsRealmClientsQueryFirstSchema,
	max: gETAdminRealmsRealmClientsQueryMaxSchema,
	q: gETAdminRealmsRealmClientsQueryQSchema,
	search: gETAdminRealmsRealmClientsQuerySearchSchema,
	viewableOnly: gETAdminRealmsRealmClientsQueryViewableOnlySchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsResponseSchema = pOSTAdminRealmsRealmClientsStatus201Schema;

export const pOSTAdminRealmsRealmClientsErrorSchema = pOSTAdminRealmsRealmClientsStatus409Schema;

export const pOSTAdminRealmsRealmClientsBodySchema = clientRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsInitialAccessPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientsInitialAccessStatus200Schema = z.array(
	clientInitialAccessPresentationSchema,
);

export const gETAdminRealmsRealmClientsInitialAccessResponseSchema =
	gETAdminRealmsRealmClientsInitialAccessStatus200Schema;

export const gETAdminRealmsRealmClientsInitialAccessPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsInitialAccessPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsInitialAccessPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientsInitialAccessStatus201Schema =
	clientInitialAccessCreatePresentationSchema;

export const pOSTAdminRealmsRealmClientsInitialAccessResponseSchema =
	pOSTAdminRealmsRealmClientsInitialAccessStatus201Schema;

export const pOSTAdminRealmsRealmClientsInitialAccessBodySchema =
	clientInitialAccessCreatePresentationSchema.optional();

export const pOSTAdminRealmsRealmClientsInitialAccessPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsInitialAccessPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsInitialAccessIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientsInitialAccessIdPathIdSchema = z.string();

export const dELETEAdminRealmsRealmClientsInitialAccessIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientsInitialAccessIdResponseSchema =
	dELETEAdminRealmsRealmClientsInitialAccessIdStatus204Schema;

export const dELETEAdminRealmsRealmClientsInitialAccessIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsInitialAccessIdPathRealmSchema,
	id: dELETEAdminRealmsRealmClientsInitialAccessIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmComponentsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmComponentsQueryNameSchema = z.string().optional();

export const gETAdminRealmsRealmComponentsQueryParentSchema = z.string().optional();

export const gETAdminRealmsRealmComponentsQueryProviderIdSchema = z.string().optional();

export const gETAdminRealmsRealmComponentsQueryTypeSchema = z.string().optional();

export const gETAdminRealmsRealmComponentsStatus200Schema = z.array(componentRepresentationSchema);

export const gETAdminRealmsRealmComponentsResponseSchema =
	gETAdminRealmsRealmComponentsStatus200Schema;

export const gETAdminRealmsRealmComponentsPathSchema = z.object({
	realm: gETAdminRealmsRealmComponentsPathRealmSchema,
});

export const gETAdminRealmsRealmComponentsQuerySchema = z.object({
	name: gETAdminRealmsRealmComponentsQueryNameSchema,
	parent: gETAdminRealmsRealmComponentsQueryParentSchema,
	providerId: gETAdminRealmsRealmComponentsQueryProviderIdSchema,
	type: gETAdminRealmsRealmComponentsQueryTypeSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmComponentsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmComponentsStatus200Schema = z.unknown();

export const pOSTAdminRealmsRealmComponentsResponseSchema =
	pOSTAdminRealmsRealmComponentsStatus200Schema;

export const pOSTAdminRealmsRealmComponentsBodySchema = componentRepresentationSchema.optional();

export const pOSTAdminRealmsRealmComponentsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmComponentsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmComponentsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmComponentsIdPathIdSchema = z.string();

export const gETAdminRealmsRealmComponentsIdStatus200Schema = componentRepresentationSchema;

export const gETAdminRealmsRealmComponentsIdResponseSchema =
	gETAdminRealmsRealmComponentsIdStatus200Schema;

export const gETAdminRealmsRealmComponentsIdPathSchema = z.object({
	realm: gETAdminRealmsRealmComponentsIdPathRealmSchema,
	id: gETAdminRealmsRealmComponentsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmComponentsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmComponentsIdPathIdSchema = z.string();

export const pUTAdminRealmsRealmComponentsIdStatus200Schema = z.unknown();

export const pUTAdminRealmsRealmComponentsIdResponseSchema =
	pUTAdminRealmsRealmComponentsIdStatus200Schema;

export const pUTAdminRealmsRealmComponentsIdBodySchema = componentRepresentationSchema.optional();

export const pUTAdminRealmsRealmComponentsIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmComponentsIdPathRealmSchema,
	id: pUTAdminRealmsRealmComponentsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmComponentsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmComponentsIdPathIdSchema = z.string();

export const dELETEAdminRealmsRealmComponentsIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmComponentsIdResponseSchema =
	dELETEAdminRealmsRealmComponentsIdStatus204Schema;

export const dELETEAdminRealmsRealmComponentsIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmComponentsIdPathRealmSchema,
	id: dELETEAdminRealmsRealmComponentsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmComponentsIdSubComponentTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmComponentsIdSubComponentTypesPathIdSchema = z.string();

export const gETAdminRealmsRealmComponentsIdSubComponentTypesQueryTypeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmComponentsIdSubComponentTypesStatus200Schema = z.array(
	componentTypeRepresentationSchema,
);

export const gETAdminRealmsRealmComponentsIdSubComponentTypesResponseSchema =
	gETAdminRealmsRealmComponentsIdSubComponentTypesStatus200Schema;

export const gETAdminRealmsRealmComponentsIdSubComponentTypesPathSchema = z.object({
	realm: gETAdminRealmsRealmComponentsIdSubComponentTypesPathRealmSchema,
	id: gETAdminRealmsRealmComponentsIdSubComponentTypesPathIdSchema,
});

export const gETAdminRealmsRealmComponentsIdSubComponentTypesQuerySchema = z.object({
	type: gETAdminRealmsRealmComponentsIdSubComponentTypesQueryTypeSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmCredentialRegistratorsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmCredentialRegistratorsStatus200Schema = z.array(z.string());

export const gETAdminRealmsRealmCredentialRegistratorsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmCredentialRegistratorsResponseSchema =
	gETAdminRealmsRealmCredentialRegistratorsStatus200Schema;

export const gETAdminRealmsRealmCredentialRegistratorsErrorSchema =
	gETAdminRealmsRealmCredentialRegistratorsStatus403Schema;

export const gETAdminRealmsRealmCredentialRegistratorsPathSchema = z.object({
	realm: gETAdminRealmsRealmCredentialRegistratorsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmDefaultDefaultClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmDefaultDefaultClientScopesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmDefaultDefaultClientScopesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmDefaultDefaultClientScopesResponseSchema =
	gETAdminRealmsRealmDefaultDefaultClientScopesStatus200Schema;

export const gETAdminRealmsRealmDefaultDefaultClientScopesErrorSchema =
	gETAdminRealmsRealmDefaultDefaultClientScopesStatus403Schema;

export const gETAdminRealmsRealmDefaultDefaultClientScopesPathSchema = z.object({
	realm: gETAdminRealmsRealmDefaultDefaultClientScopesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdErrorSchema = z.union([
	pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus403Schema,
	pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus404Schema,
]);

export const pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathRealmSchema,
	clientScopeId: pUTAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdErrorSchema = z.union([
	dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus403Schema,
	dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathRealmSchema,
	clientScopeId:
		dELETEAdminRealmsRealmDefaultDefaultClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmDefaultGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmDefaultGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmDefaultGroupsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmDefaultGroupsResponseSchema =
	gETAdminRealmsRealmDefaultGroupsStatus200Schema;

export const gETAdminRealmsRealmDefaultGroupsErrorSchema =
	gETAdminRealmsRealmDefaultGroupsStatus403Schema;

export const gETAdminRealmsRealmDefaultGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmDefaultGroupsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmDefaultGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmDefaultGroupsGroupIdPathGroupIdSchema = z.string();

export const pUTAdminRealmsRealmDefaultGroupsGroupIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmDefaultGroupsGroupIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmDefaultGroupsGroupIdStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmDefaultGroupsGroupIdResponseSchema =
	pUTAdminRealmsRealmDefaultGroupsGroupIdStatus204Schema;

export const pUTAdminRealmsRealmDefaultGroupsGroupIdErrorSchema = z.union([
	pUTAdminRealmsRealmDefaultGroupsGroupIdStatus403Schema,
	pUTAdminRealmsRealmDefaultGroupsGroupIdStatus404Schema,
]);

export const pUTAdminRealmsRealmDefaultGroupsGroupIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmDefaultGroupsGroupIdPathRealmSchema,
	groupId: pUTAdminRealmsRealmDefaultGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmDefaultGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdPathGroupIdSchema = z.string();

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdResponseSchema =
	dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus204Schema;

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdErrorSchema = z.union([
	dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus403Schema,
	dELETEAdminRealmsRealmDefaultGroupsGroupIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmDefaultGroupsGroupIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmDefaultGroupsGroupIdPathRealmSchema,
	groupId: dELETEAdminRealmsRealmDefaultGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmDefaultOptionalClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmDefaultOptionalClientScopesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmDefaultOptionalClientScopesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmDefaultOptionalClientScopesResponseSchema =
	gETAdminRealmsRealmDefaultOptionalClientScopesStatus200Schema;

export const gETAdminRealmsRealmDefaultOptionalClientScopesErrorSchema =
	gETAdminRealmsRealmDefaultOptionalClientScopesStatus403Schema;

export const gETAdminRealmsRealmDefaultOptionalClientScopesPathSchema = z.object({
	realm: gETAdminRealmsRealmDefaultOptionalClientScopesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdErrorSchema = z.union([
	pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus403Schema,
	pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus404Schema,
]);

export const pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathRealmSchema,
	clientScopeId: pUTAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdErrorSchema = z.union([
	dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus403Schema,
	dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathRealmSchema,
	clientScopeId:
		dELETEAdminRealmsRealmDefaultOptionalClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmEventsPathRealmSchema = z.string().describe("realm name (not id!)");

/**
 * App or oauth client name
 */
export const gETAdminRealmsRealmEventsQueryClientSchema = z
	.string()
	.optional()
	.describe("App or oauth client name");

/**
 * From (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)
 */
export const gETAdminRealmsRealmEventsQueryDateFromSchema = z
	.string()
	.optional()
	.describe(
		"From (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)",
	);

/**
 * To (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)
 */
export const gETAdminRealmsRealmEventsQueryDateToSchema = z
	.string()
	.optional()
	.describe(
		"To (inclusive) date (yyyy-MM-dd) or time in Epoch timestamp millis (number of milliseconds since January 1, 1970, 00:00:00 GMT)",
	);

/**
 * The direction to sort events by (asc or desc)
 */
export const gETAdminRealmsRealmEventsQueryDirectionSchema = z
	.string()
	.optional()
	.describe("The direction to sort events by (asc or desc)");

/**
 * Paging offset
 */
export const gETAdminRealmsRealmEventsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Paging offset");

/**
 * IP Address
 */
export const gETAdminRealmsRealmEventsQueryIpAddressSchema = z
	.string()
	.optional()
	.describe("IP Address");

/**
 * Maximum results size
 */
export const gETAdminRealmsRealmEventsQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum results size");

/**
 * The types of events to return
 */
export const gETAdminRealmsRealmEventsQueryTypeSchema = z
	.array(z.string())
	.optional()
	.describe("The types of events to return");

/**
 * User id
 */
export const gETAdminRealmsRealmEventsQueryUserSchema = z.string().optional().describe("User id");

export const gETAdminRealmsRealmEventsStatus200Schema = z.array(eventRepresentationSchema);

export const gETAdminRealmsRealmEventsStatus400Schema = z.unknown();

export const gETAdminRealmsRealmEventsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmEventsResponseSchema = gETAdminRealmsRealmEventsStatus200Schema;

export const gETAdminRealmsRealmEventsErrorSchema = z.union([
	gETAdminRealmsRealmEventsStatus400Schema,
	gETAdminRealmsRealmEventsStatus403Schema,
]);

export const gETAdminRealmsRealmEventsPathSchema = z.object({
	realm: gETAdminRealmsRealmEventsPathRealmSchema,
});

export const gETAdminRealmsRealmEventsQuerySchema = z.object({
	client: gETAdminRealmsRealmEventsQueryClientSchema,
	dateFrom: gETAdminRealmsRealmEventsQueryDateFromSchema,
	dateTo: gETAdminRealmsRealmEventsQueryDateToSchema,
	direction: gETAdminRealmsRealmEventsQueryDirectionSchema,
	first: gETAdminRealmsRealmEventsQueryFirstSchema,
	ipAddress: gETAdminRealmsRealmEventsQueryIpAddressSchema,
	max: gETAdminRealmsRealmEventsQueryMaxSchema,
	type: gETAdminRealmsRealmEventsQueryTypeSchema,
	user: gETAdminRealmsRealmEventsQueryUserSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmEventsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmEventsStatus204Schema = z.void();

export const dELETEAdminRealmsRealmEventsStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmEventsResponseSchema =
	dELETEAdminRealmsRealmEventsStatus204Schema;

export const dELETEAdminRealmsRealmEventsErrorSchema = dELETEAdminRealmsRealmEventsStatus403Schema;

export const dELETEAdminRealmsRealmEventsPathSchema = z.object({
	realm: dELETEAdminRealmsRealmEventsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmEventsConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmEventsConfigStatus200Schema = realmEventsConfigRepresentationSchema;

export const gETAdminRealmsRealmEventsConfigStatus403Schema = z.unknown();

export const gETAdminRealmsRealmEventsConfigResponseSchema =
	gETAdminRealmsRealmEventsConfigStatus200Schema;

export const gETAdminRealmsRealmEventsConfigErrorSchema =
	gETAdminRealmsRealmEventsConfigStatus403Schema;

export const gETAdminRealmsRealmEventsConfigPathSchema = z.object({
	realm: gETAdminRealmsRealmEventsConfigPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmEventsConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmEventsConfigStatus204Schema = z.void();

export const pUTAdminRealmsRealmEventsConfigStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmEventsConfigResponseSchema =
	pUTAdminRealmsRealmEventsConfigStatus204Schema;

export const pUTAdminRealmsRealmEventsConfigErrorSchema =
	pUTAdminRealmsRealmEventsConfigStatus403Schema;

export const pUTAdminRealmsRealmEventsConfigBodySchema =
	realmEventsConfigRepresentationSchema.optional();

export const pUTAdminRealmsRealmEventsConfigPathSchema = z.object({
	realm: pUTAdminRealmsRealmEventsConfigPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupByPathPathPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupByPathPathPathPathSchema = z.string().regex(/.*/);

export const gETAdminRealmsRealmGroupByPathPathStatus200Schema = z.lazy(
	() => groupRepresentationSchema,
);

export const gETAdminRealmsRealmGroupByPathPathStatus403Schema = z.unknown();

export const gETAdminRealmsRealmGroupByPathPathStatus404Schema = z.unknown();

export const gETAdminRealmsRealmGroupByPathPathResponseSchema =
	gETAdminRealmsRealmGroupByPathPathStatus200Schema;

export const gETAdminRealmsRealmGroupByPathPathErrorSchema = z.union([
	gETAdminRealmsRealmGroupByPathPathStatus403Schema,
	gETAdminRealmsRealmGroupByPathPathStatus404Schema,
]);

export const gETAdminRealmsRealmGroupByPathPathPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupByPathPathPathRealmSchema,
	path: gETAdminRealmsRealmGroupByPathPathPathPathSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsPathRealmSchema = z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmGroupsQueryExactSchema = z.boolean().optional().default("false");

export const gETAdminRealmsRealmGroupsQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmGroupsQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmGroupsQueryPopulateHierarchySchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmGroupsQueryQSchema = z.string().optional();

export const gETAdminRealmsRealmGroupsQuerySearchSchema = z.string().optional();

/**
 * Boolean which defines whether to return the count of subgroups for each group (default: true
 */
export const gETAdminRealmsRealmGroupsQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.default("true")
	.describe(
		"Boolean which defines whether to return the count of subgroups for each group (default: true",
	);

export const gETAdminRealmsRealmGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmGroupsResponseSchema = gETAdminRealmsRealmGroupsStatus200Schema;

export const gETAdminRealmsRealmGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsPathRealmSchema,
});

export const gETAdminRealmsRealmGroupsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmGroupsQueryBriefRepresentationSchema,
	exact: gETAdminRealmsRealmGroupsQueryExactSchema,
	first: gETAdminRealmsRealmGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmGroupsQueryMaxSchema,
	populateHierarchy: gETAdminRealmsRealmGroupsQueryPopulateHierarchySchema,
	q: gETAdminRealmsRealmGroupsQueryQSchema,
	search: gETAdminRealmsRealmGroupsQuerySearchSchema,
	subGroupsCount: gETAdminRealmsRealmGroupsQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmGroupsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsStatus204Schema = z.void();

export const pOSTAdminRealmsRealmGroupsStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsResponseSchema = z.union([
	pOSTAdminRealmsRealmGroupsStatus201Schema,
	pOSTAdminRealmsRealmGroupsStatus204Schema,
]);

export const pOSTAdminRealmsRealmGroupsErrorSchema = z.union([
	pOSTAdminRealmsRealmGroupsStatus400Schema,
	pOSTAdminRealmsRealmGroupsStatus409Schema,
]);

export const pOSTAdminRealmsRealmGroupsBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmGroupsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmGroupsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsCountQuerySearchSchema = z.string().optional();

export const gETAdminRealmsRealmGroupsCountQueryTopSchema = z.boolean().optional().default(false);

export const gETAdminRealmsRealmGroupsCountStatus200Schema = z.record(z.string(), z.int());

export const gETAdminRealmsRealmGroupsCountResponseSchema =
	gETAdminRealmsRealmGroupsCountStatus200Schema;

export const gETAdminRealmsRealmGroupsCountPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsCountPathRealmSchema,
});

export const gETAdminRealmsRealmGroupsCountQuerySchema = z.object({
	search: gETAdminRealmsRealmGroupsCountQuerySearchSchema,
	top: gETAdminRealmsRealmGroupsCountQueryTopSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmIdentityProviderImportConfigPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmIdentityProviderImportConfigStatus200Schema = z.record(
	z.string(),
	z.string(),
);

export const pOSTAdminRealmsRealmIdentityProviderImportConfigResponseSchema =
	pOSTAdminRealmsRealmIdentityProviderImportConfigStatus200Schema;

export const pOSTAdminRealmsRealmIdentityProviderImportConfigBodySchema = z
	.record(z.string(), z.unknown())
	.optional();

export const pOSTAdminRealmsRealmIdentityProviderImportConfigPathSchema = z.object({
	realm: pOSTAdminRealmsRealmIdentityProviderImportConfigPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Boolean which defines whether brief representations are returned (default: false)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether brief representations are returned (default: false)");

/**
 * Filter by identity providers capability
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryCapabilitySchema = z
	.string()
	.optional()
	.describe("Filter by identity providers capability");

/**
 * Pagination offset
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Pagination offset");

/**
 * Maximum results size (defaults to 100)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryMaxSchema = z
	.int32()
	.optional()
	.describe("Maximum results size (defaults to 100)");

/**
 * Boolean which defines if only realm-level IDPs (not associated with orgs) should be returned (default: false)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryRealmOnlySchema = z
	.boolean()
	.optional()
	.describe(
		"Boolean which defines if only realm-level IDPs (not associated with orgs) should be returned (default: false)",
	);

/**
 * Filter specific providers by name. Search can be prefix (name*), contains (*name*) or exact ("name"). Default prefixed.
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQuerySearchSchema = z
	.string()
	.optional()
	.describe(
		'Filter specific providers by name. Search can be prefix (name*), contains (*name*) or exact ("name"). Default prefixed.',
	);

/**
 * Filter by identity providers type
 */
export const gETAdminRealmsRealmIdentityProviderInstancesQueryTypeSchema = z
	.string()
	.optional()
	.describe("Filter by identity providers type");

export const gETAdminRealmsRealmIdentityProviderInstancesStatus200Schema = z.array(
	identityProviderRepresentationSchema,
);

export const gETAdminRealmsRealmIdentityProviderInstancesResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesPathRealmSchema,
});

export const gETAdminRealmsRealmIdentityProviderInstancesQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmIdentityProviderInstancesQueryBriefRepresentationSchema,
	capability: gETAdminRealmsRealmIdentityProviderInstancesQueryCapabilitySchema,
	first: gETAdminRealmsRealmIdentityProviderInstancesQueryFirstSchema,
	max: gETAdminRealmsRealmIdentityProviderInstancesQueryMaxSchema,
	realmOnly: gETAdminRealmsRealmIdentityProviderInstancesQueryRealmOnlySchema,
	search: gETAdminRealmsRealmIdentityProviderInstancesQuerySearchSchema,
	type: gETAdminRealmsRealmIdentityProviderInstancesQueryTypeSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmIdentityProviderInstancesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmIdentityProviderInstancesStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmIdentityProviderInstancesStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmIdentityProviderInstancesStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmIdentityProviderInstancesResponseSchema =
	pOSTAdminRealmsRealmIdentityProviderInstancesStatus201Schema;

export const pOSTAdminRealmsRealmIdentityProviderInstancesErrorSchema = z.union([
	pOSTAdminRealmsRealmIdentityProviderInstancesStatus400Schema,
	pOSTAdminRealmsRealmIdentityProviderInstancesStatus409Schema,
]);

export const pOSTAdminRealmsRealmIdentityProviderInstancesBodySchema =
	identityProviderRepresentationSchema.optional();

export const pOSTAdminRealmsRealmIdentityProviderInstancesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmIdentityProviderInstancesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema = z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasStatus200Schema =
	identityProviderRepresentationSchema.omit({ organizationId: true });

export const gETAdminRealmsRealmIdentityProviderInstancesAliasResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema = z.string();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus204Schema = z.void();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasResponseSchema =
	pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus204Schema;

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasErrorSchema = z.union([
	pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus400Schema,
	pUTAdminRealmsRealmIdentityProviderInstancesAliasStatus409Schema,
]);

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasBodySchema =
	identityProviderRepresentationSchema.optional();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasPathSchema = z.object({
	realm: pUTAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema,
	alias: pUTAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema = z.string();

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasStatus200Schema = z.unknown();

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasResponseSchema =
	dELETEAdminRealmsRealmIdentityProviderInstancesAliasStatus200Schema;

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasPathSchema = z.object({
	realm: dELETEAdminRealmsRealmIdentityProviderInstancesAliasPathRealmSchema,
	alias: dELETEAdminRealmsRealmIdentityProviderInstancesAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportPathAliasSchema = z.string();

/**
 * Format to use
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportQueryFormatSchema = z
	.string()
	.optional()
	.describe("Format to use");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportStatus200Schema = z.unknown();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasExportStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasExportPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasExportPathAliasSchema,
});

export const gETAdminRealmsRealmIdentityProviderInstancesAliasExportQuerySchema = z.object({
	format: gETAdminRealmsRealmIdentityProviderInstancesAliasExportQueryFormatSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathAliasSchema =
	z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathSchema =
	z.object({
		realm: gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathRealmSchema,
		alias: gETAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathAliasSchema =
	z.string();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathRealmSchema,
		alias: pUTAdminRealmsRealmIdentityProviderInstancesAliasManagementPermissionsPathAliasSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesPathAliasSchema =
	z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesStatus200Schema = z.record(
	z.string(),
	identityProviderMapperTypeRepresentationSchema,
);

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasMapperTypesPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersPathAliasSchema = z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersStatus200Schema = z.array(
	identityProviderMapperRepresentationSchema,
);

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasMappersStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasMappersPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasMappersPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersPathAliasSchema = z.string();

export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersStatus200Schema = z.unknown();

export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersResponseSchema =
	pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersStatus200Schema;

export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersBodySchema =
	identityProviderMapperRepresentationSchema.optional();

export const pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersPathSchema = z.object({
	realm: pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersPathRealmSchema,
	alias: pOSTAdminRealmsRealmIdentityProviderInstancesAliasMappersPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema = z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema = z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus200Schema =
	identityProviderMapperRepresentationSchema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema,
	id: gETAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema = z.string();

/**
 * Mapper id
 */
export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdResponseSchema =
	pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus204Schema;

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdBodySchema =
	identityProviderMapperRepresentationSchema.optional();

export const pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema,
	alias: pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema,
	id: pUTAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema =
	z.string();

/**
 * Mapper id
 */
export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdResponseSchema =
	dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdStatus204Schema;

export const dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathRealmSchema,
	alias: dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathAliasSchema,
	id: dELETEAdminRealmsRealmIdentityProviderInstancesAliasMappersIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysPathAliasSchema =
	z.string();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysStatus200Schema =
	z.boolean();

export const gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysResponseSchema =
	gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysPathRealmSchema,
	alias: gETAdminRealmsRealmIdentityProviderInstancesAliasReloadKeysPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmIdentityProviderUploadCertificatePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmIdentityProviderUploadCertificateStatus200Schema =
	certificateRepresentationSchema;

export const pOSTAdminRealmsRealmIdentityProviderUploadCertificateResponseSchema =
	pOSTAdminRealmsRealmIdentityProviderUploadCertificateStatus200Schema;

export const pOSTAdminRealmsRealmIdentityProviderUploadCertificatePathSchema = z.object({
	realm: pOSTAdminRealmsRealmIdentityProviderUploadCertificatePathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmKeysPathRealmSchema = z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmKeysStatus200Schema = keysMetadataRepresentationSchema;

export const gETAdminRealmsRealmKeysResponseSchema = gETAdminRealmsRealmKeysStatus200Schema;

export const gETAdminRealmsRealmKeysPathSchema = z.object({
	realm: gETAdminRealmsRealmKeysPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmLocalizationPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmLocalizationStatus200Schema = z.array(z.string());

export const gETAdminRealmsRealmLocalizationStatus403Schema = z.unknown();

export const gETAdminRealmsRealmLocalizationResponseSchema =
	gETAdminRealmsRealmLocalizationStatus200Schema;

export const gETAdminRealmsRealmLocalizationErrorSchema =
	gETAdminRealmsRealmLocalizationStatus403Schema;

export const gETAdminRealmsRealmLocalizationPathSchema = z.object({
	realm: gETAdminRealmsRealmLocalizationPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmLocalizationLocalePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmLocalizationLocalePathLocaleSchema = z.string();

export const gETAdminRealmsRealmLocalizationLocaleQueryUseRealmDefaultLocaleFallbackSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmLocalizationLocaleStatus200Schema = z.record(
	z.string(),
	z.string(),
);

export const gETAdminRealmsRealmLocalizationLocaleStatus403Schema = z.unknown();

export const gETAdminRealmsRealmLocalizationLocaleResponseSchema =
	gETAdminRealmsRealmLocalizationLocaleStatus200Schema;

export const gETAdminRealmsRealmLocalizationLocaleErrorSchema =
	gETAdminRealmsRealmLocalizationLocaleStatus403Schema;

export const gETAdminRealmsRealmLocalizationLocalePathSchema = z.object({
	realm: gETAdminRealmsRealmLocalizationLocalePathRealmSchema,
	locale: gETAdminRealmsRealmLocalizationLocalePathLocaleSchema,
});

export const gETAdminRealmsRealmLocalizationLocaleQuerySchema = z.object({
	useRealmDefaultLocaleFallback:
		gETAdminRealmsRealmLocalizationLocaleQueryUseRealmDefaultLocaleFallbackSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmLocalizationLocalePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmLocalizationLocalePathLocaleSchema = z.string();

export const pOSTAdminRealmsRealmLocalizationLocaleStatus204Schema = z.void();

export const pOSTAdminRealmsRealmLocalizationLocaleStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmLocalizationLocaleStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmLocalizationLocaleResponseSchema =
	pOSTAdminRealmsRealmLocalizationLocaleStatus204Schema;

export const pOSTAdminRealmsRealmLocalizationLocaleErrorSchema = z.union([
	pOSTAdminRealmsRealmLocalizationLocaleStatus400Schema,
	pOSTAdminRealmsRealmLocalizationLocaleStatus403Schema,
]);

export const pOSTAdminRealmsRealmLocalizationLocaleBodySchema = z
	.record(z.string(), z.string())
	.optional();

export const pOSTAdminRealmsRealmLocalizationLocalePathSchema = z.object({
	realm: pOSTAdminRealmsRealmLocalizationLocalePathRealmSchema,
	locale: pOSTAdminRealmsRealmLocalizationLocalePathLocaleSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmLocalizationLocalePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmLocalizationLocalePathLocaleSchema = z.string();

export const dELETEAdminRealmsRealmLocalizationLocaleStatus204Schema = z.void();

export const dELETEAdminRealmsRealmLocalizationLocaleStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmLocalizationLocaleStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmLocalizationLocaleResponseSchema =
	dELETEAdminRealmsRealmLocalizationLocaleStatus204Schema;

export const dELETEAdminRealmsRealmLocalizationLocaleErrorSchema = z.union([
	dELETEAdminRealmsRealmLocalizationLocaleStatus403Schema,
	dELETEAdminRealmsRealmLocalizationLocaleStatus404Schema,
]);

export const dELETEAdminRealmsRealmLocalizationLocalePathSchema = z.object({
	realm: dELETEAdminRealmsRealmLocalizationLocalePathRealmSchema,
	locale: dELETEAdminRealmsRealmLocalizationLocalePathLocaleSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmLocalizationLocaleKeyPathKeySchema = z.string();

export const gETAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema = z.string();

export const gETAdminRealmsRealmLocalizationLocaleKeyStatus200Schema = z.string();

export const gETAdminRealmsRealmLocalizationLocaleKeyStatus403Schema = z.unknown();

export const gETAdminRealmsRealmLocalizationLocaleKeyStatus404Schema = z.unknown();

export const gETAdminRealmsRealmLocalizationLocaleKeyResponseSchema =
	gETAdminRealmsRealmLocalizationLocaleKeyStatus200Schema;

export const gETAdminRealmsRealmLocalizationLocaleKeyErrorSchema = z.union([
	gETAdminRealmsRealmLocalizationLocaleKeyStatus403Schema,
	gETAdminRealmsRealmLocalizationLocaleKeyStatus404Schema,
]);

export const gETAdminRealmsRealmLocalizationLocaleKeyPathSchema = z.object({
	realm: gETAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema,
	key: gETAdminRealmsRealmLocalizationLocaleKeyPathKeySchema,
	locale: gETAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmLocalizationLocaleKeyPathKeySchema = z.string();

export const pUTAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema = z.string();

export const pUTAdminRealmsRealmLocalizationLocaleKeyStatus204Schema = z.void();

export const pUTAdminRealmsRealmLocalizationLocaleKeyStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmLocalizationLocaleKeyStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmLocalizationLocaleKeyResponseSchema =
	pUTAdminRealmsRealmLocalizationLocaleKeyStatus204Schema;

export const pUTAdminRealmsRealmLocalizationLocaleKeyErrorSchema = z.union([
	pUTAdminRealmsRealmLocalizationLocaleKeyStatus400Schema,
	pUTAdminRealmsRealmLocalizationLocaleKeyStatus403Schema,
]);

export const pUTAdminRealmsRealmLocalizationLocaleKeyBodySchema = z.string().optional();

export const pUTAdminRealmsRealmLocalizationLocaleKeyPathSchema = z.object({
	realm: pUTAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema,
	key: pUTAdminRealmsRealmLocalizationLocaleKeyPathKeySchema,
	locale: pUTAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmLocalizationLocaleKeyPathKeySchema = z.string();

export const dELETEAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema = z.string();

export const dELETEAdminRealmsRealmLocalizationLocaleKeyStatus204Schema = z.void();

export const dELETEAdminRealmsRealmLocalizationLocaleKeyStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmLocalizationLocaleKeyStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmLocalizationLocaleKeyResponseSchema =
	dELETEAdminRealmsRealmLocalizationLocaleKeyStatus204Schema;

export const dELETEAdminRealmsRealmLocalizationLocaleKeyErrorSchema = z.union([
	dELETEAdminRealmsRealmLocalizationLocaleKeyStatus403Schema,
	dELETEAdminRealmsRealmLocalizationLocaleKeyStatus404Schema,
]);

export const dELETEAdminRealmsRealmLocalizationLocaleKeyPathSchema = z.object({
	realm: dELETEAdminRealmsRealmLocalizationLocaleKeyPathRealmSchema,
	key: dELETEAdminRealmsRealmLocalizationLocaleKeyPathKeySchema,
	locale: dELETEAdminRealmsRealmLocalizationLocaleKeyPathLocaleSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmLogoutAllPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmLogoutAllStatus200Schema = globalRequestResultSchema;

export const pOSTAdminRealmsRealmLogoutAllStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmLogoutAllResponseSchema =
	pOSTAdminRealmsRealmLogoutAllStatus200Schema;

export const pOSTAdminRealmsRealmLogoutAllErrorSchema =
	pOSTAdminRealmsRealmLogoutAllStatus403Schema;

export const pOSTAdminRealmsRealmLogoutAllPathSchema = z.object({
	realm: pOSTAdminRealmsRealmLogoutAllPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * if false, return the full representation. Otherwise, only the basic fields are returned.
 */
export const gETAdminRealmsRealmOrganizationsQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true)
	.describe(
		"if false, return the full representation. Otherwise, only the basic fields are returned.",
	);

/**
 * Boolean which defines whether the param 'search' must match exactly or not
 */
export const gETAdminRealmsRealmOrganizationsQueryExactSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether the param 'search' must match exactly or not");

/**
 * The position of the first result to be processed (pagination offset)
 */
export const gETAdminRealmsRealmOrganizationsQueryFirstSchema = z
	.int32()
	.optional()
	.default("0")
	.describe("The position of the first result to be processed (pagination offset)");

/**
 * The alias of an identity provider, to only return the organizations linked to it. Cannot be combined with 'q'
 */
export const gETAdminRealmsRealmOrganizationsQueryIdentityProviderSchema = z
	.string()
	.optional()
	.describe(
		"The alias of an identity provider, to only return the organizations linked to it. Cannot be combined with 'q'",
	);

/**
 * The maximum number of results to be returned - defaults to 10
 */
export const gETAdminRealmsRealmOrganizationsQueryMaxSchema = z
	.int32()
	.optional()
	.default("10")
	.describe("The maximum number of results to be returned - defaults to 10");

/**
 * A query to search for custom attributes, in the format 'key1:value2 key2:value2'
 */
export const gETAdminRealmsRealmOrganizationsQueryQSchema = z
	.string()
	.optional()
	.describe("A query to search for custom attributes, in the format 'key1:value2 key2:value2'");

/**
 * A String representing either an organization name or domain
 */
export const gETAdminRealmsRealmOrganizationsQuerySearchSchema = z
	.string()
	.optional()
	.describe("A String representing either an organization name or domain");

export const gETAdminRealmsRealmOrganizationsStatus200Schema = z.array(
	organizationRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsStatus404Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsResponseSchema =
	gETAdminRealmsRealmOrganizationsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsStatus403Schema,
	gETAdminRealmsRealmOrganizationsStatus404Schema,
]);

export const gETAdminRealmsRealmOrganizationsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsPathRealmSchema,
});

export const gETAdminRealmsRealmOrganizationsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmOrganizationsQueryBriefRepresentationSchema,
	exact: gETAdminRealmsRealmOrganizationsQueryExactSchema,
	first: gETAdminRealmsRealmOrganizationsQueryFirstSchema,
	identityProvider: gETAdminRealmsRealmOrganizationsQueryIdentityProviderSchema,
	max: gETAdminRealmsRealmOrganizationsQueryMaxSchema,
	q: gETAdminRealmsRealmOrganizationsQueryQSchema,
	search: gETAdminRealmsRealmOrganizationsQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsResponseSchema =
	pOSTAdminRealmsRealmOrganizationsStatus201Schema;

export const pOSTAdminRealmsRealmOrganizationsErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsStatus403Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsBodySchema =
	organizationRepresentationSchema.optional();

export const pOSTAdminRealmsRealmOrganizationsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Boolean which defines whether the param 'search' must match exactly or not
 */
export const gETAdminRealmsRealmOrganizationsCountQueryExactSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether the param 'search' must match exactly or not");

/**
 * The alias of an identity provider, to only count the organizations linked to it. Cannot be combined with 'q'
 */
export const gETAdminRealmsRealmOrganizationsCountQueryIdentityProviderSchema = z
	.string()
	.optional()
	.describe(
		"The alias of an identity provider, to only count the organizations linked to it. Cannot be combined with 'q'",
	);

/**
 * A query to search for custom attributes, in the format 'key1:value2 key2:value2'
 */
export const gETAdminRealmsRealmOrganizationsCountQueryQSchema = z
	.string()
	.optional()
	.describe("A query to search for custom attributes, in the format 'key1:value2 key2:value2'");

/**
 * A String representing either an organization name or domain
 */
export const gETAdminRealmsRealmOrganizationsCountQuerySearchSchema = z
	.string()
	.optional()
	.describe("A String representing either an organization name or domain");

export const gETAdminRealmsRealmOrganizationsCountStatus200Schema = z.int();

export const gETAdminRealmsRealmOrganizationsCountStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsCountResponseSchema =
	gETAdminRealmsRealmOrganizationsCountStatus200Schema;

export const gETAdminRealmsRealmOrganizationsCountErrorSchema =
	gETAdminRealmsRealmOrganizationsCountStatus403Schema;

export const gETAdminRealmsRealmOrganizationsCountPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsCountPathRealmSchema,
});

export const gETAdminRealmsRealmOrganizationsCountQuerySchema = z.object({
	exact: gETAdminRealmsRealmOrganizationsCountQueryExactSchema,
	identityProvider: gETAdminRealmsRealmOrganizationsCountQueryIdentityProviderSchema,
	q: gETAdminRealmsRealmOrganizationsCountQueryQSchema,
	search: gETAdminRealmsRealmOrganizationsCountQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmPartialExportPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmPartialExportQueryExportClientsSchema = z.boolean().optional();

export const pOSTAdminRealmsRealmPartialExportQueryExportGroupsAndRolesSchema = z
	.boolean()
	.optional();

export const pOSTAdminRealmsRealmPartialExportStatus200Schema = realmRepresentationSchema;

export const pOSTAdminRealmsRealmPartialExportStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmPartialExportResponseSchema =
	pOSTAdminRealmsRealmPartialExportStatus200Schema;

export const pOSTAdminRealmsRealmPartialExportErrorSchema =
	pOSTAdminRealmsRealmPartialExportStatus403Schema;

export const pOSTAdminRealmsRealmPartialExportPathSchema = z.object({
	realm: pOSTAdminRealmsRealmPartialExportPathRealmSchema,
});

export const pOSTAdminRealmsRealmPartialExportQuerySchema = z.object({
	exportClients: pOSTAdminRealmsRealmPartialExportQueryExportClientsSchema,
	exportGroupsAndRoles: pOSTAdminRealmsRealmPartialExportQueryExportGroupsAndRolesSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmPartialImportPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmPartialImportStatus200Schema = z.object({});

export const pOSTAdminRealmsRealmPartialImportStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmPartialImportStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmPartialImportResponseSchema =
	pOSTAdminRealmsRealmPartialImportStatus200Schema;

export const pOSTAdminRealmsRealmPartialImportErrorSchema = z.union([
	pOSTAdminRealmsRealmPartialImportStatus403Schema,
	pOSTAdminRealmsRealmPartialImportStatus409Schema,
]);

export const pOSTAdminRealmsRealmPartialImportBodySchema = z.unknown().optional();

export const pOSTAdminRealmsRealmPartialImportPathSchema = z.object({
	realm: pOSTAdminRealmsRealmPartialImportPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmPushRevocationPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmPushRevocationStatus200Schema = globalRequestResultSchema;

export const pOSTAdminRealmsRealmPushRevocationStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmPushRevocationResponseSchema =
	pOSTAdminRealmsRealmPushRevocationStatus200Schema;

export const pOSTAdminRealmsRealmPushRevocationErrorSchema =
	pOSTAdminRealmsRealmPushRevocationStatus403Schema;

export const pOSTAdminRealmsRealmPushRevocationPathSchema = z.object({
	realm: pOSTAdminRealmsRealmPushRevocationPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesPathRealmSchema = z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmRolesQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmRolesQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmRolesQuerySearchSchema = z.string().optional().default("");

export const gETAdminRealmsRealmRolesStatus200Schema = z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesResponseSchema = gETAdminRealmsRealmRolesStatus200Schema;

export const gETAdminRealmsRealmRolesErrorSchema = gETAdminRealmsRealmRolesStatus403Schema;

export const gETAdminRealmsRealmRolesPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesPathRealmSchema,
});

export const gETAdminRealmsRealmRolesQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmRolesQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmRolesQueryFirstSchema,
	max: gETAdminRealmsRealmRolesQueryMaxSchema,
	search: gETAdminRealmsRealmRolesQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmRolesPathRealmSchema = z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmRolesStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesResponseSchema = pOSTAdminRealmsRealmRolesStatus201Schema;

export const pOSTAdminRealmsRealmRolesErrorSchema = z.union([
	pOSTAdminRealmsRealmRolesStatus400Schema,
	pOSTAdminRealmsRealmRolesStatus403Schema,
	pOSTAdminRealmsRealmRolesStatus404Schema,
	pOSTAdminRealmsRealmRolesStatus409Schema,
	pOSTAdminRealmsRealmRolesStatus500Schema,
]);

export const pOSTAdminRealmsRealmRolesBodySchema = roleRepresentationSchema.optional();

export const pOSTAdminRealmsRealmRolesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmRolesPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmSessionsSessionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmSessionsSessionPathSessionSchema = z.string();

export const dELETEAdminRealmsRealmSessionsSessionQueryIsOfflineSchema = z
	.boolean()
	.optional()
	.default(false);

export const dELETEAdminRealmsRealmSessionsSessionStatus204Schema = z.void();

export const dELETEAdminRealmsRealmSessionsSessionStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmSessionsSessionStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmSessionsSessionResponseSchema =
	dELETEAdminRealmsRealmSessionsSessionStatus204Schema;

export const dELETEAdminRealmsRealmSessionsSessionErrorSchema = z.union([
	dELETEAdminRealmsRealmSessionsSessionStatus403Schema,
	dELETEAdminRealmsRealmSessionsSessionStatus404Schema,
]);

export const dELETEAdminRealmsRealmSessionsSessionPathSchema = z.object({
	realm: dELETEAdminRealmsRealmSessionsSessionPathRealmSchema,
	session: dELETEAdminRealmsRealmSessionsSessionPathSessionSchema,
});

export const dELETEAdminRealmsRealmSessionsSessionQuerySchema = z.object({
	isOffline: dELETEAdminRealmsRealmSessionsSessionQueryIsOfflineSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmTestSMTPConnectionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmTestSMTPConnectionStatus204Schema = z.void();

export const pOSTAdminRealmsRealmTestSMTPConnectionStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmTestSMTPConnectionResponseSchema =
	pOSTAdminRealmsRealmTestSMTPConnectionStatus204Schema;

export const pOSTAdminRealmsRealmTestSMTPConnectionErrorSchema =
	pOSTAdminRealmsRealmTestSMTPConnectionStatus500Schema;

export const pOSTAdminRealmsRealmTestSMTPConnectionBodySchema = z
	.record(z.string(), z.string())
	.optional();

export const pOSTAdminRealmsRealmTestSMTPConnectionPathSchema = z.object({
	realm: pOSTAdminRealmsRealmTestSMTPConnectionPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersPathRealmSchema = z.string().describe("realm name (not id!)");

/**
 * Boolean which defines whether brief representations are returned (default: false)
 */
export const gETAdminRealmsRealmUsersQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether brief representations are returned (default: false)");

/**
 * Only return users created after (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds
 */
export const gETAdminRealmsRealmUsersQueryCreatedAfterSchema = z
	.string()
	.optional()
	.describe(
		"Only return users created after (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds",
	);

/**
 * Only return users created before (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds
 */
export const gETAdminRealmsRealmUsersQueryCreatedBeforeSchema = z
	.string()
	.optional()
	.describe(
		"Only return users created before (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds",
	);

/**
 * A String contained in email, or the complete email, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersQueryEmailSchema = z
	.string()
	.optional()
	.describe('A String contained in email, or the complete email, if param "exact" is true');

/**
 * whether the email has been verified
 */
export const gETAdminRealmsRealmUsersQueryEmailVerifiedSchema = z
	.boolean()
	.optional()
	.describe("whether the email has been verified");

/**
 * Boolean representing if user is enabled or not
 */
export const gETAdminRealmsRealmUsersQueryEnabledSchema = z
	.boolean()
	.optional()
	.describe("Boolean representing if user is enabled or not");

/**
 * Boolean which defines whether the params "last", "first", "email" and "username" must match exactly
 */
export const gETAdminRealmsRealmUsersQueryExactSchema = z
	.boolean()
	.optional()
	.describe(
		'Boolean which defines whether the params "last", "first", "email" and "username" must match exactly',
	);

/**
 * Pagination offset
 */
export const gETAdminRealmsRealmUsersQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Pagination offset");

/**
 * A String contained in firstName, or the complete firstName, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersQueryFirstNameSchema = z
	.string()
	.optional()
	.describe('A String contained in firstName, or the complete firstName, if param "exact" is true');

/**
 * The alias of an Identity Provider linked to the user
 */
export const gETAdminRealmsRealmUsersQueryIdpAliasSchema = z
	.string()
	.optional()
	.describe("The alias of an Identity Provider linked to the user");

/**
 * The userId at an Identity Provider linked to the user
 */
export const gETAdminRealmsRealmUsersQueryIdpUserIdSchema = z
	.string()
	.optional()
	.describe("The userId at an Identity Provider linked to the user");

/**
 * A String contained in lastName, or the complete lastName, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersQueryLastNameSchema = z
	.string()
	.optional()
	.describe('A String contained in lastName, or the complete lastName, if param "exact" is true');

/**
 * Maximum results size (defaults to 100)
 */
export const gETAdminRealmsRealmUsersQueryMaxSchema = z
	.int32()
	.optional()
	.describe("Maximum results size (defaults to 100)");

/**
 * A query to search for custom attributes, in the format 'key1:value2 key2:value2'
 */
export const gETAdminRealmsRealmUsersQueryQSchema = z
	.string()
	.optional()
	.describe("A query to search for custom attributes, in the format 'key1:value2 key2:value2'");

/**
 * A String contained in username, first or last name, or email. Default search behavior is prefix-based (e.g., foo or foo*). Use *foo* for infix search and "foo" for exact search.
 */
export const gETAdminRealmsRealmUsersQuerySearchSchema = z
	.string()
	.optional()
	.describe(
		'A String contained in username, first or last name, or email. Default search behavior is prefix-based (e.g., foo or foo*). Use *foo* for infix search and "foo" for exact search.',
	);

/**
 * A String contained in username, or the complete username, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersQueryUsernameSchema = z
	.string()
	.optional()
	.describe('A String contained in username, or the complete username, if param "exact" is true');

export const gETAdminRealmsRealmUsersStatus200Schema = z.array(userRepresentationSchema);

export const gETAdminRealmsRealmUsersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersResponseSchema = gETAdminRealmsRealmUsersStatus200Schema;

export const gETAdminRealmsRealmUsersErrorSchema = gETAdminRealmsRealmUsersStatus403Schema;

export const gETAdminRealmsRealmUsersPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersPathRealmSchema,
});

export const gETAdminRealmsRealmUsersQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmUsersQueryBriefRepresentationSchema,
	createdAfter: gETAdminRealmsRealmUsersQueryCreatedAfterSchema,
	createdBefore: gETAdminRealmsRealmUsersQueryCreatedBeforeSchema,
	email: gETAdminRealmsRealmUsersQueryEmailSchema,
	emailVerified: gETAdminRealmsRealmUsersQueryEmailVerifiedSchema,
	enabled: gETAdminRealmsRealmUsersQueryEnabledSchema,
	exact: gETAdminRealmsRealmUsersQueryExactSchema,
	first: gETAdminRealmsRealmUsersQueryFirstSchema,
	firstName: gETAdminRealmsRealmUsersQueryFirstNameSchema,
	idpAlias: gETAdminRealmsRealmUsersQueryIdpAliasSchema,
	idpUserId: gETAdminRealmsRealmUsersQueryIdpUserIdSchema,
	lastName: gETAdminRealmsRealmUsersQueryLastNameSchema,
	max: gETAdminRealmsRealmUsersQueryMaxSchema,
	q: gETAdminRealmsRealmUsersQueryQSchema,
	search: gETAdminRealmsRealmUsersQuerySearchSchema,
	username: gETAdminRealmsRealmUsersQueryUsernameSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersPathRealmSchema = z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersResponseSchema = pOSTAdminRealmsRealmUsersStatus201Schema;

export const pOSTAdminRealmsRealmUsersErrorSchema = z.union([
	pOSTAdminRealmsRealmUsersStatus400Schema,
	pOSTAdminRealmsRealmUsersStatus403Schema,
	pOSTAdminRealmsRealmUsersStatus409Schema,
	pOSTAdminRealmsRealmUsersStatus500Schema,
]);

export const pOSTAdminRealmsRealmUsersBodySchema = userRepresentationSchema.optional();

export const pOSTAdminRealmsRealmUsersPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmUsersManagementPermissionsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersManagementPermissionsResponseSchema =
	gETAdminRealmsRealmUsersManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmUsersManagementPermissionsErrorSchema =
	gETAdminRealmsRealmUsersManagementPermissionsStatus403Schema;

export const gETAdminRealmsRealmUsersManagementPermissionsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersManagementPermissionsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmUsersManagementPermissionsStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmUsersManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmUsersManagementPermissionsErrorSchema =
	pUTAdminRealmsRealmUsersManagementPermissionsStatus403Schema;

export const pUTAdminRealmsRealmUsersManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmUsersManagementPermissionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersManagementPermissionsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Only return users created after (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds
 */
export const gETAdminRealmsRealmUsersCountQueryCreatedAfterSchema = z
	.string()
	.optional()
	.describe(
		"Only return users created after (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds",
	);

/**
 * Only return users created before (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds
 */
export const gETAdminRealmsRealmUsersCountQueryCreatedBeforeSchema = z
	.string()
	.optional()
	.describe(
		"Only return users created before (inclusive) the given date, in ISO-8601 format (yyyy-MM-dd) or epoch milliseconds",
	);

/**
 * A String contained in email, or the complete email, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersCountQueryEmailSchema = z
	.string()
	.optional()
	.describe('A String contained in email, or the complete email, if param "exact" is true');

/**
 * whether the email has been verified
 */
export const gETAdminRealmsRealmUsersCountQueryEmailVerifiedSchema = z
	.boolean()
	.optional()
	.describe("whether the email has been verified");

/**
 * Boolean representing if user is enabled or not
 */
export const gETAdminRealmsRealmUsersCountQueryEnabledSchema = z
	.boolean()
	.optional()
	.describe("Boolean representing if user is enabled or not");

/**
 * Boolean which defines whether the params "last", "first", "email" and "username" must match exactly
 */
export const gETAdminRealmsRealmUsersCountQueryExactSchema = z
	.boolean()
	.optional()
	.describe(
		'Boolean which defines whether the params "last", "first", "email" and "username" must match exactly',
	);

/**
 * A String contained in firstName, or the complete firstName, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersCountQueryFirstNameSchema = z
	.string()
	.optional()
	.describe('A String contained in firstName, or the complete firstName, if param "exact" is true');

/**
 * The alias of an Identity Provider linked to the user
 */
export const gETAdminRealmsRealmUsersCountQueryIdpAliasSchema = z
	.string()
	.optional()
	.describe("The alias of an Identity Provider linked to the user");

/**
 * The userId at an Identity Provider linked to the user
 */
export const gETAdminRealmsRealmUsersCountQueryIdpUserIdSchema = z
	.string()
	.optional()
	.describe("The userId at an Identity Provider linked to the user");

/**
 * A String contained in lastName, or the complete lastName, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersCountQueryLastNameSchema = z
	.string()
	.optional()
	.describe('A String contained in lastName, or the complete lastName, if param "exact" is true');

/**
 * A query to search for custom attributes, in the format 'key1:value2 key2:value2'
 */
export const gETAdminRealmsRealmUsersCountQueryQSchema = z
	.string()
	.optional()
	.describe("A query to search for custom attributes, in the format 'key1:value2 key2:value2'");

/**
 * A String contained in username, first or last name, or email. Default search behavior is prefix-based (e.g., foo or foo*). Use *foo* for infix search and "foo" for exact search.
 */
export const gETAdminRealmsRealmUsersCountQuerySearchSchema = z
	.string()
	.optional()
	.describe(
		'A String contained in username, first or last name, or email. Default search behavior is prefix-based (e.g., foo or foo*). Use *foo* for infix search and "foo" for exact search.',
	);

/**
 * A String contained in username, or the complete username, if param "exact" is true
 */
export const gETAdminRealmsRealmUsersCountQueryUsernameSchema = z
	.string()
	.optional()
	.describe('A String contained in username, or the complete username, if param "exact" is true');

export const gETAdminRealmsRealmUsersCountStatus200Schema = z.int32();

export const gETAdminRealmsRealmUsersCountStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersCountResponseSchema =
	gETAdminRealmsRealmUsersCountStatus200Schema;

export const gETAdminRealmsRealmUsersCountErrorSchema =
	gETAdminRealmsRealmUsersCountStatus403Schema;

export const gETAdminRealmsRealmUsersCountPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersCountPathRealmSchema,
});

export const gETAdminRealmsRealmUsersCountQuerySchema = z.object({
	createdAfter: gETAdminRealmsRealmUsersCountQueryCreatedAfterSchema,
	createdBefore: gETAdminRealmsRealmUsersCountQueryCreatedBeforeSchema,
	email: gETAdminRealmsRealmUsersCountQueryEmailSchema,
	emailVerified: gETAdminRealmsRealmUsersCountQueryEmailVerifiedSchema,
	enabled: gETAdminRealmsRealmUsersCountQueryEnabledSchema,
	exact: gETAdminRealmsRealmUsersCountQueryExactSchema,
	firstName: gETAdminRealmsRealmUsersCountQueryFirstNameSchema,
	idpAlias: gETAdminRealmsRealmUsersCountQueryIdpAliasSchema,
	idpUserId: gETAdminRealmsRealmUsersCountQueryIdpUserIdSchema,
	lastName: gETAdminRealmsRealmUsersCountQueryLastNameSchema,
	q: gETAdminRealmsRealmUsersCountQueryQSchema,
	search: gETAdminRealmsRealmUsersCountQuerySearchSchema,
	username: gETAdminRealmsRealmUsersCountQueryUsernameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersProfilePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersProfileStatus200Schema = UPConfigSchema;

export const gETAdminRealmsRealmUsersProfileStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersProfileResponseSchema =
	gETAdminRealmsRealmUsersProfileStatus200Schema;

export const gETAdminRealmsRealmUsersProfileErrorSchema =
	gETAdminRealmsRealmUsersProfileStatus403Schema;

export const gETAdminRealmsRealmUsersProfilePathSchema = z.object({
	realm: gETAdminRealmsRealmUsersProfilePathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersProfilePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersProfileStatus200Schema = UPConfigSchema;

export const pUTAdminRealmsRealmUsersProfileStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersProfileResponseSchema =
	pUTAdminRealmsRealmUsersProfileStatus200Schema;

export const pUTAdminRealmsRealmUsersProfileErrorSchema =
	pUTAdminRealmsRealmUsersProfileStatus403Schema;

export const pUTAdminRealmsRealmUsersProfileBodySchema = UPConfigSchema.optional();

export const pUTAdminRealmsRealmUsersProfilePathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersProfilePathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersProfileMetadataPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersProfileMetadataStatus200Schema = userProfileMetadataSchema;

export const gETAdminRealmsRealmUsersProfileMetadataStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersProfileMetadataResponseSchema =
	gETAdminRealmsRealmUsersProfileMetadataStatus200Schema;

export const gETAdminRealmsRealmUsersProfileMetadataErrorSchema =
	gETAdminRealmsRealmUsersProfileMetadataStatus403Schema;

export const gETAdminRealmsRealmUsersProfileMetadataPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersProfileMetadataPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmWorkflowsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Boolean which defines whether the param 'search' must match exactly or not
 */
export const gETAdminRealmsRealmWorkflowsQueryExactSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether the param 'search' must match exactly or not");

/**
 * The position of the first result to be processed (pagination offset)
 */
export const gETAdminRealmsRealmWorkflowsQueryFirstSchema = z
	.int32()
	.optional()
	.default("0")
	.describe("The position of the first result to be processed (pagination offset)");

/**
 * The maximum number of results to be returned - defaults to 10
 */
export const gETAdminRealmsRealmWorkflowsQueryMaxSchema = z
	.int32()
	.optional()
	.default("10")
	.describe("The maximum number of results to be returned - defaults to 10");

/**
 * A String representing the workflow name - either partial or exact
 */
export const gETAdminRealmsRealmWorkflowsQuerySearchSchema = z
	.string()
	.optional()
	.describe("A String representing the workflow name - either partial or exact");

export const gETAdminRealmsRealmWorkflowsStatus200Schema = workflowRepresentationSchema;

export const gETAdminRealmsRealmWorkflowsStatus400Schema = z.unknown();

export const gETAdminRealmsRealmWorkflowsResponseSchema =
	gETAdminRealmsRealmWorkflowsStatus200Schema;

export const gETAdminRealmsRealmWorkflowsErrorSchema = gETAdminRealmsRealmWorkflowsStatus400Schema;

export const gETAdminRealmsRealmWorkflowsPathSchema = z.object({
	realm: gETAdminRealmsRealmWorkflowsPathRealmSchema,
});

export const gETAdminRealmsRealmWorkflowsQuerySchema = z.object({
	exact: gETAdminRealmsRealmWorkflowsQueryExactSchema,
	first: gETAdminRealmsRealmWorkflowsQueryFirstSchema,
	max: gETAdminRealmsRealmWorkflowsQueryMaxSchema,
	search: gETAdminRealmsRealmWorkflowsQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmWorkflowsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmWorkflowsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmWorkflowsStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmWorkflowsResponseSchema =
	pOSTAdminRealmsRealmWorkflowsStatus201Schema;

export const pOSTAdminRealmsRealmWorkflowsErrorSchema =
	pOSTAdminRealmsRealmWorkflowsStatus400Schema;

export const pOSTAdminRealmsRealmWorkflowsBodySchema = workflowRepresentationSchema.optional();

export const pOSTAdminRealmsRealmWorkflowsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmWorkflowsPathRealmSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmWorkflowsMigratePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * A String representing the id of the step to migrate from
 */
export const pOSTAdminRealmsRealmWorkflowsMigrateQueryFromSchema = z
	.string()
	.optional()
	.describe("A String representing the id of the step to migrate from");

/**
 * A String representing the id of the step to migrate to
 */
export const pOSTAdminRealmsRealmWorkflowsMigrateQueryToSchema = z
	.string()
	.optional()
	.describe("A String representing the id of the step to migrate to");

export const pOSTAdminRealmsRealmWorkflowsMigrateStatus204Schema = z.void();

export const pOSTAdminRealmsRealmWorkflowsMigrateStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmWorkflowsMigrateResponseSchema =
	pOSTAdminRealmsRealmWorkflowsMigrateStatus204Schema;

export const pOSTAdminRealmsRealmWorkflowsMigrateErrorSchema =
	pOSTAdminRealmsRealmWorkflowsMigrateStatus400Schema;

export const pOSTAdminRealmsRealmWorkflowsMigratePathSchema = z.object({
	realm: pOSTAdminRealmsRealmWorkflowsMigratePathRealmSchema,
});

export const pOSTAdminRealmsRealmWorkflowsMigrateQuerySchema = z.object({
	from: pOSTAdminRealmsRealmWorkflowsMigrateQueryFromSchema,
	to: pOSTAdminRealmsRealmWorkflowsMigrateQueryToSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmWorkflowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Workflow identifier
 */
export const gETAdminRealmsRealmWorkflowsIdPathIdSchema = z
	.string()
	.describe("Workflow identifier");

/**
 * Indicates whether the workflow and step ids should be included in the representation or not - defaults to true
 */
export const gETAdminRealmsRealmWorkflowsIdQueryIncludeIdSchema = z
	.boolean()
	.optional()
	.describe(
		"Indicates whether the workflow and step ids should be included in the representation or not - defaults to true",
	);

export const gETAdminRealmsRealmWorkflowsIdStatus200Schema = workflowRepresentationSchema;

export const gETAdminRealmsRealmWorkflowsIdStatus400Schema = z.unknown();

export const gETAdminRealmsRealmWorkflowsIdResponseSchema =
	gETAdminRealmsRealmWorkflowsIdStatus200Schema;

export const gETAdminRealmsRealmWorkflowsIdErrorSchema =
	gETAdminRealmsRealmWorkflowsIdStatus400Schema;

export const gETAdminRealmsRealmWorkflowsIdPathSchema = z.object({
	realm: gETAdminRealmsRealmWorkflowsIdPathRealmSchema,
	id: gETAdminRealmsRealmWorkflowsIdPathIdSchema,
});

export const gETAdminRealmsRealmWorkflowsIdQuerySchema = z.object({
	includeId: gETAdminRealmsRealmWorkflowsIdQueryIncludeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmWorkflowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Workflow identifier
 */
export const pUTAdminRealmsRealmWorkflowsIdPathIdSchema = z
	.string()
	.describe("Workflow identifier");

export const pUTAdminRealmsRealmWorkflowsIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmWorkflowsIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmWorkflowsIdResponseSchema =
	pUTAdminRealmsRealmWorkflowsIdStatus204Schema;

export const pUTAdminRealmsRealmWorkflowsIdErrorSchema =
	pUTAdminRealmsRealmWorkflowsIdStatus400Schema;

export const pUTAdminRealmsRealmWorkflowsIdBodySchema = workflowRepresentationSchema.optional();

export const pUTAdminRealmsRealmWorkflowsIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmWorkflowsIdPathRealmSchema,
	id: pUTAdminRealmsRealmWorkflowsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmWorkflowsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Workflow identifier
 */
export const dELETEAdminRealmsRealmWorkflowsIdPathIdSchema = z
	.string()
	.describe("Workflow identifier");

export const dELETEAdminRealmsRealmWorkflowsIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmWorkflowsIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmWorkflowsIdResponseSchema =
	dELETEAdminRealmsRealmWorkflowsIdStatus204Schema;

export const dELETEAdminRealmsRealmWorkflowsIdErrorSchema =
	dELETEAdminRealmsRealmWorkflowsIdStatus400Schema;

export const dELETEAdminRealmsRealmWorkflowsIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmWorkflowsIdPathRealmSchema,
	id: dELETEAdminRealmsRealmWorkflowsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Workflow identifier
 */
export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathIdSchema = z
	.string()
	.describe("Workflow identifier");

/**
 * Resource identifier
 */
export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathResourceIdSchema = z
	.string()
	.describe("Resource identifier");

/**
 * Resource type
 */
export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathTypeSchema = z
	.enum(["USERS", "CLIENTS"])
	.describe("Resource type");

/**
 * Optional value representing the time to schedule the first workflow step. The value is either an integer representing the seconds from now, an integer followed by 'ms' representing milliseconds from now, or an ISO-8601 date string.
 */
export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdQueryNotBeforeSchema = z
	.string()
	.optional()
	.describe(
		"Optional value representing the time to schedule the first workflow step. The value is either an integer representing the seconds from now, an integer followed by 'ms' representing milliseconds from now, or an ISO-8601 date string.",
	);

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdStatus204Schema = z.void();

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdResponseSchema =
	pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdStatus204Schema;

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdErrorSchema =
	pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdStatus400Schema;

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathSchema = z.object({
	realm: pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathRealmSchema,
	id: pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathIdSchema,
	resourceId: pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathResourceIdSchema,
	type: pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdPathTypeSchema,
});

export const pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdQuerySchema = z.object({
	notBefore: pOSTAdminRealmsRealmWorkflowsIdActivateTypeResourceIdQueryNotBeforeSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Workflow identifier
 */
export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathIdSchema = z
	.string()
	.describe("Workflow identifier");

/**
 * Resource identifier
 */
export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathResourceIdSchema = z
	.string()
	.describe("Resource identifier");

/**
 * Resource type
 */
export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathTypeSchema = z
	.enum(["USERS", "CLIENTS"])
	.describe("Resource type");

export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdStatus204Schema = z.void();

export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdResponseSchema =
	pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdStatus204Schema;

export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdErrorSchema =
	pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdStatus400Schema;

export const pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathSchema = z.object({
	realm: pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathRealmSchema,
	id: pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathIdSchema,
	resourceId: pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathResourceIdSchema,
	type: pOSTAdminRealmsRealmWorkflowsIdDeactivateTypeResourceIdPathTypeSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema = z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdStatus200Schema =
	clientScopeRepresentationSchema;

export const gETAdminRealmsRealmClientScopesClientScopeIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientScopesClientScopeIdResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdErrorSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdStatus403Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdPathSchema = z.object({
	realm: gETAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema,
	clientScopeId: gETAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema = z.string();

export const pUTAdminRealmsRealmClientScopesClientScopeIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientScopesClientScopeIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmClientScopesClientScopeIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmClientScopesClientScopeIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmClientScopesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmClientScopesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmClientScopesClientScopeIdErrorSchema = z.union([
	pUTAdminRealmsRealmClientScopesClientScopeIdStatus400Schema,
	pUTAdminRealmsRealmClientScopesClientScopeIdStatus403Schema,
	pUTAdminRealmsRealmClientScopesClientScopeIdStatus409Schema,
]);

export const pUTAdminRealmsRealmClientScopesClientScopeIdBodySchema =
	clientScopeRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientScopesClientScopeIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema,
	clientScopeId: pUTAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema = z.string();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdStatus500Schema = z.unknown();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmClientScopesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmClientScopesClientScopeIdErrorSchema = z.union([
	dELETEAdminRealmsRealmClientScopesClientScopeIdStatus400Schema,
	dELETEAdminRealmsRealmClientScopesClientScopeIdStatus403Schema,
	dELETEAdminRealmsRealmClientScopesClientScopeIdStatus500Schema,
]);

export const dELETEAdminRealmsRealmClientScopesClientScopeIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientScopesClientScopeIdPathRealmSchema,
	clientScopeId: dELETEAdminRealmsRealmClientScopesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsResponseSchema =
	pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsStatus204Schema;

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsBodySchema = z
	.array(protocolMapperRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersAddModelsPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus200Schema =
	z.array(protocolMapperRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema,
	},
);

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsResponseSchema =
	pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus201Schema;

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsErrorSchema =
	pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsStatus409Schema;

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus200Schema =
	protocolMapperRepresentationSchema;

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdResponseSchema =
	pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus204Schema;

export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: pUTAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdResponseSchema =
	dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdStatus204Schema;

export const dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: dELETEAdminRealmsRealmClientScopesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathProtocolSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolStatus200Schema =
	z.array(protocolMapperRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathClientScopeIdSchema,
		protocol:
			gETAdminRealmsRealmClientScopesClientScopeIdProtocolMappersProtocolProtocolPathProtocolSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsPathRealmSchema,
	clientScopeId: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientResponseSchema =
	pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus204Schema;

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client: pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientResponseSchema =
	dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientStatus204Schema;

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client:
			dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailableResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailableStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathClientScopeIdSchema,
		client:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientAvailablePathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathClientSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathClientScopeIdSchema,
		client:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositePathClientSchema,
	});

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema,
	clientScopeId:
		gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema,
	clientScopeId:
		pOSTAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathSchema = z.object(
	{
		realm: dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
	},
);

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailablePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailablePathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailablePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmAvailablePathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositePathClientScopeIdSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositePathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositePathClientScopeIdSchema,
	});

export const gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmClientScopesClientScopeIdScopeMappingsRealmCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema = z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdStatus200Schema =
	clientScopeRepresentationSchema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdErrorSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdPathSchema = z.object({
	realm: gETAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema,
	clientScopeId: gETAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema = z.string();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdErrorSchema = z.union([
	pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus400Schema,
	pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema,
	pUTAdminRealmsRealmClientTemplatesClientScopeIdStatus409Schema,
]);

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdBodySchema =
	clientScopeRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema,
	clientScopeId: pUTAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema = z.string();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus500Schema = z.unknown();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdErrorSchema = z.union([
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus400Schema,
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus403Schema,
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdStatus500Schema,
]);

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientTemplatesClientScopeIdPathRealmSchema,
	clientScopeId: dELETEAdminRealmsRealmClientTemplatesClientScopeIdPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsResponseSchema =
	pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsStatus204Schema;

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsBodySchema = z
	.array(protocolMapperRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersAddModelsPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus200Schema =
	z.array(protocolMapperRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsResponseSchema =
	pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus201Schema;

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsErrorSchema =
	pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsStatus409Schema;

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus200Schema =
	protocolMapperRepresentationSchema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdResponseSchema =
	pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus204Schema;

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: pUTAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema =
	z.string();

/**
 * Mapper id
 */
export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema =
	z.string().describe("Mapper id");

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdResponseSchema =
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdStatus204Schema;

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathClientScopeIdSchema,
		id: dELETEAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersModelsIdPathIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathProtocolSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolStatus200Schema =
	z.array(protocolMapperRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathClientScopeIdSchema,
		protocol:
			gETAdminRealmsRealmClientTemplatesClientScopeIdProtocolMappersProtocolProtocolPathProtocolSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsPathRealmSchema,
	clientScopeId:
		gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsPathClientScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientResponseSchema =
	pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus204Schema;

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientBodySchema =
	z.array(roleRepresentationSchema).optional();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema =
	z.string();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientResponseSchema =
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientStatus204Schema;

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientBodySchema =
	z.array(roleRepresentationSchema).optional();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathSchema =
	z.object({
		realm:
			dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientScopeIdSchema,
		client:
			dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientPathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailableResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailableStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathClientScopeIdSchema,
		client:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientAvailablePathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathClientSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathClientScopeIdSchema,
		client:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositePathClientSchema,
	});

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
	},
);

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema,
		clientScopeId:
			pOSTAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathRealmSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailablePathClientScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailablePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailablePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmAvailablePathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositePathClientScopeIdSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositePathRealmSchema,
		clientScopeId:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositePathClientScopeIdSchema,
	});

export const gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmClientTemplatesClientScopeIdScopeMappingsRealmCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidStatus200Schema = clientRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidResponseSchema =
	gETAdminRealmsRealmClientsClientUuidStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientsClientUuidStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidErrorSchema = z.union([
	pUTAdminRealmsRealmClientsClientUuidStatus400Schema,
	pUTAdminRealmsRealmClientsClientUuidStatus409Schema,
]);

export const pUTAdminRealmsRealmClientsClientUuidBodySchema = clientRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientsClientUuidPathRealmSchema,
	clientUuid: pUTAdminRealmsRealmClientsClientUuidPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientsClientUuidResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidPathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerStatus200Schema =
	resourceServerRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerBodySchema =
	resourceServerRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerPathRealmSchema,
	clientUuid: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportBodySchema =
	resourceServerRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerImportPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryFieldsSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryMaxSchema = z
	.int32()
	.optional()
	.default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryOwnerSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryPermissionSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryPolicyIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryResourceSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryResourceTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryScopeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryTypeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus200Schema =
	z.array(abstractPolicyRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionResponseSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus200Schema,
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus204Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathClientUuidSchema,
	},
);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQuerySchema =
	z.object({
		fields: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryFieldsSchema,
		first: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryFirstSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryNameSchema,
		owner: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryOwnerSchema,
		permission:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryPermissionSchema,
		policyId: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryPolicyIdSchema,
		resource: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryResourceSchema,
		resourceType:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryResourceTypeSchema,
		scope: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionQueryTypeSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionStatus201Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionBodySchema = z
	.lazy(() => policyRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathRealmSchema,
		clientUuid:
			pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionPathClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluatePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluatePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus200Schema =
	policyEvaluationResponseSchema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus500Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateErrorSchema =
	z.union([
		pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus403Schema,
		pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateStatus500Schema,
	]);

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluateBodySchema =
	policyEvaluationRequestSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluatePathSchema =
	z.object({
		realm:
			pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluatePathRealmSchema,
		clientUuid:
			pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionEvaluatePathClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersStatus200Schema =
	z.array(policyProviderRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionProvidersPathClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchQueryFieldsSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus200Schema =
	abstractPolicyRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchResponseSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus200Schema,
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus204Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchStatus400Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchQuerySchema =
	z.object({
		fields:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchQueryFieldsSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPermissionSearchQueryNameSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryFieldsSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryMaxSchema = z
	.int32()
	.optional()
	.default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryOwnerSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryPermissionSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryPolicyIdSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryResourceSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryResourceTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryScopeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryTypeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus200Schema = z.array(
	abstractPolicyRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyResponseSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus200Schema,
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus204Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQuerySchema = z.object({
	fields: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryFieldsSchema,
	first: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryMaxSchema,
	name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryNameSchema,
	owner: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryOwnerSchema,
	permission: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryPermissionSchema,
	policyId: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryPolicyIdSchema,
	resource: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryResourceSchema,
	resourceType:
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryResourceTypeSchema,
	scope: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryScopeSchema,
	type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyQueryTypeSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyStatus201Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyBodySchema = z
	.lazy(() => policyRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluatePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluatePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus200Schema =
	policyEvaluationResponseSchema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus500Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateErrorSchema =
	z.union([
		pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus403Schema,
		pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateStatus500Schema,
	]);

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluateBodySchema =
	policyEvaluationRequestSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluatePathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluatePathRealmSchema,
		clientUuid:
			pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyEvaluatePathClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersStatus200Schema =
	z.array(policyProviderRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicyProvidersPathClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchQueryFieldsSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus200Schema =
	abstractPolicyRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchResponseSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus200Schema,
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus204Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchStatus400Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchQuerySchema =
	z.object({
		fields: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchQueryFieldsSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerPolicySearchQueryNameSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryIdSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryDeepSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryExactNameSchema = z
	.boolean()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMaxSchema = z
	.int32()
	.optional()
	.default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryOwnerSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryScopeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryTypeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryUriSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus200Schema =
	z.array(z.lazy(() => resourceRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQuerySchema = z.object({
	_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryIdSchema,
	deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryDeepSchema,
	exactName: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryExactNameSchema,
	first: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryFirstSchema,
	matchingUri:
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMatchingUriSchema,
	max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMaxSchema,
	name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryNameSchema,
	owner: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryOwnerSchema,
	scope: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryScopeSchema,
	type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryTypeSchema,
	uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryUriSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryIdSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryDeepSchema = z
	.boolean()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryExactNameSchema =
	z.boolean().optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryFirstSchema = z
	.int32()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMatchingUriSchema =
	z.boolean().optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMaxSchema = z
	.int32()
	.optional()
	.default("100");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryNameSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryOwnerSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryScopeSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryTypeSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryUriSchema = z
	.string()
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus201Schema =
	z.lazy(() => resourceRepresentationSchema.omit({ uri: true }));

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus400Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus201Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceErrorSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceStatus400Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceBodySchema = z
	.lazy(() => resourceRepresentationSchema.omit({ owner: true }))
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourcePathClientUuidSchema,
});

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQuerySchema = z.object(
	{
		_id: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryIdSchema,
		deep: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryDeepSchema,
		exactName: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryExactNameSchema,
		first: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryFirstSchema,
		matchingUri:
			pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMatchingUriSchema,
		max: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryMaxSchema,
		name: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryNameSchema,
		owner: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryOwnerSchema,
		scope: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryScopeSchema,
		type: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryTypeSchema,
		uri: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceQueryUriSchema,
	},
);

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryIdSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryDeepSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryExactNameSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryFirstSchema =
	z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryMaxSchema = z
	.int32()
	.optional()
	.default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryOwnerSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryUriSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus200Schema =
	z.lazy(() => resourceRepresentationSchema.omit({ uri: true }));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchResponseSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus200Schema,
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus204Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchStatus400Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQuerySchema =
	z.object({
		_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryIdSchema,
		deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryDeepSchema,
		exactName:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryExactNameSchema,
		first: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryFirstSchema,
		matchingUri:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryMatchingUriSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryNameSchema,
		owner: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryOwnerSchema,
		scope: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryTypeSchema,
		uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceSearchQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema =
	z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema =
	z.int32().optional().default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus200Schema =
	z.lazy(() => resourceRepresentationSchema.omit({ uri: true }));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema,
		resourceId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQuerySchema =
	z.object({
		_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema,
		deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema,
		exactName:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema,
		first:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema,
		matchingUri:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema,
		owner:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema,
		uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema =
	z.boolean().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema =
	z.boolean().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema =
	z.int32().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema =
	z.boolean().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema =
	z.int32().optional().default("100");

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema =
	z.string().optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema =
	z.string();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdErrorSchema =
	pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema;

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdBodySchema = z
	.lazy(() => resourceRepresentationSchema.omit({ owner: true }))
	.optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema,
		clientUuid:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema,
		resourceId:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema,
	});

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQuerySchema =
	z.object({
		_id: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema,
		deep: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema,
		exactName:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema,
		first:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema,
		matchingUri:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema,
		max: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema,
		name: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema,
		owner:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema,
		scope:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema,
		type: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema,
		uri: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema =
	z.boolean().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema =
	z.boolean().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema =
	z.int32().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema =
	z.boolean().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema =
	z.int32().optional().default("100");

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema =
	z.string().optional();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdErrorSchema =
	dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdStatus404Schema;

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathSchema =
	z.object({
		realm:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathRealmSchema,
		clientUuid:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathClientUuidSchema,
		resourceId:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPathResourceIdSchema,
	});

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQuerySchema =
	z.object({
		_id: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryIdSchema,
		deep: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryDeepSchema,
		exactName:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryExactNameSchema,
		first:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryFirstSchema,
		matchingUri:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMatchingUriSchema,
		max: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryMaxSchema,
		name: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryNameSchema,
		owner:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryOwnerSchema,
		scope:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryScopeSchema,
		type: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryTypeSchema,
		uri: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryDeepSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryExactNameSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryFirstSchema =
	z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryMaxSchema =
	z.int32().optional().default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryOwnerSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryUriSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathResourceIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesStatus200Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathClientUuidSchema,
		resourceId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesPathResourceIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQuerySchema =
	z.object({
		_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryIdSchema,
		deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryDeepSchema,
		exactName:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryExactNameSchema,
		first:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryFirstSchema,
		matchingUri:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryMatchingUriSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryNameSchema,
		owner:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryOwnerSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryTypeSchema,
		uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdAttributesQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryDeepSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryExactNameSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryFirstSchema =
	z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryMaxSchema =
	z.int32().optional().default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryOwnerSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryUriSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathResourceIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsStatus200Schema =
	z.array(z.lazy(() => policyRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathClientUuidSchema,
		resourceId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsPathResourceIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQuerySchema =
	z.object({
		_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryIdSchema,
		deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryDeepSchema,
		exactName:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryExactNameSchema,
		first:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryFirstSchema,
		matchingUri:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryMatchingUriSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryNameSchema,
		owner:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryOwnerSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryTypeSchema,
		uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdPermissionsQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryDeepSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryExactNameSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryFirstSchema =
	z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryMatchingUriSchema =
	z.boolean().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryMaxSchema =
	z.int32().optional().default("100");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryNameSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryOwnerSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryTypeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryUriSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathResourceIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesStatus200Schema =
	z.array(z.lazy(() => scopeRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathClientUuidSchema,
		resourceId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesPathResourceIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQuerySchema =
	z.object({
		_id: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryIdSchema,
		deep: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryDeepSchema,
		exactName:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryExactNameSchema,
		first:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryFirstSchema,
		matchingUri:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryMatchingUriSchema,
		max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryMaxSchema,
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryNameSchema,
		owner:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryOwnerSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryScopeSchema,
		type: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryTypeSchema,
		uri: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerResourceResourceIdScopesQueryUriSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryMaxSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryScopeIdSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeStatus200Schema = z.array(
	z.lazy(() => scopeRepresentationSchema),
);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQuerySchema = z.object({
	first: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryMaxSchema,
	name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryNameSchema,
	scopeId: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeQueryScopeIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeStatus200Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeBodySchema = z
	.lazy(() => scopeRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopePathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchQueryNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus200Schema =
	z.array(z.lazy(() => scopeRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus204Schema =
	z.void();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchResponseSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus200Schema,
		gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus204Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchStatus400Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchQuerySchema =
	z.object({
		name: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeSearchQueryNameSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema =
	z.lazy(() => scopeRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema,
		scopeId: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema =
	z.string();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema =
	z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema;

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdBodySchema = z
	.lazy(() => scopeRepresentationSchema)
	.optional();

export const pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema,
		clientUuid:
			pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema,
		scopeId: pUTAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema =
	z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdStatus200Schema;

export const dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathRealmSchema,
		clientUuid:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathClientUuidSchema,
		scopeId:
			dELETEAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPathScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsStatus200Schema =
	z.array(z.lazy(() => policyRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathClientUuidSchema,
		scopeId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdPermissionsPathScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathScopeIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesStatus200Schema =
	z.array(z.lazy(() => resourceRepresentationSchema));

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesErrorSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesStatus404Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathClientUuidSchema,
		scopeId:
			gETAdminRealmsRealmClientsClientUuidAuthzResourceServerScopeScopeIdResourcesPathScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsStatus200Schema =
	resourceServerRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidAuthzResourceServerSettingsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathAttrSchema = z.string();

export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrStatus200Schema =
	certificateRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrResponseSchema =
	gETAdminRealmsRealmClientsClientUuidCertificatesAttrStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathClientUuidSchema,
	attr: gETAdminRealmsRealmClientsClientUuidCertificatesAttrPathAttrSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathAttrSchema =
	z.string();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadStatus200Schema =
	z.instanceof(Blob);

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadBodySchema =
	keyStoreConfigSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathClientUuidSchema,
	attr: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrDownloadPathAttrSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathAttrSchema =
	z.string();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateStatus200Schema =
	certificateRepresentationSchema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathClientUuidSchema,
	attr: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGeneratePathAttrSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathAttrSchema =
	z.string();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadStatus200Schema =
	z.instanceof(Blob);

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadBodySchema =
	keyStoreConfigSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathRealmSchema,
		clientUuid:
			pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathClientUuidSchema,
		attr: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrGenerateAndDownloadPathAttrSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathAttrSchema = z.string();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadStatus200Schema =
	certificateRepresentationSchema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathClientUuidSchema,
	attr: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadPathAttrSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathAttrSchema =
	z.string();

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificateStatus200Schema =
	certificateRepresentationSchema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificateResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificateStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathRealmSchema,
		clientUuid:
			pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathClientUuidSchema,
		attr: pOSTAdminRealmsRealmClientsClientUuidCertificatesAttrUploadCertificatePathAttrSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidClientSecretPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidClientSecretPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidClientSecretStatus200Schema =
	credentialRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidClientSecretResponseSchema =
	gETAdminRealmsRealmClientsClientUuidClientSecretStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidClientSecretPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidClientSecretPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidClientSecretPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidClientSecretPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidClientSecretPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidClientSecretStatus200Schema =
	credentialRepresentationSchema;

export const pOSTAdminRealmsRealmClientsClientUuidClientSecretResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidClientSecretStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidClientSecretPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidClientSecretPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidClientSecretPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidClientSecretRotatedPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidClientSecretRotatedPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidClientSecretRotatedStatus200Schema =
	credentialRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidClientSecretRotatedResponseSchema =
	gETAdminRealmsRealmClientsClientUuidClientSecretRotatedStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidClientSecretRotatedPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidClientSecretRotatedPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidClientSecretRotatedPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedStatus200Schema =
	z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedStatus200Schema;

export const dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedPathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidClientSecretRotatedPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidDefaultClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidDefaultClientScopesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidDefaultClientScopesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidDefaultClientScopesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidDefaultClientScopesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidDefaultClientScopesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidDefaultClientScopesPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidDefaultClientScopesPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathRealmSchema,
		clientUuid:
			pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientUuidSchema,
		clientScopeId:
			pUTAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathRealmSchema,
		clientUuid:
			dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientUuidSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientsClientUuidDefaultClientScopesClientScopeIdPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryAudienceSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryUserIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus200Schema =
	accessTokenSchema.omit({ resource_access: true });

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenErrorSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus403Schema,
		gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenStatus404Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQuerySchema =
	z.object({
		audience:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryAudienceSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryScopeSchema,
		userId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleAccessTokenQueryUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryAudienceSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryUserIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus200Schema =
	IDTokenSchema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenErrorSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus403Schema,
		gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenStatus404Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQuerySchema =
	z.object({
		audience:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryAudienceSchema,
		scope: gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryScopeSchema,
		userId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleIdTokenQueryUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponsePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponsePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryAudienceSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryUserIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseStatus200Schema =
	samlExampleResponseSchema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponsePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponsePathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponsePathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQuerySchema =
	z.object({
		audience:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryAudienceSchema,
		scope:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryScopeSchema,
		userId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleSamlResponseQueryUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoQueryUserIdSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoStatus200Schema =
	z.object({});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoErrorSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoStatus403Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoPathClientUuidSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoQuerySchema =
	z.object({
		scope:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoQueryScopeSchema,
		userId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesGenerateExampleUserinfoQueryUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersQueryScopeSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersStatus200Schema =
	z.array(protocolMapperEvaluationRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersErrorSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersStatus403Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersPathClientUuidSchema,
	},
);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersQuerySchema =
	z.object({
		scope: gETAdminRealmsRealmClientsClientUuidEvaluateScopesProtocolMappersQueryScopeSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

/**
 * either realm name OR client UUID
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathRoleContainerIdSchema =
	z.string().describe("either realm name OR client UUID");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedErrorSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedStatus403Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathClientUuidSchema,
		roleContainerId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedPathRoleContainerIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedQuerySchema =
	z.object({
		scope:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdGrantedQueryScopeSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

/**
 * either realm name OR client UUID
 */
export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathRoleContainerIdSchema =
	z.string().describe("either realm name OR client UUID");

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedQueryScopeSchema =
	z.string().optional();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedResponseSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedErrorSchema =
	gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedStatus403Schema;

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathClientUuidSchema,
		roleContainerId:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedPathRoleContainerIdSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedQuerySchema =
	z.object({
		scope:
			gETAdminRealmsRealmClientsClientUuidEvaluateScopesScopeMappingsRoleContainerIdNotGrantedQueryScopeSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathProviderIdSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdStatus200Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdResponseSchema =
	gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathClientUuidSchema,
		providerId:
			gETAdminRealmsRealmClientsClientUuidInstallationProvidersProviderIdPathProviderIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidManagementPermissionsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmClientsClientUuidManagementPermissionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidManagementPermissionsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidManagementPermissionsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidManagementPermissionsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidManagementPermissionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientsClientUuidManagementPermissionsPathRealmSchema,
	clientUuid: pUTAdminRealmsRealmClientsClientUuidManagementPermissionsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidNodesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidNodesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidNodesStatus204Schema = z.void();

export const pOSTAdminRealmsRealmClientsClientUuidNodesStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidNodesResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidNodesStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidNodesErrorSchema =
	pOSTAdminRealmsRealmClientsClientUuidNodesStatus400Schema;

export const pOSTAdminRealmsRealmClientsClientUuidNodesBodySchema = z
	.record(z.string(), z.string())
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidNodesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidNodesPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidNodesPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidNodesNodePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidNodesNodePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidNodesNodePathNodeSchema = z.string();

export const dELETEAdminRealmsRealmClientsClientUuidNodesNodeStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientsClientUuidNodesNodeResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidNodesNodeStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidNodesNodePathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidNodesNodePathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidNodesNodePathClientUuidSchema,
	node: dELETEAdminRealmsRealmClientsClientUuidNodesNodePathNodeSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionCountPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionCountStatus200Schema = z.record(
	z.string(),
	z.int(),
);

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionCountResponseSchema =
	gETAdminRealmsRealmClientsClientUuidOfflineSessionCountStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionCountPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidOfflineSessionCountPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidOfflineSessionCountPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * Paging offset
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Paging offset");

/**
 * Maximum results size.
 */
export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum results size.");

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsStatus200Schema = z.array(
	userSessionRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidOfflineSessionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidOfflineSessionsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidOfflineSessionsPathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidOfflineSessionsQuerySchema = z.object({
	first: gETAdminRealmsRealmClientsClientUuidOfflineSessionsQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidOfflineSessionsQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOptionalClientScopesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidOptionalClientScopesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidOptionalClientScopesStatus200Schema = z.array(
	clientScopeRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidOptionalClientScopesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidOptionalClientScopesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidOptionalClientScopesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidOptionalClientScopesPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidOptionalClientScopesPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathRealmSchema,
		clientUuid:
			pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientUuidSchema,
		clientScopeId:
			pUTAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientScopeIdSchema =
	z.string();

export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathRealmSchema,
		clientUuid:
			dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientUuidSchema,
		clientScopeId:
			dELETEAdminRealmsRealmClientsClientUuidOptionalClientScopesClientScopeIdPathClientScopeIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsBodySchema = z
	.array(protocolMapperRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidProtocolMappersAddModelsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus200Schema = z.array(
	protocolMapperRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus201Schema;

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsErrorSchema =
	pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsStatus409Schema;

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidProtocolMappersModelsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * Mapper id
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus200Schema =
	protocolMapperRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdResponseSchema =
	gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema,
	id: gETAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * Mapper id
 */
export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdBodySchema =
	protocolMapperRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema,
	clientUuid: pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema,
	id: pUTAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * Mapper id
 */
export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema = z
	.string()
	.describe("Mapper id");

export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathClientUuidSchema,
	id: dELETEAdminRealmsRealmClientsClientUuidProtocolMappersModelsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathProtocolSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolStatus200Schema =
	z.array(protocolMapperRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolResponseSchema =
	gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathClientUuidSchema,
		protocol: gETAdminRealmsRealmClientsClientUuidProtocolMappersProtocolProtocolPathProtocolSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidPushRevocationPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidPushRevocationPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidPushRevocationStatus200Schema =
	globalRequestResultSchema;

export const pOSTAdminRealmsRealmClientsClientUuidPushRevocationResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidPushRevocationStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidPushRevocationPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidPushRevocationPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidPushRevocationPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenStatus200Schema =
	clientRepresentationSchema;

export const pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenStatus200Schema;

export const pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidRegistrationAccessTokenPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmClientsClientUuidRolesQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidRolesQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmClientsClientUuidRolesQuerySearchSchema = z
	.string()
	.optional()
	.default("");

export const gETAdminRealmsRealmClientsClientUuidRolesStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidRolesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesErrorSchema =
	gETAdminRealmsRealmClientsClientUuidRolesStatus403Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesPathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidRolesQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmClientsClientUuidRolesQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmClientsClientUuidRolesQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidRolesQueryMaxSchema,
	search: gETAdminRealmsRealmClientsClientUuidRolesQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRolesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRolesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus201Schema;

export const pOSTAdminRealmsRealmClientsClientUuidRolesErrorSchema = z.union([
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus400Schema,
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus403Schema,
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus404Schema,
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus409Schema,
	pOSTAdminRealmsRealmClientsClientUuidRolesStatus500Schema,
]);

export const pOSTAdminRealmsRealmClientsClientUuidRolesBodySchema =
	roleRepresentationSchema.optional();

export const pOSTAdminRealmsRealmClientsClientUuidRolesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidRolesPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidRolesPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus200Schema =
	roleRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameErrorSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema,
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema,
	roleName: gETAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus204Schema = z.void();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus204Schema;

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameErrorSchema = z.union([
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus400Schema,
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema,
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema,
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameStatus409Schema,
]);

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameBodySchema =
	roleRepresentationSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathSchema = z.object({
	realm: pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema,
	clientUuid: pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema,
	roleName: pUTAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameErrorSchema = z.union([
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus400Schema,
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus403Schema,
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameStatus404Schema,
]);

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathClientUuidSchema,
	roleName: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesErrorSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema,
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema,
	roleName: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus204Schema = z.void();

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema =
	z.unknown();

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesErrorSchema = z.union([
	pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema,
	pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema,
]);

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema,
	roleName: pOSTAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesErrorSchema = z.union([
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus403Schema,
	dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesStatus404Schema,
]);

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathClientUuidSchema,
	roleName: dELETEAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathRoleNameSchema =
	z.string().describe("role's name (not id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathTargetClientUuidSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidErrorSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus403Schema,
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidStatus404Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathClientUuidSchema,
		roleName:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathRoleNameSchema,
		targetClientUuid:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesClientsTargetClientUuidPathTargetClientUuidSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmErrorSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus403Schema,
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmStatus404Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathClientUuidSchema,
	roleName: gETAdminRealmsRealmClientsClientUuidRolesRoleNameCompositesRealmPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * the role name.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathRoleNameSchema = z
	.string()
	.describe("the role name.");

/**
 * If false, return a full representation of the {@code GroupRepresentation} objects.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.default(true)
		.describe("If false, return a full representation of the {@code GroupRepresentation} objects.");

/**
 * First result to return. Ignored if negative or {@code null}.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("First result to return. Ignored if negative or {@code null}.");

/**
 * Maximum number of results to return. Unbounded if negative.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum number of results to return. Unbounded if negative.");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus404Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsErrorSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus403Schema,
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsStatus404Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathClientUuidSchema,
	roleName: gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsPathRoleNameSchema,
});

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidRolesRoleNameGroupsQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRoleNameSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsErrorSchema =
	z.union([
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus403Schema,
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus404Schema,
	]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathClientUuidSchema,
		roleName:
			gETAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRoleNameSchema,
	});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRoleNameSchema =
	z.string();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsErrorSchema =
	z.union([
		pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus403Schema,
		pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsStatus404Schema,
	]);

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathSchema =
	z.object({
		realm: pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRealmSchema,
		clientUuid:
			pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathClientUuidSchema,
		roleName:
			pUTAdminRealmsRealmClientsClientUuidRolesRoleNameManagementPermissionsPathRoleNameSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * the role name.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathRoleNameSchema = z
	.string()
	.describe("the role name.");

/**
 * Boolean which defines whether brief representations are returned (default: false)
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.describe("Boolean which defines whether brief representations are returned (default: false)");

/**
 * first result to return. Ignored if negative or {@code null}.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryFirstSchema = z
	.int32()
	.optional()
	.describe("first result to return. Ignored if negative or {@code null}.");

/**
 * Maximum number of results to return. Unbounded if negative.
 */
export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum number of results to return. Unbounded if negative.");

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus200Schema =
	z.array(userRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus404Schema = z.unknown();

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersResponseSchema =
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersErrorSchema = z.union([
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus403Schema,
	gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersStatus404Schema,
]);

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathClientUuidSchema,
	roleName: gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersPathRoleNameSchema,
});

export const gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidRolesRoleNameUsersQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidScopeMappingsPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema,
	client: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema =
	z.string();

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema,
	client: pOSTAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema =
	z.string();

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathSchema = z.object(
	{
		realm: dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathRealmSchema,
		clientUuid:
			dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientUuidSchema,
		client: dELETEAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientPathClientSchema,
	},
);

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathClientSchema =
	z.string();

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailableResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailableStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathClientUuidSchema,
		client: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientAvailablePathClientSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathClientUuidSchema =
	z.string().describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathClientSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathSchema =
	z.object({
		realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathRealmSchema,
		clientUuid:
			gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathClientUuidSchema,
		client: gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositePathClientSchema,
	});

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmClientsClientUuidScopeMappingsClientsClientCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus204Schema = z.void();

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathSchema = z.object({
	realm: pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema,
	clientUuid: pOSTAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus204Schema = z.void();

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathSchema = z.object({
	realm: dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathRealmSchema,
	clientUuid: dELETEAdminRealmsRealmClientsClientUuidScopeMappingsRealmPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailablePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailablePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailablePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmAvailablePathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositePathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmClientsClientUuidScopeMappingsRealmCompositeQueryBriefRepresentationSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidServiceAccountUserPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidServiceAccountUserPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidServiceAccountUserStatus200Schema =
	userRepresentationSchema;

export const gETAdminRealmsRealmClientsClientUuidServiceAccountUserResponseSchema =
	gETAdminRealmsRealmClientsClientUuidServiceAccountUserStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidServiceAccountUserPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidServiceAccountUserPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidServiceAccountUserPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidSessionCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidSessionCountPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidSessionCountStatus200Schema = z.record(
	z.string(),
	z.int(),
);

export const gETAdminRealmsRealmClientsClientUuidSessionCountResponseSchema =
	gETAdminRealmsRealmClientsClientUuidSessionCountStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidSessionCountPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidSessionCountPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidSessionCountPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidTestNodesAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidTestNodesAvailablePathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

export const gETAdminRealmsRealmClientsClientUuidTestNodesAvailableStatus200Schema =
	globalRequestResultSchema;

export const gETAdminRealmsRealmClientsClientUuidTestNodesAvailableResponseSchema =
	gETAdminRealmsRealmClientsClientUuidTestNodesAvailableStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidTestNodesAvailablePathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidTestNodesAvailablePathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidTestNodesAvailablePathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmClientsClientUuidUserSessionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of client (not client-id!)
 */
export const gETAdminRealmsRealmClientsClientUuidUserSessionsPathClientUuidSchema = z
	.string()
	.describe("id of client (not client-id!)");

/**
 * Paging offset
 */
export const gETAdminRealmsRealmClientsClientUuidUserSessionsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Paging offset");

/**
 * Maximum results size.
 */
export const gETAdminRealmsRealmClientsClientUuidUserSessionsQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum results size.");

export const gETAdminRealmsRealmClientsClientUuidUserSessionsStatus200Schema = z.array(
	userSessionRepresentationSchema,
);

export const gETAdminRealmsRealmClientsClientUuidUserSessionsResponseSchema =
	gETAdminRealmsRealmClientsClientUuidUserSessionsStatus200Schema;

export const gETAdminRealmsRealmClientsClientUuidUserSessionsPathSchema = z.object({
	realm: gETAdminRealmsRealmClientsClientUuidUserSessionsPathRealmSchema,
	clientUuid: gETAdminRealmsRealmClientsClientUuidUserSessionsPathClientUuidSchema,
});

export const gETAdminRealmsRealmClientsClientUuidUserSessionsQuerySchema = z.object({
	first: gETAdminRealmsRealmClientsClientUuidUserSessionsQueryFirstSchema,
	max: gETAdminRealmsRealmClientsClientUuidUserSessionsQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdPathGroupIdSchema = z.string();

export const gETAdminRealmsRealmGroupsGroupIdStatus200Schema = z.lazy(
	() => groupRepresentationSchema,
);

export const gETAdminRealmsRealmGroupsGroupIdResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmGroupsGroupIdPathGroupIdSchema = z.string();

export const pUTAdminRealmsRealmGroupsGroupIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmGroupsGroupIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmGroupsGroupIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmGroupsGroupIdResponseSchema =
	pUTAdminRealmsRealmGroupsGroupIdStatus204Schema;

export const pUTAdminRealmsRealmGroupsGroupIdErrorSchema = z.union([
	pUTAdminRealmsRealmGroupsGroupIdStatus400Schema,
	pUTAdminRealmsRealmGroupsGroupIdStatus409Schema,
]);

export const pUTAdminRealmsRealmGroupsGroupIdBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pUTAdminRealmsRealmGroupsGroupIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmGroupsGroupIdPathRealmSchema,
	groupId: pUTAdminRealmsRealmGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmGroupsGroupIdPathGroupIdSchema = z.string();

export const dELETEAdminRealmsRealmGroupsGroupIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmGroupsGroupIdResponseSchema =
	dELETEAdminRealmsRealmGroupsGroupIdStatus204Schema;

export const dELETEAdminRealmsRealmGroupsGroupIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmGroupsGroupIdPathRealmSchema,
	groupId: dELETEAdminRealmsRealmGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdChildrenPathGroupIdSchema = z.string();

/**
 * Boolean which defines whether brief groups representations are returned or not (default: false)
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default("false")
	.describe(
		"Boolean which defines whether brief groups representations are returned or not (default: false)",
	);

/**
 * Boolean which defines whether the params "search" must match exactly or not
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQueryExactSchema = z
	.boolean()
	.optional()
	.describe('Boolean which defines whether the params "search" must match exactly or not');

/**
 * The position of the first result to be returned (pagination offset).
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQueryFirstSchema = z
	.int32()
	.optional()
	.default("0")
	.describe("The position of the first result to be returned (pagination offset).");

/**
 * The maximum number of results that are to be returned. Defaults to 10
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQueryMaxSchema = z
	.int32()
	.optional()
	.default("10")
	.describe("The maximum number of results that are to be returned. Defaults to 10");

/**
 * A String representing either an exact group name or a partial name, defaults to prefix search.
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQuerySearchSchema = z
	.string()
	.optional()
	.describe(
		"A String representing either an exact group name or a partial name, defaults to prefix search.",
	);

/**
 * Boolean which defines whether to return the count of subgroups for each subgroup of this group (default: true)
 */
export const gETAdminRealmsRealmGroupsGroupIdChildrenQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.default("true")
	.describe(
		"Boolean which defines whether to return the count of subgroups for each subgroup of this group (default: true)",
	);

export const gETAdminRealmsRealmGroupsGroupIdChildrenStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmGroupsGroupIdChildrenResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdChildrenStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdChildrenPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdChildrenPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdChildrenPathGroupIdSchema,
});

export const gETAdminRealmsRealmGroupsGroupIdChildrenQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmGroupsGroupIdChildrenQueryBriefRepresentationSchema,
	exact: gETAdminRealmsRealmGroupsGroupIdChildrenQueryExactSchema,
	first: gETAdminRealmsRealmGroupsGroupIdChildrenQueryFirstSchema,
	max: gETAdminRealmsRealmGroupsGroupIdChildrenQueryMaxSchema,
	search: gETAdminRealmsRealmGroupsGroupIdChildrenQuerySearchSchema,
	subGroupsCount: gETAdminRealmsRealmGroupsGroupIdChildrenQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmGroupsGroupIdChildrenPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenPathGroupIdSchema = z.string();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus204Schema = z.void();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenResponseSchema = z.union([
	pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus201Schema,
	pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus204Schema,
]);

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenErrorSchema = z.union([
	pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus400Schema,
	pOSTAdminRealmsRealmGroupsGroupIdChildrenStatus409Schema,
]);

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmGroupsGroupIdChildrenPathSchema = z.object({
	realm: pOSTAdminRealmsRealmGroupsGroupIdChildrenPathRealmSchema,
	groupId: pOSTAdminRealmsRealmGroupsGroupIdChildrenPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdManagementPermissionsPathGroupIdSchema = z.string();

export const gETAdminRealmsRealmGroupsGroupIdManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmGroupsGroupIdManagementPermissionsResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdManagementPermissionsPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdManagementPermissionsPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdManagementPermissionsPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsPathGroupIdSchema = z.string();

export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsPathRealmSchema,
	groupId: pUTAdminRealmsRealmGroupsGroupIdManagementPermissionsPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdMembersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdMembersPathGroupIdSchema = z.string();

/**
 * Only return basic information (only guaranteed to return id, username, created, first and last name, email, enabled state, email verification state, federation link, and access. Note that it means that namely user attributes, required actions, and not before are not returned.)
 */
export const gETAdminRealmsRealmGroupsGroupIdMembersQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.describe(
		"Only return basic information (only guaranteed to return id, username, created, first and last name, email, enabled state, email verification state, federation link, and access. Note that it means that namely user attributes, required actions, and not before are not returned.)",
	);

/**
 * Pagination offset
 */
export const gETAdminRealmsRealmGroupsGroupIdMembersQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Pagination offset");

/**
 * Maximum results size (defaults to 100)
 */
export const gETAdminRealmsRealmGroupsGroupIdMembersQueryMaxSchema = z
	.int32()
	.optional()
	.describe("Maximum results size (defaults to 100)");

export const gETAdminRealmsRealmGroupsGroupIdMembersStatus200Schema =
	z.array(userRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdMembersResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdMembersStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdMembersPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdMembersPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdMembersPathGroupIdSchema,
});

export const gETAdminRealmsRealmGroupsGroupIdMembersQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmGroupsGroupIdMembersQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmGroupsGroupIdMembersQueryFirstSchema,
	max: gETAdminRealmsRealmGroupsGroupIdMembersQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsPathGroupIdSchema = z.string();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsErrorSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsStatus403Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
	clientId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema = z.void();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema;

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
	groupId: pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
	clientId: pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema;

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
	groupId: dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
	clientId: dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailableResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailableStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathSchema =
	z.object({
		realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathRealmSchema,
		groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathGroupIdSchema,
		clientId:
			gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdAvailablePathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathSchema =
	z.object({
		realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathRealmSchema,
		groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathGroupIdSchema,
		clientId:
			gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositePathClientIdSchema,
	});

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmGroupsGroupIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema = z.string();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema = z.unknown();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmErrorSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema = z.string();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus204Schema = z.void();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmErrorSchema = z.union([
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus400Schema,
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema,
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus404Schema,
	pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus500Schema,
]);

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathSchema = z.object({
	realm: pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema,
	groupId: pOSTAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema = z.string();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus204Schema = z.void();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus500Schema = z.unknown();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmErrorSchema = z.union([
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus400Schema,
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus403Schema,
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus404Schema,
	dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmStatus500Schema,
]);

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathSchema = z.object({
	realm: dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathRealmSchema,
	groupId: dELETEAdminRealmsRealmGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailablePathGroupIdSchema =
	z.string();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableErrorSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailableStatus403Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailablePathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailablePathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmAvailablePathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositePathGroupIdSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeErrorSchema =
	gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeStatus403Schema;

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositePathSchema = z.object({
	realm: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositePathRealmSchema,
	groupId: gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositePathGroupIdSchema,
});

export const gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmGroupsGroupIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmIdentityProviderProvidersProviderIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * The provider id to get the factory
 */
export const gETAdminRealmsRealmIdentityProviderProvidersProviderIdPathProviderIdSchema = z
	.string()
	.describe("The provider id to get the factory");

export const gETAdminRealmsRealmIdentityProviderProvidersProviderIdStatus200Schema = z.object({});

export const gETAdminRealmsRealmIdentityProviderProvidersProviderIdResponseSchema =
	gETAdminRealmsRealmIdentityProviderProvidersProviderIdStatus200Schema;

export const gETAdminRealmsRealmIdentityProviderProvidersProviderIdPathSchema = z.object({
	realm: gETAdminRealmsRealmIdentityProviderProvidersProviderIdPathRealmSchema,
	providerId: gETAdminRealmsRealmIdentityProviderProvidersProviderIdPathProviderIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsPathMemberIdSchema =
	z.string();

/**
 * if false, return the full representation. Otherwise, only the basic fields are returned.
 */
export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.default(true)
		.describe(
			"if false, return the full representation. Otherwise, only the basic fields are returned.",
		);

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus200Schema = z.array(
	organizationRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsResponseSchema =
	gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus400Schema,
	gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsStatus403Schema,
]);

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsPathRealmSchema,
	memberId: gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsPathMemberIdSchema,
});

export const gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmOrganizationsMembersMemberIdOrganizationsQueryBriefRepresentationSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdStatus200Schema =
	organizationRepresentationSchema;

export const gETAdminRealmsRealmOrganizationsOrgIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmOrganizationsOrgIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema = z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmOrganizationsOrgIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdResponseSchema =
	pUTAdminRealmsRealmOrganizationsOrgIdStatus204Schema;

export const pUTAdminRealmsRealmOrganizationsOrgIdErrorSchema = z.union([
	pUTAdminRealmsRealmOrganizationsOrgIdStatus400Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdStatus403Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdStatus409Schema,
]);

export const pUTAdminRealmsRealmOrganizationsOrgIdBodySchema =
	organizationRepresentationSchema.optional();

export const pUTAdminRealmsRealmOrganizationsOrgIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmOrganizationsOrgIdPathRealmSchema,
	orgId: pUTAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdErrorSchema = z.union([
	dELETEAdminRealmsRealmOrganizationsOrgIdStatus400Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdStatus403Schema,
]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmOrganizationsOrgIdPathRealmSchema,
	orgId: dELETEAdminRealmsRealmOrganizationsOrgIdPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryExactSchema = z
	.boolean()
	.optional()
	.default("false");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryPopulateHierarchySchema = z
	.boolean()
	.optional()
	.default(false);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryQSchema = z.string().optional();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQuerySearchSchema = z.string().optional();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.default(false);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsPathOrgIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryBriefRepresentationSchema,
	exact: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryExactSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryMaxSchema,
	populateHierarchy: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryPopulateHierarchySchema,
	q: gETAdminRealmsRealmOrganizationsOrgIdGroupsQueryQSchema,
	search: gETAdminRealmsRealmOrganizationsOrgIdGroupsQuerySearchSchema,
	subGroupsCount: gETAdminRealmsRealmOrganizationsOrgIdGroupsQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsPathOrgIdSchema = z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus204Schema = z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsResponseSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus201Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus204Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus404Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsStatus409Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathPathSchema = z
	.string()
	.regex(/.*/);

/**
 * Whether to return a brief representation (default: true)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.default(true)
		.describe("Whether to return a brief representation (default: true)");

/**
 * Whether to return the count of subgroups (default: false)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.default(false)
	.describe("Whether to return the count of subgroups (default: false)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus200Schema = z.lazy(
	() => groupRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus403Schema,
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathStatus404Schema,
]);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathOrgIdSchema,
	path: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathPathPathSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathQueryBriefRepresentationSchema,
	subGroupsCount:
		gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupByPathPathQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema = z.string();

/**
 * Whether to return the count of subgroups (default: false)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.default(false)
	.describe("Whether to return the count of subgroups (default: false)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus200Schema = z.lazy(
	() => groupRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema,
	groupId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdQuerySchema = z.object({
	subGroupsCount: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema = z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema = z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdResponseSchema =
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus204Schema;

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdErrorSchema = z.union([
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus400Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus409Schema,
]);

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema,
	orgId: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema,
	groupId: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdErrorSchema = z.union([
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus403Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathRealmSchema,
	orgId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathOrgIdSchema,
	groupId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathGroupIdSchema =
	z.string();

/**
 * Boolean which defines whether the params "search" must match exactly or not
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryExactSchema = z
	.boolean()
	.optional()
	.describe('Boolean which defines whether the params "search" must match exactly or not');

/**
 * The position of the first result to be returned (pagination offset).
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryFirstSchema = z
	.int32()
	.optional()
	.default("0")
	.describe("The position of the first result to be returned (pagination offset).");

/**
 * The maximum number of results that are to be returned. Defaults to 10
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryMaxSchema = z
	.int32()
	.optional()
	.default("10")
	.describe("The maximum number of results that are to be returned. Defaults to 10");

/**
 * A String representing either an exact group name or a partial name
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQuerySearchSchema = z
	.string()
	.optional()
	.describe("A String representing either an exact group name or a partial name");

/**
 * Whether to return the count of subgroups (default: false)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQuerySubGroupsCountSchema = z
	.boolean()
	.optional()
	.describe("Whether to return the count of subgroups (default: false)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathOrgIdSchema,
	groupId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathGroupIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQuerySchema = z.object({
	exact: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryExactSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryFirstSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQueryMaxSchema,
	search: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQuerySearchSchema,
	subGroupsCount:
		gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenQuerySubGroupsCountSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathOrgIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathGroupIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus201Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus204Schema = z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus400Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus404Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus409Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenResponseSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus201Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus204Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus404Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenStatus409Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenBodySchema = z
	.lazy(() => groupRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathOrgIdSchema,
	groupId: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdChildrenPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathGroupIdSchema =
	z.string();

/**
 * Only return basic information (only guaranteed to return id, username, created, first and last name, email, enabled state, email verification state, federation link, and access. Note that it means that namely user attributes, required actions, and not before are not returned.)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.describe(
			"Only return basic information (only guaranteed to return id, username, created, first and last name, email, enabled state, email verification state, federation link, and access. Note that it means that namely user attributes, required actions, and not before are not returned.)",
		);

/**
 * Pagination offset
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryFirstSchema = z
	.int32()
	.optional()
	.describe("Pagination offset");

/**
 * Maximum results size (defaults to 100)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryMaxSchema = z
	.int32()
	.optional()
	.describe("Maximum results size (defaults to 100)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersStatus200Schema = z.array(
	memberRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathOrgIdSchema,
	groupId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersPathGroupIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryFirstSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathOrgIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathGroupIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathUserIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus400Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus409Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdResponseSchema =
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus204Schema;

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdErrorSchema = z.union([
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus400Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus403Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus404Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus409Schema,
]);

export const pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathRealmSchema,
	orgId: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathOrgIdSchema,
	groupId: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathGroupIdSchema,
	userId: pUTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathOrgIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathGroupIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathUserIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus400Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdErrorSchema =
	z.union([
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus400Schema,
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus403Schema,
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdStatus404Schema,
	]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathRealmSchema,
		orgId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathOrgIdSchema,
		groupId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathGroupIdSchema,
		userId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdMembersUserIdPathUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathGroupIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathOrgIdSchema,
	groupId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
		orgId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema,
		groupId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
		clientId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdBodySchema =
	z.array(roleRepresentationSchema).optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathSchema =
	z.object({
		realm:
			pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
		orgId:
			pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema,
		groupId:
			pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
		clientId:
			pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdBodySchema =
	z.array(roleRepresentationSchema).optional();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathSchema =
	z.object({
		realm:
			dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathRealmSchema,
		orgId:
			dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathOrgIdSchema,
		groupId:
			dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathGroupIdSchema,
		clientId:
			dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdPathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailableResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailableStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathRealmSchema,
		orgId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathOrgIdSchema,
		groupId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathGroupIdSchema,
		clientId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdAvailablePathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathGroupIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathRealmSchema,
		orgId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathOrgIdSchema,
		groupId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathGroupIdSchema,
		clientId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositePathClientIdSchema,
	});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathSchema =
	z.object({
		realm: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema,
		orgId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema,
		groupId: gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus400Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus404Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus500Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmErrorSchema =
	z.union([
		pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus400Schema,
		pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema,
		pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus404Schema,
		pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus500Schema,
	]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathSchema =
	z.object({
		realm: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema,
		orgId: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema,
		groupId: pOSTAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
	});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus400Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus500Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmErrorSchema =
	z.union([
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus400Schema,
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus403Schema,
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus404Schema,
		dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmStatus500Schema,
	]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathSchema =
	z.object({
		realm: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathRealmSchema,
		orgId: dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathOrgIdSchema,
		groupId:
			dELETEAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmPathGroupIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathGroupIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailableStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathRealmSchema,
		orgId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathOrgIdSchema,
		groupId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmAvailablePathGroupIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathRealmSchema =
	z.string().describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathGroupIdSchema =
	z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathSchema =
	z.object({
		realm:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathRealmSchema,
		orgId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathOrgIdSchema,
		groupId:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositePathGroupIdSchema,
	});

export const gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmOrganizationsOrgIdGroupsGroupIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus200Schema = z.array(
	identityProviderRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathOrgIdSchema = z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus204Schema = z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersStatus409Schema,
]);

/**
 * Payload should contain only id or alias of the identity provider to be associated with the organization (id or alias with or without quotes). Surrounding whitespace characters will be trimmed.
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersBodySchema = z
	.string()
	.describe(
		"Payload should contain only id or alias of the identity provider to be associated with the organization (id or alias with or without quotes). Surrounding whitespace characters will be trimmed.",
	);

export const pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus200Schema =
	identityProviderRepresentationSchema.omit({ organizationId: true });

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema,
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema,
]);

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema,
	alias: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus204Schema = z.void();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus400Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasResponseSchema =
	pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus204Schema;

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasErrorSchema = z.union([
	pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus400Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema,
	pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema,
]);

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasBodySchema =
	organizationIdentityProviderLinkRepresentationSchema.optional();

export const pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathSchema = z.object({
	realm: pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema,
	orgId: pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema,
	alias: pUTAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema =
	z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus204Schema =
	z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus400Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasErrorSchema = z.union([
	dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus400Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus403Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasStatus404Schema,
]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathSchema = z.object({
	realm: dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathRealmSchema,
	orgId: dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathOrgIdSchema,
	alias: dELETEAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasPathAliasSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathOrgIdSchema =
	z.string();

/**
 * The alias of the identity provider
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathAliasSchema = z
	.string()
	.describe("The alias of the identity provider");

/**
 * If true, return brief representation; otherwise return full representation
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.default(true)
		.describe("If true, return brief representation; otherwise return full representation");

/**
 * If true, perform exact match on the search parameter
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryExactSchema = z
	.boolean()
	.optional()
	.default("false")
	.describe("If true, perform exact match on the search parameter");

/**
 * The position of the first result (pagination offset)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("The position of the first result (pagination offset)");

/**
 * The maximum number of results to return
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryMaxSchema = z
	.int32()
	.optional()
	.describe("The maximum number of results to return");

/**
 * A query to search for group attributes, in the format 'key1:value1 key2:value2'
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryQSchema = z
	.string()
	.optional()
	.describe("A query to search for group attributes, in the format 'key1:value1 key2:value2'");

/**
 * A string to search for in group names
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQuerySearchSchema = z
	.string()
	.optional()
	.describe("A string to search for in group names");

/**
 * If true, include subgroups count in the response
 */
export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQuerySubGroupsCountSchema =
	z
		.boolean()
		.optional()
		.default(false)
		.describe("If true, include subgroups count in the response");

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus200Schema =
	z.array(z.lazy(() => groupRepresentationSchema));

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsErrorSchema = z.union(
	[
		gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus403Schema,
		gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsStatus404Schema,
	],
);

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathRealmSchema,
		orgId: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathOrgIdSchema,
		alias: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsPathAliasSchema,
	},
);

export const gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryBriefRepresentationSchema,
		exact: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryExactSchema,
		first: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryFirstSchema,
		max: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryMaxSchema,
		q: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQueryQSchema,
		search: gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQuerySearchSchema,
		subGroupsCount:
			gETAdminRealmsRealmOrganizationsOrgIdIdentityProvidersAliasGroupsQuerySubGroupsCountSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryEmailSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryFirstNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryLastNameSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQuerySearchSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryStatusSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsStatus200Schema = z.array(
	organizationInvitationRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdInvitationsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdInvitationsStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdInvitationsPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdInvitationsPathOrgIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsQuerySchema = z.object({
	email: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryEmailSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryFirstSchema,
	firstName: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryFirstNameSchema,
	lastName: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryLastNameSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryMaxSchema,
	search: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQuerySearchSchema,
	status: gETAdminRealmsRealmOrganizationsOrgIdInvitationsQueryStatusSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus200Schema =
	organizationInvitationRepresentationSchema;

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus404Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus403Schema,
	gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus404Schema,
]);

export const gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathOrgIdSchema,
	id: gETAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathOrgIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdErrorSchema = z.union([
	dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus403Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathRealmSchema,
	orgId: dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathOrgIdSchema,
	id: dELETEAdminRealmsRealmOrganizationsOrgIdInvitationsIdPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathOrgIdSchema = z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathIdSchema = z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus204Schema = z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendStatus404Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathOrgIdSchema,
	id: pOSTAdminRealmsRealmOrganizationsOrgIdInvitationsIdResendPathIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersPathOrgIdSchema = z.string();

/**
 * Boolean to return either a brief or a full user representation. If not specified, the brief representation is returned by default.
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true)
	.describe(
		"Boolean to return either a brief or a full user representation. If not specified, the brief representation is returned by default.",
	);

/**
 * Boolean which defines whether the param 'search' must match exactly or not
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQueryExactSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether the param 'search' must match exactly or not");

/**
 * The position of the first result to be processed (pagination offset)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQueryFirstSchema = z
	.int32()
	.optional()
	.default("0")
	.describe("The position of the first result to be processed (pagination offset)");

/**
 * The maximum number of results to be returned. Defaults to 10
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQueryMaxSchema = z
	.int32()
	.optional()
	.default("10")
	.describe("The maximum number of results to be returned. Defaults to 10");

/**
 * The membership type
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQueryMembershipTypeSchema = z
	.string()
	.optional()
	.describe("The membership type");

/**
 * A String representing either a member's username, e-mail, first name, or last name.
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersQuerySearchSchema = z
	.string()
	.optional()
	.describe("A String representing either a member's username, e-mail, first name, or last name.");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersStatus200Schema = z.array(
	memberRepresentationSchema,
);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdMembersPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdMembersPathOrgIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdMembersQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmOrganizationsOrgIdMembersQueryBriefRepresentationSchema,
	exact: gETAdminRealmsRealmOrganizationsOrgIdMembersQueryExactSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdMembersQueryFirstSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdMembersQueryMaxSchema,
	membershipType: gETAdminRealmsRealmOrganizationsOrgIdMembersQueryMembershipTypeSchema,
	search: gETAdminRealmsRealmOrganizationsOrgIdMembersQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersPathOrgIdSchema = z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus201Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus201Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersStatus409Schema,
]);

/**
 * Payload should contain only id of the user to be added to the organization (UUID with or without quotes). Surrounding whitespace characters will be trimmed.
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersBodySchema = z
	.string()
	.describe(
		"Payload should contain only id of the user to be added to the organization (UUID with or without quotes). Surrounding whitespace characters will be trimmed.",
	);

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdMembersPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdMembersPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountStatus200Schema = z.int();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersCountStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountErrorSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersCountStatus403Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersCountPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdMembersCountPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdMembersCountPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserPathOrgIdSchema =
	z.string();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus400Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus500Schema =
	z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserStatus500Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserBodySchema = z
	.object({
		id: z.string().optional(),
	})
	.optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserPathOrgIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserPathOrgIdSchema = z.string();

/**
 * Client id
 */
export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserQueryClientIdSchema = z
	.string()
	.optional()
	.describe("Client id");

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus204Schema = z.void();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserResponseSchema =
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus204Schema;

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserErrorSchema = z.union([
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus400Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus403Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus409Schema,
	pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserStatus500Schema,
]);

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserBodySchema = z
	.object({
		email: z.string().optional(),
		firstName: z.string().optional(),
		lastName: z.string().optional(),
	})
	.optional();

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserPathSchema = z.object({
	realm: pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserPathRealmSchema,
	orgId: pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserPathOrgIdSchema,
});

export const pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserQuerySchema = z.object({
	client_id: pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserQueryClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathMemberIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus200Schema =
	memberRepresentationSchema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus400Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus400Schema,
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus403Schema,
]);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathOrgIdSchema,
	memberId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathMemberIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathOrgIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathMemberIdSchema = z.string();

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdResponseSchema =
	dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus204Schema;

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdErrorSchema = z.union([
	dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus400Schema,
	dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdStatus403Schema,
]);

export const dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathRealmSchema,
	orgId: dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathOrgIdSchema,
	memberId: dELETEAdminRealmsRealmOrganizationsOrgIdMembersMemberIdPathMemberIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathOrgIdSchema = z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathMemberIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryBriefRepresentationSchema =
	z.boolean().optional().default(true);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryFirstSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryMaxSchema = z
	.int32()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQuerySearchSchema = z
	.string()
	.optional();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsErrorSchema = z.union([
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus400Schema,
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsStatus403Schema,
]);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathRealmSchema,
	orgId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathOrgIdSchema,
	memberId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsPathMemberIdSchema,
});

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQueryMaxSchema,
	search: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdGroupsQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathOrgIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathMemberIdSchema =
	z.string();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus400Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeResponseSchema =
	pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus204Schema;

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeErrorSchema =
	z.union([
		pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus400Schema,
		pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus403Schema,
		pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeStatus404Schema,
	]);

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypeBodySchema =
	membershipTypeSchema.optional();

export const pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathSchema =
	z.object({
		realm: pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathRealmSchema,
		orgId: pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathOrgIdSchema,
		memberId: pUTAdminRealmsRealmOrganizationsOrgIdMembersMemberIdMembershipTypePathMemberIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathOrgIdSchema =
	z.string();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathMemberIdSchema =
	z.string();

/**
 * if false, return the full representation. Otherwise, only the basic fields are returned.
 */
export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsQueryBriefRepresentationSchema =
	z
		.boolean()
		.optional()
		.default(true)
		.describe(
			"if false, return the full representation. Otherwise, only the basic fields are returned.",
		);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus200Schema =
	z.array(organizationRepresentationSchema);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus400Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsResponseSchema =
	gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus200Schema;

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsErrorSchema = z.union(
	[
		gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus400Schema,
		gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsStatus403Schema,
	],
);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathRealmSchema,
		orgId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathOrgIdSchema,
		memberId: gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsPathMemberIdSchema,
	},
);

export const gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmOrganizationsOrgIdMembersMemberIdOrganizationsQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesByIdRoleIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of role
 */
export const gETAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema = z.string().describe("id of role");

export const gETAdminRealmsRealmRolesByIdRoleIdStatus200Schema = roleRepresentationSchema;

export const gETAdminRealmsRealmRolesByIdRoleIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdResponseSchema =
	gETAdminRealmsRealmRolesByIdRoleIdStatus200Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdErrorSchema =
	gETAdminRealmsRealmRolesByIdRoleIdStatus403Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesByIdRoleIdPathRealmSchema,
	roleId: gETAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmRolesByIdRoleIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of role
 */
export const pUTAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema = z.string().describe("id of role");

export const pUTAdminRealmsRealmRolesByIdRoleIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmRolesByIdRoleIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmRolesByIdRoleIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmRolesByIdRoleIdResponseSchema =
	pUTAdminRealmsRealmRolesByIdRoleIdStatus204Schema;

export const pUTAdminRealmsRealmRolesByIdRoleIdErrorSchema = z.union([
	pUTAdminRealmsRealmRolesByIdRoleIdStatus400Schema,
	pUTAdminRealmsRealmRolesByIdRoleIdStatus403Schema,
]);

export const pUTAdminRealmsRealmRolesByIdRoleIdBodySchema = roleRepresentationSchema.optional();

export const pUTAdminRealmsRealmRolesByIdRoleIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmRolesByIdRoleIdPathRealmSchema,
	roleId: pUTAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmRolesByIdRoleIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * id of role
 */
export const dELETEAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema = z
	.string()
	.describe("id of role");

export const dELETEAdminRealmsRealmRolesByIdRoleIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmRolesByIdRoleIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesByIdRoleIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesByIdRoleIdResponseSchema =
	dELETEAdminRealmsRealmRolesByIdRoleIdStatus204Schema;

export const dELETEAdminRealmsRealmRolesByIdRoleIdErrorSchema = z.union([
	dELETEAdminRealmsRealmRolesByIdRoleIdStatus400Schema,
	dELETEAdminRealmsRealmRolesByIdRoleIdStatus403Schema,
]);

export const dELETEAdminRealmsRealmRolesByIdRoleIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmRolesByIdRoleIdPathRealmSchema,
	roleId: dELETEAdminRealmsRealmRolesByIdRoleIdPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema = z.string();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesQuerySearchSchema = z.string().optional();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesResponseSchema =
	gETAdminRealmsRealmRolesByIdRoleIdCompositesStatus200Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesErrorSchema =
	gETAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema,
	roleId: gETAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema,
});

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesQuerySchema = z.object({
	first: gETAdminRealmsRealmRolesByIdRoleIdCompositesQueryFirstSchema,
	max: gETAdminRealmsRealmRolesByIdRoleIdCompositesQueryMaxSchema,
	search: gETAdminRealmsRealmRolesByIdRoleIdCompositesQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema = z.string();

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesStatus204Schema = z.void();

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesResponseSchema =
	pOSTAdminRealmsRealmRolesByIdRoleIdCompositesStatus204Schema;

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesErrorSchema =
	pOSTAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema;

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmRolesByIdRoleIdCompositesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema,
	roleId: pOSTAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Role id
 */
export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema = z
	.string()
	.describe("Role id");

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesStatus204Schema = z.void();

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesResponseSchema =
	dELETEAdminRealmsRealmRolesByIdRoleIdCompositesStatus204Schema;

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesErrorSchema =
	dELETEAdminRealmsRealmRolesByIdRoleIdCompositesStatus403Schema;

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmRolesByIdRoleIdCompositesPathSchema = z.object({
	realm: dELETEAdminRealmsRealmRolesByIdRoleIdCompositesPathRealmSchema,
	roleId: dELETEAdminRealmsRealmRolesByIdRoleIdCompositesPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathClientUuidSchema =
	z.string();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathRoleIdSchema =
	z.string();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidResponseSchema =
	gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus200Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidErrorSchema = z.union([
	gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus403Schema,
	gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidStatus404Schema,
]);

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathRealmSchema,
	clientUuid: gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathClientUuidSchema,
	roleId: gETAdminRealmsRealmRolesByIdRoleIdCompositesClientsClientUuidPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmPathRoleIdSchema = z.string();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmResponseSchema =
	gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmStatus200Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmErrorSchema =
	gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmStatus403Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmPathRealmSchema,
	roleId: gETAdminRealmsRealmRolesByIdRoleIdCompositesRealmPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRoleIdSchema = z.string();

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsResponseSchema =
	gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsErrorSchema =
	gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus403Schema;

export const gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRealmSchema,
	roleId: gETAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRoleIdSchema = z.string();

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsErrorSchema =
	pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsStatus403Schema;

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRealmSchema,
	roleId: pUTAdminRealmsRealmRolesByIdRoleIdManagementPermissionsPathRoleIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmRolesRoleNameStatus200Schema = roleRepresentationSchema;

export const gETAdminRealmsRealmRolesRoleNameStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameResponseSchema =
	gETAdminRealmsRealmRolesRoleNameStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNamePathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNamePathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const pUTAdminRealmsRealmRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const pUTAdminRealmsRealmRolesRoleNameStatus204Schema = z.void();

export const pUTAdminRealmsRealmRolesRoleNameStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameResponseSchema =
	pUTAdminRealmsRealmRolesRoleNameStatus204Schema;

export const pUTAdminRealmsRealmRolesRoleNameErrorSchema = z.union([
	pUTAdminRealmsRealmRolesRoleNameStatus400Schema,
	pUTAdminRealmsRealmRolesRoleNameStatus403Schema,
	pUTAdminRealmsRealmRolesRoleNameStatus404Schema,
	pUTAdminRealmsRealmRolesRoleNameStatus409Schema,
]);

export const pUTAdminRealmsRealmRolesRoleNameBodySchema = roleRepresentationSchema.optional();

export const pUTAdminRealmsRealmRolesRoleNamePathSchema = z.object({
	realm: pUTAdminRealmsRealmRolesRoleNamePathRealmSchema,
	roleName: pUTAdminRealmsRealmRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmRolesRoleNamePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const dELETEAdminRealmsRealmRolesRoleNamePathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const dELETEAdminRealmsRealmRolesRoleNameStatus204Schema = z.void();

export const dELETEAdminRealmsRealmRolesRoleNameStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesRoleNameStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesRoleNameStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesRoleNameResponseSchema =
	dELETEAdminRealmsRealmRolesRoleNameStatus204Schema;

export const dELETEAdminRealmsRealmRolesRoleNameErrorSchema = z.union([
	dELETEAdminRealmsRealmRolesRoleNameStatus400Schema,
	dELETEAdminRealmsRealmRolesRoleNameStatus403Schema,
	dELETEAdminRealmsRealmRolesRoleNameStatus404Schema,
]);

export const dELETEAdminRealmsRealmRolesRoleNamePathSchema = z.object({
	realm: dELETEAdminRealmsRealmRolesRoleNamePathRealmSchema,
	roleName: dELETEAdminRealmsRealmRolesRoleNamePathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmRolesRoleNameCompositesStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesRoleNameCompositesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesResponseSchema =
	gETAdminRealmsRealmRolesRoleNameCompositesStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameCompositesErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameCompositesStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameCompositesStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNameCompositesPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const pOSTAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const pOSTAdminRealmsRealmRolesRoleNameCompositesStatus204Schema = z.void();

export const pOSTAdminRealmsRealmRolesRoleNameCompositesStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesRoleNameCompositesStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmRolesRoleNameCompositesResponseSchema =
	pOSTAdminRealmsRealmRolesRoleNameCompositesStatus204Schema;

export const pOSTAdminRealmsRealmRolesRoleNameCompositesErrorSchema = z.union([
	pOSTAdminRealmsRealmRolesRoleNameCompositesStatus403Schema,
	pOSTAdminRealmsRealmRolesRoleNameCompositesStatus404Schema,
]);

export const pOSTAdminRealmsRealmRolesRoleNameCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmRolesRoleNameCompositesPathSchema = z.object({
	realm: pOSTAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema,
	roleName: pOSTAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const dELETEAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const dELETEAdminRealmsRealmRolesRoleNameCompositesStatus204Schema = z.void();

export const dELETEAdminRealmsRealmRolesRoleNameCompositesStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesRoleNameCompositesStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmRolesRoleNameCompositesResponseSchema =
	dELETEAdminRealmsRealmRolesRoleNameCompositesStatus204Schema;

export const dELETEAdminRealmsRealmRolesRoleNameCompositesErrorSchema = z.union([
	dELETEAdminRealmsRealmRolesRoleNameCompositesStatus403Schema,
	dELETEAdminRealmsRealmRolesRoleNameCompositesStatus404Schema,
]);

export const dELETEAdminRealmsRealmRolesRoleNameCompositesBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmRolesRoleNameCompositesPathSchema = z.object({
	realm: dELETEAdminRealmsRealmRolesRoleNameCompositesPathRealmSchema,
	roleName: dELETEAdminRealmsRealmRolesRoleNameCompositesPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathTargetClientUuidSchema =
	z.string();

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus404Schema =
	z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidResponseSchema =
	gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidErrorSchema = z.union(
	[
		gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus403Schema,
		gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidStatus404Schema,
	],
);

export const gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathSchema = z.object(
	{
		realm: gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathRealmSchema,
		roleName: gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathRoleNameSchema,
		targetClientUuid:
			gETAdminRealmsRealmRolesRoleNameCompositesClientsTargetClientUuidPathTargetClientUuidSchema,
	},
);

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * role's name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameCompositesRealmPathRoleNameSchema = z
	.string()
	.describe("role's name (not id!)");

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmResponseSchema =
	gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameCompositesRealmStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNameCompositesRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNameCompositesRealmPathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNameCompositesRealmPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * the role name.
 */
export const gETAdminRealmsRealmRolesRoleNameGroupsPathRoleNameSchema = z
	.string()
	.describe("the role name.");

/**
 * If false, return a full representation of the {@code GroupRepresentation} objects.
 */
export const gETAdminRealmsRealmRolesRoleNameGroupsQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true)
	.describe("If false, return a full representation of the {@code GroupRepresentation} objects.");

/**
 * First result to return. Ignored if negative or {@code null}.
 */
export const gETAdminRealmsRealmRolesRoleNameGroupsQueryFirstSchema = z
	.int32()
	.optional()
	.describe("First result to return. Ignored if negative or {@code null}.");

/**
 * Maximum number of results to return. Unbounded if negative.
 */
export const gETAdminRealmsRealmRolesRoleNameGroupsQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum number of results to return. Unbounded if negative.");

export const gETAdminRealmsRealmRolesRoleNameGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmRolesRoleNameGroupsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameGroupsStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameGroupsResponseSchema =
	gETAdminRealmsRealmRolesRoleNameGroupsStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameGroupsErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameGroupsStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameGroupsStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNameGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNameGroupsPathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNameGroupsPathRoleNameSchema,
});

export const gETAdminRealmsRealmRolesRoleNameGroupsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmRolesRoleNameGroupsQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmRolesRoleNameGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmRolesRoleNameGroupsQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsPathRoleNameSchema = z.string();

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsResponseSchema =
	gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameManagementPermissionsStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNameManagementPermissionsPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNameManagementPermissionsPathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNameManagementPermissionsPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsPathRoleNameSchema = z.string();

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus200Schema =
	managementPermissionReferenceSchema;

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsResponseSchema =
	pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus200Schema;

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsErrorSchema = z.union([
	pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus403Schema,
	pUTAdminRealmsRealmRolesRoleNameManagementPermissionsStatus404Schema,
]);

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsBodySchema =
	managementPermissionReferenceSchema.optional();

export const pUTAdminRealmsRealmRolesRoleNameManagementPermissionsPathSchema = z.object({
	realm: pUTAdminRealmsRealmRolesRoleNameManagementPermissionsPathRealmSchema,
	roleName: pUTAdminRealmsRealmRolesRoleNameManagementPermissionsPathRoleNameSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmRolesRoleNameUsersPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * the role name.
 */
export const gETAdminRealmsRealmRolesRoleNameUsersPathRoleNameSchema = z
	.string()
	.describe("the role name.");

/**
 * Boolean which defines whether brief representations are returned (default: false)
 */
export const gETAdminRealmsRealmRolesRoleNameUsersQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.describe("Boolean which defines whether brief representations are returned (default: false)");

/**
 * first result to return. Ignored if negative or {@code null}.
 */
export const gETAdminRealmsRealmRolesRoleNameUsersQueryFirstSchema = z
	.int32()
	.optional()
	.describe("first result to return. Ignored if negative or {@code null}.");

/**
 * Maximum number of results to return. Unbounded if negative.
 */
export const gETAdminRealmsRealmRolesRoleNameUsersQueryMaxSchema = z
	.int32()
	.optional()
	.default("100")
	.describe("Maximum number of results to return. Unbounded if negative.");

export const gETAdminRealmsRealmRolesRoleNameUsersStatus200Schema =
	z.array(userRepresentationSchema);

export const gETAdminRealmsRealmRolesRoleNameUsersStatus403Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameUsersStatus404Schema = z.unknown();

export const gETAdminRealmsRealmRolesRoleNameUsersResponseSchema =
	gETAdminRealmsRealmRolesRoleNameUsersStatus200Schema;

export const gETAdminRealmsRealmRolesRoleNameUsersErrorSchema = z.union([
	gETAdminRealmsRealmRolesRoleNameUsersStatus403Schema,
	gETAdminRealmsRealmRolesRoleNameUsersStatus404Schema,
]);

export const gETAdminRealmsRealmRolesRoleNameUsersPathSchema = z.object({
	realm: gETAdminRealmsRealmRolesRoleNameUsersPathRealmSchema,
	roleName: gETAdminRealmsRealmRolesRoleNameUsersPathRoleNameSchema,
});

export const gETAdminRealmsRealmRolesRoleNameUsersQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmRolesRoleNameUsersQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmRolesRoleNameUsersQueryFirstSchema,
	max: gETAdminRealmsRealmRolesRoleNameUsersQueryMaxSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdPathUserIdSchema = z.string();

/**
 * Indicates if the user profile metadata should be added to the response
 */
export const gETAdminRealmsRealmUsersUserIdQueryUserProfileMetadataSchema = z
	.boolean()
	.optional()
	.describe("Indicates if the user profile metadata should be added to the response");

export const gETAdminRealmsRealmUsersUserIdStatus200Schema = userRepresentationSchema;

export const gETAdminRealmsRealmUsersUserIdStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdResponseSchema =
	gETAdminRealmsRealmUsersUserIdStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdErrorSchema =
	gETAdminRealmsRealmUsersUserIdStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdPathUserIdSchema,
});

export const gETAdminRealmsRealmUsersUserIdQuerySchema = z.object({
	userProfileMetadata: gETAdminRealmsRealmUsersUserIdQueryUserProfileMetadataSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdPathUserIdSchema = z.string();

export const pUTAdminRealmsRealmUsersUserIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdStatus409Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResponseSchema =
	pUTAdminRealmsRealmUsersUserIdStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdStatus400Schema,
	pUTAdminRealmsRealmUsersUserIdStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdStatus409Schema,
	pUTAdminRealmsRealmUsersUserIdStatus500Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdBodySchema = userRepresentationSchema.optional();

export const pUTAdminRealmsRealmUsersUserIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdPathUserIdSchema = z.string();

export const dELETEAdminRealmsRealmUsersUserIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdStatus400Schema,
	dELETEAdminRealmsRealmUsersUserIdStatus403Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesPathUserIdSchema =
	z.string();

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesStatus200Schema =
	z.array(z.string());

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesStatus403Schema =
	z.unknown();

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesResponseSchema =
	gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesErrorSchema =
	gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesPathSchema =
	z.object({
		realm: gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesPathRealmSchema,
		userId: gETAdminRealmsRealmUsersUserIdConfiguredUserStorageCredentialTypesPathUserIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdConsentsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdConsentsPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdConsentsStatus200Schema = z.array(
	z.record(z.string(), z.unknown()),
);

export const gETAdminRealmsRealmUsersUserIdConsentsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdConsentsResponseSchema =
	gETAdminRealmsRealmUsersUserIdConsentsStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdConsentsErrorSchema =
	gETAdminRealmsRealmUsersUserIdConsentsStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdConsentsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdConsentsPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdConsentsPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdConsentsClientPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientPathUserIdSchema = z.string();

/**
 * Client id
 */
export const dELETEAdminRealmsRealmUsersUserIdConsentsClientPathClientSchema = z
	.string()
	.describe("Client id");

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus403Schema,
	dELETEAdminRealmsRealmUsersUserIdConsentsClientStatus404Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdConsentsClientPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdConsentsClientPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdConsentsClientPathUserIdSchema,
	client: dELETEAdminRealmsRealmUsersUserIdConsentsClientPathClientSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdCredentialsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdCredentialsPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdCredentialsStatus200Schema = z.array(
	credentialRepresentationSchema,
);

export const gETAdminRealmsRealmUsersUserIdCredentialsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdCredentialsResponseSchema =
	gETAdminRealmsRealmUsersUserIdCredentialsStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdCredentialsErrorSchema =
	gETAdminRealmsRealmUsersUserIdCredentialsStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdCredentialsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdCredentialsPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdCredentialsPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathUserIdSchema = z.string();

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathCredentialIdSchema =
	z.string();

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus403Schema,
	dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdStatus404Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathUserIdSchema,
	credentialId: dELETEAdminRealmsRealmUsersUserIdCredentialsCredentialIdPathCredentialIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathRealmSchema =
	z.string().describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathUserIdSchema =
	z.string();

/**
 * The credential to move
 */
export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathCredentialIdSchema =
	z.string().describe("The credential to move");

/**
 * The credential that will be the previous element in the list. If set to null, the moved credential will be the first element in the list.
 */
export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathNewPreviousCredentialIdSchema =
	z
		.string()
		.describe(
			"The credential that will be the previous element in the list. If set to null, the moved credential will be the first element in the list.",
		);

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus404Schema =
	z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdErrorSchema =
	z.union([
		pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus403Schema,
		pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdStatus404Schema,
	]);

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathSchema =
	z.object({
		realm:
			pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathRealmSchema,
		userId:
			pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathUserIdSchema,
		credentialId:
			pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathCredentialIdSchema,
		newPreviousCredentialId:
			pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveAfterNewPreviousCredentialIdPathNewPreviousCredentialIdSchema,
	});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathUserIdSchema =
	z.string();

/**
 * The credential to move
 */
export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathCredentialIdSchema =
	z.string().describe("The credential to move");

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus204Schema =
	z.void();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus403Schema =
	z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus404Schema =
	z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstErrorSchema = z.union(
	[
		pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus403Schema,
		pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstStatus404Schema,
	],
);

export const pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathSchema = z.object(
	{
		realm: pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathRealmSchema,
		userId: pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathUserIdSchema,
		credentialId:
			pOSTAdminRealmsRealmUsersUserIdCredentialsCredentialIdMoveToFirstPathCredentialIdSchema,
	},
);

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathUserIdSchema =
	z.string();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathCredentialIdSchema =
	z.string();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus204Schema =
	z.void();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus403Schema =
	z.unknown();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus404Schema =
	z.unknown();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelResponseSchema =
	pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelStatus404Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelBodySchema = z
	.string()
	.optional();

export const pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathUserIdSchema,
	credentialId:
		pUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelPathCredentialIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesPathUserIdSchema = z.string();

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesResponseSchema =
	pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesErrorSchema =
	pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesStatus403Schema;

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesBodySchema = z
	.array(z.string())
	.optional();

export const pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdDisableCredentialTypesPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailPathUserIdSchema = z.string();

/**
 * Client id
 */
export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryClientIdSchema = z
	.string()
	.optional()
	.describe("Client id");

/**
 * Number of seconds after which the generated token expires
 */
export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryLifespanSchema = z
	.int32()
	.optional()
	.describe("Number of seconds after which the generated token expires");

/**
 * Redirect uri
 */
export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryRedirectUriSchema = z
	.string()
	.optional()
	.describe("Redirect uri");

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailResponseSchema =
	pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus400Schema,
	pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus404Schema,
	pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailStatus500Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailBodySchema = z
	.array(z.string())
	.optional();

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailPathUserIdSchema,
});

export const pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQuerySchema = z.object({
	client_id: pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryClientIdSchema,
	lifespan: pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryLifespanSchema,
	redirect_uri: pUTAdminRealmsRealmUsersUserIdExecuteActionsEmailQueryRedirectUriSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdFederatedIdentityPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityStatus200Schema = z.array(
	federatedIdentityRepresentationSchema,
);

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityResponseSchema =
	gETAdminRealmsRealmUsersUserIdFederatedIdentityStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityErrorSchema =
	gETAdminRealmsRealmUsersUserIdFederatedIdentityStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdFederatedIdentityPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdFederatedIdentityPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdFederatedIdentityPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathUserIdSchema = z.string();

/**
 * Social login provider id
 */
export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathProviderSchema = z
	.string()
	.describe("Social login provider id");

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus204Schema = z.void();

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus409Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderErrorSchema = z.union([
	pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus403Schema,
	pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus409Schema,
]);

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderBodySchema =
	federatedIdentityRepresentationSchema.optional();

export const pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathRealmSchema,
	userId: pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathUserIdSchema,
	provider: pOSTAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathProviderSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathUserIdSchema =
	z.string();

/**
 * Social login provider id
 */
export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathProviderSchema = z
	.string()
	.describe("Social login provider id");

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus403Schema =
	z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus404Schema =
	z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus403Schema,
	dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderStatus404Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathUserIdSchema,
	provider: dELETEAdminRealmsRealmUsersUserIdFederatedIdentityProviderPathProviderSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdGroupsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdGroupsPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdGroupsQueryBriefRepresentationSchema = z
	.boolean()
	.optional()
	.default(true);

export const gETAdminRealmsRealmUsersUserIdGroupsQueryFirstSchema = z.int32().optional();

export const gETAdminRealmsRealmUsersUserIdGroupsQueryMaxSchema = z.int32().optional();

export const gETAdminRealmsRealmUsersUserIdGroupsQuerySearchSchema = z.string().optional();

export const gETAdminRealmsRealmUsersUserIdGroupsStatus200Schema = z.array(
	z.lazy(() => groupRepresentationSchema),
);

export const gETAdminRealmsRealmUsersUserIdGroupsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdGroupsResponseSchema =
	gETAdminRealmsRealmUsersUserIdGroupsStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdGroupsErrorSchema =
	gETAdminRealmsRealmUsersUserIdGroupsStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdGroupsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdGroupsPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdGroupsPathUserIdSchema,
});

export const gETAdminRealmsRealmUsersUserIdGroupsQuerySchema = z.object({
	briefRepresentation: gETAdminRealmsRealmUsersUserIdGroupsQueryBriefRepresentationSchema,
	first: gETAdminRealmsRealmUsersUserIdGroupsQueryFirstSchema,
	max: gETAdminRealmsRealmUsersUserIdGroupsQueryMaxSchema,
	search: gETAdminRealmsRealmUsersUserIdGroupsQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdGroupsCountPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdGroupsCountPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdGroupsCountQuerySearchSchema = z.string().optional();

export const gETAdminRealmsRealmUsersUserIdGroupsCountStatus200Schema = z.record(
	z.string(),
	z.int(),
);

export const gETAdminRealmsRealmUsersUserIdGroupsCountStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdGroupsCountResponseSchema =
	gETAdminRealmsRealmUsersUserIdGroupsCountStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdGroupsCountErrorSchema =
	gETAdminRealmsRealmUsersUserIdGroupsCountStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdGroupsCountPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdGroupsCountPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdGroupsCountPathUserIdSchema,
});

export const gETAdminRealmsRealmUsersUserIdGroupsCountQuerySchema = z.object({
	search: gETAdminRealmsRealmUsersUserIdGroupsCountQuerySearchSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathUserIdSchema = z.string();

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathGroupIdSchema = z.string();

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdResponseSchema =
	pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdGroupsGroupIdStatus404Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathUserIdSchema,
	groupId: pUTAdminRealmsRealmUsersUserIdGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathUserIdSchema = z.string();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathGroupIdSchema = z.string();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus500Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus400Schema,
	dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus403Schema,
	dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus404Schema,
	dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdStatus500Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathUserIdSchema,
	groupId: dELETEAdminRealmsRealmUsersUserIdGroupsGroupIdPathGroupIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdImpersonationPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdImpersonationPathUserIdSchema = z.string();

export const pOSTAdminRealmsRealmUsersUserIdImpersonationStatus200Schema = z.record(
	z.string(),
	z.unknown(),
);

export const pOSTAdminRealmsRealmUsersUserIdImpersonationStatus400Schema = z.lazy(
	() => errorRepresentationSchema,
);

export const pOSTAdminRealmsRealmUsersUserIdImpersonationStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdImpersonationResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdImpersonationStatus200Schema;

export const pOSTAdminRealmsRealmUsersUserIdImpersonationErrorSchema = z.union([
	pOSTAdminRealmsRealmUsersUserIdImpersonationStatus400Schema,
	pOSTAdminRealmsRealmUsersUserIdImpersonationStatus403Schema,
]);

export const pOSTAdminRealmsRealmUsersUserIdImpersonationPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersUserIdImpersonationPathRealmSchema,
	userId: pOSTAdminRealmsRealmUsersUserIdImpersonationPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdLogoutPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdLogoutPathUserIdSchema = z.string();

export const pOSTAdminRealmsRealmUsersUserIdLogoutStatus204Schema = z.void();

export const pOSTAdminRealmsRealmUsersUserIdLogoutStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdLogoutResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdLogoutStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdLogoutErrorSchema =
	pOSTAdminRealmsRealmUsersUserIdLogoutStatus403Schema;

export const pOSTAdminRealmsRealmUsersUserIdLogoutPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersUserIdLogoutPathRealmSchema,
	userId: pOSTAdminRealmsRealmUsersUserIdLogoutPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathClientUuidSchema =
	z.string();

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus200Schema = z.array(
	userSessionRepresentationSchema,
);

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus404Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidResponseSchema =
	gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidErrorSchema = z.union([
	gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus403Schema,
	gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidStatus404Schema,
]);

export const gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathUserIdSchema,
	clientUuid: gETAdminRealmsRealmUsersUserIdOfflineSessionsClientUuidPathClientUuidSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdResetPasswordPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdResetPasswordPathUserIdSchema = z.string();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordResponseSchema =
	pUTAdminRealmsRealmUsersUserIdResetPasswordStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdResetPasswordErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdResetPasswordStatus400Schema,
	pUTAdminRealmsRealmUsersUserIdResetPasswordStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdResetPasswordStatus500Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdResetPasswordBodySchema =
	credentialRepresentationSchema.optional();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdResetPasswordPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdResetPasswordPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailPathUserIdSchema = z.string();

/**
 * client id
 */
export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailQueryClientIdSchema = z
	.string()
	.optional()
	.describe("client id");

/**
 * redirect uri
 */
export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailQueryRedirectUriSchema = z
	.string()
	.optional()
	.describe("redirect uri");

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus404Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailResponseSchema =
	pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus400Schema,
	pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus404Schema,
	pUTAdminRealmsRealmUsersUserIdResetPasswordEmailStatus500Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdResetPasswordEmailPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdResetPasswordEmailPathUserIdSchema,
});

export const pUTAdminRealmsRealmUsersUserIdResetPasswordEmailQuerySchema = z.object({
	client_id: pUTAdminRealmsRealmUsersUserIdResetPasswordEmailQueryClientIdSchema,
	redirect_uri: pUTAdminRealmsRealmUsersUserIdResetPasswordEmailQueryRedirectUriSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsStatus200Schema =
	mappingsRepresentationSchema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsErrorSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdRoleMappingsPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdRoleMappingsPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema = z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema,
	clientId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus204Schema = z.void();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema,
	userId: pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema,
	clientId: pOSTAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema = z
	.string()
	.describe("client id (not clientId!)");

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathUserIdSchema,
	clientId: dELETEAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdPathClientIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathUserIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailableResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailableStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathSchema =
	z.object({
		realm: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathRealmSchema,
		userId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathUserIdSchema,
		clientId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdAvailablePathClientIdSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathUserIdSchema =
	z.string();

/**
 * client id (not clientId!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathClientIdSchema =
	z.string().describe("client id (not clientId!)");

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathSchema =
	z.object({
		realm: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathRealmSchema,
		userId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathUserIdSchema,
		clientId: gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositePathClientIdSchema,
	});

export const gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeQuerySchema =
	z.object({
		briefRepresentation:
			gETAdminRealmsRealmUsersUserIdRoleMappingsClientsClientIdCompositeQueryBriefRepresentationSchema,
	});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmErrorSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema = z.string();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus204Schema = z.void();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus400Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus404Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus500Schema = z.unknown();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmResponseSchema =
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus204Schema;

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmErrorSchema = z.union([
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus400Schema,
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema,
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus404Schema,
	pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus500Schema,
]);

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmPathSchema = z.object({
	realm: pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema,
	userId: pOSTAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema = z.string();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus204Schema = z.void();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus400Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus404Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus500Schema = z.unknown();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmResponseSchema =
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus204Schema;

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmErrorSchema = z.union([
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus400Schema,
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus403Schema,
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus404Schema,
	dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmStatus500Schema,
]);

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmBodySchema = z
	.array(roleRepresentationSchema)
	.optional();

export const dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmPathSchema = z.object({
	realm: dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmPathRealmSchema,
	userId: dELETEAdminRealmsRealmUsersUserIdRoleMappingsRealmPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailablePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailablePathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableErrorSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailableStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailablePathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailablePathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmAvailablePathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositePathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositePathUserIdSchema = z.string();

/**
 * if false, return roles with their attributes
 */
export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema =
	z.boolean().optional().default(true).describe("if false, return roles with their attributes");

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeStatus200Schema =
	z.array(roleRepresentationSchema);

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeResponseSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeErrorSchema =
	gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositePathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositePathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositePathUserIdSchema,
});

export const gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeQuerySchema = z.object({
	briefRepresentation:
		gETAdminRealmsRealmUsersUserIdRoleMappingsRealmCompositeQueryBriefRepresentationSchema,
});

/**
 * realm name (not id!)
 */
export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailPathUserIdSchema = z.string();

/**
 * Client id
 */
export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryClientIdSchema = z
	.string()
	.optional()
	.describe("Client id");

/**
 * Number of seconds after which the generated token expires
 */
export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryLifespanSchema = z
	.int32()
	.optional()
	.describe("Number of seconds after which the generated token expires");

/**
 * Redirect uri
 */
export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryRedirectUriSchema = z
	.string()
	.optional()
	.describe("Redirect uri");

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus204Schema = z.void();

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus400Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus403Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus500Schema = z.unknown();

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailResponseSchema =
	pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus204Schema;

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailErrorSchema = z.union([
	pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus400Schema,
	pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus403Schema,
	pUTAdminRealmsRealmUsersUserIdSendVerifyEmailStatus500Schema,
]);

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailPathSchema = z.object({
	realm: pUTAdminRealmsRealmUsersUserIdSendVerifyEmailPathRealmSchema,
	userId: pUTAdminRealmsRealmUsersUserIdSendVerifyEmailPathUserIdSchema,
});

export const pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQuerySchema = z.object({
	client_id: pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryClientIdSchema,
	lifespan: pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryLifespanSchema,
	redirect_uri: pUTAdminRealmsRealmUsersUserIdSendVerifyEmailQueryRedirectUriSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdSessionsPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdSessionsPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdSessionsStatus200Schema = z.array(
	userSessionRepresentationSchema,
);

export const gETAdminRealmsRealmUsersUserIdSessionsStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdSessionsResponseSchema =
	gETAdminRealmsRealmUsersUserIdSessionsStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdSessionsErrorSchema =
	gETAdminRealmsRealmUsersUserIdSessionsStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdSessionsPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdSessionsPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdSessionsPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesPathUserIdSchema = z.string();

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesStatus200Schema = z.record(
	z.string(),
	z.array(z.string()),
);

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesStatus403Schema = z.unknown();

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesResponseSchema =
	gETAdminRealmsRealmUsersUserIdUnmanagedAttributesStatus200Schema;

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesErrorSchema =
	gETAdminRealmsRealmUsersUserIdUnmanagedAttributesStatus403Schema;

export const gETAdminRealmsRealmUsersUserIdUnmanagedAttributesPathSchema = z.object({
	realm: gETAdminRealmsRealmUsersUserIdUnmanagedAttributesPathRealmSchema,
	userId: gETAdminRealmsRealmUsersUserIdUnmanagedAttributesPathUserIdSchema,
});

/**
 * realm name (not id!)
 */
export const gETAdminRealmsRealmWorkflowsScheduledResourceIdPathRealmSchema = z
	.string()
	.describe("realm name (not id!)");

/**
 * Identifier of the resource associated with the scheduled workflows
 */
export const gETAdminRealmsRealmWorkflowsScheduledResourceIdPathResourceIdSchema = z
	.string()
	.describe("Identifier of the resource associated with the scheduled workflows");

export const gETAdminRealmsRealmWorkflowsScheduledResourceIdStatus200Schema =
	workflowRepresentationSchema;

export const gETAdminRealmsRealmWorkflowsScheduledResourceIdStatus400Schema = z.unknown();

export const gETAdminRealmsRealmWorkflowsScheduledResourceIdResponseSchema =
	gETAdminRealmsRealmWorkflowsScheduledResourceIdStatus200Schema;

export const gETAdminRealmsRealmWorkflowsScheduledResourceIdErrorSchema =
	gETAdminRealmsRealmWorkflowsScheduledResourceIdStatus400Schema;

export const gETAdminRealmsRealmWorkflowsScheduledResourceIdPathSchema = z.object({
	realm: gETAdminRealmsRealmWorkflowsScheduledResourceIdPathRealmSchema,
	resourceId: gETAdminRealmsRealmWorkflowsScheduledResourceIdPathResourceIdSchema,
});
