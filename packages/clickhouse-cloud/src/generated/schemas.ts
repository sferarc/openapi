// @ts-nocheck

import * as z from "zod";

export const resourceTagsV1Schema = z
	.object({
		key: z
			.string()
			.min(1)
			.max(128)
			.regex(/^[a-zA-Z0-9._-]+$/)
			.describe("Tag key. Must be alphanumeric with dashes, underscores and dots."),
		value: z
			.string()
			.max(256)
			.regex(/^[a-zA-Z0-9._-]+$/)
			.optional()
			.describe("Tag value. Must be alphanumeric with dashes, underscores and dots."),
	})
	.meta({ examples: [{}] });

export const scalingScheduleEntrySchema = z.object({
	id: z.uuid().describe("Unique identifier for this schedule entry."),
	name: z.string().describe("Human-readable label for this schedule entry."),
	weekdays: z
		.array(z.int())
		.min(1)
		.describe("Days of the week this entry applies to. 0 = Sunday, 1 = Monday, …, 6 = Saturday."),
	startHourUtc: z
		.int()
		.min(0)
		.max(23)
		.describe("UTC hour (0–23) when this entry becomes active (inclusive)."),
	endHourUtc: z
		.int()
		.min(1)
		.max(24)
		.describe(
			"UTC hour (1–24) when this entry deactivates (exclusive). Must differ from startHourUtc. Set to 24 to end at midnight. Values less than startHourUtc create an overnight window spanning midnight.",
		),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.describe(
			'Autoscaling mode for this entry. "vertical" runs a fixed replica count while memory scales; "horizontal" scales the replica count at a fixed per-replica memory. Defaults to "vertical" for entries persisted before the mode was exposed.',
		),
	minReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Minimum memory per replica (Gb) during this window. A range in vertical; in horizontal it equals maxReplicaMemoryGb (memory is fixed while the replica count scales).",
		),
	maxReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Maximum memory per replica (Gb) during this window. A range in vertical; in horizontal it equals minReplicaMemoryGb (memory is fixed while the replica count scales).",
		),
	minReplicas: z
		.int()
		.optional()
		.describe(
			"Minimum number of replicas during this window. For a horizontal entry the replica count scales between minReplicas and maxReplicas; for a vertical entry minReplicas and maxReplicas are equal and report the fixed replica count (both omitted when the entry stored no count).",
		),
	maxReplicas: z
		.int()
		.optional()
		.describe(
			"Maximum number of replicas during this window. For a horizontal entry the replica count scales between minReplicas and maxReplicas; for a vertical entry minReplicas and maxReplicas are equal and report the fixed replica count (both omitted when the entry stored no count).",
		),
	idleScaling: z
		.boolean()
		.optional()
		.describe("Whether idle scaling is enabled during this window."),
	idleTimeoutMinutes: z.int().optional().describe("Idle timeout in minutes during this window."),
	isActiveNow: z
		.boolean()
		.describe(
			"Whether this entry is currently active. Scheduled times are indicative — actions are applied on a best-effort basis and may be delayed by a few minutes.",
		),
});

export const scalingScheduleBaseConfigSchema = z.object({
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.optional()
		.describe(
			'Autoscaling mode applied when no schedule entry is active. "vertical" runs a fixed replica count while memory scales; "horizontal" scales the replica count at a fixed per-replica memory.',
		),
	minReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Minimum memory per replica (Gb) when no schedule entry is active. Absent for services that do not autoscale memory.",
		),
	maxReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Maximum memory per replica (Gb) when no schedule entry is active. Absent for services that do not autoscale memory.",
		),
	minReplicas: z
		.int()
		.optional()
		.describe("Minimum number of replicas when no schedule entry is active."),
	maxReplicas: z
		.int()
		.optional()
		.describe("Maximum number of replicas when no schedule entry is active."),
	idleScaling: z
		.boolean()
		.optional()
		.describe("Whether idle scaling is enabled when no schedule entry is active."),
	idleTimeoutMinutes: z
		.int()
		.optional()
		.describe("Idle timeout in minutes when no schedule entry is active."),
});

export const scalingScheduleSchema = z.object({
	entries: z.array(scalingScheduleEntrySchema).describe("List of schedule entries."),
	baseConfig: scalingScheduleBaseConfigSchema,
	activeEntryId: z
		.uuid()
		.optional()
		.describe(
			"ID of the currently-active schedule entry. Absent when no entry is active and the base config is in effect.",
		),
});

export const scalingScheduleEntryRequestSchema = z.object({
	name: z
		.string()
		.describe("Human-readable label for this schedule entry.")
		.meta({ examples: ["Business hours"] }),
	weekdays: z
		.array(z.int())
		.min(1)
		.describe("Days of the week this entry applies to. 0 = Sunday, 1 = Monday, …, 6 = Saturday.")
		.meta({ examples: [[1, 2, 3, 4, 5]] }),
	startHourUtc: z
		.int()
		.min(0)
		.max(23)
		.describe("UTC hour (0–23) when this entry becomes active (inclusive).")
		.meta({ examples: [9] }),
	endHourUtc: z
		.int()
		.min(1)
		.max(24)
		.describe(
			"UTC hour (1–24) when this entry deactivates (exclusive). Must differ from startHourUtc. Set to 24 to end at midnight. Values less than startHourUtc create an overnight window spanning midnight.",
		)
		.meta({ examples: [17] }),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.optional()
		.describe(
			'Autoscaling mode for this entry. "vertical" (the default when omitted) runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory (minReplicaMemoryGb equal to maxReplicaMemoryGb). Horizontal requires the feature to be enabled for the organization.',
		)
		.meta({ examples: ["vertical"] }),
	minReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Minimum memory per replica (Gb). Optional for vertical entries — provide both bounds for a memory range, or omit both to inherit memory from the base scaling config. Required for horizontal (both bounds, equal to maxReplicaMemoryGb — memory is fixed while the replica count scales). The upper bound is tier-dependent (lower for non-paid organizations) and enforced when the entry is applied.",
		)
		.meta({ examples: [16] }),
	maxReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Maximum memory per replica (Gb). Optional for vertical entries — provide both bounds for a memory range, or omit both to inherit memory from the base scaling config. Required for horizontal (both bounds, equal to minReplicaMemoryGb — memory is fixed while the replica count scales). The upper bound is tier-dependent (lower for non-paid organizations) and enforced when the entry is applied.",
		)
		.meta({ examples: [16] }),
	numReplicas: z
		.int()
		.min(1)
		.optional()
		.describe(
			'Fixed replica count for a vertical entry (autoscalingMode "vertical" or omitted). Mutually exclusive with minReplicas/maxReplicas. The per-service replica maximum is variable (tier-dependent, configurable per service) and enforced when the entry is applied, not at request time.',
		)
		.meta({ examples: [3] }),
	minReplicas: z
		.int()
		.min(1)
		.optional()
		.describe(
			'Minimum number of replicas. A minReplicas/maxReplicas band scales the replica count in a horizontal entry (autoscalingMode "horizontal"); when autoscalingMode is omitted or "vertical", an equal band (minReplicas === maxReplicas) is instead an accepted vertical fixed count and needs no horizontal entitlement. Must be provided together with maxReplicas. The per-service replica maximum is variable (tier-dependent, configurable per service) and enforced when the entry is applied, not at request time.',
		)
		.meta({ examples: [2] }),
	maxReplicas: z
		.int()
		.min(1)
		.optional()
		.describe(
			'Maximum number of replicas. A minReplicas/maxReplicas band scales the replica count in a horizontal entry (autoscalingMode "horizontal"); when autoscalingMode is omitted or "vertical", an equal band (minReplicas === maxReplicas) is instead an accepted vertical fixed count and needs no horizontal entitlement. Must be provided together with minReplicas. The per-service replica maximum is variable (tier-dependent, configurable per service) and enforced when the entry is applied, not at request time.',
		)
		.meta({ examples: [3] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe("Whether idle scaling is enabled during this window."),
	idleTimeoutMinutes: z.int().optional().describe("Idle timeout in minutes during this window."),
});

export const scalingSchedulePostRequestSchema = z.object({
	entries: z
		.array(scalingScheduleEntryRequestSchema)
		.describe("List of schedule entries. Pass an empty array to clear the schedule."),
});

export const currentScalingSchema = z.object({
	effectiveAutoscalingMode: z
		.enum(["vertical", "horizontal"])
		.optional()
		.describe(
			"Autoscaling mode currently in effect on the running service. May diverge from the configured baseline mode while a schedule entry is active.",
		),
	effectiveMinReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Minimum memory per replica (Gb) currently applied to the running service. May diverge from the top-level `minReplicaMemoryGb` baseline while a schedule entry is active.",
		),
	effectiveMaxReplicaMemoryGb: z
		.number()
		.optional()
		.describe(
			"Maximum memory per replica (Gb) currently applied to the running service. May diverge from the top-level `maxReplicaMemoryGb` baseline while a schedule entry is active. Reflects the stored value: normally equal to `effectiveMinReplicaMemoryGb` in horizontal mode, but a legacy service stored with an unequal memory range reports the stored bounds as-is.",
		),
	effectiveMinReplicas: z
		.int()
		.optional()
		.describe(
			"Minimum number of replicas currently applied to the running service. May diverge from the baseline while a schedule entry is active. Reflects the stored value: normally equal to `effectiveMaxReplicas` in vertical mode (a fixed replica count), but a legacy service stored with an unequal replica range reports the stored bounds as-is.",
		),
	effectiveMaxReplicas: z
		.int()
		.optional()
		.describe(
			"Maximum number of replicas currently applied to the running service. May diverge from the baseline while a schedule entry is active.",
		),
	effectiveIdleScaling: z
		.boolean()
		.optional()
		.describe(
			"Whether idle scaling is currently in effect on the service. May diverge from the top-level `idleScaling` baseline while a schedule entry is active.",
		),
	effectiveIdleTimeoutMinutes: z
		.int()
		.optional()
		.describe(
			"Idle timeout in minutes currently in effect on the service. May diverge from the top-level `idleTimeoutMinutes` baseline while a schedule entry is active.",
		),
	activeEntryId: z
		.uuid()
		.optional()
		.describe(
			"ID of the schedule entry whose values are currently applied to the service. Absent when no entry is active.",
		),
});

export const serviceEndpointSchema = z.object({
	protocol: z
		.enum(["https", "nativesecure", "mysql"])
		.optional()
		.describe("Endpoint protocol: 'https', 'nativesecure', 'mysql'.")
		.meta({ examples: ["mysql"] }),
	host: z.string().optional().describe("Service host name"),
	port: z.number().optional().describe("Numeric port"),
	username: z.string().nullish().describe("Optional username for the endpoint"),
});

export const ipAccessListEntrySchema = z.object({
	source: z.string().optional().describe("IP or CIDR"),
	description: z
		.string()
		.optional()
		.describe("Optional description of IPv4 address or IPv4 CIDR to allow access from"),
});

export const serviceSchema = z.object({
	id: z.uuid().optional().describe("Unique service ID."),
	name: z
		.string()
		.min(1)
		.max(50)
		.optional()
		.describe("Name of the service. Alphanumerical string with whitespaces up to 50 characters."),
	provider: z.enum(["aws", "gcp", "azure"]).optional().describe("Cloud provider"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Service region."),
	state: z
		.enum([
			"starting",
			"stopping",
			"terminating",
			"softdeleting",
			"awaking",
			"partially_running",
			"provisioning",
			"running",
			"stopped",
			"terminated",
			"softdeleted",
			"degraded",
			"failed",
			"idle",
		])
		.optional()
		.describe("Current state of the service."),
	clickhouseVersion: z.string().optional().describe("ClickHouse version of the service."),
	endpoints: z.array(serviceEndpointSchema).optional().describe("List of all service endpoints."),
	tier: z
		.enum([
			"development",
			"production",
			"dedicated_high_mem",
			"dedicated_high_cpu",
			"dedicated_standard",
			"dedicated_standard_n2d_standard_4",
			"dedicated_standard_n2d_standard_8",
			"dedicated_standard_n2d_standard_32",
			"dedicated_standard_n2d_standard_128",
			"dedicated_standard_n2d_standard_32_16SSD",
			"dedicated_standard_n2d_standard_64_24SSD",
		])
		.optional()
		.describe(
			"DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
		),
	minTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [48] }),
	maxTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [360] }),
	minReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Minimum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and greater than or equal to 8.",
		)
		.meta({ examples: [16] }),
	maxReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Maximum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
		)
		.meta({ examples: [120] }),
	numReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Number of replicas for the service. The number of replicas must be between 2 and 50 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier and its per-warehouse replica limit. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers. Present only when the service uses vertical autoscaling. For horizontal autoscaling, use minReplicas and maxReplicas instead.",
		)
		.meta({ examples: [3] }),
	minReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Minimum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling.",
		)
		.meta({ examples: [1] }),
	maxReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Maximum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling.",
		)
		.meta({ examples: [5] }),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.describe(
			'Configured autoscaling mode. "vertical" runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory. This is the baseline configuration; the mode currently applied (which may differ while a schedule entry is active) is currentScaling.effectiveAutoscalingMode.',
		)
		.meta({ examples: ["vertical"] }),
	replicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Fixed memory per replica in Gb for horizontal autoscaling. Present only when the service uses horizontal autoscaling. Must be a multiple of 4, at least 8 Gb, and at most 120 Gb for non paid services or 356 Gb for paid services.",
		)
		.meta({ examples: [32] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe(
			"When set to true the service is allowed to scale down to zero when idle. True by default.",
		),
	idleTimeoutMinutes: z
		.number()
		.optional()
		.describe("Set minimum idling timeout (in minutes). Must be >= 5 minutes."),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe("List of IP addresses allowed to access the service"),
	createdAt: z.iso.datetime().optional().describe("Service creation timestamp. ISO-8601."),
	encryptionKey: z.string().optional().describe("Optional customer provided disk encryption key"),
	encryptionAssumedRoleIdentifier: z
		.string()
		.optional()
		.describe("Optional role to use for disk encryption"),
	iamRole: z.string().optional().describe("IAM role used for accessing objects in s3"),
	privateEndpointIds: z.array(z.string()).optional().describe("List of private endpoints"),
	availablePrivateEndpointIds: z
		.array(z.string())
		.optional()
		.describe("List of available private endpoints ids that can be attached to the service"),
	dataWarehouseId: z.string().optional().describe("Data warehouse containing this service"),
	isPrimary: z
		.boolean()
		.optional()
		.describe("True if this service is the primary service in the data warehouse"),
	isReadonly: z
		.boolean()
		.optional()
		.describe(
			"True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
		),
	releaseChannel: z
		.enum(["slow", "default", "fast"])
		.optional()
		.describe(
			"Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
		),
	byocId: z
		.string()
		.optional()
		.describe(
			"This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
		),
	hasTransparentDataEncryption: z
		.boolean()
		.optional()
		.describe(
			"True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
		),
	profile: z
		.string()
		.optional()
		.describe(
			"Custom instance profile. Only available for ENTERPRISE and BYOC organization tiers. Standard values: 'v1-default', 'v1-highmem-xs', 'v1-highmem-s', 'v1-highmem-m', 'v1-highmem-l', 'v1-highmem-xl'. BYOC services may instead use a dynamic BYOC profile configured for their infrastructure (e.g. 'v1-standard-byoc-4'); it requires byocId, and minReplicaMemoryGb and maxReplicaMemoryGb must both equal the profile's memory size. Use the serviceProfiles endpoint to list the profiles available to the organization.",
		),
	transparentDataEncryptionKeyId: z
		.string()
		.optional()
		.describe(
			"The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true.",
		),
	encryptionRoleId: z
		.string()
		.optional()
		.describe(
			"The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true.",
		),
	complianceType: z
		.enum(["hipaa", "pci"])
		.optional()
		.describe("Type of regulatory compliance for service."),
	tags: z
		.array(resourceTagsV1Schema)
		.max(50)
		.optional()
		.describe("Tags associated with the service."),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe(
			"True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature",
		),
	scalingSchedule: scalingScheduleSchema.optional(),
	currentScaling: currentScalingSchema,
});

export const privateEndpointConfigSchema = z.object({
	endpointServiceId: z
		.string()
		.optional()
		.describe(
			"Unique identifier of the interface endpoint you created in your VPC with the AWS(Service Name), GCP(Target Service) or AZURE (Private Link Service) resource",
		),
	privateDnsHostname: z.string().optional().describe("Private DNS Hostname of the VPC you created"),
});

export const serviceQueryAPIEndpointSchema = z.object({
	id: z.string().optional().describe("The id of the service query endpoint"),
	openApiKeys: z
		.array(z.string())
		.optional()
		.describe("List of OpenAPI keys that can access the service query endpoint"),
	roles: z
		.array(z.enum(["sql_console_read_only", "sql_console_admin"]))
		.optional()
		.describe("List of roles that can access the service query endpoint"),
	allowedOrigins: z
		.string()
		.optional()
		.describe("The allowed origins as comma separated list of domains"),
});

export const serviceEndpointChangeSchema = z.object({
	protocol: z
		.enum(["mysql"])
		.optional()
		.describe("Endpoint protocol")
		.meta({ examples: ["mysql"] }),
	enabled: z.boolean().optional().describe("Enable or disable the endpoint"),
});

export const backupEncryptionConfigSchema = z
	.looseObject({})
	.describe(
		"The `encryption_config.json` stored alongside this backup in your bucket, passed through unchanged. Supply the file contents verbatim rather than constructing this object — its shape is versioned and depends on your cloud provider. See [Export backups to your own cloud account](https://clickhouse.com/docs/cloud/manage/backups/export-backups-to-own-cloud-account) for what it contains.\n\nAccepted only for organizations enrolled in the private preview, and only when the backup is of a service that has transparent data encryption enabled. Such a restore always produces a service with transparent data encryption enabled, inherited from the source service.",
	)
	.meta({ examples: [{}] });

export const ipAccessListPatchSchema = z.object({
	add: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe('Elements to add. Executed after "remove" part is processed.'),
	remove: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe('Elements to remove. Executed before "add" part is processed.'),
});

export const instanceTagsPatchSchema = z.object({
	add: z
		.array(resourceTagsV1Schema)
		.max(50)
		.optional()
		.describe('Elements to add. Executed after "remove" part is processed.'),
	remove: z
		.array(resourceTagsV1Schema)
		.max(50)
		.optional()
		.describe('Elements to remove. Executed before "add" part is processed.'),
});

export const instancePrivateEndpointsPatchSchema = z.object({
	add: z
		.array(z.string())
		.optional()
		.describe('Elements to add. Executed after "remove" part is processed.'),
	remove: z
		.array(z.string())
		.optional()
		.describe('Elements to remove. Executed before "add" part is processed.'),
});

export const instancePrivateEndpointSchema = z.object({
	id: z.string().optional().describe("Private endpoint identifier"),
	description: z.string().optional().describe("Description of private endpoint"),
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider in which the private endpoint is lcoated"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Region in which the private endpoint is located"),
});

export const organizationPrivateEndpointSchema = z.object({
	id: z.string().optional().describe("Private endpoint identifier"),
	description: z.string().optional().describe("Description of private endpoint"),
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider in which the private endpoint is lcoated"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Region in which the private endpoint is located"),
});

export const byocConfigSchema = z.object({
	id: z.string().optional().describe("Unique identifier of the BYOC configuration"),
	state: z
		.enum([
			"infra-provisioning",
			"infra-terminated",
			"infra-terminating",
			"infra-ready",
			"infra-degraded",
			"infra-upgrading",
		])
		.optional()
		.describe("State of the infrastructure")
		.meta({ examples: ["infra-ready"] }),
	accountId: z
		.string()
		.optional()
		.describe(
			"Cloud account ID the BYOC infrastructure is bound to: AWS account ID, GCP project ID, or Azure subscription ID",
		)
		.meta({ examples: ["123456789012"] }),
	accountName: z
		.string()
		.optional()
		.describe(
			"DEPRECATED. Use `accountId` instead. Cloud account ID the BYOC infrastructure is bound to",
		),
	regionId: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe(
			"Region for which the BYOC has been configured and where it is possible to create services",
		),
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider of the region"),
	displayName: z.string().optional().describe("Human readable name for infrastructure"),
});

export const organizationCapabilitiesSchema = z.object({
	snapshots: z
		.boolean()
		.optional()
		.describe("Whether the organization is eligible to enable snapshots on its primary services."),
});

export const organizationSchema = z.object({
	id: z.uuid().optional().describe("Unique organization ID."),
	createdAt: z.iso
		.datetime()
		.optional()
		.describe("The timestamp the organization was created. ISO-8601."),
	name: z.string().optional().describe("Name of the organization."),
	privateEndpoints: z
		.array(organizationPrivateEndpointSchema)
		.optional()
		.describe("List of private endpoints for organization"),
	byocConfig: z
		.array(byocConfigSchema)
		.optional()
		.describe("BYOC configuration for the organization"),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe(
			"Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports.",
		),
	capabilities: organizationCapabilitiesSchema.optional(),
});

export const organizationCloudRegionPrivateEndpointConfigSchema = z.object({
	endpointServiceId: z
		.string()
		.optional()
		.describe(
			"Unique identifier of the interface endpoint you created in your VPC with the AWS(Service Name) or GCP(Target Service) resource",
		),
});

export const prometheusDiscoveryLabelsSchema = z.object({
	__scheme__: z.string().optional().describe("URL scheme Prometheus must scrape the target with."),
	__metrics_path__: z
		.string()
		.optional()
		.describe("Path of the per-service Prometheus metrics endpoint."),
	__param_filtered_metrics: z
		.string()
		.optional()
		.describe("Value passed as the filtered_metrics query parameter on each scrape."),
	clickhouse_org_id: z.uuid().optional().describe("Organization ID the service belongs to."),
	clickhouse_service_id: z.uuid().optional().describe("Service ID."),
	clickhouse_discovery_service_name: z.string().optional().describe("Service name."),
});

export const prometheusDiscoveryTargetGroupSchema = z.object({
	targets: z.array(z.string()).optional().describe("Host (and port) of the ClickHouse Cloud API."),
	labels: prometheusDiscoveryLabelsSchema.optional(),
});

export const organizationPatchPrivateEndpointSchema = z.object({
	id: z.string().optional().describe("Private endpoint identifier"),
	description: z.string().optional().describe("Optional description of private endpoint"),
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider in which the private endpoint is lcoated"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Region in which the private endpoint is located"),
});

export const organizationPrivateEndpointsPatchSchema = z.object({
	add: z
		.array(organizationPatchPrivateEndpointSchema)
		.optional()
		.describe(
			'DEPRECATED. Elements to add. Executed after "remove" part is processed. Please use the `Update Service Basic Details` endpoint with the `privateEndpointIds` field instead to modify the private endpoints.',
		),
	remove: z
		.array(organizationPatchPrivateEndpointSchema)
		.optional()
		.describe('Elements to remove. Executed before "add" part is processed.'),
});

export const byocInfrastructureTagsSchema = z.record(z.string(), z.string());

export const byocInfrastructureValidationCheckSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Human readable name of the check")
		.meta({ examples: ["Create EKS cluster"] }),
	action: z
		.string()
		.optional()
		.describe("Cloud permission or action the check simulated")
		.meta({ examples: ["eks:CreateCluster"] }),
	allowed: z.boolean().optional().describe("Whether the account allowed the simulated action"),
	reason: z
		.string()
		.optional()
		.describe("Cloud-provider detail for a denied check, e.g. an IAM decision reason")
		.meta({ examples: ["implicitDeny"] }),
	group: z
		.string()
		.optional()
		.describe(
			"Free-form grouping of related checks, e.g. base or vpc-write. Groupings may change as validations evolve",
		),
});

export const byocInfrastructureValidationSchema = z.object({
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider of the requested region"),
	allPassed: z.boolean().optional().describe("True when every check passed"),
	anyPassed: z.boolean().optional().describe("True when at least one check passed"),
	supported: z
		.boolean()
		.optional()
		.describe(
			"Whether preflight validation is implemented for the requested cloud and configuration. When false, an empty check list means nothing was verified rather than everything passed",
		),
	checks: z
		.array(byocInfrastructureValidationCheckSchema)
		.optional()
		.describe("Individual permission checks with their outcomes"),
});

export const byocInfrastructureTagsResponseSchema = z.object({
	tags: byocInfrastructureTagsSchema,
});

export const byocInfrastructurePrivateEndpointConfigSchema = z.object({
	endpointName: z
		.string()
		.describe(
			"Cloud-provider identifier of the private link endpoint service of the infrastructure: VPC endpoint service name on AWS, Private Service Connect service attachment on GCP, or Private Link service on Azure",
		),
	privateDnsHostname: z
		.string()
		.describe(
			"Private DNS hostname under which services of the infrastructure are reachable over private link",
		),
});

export const byocInfrastructureDetailsSchema = z.object({
	id: z.string().optional().describe("Unique identifier of the BYOC infrastructure"),
	state: z
		.enum([
			"infra-provisioning",
			"infra-terminated",
			"infra-terminating",
			"infra-ready",
			"infra-degraded",
			"infra-upgrading",
		])
		.optional()
		.describe("State of the infrastructure")
		.meta({ examples: ["infra-ready"] }),
	accountId: z
		.string()
		.optional()
		.describe(
			"Cloud account ID the BYOC infrastructure is bound to: AWS account ID, GCP project ID, or Azure subscription ID",
		)
		.meta({ examples: ["123456789012"] }),
	regionId: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Region the BYOC infrastructure is located in"),
	cloudProvider: z
		.enum(["gcp", "aws", "azure"])
		.optional()
		.describe("Cloud provider of the region"),
	displayName: z.string().optional().describe("Human readable name for infrastructure"),
	enablePrivateLink: z
		.boolean()
		.optional()
		.describe("Whether private link connectivity is enabled on the infrastructure"),
	enablePrivateLoadBalancer: z
		.boolean()
		.optional()
		.describe("Whether the private load balancer is enabled on the infrastructure"),
	enablePublicLoadBalancer: z
		.boolean()
		.optional()
		.describe("Whether the public load balancer is enabled on the infrastructure"),
	vpcCidrRange: z
		.string()
		.optional()
		.describe("CIDR range of the ClickHouse-managed VPC. Absent for BYO-VPC infrastructures")
		.meta({ examples: ["10.0.0.0/16"] }),
	vpcAvailabilityZoneList: z
		.array(z.string())
		.optional()
		.describe("Availability zones the infrastructure spans")
		.meta({ examples: [["us-east-1a", "us-east-1b", "us-east-1c"]] }),
	isByoVpc: z
		.boolean()
		.optional()
		.describe(
			"True when the infrastructure runs in a customer-provided VPC (BYO-VPC) instead of a ClickHouse-managed one",
		),
	byoVpcId: z
		.string()
		.optional()
		.describe("Customer VPC ID or network name (BYO-VPC only)")
		.meta({ examples: ["vpc-0abc1234def567890"] }),
	byoVpcPrivateSubnetIds: z
		.array(z.string())
		.optional()
		.describe("Customer private subnet IDs or names (BYO-VPC only; exactly one entry on GCP)"),
	byoVpcPodCidrRangeNames: z
		.array(z.string())
		.optional()
		.describe(
			"Secondary IP range names pinned for pod IPs (GCP BYO-VPC only). Absent when all secondary ranges are used",
		),
	byoVpcSharedVpcHostProjectId: z
		.string()
		.optional()
		.describe(
			"Shared VPC host project owning the VPC and subnet (GCP BYO-VPC only). Absent when the VPC lives in the service project",
		),
	gcpPscSubnetId: z
		.string()
		.optional()
		.describe(
			"Customer-provided Private Service Connect NAT subnet name configured for private link (GCP BYO-VPC only)",
		),
});

export const byocInfrastructureProgressStageSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Name of the provisioning stage or resource")
		.meta({ examples: ["vpc"] }),
	status: z
		.enum(["not_started", "pending", "waiting", "in_progress", "ready", "failed"])
		.optional()
		.describe("Status of this stage")
		.meta({ examples: ["ready"] }),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Timestamp the stage status last changed. ISO-8601"),
	message: z
		.string()
		.optional()
		.describe("Human readable detail for the current status, e.g. an error message"),
	get subStages() {
		return z
			.array(byocInfrastructureProgressStageSchema)
			.optional()
			.describe("Nested stages; leaf entries are individual cloud resources");
	},
});

export const byocInfrastructureProgressSchema = z.object({
	id: z.string().optional().describe("Unique identifier of the BYOC infrastructure"),
	status: z
		.enum(["not_started", "pending", "waiting", "in_progress", "ready", "failed"])
		.optional()
		.describe("Overall provisioning status of the infrastructure")
		.meta({ examples: ["in_progress"] }),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Timestamp the overall status last changed. ISO-8601"),
	get stages() {
		return z
			.array(byocInfrastructureProgressStageSchema)
			.optional()
			.describe("Top-level provisioning stages with their nested resources");
	},
});

export const RBACPolicyTagsSchema = z.object({
	grants: z
		.array(z.string())
		.optional()
		.describe("Optional list of database grants (e.g., database names)"),
	roleV2: z
		.enum(["sql-console-readonly", "sql-console-admin"])
		.optional()
		.describe("Optional SQL console role type"),
});

export const RBACPolicySchema = z.object({
	id: z.string().optional().describe("Unique policy identifier"),
	roleId: z.string().optional().describe("ID of the role this policy belongs to"),
	tenantId: z.string().optional().describe("Tenant resource ID (e.g., organization/uuid)"),
	allowDeny: z
		.enum(["ALLOW", "DENY"])
		.optional()
		.describe("Whether this policy allows or denies access"),
	permissions: z
		.array(z.string())
		.optional()
		.describe("List of permissions granted or denied by this policy"),
	resources: z
		.array(z.string())
		.optional()
		.describe("List of resource IDs this policy applies to (e.g., instance/uuid, instance/*)"),
	tags: RBACPolicyTagsSchema.optional(),
});

export const RBACRoleSchema = z.object({
	id: z.string().optional().describe("Unique role identifier"),
	tenantId: z.string().optional().describe("Tenant resource ID (e.g., organization/uuid)"),
	ownerId: z.string().optional().describe("Owner resource ID (e.g., organization/uuid)"),
	name: z.string().optional().describe("Name of the role"),
	type: z
		.enum(["system", "custom"])
		.optional()
		.describe("Whether this is a system role or a custom role"),
	actors: z
		.array(z.string())
		.optional()
		.describe("List of actor resource IDs assigned to this role (e.g., user/uuid, apiKey/uuid)"),
	policies: z
		.array(RBACPolicySchema)
		.optional()
		.describe("List of policies associated with this role"),
	createdAt: z.iso.datetime().optional().describe("Timestamp when the role was created. ISO-8601."),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Timestamp when the role was last updated. ISO-8601."),
});

export const RBACPolicyCreateRequestSchema = z.object({
	allowDeny: z.enum(["ALLOW", "DENY"]).describe("Whether this policy allows or denies access"),
	permissions: z
		.array(z.string())
		.describe('List of permissions to grant or deny (e.g., ["control-plane:organization:view"])'),
	resources: z
		.array(z.string())
		.describe(
			'List of resource IDs this policy applies to (e.g., ["instance/uuid", "instance/*"])',
		),
	tags: RBACPolicyTagsSchema.optional(),
});

export const roleCreateRequestSchema = z.object({
	name: z.string().describe("Name of the role"),
	actors: z
		.array(z.string())
		.describe(
			'List of actor resource IDs to assign to this role (e.g., ["user/uuid", "apiKey/uuid"])',
		),
	policies: z
		.array(RBACPolicyCreateRequestSchema)
		.describe("List of policies to create for this role"),
});

export const roleUpdateRequestSchema = z.object({
	name: z.string().optional().describe("New name for the role"),
	actors: z
		.array(z.string())
		.optional()
		.describe("New list of actor resource IDs (replaces existing actors)"),
	policies: z
		.array(RBACPolicyCreateRequestSchema)
		.optional()
		.describe("New list of policies (replaces existing policies)"),
});

export const usageCostMetricsSchema = z.object({
	storageCHC: z
		.number()
		.optional()
		.describe("Cost of storage in ClickHouse Credits (CHCs). Applies to dataWarehouse entities."),
	backupCHC: z
		.number()
		.optional()
		.describe("Cost of backup in ClickHouse Credits (CHCs). Applies to dataWarehouse entities."),
	computeCHC: z
		.number()
		.optional()
		.describe(
			"Cost of compute in ClickHouse Credits (CHCs). Applies to service and clickpipe entities.",
		),
	dataTransferCHC: z
		.number()
		.optional()
		.describe("Cost of data transfer in ClickHouse Credits (CHCs). Applies to clickpipe entities."),
	initialLoadCHC: z
		.number()
		.optional()
		.describe(
			"Cost of initial load and resyncs in ClickHouse Credits (CHCs). Applies to clickpipe entities.",
		),
	publicDataTransferCHC: z
		.number()
		.optional()
		.describe("Cost of data transfer in ClickHouse Credits (CHCs). Applies to service entities."),
	interRegionTier1DataTransferCHC: z
		.number()
		.optional()
		.describe(
			"Cost of tier1 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
		),
	interRegionTier2DataTransferCHC: z
		.number()
		.optional()
		.describe(
			"Cost of tier2 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
		),
	interRegionTier3DataTransferCHC: z
		.number()
		.optional()
		.describe(
			"Cost of tier3 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
		),
	interRegionTier4DataTransferCHC: z
		.number()
		.optional()
		.describe(
			"Cost of tier4 inter-region data transfer in ClickHouse Credits (CHCs). Applies to service entities.",
		),
});

export const usageCostRecordSchema = z.object({
	dataWarehouseId: z
		.uuid()
		.optional()
		.describe("ID of the dataWarehouse this entity belongs to (or is)."),
	serviceId: z
		.uuid()
		.nullish()
		.describe(
			"ID of the service this entity belongs to (or is). Set to null for dataWarehouse entities.",
		),
	date: z.iso
		.date()
		.optional()
		.describe("Date of the usage. ISO-8601 date, based on the UTC timezone."),
	entityType: z
		.enum(["datawarehouse", "service", "clickpipe"])
		.optional()
		.describe("Type of the entity."),
	entityId: z.uuid().optional().describe("Unique ID of the entity."),
	entityName: z.string().optional().describe("Name of the entity."),
	metrics: usageCostMetricsSchema.optional(),
	totalCHC: z
		.number()
		.optional()
		.describe("Total cost of usage in ClickHouse Credits (CHCs) for this entity."),
	locked: z
		.boolean()
		.optional()
		.describe(
			"When true, the record is immutable. Unlocked records are subject to change until locked.",
		),
});

export const usageCostSchema = z.object({
	grandTotalCHC: z
		.number()
		.optional()
		.describe("Grand total cost of usage in ClickHouse Credits (CHCs)."),
	costs: z
		.array(usageCostRecordSchema)
		.optional()
		.describe("List of daily, per-entity usage cost records."),
});

export const customPrivateDnsMappingSchema = z.object({
	privateDnsName: z
		.string()
		.optional()
		.describe(
			"Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service.\nGenerally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC.\nSupports exact names and leading wildcard names such as *.example.com",
		)
		.meta({ examples: ["*.my-service.example.com"] }),
	targetId: z
		.string()
		.optional()
		.describe(
			"Optional DNS target ID. Supported only for VPC_RESOURCE, where it is the CHILD resource configuration ID (rcfg-…), or the configuration ID for a single resource. Set it at create time to route a custom DNS name to that resource. If the target is not reported in dnsTargets yet, the mapping is not served until it appears; it does not fall back to the default target. If omitted, the default target is used. Once dnsTargets is non-empty, adding or changing a targetId requires an ID in that list; unchanged target IDs are not re-checked.",
		)
		.meta({ examples: ["rcfg-097648d8068504966"] }),
});

export const reversePrivateEndpointPrivateDnsMappingSchema = z.object({
	privateDnsName: z
		.string()
		.optional()
		.describe("Provider private DNS name reported by the Reverse Private Endpoint.")
		.meta({ examples: ["my-service.example.com"] }),
	internalDnsName: z
		.string()
		.optional()
		.describe("Internal DNS target for the provider private DNS name.")
		.meta({
			examples: [
				"vpce-0123456789abcdef0-abcdefg.vpce-svc-0123456789abcdef0.us-east-1.vpce.amazonaws.com",
			],
		}),
});

export const reversePrivateEndpointDnsTargetSchema = z.object({
	id: z
		.string()
		.optional()
		.describe(
			"DNS target ID. For VPC_RESOURCE, the associated CHILD resource configuration ID, or the configuration ID for a single resource.",
		)
		.meta({ examples: ["rcfg-097648d8068504966"] }),
	kind: z
		.enum(["RESOURCE_CONFIGURATION"])
		.optional()
		.describe("DNS target kind.")
		.meta({ examples: ["RESOURCE_CONFIGURATION"] }),
	internalDnsName: z
		.string()
		.optional()
		.describe(
			"Internal DNS name currently reported for this target. To select a target for a custom private DNS mapping, use its id as targetId.",
		)
		.meta({
			examples: [
				"vpce-052ef252671124ada.rcfg-097648d8068504966.4232ccc.vpc-lattice-rsc.us-east-1.on.aws",
			],
		}),
});

export const createReversePrivateEndpointSchema = z.object({
	description: z
		.string()
		.describe("Reverse private endpoint description. Maximum length is 255 characters.")
		.meta({ examples: ["My reverse private endpoint"] }),
	type: z
		.enum(["VPC_ENDPOINT_SERVICE", "VPC_RESOURCE", "MSK_MULTI_VPC", "GCP_PSC_SERVICE_ATTACHMENT"])
		.describe("Reverse private endpoint type.")
		.meta({ examples: ["VPC_ENDPOINT_SERVICE"] }),
	vpcEndpointServiceName: z
		.string()
		.optional()
		.describe("VPC endpoint service name.")
		.meta({ examples: ["com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567"] }),
	vpcResourceConfigurationId: z
		.string()
		.optional()
		.describe("VPC resource configuration ID. Required for VPC_RESOURCE type.")
		.meta({ examples: ["rcfg-12345678901234567"] }),
	vpcResourceShareArn: z
		.string()
		.optional()
		.describe("VPC resource share ARN. Required for VPC_RESOURCE type.")
		.meta({
			examples: ["arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567"],
		}),
	mskClusterArn: z
		.string()
		.optional()
		.describe("MSK cluster ARN. Required for MSK_MULTI_VPC type.")
		.meta({
			examples: [
				"arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/a1b2c3d4-5678-90ab-cdef-1234567890ab-1",
			],
		}),
	mskAuthentication: z
		.enum(["SASL_IAM", "SASL_SCRAM"])
		.optional()
		.describe("MSK cluster authentication type. Required for MSK_MULTI_VPC type.")
		.meta({ examples: ["SASL_IAM"] }),
	gcpServiceAttachment: z
		.string()
		.optional()
		.describe(
			"Private Preview. GCP PSC service attachment URI. Required for GCP_PSC_SERVICE_ATTACHMENT type. Format: projects/{project}/regions/{region}/serviceAttachments/{name}.",
		)
		.meta({ examples: ["projects/my-project/regions/us-central1/serviceAttachments/my-service"] }),
	customPrivateDnsMappings: z
		.array(customPrivateDnsMappingSchema)
		.optional()
		.describe(
			"Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service.\nGenerally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC.\nSupports exact names and leading wildcard names such as *.example.com",
		)
		.meta({
			examples: [
				[{ privateDnsName: "my-service.example.com" }, { privateDnsName: "*.example.com" }],
			],
		}),
});

export const updateReversePrivateEndpointSchema = z.object({
	customPrivateDnsMappings: z
		.array(customPrivateDnsMappingSchema)
		.optional()
		.describe(
			"Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service.\nGenerally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC.\nSupports exact names and leading wildcard names such as *.example.com",
		)
		.meta({
			examples: [
				[{ privateDnsName: "my-service.example.com" }, { privateDnsName: "*.example.com" }],
			],
		}),
});

export const reversePrivateEndpointSchema = z.object({
	description: z
		.string()
		.optional()
		.describe("Reverse private endpoint description. Maximum length is 255 characters.")
		.meta({ examples: ["My reverse private endpoint"] }),
	type: z
		.enum(["VPC_ENDPOINT_SERVICE", "VPC_RESOURCE", "MSK_MULTI_VPC", "GCP_PSC_SERVICE_ATTACHMENT"])
		.optional()
		.describe("Reverse private endpoint type.")
		.meta({ examples: ["VPC_ENDPOINT_SERVICE"] }),
	vpcEndpointServiceName: z
		.string()
		.nullish()
		.describe("VPC endpoint service name.")
		.meta({ examples: ["com.amazonaws.vpce.us-east-1.vpce-svc-12345678901234567"] }),
	vpcResourceConfigurationId: z
		.string()
		.nullish()
		.describe("VPC resource configuration ID. Required for VPC_RESOURCE type.")
		.meta({ examples: ["rcfg-12345678901234567"] }),
	vpcResourceShareArn: z
		.string()
		.nullish()
		.describe("VPC resource share ARN. Required for VPC_RESOURCE type.")
		.meta({
			examples: ["arn:aws:ram:us-east-1:123456789012:resource-share/share-12345678901234567"],
		}),
	mskClusterArn: z
		.string()
		.nullish()
		.describe("MSK cluster ARN. Required for MSK_MULTI_VPC type.")
		.meta({
			examples: [
				"arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/a1b2c3d4-5678-90ab-cdef-1234567890ab-1",
			],
		}),
	mskAuthentication: z
		.enum(["SASL_IAM", "SASL_SCRAM"])
		.nullish()
		.describe("MSK cluster authentication type. Required for MSK_MULTI_VPC type.")
		.meta({ examples: ["SASL_IAM"] }),
	gcpServiceAttachment: z
		.string()
		.nullish()
		.describe(
			"Private Preview. GCP PSC service attachment URI. Required for GCP_PSC_SERVICE_ATTACHMENT type. Format: projects/{project}/regions/{region}/serviceAttachments/{name}.",
		)
		.meta({ examples: ["projects/my-project/regions/us-central1/serviceAttachments/my-service"] }),
	customPrivateDnsMappings: z
		.array(customPrivateDnsMappingSchema)
		.optional()
		.describe(
			"Optional private DNS names for Reverse Private Endpoint. Can be used as data source destination address. Must be unique across the ClickHouse service.\nGenerally available for Google Private Service Connect (PSC). For AWS PrivateLink (VPC endpoint service and VPC resource), available in Private Preview; contact ClickHouse support to enable it for your service. Not supported for MSK multi-VPC.\nSupports exact names and leading wildcard names such as *.example.com",
		)
		.meta({
			examples: [
				[{ privateDnsName: "my-service.example.com" }, { privateDnsName: "*.example.com" }],
			],
		}),
	id: z
		.uuid()
		.optional()
		.describe("Reverse private endpoint ID.")
		.meta({ examples: ["12345678-1234-1234-1234-123456789012"] }),
	serviceId: z
		.uuid()
		.optional()
		.describe("ClickHouse service ID reverse private endpoint is associated with.")
		.meta({ examples: ["12345678-1234-1234-1234-123456789012"] }),
	endpointId: z
		.string()
		.optional()
		.describe("Reverse private endpoint endpoint ID.")
		.meta({ examples: ["vpce-12345678901234567"] }),
	dnsNames: z
		.array(z.string())
		.optional()
		.describe("Reverse private endpoint internal DNS names.")
		.meta({
			examples: [["vpce-12345678901234567-abcdefg.execute-api.us-east-1.vpce.amazonaws.com"]],
		}),
	privateDnsNames: z
		.array(z.string())
		.optional()
		.describe("Reverse private endpoint private DNS names.")
		.meta({
			examples: [["vpce-12345678901234567-abcdefg.execute-api.us-east-1.vpce.amazonaws.com"]],
		}),
	privateDnsMappings: z
		.array(reversePrivateEndpointPrivateDnsMappingSchema)
		.optional()
		.describe(
			"Read-only provider private DNS names and their internal DNS targets reported by the Reverse Private Endpoint. For VPC_RESOURCE, this list can be empty when CHILD resources have no provider private DNS.",
		)
		.meta({
			examples: [
				[{ privateDnsName: "my-service.example.com", internalDnsName: "internal.example.com" }],
			],
		}),
	dnsTargets: z
		.array(reversePrivateEndpointDnsTargetSchema)
		.optional()
		.describe(
			"Read-only DNS targets the Reverse Private Endpoint currently reports. For VPC_RESOURCE, there is one RESOURCE_CONFIGURATION target per resource configuration association, identified by its CHILD resource configuration ID, or the configuration ID for a single resource. Other endpoint types report an empty list. Targets can appear over time; a custom mapping with a targetId that is not reported yet is not served until it appears.",
		)
		.meta({
			examples: [
				[
					{
						id: "rcfg-097648d8068504966",
						kind: "RESOURCE_CONFIGURATION",
						internalDnsName: "internal.example.com",
					},
				],
			],
		}),
	status: z
		.enum([
			"Unknown",
			"Provisioning",
			"Deleting",
			"Ready",
			"Failed",
			"PendingAcceptance",
			"Rejected",
			"Expired",
		])
		.optional()
		.describe("Reverse private endpoint status.")
		.meta({ examples: ["Ready"] }),
});

export const PLAINSchema = z.object({
	username: z
		.string()
		.optional()
		.describe("Database username.")
		.meta({ examples: ["postgres_user"] }),
	password: z
		.string()
		.optional()
		.describe("Database password.")
		.meta({ examples: ["your_secure_password"] }),
});

export const mskIamUserSchema = z.object({
	accessKeyId: z.string().optional().describe("IAM access key ID."),
	secretKey: z.string().optional().describe("IAM secret key."),
});

export const serviceAccountSchema = z.object({
	serviceAccountFile: z
		.string()
		.describe("Google Cloud service account JSON key file content, base64 encoded."),
});

export const clickPipeKafkaOffsetSchema = z.object({
	strategy: z
		.enum(["from_beginning", "from_latest", "from_timestamp"])
		.optional()
		.describe("Offset strategy."),
	timestamp: z
		.string()
		.nullish()
		.describe(
			'A minute precision UTC timestamp to start from. Required for "from_timestamp" strategy.',
		)
		.meta({ examples: ["2021-01-01T00:00"] }),
});

export const clickPipeKafkaConfluentSchemaRegistrySchema = z.object({
	type: z
		.enum(["confluent"])
		.optional()
		.describe(
			"Type of the schema registry. Defaults to 'confluent' (a Confluent-compatible REST registry).",
		),
	url: z
		.string()
		.describe("Schema URL. HTTPS required.")
		.meta({ examples: ["https://psrc-aa00.us-east-2.aws.confluent.cloud/schemas/ids/100004"] }),
	authentication: z
		.enum(["PLAIN"])
		.optional()
		.describe("Authentication type of the schema registry."),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificates to validate the schema registry's certificate."),
});

export const clickPipeKafkaGlueSchemaRegistrySchema = z.object({
	type: z
		.enum(["glue"])
		.describe(
			"Type of the schema registry. Use 'glue' for the AWS Glue Schema Registry, which authenticates with IAM instead of credentials.",
		),
	glueRegion: z
		.string()
		.describe("AWS region of the Glue Schema Registry.")
		.meta({ examples: ["us-east-1"] }),
	glueRegistryName: z
		.string()
		.describe("Name of the Glue Schema Registry.")
		.meta({ examples: ["my-registry"] }),
	glueRoleArn: z
		.string()
		.optional()
		.describe(
			"IAM role to assume for Glue Schema Registry access. Defaults to the iamRole of the Kafka source, so it is required when the source does not authenticate with IAM. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyGlueRegistryRole"] }),
});

export const clickPipeKafkaSchemaRegistrySchema = z.discriminatedUnion("type", [
	clickPipeKafkaConfluentSchemaRegistrySchema.strict(),
	clickPipeKafkaGlueSchemaRegistrySchema.strict(),
]);

export const clickPipeKafkaSchemaRegistryCredentialsSchema = z.object({
	username: z.string().optional().describe("Username for the schema registry."),
	password: z.string().optional().describe("Password for the schema registry."),
});

export const clickPipeMutateKafkaConfluentSchemaRegistrySchema = z.object({
	type: z
		.enum(["confluent"])
		.optional()
		.describe(
			"Type of the schema registry. Defaults to 'confluent' (a Confluent-compatible REST registry).",
		),
	url: z
		.string()
		.describe("Schema URL. HTTPS required.")
		.meta({ examples: ["https://psrc-aa00.us-east-2.aws.confluent.cloud/schemas/ids/100004"] }),
	authentication: z.enum(["PLAIN"]).describe("Authentication type of the schema registry."),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificates to validate the schema registry's certificate."),
	credentials: clickPipeKafkaSchemaRegistryCredentialsSchema,
});

export const clickPipeMutateKafkaSchemaRegistrySchema = z.discriminatedUnion("type", [
	clickPipeMutateKafkaConfluentSchemaRegistrySchema.strict(),
	clickPipeKafkaGlueSchemaRegistrySchema.strict(),
]);

export const azureEventHubSchema = z.object({
	connectionString: z.string().optional().describe("Connection string for Azure EventHub source."),
});

export const mutualTLSSchema = z.object({
	certificate: z
		.string()
		.optional()
		.describe("PEM encoded client certificate for mTLS authentication."),
	privateKey: z
		.string()
		.optional()
		.describe("PEM encoded client private key for mTLS authentication."),
});

export const clickPipeKafkaSourceSchema = z.object({
	type: z
		.enum([
			"kafka",
			"redpanda",
			"msk",
			"gcmk",
			"confluent",
			"warpstream",
			"azureeventhub",
			"dokafka",
		])
		.optional()
		.describe("Type of the Kafka source."),
	format: z
		.enum(["JSONEachRow", "Avro", "AvroConfluent", "Protobuf"])
		.optional()
		.describe("Format of the Kafka source."),
	brokers: z.string().optional().describe("Brokers of the Kafka source."),
	topics: z
		.string()
		.optional()
		.describe(
			"One or more Kafka topics as a comma-separated string. All topics must have the same schema and are ingested into the same destination table by a single ClickPipe.",
		)
		.meta({ examples: ["topic1,topic2"] }),
	consumerGroup: z
		.string()
		.nullish()
		.describe(
			'Consumer group of the Kafka source. If not provided "clickpipes-<<ID>>" will be used.',
		)
		.meta({ examples: ["my-clickpipe-consumer-group"] }),
	authentication: z
		.enum([
			"PLAIN",
			"SCRAM-SHA-256",
			"SCRAM-SHA-512",
			"IAM_ROLE",
			"IAM_USER",
			"MUTUAL_TLS",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.optional()
		.describe(
			"Authentication method of the Kafka source. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, gcmk: PLAIN, MUTUAL_TLS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	offset: z.union([clickPipeKafkaOffsetSchema.strict(), z.null()]).optional(),
	schemaRegistry: z.union([clickPipeKafkaSchemaRegistrySchema, z.null()]).optional(),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificates to validate the broker's certificate."),
	reversePrivateEndpointIds: z
		.array(z.string())
		.optional()
		.describe(
			"Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
		),
	exactlyOnce: z
		.boolean()
		.nullish()
		.describe(
			"Enable exactly-once delivery. Guarantees every Kafka record is inserted exactly once across restarts and rebalances. Can only be set at pipe creation.",
		),
	tombstoneMode: z
		.enum(["delete", "soft_delete"])
		.nullish()
		.describe(
			'How Kafka tombstone records are handled. Set to "delete" to delete the matching destination row; this requires exactly-once delivery. Set to "soft_delete" to write a row with the _is_deleted virtual column set to true; exactly-once delivery is not required. Can only be set at pipe creation.',
		)
		.meta({ examples: ["soft_delete"] }),
});

export const clickPipePostKafkaSourceSchema = z.object({
	type: z
		.enum([
			"kafka",
			"redpanda",
			"msk",
			"gcmk",
			"confluent",
			"warpstream",
			"azureeventhub",
			"dokafka",
		])
		.optional()
		.describe("Type of the Kafka source."),
	format: z
		.enum(["JSONEachRow", "Avro", "AvroConfluent", "Protobuf"])
		.optional()
		.describe("Format of the Kafka source."),
	brokers: z.string().optional().describe("Brokers of the Kafka source."),
	topics: z
		.string()
		.optional()
		.describe(
			"One or more Kafka topics as a comma-separated string. All topics must have the same schema and are ingested into the same destination table by a single ClickPipe.",
		)
		.meta({ examples: ["topic1,topic2"] }),
	consumerGroup: z
		.string()
		.nullish()
		.describe(
			'Consumer group of the Kafka source. If not provided "clickpipes-<<ID>>" will be used.',
		)
		.meta({ examples: ["my-clickpipe-consumer-group"] }),
	authentication: z
		.enum([
			"PLAIN",
			"SCRAM-SHA-256",
			"SCRAM-SHA-512",
			"IAM_ROLE",
			"IAM_USER",
			"MUTUAL_TLS",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.optional()
		.describe(
			"Authentication method of the Kafka source. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, gcmk: PLAIN, MUTUAL_TLS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	offset: z.union([clickPipeKafkaOffsetSchema.strict(), z.null()]).optional(),
	schemaRegistry: z.union([clickPipeMutateKafkaSchemaRegistrySchema, z.null()]).optional(),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificates to validate the broker's certificate."),
	reversePrivateEndpointIds: z
		.array(z.string())
		.optional()
		.describe(
			"Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
		),
	exactlyOnce: z
		.boolean()
		.nullish()
		.describe(
			"Enable exactly-once delivery. Guarantees every Kafka record is inserted exactly once across restarts and rebalances. Can only be set at pipe creation.",
		),
	tombstoneMode: z
		.enum(["delete", "soft_delete"])
		.nullish()
		.describe(
			'How Kafka tombstone records are handled. Set to "delete" to delete the matching destination row; this requires exactly-once delivery. Set to "soft_delete" to write a row with the _is_deleted virtual column set to true; exactly-once delivery is not required. Can only be set at pipe creation.',
		)
		.meta({ examples: ["soft_delete"] }),
	credentials: z
		.union([
			PLAINSchema.strict(),
			mskIamUserSchema.strict(),
			azureEventHubSchema.strict(),
			mutualTLSSchema.strict(),
		])
		.optional()
		.describe(
			"Credentials for Kafka source. Choose one that is supported by the authentication method.",
		),
	protobufSchema: z
		.string()
		.min(1)
		.max(1048576)
		.optional()
		.describe(
			"Base64-encoded .proto source or serialized FileDescriptorSet. Supported only with Protobuf format and cannot be combined with schemaRegistry.",
		)
		.meta({ examples: ["c3ludGF4ID0gInByb3RvMyI7IG1lc3NhZ2UgRXZlbnQge30="] }),
});

export const clickPipePatchKafkaSourceSchema = z.object({
	authentication: z
		.enum([
			"PLAIN",
			"SCRAM-SHA-256",
			"SCRAM-SHA-512",
			"IAM_ROLE",
			"IAM_USER",
			"MUTUAL_TLS",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.nullish()
		.describe(
			"Authentication method of the Kafka source. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. Supported authentication methods: kafka: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, msk: SCRAM-SHA-512, IAM_ROLE, IAM_USER, MUTUAL_TLS, gcmk: PLAIN, MUTUAL_TLS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY, confluent: PLAIN, MUTUAL_TLS, warpstream: PLAIN, azureeventhub: PLAIN, redpanda: SCRAM-SHA-256, SCRAM-SHA-512, MUTUAL_TLS, dokafka: SCRAM-SHA-256, MUTUAL_TLS",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role for the Kafka source. Use with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/kafka#iam",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificates to validate the broker's certificate."),
	reversePrivateEndpointIds: z
		.array(z.string())
		.optional()
		.describe(
			"Reverse private endpoint UUIDs used for a secure private connection to the Kafka source.",
		),
	credentials: z
		.union([
			PLAINSchema.strict(),
			mskIamUserSchema.strict(),
			azureEventHubSchema.strict(),
			mutualTLSSchema.strict(),
		])
		.optional()
		.describe(
			"Credentials for Kafka source. Choose one that is supported by the authentication method.",
		),
});

export const clickPipeKinesisSchemaRegistrySchema = z.object({
	type: z
		.enum(["glue"])
		.describe(
			"Type of the schema registry. Kinesis ClickPipes support the AWS Glue Schema Registry, which authenticates with IAM instead of credentials.",
		),
	glueRegion: z
		.string()
		.describe("AWS region of the Glue Schema Registry.")
		.meta({ examples: ["us-east-1"] }),
	glueRegistryName: z
		.string()
		.describe("Name of the Glue Schema Registry.")
		.meta({ examples: ["my-registry"] }),
	glueRoleArn: z
		.string()
		.nullish()
		.describe(
			"IAM role to assume for Glue Schema Registry access. Defaults to the IAM identity of the Kinesis source.",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyGlueRegistryRole"] }),
});

export const clickPipeKinesisSourceSchema = z.object({
	format: z
		.enum(["JSONEachRow", "Avro", "AvroConfluent", "Protobuf"])
		.optional()
		.describe("Format of the Kinesis stream."),
	streamName: z
		.string()
		.optional()
		.describe("Name of the Kinesis stream.")
		.meta({ examples: ["my-stream"] }),
	region: z
		.string()
		.optional()
		.describe("AWS region of the Kinesis stream.")
		.meta({ examples: ["us-east-1"] }),
	useEnhancedFanOut: z.boolean().nullish().describe("Use enhanced fan-out for the Kinesis stream."),
	iteratorType: z
		.enum(["TRIM_HORIZON", "LATEST", "AT_TIMESTAMP"])
		.optional()
		.describe(
			"Type of iterator to use when reading from the Kinesis stream. If AT_TIMESTAMP is used, the timestamp field must be provided.",
		),
	timestamp: z
		.int()
		.nullish()
		.describe(
			"UNIX timestamp to start reading from the Kinesis stream. Required if iteratorType is AT_TIMESTAMP.",
		)
		.meta({ examples: [1615766400] }),
	authentication: z
		.enum(["IAM_ROLE", "IAM_USER"])
		.optional()
		.describe("Authentication method to use with the Kinesis stream."),
	iamRole: z
		.string()
		.nullish()
		.describe("IAM role to use for authentication. Required if IAM_ROLE is used.")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	schemaRegistry: z.union([clickPipeKinesisSchemaRegistrySchema.strict(), z.null()]).optional(),
});

export const clickPipePostKinesisSourceSchema = z.object({
	format: z
		.enum(["JSONEachRow", "Avro", "AvroConfluent", "Protobuf"])
		.optional()
		.describe("Format of the Kinesis stream."),
	streamName: z
		.string()
		.optional()
		.describe("Name of the Kinesis stream.")
		.meta({ examples: ["my-stream"] }),
	region: z
		.string()
		.optional()
		.describe("AWS region of the Kinesis stream.")
		.meta({ examples: ["us-east-1"] }),
	useEnhancedFanOut: z.boolean().nullish().describe("Use enhanced fan-out for the Kinesis stream."),
	iteratorType: z
		.enum(["TRIM_HORIZON", "LATEST", "AT_TIMESTAMP"])
		.optional()
		.describe(
			"Type of iterator to use when reading from the Kinesis stream. If AT_TIMESTAMP is used, the timestamp field must be provided.",
		),
	timestamp: z
		.int()
		.nullish()
		.describe(
			"UNIX timestamp to start reading from the Kinesis stream. Required if iteratorType is AT_TIMESTAMP.",
		)
		.meta({ examples: [1615766400] }),
	authentication: z
		.enum(["IAM_ROLE", "IAM_USER"])
		.optional()
		.describe("Authentication method to use with the Kinesis stream."),
	iamRole: z
		.string()
		.nullish()
		.describe("IAM role to use for authentication. Required if IAM_ROLE is used.")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	schemaRegistry: z.union([clickPipeKinesisSchemaRegistrySchema.strict(), z.null()]).optional(),
	accessKey: z.union([mskIamUserSchema.strict(), z.null()]).optional(),
	protobufSchema: z
		.string()
		.min(1)
		.max(1048576)
		.optional()
		.describe(
			"Base64-encoded .proto source or serialized FileDescriptorSet. Required with Protobuf format unless a schema registry is configured, and not supported with other formats.",
		)
		.meta({ examples: ["c3ludGF4ID0gInByb3RvMyI7IG1lc3NhZ2UgRXZlbnQge30="] }),
});

export const clickPipePatchKinesisSourceSchema = z.object({
	authentication: z
		.enum(["IAM_ROLE", "IAM_USER"])
		.nullish()
		.describe("Authentication method to use with the Kinesis stream."),
	iamRole: z
		.string()
		.nullish()
		.describe("IAM role to use for authentication. Required if IAM_ROLE is used.")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	accessKey: z.union([mskIamUserSchema.strict(), z.null()]).optional(),
});

export const clickPipeObjectStorageSourceSchema = z.object({
	type: z
		.enum(["s3", "gcs", "dospaces", "azureblobstorage", "cloudflarer2", "ovhobjectstorage"])
		.optional()
		.describe("Type of the ObjectStorage source."),
	format: z
		.enum([
			"JSONEachRow",
			"JSONAsObject",
			"CSV",
			"CSVWithNames",
			"TabSeparated",
			"TabSeparatedWithNames",
			"Parquet",
			"Avro",
		])
		.optional()
		.describe("Format of the files."),
	url: z
		.string()
		.optional()
		.describe(
			"Provide a path to the file(s) you want to ingest. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
		)
		.meta({
			examples: ["https://datasets-documentation.s3.eu-west-3.amazonaws.com/http/**.ndjson.gz"],
		}),
	delimiter: z
		.string()
		.nullish()
		.describe("Delimiter used in the files.")
		.meta({ examples: [","] }),
	compression: z
		.enum(["none", "gzip", "gz", "brotli", "br", "xz", "LZMA", "zstd", "auto"])
		.nullish()
		.describe("Compression algorithm used for the files.")
		.meta({ examples: ["auto"] }),
	isContinuous: z
		.boolean()
		.nullish()
		.describe(
			"If set to true, the pipe will continuously read new files from the source. If set to false, the pipe will read the files only once. New files have to be uploaded lexically order.",
		),
	queueUrl: z
		.string()
		.nullish()
		.describe(
			"Queue URL for event-based continuous ingestion. For S3, provide an SQS queue URL. For GCS, provide a Pub/Sub subscription (e.g. projects/{project}/subscriptions/{name}). When provided, files are ingested based on event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
		)
		.meta({ examples: ["https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"] }),
	skipInitialLoad: z
		.boolean()
		.nullish()
		.describe(
			"If set to true, skips the initial load and only ingests files delivered by queue notifications. Only applicable when queueUrl is provided.",
		),
	startAfter: z
		.string()
		.nullish()
		.describe(
			"Skip all files up to and including this object key during the initial load. Cannot be provided when skipInitialLoad is true.",
		)
		.meta({ examples: ["events/2026-06-01/"] }),
	authentication: z
		.enum([
			"IAM_ROLE",
			"IAM_USER",
			"CONNECTION_STRING",
			"SERVICE_ACCOUNT",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.nullish()
		.describe(
			"Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. For GCS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	connectionString: z
		.string()
		.nullish()
		.describe(
			"Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
		)
		.meta({
			examples: [
				"DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
			],
		}),
	path: z
		.string()
		.nullish()
		.describe(
			"Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
		)
		.meta({ examples: ["data/logs/*.json"] }),
	azureContainerName: z
		.string()
		.nullish()
		.describe("Container name for Azure Blob Storage. Required when type is azureblobstorage.")
		.meta({ examples: ["mycontainer"] }),
});

export const clickPipePostObjectStorageSourceSchema = z.object({
	type: z
		.enum(["s3", "gcs", "dospaces", "azureblobstorage", "cloudflarer2", "ovhobjectstorage"])
		.optional()
		.describe("Type of the ObjectStorage source."),
	format: z
		.enum([
			"JSONEachRow",
			"JSONAsObject",
			"CSV",
			"CSVWithNames",
			"TabSeparated",
			"TabSeparatedWithNames",
			"Parquet",
			"Avro",
		])
		.optional()
		.describe("Format of the files."),
	url: z
		.string()
		.optional()
		.describe(
			"Provide a path to the file(s) you want to ingest. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
		)
		.meta({
			examples: ["https://datasets-documentation.s3.eu-west-3.amazonaws.com/http/**.ndjson.gz"],
		}),
	delimiter: z
		.string()
		.nullish()
		.describe("Delimiter used in the files.")
		.meta({ examples: [","] }),
	compression: z
		.enum(["none", "gzip", "gz", "brotli", "br", "xz", "LZMA", "zstd", "auto"])
		.nullish()
		.describe("Compression algorithm used for the files.")
		.meta({ examples: ["auto"] }),
	isContinuous: z
		.boolean()
		.nullish()
		.describe(
			"If set to true, the pipe will continuously read new files from the source. If set to false, the pipe will read the files only once. New files have to be uploaded lexically order.",
		),
	queueUrl: z
		.string()
		.nullish()
		.describe(
			"Queue URL for event-based continuous ingestion. For S3, provide an SQS queue URL. For GCS, provide a Pub/Sub subscription (e.g. projects/{project}/subscriptions/{name}). When provided, files are ingested based on event notifications rather than lexicographical order. Only applicable when isContinuous is true and authentication is not public.",
		)
		.meta({ examples: ["https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue"] }),
	skipInitialLoad: z
		.boolean()
		.nullish()
		.describe(
			"If set to true, skips the initial load and only ingests files delivered by queue notifications. Only applicable when queueUrl is provided.",
		),
	startAfter: z
		.string()
		.nullish()
		.describe(
			"Skip all files up to and including this object key during the initial load. Cannot be provided when skipInitialLoad is true.",
		)
		.meta({ examples: ["events/2026-06-01/"] }),
	authentication: z
		.enum([
			"IAM_ROLE",
			"IAM_USER",
			"CONNECTION_STRING",
			"SERVICE_ACCOUNT",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.nullish()
		.describe(
			"Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. For GCS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	connectionString: z
		.string()
		.nullish()
		.describe(
			"Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
		)
		.meta({
			examples: [
				"DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
			],
		}),
	path: z
		.string()
		.nullish()
		.describe(
			"Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
		)
		.meta({ examples: ["data/logs/*.json"] }),
	azureContainerName: z
		.string()
		.nullish()
		.describe("Container name for Azure Blob Storage. Required when type is azureblobstorage.")
		.meta({ examples: ["mycontainer"] }),
	accessKey: z.union([mskIamUserSchema.strict(), z.null()]).optional(),
	serviceAccountKey: z
		.string()
		.nullish()
		.describe(
			"Base64-encoded GCP service account JSON key. Required when authentication is SERVICE_ACCOUNT.",
		),
});

export const clickPipePatchObjectStorageSourceSchema = z.object({
	skipInitialLoad: z
		.boolean()
		.nullish()
		.describe(
			"If set to true, skips the initial load and only ingests files delivered by queue notifications. Only applicable when queueUrl is provided.",
		),
	startAfter: z
		.string()
		.nullish()
		.describe(
			"Skip all files up to and including this object key during the initial load. Cannot be provided when skipInitialLoad is true.",
		)
		.meta({ examples: ["events/2026-06-01/"] }),
	authentication: z
		.enum([
			"IAM_ROLE",
			"IAM_USER",
			"CONNECTION_STRING",
			"SERVICE_ACCOUNT",
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY",
		])
		.nullish()
		.describe(
			"Authentication method. IAM_USER is for S3, GCS, and DigitalOcean Spaces. IAM_ROLE is for S3 only. SERVICE_ACCOUNT is for GCS only. For GCS, SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources. CONNECTION_STRING is for Azure Blob Storage. PUBLIC uses no authentication.",
		),
	iamRole: z
		.string()
		.nullish()
		.describe(
			"IAM role to be used with IAM role authentication. Read more in ClickPipes documentation: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#authentication",
		)
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyRole"] }),
	connectionString: z
		.string()
		.nullish()
		.describe(
			"Connection string for Azure Blob Storage authentication. Required when authentication is CONNECTION_STRING.",
		)
		.meta({
			examples: [
				"DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;EndpointSuffix=core.windows.net",
			],
		}),
	path: z
		.string()
		.nullish()
		.describe(
			"Path to the file(s) within the Azure container. Used for Azure Blob Storage sources. You can specify multiple files using bash-like wildcards. For more information, see the documentation on using wildcards in path: https://clickhouse.com/docs/en/integrations/clickpipes/object-storage#limitations",
		)
		.meta({ examples: ["data/logs/*.json"] }),
	azureContainerName: z
		.string()
		.nullish()
		.describe("Container name for Azure Blob Storage. Required when type is azureblobstorage.")
		.meta({ examples: ["mycontainer"] }),
	accessKey: z.union([mskIamUserSchema.strict(), z.null()]).optional(),
	serviceAccountKey: z
		.string()
		.nullish()
		.describe(
			"Base64-encoded GCP service account JSON key. Required when authentication is SERVICE_ACCOUNT.",
		),
});

export const clickPipePostgresPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.optional()
		.describe("Interval in seconds to sync data from Postgres during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.optional()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [1000] }),
	publicationName: z
		.string()
		.optional()
		.describe(
			"PostgreSQL publication name to use for CDC replication. If not provided, ClickPipes will create one automatically.",
		)
		.meta({ examples: ["clickpipes_publication"] }),
	replicationMode: z
		.enum(["cdc", "snapshot", "cdc_only"])
		.optional()
		.describe(
			'Replication mode: "cdc" (change data capture with initial snapshot), "snapshot" (one-time snapshot only), or "cdc_only" (CDC without initial snapshot).',
		)
		.meta({ examples: ["cdc"] }),
	replicationSlotName: z
		.string()
		.optional()
		.describe(
			'PostgreSQL replication slot name. Only valid for "cdc_only" mode. For "cdc" mode, ClickPipes creates the slot automatically.',
		)
		.meta({ examples: ["clickpipes_slot"] }),
	allowNullableColumns: z
		.boolean()
		.optional()
		.describe(
			"Preserve nullability from Postgres in the destination ClickHouse table. When true, columns without NOT NULL constraints are created as Nullable(...). When false, all columns are non-nullable and NULL values are replaced with the default value for the type. Note: Nullable types have performance overhead in ClickHouse.",
		)
		.meta({ examples: [false] }),
	initialLoadParallelism: z
		.int()
		.min(1)
		.optional()
		.describe("Number of parallel workers to use per table in the initial snapshot phase.")
		.meta({ examples: [1] }),
	snapshotNumRowsPerPartition: z
		.int()
		.min(1000)
		.optional()
		.describe("Number of rows per partition during the snapshot phase.")
		.meta({ examples: [100000] }),
	snapshotNumberOfParallelTables: z
		.int()
		.min(1)
		.optional()
		.describe("Number of tables to snapshot in parallel during the initial load phase.")
		.meta({ examples: [1] }),
	enableFailoverSlots: z
		.boolean()
		.optional()
		.describe(
			"Enable failover support for the replication slot on PG17 and newer. Only applicable when ClickPipes creates the replication slot (i.e., replicationSlotName is NOT provided).",
		)
		.meta({ examples: [false] }),
	deleteOnMerge: z
		.boolean()
		.optional()
		.describe("Enable hard delete behavior in ReplacingMergeTree for PostgreSQL DELETE operations.")
		.meta({ examples: [false] }),
});

export const clickPipePatchPostgresPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.nullish()
		.describe("Interval in seconds to sync data from Postgres during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.nullish()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [1000] }),
});

export const clickPipePostgresPipeTableMappingSchema = z.object({
	sourceSchemaName: z
		.string()
		.optional()
		.describe("PostgreSQL source schema name.")
		.meta({ examples: ["public"] }),
	sourceTable: z
		.string()
		.optional()
		.describe("PostgreSQL source table name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.optional()
		.describe(
			'ClickHouse target table name, optionally prefixed with schema name (e.g., "my_schema_my_table"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.',
		)
		.meta({ examples: ["public_users"] }),
	excludedColumns: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional()
		.describe(
			"List of column names to exclude from replication. Column names must be unique within this list.",
		)
		.meta({ examples: [["internal_id", "temp_data"]] }),
	useCustomSortingKey: z
		.boolean()
		.optional()
		.describe(
			"Whether to use a custom sorting key. If true, sortingKeys must be provided. If false or omitted, the default sorting key is the PostgreSQL primary key.",
		)
		.meta({ examples: [false] }),
	sortingKeys: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional()
		.describe(
			"Ordered list of column names to use as the sorting (ORDER BY) key in ClickHouse. Only used when useCustomSortingKey is true. Column names must be unique within this list.",
		)
		.meta({ examples: [["created_at_date", "event_id"]] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.optional()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
	partitionKey: z
		.string()
		.optional()
		.describe(
			"Custom partitioning column used for parallel snapshotting. Only beneficial for PostgreSQL 13 (no benefit for PG14+, which supports indexed ctid scans). Must be an indexed column of type: `smallint`, `integer`, `bigint`, `timestamp without time zone`, or `timestamp with time zone`. Unrelated to ClickHouse partitioning.",
		)
		.meta({ examples: ["id"] }),
	partitionByExpr: z
		.string()
		.optional()
		.describe(
			"ClickHouse PARTITION BY expression applied to the destination table when ClickPipes creates it.",
		)
		.meta({ examples: ["toYYYYMM(created_at)"] }),
});

export const clickPipePatchPostgresPipeRemoveTableMappingSchema = z.object({
	sourceSchemaName: z
		.string()
		.nullish()
		.describe("PostgreSQL source schema name.")
		.meta({ examples: ["public"] }),
	sourceTable: z
		.string()
		.nullish()
		.describe("PostgreSQL source table name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.nullish()
		.describe(
			'ClickHouse target table name, optionally prefixed with schema name (e.g., "my_schema_my_table"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.',
		)
		.meta({ examples: ["public_users"] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.nullish()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
	partitionKey: z
		.string()
		.nullish()
		.describe(
			"Custom partitioning column used for parallel snapshotting. Only beneficial for PostgreSQL 13 (no benefit for PG14+, which supports indexed ctid scans). Must be an indexed column of type: `smallint`, `integer`, `bigint`, `timestamp without time zone`, or `timestamp with time zone`. Unrelated to ClickHouse partitioning.",
		)
		.meta({ examples: ["id"] }),
	partitionByExpr: z
		.string()
		.nullish()
		.describe(
			"ClickHouse PARTITION BY expression applied to the destination table when ClickPipes creates it.",
		)
		.meta({ examples: ["toYYYYMM(created_at)"] }),
});

export const clickPipePostgresSourceSchema = z.object({
	type: z
		.enum([
			"postgres",
			"supabase",
			"neon",
			"alloydb",
			"planetscale",
			"rdspostgres",
			"aurorapostgres",
			"cloudsqlpostgres",
			"azurepostgres",
			"crunchybridge",
			"tigerdata",
		])
		.nullish()
		.describe('Type of the Postgres source. Defaults to "postgres" if not specified.'),
	host: z
		.url()
		.optional()
		.describe(
			"PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-postgres-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.optional()
		.describe("PostgreSQL server port.")
		.meta({ examples: [5432] }),
	database: z
		.string()
		.optional()
		.describe("PostgreSQL database name to replicate from.")
		.meta({ examples: ["production_db"] }),
	authentication: z
		.enum(["basic", "IAM_ROLE"])
		.optional()
		.describe("Authentication method for Postgres connection.")
		.meta({ examples: ["IAM_ROLE"] }),
	iamRole: z
		.string()
		.optional()
		.describe("IAM role ARN for IAM authentication (required for IAM_ROLE authentication).")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyApplicationRole"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-postgres-server.example.com"] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the Postgres server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.optional()
		.describe(
			"Disable TLS for the Postgres connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the Postgres connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	settings: clickPipePostgresPipeSettingsSchema.optional(),
	tableMappings: z
		.array(clickPipePostgresPipeTableMappingSchema)
		.optional()
		.describe(
			"List of table mappings defining which PostgreSQL tables to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipeMutatePostgresSourceSchema = z.object({
	type: z
		.enum([
			"postgres",
			"supabase",
			"neon",
			"alloydb",
			"planetscale",
			"rdspostgres",
			"aurorapostgres",
			"cloudsqlpostgres",
			"azurepostgres",
			"crunchybridge",
			"tigerdata",
		])
		.nullish()
		.describe('Type of the Postgres source. Defaults to "postgres" if not specified.'),
	credentials: PLAINSchema.optional(),
	host: z
		.url()
		.optional()
		.describe(
			"PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-postgres-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.optional()
		.describe("PostgreSQL server port.")
		.meta({ examples: [5432] }),
	database: z
		.string()
		.optional()
		.describe("PostgreSQL database name to replicate from.")
		.meta({ examples: ["production_db"] }),
	settings: clickPipePostgresPipeSettingsSchema.optional(),
	authentication: z
		.enum(["basic", "IAM_ROLE"])
		.optional()
		.describe("Authentication method for Postgres connection.")
		.meta({ examples: ["IAM_ROLE"] }),
	iamRole: z
		.string()
		.optional()
		.describe("IAM role ARN for IAM authentication (required for IAM_ROLE authentication).")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyApplicationRole"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-postgres-server.example.com"] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the Postgres server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.optional()
		.default(false)
		.describe(
			"Disable TLS for the Postgres connection. Use with caution in production environments. Defaults to false when omitted.",
		)
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the Postgres connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	tableMappings: z
		.array(clickPipePostgresPipeTableMappingSchema)
		.optional()
		.describe(
			"List of table mappings defining which PostgreSQL tables to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipePatchPostgresSourceSchema = z.object({
	credentials: PLAINSchema.optional(),
	host: z
		.url()
		.nullish()
		.describe(
			"PostgreSQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-postgres-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.nullish()
		.describe("PostgreSQL server port.")
		.meta({ examples: [5432] }),
	database: z
		.string()
		.nullish()
		.describe("PostgreSQL database name to replicate from.")
		.meta({ examples: ["production_db"] }),
	tlsHost: z
		.string()
		.nullish()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-postgres-server.example.com"] }),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificate to validate the Postgres server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.nullish()
		.describe(
			"Disable TLS for the Postgres connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.nullish()
		.describe(
			"Skip TLS certificate verification for the Postgres connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	settings: clickPipePatchPostgresPipeSettingsSchema.optional(),
	tableMappingsToAdd: z
		.array(clickPipePostgresPipeTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Table mappings to add to the pipe. Can be an empty array if no tables are being added.",
		),
	tableMappingsToRemove: z
		.array(clickPipePatchPostgresPipeRemoveTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Table mappings to remove from the pipe. Only sourceSchemaName, sourceTable, and targetTable are required for removal.",
		),
});

export const clickPipeMySQLPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.optional()
		.describe("Interval in seconds to sync data from MySQL during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.optional()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [1000] }),
	replicationMode: z
		.enum(["cdc", "snapshot", "cdc_only"])
		.describe(
			'Replication mode: "cdc" (change data capture with initial snapshot), "snapshot" (one-time snapshot only), or "cdc_only" (CDC without initial snapshot).',
		)
		.meta({ examples: ["cdc"] }),
	replicationMechanism: z
		.enum(["GTID", "FILE_POS"])
		.optional()
		.describe(
			'MySQL replication mechanism: "GTID" (Global Transaction Identifier) or "FILE_POS" (binary log file and position). Defaults to "GTID" if not specified. MariaDB supports "GTID" only. For "FILE_POS" on MySQL, contact support.',
		)
		.meta({ examples: ["GTID"] }),
	useCompression: z
		.boolean()
		.optional()
		.describe("Enable compression for the MySQL connection.")
		.meta({ examples: [false] }),
	allowNullableColumns: z
		.boolean()
		.optional()
		.describe(
			"Preserve nullability from MySQL in the destination ClickHouse table. When true, columns without NOT NULL constraints are created as Nullable(...). When false, all columns are non-nullable and NULL values are replaced with the default value for the type. Note: Nullable types have performance overhead in ClickHouse.",
		)
		.meta({ examples: [false] }),
	initialLoadParallelism: z
		.int()
		.min(1)
		.optional()
		.describe("Number of parallel workers to use per table in the initial snapshot phase.")
		.meta({ examples: [1] }),
	snapshotNumRowsPerPartition: z
		.int()
		.min(1000)
		.optional()
		.describe("Number of rows per partition during the snapshot phase.")
		.meta({ examples: [100000] }),
	snapshotNumberOfParallelTables: z
		.int()
		.min(1)
		.optional()
		.describe("Number of tables to snapshot in parallel during the initial load phase.")
		.meta({ examples: [1] }),
	deleteOnMerge: z
		.boolean()
		.optional()
		.describe("Enable hard delete behavior in ReplacingMergeTree for MySQL DELETE operations.")
		.meta({ examples: [false] }),
});

export const clickPipePatchMySQLPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.nullish()
		.describe("Interval in seconds to sync data from MySQL during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.nullish()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [1000] }),
	useCompression: z
		.boolean()
		.nullish()
		.describe("Enable compression for the MySQL connection.")
		.meta({ examples: [false] }),
});

export const clickPipeMySQLPipeTableMappingSchema = z.object({
	sourceSchemaName: z
		.string()
		.describe("MySQL source database name.")
		.meta({ examples: ["my_database"] }),
	sourceTable: z
		.string()
		.describe("MySQL source table name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.describe(
			'ClickHouse target table name, optionally prefixed with schema name (e.g., "my_database_my_table"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.',
		)
		.meta({ examples: ["my_database_users"] }),
	excludedColumns: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional()
		.describe(
			"List of column names to exclude from replication. Column names must be unique within this list.",
		)
		.meta({ examples: [["internal_id", "temp_data"]] }),
	useCustomSortingKey: z
		.boolean()
		.optional()
		.describe(
			"Whether to use a custom sorting key. If true, sortingKeys must be provided. If false or omitted, the default sorting key is the MySQL primary key.",
		)
		.meta({ examples: [false] }),
	sortingKeys: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "Array entries must be unique",
		})
		.optional()
		.describe(
			"Ordered list of column names to use as the sorting (ORDER BY) key in ClickHouse. Only used when useCustomSortingKey is true. Column names must be unique within this list.",
		)
		.meta({ examples: [["created_at_date", "event_id"]] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.optional()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
	partitionKey: z
		.string()
		.optional()
		.describe(
			"Custom partitioning column used for parallel snapshotting. Must be an indexed column of an integer, date, datetime or timestamp type. Unrelated to ClickHouse partitioning.",
		)
		.meta({ examples: ["id"] }),
	partitionByExpr: z
		.string()
		.optional()
		.describe(
			"ClickHouse PARTITION BY expression applied to the destination table when ClickPipes creates it.",
		)
		.meta({ examples: ["toYYYYMM(created_at)"] }),
});

export const clickPipePatchMySQLPipeRemoveTableMappingSchema = z.object({
	sourceSchemaName: z
		.string()
		.nullable()
		.describe("MySQL source database name.")
		.meta({ examples: ["my_database"] }),
	sourceTable: z
		.string()
		.nullable()
		.describe("MySQL source table name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.nullable()
		.describe(
			'ClickHouse target table name, optionally prefixed with schema name (e.g., "my_database_my_table"). The table will be created automatically if it does not exist. For snapshot mode, the target table must be empty.',
		)
		.meta({ examples: ["my_database_users"] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.nullish()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
	partitionKey: z
		.string()
		.nullish()
		.describe(
			"Custom partitioning column used for parallel snapshotting. Must be an indexed column of an integer, date, datetime or timestamp type. Unrelated to ClickHouse partitioning.",
		)
		.meta({ examples: ["id"] }),
	partitionByExpr: z
		.string()
		.nullish()
		.describe(
			"ClickHouse PARTITION BY expression applied to the destination table when ClickPipes creates it.",
		)
		.meta({ examples: ["toYYYYMM(created_at)"] }),
});

export const clickPipeMySQLSourceSchema = z.object({
	type: z
		.enum(["mysql", "rdsmysql", "auroramysql", "mariadb", "rdsmariadb"])
		.nullish()
		.describe('Type of the MySQL source. Defaults to "mysql" if not specified.'),
	host: z
		.url()
		.describe(
			"MySQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-mysql-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.describe("MySQL server port.")
		.meta({ examples: [3306] }),
	authentication: z
		.enum(["basic", "IAM_ROLE"])
		.optional()
		.describe("Authentication method for MySQL connection.")
		.meta({ examples: ["basic"] }),
	iamRole: z
		.string()
		.optional()
		.describe("IAM role ARN for IAM authentication (required for IAM_ROLE authentication).")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyApplicationRole"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-mysql-server.example.com"] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the MySQL server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.optional()
		.describe("Disable TLS for the MySQL connection. Use with caution in production environments.")
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the MySQL connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	serverId: z
		.int()
		.min(1)
		.max(4294967295)
		.optional()
		.describe(
			"Optional MySQL server_id the pipe declares itself as in the MySQL replication topology. Must be unique across replicas connected to the source. If omitted, one is assigned automatically.",
		)
		.meta({ examples: [4242] }),
	settings: clickPipeMySQLPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeMySQLPipeTableMappingSchema)
		.describe(
			"List of table mappings defining which MySQL tables to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipeMutateMySQLSourceSchema = z.object({
	type: z
		.enum(["mysql", "rdsmysql", "auroramysql", "mariadb", "rdsmariadb"])
		.nullish()
		.describe('Type of the MySQL source. Defaults to "mysql" if not specified.'),
	credentials: PLAINSchema.optional(),
	host: z
		.url()
		.describe(
			"MySQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-mysql-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.describe("MySQL server port.")
		.meta({ examples: [3306] }),
	settings: clickPipeMySQLPipeSettingsSchema,
	authentication: z
		.enum(["basic", "IAM_ROLE"])
		.optional()
		.describe("Authentication method for MySQL connection.")
		.meta({ examples: ["basic"] }),
	iamRole: z
		.string()
		.optional()
		.describe("IAM role ARN for IAM authentication (required for IAM_ROLE authentication).")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyApplicationRole"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-mysql-server.example.com"] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the MySQL server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.optional()
		.default(false)
		.describe(
			"Disable TLS for the MySQL connection. Use with caution in production environments. Defaults to false when omitted.",
		)
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the MySQL connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	serverId: z
		.int()
		.min(1)
		.max(4294967295)
		.optional()
		.describe(
			"Optional MySQL server_id the pipe declares itself as in the MySQL replication topology. Must be unique across replicas connected to the source. If omitted, one is assigned automatically.",
		)
		.meta({ examples: [4242] }),
	tableMappings: z
		.array(clickPipeMySQLPipeTableMappingSchema)
		.describe(
			"List of table mappings defining which MySQL tables to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipePatchMySQLSourceSchema = z.object({
	credentials: PLAINSchema.optional(),
	host: z
		.url()
		.nullable()
		.describe(
			"MySQL server hostname or IP address. To use a reverse private endpoint, pass the endpoint hostname here.",
		)
		.meta({ examples: ["my-mysql-server.example.com"] }),
	port: z
		.int()
		.min(1)
		.max(65535)
		.nullable()
		.describe("MySQL server port.")
		.meta({ examples: [3306] }),
	authentication: z
		.enum(["basic", "IAM_ROLE"])
		.nullish()
		.describe("Authentication method for MySQL connection.")
		.meta({ examples: ["basic"] }),
	iamRole: z
		.string()
		.nullish()
		.describe("IAM role ARN for IAM authentication (required for IAM_ROLE authentication).")
		.meta({ examples: ["arn:aws:iam::123456789012:role/MyApplicationRole"] }),
	tlsHost: z
		.string()
		.nullish()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["my-mysql-server.example.com"] }),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificate to validate the MySQL server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	disableTls: z
		.boolean()
		.nullish()
		.describe("Disable TLS for the MySQL connection. Use with caution in production environments.")
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.nullish()
		.describe(
			"Skip TLS certificate verification for the MySQL connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	serverId: z
		.int()
		.min(1)
		.max(4294967295)
		.nullish()
		.describe(
			"Optional MySQL server_id the pipe declares itself as in the MySQL replication topology. Must be unique across replicas connected to the source. If omitted, one is assigned automatically.",
		)
		.meta({ examples: [4242] }),
	settings: clickPipePatchMySQLPipeSettingsSchema.optional(),
	tableMappingsToAdd: z
		.array(clickPipeMySQLPipeTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Table mappings to add to the pipe. Can be an empty array if no tables are being added.",
		),
	tableMappingsToRemove: z
		.array(clickPipePatchMySQLPipeRemoveTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Table mappings to remove from the pipe. Only sourceSchemaName, sourceTable, and targetTable are required for removal.",
		),
});

export const clickPipeBigQueryPipeSettingsSchema = z.object({
	replicationMode: z
		.enum(["snapshot"])
		.describe("Replication mode. BigQuery only supports snapshot mode."),
	allowNullableColumns: z
		.boolean()
		.optional()
		.describe("Allow nullable columns in the destination table."),
	initialLoadParallelism: z
		.number()
		.optional()
		.describe("Number of parallel workers during initial load."),
	snapshotNumRowsPerPartition: z
		.number()
		.optional()
		.describe("Number of rows to snapshot per partition."),
	snapshotNumberOfParallelTables: z
		.number()
		.optional()
		.describe("Number of parallel tables to snapshot."),
});

export const clickPipeBigQueryPipeTableMappingSchema = z.object({
	sourceDatasetName: z.string().describe("Source BigQuery dataset name."),
	sourceTable: z.string().describe("Source table name."),
	targetTable: z.string().describe("Target ClickHouse table name."),
	excludedColumns: z
		.array(z.string())
		.optional()
		.describe("Columns to exclude from the target table."),
	useCustomSortingKey: z
		.boolean()
		.optional()
		.describe("Whether to use a custom sorting key for the target table."),
	sortingKeys: z
		.array(z.string())
		.optional()
		.describe("Ordered list of columns to use as sorting key for the target table."),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.optional()
		.describe("Table engine to use for the target table."),
});

export const clickPipeBigQueryServiceAccountSourceSchema = z.object({
	snapshotStagingPath: z
		.string()
		.describe(
			"GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
		),
	settings: clickPipeBigQueryPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeBigQueryPipeTableMappingSchema)
		.describe("Table mappings for BigQuery pipe."),
	authentication: z
		.enum(["SERVICE_ACCOUNT"])
		.describe("Authenticated with a Google Cloud service account JSON key."),
	projectId: z
		.string()
		.optional()
		.describe("GCP project ID that owns the BigQuery resources.")
		.meta({ examples: ["my-gcp-project"] }),
});

export const clickPipeBigQueryWorkloadIdentitySourceSchema = z.object({
	snapshotStagingPath: z
		.string()
		.describe(
			"GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
		),
	settings: clickPipeBigQueryPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeBigQueryPipeTableMappingSchema)
		.describe("Table mappings for BigQuery pipe."),
	authentication: z
		.enum(["SERVICE_ACCOUNT_WORKLOAD_IDENTITY"])
		.describe(
			"Authenticated with the ClickPipes service tenant identity. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources.",
		),
	projectId: z
		.string()
		.optional()
		.describe(
			"GCP project ID that owns the BigQuery resources. Older pipes created outside OpenAPI may omit this field.",
		)
		.meta({ examples: ["my-gcp-project"] }),
});

export const clickPipeBigQuerySourceSchema = z.discriminatedUnion("authentication", [
	clickPipeBigQueryServiceAccountSourceSchema.strict(),
	clickPipeBigQueryWorkloadIdentitySourceSchema.strict(),
]);

export const clickPipePostBigQueryServiceAccountSourceSchema = z.strictObject({
	snapshotStagingPath: z
		.string()
		.describe(
			"GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
		),
	settings: clickPipeBigQueryPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeBigQueryPipeTableMappingSchema)
		.describe("Table mappings for BigQuery pipe."),
	authentication: z
		.enum(["SERVICE_ACCOUNT"])
		.optional()
		.describe(
			"Authenticate with a Google Cloud service account JSON key. Defaults to SERVICE_ACCOUNT when omitted.",
		),
	projectId: z
		.string()
		.optional()
		.describe("GCP project ID that owns the BigQuery resources.")
		.meta({ examples: ["my-gcp-project"] }),
	credentials: serviceAccountSchema,
});

export const clickPipePostBigQueryWorkloadIdentitySourceSchema = z.strictObject({
	snapshotStagingPath: z
		.string()
		.describe(
			"GCS bucket path for staging snapshot data (e.g., gs://my-bucket/staging/). Data will be automatically cleaned up after initial load.",
		),
	settings: clickPipeBigQueryPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeBigQueryPipeTableMappingSchema)
		.describe("Table mappings for BigQuery pipe."),
	authentication: z
		.enum(["SERVICE_ACCOUNT_WORKLOAD_IDENTITY"])
		.describe(
			"Authenticate with the ClickPipes service tenant identity. Customer credentials must not be provided. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources.",
		)
		.meta({ examples: ["SERVICE_ACCOUNT_WORKLOAD_IDENTITY"] }),
	projectId: z
		.string()
		.describe("GCP project ID that owns the BigQuery resources.")
		.meta({ examples: ["my-gcp-project"] }),
});

export const clickPipeMutateBigQuerySourceSchema = z.discriminatedUnion("authentication", [
	clickPipePostBigQueryServiceAccountSourceSchema.strict(),
	clickPipePostBigQueryWorkloadIdentitySourceSchema.strict(),
]);

export const clickPipeMongoDBPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.optional()
		.describe("Interval in seconds to sync data from MongoDB during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.optional()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [100000] }),
	replicationMode: z
		.enum(["cdc", "snapshot", "cdc_only"])
		.describe(
			'Replication mode: "cdc" (change data capture with initial snapshot), "snapshot" (one-time snapshot only), or "cdc_only" (CDC without initial snapshot).',
		)
		.meta({ examples: ["cdc"] }),
	initialLoadParallelism: z
		.int()
		.min(1)
		.optional()
		.describe("Number of parallel workers to use per collection in the initial snapshot phase.")
		.meta({ examples: [1] }),
	snapshotNumRowsPerPartition: z
		.int()
		.min(1000)
		.optional()
		.describe("Number of rows per partition during the snapshot phase.")
		.meta({ examples: [100000] }),
	snapshotNumberOfParallelTables: z
		.int()
		.min(1)
		.optional()
		.describe("Number of collections to snapshot in parallel during the initial load phase.")
		.meta({ examples: [1] }),
	deleteOnMerge: z
		.boolean()
		.optional()
		.describe("Enable hard delete behavior in ReplacingMergeTree for MongoDB DELETE operations.")
		.meta({ examples: [false] }),
	useJsonNativeFormat: z
		.boolean()
		.optional()
		.describe(
			"Store JSON values in native ClickHouse JSON format. When disabled, JSON data is stored as String.",
		)
		.meta({ examples: [true] }),
});

export const clickPipePatchMongoDBPipeSettingsSchema = z.object({
	syncIntervalSeconds: z
		.int()
		.min(1)
		.nullish()
		.describe("Interval in seconds to sync data from MongoDB during CDC replication.")
		.meta({ examples: [60] }),
	pullBatchSize: z
		.int()
		.min(1)
		.nullish()
		.describe("Number of rows to pull in each batch during CDC replication.")
		.meta({ examples: [100000] }),
});

export const clickPipeMongoDBPipeTableMappingSchema = z.object({
	sourceDatabaseName: z
		.string()
		.describe("MongoDB source database name.")
		.meta({ examples: ["mydb"] }),
	sourceCollection: z
		.string()
		.describe("MongoDB source collection name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.describe(
			"ClickHouse target table name. The table will be created automatically if it does not exist.",
		)
		.meta({ examples: ["mydb_users"] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.optional()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
});

export const clickPipePatchMongoDBPipeRemoveTableMappingSchema = z.object({
	sourceDatabaseName: z
		.string()
		.nullable()
		.describe("MongoDB source database name.")
		.meta({ examples: ["mydb"] }),
	sourceCollection: z
		.string()
		.nullable()
		.describe("MongoDB source collection name.")
		.meta({ examples: ["users"] }),
	targetTable: z
		.string()
		.nullable()
		.describe(
			"ClickHouse target table name. The table will be created automatically if it does not exist.",
		)
		.meta({ examples: ["mydb_users"] }),
	tableEngine: z
		.enum(["MergeTree", "ReplacingMergeTree", "Null"])
		.nullish()
		.describe(
			'ClickHouse table engine: "ReplacingMergeTree" (handles updates/deletes), "MergeTree" (append-only), or "Null" (forward data to materialized views without storing it).',
		)
		.meta({ examples: ["ReplacingMergeTree"] }),
});

export const clickPipeMongoDBSourceSchema = z.object({
	uri: z
		.string()
		.describe(
			"MongoDB connection URI. Supports both standard URIs (mongodb://...) and SRV URIs (mongodb+srv://...). Embedded credentials are redacted from API responses, so the returned value can differ from what was submitted.",
		)
		.meta({ examples: ["mongodb+srv://cluster0.example.mongodb.net/mydb"] }),
	readPreference: z
		.enum(["primary", "primaryPreferred", "secondary", "secondaryPreferred", "nearest"])
		.describe("MongoDB read preference for replica set reads.")
		.meta({ examples: ["secondaryPreferred"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["cluster0.example.mongodb.net"] }),
	disableTls: z
		.boolean()
		.optional()
		.describe("Disable TLS for the MongoDB connection. Defaults to false (TLS enabled).")
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the MongoDB connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the MongoDB server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	settings: clickPipeMongoDBPipeSettingsSchema.optional(),
	tableMappings: z
		.array(clickPipeMongoDBPipeTableMappingSchema)
		.optional()
		.describe(
			"List of collection mappings defining which MongoDB collections to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipeMutateMongoDBSourceSchema = z.object({
	credentials: PLAINSchema.optional(),
	uri: z
		.string()
		.describe(
			"MongoDB connection URI. Supports both standard URIs (mongodb://...) and SRV URIs (mongodb+srv://...). Embedded credentials are redacted from API responses, so the returned value can differ from what was submitted.",
		)
		.meta({ examples: ["mongodb+srv://cluster0.example.mongodb.net/mydb"] }),
	readPreference: z
		.enum(["primary", "primaryPreferred", "secondary", "secondaryPreferred", "nearest"])
		.describe("MongoDB read preference for replica set reads.")
		.meta({ examples: ["secondaryPreferred"] }),
	tlsHost: z
		.string()
		.optional()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["cluster0.example.mongodb.net"] }),
	disableTls: z
		.boolean()
		.optional()
		.default(false)
		.describe("Disable TLS for the MongoDB connection. Defaults to false (TLS enabled).")
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.optional()
		.describe(
			"Skip TLS certificate verification for the MongoDB connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	caCertificate: z
		.string()
		.optional()
		.describe("PEM encoded CA certificate to validate the MongoDB server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	settings: clickPipeMongoDBPipeSettingsSchema,
	tableMappings: z
		.array(clickPipeMongoDBPipeTableMappingSchema)
		.describe(
			"List of collection mappings defining which MongoDB collections to replicate and how they map to ClickHouse tables.",
		),
});

export const clickPipePatchMongoDBSourceSchema = z.object({
	credentials: PLAINSchema.optional(),
	uri: z
		.string()
		.nullable()
		.describe(
			"MongoDB connection URI (mongodb:// or mongodb+srv://). Credentials are redacted in responses; a masked value is never saved as a credential, so a real credential equal to [REDACTED] cannot be set. To change the connection, send the full URI with real credentials; omit this field or resend the redacted value to leave it unchanged.",
		)
		.meta({ examples: ["mongodb+srv://cluster0.example.mongodb.net/mydb"] }),
	readPreference: z
		.enum(["primary", "primaryPreferred", "secondary", "secondaryPreferred", "nearest"])
		.nullable()
		.describe("MongoDB read preference for replica set reads.")
		.meta({ examples: ["secondaryPreferred"] }),
	tlsHost: z
		.string()
		.nullish()
		.describe("TLS/SSL host for secure connections.")
		.meta({ examples: ["cluster0.example.mongodb.net"] }),
	disableTls: z
		.boolean()
		.nullish()
		.describe("Disable TLS for the MongoDB connection. Defaults to false (TLS enabled).")
		.meta({ examples: [false] }),
	skipCertVerification: z
		.boolean()
		.nullish()
		.describe(
			"Skip TLS certificate verification for the MongoDB connection. Use with caution in production environments.",
		)
		.meta({ examples: [false] }),
	caCertificate: z
		.string()
		.nullish()
		.describe("PEM encoded CA certificate to validate the MongoDB server certificate.")
		.meta({ examples: ["-----BEGIN CERTIFICATE-----\n..."] }),
	settings: clickPipePatchMongoDBPipeSettingsSchema.optional(),
	tableMappingsToAdd: z
		.array(clickPipeMongoDBPipeTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Collection mappings to add to the pipe. Can be an empty array if no collections are being added.",
		),
	tableMappingsToRemove: z
		.array(clickPipePatchMongoDBPipeRemoveTableMappingSchema)
		.min(0)
		.optional()
		.describe(
			"Collection mappings to remove from the pipe. Only sourceDatabaseName, sourceCollection, and targetTable are required for removal.",
		),
});

export const clickPipePubSubSourceSchema = z.object({
	format: z
		.enum(["JSONEachRow", "Avro", "Protobuf"])
		.describe(
			"Format of messages in the Pub/Sub topic. GCP Pub/Sub ClickPipes are in limited preview — contact support to enable this feature for your organization.",
		)
		.meta({ examples: ["JSONEachRow"] }),
	projectId: z
		.string()
		.describe("GCP project ID that owns the Pub/Sub topic.")
		.meta({ examples: ["my-gcp-project"] }),
	topic: z
		.string()
		.describe("Pub/Sub topic name (not the fully-qualified path).")
		.meta({ examples: ["my-topic"] }),
	authentication: z
		.enum(["SERVICE_ACCOUNT", "SERVICE_ACCOUNT_WORKLOAD_IDENTITY"])
		.describe(
			"Authentication method to use with GCP Pub/Sub. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources.",
		)
		.meta({ examples: ["SERVICE_ACCOUNT"] }),
	seekType: z
		.enum(["latest", "earliest", "timestamp"])
		.describe(
			'Starting position strategy for consuming the subscription. The seekTimestamp companion is required only when seekType is "timestamp"; setting it for a mismatched seek type is rejected.',
		)
		.meta({ examples: ["earliest"] }),
	seekTimestamp: z.iso
		.datetime()
		.nullish()
		.describe(
			'RFC 3339 / ISO 8601 timestamp to seek to. Required when seekType is "timestamp"; must be omitted otherwise.',
		)
		.meta({ examples: ["2026-04-10T12:00:00Z"] }),
	filter: z
		.string()
		.max(256)
		.nullish()
		.describe("Optional Pub/Sub subscription filter expression (CEL). Maximum 256 characters."),
	enableOrdering: z
		.boolean()
		.nullish()
		.describe(
			"Whether to enable ordered delivery of messages (requires messages to be published with ordering keys).",
		),
	ackDeadline: z
		.int()
		.min(10)
		.max(600)
		.nullish()
		.describe("Acknowledgement deadline for messages, in seconds. Must be between 10 and 600."),
});

export const clickPipePostPubSubServiceAccountSourceSchema = z.strictObject({
	format: z
		.enum(["JSONEachRow", "Avro", "Protobuf"])
		.describe(
			"Format of messages in the Pub/Sub topic. GCP Pub/Sub ClickPipes are in limited preview — contact support to enable this feature for your organization.",
		)
		.meta({ examples: ["JSONEachRow"] }),
	projectId: z
		.string()
		.describe("GCP project ID that owns the Pub/Sub topic.")
		.meta({ examples: ["my-gcp-project"] }),
	topic: z
		.string()
		.describe("Pub/Sub topic name (not the fully-qualified path).")
		.meta({ examples: ["my-topic"] }),
	authentication: z
		.enum(["SERVICE_ACCOUNT"])
		.describe("Authenticate with a GCP service account JSON key.")
		.meta({ examples: ["SERVICE_ACCOUNT"] }),
	seekType: z
		.enum(["latest", "earliest", "timestamp"])
		.describe(
			'Starting position strategy for consuming the subscription. The seekTimestamp companion is required only when seekType is "timestamp"; setting it for a mismatched seek type is rejected.',
		)
		.meta({ examples: ["earliest"] }),
	seekTimestamp: z.iso
		.datetime()
		.nullish()
		.describe(
			'RFC 3339 / ISO 8601 timestamp to seek to. Required when seekType is "timestamp"; must be omitted otherwise.',
		)
		.meta({ examples: ["2026-04-10T12:00:00Z"] }),
	filter: z
		.string()
		.max(256)
		.nullish()
		.describe("Optional Pub/Sub subscription filter expression (CEL). Maximum 256 characters."),
	enableOrdering: z
		.boolean()
		.nullish()
		.describe(
			"Whether to enable ordered delivery of messages (requires messages to be published with ordering keys).",
		),
	ackDeadline: z
		.int()
		.min(10)
		.max(600)
		.nullish()
		.describe("Acknowledgement deadline for messages, in seconds. Must be between 10 and 600."),
	serviceAccountKey: serviceAccountSchema,
});

export const clickPipePostPubSubWorkloadIdentitySourceSchema = z.strictObject({
	format: z
		.enum(["JSONEachRow", "Avro", "Protobuf"])
		.describe(
			"Format of messages in the Pub/Sub topic. GCP Pub/Sub ClickPipes are in limited preview — contact support to enable this feature for your organization.",
		)
		.meta({ examples: ["JSONEachRow"] }),
	projectId: z
		.string()
		.describe("GCP project ID that owns the Pub/Sub topic.")
		.meta({ examples: ["my-gcp-project"] }),
	topic: z
		.string()
		.describe("Pub/Sub topic name (not the fully-qualified path).")
		.meta({ examples: ["my-topic"] }),
	authentication: z
		.enum(["SERVICE_ACCOUNT_WORKLOAD_IDENTITY"])
		.describe(
			"SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources.",
		)
		.meta({ examples: ["SERVICE_ACCOUNT_WORKLOAD_IDENTITY"] }),
	seekType: z
		.enum(["latest", "earliest", "timestamp"])
		.describe(
			'Starting position strategy for consuming the subscription. The seekTimestamp companion is required only when seekType is "timestamp"; setting it for a mismatched seek type is rejected.',
		)
		.meta({ examples: ["earliest"] }),
	seekTimestamp: z.iso
		.datetime()
		.nullish()
		.describe(
			'RFC 3339 / ISO 8601 timestamp to seek to. Required when seekType is "timestamp"; must be omitted otherwise.',
		)
		.meta({ examples: ["2026-04-10T12:00:00Z"] }),
	filter: z
		.string()
		.max(256)
		.nullish()
		.describe("Optional Pub/Sub subscription filter expression (CEL). Maximum 256 characters."),
	enableOrdering: z
		.boolean()
		.nullish()
		.describe(
			"Whether to enable ordered delivery of messages (requires messages to be published with ordering keys).",
		),
	ackDeadline: z
		.int()
		.min(10)
		.max(600)
		.nullish()
		.describe("Acknowledgement deadline for messages, in seconds. Must be between 10 and 600."),
});

export const clickPipePostPubSubSourceSchema = z.discriminatedUnion("authentication", [
	clickPipePostPubSubServiceAccountSourceSchema.strict(),
	clickPipePostPubSubWorkloadIdentitySourceSchema.strict(),
]);

export const clickPipePatchPubSubSourceSchema = z.object({
	authentication: z
		.enum(["SERVICE_ACCOUNT", "SERVICE_ACCOUNT_WORKLOAD_IDENTITY"])
		.nullable()
		.describe(
			"Authentication method to use with GCP Pub/Sub. SERVICE_ACCOUNT_WORKLOAD_IDENTITY is in Private Preview. ClickPipes uses the GCP service account returned in gcpWorkloadIdentity.principal by the operation with operationId clickPipesServiceContextGet; grant it access to the source resources.",
		)
		.meta({ examples: ["SERVICE_ACCOUNT"] }),
	ackDeadline: z
		.int()
		.min(10)
		.max(600)
		.nullish()
		.describe("Acknowledgement deadline for messages, in seconds. Must be between 10 and 600."),
	serviceAccountKey: z.union([serviceAccountSchema.strict(), z.null()]).optional(),
});

export const clickPipesGcpWorkloadIdentityContextSchema = z.object({
	supported: z
		.boolean()
		.optional()
		.describe(
			"Whether the ClickPipes deployment supports GCP workload identity, which is in Private Preview. The principal field identifies the GCP service account used for source access.",
		),
	ready: z
		.boolean()
		.nullish()
		.describe("Whether the service tenant identity is ready for workload identity authentication."),
	principal: z
		.string()
		.nullish()
		.describe(
			"GCP service account used by ClickPipes for workload identity authentication. Grant this service account access to customer source resources.",
		)
		.meta({ examples: ["ch-deadbeef@clickpipes-development.iam.gserviceaccount.com"] }),
});

export const clickPipesServiceContextSchema = z.object({
	gcpWorkloadIdentity: clickPipesGcpWorkloadIdentityContextSchema.optional(),
});

export const clickPipeScalingSchema = z.object({
	replicas: z
		.int()
		.min(1)
		.max(40)
		.optional()
		.describe("Desired number of replicas. Only for scalable pipes."),
	concurrency: z
		.int()
		.optional()
		.describe(
			"Desired number of concurrency. Only for S3 pipes. If set to 0, concurrency is auto-scaled based on the cluster memory.",
		),
	replicaCpuMillicores: z
		.int()
		.min(125)
		.max(2000)
		.optional()
		.describe("CPU in millicores for each replica. Only for streaming pipes."),
	replicaMemoryGb: z
		.number()
		.min(0.5)
		.max(8)
		.optional()
		.describe("Memory in GB for each replica. Only for streaming pipes."),
});

export const clickPipeSourceSchema = z.object({
	kafka: z.union([clickPipeKafkaSourceSchema.strict(), z.null()]).optional(),
	objectStorage: z.union([clickPipeObjectStorageSourceSchema.strict(), z.null()]).optional(),
	kinesis: z.union([clickPipeKinesisSourceSchema.strict(), z.null()]).optional(),
	pubsub: z.union([clickPipePubSubSourceSchema.strict(), z.null()]).optional(),
	postgres: z.union([clickPipePostgresSourceSchema.strict(), z.null()]).optional(),
	mysql: z.union([clickPipeMySQLSourceSchema.strict(), z.null()]).optional(),
	bigquery: z.union([clickPipeBigQuerySourceSchema, z.null()]).optional(),
	mongodb: z.union([clickPipeMongoDBSourceSchema.strict(), z.null()]).optional(),
});

export const clickPipeDestinationColumnSchema = z.object({
	name: z.string().optional().describe("Name of the column."),
	type: z.string().optional().describe("Type of the column."),
});

export const clickPipeDestinationTableEngineSchema = z.object({
	type: z
		.enum(["MergeTree", "ReplacingMergeTree", "SummingMergeTree", "Null"])
		.optional()
		.describe("Engine type of the destination table."),
	versionColumnId: z
		.string()
		.nullish()
		.describe("Column name to use as version for ReplacingMergeTree engine."),
	columnIds: z
		.array(z.string())
		.optional()
		.describe("Column names to sum for SummingMergeTree engine."),
});

export const clickPipeDestinationTableDefinitionSchema = z.object({
	engine: clickPipeDestinationTableEngineSchema.optional(),
	sortingKey: z
		.array(z.string())
		.optional()
		.describe(
			"Sorting key of the destination table. An entry that matches the name of a column declared in `columns` is used as that column. Any other entry is used as a SQL expression, for example a JSON sub-path such as `payload.workspace_id`. Entries must not contain commas, and every component must be non-Nullable.",
		),
	partitionBy: z.string().optional().describe("Partition key SQL expression."),
	primaryKey: z.string().optional().describe("Primary key of SQL expression."),
	ttl: z
		.string()
		.min(1)
		.optional()
		.describe("TTL SQL expression of the destination table.")
		.meta({ examples: ["toDateTime(event_time) + INTERVAL 30 DAY"] }),
});

export const clickPipeDestinationSchema = z.object({
	database: z.string().optional().describe("Destination database."),
	table: z
		.string()
		.optional()
		.describe(
			"Destination table. Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
	managedTable: z
		.boolean()
		.optional()
		.describe(
			"Is the table managed by ClickPipes? Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
	tableDefinition: clickPipeDestinationTableDefinitionSchema.optional(),
	columns: z
		.array(clickPipeDestinationColumnSchema)
		.optional()
		.describe(
			"Columns of the destination table. Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
});

export const clickPipeFieldMappingSchema = z.object({
	sourceField: z.string().optional().describe("Source field name."),
	destinationField: z.string().optional().describe("Destination field name."),
});

export const clickPipeSettingsSchema = z.object({
	streaming_max_insert_wait_ms: z
		.int()
		.min(500)
		.max(60000)
		.nullish()
		.describe(
			"Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.",
		)
		.meta({ examples: [5000] }),
	object_storage_concurrency: z
		.int()
		.min(1)
		.max(35)
		.nullish()
		.describe("Object storage concurrency. Number of concurrent file processing threads")
		.meta({ examples: [1] }),
	object_storage_polling_interval_ms: z
		.int()
		.min(100)
		.max(3600000)
		.nullish()
		.describe(
			"Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data",
		)
		.meta({ examples: [30000] }),
	object_storage_max_insert_bytes: z
		.int()
		.min(524288000)
		.max(10737418240)
		.nullish()
		.describe("Max insert bytes. Number of bytes to process in a single insert batch")
		.meta({ examples: [10737418240] }),
	object_storage_max_file_count: z
		.int()
		.min(1)
		.max(10000)
		.nullish()
		.describe("Max file count. Maximum number of files to process in a single insert batch")
		.meta({ examples: [100] }),
	clickhouse_max_threads: z
		.int()
		.min(0)
		.max(64)
		.nullish()
		.describe("Max threads. Maximum number of concurrent threads for file processing")
		.meta({ examples: [8] }),
	clickhouse_max_insert_threads: z
		.int()
		.min(0)
		.max(16)
		.nullish()
		.describe("Max insert threads. Maximum number of concurrent insert threads")
		.meta({ examples: [1] }),
	clickhouse_min_insert_block_size_bytes: z
		.int()
		.min(0)
		.max(10737418240)
		.nullish()
		.describe("Min insert block size bytes. Minimum size of data block for insert (in bytes)")
		.meta({ examples: [1073741824] }),
	clickhouse_max_download_threads: z
		.int()
		.min(0)
		.max(32)
		.nullish()
		.describe("Max download threads. Maximum number of concurrent download threads")
		.meta({ examples: [4] }),
	clickhouse_parallel_distributed_insert_select: z
		.int()
		.min(0)
		.max(2)
		.nullish()
		.describe("Parallel distributed insert select. Parallel distributed insert select setting")
		.meta({ examples: [2] }),
	kafka_read_committed: z
		.boolean()
		.optional()
		.describe("Kafka Read Committed. Whether Kafka consumers read only committed messages")
		.meta({ examples: [false] }),
	object_storage_use_cluster_function: z
		.boolean()
		.nullish()
		.describe(
			"use cluster function. Whether to use ClickHouse cluster function for distributed processing",
		)
		.meta({ examples: [true] }),
	clickhouse_parallel_view_processing: z
		.boolean()
		.nullish()
		.describe(
			"parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially",
		)
		.meta({ examples: [false] }),
});

export const clickPipeSchema = z.object({
	id: z.uuid().optional().describe("Unique ClickPipe ID."),
	serviceId: z.uuid().optional().describe("ID of the service this ClickPipe belongs to."),
	name: z
		.string()
		.min(1)
		.max(255)
		.optional()
		.describe("Name of the ClickPipe.")
		.meta({ examples: ["my_postgres_pipe"] }),
	state: z
		.enum([
			"Unknown",
			"Provisioning",
			"Running",
			"Degraded",
			"Stopping",
			"Stopped",
			"Failed",
			"Completed",
			"InternalError",
			"Setup",
			"Snapshot",
			"Paused",
			"Pausing",
			"Modifying",
			"Resync",
		])
		.optional()
		.describe(
			'Current lifecycle state of the ClickPipe. For database pipes: "Provisioning" (initial setup), "Setup" (configuring replication), "Snapshot" (initial data load), "Running" (actively replicating), "Pausing" (transitioning to paused state), "Paused" (temporarily paused), "Modifying" (applying configuration updates), "Resync" (swapping resync tables with original tables), "Failed" (error occurred), "Unknown". For streaming/object storage pipes (Kafka, Kinesis, S3): "Unknown" (initial state), "Provisioning" (setting up resources), "Running" (actively ingesting data), "Stopping" (transitioning to stopped state), "Stopped" (manually stopped, can be restarted), "Completed" (batch ingestion finished for object storage), "Failed" (error occurred, pipe stopped), "InternalError" (internal system error).',
		)
		.meta({ examples: ["Running"] }),
	scaling: clickPipeScalingSchema.optional(),
	source: clickPipeSourceSchema.optional(),
	destination: clickPipeDestinationSchema.optional(),
	fieldMappings: z
		.array(clickPipeFieldMappingSchema)
		.optional()
		.describe(
			"Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.",
		),
	settings: clickPipeSettingsSchema.optional(),
	createdAt: z.iso
		.datetime()
		.optional()
		.describe("Creation timestamp of the ClickPipe in ISO 8601 format."),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Last update timestamp of the ClickPipe in ISO 8601 format."),
});

export const clickPipePostSourceSchema = z.object({
	kafka: clickPipePostKafkaSourceSchema.optional(),
	objectStorage: clickPipePostObjectStorageSourceSchema.optional(),
	kinesis: clickPipePostKinesisSourceSchema.optional(),
	pubsub: clickPipePostPubSubSourceSchema.optional(),
	postgres: clickPipeMutatePostgresSourceSchema.optional(),
	mysql: clickPipeMutateMySQLSourceSchema.optional(),
	bigquery: clickPipeMutateBigQuerySourceSchema.optional(),
	mongodb: clickPipeMutateMongoDBSourceSchema.optional(),
	validateSamples: z
		.boolean()
		.optional()
		.describe(
			"Validate data samples received from data source. It will validate the connection and data availability and correctness. If not enabled, only connection will be validated. This has no effect on Postgres or MySQL pipes, they always only validate the connection and table definitions. This is experimental and can be removed in the future.",
		),
});

export const clickPipePatchSourceSchema = z.object({
	kafka: clickPipePatchKafkaSourceSchema.optional(),
	objectStorage: clickPipePatchObjectStorageSourceSchema.optional(),
	kinesis: clickPipePatchKinesisSourceSchema.optional(),
	pubsub: clickPipePatchPubSubSourceSchema.optional(),
	postgres: clickPipePatchPostgresSourceSchema.optional(),
	mysql: clickPipePatchMySQLSourceSchema.optional(),
	mongodb: clickPipePatchMongoDBSourceSchema.optional(),
	validateSamples: z
		.boolean()
		.optional()
		.describe(
			"Validate data samples received from data source. It will validate the connection and data availability and correctness. If not enabled, only connection will be validated. This has no effect on Postgres or MySQL pipes, they always only validate the connection and table definitions. This is experimental and can be removed in the future.",
		),
});

export const clickPipeMutateDestinationSchema = z.object({
	database: z.string().describe("Destination database."),
	table: z
		.string()
		.optional()
		.describe(
			"Destination table. Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
	managedTable: z
		.boolean()
		.optional()
		.describe(
			"Is the table managed by ClickPipes? Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
	tableDefinition: clickPipeDestinationTableDefinitionSchema.optional(),
	columns: z
		.array(clickPipeDestinationColumnSchema)
		.optional()
		.describe(
			"Columns of the destination table. Required field for all pipe types except database pipes (Postgres, MySQL, BigQuery).",
		),
	roles: z
		.array(z.string())
		.optional()
		.describe(
			"Optional. Roles to grant to the ClickHouse user that ClickPipe creates. If omitted, the user is granted the default role (`default_role`). Add your custom roles here if required. The role names `clickpipes` and `clickpipes_system` are reserved for internal use and cannot be assigned.",
		),
});

export const clickPipePatchDestinationSchema = z.object({
	columns: z
		.array(clickPipeDestinationColumnSchema)
		.optional()
		.describe(
			"Columns of the destination table. This will not update the table schema, only the ClickPipe configuration.",
		),
});

export const clickPipesCdcScalingSchema = z.object({
	replicaCpuMillicores: z
		.int()
		.min(1000)
		.max(32000)
		.multipleOf(1000)
		.optional()
		.describe("CPU in millicores for DB ClickPipes.")
		.meta({ examples: [2000] }),
	replicaMemoryGb: z
		.number()
		.min(4)
		.max(128)
		.multipleOf(4)
		.optional()
		.describe("Memory in GiB for DB ClickPipes. Must be 4× the CPU core count.")
		.meta({ examples: [8] }),
});

export const clickPipeSettingsPutRequestSchema = z.object({
	streaming_max_insert_wait_ms: z
		.int()
		.min(500)
		.max(60000)
		.optional()
		.describe(
			"Streaming max insert wait time. Configures the max wait period before inserting data into the ClickHouse.",
		)
		.meta({ examples: [5000] }),
	object_storage_concurrency: z
		.int()
		.min(1)
		.max(35)
		.optional()
		.describe("Object storage concurrency. Number of concurrent file processing threads")
		.meta({ examples: [1] }),
	object_storage_polling_interval_ms: z
		.int()
		.min(100)
		.max(3600000)
		.optional()
		.describe(
			"Object storage polling interval. Configures the refresh interval for querying continuous ingest for new object storage data",
		)
		.meta({ examples: [30000] }),
	object_storage_max_insert_bytes: z
		.int()
		.min(524288000)
		.max(10737418240)
		.optional()
		.describe("Max insert bytes. Number of bytes to process in a single insert batch")
		.meta({ examples: [10737418240] }),
	object_storage_max_file_count: z
		.int()
		.min(1)
		.max(10000)
		.optional()
		.describe("Max file count. Maximum number of files to process in a single insert batch")
		.meta({ examples: [100] }),
	clickhouse_max_threads: z
		.int()
		.min(0)
		.max(64)
		.optional()
		.describe("Max threads. Maximum number of concurrent threads for file processing")
		.meta({ examples: [8] }),
	clickhouse_max_insert_threads: z
		.int()
		.min(0)
		.max(16)
		.optional()
		.describe("Max insert threads. Maximum number of concurrent insert threads")
		.meta({ examples: [1] }),
	clickhouse_min_insert_block_size_bytes: z
		.int()
		.min(0)
		.max(10737418240)
		.optional()
		.describe("Min insert block size bytes. Minimum size of data block for insert (in bytes)")
		.meta({ examples: [1073741824] }),
	clickhouse_max_download_threads: z
		.int()
		.min(0)
		.max(32)
		.optional()
		.describe("Max download threads. Maximum number of concurrent download threads")
		.meta({ examples: [4] }),
	clickhouse_parallel_distributed_insert_select: z
		.int()
		.min(0)
		.max(2)
		.optional()
		.describe("Parallel distributed insert select. Parallel distributed insert select setting")
		.meta({ examples: [2] }),
	kafka_read_committed: z
		.boolean()
		.optional()
		.describe("Kafka Read Committed. Whether Kafka consumers read only committed messages")
		.meta({ examples: [false] }),
	object_storage_use_cluster_function: z
		.boolean()
		.optional()
		.describe(
			"use cluster function. Whether to use ClickHouse cluster function for distributed processing",
		)
		.meta({ examples: [true] }),
	clickhouse_parallel_view_processing: z
		.boolean()
		.optional()
		.describe(
			"parallel view processing. Whether to enable pushing to attached views concurrently instead of sequentially",
		)
		.meta({ examples: [false] }),
});

export const clickPipeSchemaDiscoverySourceSchema = z.object({
	kafka: clickPipePostKafkaSourceSchema.optional(),
	kinesis: clickPipePostKinesisSourceSchema.optional(),
	pubsub: clickPipePostPubSubSourceSchema.optional(),
	objectStorage: clickPipePostObjectStorageSourceSchema.optional(),
});

export const clickPipeSchemaDiscoveryFieldSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Name of the inferred field.")
		.meta({ examples: ["user_id"] }),
	type: z
		.string()
		.optional()
		.describe("Inferred ClickHouse data type of the field.")
		.meta({ examples: ["Int64"] }),
	optional: z
		.boolean()
		.nullish()
		.describe("Whether the field is optional (nullable) in the source."),
});

export const clickPipeSchemaDiscoveryMetaSchema = z
	.record(z.string(), z.string())
	.describe("Source-specific schema discovery metadata.");

export const clickPipeSchemaDiscoveryResponseSchema = z.object({
	fields: z
		.array(clickPipeSchemaDiscoveryFieldSchema)
		.optional()
		.describe("Inferred schema fields with their ClickHouse data types."),
	meta: z.union([clickPipeSchemaDiscoveryMetaSchema, z.null()]).optional(),
});

export const activitySchema = z.object({
	id: z.string().optional().describe("Unique activity ID."),
	createdAt: z.iso.datetime().optional().describe("Timestamp of the activity. ISO-8601."),
	type: z
		.enum([
			"create_organization",
			"delete_organization",
			"organization_update_name",
			"transfer_service_in",
			"transfer_service_out",
			"save_payment_method",
			"marketplace_subscription",
			"migrate_marketplace_billing_details_in",
			"migrate_marketplace_billing_details_out",
			"organization_update_tier",
			"organization_invite_create",
			"organization_invite_delete",
			"organization_member_join",
			"organization_member_add",
			"organization_member_leave",
			"organization_member_delete",
			"organization_member_update_role",
			"organization_member_update_roles",
			"organization_member_update_mfa_method",
			"organization_saml_connection_create",
			"organization_saml_connection_update",
			"user_login",
			"user_login_failed",
			"user_logout",
			"key_create",
			"key_delete",
			"openapi_key_update",
			"service_create",
			"service_start",
			"service_stop",
			"service_awaken",
			"service_idle",
			"service_running",
			"service_partially_running",
			"service_delete",
			"service_update_name",
			"service_update_ip_access_list",
			"service_update_autoscaling_memory",
			"service_update_autoscaling_idling",
			"service_update_password",
			"service_update_autoscaling_replicas",
			"service_update_max_allowable_replicas",
			"service_update_backup_configuration",
			"service_restore_backup",
			"service_update_release_channel",
			"service_update_gpt_usage_consent",
			"service_update_private_endpoints",
			"service_import_to_organization",
			"service_export_from_organization",
			"service_maintenance_start",
			"service_maintenance_end",
			"service_update_core_dump",
			"service_update_autoscaling_schedule",
			"service_update_query_endpoints",
			"service_update_direct_connection",
			"service_update_sql_console_jwt_auth",
			"service_update_snapshot_configuration",
			"service_update_collector_ip_access_list",
			"service_update_mysql_interface",
			"service_update_upgrade_window",
			"service_delete_upgrade_window",
			"service_trigger_failover",
			"service_trigger_recovery",
			"service_mcp_enabled",
			"service_mcp_disabled",
			"service_upgrade",
			"service_scaled_down_for_tier_change",
			"service_encryption_key_check_failed",
			"service_encryption_key_rotation_failed",
			"service_encryption_key_rotated",
			"service_stop_encryption_key_inaccessible",
			"service_restart_encryption_key_rotation",
			"backup_delete",
			"backup_bucket_create",
			"backup_bucket_update",
			"backup_bucket_delete",
			"backup_bucket_archive",
			"warehouse_update_name",
			"warehouse_update_release_channel",
			"role_create",
			"role_update",
			"role_delete",
			"role_resources_delete",
			"organization_member_remove_roles",
			"scim_user_profile_update",
			"scim_group_create",
			"scim_group_update",
			"scim_group_delete",
			"organization_saml_connection_delete",
			"organization_update_saml_query_ownership_migration",
			"organization_approved_domain_verify",
			"organization_approved_domain_update",
			"organization_approved_domain_delete",
			"organization_approved_domain_auto_join",
			"organization_approved_domain_auto_invite",
			"datadog_integration_create",
			"datadog_integration_delete",
			"organization_update_spend_alert",
			"organization_update_core_dumps",
			"organization_update_private_endpoints",
			"organization_update_pci_compliance",
			"organization_update_hipaa_status",
			"organization_security_contact_add",
			"organization_security_contact_remove",
			"organization_security_contact_replace",
			"organization_update_public_preview",
			"transfer_credits_in",
			"transfer_credits_out",
			"promo_code_claim",
			"schema_advisor_seed",
			"schema_advisor_generate_plan",
			"schema_advisor_approve_plan",
			"schema_advisor_start_deployment",
			"schema_advisor_start_benchmark",
			"schema_advisor_run_benchmark",
			"schema_advisor_start_promotion",
			"schema_advisor_exchange_tables",
			"schema_advisor_drop_sandbox",
			"udf_create",
			"udf_update",
			"udf_delete",
			"udf_version_create",
			"udf_version_delete",
			"udf_attach",
			"udf_detach",
			"udf_update_services",
			"udf_redeploy",
			"udf_rebuild",
			"postgres_action",
		])
		.optional()
		.describe("Type of the activity."),
	actorType: z
		.enum(["user", "support", "system", "api"])
		.optional()
		.describe("Type of the actor: 'user', 'support', 'system', 'api'."),
	actorId: z.string().optional().describe("Unique actor ID."),
	actorDetails: z.string().optional().describe("Additional information about the actor."),
	actorIpAddress: z
		.string()
		.optional()
		.describe("IP address of the actor. Defined for 'user' and 'api' actor types."),
	organizationId: z
		.string()
		.optional()
		.describe("Scope of the activity: organization ID this activity is related to."),
	serviceId: z
		.string()
		.optional()
		.describe("Scope of the activity: service ID this activity is related to."),
	userAgent: z.string().optional().describe("User agent of the actor"),
	targetKeyId: z
		.string()
		.optional()
		.describe("For 'openapi_key_update' activities: the ID of the API key that was updated."),
	keyUpdateType: z
		.enum([
			"created",
			"deleted",
			"name-changed",
			"role-changed",
			"state-changed",
			"date-changed",
			"ip-access-list-changed",
			"org-role-changed",
			"default-service-role-changed",
			"service-role-changed",
			"roles-v2-changed",
		])
		.optional()
		.describe("For 'openapi_key_update' activities: the type of update that was performed."),
	targetRoleIds: z
		.array(z.string())
		.optional()
		.describe("For role and actor-role activities: IDs of the affected roles."),
	targetRoleNames: z
		.array(z.string())
		.optional()
		.describe("For role and actor-role activities: names of the affected roles, when recorded."),
	targetActorIds: z
		.array(z.string())
		.optional()
		.describe(
			"For 'organization_member_update_roles' and 'organization_member_remove_roles' activities: IDs of the affected actors (e.g. 'user/<id>').",
		),
	targetResourceIds: z
		.array(z.string())
		.optional()
		.describe(
			"For 'role_resources_delete' activities: IDs of the deleted resources the roles referenced.",
		),
});

export const awsBackupBucketSchema = z.object({
	id: z.uuid().optional().describe("Unique backup bucket ID"),
	bucketProvider: z.enum(["AWS"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	iamRoleArn: z.string().optional().describe("AWS Role ARN"),
	iamRoleSessionName: z.string().optional().describe("AWS  Role session name"),
});

export const gcpBackupBucketSchema = z.object({
	id: z.uuid().optional().describe("Unique backup bucket ID"),
	bucketProvider: z.enum(["GCP"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	accessKeyId: z.string().optional().describe("Access Key ID (HMAC key)"),
});

export const azureBackupBucketSchema = z.object({
	id: z.uuid().optional().describe("Unique backup bucket ID."),
	bucketProvider: z.enum(["AZURE"]).optional().describe("Bucket provider"),
	containerName: z.string().optional().describe("Container Name"),
});

export const backupBucketSchema = z.discriminatedUnion("bucketProvider", [
	awsBackupBucketSchema.strict(),
	gcpBackupBucketSchema.strict(),
	azureBackupBucketSchema.strict(),
]);

export const awsBackupBucketPropertiesSchema = z.object({
	bucketProvider: z.enum(["AWS"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	iamRoleArn: z.string().optional().describe("AWS IAM Role"),
	iamRoleSessionName: z.string().optional().describe("AWS IAM Role"),
});

export const gcpBackupBucketPropertiesSchema = z.object({
	bucketProvider: z.enum(["GCP"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	accessKeyId: z.string().optional().describe("Access Key ID (HMAC key)"),
});

export const azureBackupBucketPropertiesSchema = z.object({
	bucketProvider: z.enum(["AZURE"]).optional().describe("Bucket provider"),
	containerName: z.string().optional().describe("Container Name"),
});

export const backupBucketPropertiesSchema = z.discriminatedUnion("bucketProvider", [
	awsBackupBucketPropertiesSchema.strict(),
	gcpBackupBucketPropertiesSchema.strict(),
	azureBackupBucketPropertiesSchema.strict(),
]);

export const awsBackupBucketPostRequestV1Schema = z.object({
	bucketProvider: z.enum(["AWS"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	iamRoleArn: z.string().optional().describe("AWS Role ARN"),
	iamRoleSessionName: z.string().optional().describe("AWS Role session name"),
});

export const gcpBackupBucketPostRequestV1Schema = z.object({
	bucketProvider: z.enum(["GCP"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	accessKeyId: z.string().optional().describe("Access Key ID (HMAC key)"),
	secretAccessKey: z.string().optional().describe("Secret Access Key (HMAC secret key)"),
});

export const azureBackupBucketPostRequestV1Schema = z.object({
	bucketProvider: z.enum(["AZURE"]).optional().describe("Bucket provider"),
	containerName: z.string().optional().describe("Container Name"),
	connectionString: z.string().optional().describe("Connection String"),
});

export const backupBucketPostRequestSchema = z.discriminatedUnion("bucketProvider", [
	awsBackupBucketPostRequestV1Schema.strict(),
	gcpBackupBucketPostRequestV1Schema.strict(),
	azureBackupBucketPostRequestV1Schema.strict(),
]);

export const awsBackupBucketPatchRequestV1Schema = z.object({
	bucketProvider: z.enum(["AWS"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	iamRoleArn: z.string().optional().describe("AWS Role ARN"),
	iamRoleSessionName: z.string().nullish().describe("AWS IAM Role session name"),
});

export const gcpBackupBucketPatchRequestV1Schema = z.object({
	bucketProvider: z.enum(["GCP"]).optional().describe("Bucket provider"),
	bucketPath: z.string().optional().describe("Bucket path"),
	accessKeyId: z.string().optional().describe("Access Key ID (HMAC key)"),
	secretAccessKey: z.string().optional().describe("Secret Access Key (HMAC secret key)"),
});

export const azureBackupBucketPatchRequestV1Schema = z.object({
	bucketProvider: z.enum(["AZURE"]).optional().describe("Bucket provider"),
	containerName: z.string().optional().describe("Container Name"),
	connectionString: z.string().optional().describe("Connection String"),
});

export const backupBucketPatchRequestSchema = z.discriminatedUnion("bucketProvider", [
	awsBackupBucketPatchRequestV1Schema.strict(),
	gcpBackupBucketPatchRequestV1Schema.strict(),
	azureBackupBucketPatchRequestV1Schema.strict(),
]);

export const backupConfigurationSchema = z.object({
	backupPeriodInHours: z.number().optional().describe("The interval in hours between each backup."),
	backupRetentionPeriodInHours: z
		.number()
		.optional()
		.describe(
			"The minimum duration in hours for which the backups are available. Must be a whole number of days between 24 (1 day) and 1080 (45 days) — i.e. a multiple of 24.",
		),
	backupStartTime: z
		.string()
		.optional()
		.describe(
			"The time in HH:MM format for the backups to be performed (evaluated in UTC timezone). When defined the backup period resets to every 24 hours.",
		),
});

export const backupSchema = z.object({
	id: z.uuid().optional().describe("Unique backup ID."),
	status: z
		.enum(["done", "error", "in_progress"])
		.optional()
		.describe("Status of the backup: 'done', 'error', 'in_progress'."),
	serviceId: z.string().optional().describe("Name "),
	startedAt: z.iso.datetime().optional().describe("Backup start timestamp. ISO-8601."),
	finishedAt: z.iso
		.datetime()
		.optional()
		.describe("Backup finish timestamp. ISO-8601. Available only for finished backups"),
	sizeInBytes: z.number().optional().describe("Size of the backup in bytes."),
	durationInSeconds: z
		.number()
		.optional()
		.describe(
			"Time in seconds it took to perform the backup. If the status still in_progress, this is the time in seconds since the backup started until now.",
		),
	type: z
		.enum(["full", "incremental"])
		.optional()
		.describe('Backup type ("full" or "incremental").'),
	backupName: z.string().optional().describe("Backup name on the external backup bucket."),
	bucket: z
		.discriminatedUnion("bucketProvider", [
			awsBackupBucketPropertiesSchema.strict(),
			gcpBackupBucketPropertiesSchema.strict(),
			azureBackupBucketPropertiesSchema.strict(),
		])
		.optional()
		.describe("Backup bucket where the backup is stored."),
});

export const snapshotSchema = z.object({
	id: z.uuid().optional().describe("Unique snapshot ID."),
	status: z
		.enum(["done", "error", "in_progress", "throttled"])
		.optional()
		.describe(
			"Status of the snapshot: 'done', 'error', 'in_progress', 'throttled'. 'throttled' means snapshot creation was rate-limited and will be retried.",
		),
	serviceId: z.string().optional().describe("ID of the service the snapshot was created from."),
	startedAt: z.iso.datetime().optional().describe("Snapshot start timestamp. ISO-8601."),
	finishedAt: z.iso
		.datetime()
		.optional()
		.describe("Snapshot finish timestamp. ISO-8601. Available only for finished snapshots"),
	sizeInBytes: z.number().optional().describe("Size of the snapshot in bytes."),
	durationInSeconds: z
		.number()
		.optional()
		.describe(
			"Time in seconds it took to perform the snapshot. If the status is in_progress or throttled, this is the time in seconds since the snapshot started until now.",
		),
	type: z
		.enum(["full"])
		.optional()
		.describe('Snapshot type. Always "full" — snapshots never chain off a parent.'),
	backupName: z.string().optional().describe("Snapshot name on the external backup bucket."),
	bucket: z
		.discriminatedUnion("bucketProvider", [
			awsBackupBucketPropertiesSchema.strict(),
			gcpBackupBucketPropertiesSchema.strict(),
			azureBackupBucketPropertiesSchema.strict(),
		])
		.optional()
		.describe("Backup bucket where the snapshot is stored."),
});

export const snapshotConfigurationSchema = z.object({
	enabled: z
		.boolean()
		.optional()
		.describe("Whether scheduled snapshots are enabled for the service."),
	gap: z
		.number()
		.optional()
		.describe(
			"Interval between snapshots, in minutes. Set together with timeFrame; only supported preset pairs are accepted.",
		),
	timeFrame: z
		.number()
		.optional()
		.describe(
			"Retention window the snapshots cover, in minutes. Set together with gap; only supported preset pairs are accepted.",
		),
});

export const clickStackAlertExecutionErrorSchema = z.object({
	timestamp: z.iso
		.datetime()
		.describe("When the error occurred.")
		.meta({ examples: ["2026-04-17T12:00:00.000Z"] }),
	type: z
		.enum(["QUERY_ERROR", "QUERY_TIMEOUT", "WEBHOOK_ERROR", "INVALID_ALERT", "UNKNOWN"])
		.describe("Category of the error.")
		.meta({ examples: ["QUERY_ERROR"] }),
	message: z
		.string()
		.describe("Human-readable error message.")
		.meta({ examples: ["Query timed out after 30s"] }),
});

export const clickStackAlertSilencedSchema = z.object({
	by: z
		.string()
		.nullish()
		.describe("User ID who silenced the alert.")
		.meta({ examples: ["65f5e4a3b9e77c001a234567"] }),
	at: z.iso
		.datetime()
		.optional()
		.describe("Silence start timestamp.")
		.meta({ examples: ["2026-03-19T08:00:00.000Z"] }),
	until: z.iso
		.datetime()
		.optional()
		.describe("Silence end timestamp.")
		.meta({ examples: ["2026-03-20T08:00:00.000Z"] }),
});

export const clickStackAlertChannelEmailSchema = z.object({
	type: z.enum(["webhook", "email"]).describe('Channel type. Must be "email" for email alerts.'),
	emailRecipients: z.array(z.string()).describe("Email recipients for email alerts."),
});

export const clickStackAlertChannelWebhookSchema = z.object({
	type: z
		.enum(["webhook", "email"])
		.describe('Channel type. Must be "webhook" for webhook alerts.'),
	webhookId: z
		.string()
		.describe("Webhook destination ID.")
		.meta({ examples: ["65f5e4a3b9e77c001a789012"] }),
	webhookService: z
		.string()
		.nullish()
		.describe("Webhook service type (e.g., slack_api).")
		.meta({ examples: ["slack_api"] }),
	slackChannelId: z
		.string()
		.nullish()
		.describe("Slack channel ID for Slack webhooks.")
		.meta({ examples: ["C01ABCDEF23"] }),
	severity: z
		.enum(["critical", "error", "warning", "info"])
		.nullish()
		.describe("Severity label used by PagerDuty API webhooks."),
});

export const clickStackAlertChannelSchema = z.union([
	clickStackAlertChannelEmailSchema.strict(),
	clickStackAlertChannelWebhookSchema.strict(),
]);

export const clickStackAlertChannelsSchema = z
	.array(clickStackAlertChannelSchema)
	.min(1)
	.max(10)
	.describe(
		"Notification channels to trigger when the alert fires or resolves. Between 1 and 10 channels; duplicates are rejected.",
	);

export const clickStackAlertResponseSchema = z.object({
	dashboardId: z
		.string()
		.nullish()
		.describe("Dashboard ID for tile-based alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	tileId: z
		.string()
		.nullish()
		.describe("Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile.")
		.meta({ examples: ["65f5e4a3b9e77c001a901234"] }),
	savedSearchId: z
		.string()
		.nullish()
		.describe("Saved search ID for saved_search alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a345678"] }),
	groupBy: z
		.string()
		.nullish()
		.describe("Group-by key for saved search alerts.")
		.meta({ examples: ["ServiceName"] }),
	threshold: z
		.number()
		.optional()
		.describe(
			"Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.",
		)
		.meta({ examples: [100] }),
	thresholdMax: z
		.number()
		.nullish()
		.describe(
			"Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be >= threshold.",
		)
		.meta({ examples: [500] }),
	interval: z
		.enum(["30s", "1m", "5m", "15m", "30m", "1h", "6h", "12h", "1d"])
		.optional()
		.describe(
			"Evaluation interval for the alert. `30s` requires the 30s alert interval feature to be enabled for your team.",
		)
		.meta({ examples: ["1h"] }),
	scheduleOffsetMinutes: z
		.int()
		.nullish()
		.describe(
			"Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).",
		)
		.meta({ examples: [2] }),
	scheduleStartAt: z.iso
		.datetime()
		.nullish()
		.describe(
			"Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval.",
		)
		.meta({ examples: ["2026-02-08T10:00:00.000Z"] }),
	source: z
		.enum(["saved_search", "tile"])
		.optional()
		.describe("Alert source type (tile-based or saved search).")
		.meta({ examples: ["tile"] }),
	thresholdType: z
		.enum([
			"above",
			"below",
			"above_exclusive",
			"below_or_equal",
			"equal",
			"not_equal",
			"between",
			"not_between",
		])
		.optional()
		.describe("Threshold comparison direction.")
		.meta({ examples: ["above"] }),
	channel: clickStackAlertChannelSchema.optional(),
	channels: clickStackAlertChannelsSchema
		.optional()
		.describe(
			"Notification channels to trigger when the alert fires or resolves. Between 1 and 10 channels; duplicates are rejected.",
		),
	name: z
		.string()
		.nullish()
		.describe("Human-friendly alert name.")
		.meta({ examples: ["Test Alert"] }),
	message: z
		.string()
		.nullish()
		.describe("Alert message template.")
		.meta({ examples: ["Test Alert Message"] }),
	note: z
		.string()
		.nullish()
		.describe("Freeform note for the alert. Supports markdown formatting.")
		.meta({
			examples: [
				"Threshold raised from 50 to 100 on 2026-01-15. See [runbook](https://wiki.example.com/runbook).",
			],
		}),
	numConsecutiveWindows: z
		.int()
		.nullish()
		.describe(
			"Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.",
		)
		.meta({ examples: [3] }),
	id: z
		.string()
		.optional()
		.describe("Unique alert identifier.")
		.meta({ examples: ["65f5e4a3b9e77c001a123456"] }),
	state: z
		.enum(["ALERT", "OK", "INSUFFICIENT_DATA", "DISABLED", "PENDING"])
		.optional()
		.describe("Current alert state.")
		.meta({ examples: ["ALERT"] }),
	teamId: z
		.string()
		.optional()
		.describe("Team identifier.")
		.meta({ examples: ["65f5e4a3b9e77c001a345678"] }),
	silenced: z.union([clickStackAlertSilencedSchema.strict(), z.null()]).optional(),
	executionErrors: z
		.array(clickStackAlertExecutionErrorSchema)
		.optional()
		.describe("Errors recorded during the most recent alert execution, if any."),
	createdAt: z.iso
		.datetime()
		.nullish()
		.describe("Creation timestamp.")
		.meta({ examples: ["2023-01-01T00:00:00.000Z"] }),
	updatedAt: z.iso
		.datetime()
		.nullish()
		.describe("Last update timestamp.")
		.meta({ examples: ["2023-01-01T00:00:00.000Z"] }),
});

export const clickStackCreateAlertRequestSchema = z.object({
	dashboardId: z
		.string()
		.nullish()
		.describe("Dashboard ID for tile-based alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	tileId: z
		.string()
		.nullish()
		.describe("Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile.")
		.meta({ examples: ["65f5e4a3b9e77c001a901234"] }),
	savedSearchId: z
		.string()
		.nullish()
		.describe("Saved search ID for saved_search alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a345678"] }),
	groupBy: z
		.string()
		.nullish()
		.describe("Group-by key for saved search alerts.")
		.meta({ examples: ["ServiceName"] }),
	threshold: z
		.number()
		.optional()
		.describe(
			"Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.",
		)
		.meta({ examples: [100] }),
	thresholdMax: z
		.number()
		.nullish()
		.describe(
			"Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be >= threshold.",
		)
		.meta({ examples: [500] }),
	interval: z
		.enum(["30s", "1m", "5m", "15m", "30m", "1h", "6h", "12h", "1d"])
		.optional()
		.describe(
			"Evaluation interval for the alert. `30s` requires the 30s alert interval feature to be enabled for your team.",
		)
		.meta({ examples: ["1h"] }),
	scheduleOffsetMinutes: z
		.int()
		.nullish()
		.describe(
			"Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).",
		)
		.meta({ examples: [2] }),
	scheduleStartAt: z.iso
		.datetime()
		.nullish()
		.describe(
			"Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval.",
		)
		.meta({ examples: ["2026-02-08T10:00:00.000Z"] }),
	source: z
		.enum(["saved_search", "tile"])
		.optional()
		.describe("Alert source type (tile-based or saved search).")
		.meta({ examples: ["tile"] }),
	thresholdType: z
		.enum([
			"above",
			"below",
			"above_exclusive",
			"below_or_equal",
			"equal",
			"not_equal",
			"between",
			"not_between",
		])
		.optional()
		.describe("Threshold comparison direction.")
		.meta({ examples: ["above"] }),
	channel: clickStackAlertChannelSchema.optional(),
	channels: clickStackAlertChannelsSchema
		.optional()
		.describe(
			"Notification channels to trigger when the alert fires or resolves. Between 1 and 10 channels; duplicates are rejected.",
		),
	name: z
		.string()
		.nullish()
		.describe("Human-friendly alert name.")
		.meta({ examples: ["Test Alert"] }),
	message: z
		.string()
		.nullish()
		.describe("Alert message template.")
		.meta({ examples: ["Test Alert Message"] }),
	note: z
		.string()
		.nullish()
		.describe("Freeform note for the alert. Supports markdown formatting.")
		.meta({
			examples: [
				"Threshold raised from 50 to 100 on 2026-01-15. See [runbook](https://wiki.example.com/runbook).",
			],
		}),
	numConsecutiveWindows: z
		.int()
		.nullish()
		.describe(
			"Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.",
		)
		.meta({ examples: [3] }),
});

export const clickStackUpdateAlertRequestSchema = z.object({
	dashboardId: z
		.string()
		.nullish()
		.describe("Dashboard ID for tile-based alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	tileId: z
		.string()
		.nullish()
		.describe("Tile ID for tile-based alerts. Must be a line, stacked bar, or number type tile.")
		.meta({ examples: ["65f5e4a3b9e77c001a901234"] }),
	savedSearchId: z
		.string()
		.nullish()
		.describe("Saved search ID for saved_search alerts.")
		.meta({ examples: ["65f5e4a3b9e77c001a345678"] }),
	groupBy: z
		.string()
		.nullish()
		.describe("Group-by key for saved search alerts.")
		.meta({ examples: ["ServiceName"] }),
	threshold: z
		.number()
		.optional()
		.describe(
			"Threshold value for triggering the alert. For between and not_between threshold types, this is the lower bound.",
		)
		.meta({ examples: [100] }),
	thresholdMax: z
		.number()
		.nullish()
		.describe(
			"Upper bound for between and not_between threshold types. Required when thresholdType is between or not_between, must be >= threshold.",
		)
		.meta({ examples: [500] }),
	interval: z
		.enum(["30s", "1m", "5m", "15m", "30m", "1h", "6h", "12h", "1d"])
		.optional()
		.describe(
			"Evaluation interval for the alert. `30s` requires the 30s alert interval feature to be enabled for your team.",
		)
		.meta({ examples: ["1h"] }),
	scheduleOffsetMinutes: z
		.int()
		.nullish()
		.describe(
			"Offset from the interval boundary in minutes. For example, 2 with a 5m interval evaluates windows at :02, :07, :12, etc. (UTC).",
		)
		.meta({ examples: [2] }),
	scheduleStartAt: z.iso
		.datetime()
		.nullish()
		.describe(
			"Absolute UTC start time anchor. Alert windows start from this timestamp and repeat every interval.",
		)
		.meta({ examples: ["2026-02-08T10:00:00.000Z"] }),
	source: z
		.enum(["saved_search", "tile"])
		.optional()
		.describe("Alert source type (tile-based or saved search).")
		.meta({ examples: ["tile"] }),
	thresholdType: z
		.enum([
			"above",
			"below",
			"above_exclusive",
			"below_or_equal",
			"equal",
			"not_equal",
			"between",
			"not_between",
		])
		.optional()
		.describe("Threshold comparison direction.")
		.meta({ examples: ["above"] }),
	channel: clickStackAlertChannelSchema.optional(),
	channels: clickStackAlertChannelsSchema
		.optional()
		.describe(
			"Notification channels to trigger when the alert fires or resolves. Between 1 and 10 channels; duplicates are rejected.",
		),
	name: z
		.string()
		.nullish()
		.describe("Human-friendly alert name.")
		.meta({ examples: ["Test Alert"] }),
	message: z
		.string()
		.nullish()
		.describe("Alert message template.")
		.meta({ examples: ["Test Alert Message"] }),
	note: z
		.string()
		.nullish()
		.describe("Freeform note for the alert. Supports markdown formatting.")
		.meta({
			examples: [
				"Threshold raised from 50 to 100 on 2026-01-15. See [runbook](https://wiki.example.com/runbook).",
			],
		}),
	numConsecutiveWindows: z
		.int()
		.nullish()
		.describe(
			"Fire the alert only after its condition has been met for this many consecutive evaluation windows. While the condition is met but fewer than this many consecutive windows have violated, the alert is in the PENDING state.",
		)
		.meta({ examples: [3] }),
});

export const clickStackSqlSavedFilterValueSchema = z.object({
	type: z
		.enum(["sql"])
		.optional()
		.describe("Filter type.")
		.meta({ examples: ["sql"] }),
	condition: z
		.string()
		.describe(
			"SQL filter condition. For example use expressions in the form \"column IN ('value')\".",
		)
		.meta({ examples: ["ServiceName IN ('hdx-oss-dev-api')"] }),
});

export const clickStackVariableSavedFilterValueSchema = z.object({
	type: z
		.enum(["variable"])
		.describe("Filter type.")
		.meta({ examples: ["variable"] }),
	name: z
		.string()
		.describe(
			"The variableName of the dashboard variable this selection belongs to. Only allowed for variable-enabled filters.",
		)
		.meta({ examples: ["service"] }),
	values: z
		.array(z.string())
		.describe("Selected values")
		.meta({ examples: [["hdx-oss-dev-api"]] }),
});

export const clickStackSavedFilterValueSchema = z.discriminatedUnion("type", [
	clickStackSqlSavedFilterValueSchema.strict(),
	clickStackVariableSavedFilterValueSchema.strict(),
]);

export const clickStackNumberFormatSchema = z.object({
	output: z
		.enum(["currency", "percent", "byte", "time", "number", "data_rate", "throughput", "duration"])
		.optional()
		.describe("Output format applied to the number.")
		.meta({ examples: ["number"] }),
	mantissa: z
		.int()
		.optional()
		.describe("Number of decimal places.")
		.meta({ examples: [2] }),
	thousandSeparated: z
		.boolean()
		.optional()
		.describe("Whether to use thousand separators.")
		.meta({ examples: [true] }),
	average: z
		.boolean()
		.optional()
		.describe("Whether to show as average.")
		.meta({ examples: [false] }),
	decimalBytes: z
		.boolean()
		.optional()
		.describe("Use decimal bytes (1000) vs binary bytes (1024).")
		.meta({ examples: [false] }),
	factor: z
		.number()
		.optional()
		.describe("Multiplication factor.")
		.meta({ examples: [1] }),
	currencySymbol: z
		.string()
		.optional()
		.describe("Currency symbol for currency format.")
		.meta({ examples: ["$"] }),
	numericUnit: z
		.enum([
			"bytes_iec",
			"bytes_si",
			"bits_iec",
			"bits_si",
			"kibibytes",
			"kilobytes",
			"mebibytes",
			"megabytes",
			"gibibytes",
			"gigabytes",
			"tebibytes",
			"terabytes",
			"pebibytes",
			"petabytes",
			"packets_sec",
			"bytes_sec_iec",
			"bytes_sec_si",
			"bits_sec_iec",
			"bits_sec_si",
			"kibibytes_sec",
			"kibibits_sec",
			"kilobytes_sec",
			"kilobits_sec",
			"mebibytes_sec",
			"mebibits_sec",
			"megabytes_sec",
			"megabits_sec",
			"gibibytes_sec",
			"gibibits_sec",
			"gigabytes_sec",
			"gigabits_sec",
			"tebibytes_sec",
			"tebibits_sec",
			"terabytes_sec",
			"terabits_sec",
			"pebibytes_sec",
			"pebibits_sec",
			"petabytes_sec",
			"petabits_sec",
			"cps",
			"ops",
			"rps",
			"reads_sec",
			"wps",
			"iops",
			"cpm",
			"opm",
			"rpm_reads",
			"wpm",
		])
		.optional()
		.describe("Numeric unit for data, data rate, or throughput formats.")
		.meta({ examples: ["bytes_iec"] }),
	unit: z
		.string()
		.optional()
		.describe("Custom unit label.")
		.meta({ examples: ["ms"] }),
});

export const clickStackBackgroundChartSchema = z.object({
	type: z
		.enum(["line", "area"])
		.describe("Sparkline shape.")
		.meta({ examples: ["line"] }),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.optional()
		.describe(
			"Optional palette-token override for the sparkline. When unset the sparkline inherits the tile's static color.",
		),
});

export const clickStackNumericColorConditionSchema = z.object({
	operator: z
		.enum(["gt", "gte", "lt", "lte"])
		.describe("Numeric comparison operator.")
		.meta({ examples: ["gt"] }),
	value: z
		.number()
		.describe(
			"Numeric bound the displayed value is compared against. Only finite numbers are accepted (Infinity and NaN are rejected).",
		)
		.meta({ examples: [100] }),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.describe("Color applied when the rule matches."),
	label: z
		.string()
		.optional()
		.describe("Optional label describing the rule.")
		.meta({ examples: ["High"] }),
});

export const clickStackBetweenColorConditionSchema = z.object({
	operator: z
		.enum(["between"])
		.describe("Range comparison operator.")
		.meta({ examples: ["between"] }),
	value: z
		.array(z.number())
		.describe("Inclusive [min, max] range. Both bounds must be finite numbers.")
		.meta({ examples: [[100, 500]] }),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.describe("Color applied when the rule matches."),
	label: z
		.string()
		.optional()
		.describe("Optional label describing the rule.")
		.meta({ examples: ["Warning"] }),
});

export const clickStackEqualityColorConditionSchema = z.object({
	operator: z
		.enum(["eq", "neq"])
		.describe("Equality comparison operator.")
		.meta({ examples: ["eq"] }),
	value: z
		.union([z.number(), z.string()])
		.describe("A finite number, or a string up to 200 characters, to compare for equality."),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.describe("Color applied when the rule matches."),
	label: z
		.string()
		.optional()
		.describe("Optional label describing the rule.")
		.meta({ examples: ["Healthy"] }),
});

export const clickStackNumberTileColorConditionSchema = z.union([
	clickStackNumericColorConditionSchema.strict(),
	clickStackBetweenColorConditionSchema.strict(),
	clickStackEqualityColorConditionSchema.strict(),
]);

export const clickStackTimeChartSeriesSchema = z.object({
	type: z
		.enum(["time"])
		.describe('Series type discriminator. Must be "time" for time-series charts.')
		.meta({ examples: ["time"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	aggFn: z
		.enum([
			"avg",
			"count",
			"count_distinct",
			"last_value",
			"max",
			"min",
			"quantile",
			"sum",
			"any",
			"none",
		])
		.describe("Aggregation function to apply to the field or metric value")
		.meta({ examples: ["count"] }),
	level: z
		.number()
		.optional()
		.describe("Percentile level for quantile aggregations (e.g., 0.95 for p95)")
		.meta({ examples: [0.95] }),
	field: z
		.string()
		.optional()
		.describe(
			"Column or expression to aggregate (required for most aggregation functions except count)",
		)
		.meta({ examples: ["duration"] }),
	alias: z
		.string()
		.optional()
		.describe("Display name for the series in the chart")
		.meta({ examples: ["Request Duration"] }),
	where: z
		.string()
		.describe("Filter query for the data (syntax depends on whereLanguage)")
		.meta({ examples: ["service:api"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.describe("Query language for the where clause")
		.meta({ examples: ["lucene"] }),
	groupBy: z
		.array(z.string())
		.describe("Fields to group results by (creates separate series for each group)")
		.meta({ examples: [["host"]] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	metricDataType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric data type, only for metrics data sources.")
		.meta({ examples: ["sum"] }),
	metricName: z
		.string()
		.optional()
		.describe("Metric name for metrics data sources")
		.meta({ examples: ["http.server.duration"] }),
	displayType: z
		.enum(["stacked_bar", "line"])
		.optional()
		.describe("Visual representation type for the time series")
		.meta({ examples: ["line"] }),
});

export const clickStackTableChartSeriesSchema = z.object({
	type: z
		.enum(["table"])
		.describe('Series type discriminator. Must be "table" for table charts.')
		.meta({ examples: ["table"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	aggFn: z
		.enum([
			"avg",
			"count",
			"count_distinct",
			"last_value",
			"max",
			"min",
			"quantile",
			"sum",
			"any",
			"none",
		])
		.describe("Aggregation function to apply to the field or metric value")
		.meta({ examples: ["count"] }),
	level: z
		.number()
		.optional()
		.describe("Percentile level for quantile aggregations (e.g., 0.95 for p95)")
		.meta({ examples: [0.95] }),
	field: z
		.string()
		.optional()
		.describe(
			"Column or expression to aggregate (required for most aggregation functions except count)",
		)
		.meta({ examples: ["duration"] }),
	alias: z
		.string()
		.optional()
		.describe("Display name for the series")
		.meta({ examples: ["Total Count"] }),
	where: z
		.string()
		.describe("Filter query for the data (syntax depends on whereLanguage)")
		.meta({ examples: ["level:error"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.describe("Query language for the where clause")
		.meta({ examples: ["lucene"] }),
	groupBy: z
		.array(z.string())
		.describe("Fields to group results by (creates separate rows for each group)")
		.meta({ examples: [["errorType"]] }),
	sortOrder: z
		.enum(["desc", "asc"])
		.optional()
		.describe("Sort order for table rows")
		.meta({ examples: ["desc"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	metricDataType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric data type, only for metrics data sources.")
		.meta({ examples: ["sum"] }),
	metricName: z
		.string()
		.optional()
		.describe("Metric name for metrics data sources")
		.meta({ examples: ["http.server.duration"] }),
});

export const clickStackNumberChartSeriesSchema = z.object({
	type: z
		.enum(["number"])
		.describe('Series type discriminator. Must be "number" for single-value number charts.')
		.meta({ examples: ["number"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	aggFn: z
		.enum([
			"avg",
			"count",
			"count_distinct",
			"last_value",
			"max",
			"min",
			"quantile",
			"sum",
			"any",
			"none",
		])
		.describe("Aggregation function to apply to the field or metric value")
		.meta({ examples: ["count"] }),
	level: z
		.number()
		.optional()
		.describe("Percentile level for quantile aggregations (e.g., 0.95 for p95)")
		.meta({ examples: [0.95] }),
	field: z
		.string()
		.optional()
		.describe(
			"Column or expression to aggregate (required for most aggregation functions except count)",
		)
		.meta({ examples: ["duration"] }),
	alias: z
		.string()
		.optional()
		.describe("Display name for the series in the chart")
		.meta({ examples: ["Total Requests"] }),
	where: z
		.string()
		.describe("Filter query for the data (syntax depends on whereLanguage)")
		.meta({ examples: ["service:api"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.describe("Query language for the where clause")
		.meta({ examples: ["lucene"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	metricDataType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric data type, only for metrics data sources.")
		.meta({ examples: ["sum"] }),
	metricName: z
		.string()
		.optional()
		.describe("Metric name for metrics data sources.")
		.meta({ examples: ["http.server.duration"] }),
});

export const clickStackSearchChartSeriesSchema = z.object({
	type: z
		.enum(["search"])
		.describe('Series type discriminator. Must be "search" for search/log viewer charts.')
		.meta({ examples: ["search"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	fields: z
		.array(z.string())
		.describe("List of field names to display in the search results table")
		.meta({ examples: [["timestamp", "level", "message"]] }),
	where: z
		.string()
		.describe("Filter query for the data (syntax depends on whereLanguage)")
		.meta({ examples: ["level:error"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.describe("Query language for the where clause")
		.meta({ examples: ["lucene"] }),
});

export const clickStackMarkdownChartSeriesSchema = z.object({
	type: z
		.enum(["markdown"])
		.describe('Series type discriminator. Must be "markdown" for markdown text widgets.')
		.meta({ examples: ["markdown"] }),
	content: z
		.string()
		.describe("Markdown content to render inside the widget.")
		.meta({ examples: ["# Dashboard Title\n\nThis is a markdown widget."] }),
});

export const clickStackDashboardChartSeriesSchema = z.discriminatedUnion("type", [
	clickStackTimeChartSeriesSchema.strict(),
	clickStackTableChartSeriesSchema.strict(),
	clickStackNumberChartSeriesSchema.strict(),
	clickStackSearchChartSeriesSchema.strict(),
	clickStackMarkdownChartSeriesSchema.strict(),
]);

export const clickStackSelectItemSchema = z.object({
	aggFn: z
		.enum([
			"avg",
			"count",
			"count_distinct",
			"last_value",
			"max",
			"min",
			"quantile",
			"sum",
			"any",
			"none",
		])
		.describe(
			'Aggregation function to apply. "count" does not require a valueExpression; "quantile" requires a level field indicating the desired percentile (e.g., 0.95).',
		)
		.meta({ examples: ["count"] }),
	valueExpression: z
		.string()
		.optional()
		.describe(
			'Expression for the column or value to aggregate. Must be omitted when aggFn is "count"; required for all other aggFn values.',
		)
		.meta({ examples: ["Duration"] }),
	alias: z
		.string()
		.optional()
		.describe("Display alias for this select item in chart legends.")
		.meta({ examples: ["Request Duration"] }),
	level: z
		.union([z.literal("0.5"), z.literal("0.9"), z.literal("0.95"), z.literal("0.99")])
		.optional()
		.describe('Percentile level; only valid when aggFn is "quantile".'),
	where: z
		.string()
		.optional()
		.describe("SQL or Lucene filter condition applied before aggregation.")
		.meta({ examples: ["service:api"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Query language for the where clause."),
	metricName: z
		.string()
		.optional()
		.describe(
			"Name of the metric to aggregate; only applicable when the source is a metrics source.",
		)
		.meta({ examples: ["http.server.duration"] }),
	metricType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric type; only applicable when the source is a metrics source."),
	periodAggFn: z
		.enum(["delta"])
		.optional()
		.describe(
			"Optional period aggregation function for Gauge metrics (e.g., compute the delta over the period).",
		)
		.meta({ examples: ["delta"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
});

export const clickStackFormulaSchema = z.object({
	expression: z
		.string()
		.describe(
			'Arithmetic expression over the select items by position, e.g. "A / (A + B) * 100" for a success-rate percentage.',
		)
		.meta({ examples: ["A / (A + B) * 100"] }),
	alias: z
		.string()
		.optional()
		.describe(
			"Display label for the formula series in chart legends and column headers. Falls back to the raw expression text when unset.",
		)
		.meta({ examples: ["Success rate %"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
});

export const clickStackLineBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["line"])
		.describe('Display type discriminator. Must be "line" for line charts.')
		.meta({ examples: ["line"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe(
			"One or more aggregated values to plot. When asRatio is true, exactly two select items are required.",
		),
	groupBy: z
		.string()
		.optional()
		.describe("Field expression to group results by (creates separate lines per group value).")
		.meta({ examples: ["host"] }),
	asRatio: z
		.boolean()
		.optional()
		.describe("Plot select[0] / select[1] as a ratio. Requires exactly two select items."),
	alignDateRangeToGranularity: z
		.boolean()
		.optional()
		.describe("Expand date range boundaries to the query granularity interval."),
	fillNulls: z
		.boolean()
		.optional()
		.describe("Fill missing time buckets with zero instead of leaving gaps."),
	fitYAxisToData: z
		.boolean()
		.optional()
		.describe(
			"Set the y-axis lower bound to the minimum of the displayed data instead of zero, making small fluctuations between series easier to see.",
		),
	numberFormat: clickStackNumberFormatSchema.optional(),
	compareToPreviousPeriod: z
		.boolean()
		.optional()
		.describe("Overlay the equivalent previous time period for comparison."),
	seriesLimit: z
		.int()
		.optional()
		.describe(
			"Maximum number of series rendered (top-N by value). Omit to use the default render cap, set 0 for unlimited, or a positive N to keep the top N series.",
		)
		.meta({ examples: [5] }),
	formulas: z
		.array(clickStackFormulaSchema)
		.optional()
		.describe(
			'Derived series computed from the select items via letter-ref arithmetic ("A" = select[0], "B" = select[1], ...). Metric, log, and trace sources only. Cannot be combined with asRatio.',
		),
	showOperandSeries: z
		.boolean()
		.optional()
		.describe(
			"Only meaningful with formulas. When false, only the formula series are returned; the raw operand series are hidden.",
		),
});

export const clickStackBarBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["stacked_bar"])
		.describe('Display type discriminator. Must be "stacked_bar" for stacked-bar charts.')
		.meta({ examples: ["stacked_bar"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe(
			"One or more aggregated values to plot. When asRatio is true, exactly two select items are required.",
		),
	groupBy: z
		.string()
		.optional()
		.describe(
			"Field expression to group results by (creates separate bars segments per group value).",
		)
		.meta({ examples: ["service"] }),
	asRatio: z
		.boolean()
		.optional()
		.describe("Plot select[0] / select[1] as a ratio. Requires exactly two select items."),
	alignDateRangeToGranularity: z
		.boolean()
		.optional()
		.describe("Align the date range boundaries to the query granularity interval."),
	fillNulls: z
		.boolean()
		.optional()
		.describe("Fill missing time buckets with zero instead of leaving gaps."),
	numberFormat: clickStackNumberFormatSchema.optional(),
	seriesLimit: z
		.int()
		.optional()
		.describe(
			"Maximum number of series rendered (top-N by value). Omit to use the default render cap, set 0 for unlimited, or a positive N to keep the top N series.",
		)
		.meta({ examples: [5] }),
	formulas: z
		.array(clickStackFormulaSchema)
		.optional()
		.describe(
			'Derived series computed from the select items via letter-ref arithmetic ("A" = select[0], "B" = select[1], ...). Metric, log, and trace sources only. Cannot be combined with asRatio.',
		),
	showOperandSeries: z
		.boolean()
		.optional()
		.describe(
			"Only meaningful with formulas. When false, only the formula series are returned; the raw operand series are hidden.",
		),
});

export const clickStackOnClickTargetIdVariantSchema = z.object({
	mode: z
		.enum(["id"])
		.describe("Target is a single dashboard or log/trace source")
		.meta({ examples: ["id"] }),
	id: z
		.string()
		.describe("ID of the target source (for search) or dashboard (for dashboard).")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
});

export const clickStackOnClickTargetTemplateVariantSchema = z.object({
	mode: z
		.enum(["template"])
		.describe("Target is matched by name against the template.")
		.meta({ examples: ["template"] }),
	template: z
		.string()
		.describe("Name template rendered against the clicked row; supports `{{column}}` variables.")
		.meta({ examples: ["{{ServiceName}}"] }),
});

export const clickStackOnClickTargetSchema = z.discriminatedUnion("mode", [
	clickStackOnClickTargetIdVariantSchema.strict(),
	clickStackOnClickTargetTemplateVariantSchema.strict(),
]);

export const clickStackOnClickFilterTemplateSchema = z.object({
	kind: z
		.enum(["expressionTemplate"])
		.describe('Filter template kind. Currently only "expressionTemplate" is supported.')
		.meta({ examples: ["expressionTemplate"] }),
	expression: z
		.string()
		.describe('The column/expression to filter the destination by (e.g. "ServiceName").')
		.meta({ examples: ["ServiceName"] }),
	template: z
		.string()
		.describe(
			"Value template rendered against the clicked row; supports row column variables in `{{column}}` form (e.g. `{{ServiceName}}`).",
		)
		.meta({ examples: ["{{ServiceName}}"] }),
});

export const clickStackOnClickSearchSchema = z.object({
	type: z
		.enum(["search"])
		.describe('OnClick variant discriminator. Must be "search" for search link-outs.')
		.meta({ examples: ["search"] }),
	target: clickStackOnClickTargetSchema,
	whereTemplate: z
		.string()
		.optional()
		.describe("Optional WHERE clause template applied to the destination search.")
		.meta({ examples: ["ServiceName = '{{ServiceName}}'"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Language of the rendered whereTemplate."),
	filters: z
		.array(clickStackOnClickFilterTemplateSchema)
		.optional()
		.describe("Optional dashboard filter templates rendered against the clicked row."),
});

export const clickStackOnClickDashboardSchema = z.object({
	type: z
		.enum(["dashboard"])
		.describe('OnClick variant discriminator. Must be "dashboard" for dashboard link-outs.')
		.meta({ examples: ["dashboard"] }),
	target: clickStackOnClickTargetSchema,
	whereTemplate: z
		.string()
		.optional()
		.describe("Optional WHERE clause template applied to the destination dashboard.")
		.meta({ examples: ["ServiceName = '{{ServiceName}}'"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Language of the rendered whereTemplate."),
	filters: z
		.array(clickStackOnClickFilterTemplateSchema)
		.optional()
		.describe("Optional dashboard filter templates rendered against the clicked row."),
});

export const clickStackOnClickExternalSchema = z.object({
	type: z
		.enum(["external"])
		.describe('OnClick variant discriminator. Must be "external" for external link-outs.')
		.meta({ examples: ["external"] }),
	urlTemplate: z
		.string()
		.describe(
			"Handlebars template rendered against the clicked row; supports `{{column}}` variables. The rendered value must be an absolute http(s) URL.",
		)
		.meta({ examples: ["https://example.com/d/abc?var-service={{ServiceName}}"] }),
});

export const clickStackOnClickSchema = z.discriminatedUnion("type", [
	clickStackOnClickSearchSchema.strict(),
	clickStackOnClickDashboardSchema.strict(),
	clickStackOnClickExternalSchema.strict(),
]);

export const clickStackTableBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["table"])
		.describe('Display type discriminator. Must be "table" for table charts.')
		.meta({ examples: ["table"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe(
			"One or more aggregated values to display as table columns. When asRatio is true, exactly two select items are required.",
		),
	groupBy: z
		.string()
		.optional()
		.describe("Field expression to group results by (one row per group value).")
		.meta({ examples: ["service"] }),
	having: z
		.string()
		.optional()
		.describe("Post-aggregation SQL HAVING condition.")
		.meta({ examples: ["count > 100"] }),
	orderBy: z
		.string()
		.optional()
		.describe("SQL ORDER BY expression for sorting table rows.")
		.meta({ examples: ["count DESC"] }),
	asRatio: z
		.boolean()
		.optional()
		.describe("Display select[0] / select[1] as a ratio. Requires exactly two select items.")
		.meta({ examples: [false] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	groupByColumnsOnLeft: z
		.boolean()
		.optional()
		.describe(
			"When true, render Group By columns to the left of series columns in the table. Defaults to false (Group By columns on the right).",
		)
		.meta({ examples: [false] }),
	onClick: clickStackOnClickSchema.optional(),
	formulas: z
		.array(clickStackFormulaSchema)
		.optional()
		.describe(
			'Derived columns computed from the select items via letter-ref arithmetic ("A" = select[0], "B" = select[1], ...). Metric, log, and trace sources only. Cannot be combined with asRatio.',
		),
	showOperandSeries: z
		.boolean()
		.optional()
		.describe(
			"Only meaningful with formulas. When false, only the formula columns are returned; the raw operand columns are hidden.",
		),
});

export const clickStackNumberBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["number"])
		.describe('Display type discriminator. Must be "number" for single big-number charts.')
		.meta({ examples: ["number"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe(
			'Exactly one aggregated value to display as a single number — unless "formulas" is set, in which case the select items are the formula\'s operands and the (single) formula value is displayed instead.',
		),
	formulas: z
		.array(clickStackFormulaSchema)
		.optional()
		.describe(
			'A single derived value computed from the select items via letter-ref arithmetic ("A" = select[0], "B" = select[1], ...). Metric, log, and trace sources only. Number tiles display the formula value and always hide the operand series.',
		),
	numberFormat: clickStackNumberFormatSchema.optional(),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.optional()
		.describe("Optional static color applied to the displayed number."),
	colorRules: z
		.array(clickStackNumberTileColorConditionSchema)
		.optional()
		.describe(
			"Ordered conditional color rules evaluated against the displayed value (last match wins). Falls back to color, then the default text color when no rule matches.",
		),
	backgroundChart: clickStackBackgroundChartSchema.optional(),
});

export const clickStackPieBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["pie"])
		.describe('Display type discriminator. Must be "pie" for pie charts.')
		.meta({ examples: ["pie"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe("Exactly one aggregated value used to size each pie slice."),
	groupBy: z
		.string()
		.optional()
		.describe("Field expression to group results by (one slice per group value).")
		.meta({ examples: ["service"] }),
	orderBy: z
		.string()
		.optional()
		.describe(
			'Optional custom SQL ORDER BY expression (raw SQL). Overrides the default value-descending ordering and, when combined with "limit", controls which slices are kept.',
		)
		.meta({ examples: ['"Count" DESC'] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	limit: z
		.int()
		.optional()
		.describe(
			'Maximum number of slices (SQL LIMIT). Without a custom "orderBy" the query keeps the groups with the largest aggregated values; with an "orderBy" it keeps the first slices in that order. Omit or set 0 to fetch all groups.',
		)
		.meta({ examples: [10] }),
});

export const clickStackCategoricalBarBuilderChartConfigSchema = z.object({
	displayType: z
		.enum(["bar"])
		.describe('Display type discriminator. Must be "bar" for categorical bar charts.')
		.meta({ examples: ["bar"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.array(clickStackSelectItemSchema)
		.describe("Exactly one aggregated value used to size each bar."),
	groupBy: z
		.string()
		.optional()
		.describe("Field expression to group results by (one bar per group value).")
		.meta({ examples: ["service"] }),
	orderBy: z
		.string()
		.optional()
		.describe(
			'Optional custom SQL ORDER BY expression (raw SQL). Overrides the default value-descending ordering and, when combined with "limit", controls which bars are kept.',
		)
		.meta({ examples: ['"Count" DESC'] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	limit: z
		.int()
		.optional()
		.describe(
			'Maximum number of bars (SQL LIMIT). Without a custom "orderBy" the query keeps the groups with the largest aggregated values; with an "orderBy" it keeps the first bars in that order. Omit or set 0 to fetch all groups.',
		)
		.meta({ examples: [10] }),
});

export const clickStackHeatmapSelectItemSchema = z.object({
	valueExpression: z
		.string()
		.describe("SQL expression for the value being bucketed on the y-axis. Must be non-empty.")
		.meta({ examples: ["Duration"] }),
	countExpression: z
		.string()
		.optional()
		.describe(
			'SQL expression for the count contributing to each bucket. Defaults to "count()" in the editor when omitted.',
		)
		.meta({ examples: ["count()"] }),
	heatmapScaleType: z
		.enum(["log", "linear"])
		.optional()
		.describe("Scale type used to bucket values on the y-axis.")
		.meta({ examples: ["log"] }),
});

export const clickStackHeatmapChartConfigSchema = z.object({
	displayType: z
		.enum(["heatmap"])
		.describe('Display type discriminator. Must be "heatmap" for heatmap tiles.')
		.meta({ examples: ["heatmap"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z.array(clickStackHeatmapSelectItemSchema).describe("Exactly one heatmap select item."),
	where: z
		.string()
		.optional()
		.describe("Row-level filter (syntax depends on whereLanguage).")
		.meta({ examples: ["ServiceName = 'api'"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Query language for the where clause."),
	numberFormat: clickStackNumberFormatSchema.optional(),
});

export const clickStackSearchChartConfigSchema = z.object({
	displayType: z
		.enum(["search"])
		.describe('Display type discriminator. Must be "search" for search/log viewer tiles.')
		.meta({ examples: ["search"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to query.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.string()
		.describe("Comma-separated list of expressions to display.")
		.meta({ examples: ["timestamp, level, message"] }),
	where: z
		.string()
		.optional()
		.describe("Filter condition for the search (syntax depends on whereLanguage).")
		.meta({ examples: ["level:error"] }),
	whereLanguage: z.enum(["sql", "lucene"]).describe("Query language for the where clause."),
});

export const clickStackEventPatternsChartConfigSchema = z.object({
	displayType: z
		.enum(["event_patterns"])
		.describe('Display type discriminator. Must be "event_patterns" for pattern mining tiles.')
		.meta({ examples: ["event_patterns"] }),
	sourceId: z
		.string()
		.describe("ID of the data source to mine patterns from.")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	select: z
		.string()
		.optional()
		.describe(
			"Column or expression to mine patterns from. Leave empty to use the source default (Body for logs, SpanName for traces).",
		)
		.meta({ examples: ["Body"] }),
	where: z
		.string()
		.optional()
		.describe("Filter condition for the pattern mining query (syntax depends on whereLanguage).")
		.meta({ examples: ["level:error"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Query language for the where clause."),
});

export const clickStackMarkdownChartConfigSchema = z.object({
	displayType: z
		.enum(["markdown"])
		.describe('Display type discriminator. Must be "markdown" for markdown text tiles.')
		.meta({ examples: ["markdown"] }),
	markdown: z
		.string()
		.optional()
		.describe("Markdown content to render inside the tile.")
		.meta({ examples: ["# Dashboard Title\n\nThis is a markdown widget."] }),
});

export const clickStackLineRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["line"])
		.describe("Display as a line time-series chart.")
		.meta({ examples: ["line"] }),
	compareToPreviousPeriod: z
		.boolean()
		.optional()
		.describe("Overlay the equivalent previous time period for comparison."),
	fillNulls: z
		.boolean()
		.optional()
		.describe("Fill missing time buckets with zero instead of leaving gaps."),
	alignDateRangeToGranularity: z
		.boolean()
		.optional()
		.describe("Expand date range boundaries to the query granularity interval."),
	fitYAxisToData: z
		.boolean()
		.optional()
		.describe(
			"Set the y-axis lower bound to the minimum of the displayed data instead of zero, making small fluctuations between series easier to see.",
		),
});

export const clickStackBarRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["stacked_bar"])
		.describe("Display as a stacked-bar time-series chart.")
		.meta({ examples: ["stacked_bar"] }),
	fillNulls: z
		.boolean()
		.optional()
		.describe("Fill missing time buckets with zero instead of leaving gaps."),
	alignDateRangeToGranularity: z
		.boolean()
		.optional()
		.describe("Expand date range boundaries to the query granularity interval."),
});

export const clickStackTableRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["table"])
		.describe("Display as a table chart.")
		.meta({ examples: ["table"] }),
	onClick: clickStackOnClickSchema.optional(),
});

export const clickStackNumberRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["number"])
		.describe("Display as a single big-number chart.")
		.meta({ examples: ["number"] }),
	color: z
		.enum([
			"chart-blue",
			"chart-orange",
			"chart-red",
			"chart-cyan",
			"chart-green",
			"chart-pink",
			"chart-purple",
			"chart-light-blue",
			"chart-brown",
			"chart-gray",
			"chart-success",
			"chart-warning",
			"chart-error",
		])
		.optional()
		.describe(
			"Optional static color applied to the displayed number. Raw SQL number tiles do not support conditional colorRules.",
		),
});

export const clickStackPieRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["pie"])
		.describe("Display as a pie chart.")
		.meta({ examples: ["pie"] }),
});

export const clickStackCategoricalBarRawSqlChartConfigSchema = z.object({
	configType: z
		.enum(["sql"])
		.describe('Must be "sql" to use the Raw SQL chart config variant.')
		.meta({ examples: ["sql"] }),
	connectionId: z
		.string()
		.describe("ID of the ClickHouse connection to execute the query against.")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	sqlTemplate: z
		.string()
		.describe("SQL query template to execute. Supports HyperDX template variables.")
		.meta({
			examples: ["SELECT count() FROM otel_logs WHERE timestamp > now() - INTERVAL 1 HOUR"],
		}),
	sourceId: z
		.string()
		.optional()
		.describe(
			"Optional ID of the data source associated with this Raw SQL chart. Used for applying dashboard filters.",
		)
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	numberFormat: clickStackNumberFormatSchema.optional(),
	displayType: z
		.enum(["bar"])
		.describe("Display as a categorical bar chart.")
		.meta({ examples: ["bar"] }),
});

export const clickStackLineChartConfigSchema = z.union([
	clickStackLineBuilderChartConfigSchema.strict(),
	clickStackLineRawSqlChartConfigSchema.strict(),
]);

export const clickStackBarChartConfigSchema = z.union([
	clickStackBarBuilderChartConfigSchema.strict(),
	clickStackBarRawSqlChartConfigSchema.strict(),
]);

export const clickStackTableChartConfigSchema = z.union([
	clickStackTableBuilderChartConfigSchema.strict(),
	clickStackTableRawSqlChartConfigSchema.strict(),
]);

export const clickStackNumberChartConfigSchema = z.union([
	clickStackNumberBuilderChartConfigSchema.strict(),
	clickStackNumberRawSqlChartConfigSchema.strict(),
]);

export const clickStackPieChartConfigSchema = z.union([
	clickStackPieBuilderChartConfigSchema.strict(),
	clickStackPieRawSqlChartConfigSchema.strict(),
]);

export const clickStackCategoricalBarChartConfigSchema = z.union([
	clickStackCategoricalBarBuilderChartConfigSchema.strict(),
	clickStackCategoricalBarRawSqlChartConfigSchema.strict(),
]);

export const clickStackTileConfigSchema = z.union([
	clickStackLineChartConfigSchema,
	clickStackBarChartConfigSchema,
	clickStackTableChartConfigSchema,
	clickStackNumberChartConfigSchema,
	clickStackPieChartConfigSchema,
	clickStackCategoricalBarChartConfigSchema,
	clickStackHeatmapChartConfigSchema.strict(),
	clickStackSearchChartConfigSchema.strict(),
	clickStackEventPatternsChartConfigSchema.strict(),
	clickStackMarkdownChartConfigSchema.strict(),
]);

export const clickStackDashboardContainerTabSchema = z.object({
	id: z
		.string()
		.describe("Unique identifier for the tab within its container.")
		.meta({ examples: ["errors"] }),
	title: z
		.string()
		.describe("Display title for the tab.")
		.meta({ examples: ["Errors"] }),
});

export const clickStackDashboardContainerSchema = z.object({
	id: z
		.string()
		.describe("Unique identifier for the container within the dashboard.")
		.meta({ examples: ["service-health"] }),
	title: z
		.string()
		.describe("Display title for the container.")
		.meta({ examples: ["Service Health"] }),
	collapsed: z
		.boolean()
		.describe("Persisted default collapse state. Per-viewer state lives in the URL.")
		.meta({ examples: [false] }),
	collapsible: z
		.boolean()
		.optional()
		.describe("Whether the user can collapse the group.")
		.meta({ examples: [true] }),
	bordered: z
		.boolean()
		.optional()
		.describe("Whether to show a visual border around the group.")
		.meta({ examples: [true] }),
	tabs: z
		.array(clickStackDashboardContainerTabSchema)
		.optional()
		.describe(
			"Optional tabs. 2+ entries renders a tab bar; 0-1 entries renders a plain group header. Tiles join a tab via tabId.",
		),
});

export const clickStackTileOutputSchema = z.object({
	name: z
		.string()
		.describe("Display name for the tile")
		.meta({ examples: ["Error Rate"] }),
	x: z
		.int()
		.describe("Horizontal position in the grid (0-based)")
		.meta({ examples: [0] }),
	y: z
		.int()
		.describe("Vertical position in the grid (0-based)")
		.meta({ examples: [0] }),
	w: z
		.int()
		.describe("Width in grid units")
		.meta({ examples: [6] }),
	h: z
		.int()
		.describe("Height in grid units")
		.meta({ examples: [3] }),
	config: clickStackTileConfigSchema.optional(),
	containerId: z
		.string()
		.optional()
		.describe(
			"References a DashboardContainer by id. Tiles without containerId render in the default ungrouped area.",
		)
		.meta({ examples: ["service-health"] }),
	tabId: z
		.string()
		.optional()
		.describe(
			"References a tab inside the tile's container by id. Requires containerId to be set, and the container to declare a matching tab.",
		)
		.meta({ examples: ["errors"] }),
	id: z
		.string()
		.describe("Unique tile ID assigned by the server.")
		.meta({ examples: ["65f5e4a3b9e77c001a901234"] }),
});

export const clickStackTileInputSchema = z.object({
	name: z
		.string()
		.describe("Display name for the tile")
		.meta({ examples: ["Error Rate"] }),
	x: z
		.int()
		.describe("Horizontal position in the grid (0-based)")
		.meta({ examples: [0] }),
	y: z
		.int()
		.describe("Vertical position in the grid (0-based)")
		.meta({ examples: [0] }),
	w: z
		.int()
		.describe("Width in grid units")
		.meta({ examples: [6] }),
	h: z
		.int()
		.describe("Height in grid units")
		.meta({ examples: [3] }),
	config: clickStackTileConfigSchema.optional(),
	containerId: z
		.string()
		.optional()
		.describe(
			"References a DashboardContainer by id. Tiles without containerId render in the default ungrouped area.",
		)
		.meta({ examples: ["service-health"] }),
	tabId: z
		.string()
		.optional()
		.describe(
			"References a tab inside the tile's container by id. Requires containerId to be set, and the container to declare a matching tab.",
		)
		.meta({ examples: ["errors"] }),
	id: z
		.string()
		.optional()
		.describe("Optional tile ID. Omit to generate a new ID.")
		.meta({ examples: ["65f5e4a3b9e77c001a901234"] }),
	asRatio: z
		.boolean()
		.optional()
		.describe(
			'Display two series as a ratio (series[0] / series[1]). Only applicable when providing "series". Deprecated in favor of "config.asRatio".',
		)
		.meta({ examples: [false] }),
	series: z
		.array(clickStackDashboardChartSeriesSchema)
		.optional()
		.describe(
			'Data series to display in this tile (all must be the same type). Deprecated; use "config" instead.',
		),
});

export const clickStackFilterInputSchema = z.object({
	type: z
		.enum(["QUERY_EXPRESSION"])
		.describe('Filter type. Must be "QUERY_EXPRESSION".')
		.meta({ examples: ["QUERY_EXPRESSION"] }),
	name: z
		.string()
		.describe("Display name for the dashboard filter key")
		.meta({ examples: ["Environment"] }),
	expression: z
		.string()
		.describe(
			"SQL expression used when querying values for this filter, and when applying this dashboard filter to tiles.",
		)
		.meta({ examples: ["environment"] }),
	sourceId: z
		.string()
		.describe("Source ID this dashboard filter key applies to")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	sourceMetricType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric type when source is metrics")
		.meta({ examples: ["gauge"] }),
	where: z
		.string()
		.optional()
		.describe("Optional WHERE condition to scope which rows this filter key reads values from")
		.meta({ examples: ["ServiceName:api"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Language of the where condition")
		.meta({ examples: ["lucene"] }),
	appliesToSourceIds: z
		.array(z.string())
		.optional()
		.describe(
			"Optional list of source IDs this filter applies to. Omit or provide an empty array to apply the filter to ALL tiles regardless of source. A non-empty array restricts the filter to only tiles whose source ID is in the list; tiles using other sources are not affected by the selected filter value(s). Scopes the broadcast condition only, so a non-empty array is rejected when isBroadcastEnabled is false, and is omitted from responses for such a filter.",
		)
		.meta({ examples: [["65f5e4a3b9e77c001a111111"]] }),
	isBroadcastEnabled: z
		.boolean()
		.optional()
		.describe(
			"Whether the selected value is applied as a filter condition on every builder tile this filter applies to (see appliesToSourceIds), and every raw sql tile using the $__filters macro. Omitting the field means enabled.",
		)
		.meta({ examples: [false] }),
	isVariableEnabled: z
		.boolean()
		.optional()
		.describe(
			"Whether the selected value is exposed to tile queries as a dashboard variable named by variableName. Tiles may reference it as `$variableName` or using the (preferred) `$__filter($<variableName>)` and `$__conditionalAll(<condition>, $<variableName>)` macros.",
		)
		.meta({ examples: [true] }),
	variableName: z
		.string()
		.optional()
		.describe(
			"Token tiles reference this filter's selected value by, as `$variableName`. Must start with a letter and may contain only letters, numbers, and underscores. Defaults to the display name with whitespace replaced by underscores and remaining illegal characters removed, so a variable-enabled filter whose name derives nothing usable must send this field explicitly. Variable names must be unique across a dashboard's variable-enabled filters. Names the variable only, so the field is rejected when isVariableEnabled is not true, and is omitted from responses for such a filter.",
		)
		.meta({ examples: ["environment"] }),
});

export const clickStackFilterSchema = z.object({
	type: z
		.enum(["QUERY_EXPRESSION"])
		.describe('Filter type. Must be "QUERY_EXPRESSION".')
		.meta({ examples: ["QUERY_EXPRESSION"] }),
	name: z
		.string()
		.describe("Display name for the dashboard filter key")
		.meta({ examples: ["Environment"] }),
	expression: z
		.string()
		.describe(
			"SQL expression used when querying values for this filter, and when applying this dashboard filter to tiles.",
		)
		.meta({ examples: ["environment"] }),
	sourceId: z
		.string()
		.describe("Source ID this dashboard filter key applies to")
		.meta({ examples: ["65f5e4a3b9e77c001a111111"] }),
	sourceMetricType: z
		.enum(["sum", "gauge", "histogram", "summary", "exponential histogram"])
		.optional()
		.describe("Metric type when source is metrics")
		.meta({ examples: ["gauge"] }),
	where: z
		.string()
		.optional()
		.describe("Optional WHERE condition to scope which rows this filter key reads values from")
		.meta({ examples: ["ServiceName:api"] }),
	whereLanguage: z
		.enum(["sql", "lucene"])
		.optional()
		.describe("Language of the where condition")
		.meta({ examples: ["lucene"] }),
	appliesToSourceIds: z
		.array(z.string())
		.optional()
		.describe(
			"Optional list of source IDs this filter applies to. Omit or provide an empty array to apply the filter to ALL tiles regardless of source. A non-empty array restricts the filter to only tiles whose source ID is in the list; tiles using other sources are not affected by the selected filter value(s). Scopes the broadcast condition only, so a non-empty array is rejected when isBroadcastEnabled is false, and is omitted from responses for such a filter.",
		)
		.meta({ examples: [["65f5e4a3b9e77c001a111111"]] }),
	isBroadcastEnabled: z
		.boolean()
		.optional()
		.describe(
			"Whether the selected value is applied as a filter condition on every builder tile this filter applies to (see appliesToSourceIds), and every raw sql tile using the $__filters macro. Omitting the field means enabled.",
		)
		.meta({ examples: [false] }),
	isVariableEnabled: z
		.boolean()
		.optional()
		.describe(
			"Whether the selected value is exposed to tile queries as a dashboard variable named by variableName. Tiles may reference it as `$variableName` or using the (preferred) `$__filter($<variableName>)` and `$__conditionalAll(<condition>, $<variableName>)` macros.",
		)
		.meta({ examples: [true] }),
	variableName: z
		.string()
		.optional()
		.describe(
			"Token tiles reference this filter's selected value by, as `$variableName`. Must start with a letter and may contain only letters, numbers, and underscores. Defaults to the display name with whitespace replaced by underscores and remaining illegal characters removed, so a variable-enabled filter whose name derives nothing usable must send this field explicitly. Variable names must be unique across a dashboard's variable-enabled filters. Names the variable only, so the field is rejected when isVariableEnabled is not true, and is omitted from responses for such a filter.",
		)
		.meta({ examples: ["environment"] }),
	id: z.string().describe("Unique dashboard filter key ID"),
});

export const clickStackCreateDashboardRequestSchema = z.object({
	name: z
		.string()
		.describe("Dashboard name.")
		.meta({ examples: ["New Dashboard"] }),
	tiles: z
		.array(clickStackTileInputSchema)
		.describe("List of tiles/charts to include in the dashboard."),
	tags: z
		.array(z.string())
		.optional()
		.describe("Tags for organizing and filtering dashboards.")
		.meta({ examples: [["development"]] }),
	filters: z
		.array(clickStackFilterInputSchema)
		.optional()
		.describe(
			"Dropdown filters added to the dashboard. Each one broadcasts its selected value as a condition, acts as a variable which can be referenced in tile queries, or both.",
		),
	savedQuery: z
		.string()
		.nullish()
		.describe("Optional default dashboard query to persist on the dashboard.")
		.meta({ examples: ["service.name = 'api'"] }),
	savedQueryLanguage: z
		.enum(["sql", "lucene"])
		.nullish()
		.describe("Query language used by savedQuery.")
		.meta({ examples: ["sql"] }),
	savedFilterValues: z
		.array(clickStackSavedFilterValueSchema)
		.optional()
		.describe("Optional default dashboard filter values to persist on the dashboard."),
	containers: z
		.array(clickStackDashboardContainerSchema)
		.optional()
		.describe(
			"Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.",
		),
});

export const clickStackValidateDashboardErrorSchema = z.object({
	path: z
		.string()
		.describe("Dot-separated field path, or empty string for top-level errors.")
		.meta({ examples: ["tiles.0.config"] }),
	message: z
		.string()
		.describe("Human-readable error description.")
		.meta({ examples: ["Required"] }),
});

export const clickStackValidateDashboardResponseNormalizedSchema = z.object({});

export const clickStackValidateDashboardResponseSchema = z.object({
	valid: z.boolean().describe("True when the body passes all validation rules."),
	errors: z
		.array(clickStackValidateDashboardErrorSchema)
		.describe("Validation errors. Empty when valid is true."),
	normalized: z.union([clickStackValidateDashboardResponseNormalizedSchema.strict(), z.null()]),
});

export const clickStackUpdateDashboardRequestSchema = z.object({
	name: z
		.string()
		.describe("Dashboard name.")
		.meta({ examples: ["Updated Dashboard Name"] }),
	tiles: z
		.array(clickStackTileInputSchema)
		.describe(
			"Full list of tiles for the dashboard. Existing tiles are matched by ID; tiles with an ID that does not match an existing tile will be assigned a new generated ID.",
		),
	tags: z
		.array(z.string())
		.optional()
		.describe("Tags for organizing and filtering dashboards.")
		.meta({ examples: [["production", "updated"]] }),
	filters: z
		.array(clickStackFilterSchema)
		.optional()
		.describe(
			"Dropdown filters added to the dashboard. Each one broadcasts its selected value as a condition, acts as a variable which can be referenced in tile queries, or both.",
		),
	savedQuery: z
		.string()
		.nullish()
		.describe("Optional default dashboard query to persist on the dashboard.")
		.meta({ examples: ["service.name = 'api'"] }),
	savedQueryLanguage: z
		.enum(["sql", "lucene"])
		.nullish()
		.describe("Query language used by savedQuery.")
		.meta({ examples: ["sql"] }),
	savedFilterValues: z
		.array(clickStackSavedFilterValueSchema)
		.optional()
		.describe("Optional default dashboard filter values to persist on the dashboard."),
	containers: z
		.array(clickStackDashboardContainerSchema)
		.optional()
		.describe(
			"Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.",
		),
});

export const clickStackDashboardResponseSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Dashboard ID")
		.meta({ examples: ["65f5e4a3b9e77c001a567890"] }),
	name: z
		.string()
		.optional()
		.describe("Dashboard name")
		.meta({ examples: ["Service Overview"] }),
	tiles: z
		.array(clickStackTileOutputSchema)
		.optional()
		.describe("List of tiles/charts in the dashboard"),
	tags: z
		.array(z.string())
		.optional()
		.describe("Tags for organizing and filtering dashboards")
		.meta({ examples: [["production", "monitoring"]] }),
	filters: z
		.array(clickStackFilterSchema)
		.optional()
		.describe(
			"Dropdown filters added to the dashboard. Each one broadcasts its selected value as a condition, acts as a variable which can be referenced in tile queries, or both.",
		),
	savedQuery: z
		.string()
		.nullish()
		.describe("Optional default dashboard query restored when loading the dashboard.")
		.meta({ examples: ["service.name = 'api'"] }),
	savedQueryLanguage: z
		.enum(["sql", "lucene"])
		.nullish()
		.describe("Query language used by savedQuery.")
		.meta({ examples: ["sql"] }),
	savedFilterValues: z
		.array(clickStackSavedFilterValueSchema)
		.optional()
		.describe("Optional default dashboard filter values restored when loading the dashboard."),
	containers: z
		.array(clickStackDashboardContainerSchema)
		.optional()
		.describe(
			"Optional grouping containers. Each tile may join a container via tile.containerId, and a tab inside it via tile.tabId.",
		),
});

export const clickStackCASLPermissionConditionsSchema = z.looseObject({});

export const clickStackCASLPermissionSchema = z.object({
	action: z
		.string()
		.describe("The action this permission grants or denies.")
		.meta({ examples: ["read"] }),
	subject: z
		.string()
		.describe("The resource the action applies to.")
		.meta({ examples: ["dashboard"] }),
	inverted: z
		.boolean()
		.optional()
		.describe("When true, the rule denies rather than grants the action.")
		.meta({ examples: [false] }),
	integration: z
		.string()
		.optional()
		.describe("The integration the permission is scoped to.")
		.meta({ examples: ["mongodb"] }),
	conditions: clickStackCASLPermissionConditionsSchema.optional(),
});

export const clickStackRoleSchema = z.object({
	id: z
		.string()
		.describe("Role ID.")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
	name: z
		.string()
		.describe("Role name.")
		.meta({ examples: ["Read Only"] }),
	description: z
		.string()
		.optional()
		.describe("Human-readable role description.")
		.meta({ examples: ["Read-only access to all resources"] }),
	permissions: z
		.array(clickStackCASLPermissionSchema)
		.describe("The CASL permissions granted by this role."),
	isPredefined: z
		.boolean()
		.describe("Whether this is an immutable predefined/system role.")
		.meta({ examples: [false] }),
	createdAt: z.iso
		.datetime()
		.optional()
		.describe("Creation timestamp.")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Last update timestamp.")
		.meta({ examples: ["2025-06-15T10:30:00.000Z"] }),
});

export const clickStackCreateRoleRequestSchema = z.object({
	name: z
		.string()
		.describe("Role name. Must be unique within the team and not collide with a predefined role.")
		.meta({ examples: ["Deploy Bot"] }),
	description: z
		.string()
		.optional()
		.describe("Human-readable role description.")
		.meta({ examples: ["Manages dashboards via Terraform"] }),
	permissions: z
		.array(clickStackCASLPermissionSchema)
		.describe("The CASL permissions to grant to the role."),
});

export const clickStackUpdateRoleRequestSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("New role name. Omit to leave the name unchanged.")
		.meta({ examples: ["Deploy Bot"] }),
	description: z
		.string()
		.optional()
		.describe("New role description.")
		.meta({ examples: ["Manages dashboards via Terraform"] }),
	permissions: z
		.array(clickStackCASLPermissionSchema)
		.describe("The replacement set of CASL permissions for the role."),
});

export const clickStackValidationErrorItemErrorsSchema = z.looseObject({});

export const clickStackValidationErrorItemSchema = z.object({
	type: z
		.string()
		.optional()
		.describe("Request part that failed validation.")
		.meta({ examples: ["Body"] }),
	errors: clickStackValidationErrorItemErrorsSchema.optional(),
});

export const clickStackValidationErrorSchema = z
	.array(clickStackValidationErrorItemSchema)
	.describe("zod-express-middleware validation failures.");

export const clickStackSavedSearchFilterSchema = z.object({
	type: z
		.enum(["sql"])
		.optional()
		.describe("Always `sql`. Only SQL predicate filters render in the sidebar.")
		.meta({ examples: ["sql"] }),
	condition: z
		.string()
		.describe("SQL predicate applied to the search, in `<column> IN (...)` form.")
		.meta({ examples: ["ServiceName IN ('checkout', 'payments')"] }),
});

export const clickStackSavedSearchSchema = z.object({
	id: z
		.string()
		.describe("Unique saved search ID. Server-generated.")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
	name: z
		.string()
		.describe("Display name for the saved search.")
		.meta({ examples: ["Production Errors"] }),
	sourceId: z
		.string()
		.describe("ID of the source this saved search queries.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	select: z
		.string()
		.optional()
		.describe(
			"Comma-separated list of column expressions to display. Empty uses the source default.",
		)
		.meta({ examples: ["Timestamp, ServiceName, Body"] }),
	where: z
		.string()
		.optional()
		.describe("Row filter expression. The language is controlled by whereLanguage.")
		.meta({ examples: ["SeverityText:ERROR"] }),
	whereLanguage: z
		.enum(["lucene", "sql"])
		.optional()
		.describe("Language used for the where filter.")
		.meta({ examples: ["lucene"] }),
	orderBy: z
		.string()
		.optional()
		.describe("ORDER BY expression. Empty uses the source default.")
		.meta({ examples: ["Timestamp DESC"] }),
	tags: z
		.array(z.string())
		.optional()
		.describe("Tags used to organize saved searches.")
		.meta({ examples: [["production", "errors"]] }),
	filters: z
		.array(clickStackSavedSearchFilterSchema)
		.optional()
		.describe("Structured pinned filters applied to the search.")
		.meta({
			examples: [['{"type":"sql","condition":"ServiceName IN (\'checkout\', \'payments\')"}']],
		}),
	teamId: z
		.string()
		.optional()
		.describe("ID of the team that owns the saved search.")
		.meta({ examples: ["507f1f77bcf86cd799439013"] }),
	createdAt: z.iso
		.datetime()
		.optional()
		.describe("Creation timestamp.")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
	updatedAt: z.iso
		.datetime()
		.optional()
		.describe("Last update timestamp.")
		.meta({ examples: ["2025-06-15T10:30:00.000Z"] }),
});

export const clickStackSavedSearchInputSchema = z.object({
	name: z
		.string()
		.describe("Display name for the saved search.")
		.meta({ examples: ["Production Errors"] }),
	sourceId: z
		.string()
		.describe("ID of the source to query. Must belong to the team.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	select: z
		.string()
		.optional()
		.describe(
			"Comma-separated list of column expressions to display. Empty uses the source default.",
		)
		.meta({ examples: ["Timestamp, ServiceName, Body"] }),
	where: z
		.string()
		.optional()
		.describe("Row filter expression. The language is controlled by whereLanguage.")
		.meta({ examples: ["SeverityText:ERROR"] }),
	whereLanguage: z
		.enum(["lucene", "sql"])
		.optional()
		.describe("Language used for the where filter.")
		.meta({ examples: ["lucene"] }),
	orderBy: z
		.string()
		.optional()
		.describe("ORDER BY expression. Empty uses the source default.")
		.meta({ examples: ["Timestamp DESC"] }),
	tags: z
		.array(z.string())
		.optional()
		.describe("Tags used to organize saved searches.")
		.meta({ examples: [["production", "errors"]] }),
	filters: z
		.array(clickStackSavedSearchFilterSchema)
		.optional()
		.describe("Structured pinned filters applied to the search.")
		.meta({
			examples: [['{"type":"sql","condition":"ServiceName IN (\'checkout\', \'payments\')"}']],
		}),
});

export const clickStackQuerySettingSchema = z.object({
	setting: z
		.string()
		.describe("ClickHouse setting name")
		.meta({ examples: ["max_threads"] }),
	value: z
		.string()
		.describe("Setting value")
		.meta({ examples: ["4"] }),
});

export const clickStackFilterSettingsColumnSchema = z.object({
	name: z
		.string()
		.describe(
			"Column of the source's table that selected filter values are matched against. Also the key the selection is persisted under in links, saved searches, and dashboards.",
		)
		.meta({ examples: ["ServiceName"] }),
	label: z
		.string()
		.describe("Display label for the column")
		.meta({ examples: ["Service Name"] }),
	valueExpression: z
		.string()
		.nullish()
		.describe(
			"Optional SQL expression, evaluated against the filter-values table, that produces the available filter options. Use it when the options live in a differently-named column, or must be transformed to match the values stored in the source table. Defaults to reading `name` as a plain column when omitted.",
		)
		.meta({ examples: ["lower(service_name)"] }),
	allowAll: z
		.boolean()
		.optional()
		.describe(
			'Whether to offer an "All" option that expands to every available value at query time. Best suited to low-cardinality columns. Defaults to false.',
		)
		.meta({ examples: [false] }),
});

export const clickStackSourceFilterSettingsSchema = z.object({
	databaseName: z
		.string()
		.describe("ClickHouse database name")
		.meta({ examples: ["default"] }),
	tableName: z
		.string()
		.describe("ClickHouse table name")
		.meta({ examples: ["otel_logs"] }),
	columns: z
		.array(clickStackFilterSettingsColumnSchema)
		.describe("Columns to expose as filters (max 10)"),
});

export const clickStackSourceFromSchema = z.object({
	databaseName: z
		.string()
		.describe("ClickHouse database name")
		.meta({ examples: ["otel"] }),
	tableName: z
		.string()
		.describe("ClickHouse table name")
		.meta({ examples: ["otel_logs"] }),
});

export const clickStackMetricSourceFromSchema = z.object({
	databaseName: z
		.string()
		.describe("ClickHouse database name")
		.meta({ examples: ["otel"] }),
	tableName: z
		.string()
		.nullish()
		.describe("ClickHouse table name")
		.meta({ examples: ["otel_metrics_gauge"] }),
});

export const clickStackMetricTablesSchema = z.object({
	gauge: z
		.string()
		.optional()
		.describe("Table containing gauge metrics data")
		.meta({ examples: ["otel_metrics_gauge"] }),
	histogram: z
		.string()
		.optional()
		.describe("Table containing histogram metrics data")
		.meta({ examples: ["otel_metrics_histogram"] }),
	sum: z
		.string()
		.optional()
		.describe("Table containing sum metrics data")
		.meta({ examples: ["otel_metrics_sum"] }),
	summary: z
		.string()
		.optional()
		.describe("Table containing summary metrics data. Note - not yet fully supported by HyperDX")
		.meta({ examples: ["otel_metrics_summary"] }),
	"exponential histogram": z
		.string()
		.optional()
		.describe(
			"Table containing exponential histogram metrics data. Note - not yet fully supported by HyperDX",
		)
		.meta({ examples: ["otel_metrics_exponential_histogram"] }),
});

export const clickStackHighlightedAttributeExpressionSchema = z.object({
	sqlExpression: z
		.string()
		.describe("SQL expression for the attribute")
		.meta({ examples: ["SpanAttributes['http.status_code']"] }),
	luceneExpression: z
		.string()
		.nullish()
		.describe(
			"An optional, Lucene version of the sqlExpression expression. If provided, it is used when searching for this attribute value.",
		)
		.meta({ examples: ["http.status_code"] }),
	alias: z
		.string()
		.nullish()
		.describe("Optional alias for the attribute")
		.meta({ examples: ["HTTP Status Code"] }),
});

export const clickStackAggregatedColumnSchema = z.object({
	sourceColumn: z
		.string()
		.nullish()
		.describe("Source column name")
		.meta({ examples: ["Duration"] }),
	aggFn: z
		.string()
		.describe("Aggregation function (e.g., count, sum, avg)")
		.meta({ examples: ["sum"] }),
	mvColumn: z
		.string()
		.describe("Materialized view column name")
		.meta({ examples: ["sum__Duration"] }),
});

export const clickStackMaterializedViewSchema = z.object({
	databaseName: z
		.string()
		.describe("Database name for the materialized view")
		.meta({ examples: ["otel"] }),
	tableName: z
		.string()
		.describe("Table name for the materialized view")
		.meta({ examples: ["otel_logs_mv_5m"] }),
	dimensionColumns: z
		.string()
		.describe(
			"Columns which are not pre-aggregated in the materialized view and can be used for filtering and grouping.",
		)
		.meta({ examples: ["ServiceName, SeverityText"] }),
	minGranularity: z
		.string()
		.describe(
			"The granularity of the timestamp column: a positive integer followed by a unit (s, m, h, d). Common values: 1s, 15s, 30s, 1m, 5m, 15m, 30m, 1h, 2h, 6h, 12h, 1d, 2d, 7d, 30d.",
		)
		.meta({ examples: ["5m"] }),
	minDate: z.iso
		.datetime()
		.nullish()
		.describe(
			"(Optional) The earliest date and time for which the materialized view contains data. If not provided, then HyperDX will assume that the materialized view contains data for all dates for which the source table contains data.",
		)
		.meta({ examples: ["2025-01-01T00:00:00Z"] }),
	timestampColumn: z
		.string()
		.describe("Timestamp column name")
		.meta({ examples: ["Timestamp"] }),
	aggregatedColumns: z
		.array(clickStackAggregatedColumnSchema)
		.describe("Columns which are pre-aggregated by the materialized view"),
});

export const clickStackLogSourceMetadataMaterializedViewsSchema = z.object({
	keyRollupTable: z
		.string()
		.optional()
		.describe("ClickHouse table name for the key rollup (field discovery).")
		.meta({ examples: ["otel_logs_key_rollup_15m"] }),
	kvRollupTable: z
		.string()
		.optional()
		.describe("ClickHouse table name for the key-value rollup (value autocomplete).")
		.meta({ examples: ["otel_logs_kv_rollup_15m"] }),
	granularity: z
		.string()
		.optional()
		.describe("The time granularity of the rollup tables.")
		.meta({ examples: ["15m"] }),
});

export const clickStackLogSourceSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Unique source ID. Server-generated; ignored if sent in create/update requests.")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
	name: z
		.string()
		.describe("Display name for the source.")
		.meta({ examples: ["Logs"] }),
	section: z
		.string()
		.optional()
		.describe(
			"Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.",
		)
		.meta({ examples: ["Billing"] }),
	disabled: z
		.boolean()
		.nullish()
		.describe("When true, the source is hidden from source selectors in the UI. Defaults to false.")
		.meta({ examples: [false] }),
	kind: z
		.enum(["log"])
		.describe('Source kind discriminator. Must be "log" for log sources.')
		.meta({ examples: ["log"] }),
	connection: z
		.string()
		.describe("ID of the ClickHouse connection used by this source.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	from: clickStackSourceFromSchema,
	querySettings: z
		.array(clickStackQuerySettingSchema)
		.optional()
		.describe("Optional ClickHouse query settings applied when querying this source."),
	filterSettings: z.union([clickStackSourceFilterSettingsSchema.strict(), z.null()]).optional(),
	defaultTableSelectExpression: z
		.string()
		.describe(
			"Default columns selected in search results (this can be customized per search later)",
		)
		.meta({ examples: ["Timestamp, ServiceName, SeverityText, Body"] }),
	timestampValueExpression: z
		.string()
		.describe("DateTime column or expression that is part of your table's primary key.")
		.meta({ examples: ["Timestamp"] }),
	serviceNameExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the service name from log rows.")
		.meta({ examples: ["ServiceName"] }),
	serviceVersionExpression: z
		.string()
		.nullish()
		.describe(
			"Expression identifying the running release of a service. Defaults to the OpenTelemetry service.version resource attribute when unset. Where services carry the release on different attributes, fall back across them with coalesce(nullIf(a, ''), nullIf(b, '')).",
		)
		.meta({ examples: ["ResourceAttributes['service.version']"] }),
	severityTextExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the severity/log level text.")
		.meta({ examples: ["SeverityText"] }),
	bodyExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the log message body.")
		.meta({ examples: ["Body"] }),
	eventAttributesExpression: z
		.string()
		.nullish()
		.describe("Expression to extract event-level attributes.")
		.meta({ examples: ["LogAttributes"] }),
	resourceAttributesExpression: z
		.string()
		.nullish()
		.describe("Expression to extract resource-level attributes.")
		.meta({ examples: ["ResourceAttributes"] }),
	displayedTimestampValueExpression: z
		.string()
		.nullish()
		.describe("This DateTime column is used to display and order search results.")
		.meta({ examples: ["TimestampTime"] }),
	metricSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for metrics associated with logs. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439013"] }),
	traceSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for traces associated with logs. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439014"] }),
	traceIdExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the trace ID for correlating logs with traces.")
		.meta({ examples: ["TraceId"] }),
	spanIdExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the span ID for correlating logs with traces.")
		.meta({ examples: ["SpanId"] }),
	implicitColumnExpression: z
		.string()
		.nullish()
		.describe(
			"Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.",
		)
		.meta({ examples: ["Body"] }),
	knownColumnsListExpression: z
		.string()
		.nullish()
		.describe(
			"For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns.",
		)
		.meta({ examples: ["Timestamp, Body, ServiceName"] }),
	useTextIndexForImplicitColumn: z
		.enum(["auto", "enabled", "disabled"])
		.nullish()
		.describe(
			'Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback.',
		)
		.meta({ examples: ["auto"] }),
	highlightedTraceAttributeExpressions: z
		.array(clickStackHighlightedAttributeExpressionSchema)
		.optional()
		.describe(
			"Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.",
		),
	highlightedRowAttributeExpressions: z
		.array(clickStackHighlightedAttributeExpressionSchema)
		.optional()
		.describe(
			"Expressions defining row-level attributes which are displayed in the row side panel for the selected row.",
		),
	materializedViews: z
		.array(clickStackMaterializedViewSchema)
		.optional()
		.describe(
			"Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.",
		),
	metadataMaterializedViews: z
		.union([clickStackLogSourceMetadataMaterializedViewsSchema.strict(), z.null()])
		.optional(),
});

export const clickStackTraceSourceMetadataMaterializedViewsSchema = z.object({
	keyRollupTable: z
		.string()
		.optional()
		.describe("ClickHouse table name for the key rollup (field discovery).")
		.meta({ examples: ["otel_traces_key_rollup_15m"] }),
	kvRollupTable: z
		.string()
		.optional()
		.describe("ClickHouse table name for the key-value rollup (value autocomplete).")
		.meta({ examples: ["otel_traces_kv_rollup_15m"] }),
	granularity: z
		.string()
		.optional()
		.describe("The time granularity of the rollup tables.")
		.meta({ examples: ["15m"] }),
});

export const clickStackTraceSourceSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Unique source ID. Server-generated; ignored if sent in create/update requests.")
		.meta({ examples: ["507f1f77bcf86cd799439021"] }),
	name: z
		.string()
		.describe("Display name for the source.")
		.meta({ examples: ["Traces"] }),
	section: z
		.string()
		.optional()
		.describe(
			"Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.",
		)
		.meta({ examples: ["Billing"] }),
	disabled: z
		.boolean()
		.nullish()
		.describe("When true, the source is hidden from source selectors in the UI. Defaults to false.")
		.meta({ examples: [false] }),
	kind: z
		.enum(["trace"])
		.describe('Source kind discriminator. Must be "trace" for trace sources.')
		.meta({ examples: ["trace"] }),
	connection: z
		.string()
		.describe("ID of the ClickHouse connection used by this source.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	from: clickStackSourceFromSchema,
	querySettings: z
		.array(clickStackQuerySettingSchema)
		.optional()
		.describe("Optional ClickHouse query settings applied when querying this source."),
	filterSettings: z.union([clickStackSourceFilterSettingsSchema.strict(), z.null()]).optional(),
	defaultTableSelectExpression: z
		.string()
		.describe(
			"Default columns selected in search results (this can be customized per search later)",
		)
		.meta({ examples: ["Timestamp, SpanName, ServiceName, Duration"] }),
	timestampValueExpression: z
		.string()
		.describe("DateTime column or expression defines the start of the span")
		.meta({ examples: ["Timestamp"] }),
	durationExpression: z
		.string()
		.describe("Expression to extract span duration.")
		.meta({ examples: ["Duration"] }),
	durationPrecision: z
		.int()
		.describe(
			"Number of decimal digits in the duration value (e.g., 3 for milliseconds, 6 for microseconds, 9 for nanoseconds).",
		),
	traceIdExpression: z
		.string()
		.describe("Expression to extract the trace ID.")
		.meta({ examples: ["TraceId"] }),
	spanIdExpression: z
		.string()
		.describe("Expression to extract the span ID.")
		.meta({ examples: ["SpanId"] }),
	parentSpanIdExpression: z
		.string()
		.describe("Expression to extract the parent span ID.")
		.meta({ examples: ["ParentSpanId"] }),
	spanNameExpression: z
		.string()
		.describe("Expression to extract the span name.")
		.meta({ examples: ["SpanName"] }),
	spanKindExpression: z
		.string()
		.describe("Expression to extract the span kind (e.g., client, server, internal).")
		.meta({ examples: ["SpanKind"] }),
	logSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for logs associated with traces. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
	sessionSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for sessions associated with traces. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439031"] }),
	metricSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for metrics associated with traces. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439041"] }),
	statusCodeExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the span status code.")
		.meta({ examples: ["StatusCode"] }),
	statusMessageExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the span status message.")
		.meta({ examples: ["StatusMessage"] }),
	serviceNameExpression: z
		.string()
		.nullish()
		.describe("Expression to extract the service name from trace rows.")
		.meta({ examples: ["ServiceName"] }),
	serviceVersionExpression: z
		.string()
		.nullish()
		.describe(
			"Expression identifying the running release of a service. Defaults to the OpenTelemetry service.version resource attribute when unset. Where services carry the release on different attributes, fall back across them with coalesce(nullIf(a, ''), nullIf(b, '')).",
		)
		.meta({ examples: ["ResourceAttributes['service.version']"] }),
	resourceAttributesExpression: z
		.string()
		.nullish()
		.describe("Expression to extract resource-level attributes.")
		.meta({ examples: ["ResourceAttributes"] }),
	eventAttributesExpression: z
		.string()
		.nullish()
		.describe("Expression to extract event-level attributes.")
		.meta({ examples: ["SpanAttributes"] }),
	spanEventsValueExpression: z
		.string()
		.nullish()
		.describe(
			"Expression to extract span events. Used to capture events associated with spans. Expected to be Nested ( Timestamp DateTime64(9), Name LowCardinality(String), Attributes Map(LowCardinality(String), String)",
		)
		.meta({ examples: ["Events"] }),
	implicitColumnExpression: z
		.string()
		.nullish()
		.describe(
			"Column used for full text search if no property is specified in a Lucene-based search. Typically the message body of a log.",
		)
		.meta({ examples: ["SpanName"] }),
	knownColumnsListExpression: z
		.string()
		.nullish()
		.describe(
			"For Distributed table sources whose target tables have non-matching column sets. A list of columns supported across all target tables, used instead of SELECT * when fetching full row data. Leave blank to select all columns.",
		)
		.meta({ examples: ["Timestamp, Body, ServiceName"] }),
	useTextIndexForImplicitColumn: z
		.enum(["auto", "enabled", "disabled"])
		.nullish()
		.describe(
			'Controls whether lucene rendering uses ClickHouse text indices via hasAllTokens() against the implicit column. "auto" detects a covering index at query time, "enabled" forces text index usage, "disabled" forces a LIKE/hasToken fallback.',
		)
		.meta({ examples: ["auto"] }),
	highlightedTraceAttributeExpressions: z
		.array(clickStackHighlightedAttributeExpressionSchema)
		.optional()
		.describe(
			"Expressions defining trace-level attributes which are displayed in the trace view for the selected trace.",
		),
	highlightedRowAttributeExpressions: z
		.array(clickStackHighlightedAttributeExpressionSchema)
		.optional()
		.describe(
			"Expressions defining row-level attributes which are displayed in the row side panel for the selected row",
		),
	materializedViews: z
		.array(clickStackMaterializedViewSchema)
		.optional()
		.describe(
			"Configure materialized views for query optimization. These pre-aggregated views can significantly improve query performance on aggregation queries.",
		),
	metadataMaterializedViews: z
		.union([clickStackTraceSourceMetadataMaterializedViewsSchema.strict(), z.null()])
		.optional(),
});

export const clickStackMetricSourceSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Unique source ID. Server-generated; ignored if sent in create/update requests.")
		.meta({ examples: ["507f1f77bcf86cd799439041"] }),
	name: z
		.string()
		.describe("Display name for the source.")
		.meta({ examples: ["Metrics"] }),
	section: z
		.string()
		.optional()
		.describe(
			"Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.",
		)
		.meta({ examples: ["Billing"] }),
	disabled: z
		.boolean()
		.nullish()
		.describe("When true, the source is hidden from source selectors in the UI. Defaults to false.")
		.meta({ examples: [false] }),
	kind: z
		.enum(["metric"])
		.describe('Source kind discriminator. Must be "metric" for metric sources.')
		.meta({ examples: ["metric"] }),
	connection: z
		.string()
		.describe("ID of the ClickHouse connection used by this source.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	from: clickStackMetricSourceFromSchema,
	querySettings: z
		.array(clickStackQuerySettingSchema)
		.optional()
		.describe("Optional ClickHouse query settings applied when querying this source."),
	metricTables: clickStackMetricTablesSchema,
	timestampValueExpression: z
		.string()
		.describe("DateTime column or expression that is part of your table's primary key.")
		.meta({ examples: ["TimeUnix"] }),
	resourceAttributesExpression: z
		.string()
		.describe("Column containing resource attributes for metrics")
		.meta({ examples: ["ResourceAttributes"] }),
	logSourceId: z
		.string()
		.nullish()
		.describe("HyperDX Source for logs associated with metrics. Optional")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
});

export const clickStackSessionSourceSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Unique source ID. Server-generated; ignored if sent in create/update requests.")
		.meta({ examples: ["507f1f77bcf86cd799439031"] }),
	name: z
		.string()
		.describe("Display name for the source.")
		.meta({ examples: ["Sessions"] }),
	section: z
		.string()
		.optional()
		.describe(
			"Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.",
		)
		.meta({ examples: ["Billing"] }),
	disabled: z
		.boolean()
		.nullish()
		.describe("When true, the source is hidden from source selectors in the UI. Defaults to false.")
		.meta({ examples: [false] }),
	kind: z
		.enum(["session"])
		.describe('Source kind discriminator. Must be "session" for session sources.')
		.meta({ examples: ["session"] }),
	connection: z
		.string()
		.describe("ID of the ClickHouse connection used by this source.")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	from: clickStackSourceFromSchema,
	querySettings: z
		.array(clickStackQuerySettingSchema)
		.optional()
		.describe("Optional ClickHouse query settings applied when querying this source."),
	timestampValueExpression: z
		.string()
		.nullish()
		.describe("DateTime column or expression that is part of your table's primary key.")
		.meta({ examples: ["TimestampTime"] }),
	traceSourceId: z
		.string()
		.describe("HyperDX Source for traces associated with sessions.")
		.meta({ examples: ["507f1f77bcf86cd799439021"] }),
});

export const clickStackPromqlSourceSchema = z.object({
	id: z
		.string()
		.optional()
		.describe("Unique source ID. Server-generated; ignored if sent in create/update requests.")
		.meta({ examples: ["507f1f77bcf86cd799439051"] }),
	name: z
		.string()
		.describe("Display name for the source.")
		.meta({ examples: ["Prometheus Metrics"] }),
	section: z
		.string()
		.optional()
		.describe(
			"Optional grouping label used to organize sources in the source selector. Sources that share a section value are displayed together.",
		)
		.meta({ examples: ["Billing"] }),
	disabled: z
		.boolean()
		.nullish()
		.describe("When true, the source is hidden from source selectors in the UI. Defaults to false.")
		.meta({ examples: [false] }),
	kind: z
		.enum(["promql"])
		.describe('Source kind discriminator. Must be "promql" for PromQL sources.')
		.meta({ examples: ["promql"] }),
	connection: z
		.string()
		.describe(
			"ID of the connection used by this source. Should reference a Prometheus-compatible connection.",
		)
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	from: clickStackSourceFromSchema,
	querySettings: z
		.array(clickStackQuerySettingSchema)
		.optional()
		.describe("Optional ClickHouse query settings applied when querying this source."),
	timestampValueExpression: z
		.string()
		.describe(
			"Required by the API for all source kinds; not used when querying a Prometheus endpoint.",
		)
		.meta({ examples: ["timestamp"] }),
});

export const clickStackSourceSchema = z.discriminatedUnion("kind", [
	clickStackLogSourceSchema.strict(),
	clickStackTraceSourceSchema.strict(),
	clickStackMetricSourceSchema.strict(),
	clickStackSessionSourceSchema.strict(),
	clickStackPromqlSourceSchema.strict(),
]);

export const clickStackSlackWebhookSchema = z.object({
	id: z
		.string()
		.describe("Webhook ID")
		.meta({ examples: ["507f1f77bcf86cd799439011"] }),
	name: z
		.string()
		.describe("Webhook name")
		.meta({ examples: ["Production Alerts"] }),
	service: z
		.enum(["slack"])
		.describe("Webhook service type")
		.meta({ examples: ["slack"] }),
	url: z
		.string()
		.optional()
		.describe("Slack incoming webhook URL")
		.meta({ examples: ["https://hooks.slack.com/services/<workspace>/<channel>/<token>"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI")
		.meta({ examples: ["Sends critical alerts to the #incidents channel"] }),
	updatedAt: z.iso
		.datetime()
		.describe("Last update timestamp")
		.meta({ examples: ["2025-06-15T10:30:00.000Z"] }),
	createdAt: z.iso
		.datetime()
		.describe("Creation timestamp")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
});

export const clickStackIncidentIOWebhookSchema = z.object({
	id: z
		.string()
		.describe("Webhook ID")
		.meta({ examples: ["507f1f77bcf86cd799439012"] }),
	name: z
		.string()
		.describe("Webhook name")
		.meta({ examples: ["Incident Response"] }),
	service: z
		.enum(["incidentio"])
		.describe("Webhook service type")
		.meta({ examples: ["incidentio"] }),
	url: z
		.string()
		.optional()
		.describe("incident.io alert event HTTP source URL")
		.meta({ examples: ["https://api.incident.io/v2/alert_events/http/abc123"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI")
		.meta({ examples: ["Routes alerts to incident.io for on-call escalation"] }),
	updatedAt: z.iso
		.datetime()
		.describe("Last update timestamp")
		.meta({ examples: ["2025-06-15T10:30:00.000Z"] }),
	createdAt: z.iso
		.datetime()
		.describe("Creation timestamp")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
});

export const clickStackGenericWebhookSchema = z.object({
	id: z
		.string()
		.describe("Webhook ID")
		.meta({ examples: ["507f1f77bcf86cd799439013"] }),
	name: z
		.string()
		.describe("Webhook name")
		.meta({ examples: ["PagerDuty Integration"] }),
	service: z
		.enum(["generic"])
		.describe("Webhook service type")
		.meta({ examples: ["generic"] }),
	url: z
		.string()
		.optional()
		.describe("Webhook destination URL")
		.meta({ examples: ["https://example.com/webhooks/alerts"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI")
		.meta({ examples: ["Forwards alert payloads to an external monitoring service"] }),
	body: z
		.string()
		.optional()
		.describe("Optional request body template")
		.meta({ examples: ['{"alert": "{{title}}", "severity": "{{level}}"}'] }),
	updatedAt: z.iso
		.datetime()
		.describe("Last update timestamp")
		.meta({ examples: ["2025-06-15T10:30:00.000Z"] }),
	createdAt: z.iso
		.datetime()
		.describe("Creation timestamp")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
});

export const clickStackSlackAPIWebhookSchema = z.object({
	id: z
		.string()
		.describe("Webhook ID")
		.meta({ examples: ["65f5e4a3b9e77c001a789012"] }),
	name: z
		.string()
		.describe("Webhook name")
		.meta({ examples: ["Slack Alerts"] }),
	service: z
		.enum(["slack_api"])
		.describe("Webhook service type")
		.meta({ examples: ["slack_api"] }),
	url: z
		.string()
		.optional()
		.describe("Slack API endpoint URL")
		.meta({ examples: ["https://hooks.slack.com/services/<workspace>/<channel>/<token>"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI")
		.meta({ examples: ["Sends alerts to #engineering channel"] }),
	updatedAt: z.iso
		.datetime()
		.describe("Last update timestamp")
		.meta({ examples: ["2025-01-15T12:00:00.000Z"] }),
	createdAt: z.iso
		.datetime()
		.describe("Creation timestamp")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
});

export const clickStackPagerDutyAPIWebhookSchema = z.object({
	id: z
		.string()
		.describe("Webhook ID")
		.meta({ examples: ["65f5e4a3b9e77c001a789013"] }),
	name: z
		.string()
		.describe("Webhook name")
		.meta({ examples: ["PagerDuty Alerts"] }),
	service: z
		.enum(["pagerduty_api"])
		.describe("Webhook service type")
		.meta({ examples: ["pagerduty_api"] }),
	url: z
		.string()
		.optional()
		.describe("PagerDuty Events API endpoint URL")
		.meta({ examples: ["https://events.pagerduty.com/v2/enqueue"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI")
		.meta({ examples: ["Sends critical alerts to PagerDuty"] }),
	updatedAt: z.iso
		.datetime()
		.describe("Last update timestamp")
		.meta({ examples: ["2025-01-15T12:00:00.000Z"] }),
	createdAt: z.iso
		.datetime()
		.describe("Creation timestamp")
		.meta({ examples: ["2025-01-01T00:00:00.000Z"] }),
});

export const clickStackWebhookSchema = z.discriminatedUnion("service", [
	clickStackSlackWebhookSchema.strict(),
	clickStackIncidentIOWebhookSchema.strict(),
	clickStackGenericWebhookSchema.strict(),
	clickStackSlackAPIWebhookSchema.strict(),
	clickStackPagerDutyAPIWebhookSchema.strict(),
]);

export const clickStackWebhookInputHeadersSchema = z.record(z.string(), z.string());

export const clickStackWebhookInputQueryParamsSchema = z.record(z.string(), z.string());

export const clickStackWebhookInputSchema = z.object({
	name: z
		.string()
		.describe("Webhook name. Must be unique per service within the team.")
		.meta({ examples: ["Production Alerts"] }),
	service: z
		.enum(["slack", "incidentio", "generic"])
		.describe("Webhook service type.")
		.meta({ examples: ["slack"] }),
	url: z
		.string()
		.describe("Webhook destination URL.")
		.meta({ examples: ["https://hooks.slack.com/services/<workspace>/<channel>/<token>"] }),
	description: z
		.string()
		.optional()
		.describe("Webhook description, shown in the UI.")
		.meta({ examples: ["Sends critical alerts to the #incidents channel"] }),
	body: z
		.string()
		.optional()
		.describe("Optional request body template. Only for generic/incidentio; rejected for slack.")
		.meta({ examples: ['{"alert": "{{title}}", "severity": "{{level}}"}'] }),
	headers: clickStackWebhookInputHeadersSchema.optional(),
	queryParams: clickStackWebhookInputQueryParamsSchema.optional(),
});

export const assignedRoleSchema = z.object({
	roleId: z.uuid().optional().describe("Unique identifier of the role"),
	roleName: z.string().optional().describe("Human-readable name of the role"),
	roleType: z
		.enum(["system", "custom"])
		.optional()
		.describe("Type of role: system (predefined) or custom (organization-defined)"),
});

export const memberSchema = z.object({
	userId: z
		.string()
		.optional()
		.describe(
			"Unique user ID. If a user is a member in multiple organizations this ID will stay the same.",
		),
	name: z.string().optional().describe("Name of the member as set a personal user profile."),
	email: z.email().optional().describe("Email of the member as set in personal user profile."),
	role: z
		.enum(["admin", "developer"])
		.optional()
		.describe(
			"DEPRECATED. Use `assignedRoles` instead. Role of the member in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.",
		),
	joinedAt: z.iso
		.datetime()
		.optional()
		.describe("Timestamp the member joined the organization. ISO-8601."),
	assignedRoles: z
		.array(assignedRoleSchema)
		.optional()
		.describe("Custom roles and System roles assigned to this member"),
});

export const invitationSchema = z.object({
	role: z
		.enum(["admin", "developer"])
		.optional()
		.describe(
			"DEPRECATED. Use `assignedRoles` instead. Role of the invited user in the organization. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect the role assignment that will be applied.",
		),
	id: z.uuid().optional().describe("Unique invitation ID."),
	email: z
		.email()
		.optional()
		.describe(
			"Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.",
		),
	createdAt: z.iso.datetime().optional().describe("Invitation creation timestamp. ISO-8601."),
	expireAt: z.iso.datetime().optional().describe("Timestamp the invitation expires. ISO-8601."),
	assignedRoles: z
		.array(assignedRoleSchema)
		.optional()
		.describe(
			"Custom roles and System roles that will be assigned to the user when they accept the invitation",
		),
});

export const licenseSchema = z.object({
	id: z.uuid().optional().describe("Unique license ID."),
	name: z.string().optional().describe("User-provided name for the license."),
	expiration: z.iso
		.datetime()
		.optional()
		.describe(
			"Expiration timestamp, inherited from the organization's licensing terms. Absent when the organization has no licensing terms configured. ISO-8601.",
		),
	memory: z.string().optional().describe("Memory reserved for license."),
	environmentFingerprint: z
		.string()
		.optional()
		.describe("Environment fingerprint generated by private infrastructure."),
});

export const scimEnterpriseManagerSchema = z.object({
	value: z
		.string()
		.optional()
		.describe("The id of the SCIM resource representing the user's manager."),
	displayName: z.string().optional().describe("The displayName of the user's manager."),
});

export const scimEnterpriseUserSchema = z.object({
	employeeNumber: z
		.string()
		.optional()
		.describe(
			"Numeric or alphanumeric identifier assigned to a person, typically based on order of hire or association with an organization.",
		),
	costCenter: z.string().optional().describe("Identifies the name of a cost center."),
	organization: z.string().optional().describe("Identifies the name of an organization."),
	division: z.string().optional().describe("Identifies the name of a division."),
	department: z.string().optional().describe("Identifies the name of a department."),
	manager: scimEnterpriseManagerSchema.optional(),
});

export const scimUserNameSchema = z.object({
	formatted: z
		.string()
		.optional()
		.describe("The full name, including all middle names, titles, and suffixes."),
	familyName: z.string().optional().describe("The family name of the User."),
	givenName: z.string().optional().describe("The given name of the User."),
	middleName: z.string().optional().describe("The middle name(s) of the User."),
	honorificPrefix: z
		.string()
		.optional()
		.describe("The honorific prefix(es) of the User, or title in some cultures."),
	honorificSuffix: z.string().optional().describe("The honorific suffix(es) of the User."),
});

export const scimUserEmailSchema = z.object({
	value: z.email().describe("Email address value."),
	type: z.string().optional().describe('Type of email (e.g., "work", "home").'),
	primary: z.boolean().optional().describe("A Boolean value indicating the primary email address."),
});

export const scimUserMetaSchema = z.object({
	resourceType: z.string().describe("The name of the resource type of the resource."),
	created: z.iso
		.datetime()
		.describe("The DateTime the Resource was added to the Service Provider."),
	lastModified: z.iso
		.datetime()
		.describe("The most recent DateTime the details of this Resource were updated."),
	location: z.string().optional().describe("The URI of the resource being returned."),
});

export const scimUserGroupSchema = z.object({
	value: z.string().optional().describe("The identifier of the group."),
	display: z.string().optional().describe("A human-readable name for the group."),
	type: z
		.string()
		.optional()
		.describe('A label indicating the attribute\'s function (e.g., "direct" or "indirect").'),
});

export const scimUserRoleSchema = z.object({
	value: z
		.string()
		.optional()
		.describe(
			"The value of a role; a string or label representing a collection of entitlements. No canonical types.",
		),
	display: z
		.string()
		.optional()
		.describe("A human-readable name, primarily used for display purposes."),
	type: z.string().optional().describe("A label indicating the attribute's function."),
	primary: z
		.boolean()
		.optional()
		.describe("A Boolean value indicating the primary or preferred role."),
});

export const scimUserEntitlementSchema = z.object({
	value: z.string().optional().describe("The value of an entitlement."),
	display: z.string().optional().describe("A human-readable name for the entitlement."),
	type: z.string().optional().describe("A label indicating the attribute's function."),
	primary: z.boolean().optional().describe("A Boolean value indicating the primary entitlement."),
});

export const scimUserPhoneNumberSchema = z.object({
	value: z.string().optional().describe("Phone number value."),
	type: z.string().optional().describe('Type of phone number (e.g., "work", "home", "mobile").'),
	primary: z
		.boolean()
		.optional()
		.describe("A Boolean value indicating the preferred phone number."),
});

export const scimUserImSchema = z.object({
	value: z.string().optional().describe("Instant messaging address."),
	type: z
		.string()
		.optional()
		.describe('Type of IM address (e.g., "aim", "gtalk", "icq", "xmpp", "msn", "skype", "qq").'),
	primary: z.boolean().optional().describe("A Boolean value indicating the preferred IM address."),
});

export const scimUserPhotoSchema = z.object({
	value: z.string().optional().describe("URL of a photo of the User."),
	type: z.string().optional().describe('Type of photo (e.g., "photo", "thumbnail").'),
	primary: z.boolean().optional().describe("A Boolean value indicating the preferred photo."),
});

export const scimUserAddressSchema = z.object({
	formatted: z
		.string()
		.optional()
		.describe("The full mailing address, formatted for display or use with a mailing label."),
	streetAddress: z.string().optional().describe("The full street address component."),
	locality: z.string().optional().describe("The city or locality component."),
	region: z.string().optional().describe("The state or region component."),
	postalCode: z.string().optional().describe("The zip code or postal code component."),
	country: z.string().optional().describe("The country name component."),
	type: z.string().optional().describe('Type of address (e.g., "work", "home", "other").'),
	primary: z
		.boolean()
		.optional()
		.describe("A Boolean value indicating the preferred mailing address."),
});

export const scimX509CertificateSchema = z.object({
	value: z.string().optional().describe("The value of a X.509 certificate."),
});

export const scimUserSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schemas URIs. Should include "urn:ietf:params:scim:schemas:core:2.0:User".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:User"]] }),
	id: z
		.string()
		.describe("Unique identifier for the SCIM resource. Returned by the server.")
		.meta({ examples: ["samlp|b7a3c2d1-4e5f-6a7b-8c9d-0e1f2a3b4c5d|user@example.com"] }),
	externalId: z
		.string()
		.optional()
		.describe(
			"A String that is an identifier for the resource as defined by the provisioning client.",
		)
		.meta({ examples: ["ext-user-001"] }),
	userName: z
		.string()
		.describe(
			"Unique identifier for the User, typically used by the user to directly authenticate to the service provider.",
		)
		.meta({ examples: ["user@example.com"] }),
	name: scimUserNameSchema,
	displayName: z
		.string()
		.optional()
		.describe("The name of the User, suitable for display to end-users."),
	nickName: z.string().optional().describe("The casual way to address the user in real life."),
	profileUrl: z
		.string()
		.optional()
		.describe("A fully qualified URL pointing to a page representing the User's online profile."),
	title: z.string().optional().describe('The User\'s title, such as "Vice President".'),
	userType: z
		.string()
		.optional()
		.describe("Identifies the relationship between the organization and the user."),
	preferredLanguage: z
		.string()
		.optional()
		.describe('Indicates the User\'s preferred written or spoken language (e.g., "en-US").'),
	locale: z
		.string()
		.optional()
		.describe(
			'Used to indicate the User\'s default location for localizing items such as currency, date time format, or numerical representations (e.g., "en-US").',
		),
	timezone: z
		.string()
		.optional()
		.describe(
			'The User\'s time zone in the "Olson" time zone database format (e.g., "America/Los_Angeles").',
		),
	active: z.boolean().describe("A Boolean value indicating the User's administrative status."),
	emails: z.array(scimUserEmailSchema).describe("Email addresses for the user."),
	phoneNumbers: z
		.array(scimUserPhoneNumberSchema)
		.optional()
		.describe("Phone numbers for the User."),
	ims: z.array(scimUserImSchema).optional().describe("Instant messaging addresses for the User."),
	photos: z.array(scimUserPhotoSchema).optional().describe("URLs of photos of the User."),
	addresses: z
		.array(scimUserAddressSchema)
		.optional()
		.describe("Physical mailing addresses for the User."),
	groups: z
		.array(scimUserGroupSchema)
		.optional()
		.describe(
			"A list of groups to which the user belongs, either through direct membership, through nested groups, or dynamically calculated.",
		),
	entitlements: z
		.array(scimUserEntitlementSchema)
		.optional()
		.describe("A list of entitlements for the user that represent a thing the user has."),
	roles: z
		.array(scimUserRoleSchema)
		.optional()
		.describe(
			'A list of roles for the user that collectively represent who the user is, e.g. "Student", "Faculty". No vocabulary or syntax is specified; role value is a string or label representing a collection of entitlements. RFC 7643.',
		),
	x509Certificates: z
		.array(scimX509CertificateSchema)
		.optional()
		.describe("A list of certificates issued to the User."),
	"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": scimEnterpriseUserSchema.optional(),
	meta: scimUserMetaSchema,
});

export const scimUserPostRequestSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schemas URIs. Should include "urn:ietf:params:scim:schemas:core:2.0:User".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:User"]] }),
	id: z
		.string()
		.optional()
		.describe("Server-assigned resource ID echoed back by the IdP. Ignored on write."),
	meta: scimUserMetaSchema.optional(),
	userName: z
		.string()
		.describe(
			"Unique identifier for the User, typically used by the user to directly authenticate to the service provider.",
		)
		.meta({ examples: ["user@example.com"] }),
	externalId: z
		.string()
		.optional()
		.describe(
			"A String that is an identifier for the resource as defined by the provisioning client.",
		)
		.meta({ examples: ["ext-user-001"] }),
	name: scimUserNameSchema.optional(),
	displayName: z
		.string()
		.optional()
		.describe("The name of the User, suitable for display to end-users."),
	nickName: z.string().optional().describe("The casual way to address the user in real life."),
	profileUrl: z
		.string()
		.optional()
		.describe("A fully qualified URL pointing to a page representing the User's online profile."),
	title: z.string().optional().describe('The User\'s title, such as "Vice President".'),
	userType: z
		.string()
		.optional()
		.describe("Identifies the relationship between the organization and the user."),
	preferredLanguage: z
		.string()
		.optional()
		.describe('Indicates the User\'s preferred written or spoken language (e.g., "en-US").'),
	locale: z
		.string()
		.optional()
		.describe(
			'Used to indicate the User\'s default location for localizing items such as currency, date time format, or numerical representations (e.g., "en-US").',
		),
	timezone: z
		.string()
		.optional()
		.describe(
			'The User\'s time zone in the "Olson" time zone database format (e.g., "America/Los_Angeles").',
		),
	active: z
		.boolean()
		.optional()
		.describe(
			"A Boolean value indicating the User's administrative status. Defaults to true if not specified.",
		),
	password: z
		.string()
		.optional()
		.describe("The User's cleartext password. Write-only; never returned in responses."),
	emails: z.array(scimUserEmailSchema).describe("Email addresses for the user."),
	phoneNumbers: z
		.array(scimUserPhoneNumberSchema)
		.optional()
		.describe("Phone numbers for the User."),
	ims: z.array(scimUserImSchema).optional().describe("Instant messaging addresses for the User."),
	photos: z.array(scimUserPhotoSchema).optional().describe("URLs of photos of the User."),
	addresses: z
		.array(scimUserAddressSchema)
		.optional()
		.describe("Physical mailing addresses for the User."),
	groups: z
		.array(scimUserGroupSchema)
		.optional()
		.describe(
			"A list of groups to which the user belongs. Read-only; ignored on write. Membership is managed via the Groups endpoints.",
		),
	entitlements: z
		.array(scimUserEntitlementSchema)
		.optional()
		.describe("A list of entitlements for the user that represent a thing the user has."),
	roles: z
		.array(scimUserRoleSchema)
		.optional()
		.describe(
			"A list of roles for the user. Read-only; ignored on write. Membership is managed via the Groups endpoints.",
		),
	x509Certificates: z
		.array(scimX509CertificateSchema)
		.optional()
		.describe("A list of certificates issued to the User."),
	"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": scimEnterpriseUserSchema.optional(),
});

export const scimListResponseSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('Must be ["urn:ietf:params:scim:api:messages:2.0:ListResponse"].'),
	totalResults: z.int().describe("Total number of results matching the query."),
	startIndex: z.int().describe("1-based index of the first result in the current set."),
	itemsPerPage: z.int().describe("Number of resources returned in this response."),
	Resources: z.array(scimUserSchema).describe("Array of SCIM User resources."),
});

export const scimPatchOperationSchema = z.object({
	op: z
		.enum(["add", "replace", "remove"])
		.describe("The operation to perform.")
		.meta({ examples: ["replace"] }),
	path: z.string().optional().describe('Target attribute path (e.g. "active", "userName").'),
	value: z.string().optional().describe("New value for the attribute."),
});

export const scimGroupMetaSchema = z.object({
	resourceType: z.string().describe('Always "Group".'),
	created: z.iso.datetime().describe("DateTime the Group was created."),
	lastModified: z.iso.datetime().describe("DateTime the Group was last modified."),
	location: z.string().optional().describe("The URI of this Group resource."),
});

export const scimPatchOpSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('Must include "urn:ietf:params:scim:api:messages:2.0:PatchOp".'),
	Operations: z.array(scimPatchOperationSchema).describe("List of PATCH operations to apply."),
	id: z
		.string()
		.optional()
		.describe("Server-assigned resource ID echoed back by the IdP. Ignored on write."),
	meta: z
		.union([scimUserMetaSchema.strict(), scimGroupMetaSchema.strict()])
		.optional()
		.describe("Server-assigned metadata echoed back by the IdP. Ignored on write."),
});

export const scimUserPutRequestSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schemas URIs. Should include "urn:ietf:params:scim:schemas:core:2.0:User".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:User"]] }),
	id: z
		.string()
		.optional()
		.describe("Server-assigned resource ID echoed back by the IdP. Ignored on write."),
	meta: scimUserMetaSchema.optional(),
	userName: z
		.string()
		.describe(
			"Unique identifier for the User, typically used by the user to directly authenticate to the service provider.",
		)
		.meta({ examples: ["user@example.com"] }),
	externalId: z
		.string()
		.optional()
		.describe(
			"A String that is an identifier for the resource as defined by the provisioning client.",
		)
		.meta({ examples: ["ext-user-001"] }),
	name: scimUserNameSchema.optional(),
	displayName: z
		.string()
		.optional()
		.describe("The name of the User, suitable for display to end-users."),
	nickName: z.string().optional().describe("The casual way to address the user in real life."),
	profileUrl: z
		.string()
		.optional()
		.describe("A fully qualified URL pointing to a page representing the User's online profile."),
	title: z.string().optional().describe('The User\'s title, such as "Vice President".'),
	userType: z
		.string()
		.optional()
		.describe("Identifies the relationship between the organization and the user."),
	preferredLanguage: z
		.string()
		.optional()
		.describe('Indicates the User\'s preferred written or spoken language (e.g., "en-US").'),
	locale: z
		.string()
		.optional()
		.describe(
			'Used to indicate the User\'s default location for localizing items such as currency, date time format, or numerical representations (e.g., "en-US").',
		),
	timezone: z
		.string()
		.optional()
		.describe(
			'The User\'s time zone in the "Olson" time zone database format (e.g., "America/Los_Angeles").',
		),
	active: z
		.boolean()
		.optional()
		.describe(
			"A Boolean value indicating the User's administrative status. Defaults to true if not specified.",
		),
	password: z
		.string()
		.optional()
		.describe("The User's cleartext password. Write-only; never returned in responses."),
	emails: z.array(scimUserEmailSchema).describe("Email addresses for the user."),
	phoneNumbers: z
		.array(scimUserPhoneNumberSchema)
		.optional()
		.describe("Phone numbers for the User."),
	ims: z.array(scimUserImSchema).optional().describe("Instant messaging addresses for the User."),
	photos: z.array(scimUserPhotoSchema).optional().describe("URLs of photos of the User."),
	addresses: z
		.array(scimUserAddressSchema)
		.optional()
		.describe("Physical mailing addresses for the User."),
	groups: z
		.array(scimUserGroupSchema)
		.optional()
		.describe(
			"A list of groups to which the user belongs. Read-only; ignored on write. Membership is managed via the Groups endpoints.",
		),
	entitlements: z
		.array(scimUserEntitlementSchema)
		.optional()
		.describe("A list of entitlements for the user that represent a thing the user has."),
	roles: z
		.array(scimUserRoleSchema)
		.optional()
		.describe(
			"A list of roles for the user. Read-only; ignored on write. Membership is managed via the Groups endpoints.",
		),
	x509Certificates: z
		.array(scimX509CertificateSchema)
		.optional()
		.describe("A list of certificates issued to the User."),
	"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": scimEnterpriseUserSchema.optional(),
});

export const scimGroupMemberSchema = z.object({
	value: z.string().describe("The identifier of the member (user ID)."),
	display: z.string().optional().describe("A human-readable name for the member."),
	type: z.string().optional().describe('Indicates the type of resource, typically "User".'),
});

export const scimGroupSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schema URIs. Must include "urn:ietf:params:scim:schemas:core:2.0:Group".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:Group"]] }),
	id: z.uuid().describe("Unique identifier for this Group (corresponds to Role ID)."),
	externalId: z
		.string()
		.optional()
		.describe("Identifier for the resource as defined by the provisioning client."),
	displayName: z.string().describe("Human-readable name for the Group. Maps to Role name."),
	members: z.array(scimGroupMemberSchema).optional().describe("Members of the Group."),
	meta: scimGroupMetaSchema,
});

export const scimGroupPostRequestSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schema URIs. Must include "urn:ietf:params:scim:schemas:core:2.0:Group".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:Group"]] }),
	externalId: z
		.string()
		.optional()
		.describe("Identifier for the resource as defined by the provisioning client."),
	displayName: z.string().describe("Human-readable name for the Group. Maps to Role name."),
	members: z.array(scimGroupMemberSchema).optional().describe("Members of the Group."),
	id: z
		.string()
		.optional()
		.describe("Server-assigned resource ID echoed back by the IdP. Ignored on write."),
	meta: scimGroupMetaSchema.optional(),
});

export const scimGroupPutRequestSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('SCIM schema URIs. Must include "urn:ietf:params:scim:schemas:core:2.0:Group".')
		.meta({ examples: [["urn:ietf:params:scim:schemas:core:2.0:Group"]] }),
	externalId: z
		.string()
		.optional()
		.describe("Identifier for the resource as defined by the provisioning client."),
	displayName: z.string().describe("Human-readable name for the Group. Maps to Role name."),
	members: z.array(scimGroupMemberSchema).optional().describe("Members of the Group."),
	id: z
		.string()
		.optional()
		.describe("Server-assigned resource ID echoed back by the IdP. Ignored on write."),
	meta: scimGroupMetaSchema.optional(),
});

export const scimGroupListResponseSchema = z.object({
	schemas: z
		.array(z.string())
		.describe('Must be ["urn:ietf:params:scim:api:messages:2.0:ListResponse"].'),
	totalResults: z.int().describe("Total number of Groups matching the query."),
	startIndex: z.int().describe("1-based index of the first result in the current set."),
	itemsPerPage: z.int().describe("Number of resources returned in this response."),
	Resources: z.array(scimGroupSchema).describe("Array of SCIM Group resources."),
});

export const scimBooleanFeatureSchema = z.object({
	supported: z.boolean().describe("Whether the feature is supported."),
});

export const scimServiceProviderConfigPatchSchema = z.object({
	supported: z.boolean().describe("Whether PATCH is supported."),
});

export const scimServiceProviderConfigBulkSchema = z.object({
	supported: z.boolean().describe("Whether bulk operations are supported."),
	maxOperations: z.int().describe("Maximum number of bulk operations per request."),
	maxPayloadSize: z.int().describe("Maximum payload size for bulk requests in bytes."),
});

export const scimServiceProviderConfigFilterSchema = z.object({
	supported: z.boolean().describe("Whether filter is supported."),
	maxResults: z.int().describe("Maximum number of results per filter query."),
});

export const scimAuthenticationSchemeSchema = z.object({
	type: z
		.string()
		.describe('The authentication scheme type (e.g., "httpbasic", "oauthbearertoken").'),
	name: z.string().describe("The common authentication scheme name."),
	description: z.string().describe("A description of the authentication scheme."),
	specUri: z
		.string()
		.optional()
		.describe("An HTTP-addressable URL pointing to the scheme specification."),
	primary: z
		.boolean()
		.optional()
		.describe("A Boolean value indicating the primary authentication scheme."),
});

export const scimServiceProviderConfigMetaSchema = z.object({
	resourceType: z.string().describe("The resource type of this resource."),
	location: z.string().describe("The URI of this resource."),
});

export const scimServiceProviderConfigSchema = z.object({
	schemas: z.array(z.string()).describe("SCIM schema URIs."),
	documentationUri: z.string().optional().describe("URI of the service documentation."),
	patch: scimServiceProviderConfigPatchSchema,
	bulk: scimServiceProviderConfigBulkSchema,
	filter: scimServiceProviderConfigFilterSchema,
	changePassword: scimBooleanFeatureSchema,
	sort: scimBooleanFeatureSchema,
	etag: scimBooleanFeatureSchema,
	authenticationSchemes: z
		.array(scimAuthenticationSchemeSchema)
		.describe("Supported authentication schemes."),
	meta: scimServiceProviderConfigMetaSchema,
});

export const scimSchemaExtensionSchema = z.object({
	schema: z.string().describe("The URI of a schema extension."),
	required: z.boolean().describe("Whether the schema extension is required."),
});

export const scimResourceTypeMetaSchema = z.object({
	resourceType: z.string().describe("The resource type."),
	location: z.string().describe("The URI of this resource."),
});

export const scimResourceTypeSchema = z.object({
	schemas: z.array(z.string()).describe("SCIM schema URIs."),
	id: z.string().describe("The resource type ID."),
	name: z.string().describe("The resource type name."),
	endpoint: z.string().describe("The endpoint path for this resource type."),
	description: z.string().describe("A description of the resource type."),
	schema: z.string().describe("The primary schema URI for this resource type."),
	schemaExtensions: z
		.array(scimSchemaExtensionSchema)
		.describe("Optional schema extensions for this resource type."),
	meta: scimResourceTypeMetaSchema,
});

export const scimResourceTypeListResponseSchema = z.object({
	schemas: z.array(z.string()).describe("SCIM schema URIs."),
	totalResults: z.int().describe("Total number of resource types."),
	itemsPerPage: z.int().describe("Number of resources per page."),
	startIndex: z.int().describe("1-based start index."),
	Resources: z.array(scimResourceTypeSchema).describe("Array of resource type definitions."),
});

export const scimSchemaMetaSchema = z.object({
	resourceType: z.string().describe("The resource type."),
	location: z.string().describe("The URI of this schema."),
});

export const scimSchemaAttributeSchema = z.object({
	name: z.string().describe("The attribute name."),
	type: z.string().describe('The attribute type (e.g., "string", "boolean", "complex").'),
	get subAttributes() {
		return z
			.array(scimSchemaAttributeSchema)
			.optional()
			.describe("Sub-attributes for complex attributes.");
	},
	multiValued: z.boolean().describe("Whether the attribute can have multiple values."),
	description: z.string().describe("A human-readable description of the attribute."),
	required: z.boolean().describe("Whether the attribute is required."),
	caseExact: z.boolean().optional().describe("Whether the string attribute is case sensitive."),
	mutability: z
		.string()
		.describe("The circumstances under which the value of the attribute can be (re)defined."),
	returned: z
		.string()
		.describe("The circumstances under which an attribute and associated values are returned."),
	uniqueness: z
		.string()
		.optional()
		.describe("How the service provider enforces uniqueness of attribute values."),
	referenceTypes: z.array(z.string()).optional().describe("A multi-valued array of JSON strings."),
	canonicalValues: z
		.array(z.string())
		.optional()
		.describe("A collection of suggested canonical values that MAY be used."),
});

export const scimSchemaSchema = z.object({
	schemas: z.array(z.string()).describe("SCIM schema URIs."),
	id: z.string().describe("The unique URI of the schema."),
	name: z.string().describe("The schema name."),
	description: z.string().describe("A description of the schema."),
	get attributes() {
		return z
			.array(scimSchemaAttributeSchema)
			.describe("Service provider attributes comprising the schema.");
	},
	meta: scimSchemaMetaSchema,
});

export const scimSchemaListResponseSchema = z.object({
	schemas: z.array(z.string()).describe("SCIM schema URIs."),
	totalResults: z.int().describe("Total number of schemas."),
	itemsPerPage: z.int().describe("Number of schemas per page."),
	startIndex: z.int().describe("1-based start index."),
	Resources: z.array(scimSchemaSchema).describe("Array of schema definitions."),
});

export const apiKeySchema = z.object({
	id: z.uuid().optional().describe("Unique API key ID."),
	name: z.string().optional().describe("Name of the key"),
	state: z
		.enum(["enabled", "disabled"])
		.optional()
		.describe("State of the key: 'enabled', 'disabled'."),
	roles: z
		.array(z.enum(["admin", "developer", "query_endpoints"]))
		.optional()
		.describe(
			"DEPRECATED. Use `assignedRoles` instead. List of roles assigned to the key. For organizations that have migrated to custom roles, this field is frozen at the pre-migration value and does not reflect current role assignments.",
		),
	assignedRoles: z
		.array(assignedRoleSchema)
		.optional()
		.describe("Custom roles and System roles assigned to this API key"),
	keySuffix: z.string().optional().describe("Last 4 letters of the key."),
	createdAt: z.iso.datetime().optional().describe("Timestamp the key was created. ISO-8601."),
	expireAt: z.iso
		.datetime()
		.nullish()
		.describe(
			"Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.",
		),
	usedAt: z.iso
		.datetime()
		.optional()
		.describe(
			"Timestamp the key was used last time, with one-minute precision. If not present the key was never used. ISO-8601.",
		),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe("List of IP addresses allowed to access the API using this key"),
});

export const apiKeyHashDataSchema = z.object({
	keyIdHash: z.string().optional().describe("Hash of the key ID. "),
	keyIdSuffix: z
		.string()
		.optional()
		.describe(
			"Last 4 digits of the key ID. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
		),
	keySecretHash: z
		.string()
		.optional()
		.describe(
			"Hash of the key secret. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
		),
});

export const whoamiOrganizationSchema = z.object({
	organizationId: z.uuid().describe("ID of the organization the user belongs to."),
	organizationName: z.string().describe("Name of the organization."),
});

export const whoamiUserSchema = z.object({
	actorType: z
		.enum(["user"])
		.describe("Discriminator identifying the caller as a user (JWT or clickhousectl token)."),
	userId: z.uuid().describe("Unique ID of the user."),
	email: z.email().describe("Email address of the user."),
	name: z.string().describe("Full name of the user."),
	organizations: z.array(whoamiOrganizationSchema).describe("Organizations the user belongs to."),
});

export const whoamiApiKeySchema = z.object({
	actorType: z
		.enum(["apiKey"])
		.describe("Discriminator identifying the caller as an organization API key."),
	keyId: z.string().describe("Unique ID of the API key."),
	name: z.string().describe("Name of the API key."),
	organizationId: z.uuid().describe("ID of the organization that owns the API key."),
});

export const whoamiSchema = z.discriminatedUnion("actorType", [
	whoamiUserSchema.strict(),
	whoamiApiKeySchema.strict(),
]);

export const notificationTypeSchema = z.object({
	name: z
		.string()
		.describe("Stable identifier of the notification type. Never renamed or reused.")
		.meta({ examples: ["service_backup_failed"] }),
	title: z
		.string()
		.describe("Human-readable name of the notification type.")
		.meta({ examples: ["Backup failed"] }),
	description: z
		.string()
		.optional()
		.describe(
			"Longer explanation of what the notification reports. Omitted for types that have none.",
		),
	category: z
		.string()
		.describe(
			"Broad grouping the notification type belongs to. Current values: billing, service, clickpipe, postgres. New values may be added over time.",
		)
		.meta({ examples: ["service"] }),
	severity: z
		.enum(["info", "warning", "critical"])
		.describe("Relative importance of notifications of this type.")
		.meta({ examples: ["warning"] }),
	resourceType: z
		.string()
		.describe(
			"Kind of resource a notification of this type is about. Current values: service, organization, clickpipe, postgres. New values may be added over time.",
		)
		.meta({ examples: ["service"] }),
	isConfigurable: z
		.boolean()
		.describe(
			"Whether the per-role delivery default can be changed. When false the role default is frozen; this does not mean the notification is always delivered.",
		),
	isAvailable: z
		.boolean()
		.describe(
			"False when the caller lacks the permission this type requires. The type is still returned, just flagged.",
		),
});

export const organizationQuotaSchema = z.object({
	quotaCode: z
		.enum([
			"services-per-organization",
			"postgres-services-per-organization",
			"replicas-per-warehouse",
			"api-keys-per-organization",
		])
		.describe("Stable identifier of the quota. Use it to request a single quota by code.")
		.meta({ examples: ["services-per-organization"] }),
	name: z
		.string()
		.describe("Human-readable name of the quota.")
		.meta({ examples: ["Services per organization"] }),
	description: z
		.string()
		.describe("Explanation of the resource the quota limits and how the limit is applied."),
	scope: z
		.enum(["organization", "warehouse"])
		.describe(
			"Granularity at which the limit is applied. For example, `replicas-per-warehouse` is an organization-wide setting that limits each warehouse individually.",
		)
		.meta({ examples: ["organization"] }),
	value: z
		.int()
		.min(0)
		.describe(
			"Limit currently applied to the organization, including any adjustments made for the organization. The value can change when the billing status of the organization changes.",
		)
		.meta({ examples: [20] }),
	usage: z
		.int()
		.min(0)
		.optional()
		.describe(
			"Current consumption of the quota. Omitted for quotas that do not report usage. Usage can exceed `value` when a limit was lowered after resources were created; existing resources are not affected.",
		)
		.meta({ examples: [3] }),
	adjustable: z
		.boolean()
		.describe(
			"Whether the limit can be raised for the organization by contacting ClickHouse support.",
		),
});

export const serviceProfileSchema = z.object({
	profile: z
		.string()
		.optional()
		.describe(
			"Profile name to pass as `profile` when creating a service (e.g. 'v1-standard-byoc-4').",
		),
	cpuCores: z.number().optional().describe("Number of vCPUs per replica."),
	memoryGi: z
		.number()
		.optional()
		.describe(
			"Memory per replica in GiB. When creating a BYOC service with this profile, minReplicaMemoryGb and maxReplicaMemoryGb must both equal this value.",
		),
});

export const activeBalanceSchema = z.object({
	id: z.uuid().optional().describe("Unique ID of the prepaid balance."),
	remainingPrepaidCredits: z
		.number()
		.optional()
		.describe("Remaining credits available on this balance, in ClickHouse Credits (CHCs)."),
	totalAmount: z
		.number()
		.optional()
		.describe("Total credits granted on this balance, in ClickHouse Credits (CHCs)."),
	amountSpent: z
		.number()
		.optional()
		.describe("Credits spent from this balance, in ClickHouse Credits (CHCs)."),
	startDate: z.iso
		.datetime()
		.optional()
		.describe("Date the balance became active. ISO-8601, based on the UTC timezone."),
	expirationDate: z.iso
		.datetime()
		.optional()
		.describe("Date the balance expires. ISO-8601, based on the UTC timezone."),
});

export const activeBalancesSchema = z.object({
	totalRemainingPrepaidCredits: z
		.number()
		.optional()
		.describe(
			"Total remaining credits across all active prepaid balances, in ClickHouse Credits (CHCs).",
		),
	prepaidBalances: z
		.array(activeBalanceSchema)
		.optional()
		.describe("List of active prepaid balances for the organization."),
});

export const creditBalanceSchema = z.object({
	id: z.uuid().optional().describe("Unique ID of the balance."),
	type: z.enum(["prepaid", "trial"]).optional().describe("Type of the balance."),
	remainingCredits: z
		.number()
		.optional()
		.describe("Remaining credits available on this balance, in ClickHouse Credits (CHCs)."),
	totalAmount: z
		.number()
		.optional()
		.describe("Total credits granted on this balance, in ClickHouse Credits (CHCs)."),
	amountSpent: z
		.number()
		.optional()
		.describe("Credits spent from this balance, in ClickHouse Credits (CHCs)."),
	startDate: z.iso
		.datetime()
		.optional()
		.describe("Date the balance became active. ISO-8601, based on the UTC timezone."),
	expirationDate: z.iso
		.datetime()
		.optional()
		.describe("Date the balance expires. ISO-8601, based on the UTC timezone."),
});

export const creditBalancesSchema = z.object({
	totalRemainingCredits: z
		.number()
		.optional()
		.describe("Total remaining credits across all active balances, in ClickHouse Credits (CHCs)."),
	balances: z
		.array(creditBalanceSchema)
		.optional()
		.describe(
			"List of active balances for the organization. Empty when the organization has none.",
		),
});

export const serviceClickhouseSettingValueSchema = z
	.union([z.string(), z.int()])
	.describe(
		"Setting value in its native JSON type. Use the settings schema endpoint for per-setting constraints.",
	)
	.meta({ examples: ["26.2"] });

export const serviceClickhouseSettingsMapSchema = z
	.record(z.string(), serviceClickhouseSettingValueSchema)
	.describe(
		"Nonempty object mapping configurable setting names to their values. Use DELETE to reset a setting.",
	)
	.meta({ examples: [{}] });

export const serviceClickhouseSettingSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Name of the setting.")
		.meta({ examples: ["compatibility"] }),
	value: serviceClickhouseSettingValueSchema
		.optional()
		.describe(
			"Setting value in its native JSON type. Use the settings schema endpoint for per-setting constraints.",
		)
		.meta({ examples: ["26.2"] }),
});

export const serviceClickhouseSettingsListSchema = z.object({
	settings: z
		.array(serviceClickhouseSettingSchema)
		.optional()
		.describe("List of ClickHouse settings with their current values."),
});

export const serviceClickhouseSettingWarningSchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Name of the setting the warning applies to.")
		.meta({ examples: ["compatibility"] }),
	message: z
		.string()
		.optional()
		.describe("Warning message.")
		.meta({
			examples: [
				"Changing the compatibility version without comprehensive testing can cause query failures or instability.",
			],
		}),
});

export const serviceClickhouseSettingsPatchResponseSchema = z.object({
	settings: serviceClickhouseSettingsMapSchema
		.optional()
		.describe(
			"Nonempty object mapping configurable setting names to their values. Use DELETE to reset a setting.",
		)
		.meta({ examples: [{}] }),
	warnings: z
		.array(serviceClickhouseSettingWarningSchema)
		.optional()
		.describe("Warnings for settings that may have disruptive effects."),
});

export const serviceClickhouseSettingSchemaEntrySchema = z.object({
	name: z
		.string()
		.optional()
		.describe("Name of the setting.")
		.meta({ examples: ["compatibility"] }),
	type: z
		.string()
		.optional()
		.describe("Data type of the setting value.")
		.meta({ examples: ["string"] }),
	description: z
		.string()
		.optional()
		.describe("Description of the setting.")
		.meta({ examples: ["ClickHouse version compatibility setting."] }),
	enum: z
		.array(z.int())
		.optional()
		.describe("List of allowed values, if the setting is an enum.")
		.meta({ examples: [[0, 1]] }),
	warning: z
		.string()
		.optional()
		.describe("Warning message about potential disruptive effects of changing this setting.")
		.meta({
			examples: ["Changing this setting without comprehensive testing can cause instability."],
		}),
	deprecationNotice: z
		.string()
		.optional()
		.describe("Deprecation notice, if applicable.")
		.meta({ examples: ["This setting may become obsolete with Cloud v2 stateless workers."] }),
	example: z
		.string()
		.optional()
		.describe("Example value for the setting.")
		.meta({ examples: ["24.8"] }),
});

export const serviceClickhouseSettingsSchemaSchema = z.object({
	settings: z
		.array(serviceClickhouseSettingSchemaEntrySchema)
		.optional()
		.describe(
			"List of all configurable ClickHouse settings with their types, descriptions, and constraints.",
		),
});

export const pgConfigSchema = z
	.strictObject({
		max_connections: z
			.union([z.string(), z.int().min(1)])
			.optional()
			.describe("Sets the maximum number of concurrent connections to the database server.")
			.meta({ examples: [500] }),
		default_transaction_isolation: z
			.enum(["read committed", "repeatable read", "serializable"])
			.optional()
			.describe("Sets the default transaction isolation level for new transactions.")
			.meta({ examples: ["read committed"] }),
		ssl_min_protocol_version: z
			.enum(["TLSv1", "TLSv1.1", "TLSv1.2", "TLSv1.3"])
			.optional()
			.describe("Sets the minimum SSL/TLS protocol version allowed for client connections.")
			.meta({ examples: ["TLSv1.3"] }),
		maintenance_work_mem: z
			.union([z.string(), z.int().min(64)])
			.optional()
			.describe("Sets the maximum memory to be used for maintenance operations.")
			.meta({ examples: ["64MB"] }),
		work_mem: z
			.union([z.string(), z.int().min(64)])
			.optional()
			.describe(
				"Sets the amount of memory Postgres will use for internal operations like sorting and hashing as part of executing a query.",
			)
			.meta({ examples: ["4MB"] }),
		effective_cache_size: z
			.union([z.string(), z.int().min(8)])
			.optional()
			.describe("Sets the planner's assumption about the total size of data caches.")
			.meta({ examples: ["4GB"] }),
		random_page_cost: z
			.union([z.string(), z.number().min(0)])
			.optional()
			.describe(
				"Sets the planner's estimate of the cost of a non-sequentially-fetched disk page. Lower values (1.1-1.5) are better for SSDs.",
			)
			.meta({ examples: [1.1] }),
		effective_io_concurrency: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Number of concurrent disk I/O operations the planner expects. Higher values (100-200) benefit SSDs.",
			)
			.meta({ examples: [200] }),
		max_worker_processes: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Maximum number of background processes the system can support. Includes parallel query workers, logical replication, and more.",
			)
			.meta({ examples: [8] }),
		max_parallel_workers: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Maximum number of workers that can be used for parallel operations. Cannot exceed max_worker_processes.",
			)
			.meta({ examples: [4] }),
		max_parallel_workers_per_gather: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Maximum number of parallel workers per executor node for parallel queries. Use 0 to disable parallel queries.",
			)
			.meta({ examples: [2] }),
		max_parallel_maintenance_workers: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Maximum number of parallel workers for maintenance operations like CREATE INDEX and VACUUM.",
			)
			.meta({ examples: [2] }),
		statement_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe("Abort any statement that runs longer than the specified time. Use 0 to disable.")
			.meta({ examples: ["60s"] }),
		lock_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Abort any statement that waits longer than the specified time while attempting to acquire a lock. Use 0 to disable.",
			)
			.meta({ examples: ["10s"] }),
		idle_session_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Terminate any session that has been idle for longer than the specified time. Use 0 to disable.",
			)
			.meta({ examples: ["2m"] }),
		idle_in_transaction_session_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Terminate any session that has been idle within an open transaction for longer than the specified time. Use 0 to disable.",
			)
			.meta({ examples: ["2h"] }),
		transaction_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Terminate any statement that takes more than the specified time, even while active. Use 0 to disable.",
			)
			.meta({ examples: ["120s"] }),
		wal_sender_timeout: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Terminate replication connections that are inactive for longer than this time. Use 0 to disable.",
			)
			.meta({ examples: ["120m"] }),
		wal_keep_size: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Minimum size of past WAL files kept in pg_wal for standby servers. Use 0 to disable.",
			)
			.meta({ examples: ["1GB"] }),
		min_wal_size: z
			.union([z.string(), z.int().min(32768)])
			.optional()
			.describe(
				"Minimum size to shrink the WAL to. WAL files are recycled rather than removed when below this size.",
			)
			.meta({ examples: ["80MB"] }),
		max_wal_size: z
			.union([z.string(), z.int().min(32768)])
			.optional()
			.describe(
				"Maximum size WAL can grow between checkpoints. Larger values improve write performance but increase crash recovery time.",
			)
			.meta({ examples: ["5GB"] }),
		max_slot_wal_keep_size: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Specifies the maximum size of WAL files that replication slots are allowed to retain. Use -1 for unlimited.",
			)
			.meta({ examples: ["-1"] }),
		wal_compression: z
			.enum(["off", "on", "lz4", "zstd"])
			.optional()
			.describe(
				"Compress full-page writes in WAL. Reduces I/O at the cost of CPU. Options vary by PostgreSQL version.",
			)
			.meta({ examples: ["off"] }),
		autovacuum_max_workers: z
			.union([z.string(), z.int().min(1)])
			.optional()
			.describe(
				"Maximum number of autovacuum worker processes that can run at the same time. Workers share a single cost-limit budget, so raising this alone may not speed up vacuuming.",
			)
			.meta({ examples: [8] }),
		autovacuum_naptime: z
			.union([z.string(), z.int().min(1)])
			.optional()
			.describe(
				"Minimum delay between autovacuum runs. Lower values make autovacuum check for work more frequently.",
			)
			.meta({ examples: ["5s"] }),
		autovacuum_work_mem: z
			.union([z.string(), z.int().min(1024)])
			.optional()
			.describe(
				"Maximum memory each autovacuum worker uses to track dead tuples. Higher values reduce repeated index-vacuum passes on large tables. Use -1 to fall back to maintenance_work_mem.",
			)
			.meta({ examples: ["64000kB"] }),
		autovacuum_vacuum_scale_factor: z
			.union([z.string(), z.number().min(0)])
			.optional()
			.describe(
				"Fraction of a table's rows that must change before autovacuum runs. Lower values vacuum large tables more frequently.",
			)
			.meta({ examples: [0.2] }),
		autovacuum_analyze_scale_factor: z
			.union([z.string(), z.number().min(0)])
			.optional()
			.describe(
				"Fraction of a table's rows that must change before autovacuum runs ANALYZE to refresh planner statistics.",
			)
			.meta({ examples: [0.1] }),
		autovacuum_vacuum_insert_scale_factor: z
			.union([z.string(), z.number().min(0)])
			.optional()
			.describe(
				"Fraction of a table's rows that must be inserted before autovacuum runs. Helps vacuum insert-heavy, rarely-updated tables.",
			)
			.meta({ examples: [0.2] }),
		autovacuum_vacuum_cost_limit: z
			.union([z.string(), z.int().min(1)])
			.optional()
			.describe(
				"Cost-accounting limit shared across all autovacuum workers before they pause. Use -1 to inherit vacuum_cost_limit.",
			)
			.meta({ examples: ["-1"] }),
		autovacuum_vacuum_cost_delay: z
			.union([z.string(), z.int().min(0)])
			.optional()
			.describe(
				"Time autovacuum sleeps when the cost limit is reached. Lower values speed up vacuuming at the cost of more I/O.",
			)
			.meta({ examples: ["2ms"] }),
	})
	.describe(
		"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
	)
	.meta({ examples: [{}] });

export const pgBouncerConfigSchema = z
	.record(z.string(), z.string())
	.describe(
		"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
	)
	.meta({ examples: [{}] });

export const pgStorageSizeSchema = z
	.int()
	.describe("The storage size, in GiB, which must be supported by the specified `size`.");

export const pgSizeSchema = z
	.enum([
		"c6gd.large",
		"c6gd.xlarge",
		"c6gd.2xlarge",
		"c6gd.4xlarge",
		"c6gd.8xlarge",
		"c6gd.16xlarge",
		"i7i.large",
		"i7i.xlarge",
		"i7i.2xlarge",
		"i7i.4xlarge",
		"i7i.8xlarge",
		"i7i.12xlarge",
		"i7i.16xlarge",
		"i7i.24xlarge",
		"i7ie.large",
		"i7ie.xlarge",
		"i7ie.2xlarge",
		"i7ie.3xlarge",
		"i7ie.6xlarge",
		"i7ie.12xlarge",
		"i7ie.18xlarge",
		"i7ie.24xlarge",
		"i8g.large",
		"i8g.xlarge",
		"i8g.2xlarge",
		"i8g.4xlarge",
		"i8g.8xlarge",
		"i8g.16xlarge",
		"i8g.24xlarge",
		"i8ge.large",
		"i8ge.xlarge",
		"i8ge.2xlarge",
		"i8ge.3xlarge",
		"i8ge.6xlarge",
		"i8ge.12xlarge",
		"i8ge.18xlarge",
		"i8ge.24xlarge",
		"m6gd.large",
		"m6gd.xlarge",
		"m6gd.2xlarge",
		"m6gd.4xlarge",
		"m6gd.8xlarge",
		"m6gd.16xlarge",
		"m6id.large",
		"m6id.xlarge",
		"m6id.2xlarge",
		"m6id.4xlarge",
		"m6id.8xlarge",
		"m6id.16xlarge",
		"m8gd.large",
		"m8gd.xlarge",
		"m8gd.2xlarge",
		"m8gd.4xlarge",
		"m8gd.8xlarge",
		"m8gd.16xlarge",
		"r6gd.medium",
		"r6gd.large",
		"r6gd.xlarge",
		"r6gd.2xlarge",
		"r6gd.4xlarge",
		"r6gd.8xlarge",
		"r6gd.12xlarge",
		"r6gd.16xlarge",
		"r6id.large",
		"r6id.xlarge",
		"r6id.2xlarge",
		"r6id.4xlarge",
		"r6id.8xlarge",
		"r6id.12xlarge",
		"r6id.16xlarge",
		"r6id.24xlarge",
		"r6id.32xlarge",
		"r8gd.medium",
		"r8gd.large",
		"r8gd.xlarge",
		"r8gd.2xlarge",
		"r8gd.4xlarge",
		"r8gd.8xlarge",
		"r8gd.12xlarge",
		"r8gd.16xlarge",
		"r8gd.24xlarge",
		"r8gd.48xlarge",
		"c4a-highmem-4",
		"c4a-highmem-8",
		"c4a-highmem-16",
		"c4a-highmem-32",
		"c4a-highmem-48",
		"c4a-highmem-64",
		"c4a-highmem-72",
		"c4a-standard-4",
		"c4a-standard-8",
		"c4a-standard-16",
		"c4a-standard-32",
		"c4a-standard-48",
		"c4a-standard-64",
		"c4a-standard-72",
		"c4-highmem-4",
		"c4-highmem-8",
		"c4-highmem-16",
		"c4-highmem-24",
		"c4-highmem-32",
		"c4-highmem-48",
		"c4-highmem-96",
		"c4-highmem-144",
		"c4-highmem-192",
		"c4-highmem-288",
		"c4-standard-4",
		"c4-standard-8",
		"c4-standard-16",
		"c4-standard-24",
		"c4-standard-32",
		"c4-standard-48",
		"c4-standard-96",
		"c4-standard-144",
		"c4-standard-192",
		"c4-standard-288",
		"c4d-highmem-8",
		"c4d-highmem-16",
		"c4d-highmem-32",
		"c4d-highmem-48",
		"c4d-highmem-64",
		"c4d-highmem-96",
		"c4d-highmem-192",
		"c4d-highmem-384",
		"c4d-standard-8",
		"c4d-standard-16",
		"c4d-standard-32",
		"c4d-standard-48",
		"c4d-standard-64",
		"c4d-standard-96",
		"c4d-standard-192",
		"c4d-standard-384",
		"z3-highlssd-8",
		"z3-highlssd-16",
		"z3-highlssd-22",
		"z3-highlssd-32",
		"z3-highlssd-44",
		"z3-highlssd-88",
		"z3-standardlssd-14",
		"z3-standardlssd-22",
		"z3-standardlssd-44",
		"z3-standardlssd-88",
		"z3-standardlssd-176",
	])
	.describe("The VM size for a Postgres service.");

export const pgHaTypeSchema = z
	.enum(["none", "async", "sync"])
	.describe(
		"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
	);

export const pgProviderSchema = z
	.enum(["aws", "gcp"])
	.describe("The cloud provider for a Postgres service.");

export const pgRegionSchema = z.string().describe("The cloud region for a Postgres service.");

export const pgVersionSchema = z.enum(["18", "17"]);

export const pgTagsSchema = z
	.array(resourceTagsV1Schema)
	.max(50)
	.describe(
		"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
	);

export const pgNamePropertySchema = z
	.string()
	.min(1)
	.max(50)
	.describe(
		"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
	);

export const pgIdPropertySchema = z
	.uuid()
	.meta({ examples: ["f71df78e-ddad-82d0-8dfa-abbec741b82e"] });

export const pgStatePropertySchema = z
	.enum([
		"creating",
		"restarting",
		"running",
		"replaying_wal",
		"restoring_backup",
		"finalizing_restore",
		"unavailable",
		"stopped",
		"deleting",
	])
	.describe("Current state of the service");

export const pgIsPrimaryPropertySchema = z
	.boolean()
	.default(false)
	.describe("True if this service is the primary service in the data warehouse");

export const pgCreatedAtPropertySchema = z.iso
	.datetime()
	.meta({ examples: ["2026-03-26T20:51:16.384Z"] });

export const basePostgresServiceSchema = z.object({
	name: pgNamePropertySchema
		.optional()
		.describe(
			"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
		),
	provider: pgProviderSchema.optional().describe("The cloud provider for a Postgres service."),
	region: pgRegionSchema.optional().describe("The cloud region for a Postgres service."),
	postgresVersion: pgVersionSchema.optional(),
	size: pgSizeSchema.optional().describe("The VM size for a Postgres service."),
	haType: pgHaTypeSchema
		.optional()
		.describe(
			"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
		),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
});

export const postgresServiceSchema = z.object({
	name: pgNamePropertySchema
		.optional()
		.describe(
			"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
		),
	provider: pgProviderSchema.optional().describe("The cloud provider for a Postgres service."),
	region: pgRegionSchema.optional().describe("The cloud region for a Postgres service."),
	postgresVersion: pgVersionSchema.optional(),
	size: pgSizeSchema.optional().describe("The VM size for a Postgres service."),
	haType: pgHaTypeSchema
		.optional()
		.describe(
			"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
		),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
	id: pgIdPropertySchema.optional().meta({ examples: ["f71df78e-ddad-82d0-8dfa-abbec741b82e"] }),
	storageSize: pgStorageSizeSchema
		.optional()
		.describe("The storage size, in GiB, which must be supported by the specified `size`."),
	state: pgStatePropertySchema.optional().describe("Current state of the service"),
	createdAt: pgCreatedAtPropertySchema.optional().meta({ examples: ["2026-03-26T20:51:16.384Z"] }),
	isPrimary: pgIsPrimaryPropertySchema
		.optional()
		.default(false)
		.describe("True if this service is the primary service in the data warehouse"),
	connectionString: z
		.string()
		.optional()
		.describe(
			"Connection string to the Postgres service. Embeds the service password, so it is only returned when the service is created or its password is reset. Omitted from every other response when Postgres credential redaction is enabled for the organization. Not guaranteed to be present — treat as optional.",
		),
	username: z.string().optional().describe("Username for the Postgres service"),
	password: z
		.string()
		.optional()
		.describe(
			"Password for the Postgres service. Only returned when the service is created or its password is reset. Omitted from every other response when Postgres credential redaction is enabled for the organization. Not guaranteed to be present — treat as optional.",
		),
	hostname: z.string().optional().describe("Hostname for the Postgres service"),
});

export const postgresServicePostRequestSchema = z.object({
	name: pgNamePropertySchema.describe(
		"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
	),
	provider: pgProviderSchema.describe("The cloud provider for a Postgres service."),
	region: pgRegionSchema.describe("The cloud region for a Postgres service."),
	postgresVersion: pgVersionSchema.optional(),
	size: pgSizeSchema.describe("The VM size for a Postgres service."),
	haType: pgHaTypeSchema
		.optional()
		.describe(
			"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
		),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
	pgConfig: pgConfigSchema
		.optional()
		.describe(
			"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	pgBouncerConfig: pgBouncerConfigSchema
		.optional()
		.describe(
			"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
		)
		.meta({ examples: [{}] }),
});

export const postgresServicePatchRequestSchema = z.object({
	name: pgNamePropertySchema
		.optional()
		.describe(
			"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
		),
	size: pgSizeSchema.optional().describe("The VM size for a Postgres service."),
	haType: pgHaTypeSchema
		.optional()
		.describe(
			"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
		),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
});

export const pgPitrRestoreTargetPropertySchema = z.iso
	.datetime()
	.describe(
		"The point in time at which to recover, as either date/time, named restore point, or a specific transaction ID.",
	)
	.meta({ examples: ["2026-03-31T18:17:37Z"] });

export const pgPasswordSchema = z
	.string()
	.min(12)
	.max(1024)
	.regex(/[a-z]/)
	.describe(
		"Optional password. If not provided a new password is generated and provided in the response. Must contain:\n\n* At least one lowercase letter\n* At least one uppercase letter\n* At least one digit\n",
	);

export const postgresServiceRestoreRequestSchema = z.object({
	name: pgNamePropertySchema.describe(
		"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
	),
	restoreTarget: pgPitrRestoreTargetPropertySchema
		.describe(
			"The point in time at which to recover, as either date/time, named restore point, or a specific transaction ID.",
		)
		.meta({ examples: ["2026-03-31T18:17:37Z"] }),
	pgConfig: pgConfigSchema
		.optional()
		.describe(
			"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	pgBouncerConfig: pgBouncerConfigSchema
		.optional()
		.describe(
			"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
});

export const postgresServiceSetPasswordSchema = z.object({
	password: pgPasswordSchema
		.optional()
		.describe(
			"Optional password. If not provided a new password is generated and provided in the response. Must contain:\n\n* At least one lowercase letter\n* At least one uppercase letter\n* At least one digit\n",
		),
});

export const postgresServicePasswordResourceSchema = z.object({
	password: z
		.string()
		.optional()
		.describe(
			"New Postgres superuser password. Provided only if there was no 'password' in the request.",
		),
});

export const postgresServiceListItemSchema = z.object({
	name: pgNamePropertySchema
		.optional()
		.describe(
			"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
		),
	provider: pgProviderSchema.optional().describe("The cloud provider for a Postgres service."),
	region: pgRegionSchema.optional().describe("The cloud region for a Postgres service."),
	postgresVersion: pgVersionSchema.optional(),
	size: pgSizeSchema.optional().describe("The VM size for a Postgres service."),
	haType: pgHaTypeSchema
		.optional()
		.describe(
			"Type of high availability: “none” for no replication, “async” for asynchronous replication to a single standby, and “sync” for synchronous replication to two standbys.",
		),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
	id: pgIdPropertySchema.optional().meta({ examples: ["f71df78e-ddad-82d0-8dfa-abbec741b82e"] }),
	state: pgStatePropertySchema.optional().describe("Current state of the service"),
	createdAt: pgCreatedAtPropertySchema.optional().meta({ examples: ["2026-03-26T20:51:16.384Z"] }),
	isPrimary: pgIsPrimaryPropertySchema
		.optional()
		.default(false)
		.describe("True if this service is the primary service in the data warehouse"),
});

export const postgresServiceSetStateSchema = z.object({
	command: z
		.enum(["restart", "promote", "switchover"])
		.optional()
		.describe("Postgres status, which initiates a process."),
});

export const postgresServiceReadReplicaRequestSchema = z.object({
	name: pgNamePropertySchema.describe(
		"Name of the Postgres service. Alphanumerical string with whitespaces up to 50 characters.",
	),
	pgConfig: pgConfigSchema
		.optional()
		.describe(
			"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	pgBouncerConfig: pgBouncerConfigSchema
		.optional()
		.describe(
			"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	tags: pgTagsSchema
		.optional()
		.describe(
			"Tags associated with the Postgres service. Tag keys starting with “chc_” are reserved for internal use.",
		),
});

export const postgresInstanceConfigSchema = z.object({
	pgConfig: pgConfigSchema
		.describe(
			"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	pgBouncerConfig: pgBouncerConfigSchema
		.describe(
			"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
		)
		.meta({ examples: [{}] }),
});

export const postgresInstanceUpdateConfigResponseSchema = z.object({
	pgConfig: pgConfigSchema
		.describe(
			"Postgres [runtime configuration](https://www.postgresql.org/docs/current/runtime-config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	pgBouncerConfig: pgBouncerConfigSchema
		.describe(
			"PgBouncer [runtime configuration](https://www.pgbouncer.org/config.html) configuration.",
		)
		.meta({ examples: [{}] }),
	message: z
		.string()
		.optional()
		.describe(
			"Informational message about the configuration update, such as restart requirements.",
		),
});

export const postgresBackupSchema = z.object({
	key: z
		.string()
		.describe("Identifier of the base backup.")
		.meta({ examples: ["basebackups_005/000000010000000000000002_backup_stop_sentinel.json"] }),
	lastModified: z.iso
		.datetime()
		.describe("Time the backup was last written to. ISO-8601.")
		.meta({ examples: ["2026-03-31T18:17:37Z"] }),
});

export const postgresMetricDataPointSchema = z.object({
	timestamp: z.int().describe("Bucket start time as a Unix timestamp in seconds."),
	value: z.number().describe("Metric value for the bucket."),
});

export const postgresMetricSeriesSchema = z.object({
	label: z
		.string()
		.describe(
			'Distinguishing label for this series within the metric (for example a CPU mode, a database name, or "Reads").',
		),
	dataPoints: z
		.array(postgresMetricDataPointSchema)
		.describe("Time-ordered data points, one per bucket."),
});

export const postgresMetricSchema = z.object({
	key: z
		.string()
		.describe(
			"Stable metric identifier (for example cpu_usage, connection_count, cache_hit_ratio).",
		),
	name: z.string().describe("Human-readable metric name."),
	unit: z.string().describe("Unit of the metric values (for example %, IOPS, bytes/s, count)."),
	description: z.string().describe("Human-readable description of what the metric measures."),
	series: z
		.array(postgresMetricSeriesSchema)
		.describe("One series per label dimension of the metric."),
});

export const postgresMetricsSchema = z.object({
	metrics: z
		.array(postgresMetricSchema)
		.describe("Available metrics, each with its bucketed time series."),
});

export const postgresSlowQueryPatternSchema = z.object({
	queryId: z.string().describe("Stable identifier for the query pattern (normalized SQL)."),
	queryText: z.string().describe("Normalized query text with literals replaced by placeholders."),
	dbName: z.string().describe("Database the query ran in."),
	dbUser: z.string().describe("Database user that executed the query."),
	dbOperation: z
		.string()
		.describe(
			"Top-level SQL operation type (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY).",
		),
	app: z
		.string()
		.describe("Value of the Postgres `application_name` for executions matching this pattern."),
	callCount: z.int().describe("Number of times the pattern executed in the window."),
	errorCount: z.int().describe("Number of executions of the pattern that raised an error."),
	totalDurationUs: z.int().describe("Total execution time across all calls, in microseconds."),
	avgDurationUs: z.int().describe("Average execution time per call, in microseconds."),
	maxDurationUs: z.int().describe("Maximum execution time of any call, in microseconds."),
	p50DurationUs: z.int().describe("50th percentile execution time, in microseconds."),
	p95DurationUs: z.int().describe("95th percentile execution time, in microseconds."),
	p99DurationUs: z.int().describe("99th percentile execution time, in microseconds."),
	totalRows: z.int().describe("Total number of rows returned or affected across all calls."),
	totalSharedBlksRead: z
		.int()
		.describe("Total shared buffer blocks read from disk (cache misses) across all calls."),
	totalSharedBlksHit: z
		.int()
		.describe("Total shared buffer blocks hit (cache hits) across all calls."),
	totalCpuTimeUs: z.int().describe("Total CPU time across all calls, in microseconds."),
	totalWalBytes: z.int().describe("Total WAL (write-ahead log) bytes generated across all calls."),
});

export const postgresQueryExecutionSchema = z.object({
	timestamp: z.iso.datetime().describe("Execution timestamp (RFC 3339)."),
	queryId: z.string().describe("Stable identifier for the query pattern."),
	dbName: z.string().describe("Database the query ran in."),
	dbUser: z.string().describe("Database user that executed the query."),
	dbOperation: z.string().describe("Top-level SQL operation type."),
	app: z.string().describe("Value of the Postgres `application_name` for this execution."),
	queryText: z.string().describe("Normalized query text for this execution."),
	pid: z.string().describe("Postgres backend process ID that executed the query."),
	durationUs: z.int().describe("Execution duration in microseconds."),
	rows: z.int().describe("Rows returned or affected."),
	sharedBlksHit: z.int().describe("Shared buffer blocks hit."),
	sharedBlksRead: z.int().describe("Shared buffer blocks read from disk."),
	sharedBlksWritten: z.int().describe("Shared buffer blocks written."),
	sharedBlksDirtied: z.int().describe("Shared buffer blocks dirtied."),
	sharedBlkReadTimeUs: z.int().describe("Time spent reading shared blocks, in microseconds."),
	sharedBlkWriteTimeUs: z.int().describe("Time spent writing shared blocks, in microseconds."),
	localBlksHit: z.int().describe("Local buffer blocks hit (temp tables)."),
	localBlksRead: z.int().describe("Local buffer blocks read (temp tables)."),
	localBlksWritten: z.int().describe("Local buffer blocks written (temp tables)."),
	localBlksDirtied: z.int().describe("Local buffer blocks dirtied (temp tables)."),
	tempBlksRead: z.int().describe("Temp blocks read (spills to disk)."),
	tempBlksWritten: z.int().describe("Temp blocks written (spills to disk)."),
	tempBlkReadTimeUs: z.int().describe("Time spent reading temp blocks, in microseconds."),
	tempBlkWriteTimeUs: z.int().describe("Time spent writing temp blocks, in microseconds."),
	walRecords: z.int().describe("Number of WAL records produced."),
	walBytes: z.int().describe("Number of WAL bytes produced."),
	walFpi: z.int().describe("Number of WAL full-page images produced."),
	cpuUserTimeUs: z.int().describe("CPU time spent in user mode, in microseconds."),
	cpuSysTimeUs: z.int().describe("CPU time spent in kernel mode, in microseconds."),
	jitFunctions: z.int().describe("Number of JIT-compiled functions."),
	jitGenerationTimeUs: z.int().describe("JIT generation time, in microseconds."),
	jitInliningTimeUs: z.int().describe("JIT inlining time, in microseconds."),
	jitOptimizationTimeUs: z.int().describe("JIT optimization time, in microseconds."),
	jitEmissionTimeUs: z.int().describe("JIT emission time, in microseconds."),
	jitDeformTimeUs: z.int().describe("JIT deform time, in microseconds."),
	parallelWorkersPlanned: z.int().describe("Parallel workers planned for this execution."),
	parallelWorkersLaunched: z
		.int()
		.describe("Parallel workers actually launched for this execution."),
	errMessage: z.string().optional().describe("Error message if the execution raised an error."),
	errSqlstate: z
		.string()
		.optional()
		.describe("Postgres SQLSTATE code if the execution raised an error."),
	errElevel: z
		.int()
		.optional()
		.describe("Postgres error severity level if the execution raised an error."),
	serverRole: z
		.string()
		.describe("Role of the server that executed the query (for example, primary or standby)."),
	traceId: z.string().optional().describe("OpenTelemetry trace ID associated with the execution."),
	spanId: z.string().optional().describe("OpenTelemetry span ID associated with the execution."),
});

export const postgresSlowQueryPatternDetailSchema = z.object({
	aggregate: postgresSlowQueryPatternSchema.optional(),
	recentExecutions: z
		.array(postgresQueryExecutionSchema)
		.describe("Recent individual executions matching the pattern."),
});

export const postgresLogEntrySchema = z.object({
	timestamp: z.iso.datetime().describe("Time the entry was logged (RFC 3339)."),
	severity: z
		.string()
		.describe("PostgreSQL severity of the entry (for example, LOG, WARNING, ERROR, FATAL, PANIC)."),
	body: z
		.string()
		.describe(
			"Raw log entry body as emitted by PostgreSQL. Structured bodies are returned as a JSON-encoded string.",
		),
});

export const upgradeWindowSchema = z.object({
	weekday: z
		.int()
		.min(0)
		.max(6)
		.describe("Day of the week the upgrade window starts. 0 = Sunday, 1 = Monday, …, 6 = Saturday.")
		.meta({ examples: [3] }),
	startHourUtc: z
		.union([z.literal(0), z.literal(6), z.literal(12), z.literal(18)])
		.describe("UTC hour when the upgrade window starts. Must be one of 0, 6, 12, or 18.")
		.meta({ examples: [12] }),
	duration: z
		.literal(6)
		.describe("Length of the upgrade window in hours. Currently only a 6-hour window is supported.")
		.meta({ examples: [6] }),
});

export const upgradeWindowPutRequestSchema = z.object({
	weekday: z
		.int()
		.min(0)
		.max(6)
		.describe("Day of the week the upgrade window starts. 0 = Sunday, 1 = Monday, …, 6 = Saturday.")
		.meta({ examples: [3] }),
	startHourUtc: z
		.union([z.literal(0), z.literal(6), z.literal(12), z.literal(18)])
		.describe(
			"UTC hour when the upgrade window starts. Must be one of 0, 6, 12, or 18. The upgrade window currently lasts 6 hours from this start time.",
		)
		.meta({ examples: [12] }),
});

export const organizationPatchRequestSchema = z.object({
	name: z.string().optional().describe("Name of the organization."),
	privateEndpoints: organizationPrivateEndpointsPatchSchema.optional(),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe(
			"Whether crash reports (core dumps) collection is enabled for services in the organization. When disabled at the organization level, individual services cannot enable crash reports.",
		),
});

export const instanceServiceQueryApiEndpointsPostRequestSchema = z.object({
	roles: z.array(z.enum(["sql_console_read_only", "sql_console_admin"])).describe("The roles"),
	openApiKeys: z.array(z.string()).describe("The version of the service query endpoint"),
	allowedOrigins: z
		.string()
		.optional()
		.describe("The allowed origins as comma separated list of domains"),
});

export const servicePostResponseSchema = z.object({
	service: serviceSchema.optional(),
	password: z.string().optional().describe("Password for the newly created service."),
});

export const servicePostRequestSchema = z.object({
	name: z
		.string()
		.min(1)
		.max(50)
		.describe("Name of the service. Alphanumerical string with whitespaces up to 50 characters."),
	provider: z.enum(["aws", "gcp", "azure"]).describe("Cloud provider"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.describe("Service region."),
	tier: z
		.enum(["development", "production"])
		.optional()
		.describe(
			"DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production'. Production services scale, Development are fixed size. Azure services don't support Development tier",
		),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.describe("List of IP addresses allowed to access the service"),
	minTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [48] }),
	maxTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [360] }),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.optional()
		.describe(
			'Autoscaling mode. "vertical" (the default when omitted) runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory (minReplicaMemoryGb equal to maxReplicaMemoryGb). Horizontal requires the feature to be enabled for the organization.',
		)
		.meta({ examples: ["vertical"] }),
	minReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Minimum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and greater than or equal to 8.",
		)
		.meta({ examples: [16] }),
	maxReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Maximum total memory of each replica during auto-scaling in Gb. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales). Must be a multiple of 4 and lower than or equal to 120* for non paid services or 356* for paid services.* - maximum replica size subject to cloud provider hardware availability in your selected region. ",
		)
		.meta({ examples: [120] }),
	numReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Fixed replica count for vertical autoscaling (autoscalingMode "vertical" or omitted). Mutually exclusive with minReplicas/maxReplicas.',
		)
		.meta({ examples: [3] }),
	minReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Minimum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with maxReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the organization, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).',
		)
		.meta({ examples: [1] }),
	maxReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Maximum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with minReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the organization, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).',
		)
		.meta({ examples: [5] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe(
			"When set to true the service is allowed to scale down to zero when idle. True by default.",
		),
	idleTimeoutMinutes: z
		.number()
		.optional()
		.describe("Set minimum idling timeout (in minutes). Must be >= 5 minutes."),
	isReadonly: z
		.boolean()
		.optional()
		.describe(
			"True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
		),
	dataWarehouseId: z.string().optional().describe("Data warehouse containing this service"),
	backupId: z
		.uuid()
		.optional()
		.describe(
			"Optional backup ID used as an initial state for the new service. When used the region and the tier of the new instance must be the same as the values of the original instance. If the backup is stored in your organization's own bucket, `backupEncryptionConfig` is required; it must be omitted otherwise.",
		),
	backupEncryptionConfig: backupEncryptionConfigSchema
		.optional()
		.describe(
			"The `encryption_config.json` stored alongside this backup in your bucket, passed through unchanged. Supply the file contents verbatim rather than constructing this object — its shape is versioned and depends on your cloud provider. See [Export backups to your own cloud account](https://clickhouse.com/docs/cloud/manage/backups/export-backups-to-own-cloud-account) for what it contains.\n\nAccepted only for organizations enrolled in the private preview, and only when the backup is of a service that has transparent data encryption enabled. Such a restore always produces a service with transparent data encryption enabled, inherited from the source service.",
		)
		.meta({ examples: [{}] }),
	encryptionKey: z.string().optional().describe("Optional customer provided disk encryption key"),
	encryptionAssumedRoleIdentifier: z
		.string()
		.optional()
		.describe("Optional role to use for disk encryption"),
	privateEndpointIds: z
		.array(z.string())
		.optional()
		.describe(
			"DEPRECATED. To associate the service with private endpoints, first create the service, then use the `Update Service Basic Details` endpoint with the `privateEndpointIds` field to modify private endpoints.",
		),
	privatePreviewTermsChecked: z
		.boolean()
		.optional()
		.describe(
			"Accept the private preview terms and conditions. It is only needed when creating the first service in the organization in case of a private preview",
		),
	releaseChannel: z
		.enum(["slow", "default", "fast"])
		.optional()
		.describe(
			"Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
		),
	byocId: z
		.string()
		.optional()
		.describe(
			"This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
		),
	hasTransparentDataEncryption: z
		.boolean()
		.optional()
		.describe(
			"True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
		),
	endpoints: z
		.array(serviceEndpointChangeSchema)
		.optional()
		.describe("List of service endpoints to enable or disable"),
	profile: z
		.string()
		.optional()
		.describe(
			"Custom instance profile. Only available for ENTERPRISE and BYOC organization tiers. Standard values: 'v1-default', 'v1-highmem-xs', 'v1-highmem-s', 'v1-highmem-m', 'v1-highmem-l', 'v1-highmem-xl'. BYOC services may instead use a dynamic BYOC profile configured for their infrastructure (e.g. 'v1-standard-byoc-4'); it requires byocId, and minReplicaMemoryGb and maxReplicaMemoryGb must both equal the profile's memory size. Use the serviceProfiles endpoint to list the profiles available to the organization.",
		),
	complianceType: z
		.enum(["hipaa", "pci"])
		.optional()
		.describe("Type of regulatory compliance for service."),
	tags: z
		.array(resourceTagsV1Schema)
		.max(50)
		.optional()
		.describe("Tags associated with the service."),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe("Enables the underlying infra for collecting core dumps. Default is enabled."),
});

export const servicePatchRequestSchema = z.object({
	name: z
		.string()
		.min(1)
		.max(50)
		.optional()
		.describe("Name of the service. Alphanumerical string with whitespaces up to 50 characters."),
	ipAccessList: ipAccessListPatchSchema.optional(),
	privateEndpointIds: instancePrivateEndpointsPatchSchema.optional(),
	releaseChannel: z
		.enum(["slow", "default", "fast"])
		.optional()
		.describe(
			"Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
		),
	endpoints: z
		.array(serviceEndpointChangeSchema)
		.optional()
		.describe("List of service endpoints to change"),
	transparentDataEncryptionKeyId: z.string().optional().describe("The id of the key to rotate"),
	tags: instanceTagsPatchSchema.optional(),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe("If true, the underlying infra is enabled for collecting core dumps."),
});

export const serviceStatePatchRequestSchema = z.object({
	command: z
		.enum(["start", "stop", "awake"])
		.describe("Command to change the state: 'start', 'stop', 'awake'."),
});

export const serviceScalingPatchRequestSchema = z.object({
	minTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [48] }),
	maxTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [360] }),
	numReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Number of replicas for the service. The number of replicas must be between 2 and 50 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier and its per-warehouse replica limit. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers.",
		)
		.meta({ examples: [3] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe(
			"When set to true the service is allowed to scale down to zero when idle. True by default.",
		),
	idleTimeoutMinutes: z
		.number()
		.optional()
		.describe("Set minimum idling timeout (in minutes). Must be >= 5 minutes."),
});

export const serviceScalingPatchResponseSchema = z.object({
	id: z.uuid().optional().describe("Unique service ID."),
	name: z
		.string()
		.min(1)
		.max(50)
		.optional()
		.describe("Name of the service. Alphanumerical string with whitespaces up to 50 characters."),
	provider: z.enum(["aws", "gcp", "azure"]).optional().describe("Cloud provider"),
	region: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.optional()
		.describe("Service region."),
	state: z
		.enum([
			"starting",
			"stopping",
			"terminating",
			"softdeleting",
			"awaking",
			"partially_running",
			"provisioning",
			"running",
			"stopped",
			"terminated",
			"softdeleted",
			"degraded",
			"failed",
			"idle",
		])
		.optional()
		.describe("Current state of the service."),
	clickhouseVersion: z.string().optional().describe("ClickHouse version of the service."),
	endpoints: z.array(serviceEndpointSchema).optional().describe("List of all service endpoints."),
	tier: z
		.enum([
			"development",
			"production",
			"dedicated_high_mem",
			"dedicated_high_cpu",
			"dedicated_standard",
			"dedicated_standard_n2d_standard_4",
			"dedicated_standard_n2d_standard_8",
			"dedicated_standard_n2d_standard_32",
			"dedicated_standard_n2d_standard_128",
			"dedicated_standard_n2d_standard_32_16SSD",
			"dedicated_standard_n2d_standard_64_24SSD",
		])
		.optional()
		.describe(
			"DEPRECATED for BASIC, SCALE and ENTERPRISE organization tiers. Use `minReplicaMemoryGb`, `maxReplicaMemoryGb`, and `numReplicas` instead. Tier of the service: 'development', 'production', 'dedicated_high_mem', 'dedicated_high_cpu', 'dedicated_standard', 'dedicated_standard_n2d_standard_4', 'dedicated_standard_n2d_standard_8', 'dedicated_standard_n2d_standard_32', 'dedicated_standard_n2d_standard_128', 'dedicated_standard_n2d_standard_32_16SSD', 'dedicated_standard_n2d_standard_64_24SSD'. Production services scale, Development are fixed size. Azure services don't support Development tier",
		),
	minTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `minReplicaMemoryGb` instead. Minimum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and greater than or equal to 24. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [48] }),
	maxTotalMemoryGb: z
		.number()
		.min(24)
		.max(1068)
		.multipleOf(12)
		.optional()
		.describe(
			"DEPRECATED - inaccurate for services with non-default numbers of replicas. Use `maxReplicaMemoryGb` instead. Maximum memory of three workers during auto-scaling in Gb. Available only for 'production' services. Must be a multiple of 12 and lower than or equal to 360 for non paid services or 1068 for paid services. Always absent for horizontal-autoscaling services (replica count is variable).",
		)
		.meta({ examples: [360] }),
	minReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Minimum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and greater than or equal to 8. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal (memory is fixed while the replica count scales).",
		)
		.meta({ examples: [16] }),
	maxReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Maximum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 356 for paid services. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal (memory is fixed while the replica count scales).",
		)
		.meta({ examples: [120] }),
	numReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Number of replicas for the service. The number of replicas must be between 2 and 50 for the first service in a warehouse. Services that are created in an existing warehouse can have a number of replicas as low as 1. Further restrictions may apply based on your organization's tier and its per-warehouse replica limit. It defaults to 1 for the BASIC tier and 3 for the SCALE and ENTERPRISE tiers. Present only when the service uses vertical autoscaling. For horizontal autoscaling, use minReplicas and maxReplicas instead.",
		)
		.meta({ examples: [3] }),
	minReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Minimum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling.",
		)
		.meta({ examples: [1] }),
	maxReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			"Maximum number of replicas for horizontal autoscaling. Present only when the service uses horizontal autoscaling.",
		)
		.meta({ examples: [5] }),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.describe(
			'Configured autoscaling mode. "vertical" runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory. This is the baseline configuration; the mode currently applied (which may differ while a schedule entry is active) is currentScaling.effectiveAutoscalingMode.',
		)
		.meta({ examples: ["vertical"] }),
	replicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Fixed memory per replica in Gb for horizontal autoscaling. Present only when the service uses horizontal autoscaling. Must be a multiple of 4, at least 8 Gb, and at most 120 Gb for non paid services or 356 Gb for paid services.",
		)
		.meta({ examples: [32] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe(
			"When set to true the service is allowed to scale down to zero when idle. True by default.",
		),
	idleTimeoutMinutes: z
		.number()
		.optional()
		.describe("Set minimum idling timeout (in minutes). Must be >= 5 minutes."),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe("List of IP addresses allowed to access the service"),
	createdAt: z.iso.datetime().optional().describe("Service creation timestamp. ISO-8601."),
	encryptionKey: z.string().optional().describe("Optional customer provided disk encryption key"),
	encryptionAssumedRoleIdentifier: z
		.string()
		.optional()
		.describe("Optional role to use for disk encryption"),
	iamRole: z.string().optional().describe("IAM role used for accessing objects in s3"),
	privateEndpointIds: z.array(z.string()).optional().describe("List of private endpoints"),
	availablePrivateEndpointIds: z
		.array(z.string())
		.optional()
		.describe("List of available private endpoints ids that can be attached to the service"),
	dataWarehouseId: z.string().optional().describe("Data warehouse containing this service"),
	isPrimary: z
		.boolean()
		.optional()
		.describe("True if this service is the primary service in the data warehouse"),
	isReadonly: z
		.boolean()
		.optional()
		.describe(
			"True if this service is read-only. It can only be read-only if a dataWarehouseId is provided.",
		),
	releaseChannel: z
		.enum(["slow", "default", "fast"])
		.optional()
		.describe(
			"Select fast if you want to get new ClickHouse releases as soon as they are available. You'll get new features faster, but with a higher risk of bugs. Select slow if you would like to defer releases to give yourself more time to test. This feature is only available for production services. default is the regular release channel.",
		),
	byocId: z
		.string()
		.optional()
		.describe(
			"This is the ID returned after setting up a region for Bring Your Own Cloud (BYOC). When the byocId parameter is specified, the minReplicaMemoryGb and the maxReplicaGb parameters are required too, with values included among the following sizes: 48, 116, 172, 232.",
		),
	hasTransparentDataEncryption: z
		.boolean()
		.optional()
		.describe(
			"True if the service should have the Transparent Data Encryption (TDE) enabled. TDE is only available for ENTERPRISE organizations tiers and can only be enabled at service creation.",
		),
	profile: z
		.string()
		.optional()
		.describe(
			"Custom instance profile. Only available for ENTERPRISE and BYOC organization tiers. Standard values: 'v1-default', 'v1-highmem-xs', 'v1-highmem-s', 'v1-highmem-m', 'v1-highmem-l', 'v1-highmem-xl'. BYOC services may instead use a dynamic BYOC profile configured for their infrastructure (e.g. 'v1-standard-byoc-4'); it requires byocId, and minReplicaMemoryGb and maxReplicaMemoryGb must both equal the profile's memory size. Use the serviceProfiles endpoint to list the profiles available to the organization.",
		),
	transparentDataEncryptionKeyId: z
		.string()
		.optional()
		.describe(
			"The ID of the Transparent Data Encryption key used for the service. This is only available if hasTransparentDataEncryption is true.",
		),
	encryptionRoleId: z
		.string()
		.optional()
		.describe(
			"The ID of the IAM role used for encryption. This is only available if hasTransparentDataEncryption is true.",
		),
	complianceType: z
		.enum(["hipaa", "pci"])
		.optional()
		.describe("Type of regulatory compliance for service."),
	tags: z
		.array(resourceTagsV1Schema)
		.max(50)
		.optional()
		.describe("Tags associated with the service."),
	enableCoreDumps: z
		.boolean()
		.optional()
		.describe(
			"True if the service's underline infra is enabled for collecting core dumps. This is an experimental feature",
		),
	scalingSchedule: scalingScheduleSchema.optional(),
	currentScaling: currentScalingSchema,
});

export const serviceReplicaScalingPatchRequestSchema = z.object({
	minReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Minimum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and greater than or equal to 8. A range in vertical autoscaling; equal to maxReplicaMemoryGb in horizontal.",
		)
		.meta({ examples: [16] }),
	maxReplicaMemoryGb: z
		.number()
		.min(8)
		.max(356)
		.multipleOf(4)
		.optional()
		.describe(
			"Maximum auto-scaling memory in Gb for a single replica. Available only for 'production' services. Must be a multiple of 4 and lower than or equal to 120 for non paid services or 356 for paid services. A range in vertical autoscaling; equal to minReplicaMemoryGb in horizontal.",
		)
		.meta({ examples: [120] }),
	autoscalingMode: z
		.enum(["vertical", "horizontal"])
		.optional()
		.describe(
			'Target autoscaling mode. Omit to keep the service on its current mode. "vertical" runs a fixed replica count while memory scales between minReplicaMemoryGb and maxReplicaMemoryGb; "horizontal" scales the replica count between minReplicas and maxReplicas at a fixed per-replica memory (minReplicaMemoryGb equal to maxReplicaMemoryGb). Switching to horizontal requires the feature to be enabled for the organization.',
		)
		.meta({ examples: ["vertical"] }),
	numReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Fixed replica count for vertical autoscaling (autoscalingMode "vertical"). Mutually exclusive with minReplicas/maxReplicas. When switching to vertical (autoscalingMode "vertical") with numReplicas and no memory, the service\'s stored baseline per-replica memory is kept as the new vertical range. Please contact support to enable adjustment of numReplicas.',
		)
		.meta({ examples: [3] }),
	minReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Minimum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with maxReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the service, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).',
		)
		.meta({ examples: [1] }),
	maxReplicas: z
		.int()
		.min(1)
		.max(50)
		.optional()
		.describe(
			'Maximum number of replicas. A minReplicas/maxReplicas band scales the replica count in horizontal autoscaling (autoscalingMode "horizontal"). Must be provided together with minReplicas. Mutually exclusive with numReplicas. Requires horizontal autoscaling to be enabled for the service, unless autoscalingMode is omitted or "vertical" and minReplicas equals maxReplicas (an equal band is then an accepted vertical fixed count and needs no horizontal entitlement).',
		)
		.meta({ examples: [5] }),
	idleScaling: z
		.boolean()
		.optional()
		.describe(
			"When set to true the service is allowed to scale down to zero when idle. True by default.",
		),
	idleTimeoutMinutes: z
		.number()
		.optional()
		.describe("Set minimum idling timeout (in minutes). Must be >= 5 minutes."),
});

export const servicePasswordPatchResponseSchema = z.object({
	password: z
		.string()
		.optional()
		.describe(
			"New service password. Provided only if there was no 'newPasswordHash' in the request",
		),
});

export const servicePasswordPatchRequestSchema = z.object({
	newPasswordHash: z
		.string()
		.optional()
		.describe(
			"Optional password hash. Used to avoid password transmission over network. If not provided a new password is generated and is provided in the response. Otherwise this hash is used. Algorithm: echo -n \"yourpassword\" | sha256sum | tr -d '-' | xxd -r -p | base64",
		),
	newDoubleSha1Hash: z
		.string()
		.optional()
		.describe(
			"Optional double SHA1 password hash for MySQL protocol. If newPasswordHash is not provided this key will be ignored and the generated password will be used. Algorithm: echo -n \"yourpassword\" | sha1sum | tr -d '-' | xxd -r -p | sha1sum | tr -d '-'",
		),
});

export const servicPrivateEndpointePostRequestSchema = z.object({
	id: z.string().describe("Private endpoint identifier"),
	description: z.string().optional().describe("Description of private endpoint"),
});

export const serviceClickhouseSettingsPatchRequestSchema = z.object({
	settings: serviceClickhouseSettingsMapSchema
		.describe(
			"Nonempty object mapping configurable setting names to their values. Use DELETE to reset a setting.",
		)
		.meta({ examples: [{}] }),
});

export const backupConfigurationPatchRequestSchema = z.object({
	backupPeriodInHours: z.number().nullish().describe("The interval in hours between each backup."),
	backupRetentionPeriodInHours: z
		.number()
		.nullish()
		.describe(
			"The minimum duration in hours for which the backups are available. Must be a whole number of days between 24 (1 day) and 1080 (45 days) — i.e. a multiple of 24.",
		),
	backupStartTime: z
		.string()
		.nullish()
		.describe(
			"The time in HH:MM format for the backups to be performed (evaluated in UTC timezone). When defined the backup period resets to every 24 hours.",
		),
});

export const snapshotConfigurationPatchRequestSchema = z.object({
	enabled: z
		.boolean()
		.optional()
		.describe("Whether scheduled snapshots are enabled for the service."),
	gap: z
		.number()
		.optional()
		.describe(
			"Interval between snapshots, in minutes. Set together with timeFrame; only supported preset pairs are accepted.",
		),
	timeFrame: z
		.number()
		.optional()
		.describe(
			"Retention window the snapshots cover, in minutes. Set together with gap; only supported preset pairs are accepted.",
		),
});

export const apiKeyPostResponseSchema = z.object({
	key: apiKeySchema.optional(),
	keyId: z
		.string()
		.optional()
		.describe("Generated key ID. Provided only if there was no 'hashData' in the request."),
	keySecret: z
		.string()
		.optional()
		.describe("Generated key secret. Provided only if there was no 'hashData' in the request."),
});

export const apiKeyPostRequestSchema = z.object({
	name: z.string().describe("Name of the key."),
	expireAt: z.iso
		.datetime()
		.nullish()
		.describe(
			"Timestamp the key expires. If not present, `null` or is empty the key never expires. ISO-8601.",
		),
	state: z
		.enum(["enabled", "disabled"])
		.optional()
		.describe(
			"Initial state of the key: 'enabled', 'disabled'. If not provided the new key will be 'enabled'.",
		),
	hashData: apiKeyHashDataSchema.optional(),
	roles: z
		.array(z.enum(["admin", "developer", "query_endpoints"]))
		.optional()
		.describe(
			"DEPRECATED. Use `assignedRoleIds` instead. List of roles assigned to the key. Contains at least 1 element.",
		),
	assignedRoleIds: z
		.array(z.uuid())
		.optional()
		.describe("Array of role UUIDs to assign to the API key"),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe("List of IP addresses allowed to access the API using this key"),
});

export const apiKeyPatchRequestSchema = z.object({
	name: z.string().optional().describe("Name of the key"),
	roles: z
		.array(z.enum(["admin", "developer", "query_endpoints"]))
		.optional()
		.describe("DEPRECATED. Use `assignedRoleIds` instead. List of roles assigned to the key."),
	assignedRoleIds: z
		.array(z.uuid())
		.optional()
		.describe("Array of role UUIDs to assign to the API key"),
	expireAt: z.iso
		.datetime()
		.nullish()
		.describe("Timestamp the key expires. If `null` or is empty the key never expires. ISO-8601."),
	state: z
		.enum(["enabled", "disabled"])
		.optional()
		.describe("State of the key: 'enabled', 'disabled'."),
	ipAccessList: z
		.array(ipAccessListEntrySchema)
		.optional()
		.describe("List of IP addresses allowed to access the API using this key"),
});

export const memberPatchRequestSchema = z.object({
	role: z
		.enum(["admin", "developer"])
		.optional()
		.describe("DEPRECATED. Use `assignedRoleIds` instead. Role of the member in the organization."),
	assignedRoleIds: z
		.array(z.string())
		.optional()
		.describe("List of role IDs to assign to the member"),
});

export const invitationPostRequestSchema = z.object({
	email: z
		.email()
		.describe(
			"Email of the invited user. Only a user with this email can join using the invitation. The email is stored in a lowercase form.",
		),
	role: z
		.enum(["admin", "developer"])
		.optional()
		.describe(
			"DEPRECATED. Use `assignedRoleIds` instead. Role to assign to the invited user in the organization.",
		),
	assignedRoleIds: z
		.array(z.string())
		.optional()
		.describe("List of role IDs to assign to the invited user when they accept the invitation"),
});

export const clickPipePostRequestSchema = z.object({
	name: z.string().describe("Name of the ClickPipe."),
	source: clickPipePostSourceSchema,
	destination: clickPipeMutateDestinationSchema,
	fieldMappings: z
		.array(clickPipeFieldMappingSchema)
		.optional()
		.describe(
			"Field mappings of the ClickPipe. Note that all destination columns must be included in the mappings.",
		),
	scaling: clickPipeScalingSchema.optional(),
	settings: clickPipeSettingsSchema.optional(),
	startPaused: z
		.boolean()
		.optional()
		.describe(
			"Create the ClickPipe in the Stopped state instead of starting ingestion immediately. Start it later with the state endpoint. Not supported for database ClickPipes.",
		),
});

export const clickPipeSchemaDiscoveryRequestSchema = z.object({
	source: clickPipeSchemaDiscoverySourceSchema,
});

export const clickPipePatchRequestSchema = z.object({
	name: z.string().optional().describe("Name of the ClickPipe."),
	source: clickPipePatchSourceSchema.optional(),
	destination: clickPipePatchDestinationSchema.optional(),
	fieldMappings: z
		.array(clickPipeFieldMappingSchema)
		.optional()
		.describe(
			"Field mappings of the ClickPipe. This will not update the table schema, only the ClickPipe configuration.",
		),
	settings: clickPipeSettingsSchema.optional(),
});

export const clickPipeScalingPatchRequestSchema = z.object({
	replicas: z
		.int()
		.min(1)
		.max(40)
		.optional()
		.describe("Number of replicas to scale to. Use to scale Kafka pipes."),
	concurrency: z
		.int()
		.min(0)
		.max(34)
		.optional()
		.describe("Number of concurrency to scale to. Use to scale S3 pipes."),
	replicaCpuMillicores: z
		.int()
		.min(125)
		.max(2000)
		.optional()
		.describe("CPU in millicores for each replica. Use to scale streaming pipes."),
	replicaMemoryGb: z
		.number()
		.min(0.5)
		.max(8)
		.optional()
		.describe("Memory in GB for each replica. Use to scale streaming pipes."),
});

export const clickPipeStatePatchRequestSchema = z.object({
	command: z
		.enum(["start", "stop", "resync"])
		.describe("Command to change the state: 'start', 'stop', 'resync'."),
});

export const clickPipesCdcScalingPatchRequestSchema = z.object({
	replicaCpuMillicores: z
		.int()
		.min(1000)
		.max(32000)
		.multipleOf(1000)
		.optional()
		.describe("CPU in millicores for DB ClickPipes.")
		.meta({ examples: [2000] }),
	replicaMemoryGb: z
		.number()
		.min(4)
		.max(128)
		.multipleOf(4)
		.optional()
		.describe("Memory in GiB for DB ClickPipes. Must be 4× the CPU core count.")
		.meta({ examples: [8] }),
});

export const byocInfrastructurePostRequestSchema = z.object({
	regionId: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.describe("Region in which the BYOC infrastructure will be located"),
	accountId: z
		.string()
		.describe(
			"Cloud account ID the BYOC infrastructure is configured for: AWS account ID, GCP project ID, or Azure subscription ID",
		)
		.meta({ examples: ["123456789012"] }),
	availabilityZoneSuffixes: z
		.array(z.enum(["a", "b", "c", "d", "e", "f"]))
		.optional()
		.describe("List of availability zone suffixes"),
	vpcCidrRange: z
		.string()
		.optional()
		.describe(
			"CIDR range for the ClickHouse-managed VPC. Mutually exclusive with the BYO-VPC fields (`vpcId`, `privateSubnetIds`, `publicSubnetIds`)",
		)
		.meta({ examples: ["10.0.0.0/16"] }),
	externalId: z
		.string()
		.optional()
		.describe(
			"AWS only: ExternalID baked into the ClickHouse management role trust policy in your account",
		)
		.meta({ examples: ["ch-0a1b2c3d4e5f6789"] }),
	tenantId: z
		.string()
		.optional()
		.describe("Azure only (required for Azure regions): Entra tenant ID of the subscription"),
	servicePrincipalClientId: z
		.string()
		.optional()
		.describe(
			"Azure only (required for Azure regions): client ID of the service principal ClickHouse uses to manage the infrastructure",
		),
	vpcId: z
		.string()
		.optional()
		.describe(
			"BYO-VPC only (AWS and GCP): ID or network name of the customer-provided VPC to deploy into. Requires `privateSubnetIds`",
		)
		.meta({ examples: ["vpc-0abc1234def567890"] }),
	privateSubnetIds: z
		.array(z.string())
		.optional()
		.describe("BYO-VPC only: private subnet IDs or names (1-6 entries on AWS, exactly one on GCP)"),
	publicSubnetIds: z
		.array(z.string())
		.optional()
		.describe("AWS BYO-VPC only: public subnet IDs (at most 6 entries)"),
	gcpPodCidrRangeNames: z
		.array(z.string())
		.optional()
		.describe(
			"GCP BYO-VPC only: secondary IP range names on the subnet to use for pod IPs. Omitted: all secondary ranges are used",
		),
	gcpSharedVpcHostProjectId: z
		.string()
		.optional()
		.describe(
			"GCP BYO-VPC only: Shared VPC host project owning the VPC and subnet, when different from `accountId`",
		),
	tags: byocInfrastructureTagsSchema.optional(),
	displayName: z.string().optional().describe("Human readable name for infrastructure"),
});

export const byocInfrastructureValidatePostRequestSchema = z.object({
	regionId: z
		.enum([
			"ap-northeast-1",
			"ap-northeast-2",
			"ap-south-1",
			"ap-southeast-1",
			"ap-southeast-2",
			"ca-central-1",
			"eu-central-1",
			"eu-west-1",
			"eu-west-2",
			"il-central-1",
			"us-east-1",
			"us-east-2",
			"us-west-2",
			"us-east1",
			"us-central1",
			"europe-west2",
			"europe-west4",
			"asia-southeast1",
			"asia-northeast1",
			"eastus",
			"eastus2",
			"westus3",
			"germanywestcentral",
			"centralus",
		])
		.describe("Region in which the BYOC infrastructure will be located"),
	accountId: z
		.string()
		.describe(
			"Cloud account ID the BYOC infrastructure is configured for: AWS account ID, GCP project ID, or Azure subscription ID",
		)
		.meta({ examples: ["123456789012"] }),
	availabilityZoneSuffixes: z
		.array(z.enum(["a", "b", "c", "d", "e", "f"]))
		.optional()
		.describe("List of availability zone suffixes"),
	vpcCidrRange: z
		.string()
		.optional()
		.describe(
			"CIDR range for the ClickHouse-managed VPC. Mutually exclusive with the BYO-VPC fields (`vpcId`, `privateSubnetIds`, `publicSubnetIds`)",
		)
		.meta({ examples: ["10.0.0.0/16"] }),
	externalId: z
		.string()
		.optional()
		.describe(
			"AWS only: ExternalID baked into the ClickHouse management role trust policy in your account",
		)
		.meta({ examples: ["ch-0a1b2c3d4e5f6789"] }),
	tenantId: z
		.string()
		.optional()
		.describe("Azure only (required for Azure regions): Entra tenant ID of the subscription"),
	servicePrincipalClientId: z
		.string()
		.optional()
		.describe(
			"Azure only (required for Azure regions): client ID of the service principal ClickHouse uses to manage the infrastructure",
		),
	vpcId: z
		.string()
		.optional()
		.describe(
			"BYO-VPC only (AWS and GCP): ID or network name of the customer-provided VPC to deploy into. Requires `privateSubnetIds`",
		)
		.meta({ examples: ["vpc-0abc1234def567890"] }),
	privateSubnetIds: z
		.array(z.string())
		.optional()
		.describe("BYO-VPC only: private subnet IDs or names (1-6 entries on AWS, exactly one on GCP)"),
	publicSubnetIds: z
		.array(z.string())
		.optional()
		.describe("AWS BYO-VPC only: public subnet IDs (at most 6 entries)"),
	gcpPodCidrRangeNames: z
		.array(z.string())
		.optional()
		.describe(
			"GCP BYO-VPC only: secondary IP range names on the subnet to use for pod IPs. Omitted: all secondary ranges are used",
		),
	gcpSharedVpcHostProjectId: z
		.string()
		.optional()
		.describe(
			"GCP BYO-VPC only: Shared VPC host project owning the VPC and subnet, when different from `accountId`",
		),
	tags: byocInfrastructureTagsSchema.optional(),
});

export const byocInfrastructurePatchRequestSchema = z.object({
	displayName: z.string().optional().describe("Human readable name for infrastructure object"),
	enablePrivateLink: z
		.boolean()
		.optional()
		.describe(
			"Enable or disable private link connectivity on the infrastructure. Disabling is rejected while any service in the organization has active private endpoints",
		),
	gcpPscSubnetId: z
		.string()
		.optional()
		.describe(
			"GCP BYO-VPC only: customer-provided Private Service Connect NAT subnet name required to enable private link. Only accepted together with `enablePrivateLink: true`",
		),
	enablePrivateLoadBalancer: z
		.boolean()
		.optional()
		.describe("Enable or disable the private (internal) load balancer of the infrastructure"),
	enablePublicLoadBalancer: z
		.boolean()
		.optional()
		.describe("Enable or disable the public (internet-facing) load balancer of the infrastructure"),
	tags: byocInfrastructureTagsSchema.optional(),
});

export const publicQueryApiEndpointRequestSchema = z.object({
	name: z.string().min(1).regex(/\S/).describe("Name of the Query API endpoint."),
	sql: z.string().max(4194304).regex(/\S/).describe("SQL executed by the endpoint."),
	database: z.string().regex(/\S/).describe("Database used by the Query API endpoint."),
	parameters: z
		.record(z.string(), z.string())
		.optional()
		.default({})
		.describe("Default query parameters."),
	apiKeyIds: z.array(z.uuid()).min(1).describe("API key IDs allowed to call the endpoint."),
	roles: z.array(z.string().min(1)).min(1).describe("Database roles used by the endpoint."),
	allowedOrigins: z
		.array(z.string())
		.optional()
		.default([])
		.describe("Origins allowed by the endpoint CORS policy."),
});

export const publicSavedQueryRequestSchema = z.object({
	name: z.string().min(1).describe("Name of the saved query."),
	sql: z.string().max(4194304).describe("Saved SQL query."),
	database: z.string().describe("Database used by the saved query."),
	parameters: z
		.record(z.string(), z.string())
		.optional()
		.default({})
		.describe("Default query parameters."),
});

export const udfArgumentSchema = z.object({
	name: z
		.string()
		.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
		.describe("Name of the argument. Required for Native and JSONEachRow formats."),
	type: z.string().describe("ClickHouse data type of the argument."),
});

export const udfCreateRequestSchema = z.discriminatedUnion("type", [
	z.strictObject({
		uploadId: z.uuid().describe("Identifier of the uploaded source archive."),
		runtime: z.enum(["python3.11", "native"]),
		arguments: z.array(udfArgumentSchema),
		returnType: z.string(),
		returnName: z.union([z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/), z.null()]).optional(),
		commandReadTimeout: z.int().gt(0).optional().default(10000),
		commandWriteTimeout: z.int().gt(0).optional().default(10000),
		memoryLimitMib: z.union([z.int().min(1).max(1048576), z.null()]).optional(),
		sendChunkHeader: z.boolean().optional().default(false),
		deterministic: z
			.boolean()
			.optional()
			.default(false)
			.describe(
				"Marks the UDF as deterministic so ClickHouse can reuse cached query results. Only set this when the UDF always returns the same result for the same arguments.",
			),
		format: z.string().optional().default("TabSeparated"),
		sandboxType: z.enum(["basic", "netenable"]).optional().default("basic"),
		sandboxVersion: z.enum(["v1", "v2", "v3"]).optional().default("v2"),
		type: z.enum(["executable"]),
		poolSize: z.null().optional().describe("Always null — an executable UDF has no command pool."),
		maxCommandExecutionTime: z
			.union([z.int().gt(0), z.null()])
			.optional()
			.default(10),
		functionName: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/),
	}),
	z.strictObject({
		uploadId: z.uuid().describe("Identifier of the uploaded source archive."),
		runtime: z.enum(["python3.11", "native"]),
		arguments: z.array(udfArgumentSchema),
		returnType: z.string(),
		returnName: z.union([z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/), z.null()]).optional(),
		commandReadTimeout: z.int().gt(0).optional().default(10000),
		commandWriteTimeout: z.int().gt(0).optional().default(10000),
		memoryLimitMib: z.union([z.int().min(1).max(1048576), z.null()]).optional(),
		sendChunkHeader: z.boolean().optional().default(false),
		deterministic: z
			.boolean()
			.optional()
			.default(false)
			.describe(
				"Marks the UDF as deterministic so ClickHouse can reuse cached query results. Only set this when the UDF always returns the same result for the same arguments.",
			),
		format: z.string().optional().default("TabSeparated"),
		sandboxType: z.enum(["basic", "netenable"]).optional().default("basic"),
		sandboxVersion: z.enum(["v1", "v2", "v3"]).optional().default("v2"),
		type: z.enum(["executable_pool"]),
		poolSize: z.int().gt(0).optional().default(3),
		maxCommandExecutionTime: z.int().gt(0).optional().default(10),
		functionName: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/),
	}),
]);

export const udfVersionCreateRequestSchema = z.discriminatedUnion("type", [
	z.strictObject({
		uploadId: z.uuid().describe("Identifier of the uploaded source archive."),
		runtime: z.enum(["python3.11", "native"]),
		arguments: z.array(udfArgumentSchema),
		returnType: z.string(),
		returnName: z.union([z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/), z.null()]).optional(),
		commandReadTimeout: z.int().gt(0).optional().default(10000),
		commandWriteTimeout: z.int().gt(0).optional().default(10000),
		memoryLimitMib: z.union([z.int().min(1).max(1048576), z.null()]).optional(),
		sendChunkHeader: z.boolean().optional().default(false),
		deterministic: z
			.boolean()
			.optional()
			.default(false)
			.describe(
				"Marks the UDF as deterministic so ClickHouse can reuse cached query results. Only set this when the UDF always returns the same result for the same arguments.",
			),
		format: z.string().optional().default("TabSeparated"),
		sandboxType: z.enum(["basic", "netenable"]).optional().default("basic"),
		sandboxVersion: z.enum(["v1", "v2", "v3"]).optional().default("v2"),
		type: z.enum(["executable"]),
		poolSize: z.null().optional().describe("Always null — an executable UDF has no command pool."),
		maxCommandExecutionTime: z
			.union([z.int().gt(0), z.null()])
			.optional()
			.default(10),
	}),
	z.strictObject({
		uploadId: z.uuid().describe("Identifier of the uploaded source archive."),
		runtime: z.enum(["python3.11", "native"]),
		arguments: z.array(udfArgumentSchema),
		returnType: z.string(),
		returnName: z.union([z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/), z.null()]).optional(),
		commandReadTimeout: z.int().gt(0).optional().default(10000),
		commandWriteTimeout: z.int().gt(0).optional().default(10000),
		memoryLimitMib: z.union([z.int().min(1).max(1048576), z.null()]).optional(),
		sendChunkHeader: z.boolean().optional().default(false),
		deterministic: z
			.boolean()
			.optional()
			.default(false)
			.describe(
				"Marks the UDF as deterministic so ClickHouse can reuse cached query results. Only set this when the UDF always returns the same result for the same arguments.",
			),
		format: z.string().optional().default("TabSeparated"),
		sandboxType: z.enum(["basic", "netenable"]).optional().default("basic"),
		sandboxVersion: z.enum(["v1", "v2", "v3"]).optional().default("v2"),
		type: z.enum(["executable_pool"]),
		poolSize: z.int().gt(0).optional().default(3),
		maxCommandExecutionTime: z.int().gt(0).optional().default(10),
	}),
]);

export const publicQueryApiEndpointListItemSchema = z.strictObject({
	id: z.uuid().describe("Unique ID of the Query API endpoint."),
	name: z.string().describe("Name of the Query API endpoint."),
	database: z.string().describe("Database used by the Query API endpoint."),
	apiKeyIds: z.array(z.uuid()).describe("API key IDs allowed to call the endpoint."),
	roles: z.array(z.string()).describe("Database roles used by the endpoint."),
	allowedOrigins: z.array(z.string()).describe("Origins allowed by the endpoint CORS policy."),
	url: z
		.url()
		.describe("Public URL used to execute the endpoint.")
		.meta({
			examples: ["https://queries.clickhouse.cloud/run/00000000-0000-0000-0000-000000000000"],
		}),
	ownerType: z
		.enum(["user", "queryApiEndpoint"])
		.describe(
			"Owner type of the Query API endpoint. Endpoints with a user owned query cannot be updated or deleted through this API.",
		),
});

export const publicQueryApiEndpointSchema = z.strictObject({
	id: z.uuid().describe("Unique ID of the Query API endpoint."),
	name: z.string().describe("Name of the Query API endpoint."),
	sql: z.string().max(4194304).describe("SQL executed by the endpoint."),
	database: z.string().describe("Database used by the Query API endpoint."),
	parameters: z.record(z.string(), z.string()).describe("Query parameters."),
	apiKeyIds: z.array(z.uuid()).describe("API key IDs allowed to call the endpoint."),
	roles: z.array(z.string()).describe("Database roles used by the endpoint."),
	allowedOrigins: z.array(z.string()).describe("Origins allowed by the endpoint CORS policy."),
	url: z
		.url()
		.describe("Public URL used to execute the endpoint.")
		.meta({
			examples: ["https://queries.clickhouse.cloud/run/00000000-0000-0000-0000-000000000000"],
		}),
	ownerType: z
		.enum(["user", "queryApiEndpoint"])
		.describe(
			"Owner type of the Query API endpoint. Endpoints with a user owned query cannot be updated or deleted through this API.",
		),
});

export const publicSavedQueryListItemSchema = z.strictObject({
	id: z.uuid().describe("Unique ID of the saved query."),
	name: z.string().describe("Name of the saved query."),
	database: z.string().describe("Database used by the saved query."),
});

export const publicSavedQuerySchema = z.strictObject({
	id: z.uuid().describe("Unique ID of the saved query."),
	name: z.string().describe("Name of the saved query."),
	sql: z.string().max(4194304).describe("Saved SQL query."),
	database: z.string().describe("Database used by the saved query."),
	parameters: z.record(z.string(), z.string()).describe("Query parameters."),
});

export const udfUploadSessionSchema = z.strictObject({
	uploadId: z.uuid().describe("Identifier of the uploaded source archive."),
	uploadUrl: z.url().describe("Presigned URL for uploading the source archive."),
	expiresAt: z.iso.datetime().describe("Presigned-URL expiry timestamp."),
});

export const udfArgumentOutputSchema = z.strictObject({
	name: z
		.string()
		.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
		.describe("Name of the argument. Required for Native and JSONEachRow formats."),
	type: z.string().describe("ClickHouse data type of the argument."),
});

export const udfSchema = z.strictObject({
	functionName: z.string().describe("Name of the UDF. Unique within the organization."),
	version: z
		.int()
		.gt(0)
		.describe("Version number of the UDF.")
		.meta({ examples: [1] }),
	status: z.enum(["building", "error", "ready"]).describe("Build state of this UDF version."),
	runtime: z.enum(["python3.11", "native"]).describe("Runtime used to execute the UDF command."),
	type: z.enum(["executable", "executable_pool"]).describe("Executable UDF type."),
	arguments: z.array(udfArgumentOutputSchema).describe("Arguments passed to the UDF command."),
	returnType: z.string().describe("ClickHouse data type of the returned value."),
	returnName: z
		.union([z.string(), z.null()])
		.describe("Name of the returned value, or null when unnamed."),
	poolSize: z
		.union([z.int().gt(0), z.null()])
		.describe("Command pool size for executable_pool UDFs."),
	commandReadTimeout: z.int().gt(0).describe("Command stdout read timeout in milliseconds."),
	commandWriteTimeout: z.int().gt(0).describe("Command stdin write timeout in milliseconds."),
	maxCommandExecutionTime: z
		.union([z.int().gt(0), z.null()])
		.describe("Maximum command execution time in seconds for executable_pool UDFs."),
	memoryLimitMib: z
		.union([z.int().min(1).max(1048576), z.null()])
		.describe(
			"Maximum memory, in MiB, available to each UDF sandbox process. Null uses the sandbox default.",
		),
	sendChunkHeader: z.boolean().describe("Whether ClickHouse sends a row-count chunk header."),
	deterministic: z
		.boolean()
		.describe("Whether ClickHouse may reuse cached query results for this UDF."),
	format: z.string().describe("Input and output format used by the UDF command."),
	sandboxType: z.enum(["basic", "netenable"]).describe("Sandbox isolation level."),
	sandboxVersion: z.enum(["v1", "v2", "v3"]).describe("Sandbox runtime version."),
	error: z
		.union([z.string(), z.null()])
		.describe("Build error, or null when no build error is present."),
	createdAt: z.iso.datetime().describe("Creation timestamp."),
	updatedAt: z.iso.datetime().describe("Last-update timestamp."),
});

export const udfAttachmentSchema = z.strictObject({
	functionName: z.string().describe("Name of the UDF."),
	serviceId: z.uuid().describe("ID of the attached service."),
	status: z
		.enum(["deployed", "deprovisioning", "error", "provisioning", "standby"])
		.describe("Current attachment lifecycle state."),
	version: z
		.int()
		.gt(0)
		.describe("Attached UDF version.")
		.meta({ examples: [1] }),
});

export const whoamiGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: whoamiSchema.optional(),
});

export const whoamiGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const whoamiGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const whoamiGetResponseSchema = whoamiGetStatus200Schema;

export const whoamiGetErrorSchema = z.union([whoamiGetStatus400Schema, whoamiGetStatus500Schema]);

export const organizationGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(organizationSchema).optional(),
});

export const organizationGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationGetListResponseSchema = organizationGetListStatus200Schema;

export const organizationGetListErrorSchema = z.union([
	organizationGetListStatus400Schema,
	organizationGetListStatus500Schema,
]);

export const organizationGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: organizationSchema.optional(),
});

export const organizationGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationGetResponseSchema = organizationGetStatus200Schema;

export const organizationGetErrorSchema = z.union([
	organizationGetStatus400Schema,
	organizationGetStatus500Schema,
]);

export const organizationUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization to update.");

export const organizationUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: organizationSchema.optional(),
});

export const organizationUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationUpdateResponseSchema = organizationUpdateStatus200Schema;

export const organizationUpdateErrorSchema = z.union([
	organizationUpdateStatus400Schema,
	organizationUpdateStatus500Schema,
]);

export const organizationUpdateBodySchema = organizationPatchRequestSchema.optional();

export const organizationPrometheusGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationPrometheusGetQueryFilteredMetricsSchema = z
	.string()
	.optional()
	.describe("Return a filtered list of Prometheus metrics.");

export const organizationPrometheusGetStatus200Schema = z.unknown();

export const organizationPrometheusGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrometheusGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrometheusGetResponseSchema = organizationPrometheusGetStatus200Schema;

export const organizationPrometheusGetErrorSchema = z.union([
	organizationPrometheusGetStatus400Schema,
	organizationPrometheusGetStatus500Schema,
]);

export const organizationPrometheusDiscoveryGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationPrometheusDiscoveryGetQueryFilteredMetricsSchema = z
	.string()
	.optional()
	.describe(
		"Whether discovered targets scrape a filtered list of metrics. Sets the filtered_metrics parameter on each discovered target. Defaults to true.",
	);

export const organizationPrometheusDiscoveryGetStatus200Schema = z.array(
	prometheusDiscoveryTargetGroupSchema,
);

export const organizationPrometheusDiscoveryGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrometheusDiscoveryGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrometheusDiscoveryGetResponseSchema =
	organizationPrometheusDiscoveryGetStatus200Schema;

export const organizationPrometheusDiscoveryGetErrorSchema = z.union([
	organizationPrometheusDiscoveryGetStatus400Schema,
	organizationPrometheusDiscoveryGetStatus500Schema,
]);

export const organizationRolesGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationRolesGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(RBACRoleSchema).optional(),
});

export const organizationRolesGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolesGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolesGetListResponseSchema = organizationRolesGetListStatus200Schema;

export const organizationRolesGetListErrorSchema = z.union([
	organizationRolesGetListStatus400Schema,
	organizationRolesGetListStatus500Schema,
]);

export const organizationRolePostPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationRolePostStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: RBACRoleSchema.optional(),
});

export const organizationRolePostStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolePostStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolePostResponseSchema = organizationRolePostStatus200Schema;

export const organizationRolePostErrorSchema = z.union([
	organizationRolePostStatus400Schema,
	organizationRolePostStatus500Schema,
]);

export const organizationRolePostBodySchema = roleCreateRequestSchema.optional();

export const organizationRoleGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationRoleGetPathRoleIdSchema = z.uuid().describe("ID of the requested role.");

export const organizationRoleGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: RBACRoleSchema.optional(),
});

export const organizationRoleGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRoleGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRoleGetResponseSchema = organizationRoleGetStatus200Schema;

export const organizationRoleGetErrorSchema = z.union([
	organizationRoleGetStatus400Schema,
	organizationRoleGetStatus500Schema,
]);

export const organizationRolePatchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationRolePatchPathRoleIdSchema = z.uuid().describe("ID of the requested role.");

export const organizationRolePatchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: RBACRoleSchema.optional(),
});

export const organizationRolePatchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolePatchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRolePatchResponseSchema = organizationRolePatchStatus200Schema;

export const organizationRolePatchErrorSchema = z.union([
	organizationRolePatchStatus400Schema,
	organizationRolePatchStatus500Schema,
]);

export const organizationRolePatchBodySchema = roleUpdateRequestSchema.optional();

export const organizationRoleDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationRoleDeletePathRoleIdSchema = z
	.uuid()
	.describe("ID of the requested role.");

export const organizationRoleDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRoleDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRoleDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationRoleDeleteResponseSchema = organizationRoleDeleteStatus200Schema;

export const organizationRoleDeleteErrorSchema = z.union([
	organizationRoleDeleteStatus400Schema,
	organizationRoleDeleteStatus500Schema,
]);

export const organizationQuotasGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationQuotasGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(organizationQuotaSchema).optional(),
});

export const organizationQuotasGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationQuotasGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationQuotasGetListResponseSchema = organizationQuotasGetListStatus200Schema;

export const organizationQuotasGetListErrorSchema = z.union([
	organizationQuotasGetListStatus400Schema,
	organizationQuotasGetListStatus500Schema,
]);

export const organizationQuotaGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationQuotaGetPathQuotaCodeSchema = z
	.string()
	.describe("Code of the requested quota.");

export const organizationQuotaGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: organizationQuotaSchema.optional(),
});

export const organizationQuotaGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationQuotaGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationQuotaGetResponseSchema = organizationQuotaGetStatus200Schema;

export const organizationQuotaGetErrorSchema = z.union([
	organizationQuotaGetStatus400Schema,
	organizationQuotaGetStatus500Schema,
]);

export const serviceProfilesListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization to list available profiles for.");

export const serviceProfilesListQueryRegionIdSchema = z
	.string()
	.optional()
	.describe(
		"Region to list profiles for, e.g. us-east-1. Required unless byoc_id is set; when both are set it must match the BYOC infrastructure's region.",
	);

export const serviceProfilesListQueryByocIdSchema = z
	.uuid()
	.optional()
	.describe(
		"ID of the BYOC infrastructure to list profiles for. BYOC profiles are only returned when this is set.",
	);

export const serviceProfilesListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(serviceProfileSchema).optional(),
});

export const serviceProfilesListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceProfilesListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceProfilesListResponseSchema = serviceProfilesListStatus200Schema;

export const serviceProfilesListErrorSchema = z.union([
	serviceProfilesListStatus400Schema,
	serviceProfilesListStatus500Schema,
]);

export const instanceGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instanceGetListQueryFilterSchema = z
	.array(z.string())
	.optional()
	.describe(
		"Filter criteria to apply when retrieving the resource. Currently, only filtering by resource tags is supported.",
	);

export const instanceGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(serviceSchema).optional(),
});

export const instanceGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceGetListResponseSchema = instanceGetListStatus200Schema;

export const instanceGetListErrorSchema = z.union([
	instanceGetListStatus400Schema,
	instanceGetListStatus500Schema,
]);

export const instanceCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that will own the service.");

export const instanceCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: servicePostResponseSchema.optional(),
});

export const instanceCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceCreateResponseSchema = instanceCreateStatus200Schema;

export const instanceCreateErrorSchema = z.union([
	instanceCreateStatus400Schema,
	instanceCreateStatus500Schema,
]);

export const instanceCreateBodySchema = servicePostRequestSchema.optional();

export const instanceGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceGetPathServiceIdSchema = z.uuid().describe("ID of the requested service.");

export const instanceGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceSchema.optional(),
});

export const instanceGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceGetResponseSchema = instanceGetStatus200Schema;

export const instanceGetErrorSchema = z.union([
	instanceGetStatus400Schema,
	instanceGetStatus500Schema,
]);

export const instanceUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceUpdatePathServiceIdSchema = z.uuid().describe("ID of the service to update.");

export const instanceUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceSchema.optional(),
});

export const instanceUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceUpdateResponseSchema = instanceUpdateStatus200Schema;

export const instanceUpdateErrorSchema = z.union([
	instanceUpdateStatus400Schema,
	instanceUpdateStatus500Schema,
]);

export const instanceUpdateBodySchema = servicePatchRequestSchema.optional();

export const instanceDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceDeletePathServiceIdSchema = z.uuid().describe("ID of the service to delete.");

export const instanceDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceDeleteResponseSchema = instanceDeleteStatus200Schema;

export const instanceDeleteErrorSchema = z.union([
	instanceDeleteStatus400Schema,
	instanceDeleteStatus500Schema,
]);

export const instancePrivateEndpointConfigGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instancePrivateEndpointConfigGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instancePrivateEndpointConfigGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: privateEndpointConfigSchema.optional(),
});

export const instancePrivateEndpointConfigGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrivateEndpointConfigGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrivateEndpointConfigGetResponseSchema =
	instancePrivateEndpointConfigGetStatus200Schema;

export const instancePrivateEndpointConfigGetErrorSchema = z.union([
	instancePrivateEndpointConfigGetStatus400Schema,
	instancePrivateEndpointConfigGetStatus500Schema,
]);

export const instanceQueryEndpointGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instanceQueryEndpointGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instanceQueryEndpointGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceQueryAPIEndpointSchema.optional(),
});

export const instanceQueryEndpointGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointGetResponseSchema = instanceQueryEndpointGetStatus200Schema;

export const instanceQueryEndpointGetErrorSchema = z.union([
	instanceQueryEndpointGetStatus400Schema,
	instanceQueryEndpointGetStatus500Schema,
]);

export const instanceQueryEndpointDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instanceQueryEndpointDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instanceQueryEndpointDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointDeleteResponseSchema = instanceQueryEndpointDeleteStatus200Schema;

export const instanceQueryEndpointDeleteErrorSchema = z.union([
	instanceQueryEndpointDeleteStatus400Schema,
	instanceQueryEndpointDeleteStatus500Schema,
]);

export const instanceQueryEndpointUpsertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instanceQueryEndpointUpsertPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instanceQueryEndpointUpsertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceQueryAPIEndpointSchema.optional(),
});

export const instanceQueryEndpointUpsertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointUpsertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceQueryEndpointUpsertResponseSchema = instanceQueryEndpointUpsertStatus200Schema;

export const instanceQueryEndpointUpsertErrorSchema = z.union([
	instanceQueryEndpointUpsertStatus400Schema,
	instanceQueryEndpointUpsertStatus500Schema,
]);

export const instanceQueryEndpointUpsertBodySchema =
	instanceServiceQueryApiEndpointsPostRequestSchema.optional();

export const instanceStateUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceStateUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to update state.");

export const instanceStateUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceSchema.optional(),
});

export const instanceStateUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceStateUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceStateUpdateResponseSchema = instanceStateUpdateStatus200Schema;

export const instanceStateUpdateErrorSchema = z.union([
	instanceStateUpdateStatus400Schema,
	instanceStateUpdateStatus500Schema,
]);

export const instanceStateUpdateBodySchema = serviceStatePatchRequestSchema.optional();

export const instanceScalingUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceScalingUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to update scaling parameters.");

export const instanceScalingUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceSchema.optional(),
});

export const instanceScalingUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceScalingUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceScalingUpdateResponseSchema = instanceScalingUpdateStatus200Schema;

export const instanceScalingUpdateErrorSchema = z.union([
	instanceScalingUpdateStatus400Schema,
	instanceScalingUpdateStatus500Schema,
]);

export const instanceScalingUpdateBodySchema = serviceScalingPatchRequestSchema.optional();

export const instanceReplicaScalingUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instanceReplicaScalingUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to update scaling parameters.");

export const instanceReplicaScalingUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceScalingPatchResponseSchema.optional(),
});

export const instanceReplicaScalingUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceReplicaScalingUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instanceReplicaScalingUpdateResponseSchema =
	instanceReplicaScalingUpdateStatus200Schema;

export const instanceReplicaScalingUpdateErrorSchema = z.union([
	instanceReplicaScalingUpdateStatus400Schema,
	instanceReplicaScalingUpdateStatus500Schema,
]);

export const instanceReplicaScalingUpdateBodySchema =
	serviceReplicaScalingPatchRequestSchema.optional();

export const instancePasswordUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instancePasswordUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to update password.");

export const instancePasswordUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: servicePasswordPatchResponseSchema.optional(),
});

export const instancePasswordUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePasswordUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePasswordUpdateResponseSchema = instancePasswordUpdateStatus200Schema;

export const instancePasswordUpdateErrorSchema = z.union([
	instancePasswordUpdateStatus400Schema,
	instancePasswordUpdateStatus500Schema,
]);

export const instancePasswordUpdateBodySchema = servicePasswordPatchRequestSchema.optional();

export const instancePrivateEndpointCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const instancePrivateEndpointCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instancePrivateEndpointCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: instancePrivateEndpointSchema.optional(),
});

export const instancePrivateEndpointCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrivateEndpointCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrivateEndpointCreateResponseSchema =
	instancePrivateEndpointCreateStatus200Schema;

export const instancePrivateEndpointCreateErrorSchema = z.union([
	instancePrivateEndpointCreateStatus400Schema,
	instancePrivateEndpointCreateStatus500Schema,
]);

export const instancePrivateEndpointCreateBodySchema =
	servicPrivateEndpointePostRequestSchema.optional();

export const instancePrometheusGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const instancePrometheusGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const instancePrometheusGetQueryFilteredMetricsSchema = z
	.string()
	.optional()
	.describe("Return a filtered list of Prometheus metrics.");

export const instancePrometheusGetStatus200Schema = z.unknown();

export const instancePrometheusGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrometheusGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const instancePrometheusGetResponseSchema = instancePrometheusGetStatus200Schema;

export const instancePrometheusGetErrorSchema = z.union([
	instancePrometheusGetStatus400Schema,
	instancePrometheusGetStatus500Schema,
]);

export const scalingScheduleGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const scalingScheduleGetPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const scalingScheduleGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: scalingScheduleSchema.optional(),
});

export const scalingScheduleGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleGetResponseSchema = scalingScheduleGetStatus200Schema;

export const scalingScheduleGetErrorSchema = z.union([
	scalingScheduleGetStatus400Schema,
	scalingScheduleGetStatus500Schema,
]);

export const scalingScheduleUpsertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const scalingScheduleUpsertPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const scalingScheduleUpsertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: scalingScheduleSchema.optional(),
});

export const scalingScheduleUpsertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleUpsertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleUpsertResponseSchema = scalingScheduleUpsertStatus200Schema;

export const scalingScheduleUpsertErrorSchema = z.union([
	scalingScheduleUpsertStatus400Schema,
	scalingScheduleUpsertStatus500Schema,
]);

export const scalingScheduleUpsertBodySchema = scalingSchedulePostRequestSchema.optional();

export const scalingScheduleDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const scalingScheduleDeletePathServiceIdSchema = z.uuid().describe("ID of the service.");

export const scalingScheduleDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const scalingScheduleDeleteResponseSchema = scalingScheduleDeleteStatus200Schema;

export const scalingScheduleDeleteErrorSchema = z.union([
	scalingScheduleDeleteStatus400Schema,
	scalingScheduleDeleteStatus500Schema,
]);

export const upgradeWindowGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const upgradeWindowGetPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const upgradeWindowGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: upgradeWindowSchema.optional(),
});

export const upgradeWindowGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowGetResponseSchema = upgradeWindowGetStatus200Schema;

export const upgradeWindowGetErrorSchema = z.union([
	upgradeWindowGetStatus400Schema,
	upgradeWindowGetStatus500Schema,
]);

export const upgradeWindowUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const upgradeWindowUpdatePathServiceIdSchema = z.uuid().describe("ID of the service.");

export const upgradeWindowUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: upgradeWindowSchema.optional(),
});

export const upgradeWindowUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowUpdateResponseSchema = upgradeWindowUpdateStatus200Schema;

export const upgradeWindowUpdateErrorSchema = z.union([
	upgradeWindowUpdateStatus400Schema,
	upgradeWindowUpdateStatus500Schema,
]);

export const upgradeWindowUpdateBodySchema = upgradeWindowPutRequestSchema.optional();

export const upgradeWindowDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const upgradeWindowDeletePathServiceIdSchema = z.uuid().describe("ID of the service.");

export const upgradeWindowDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const upgradeWindowDeleteResponseSchema = upgradeWindowDeleteStatus200Schema;

export const upgradeWindowDeleteErrorSchema = z.union([
	upgradeWindowDeleteStatus400Schema,
	upgradeWindowDeleteStatus500Schema,
]);

export const serviceClickhouseSettingsListGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const serviceClickhouseSettingsListGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const serviceClickhouseSettingsListGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceClickhouseSettingsListSchema.optional(),
});

export const serviceClickhouseSettingsListGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsListGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsListGetResponseSchema =
	serviceClickhouseSettingsListGetStatus200Schema;

export const serviceClickhouseSettingsListGetErrorSchema = z.union([
	serviceClickhouseSettingsListGetStatus400Schema,
	serviceClickhouseSettingsListGetStatus500Schema,
]);

export const serviceClickhouseSettingsUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const serviceClickhouseSettingsUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const serviceClickhouseSettingsUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceClickhouseSettingsPatchResponseSchema.optional(),
});

export const serviceClickhouseSettingsUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsUpdateResponseSchema =
	serviceClickhouseSettingsUpdateStatus200Schema;

export const serviceClickhouseSettingsUpdateErrorSchema = z.union([
	serviceClickhouseSettingsUpdateStatus400Schema,
	serviceClickhouseSettingsUpdateStatus500Schema,
]);

export const serviceClickhouseSettingsUpdateBodySchema =
	serviceClickhouseSettingsPatchRequestSchema.optional();

export const serviceClickhouseSettingsSchemaGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const serviceClickhouseSettingsSchemaGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const serviceClickhouseSettingsSchemaGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceClickhouseSettingsSchemaSchema.optional(),
});

export const serviceClickhouseSettingsSchemaGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsSchemaGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingsSchemaGetResponseSchema =
	serviceClickhouseSettingsSchemaGetStatus200Schema;

export const serviceClickhouseSettingsSchemaGetErrorSchema = z.union([
	serviceClickhouseSettingsSchemaGetStatus400Schema,
	serviceClickhouseSettingsSchemaGetStatus500Schema,
]);

export const serviceClickhouseSettingGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const serviceClickhouseSettingGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const serviceClickhouseSettingGetPathSettingNameSchema = z
	.string()
	.describe("Name of the setting to retrieve.");

export const serviceClickhouseSettingGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: serviceClickhouseSettingSchema.optional(),
});

export const serviceClickhouseSettingGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingGetResponseSchema = serviceClickhouseSettingGetStatus200Schema;

export const serviceClickhouseSettingGetErrorSchema = z.union([
	serviceClickhouseSettingGetStatus400Schema,
	serviceClickhouseSettingGetStatus500Schema,
]);

export const serviceClickhouseSettingDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const serviceClickhouseSettingDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const serviceClickhouseSettingDeletePathSettingNameSchema = z
	.string()
	.describe("Name of the setting to reset.");

export const serviceClickhouseSettingDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const serviceClickhouseSettingDeleteResponseSchema =
	serviceClickhouseSettingDeleteStatus200Schema;

export const serviceClickhouseSettingDeleteErrorSchema = z.union([
	serviceClickhouseSettingDeleteStatus400Schema,
	serviceClickhouseSettingDeleteStatus500Schema,
]);

export const backupGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the backup.");

export const backupGetListPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service the backup was created from.");

export const backupGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(backupSchema).optional(),
});

export const backupGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupGetListResponseSchema = backupGetListStatus200Schema;

export const backupGetListErrorSchema = z.union([
	backupGetListStatus400Schema,
	backupGetListStatus500Schema,
]);

export const backupGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the backup.");

export const backupGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service the backup was created from.");

export const backupGetPathBackupIdSchema = z.uuid().describe("ID of the requested backup.");

export const backupGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupSchema.optional(),
});

export const backupGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupGetResponseSchema = backupGetStatus200Schema;

export const backupGetErrorSchema = z.union([backupGetStatus400Schema, backupGetStatus500Schema]);

export const snapshotGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the snapshot.");

export const snapshotGetListPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service the snapshot was created from.");

export const snapshotGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(snapshotSchema).optional(),
});

export const snapshotGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotGetListResponseSchema = snapshotGetListStatus200Schema;

export const snapshotGetListErrorSchema = z.union([
	snapshotGetListStatus400Schema,
	snapshotGetListStatus500Schema,
]);

export const snapshotGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the snapshot.");

export const snapshotGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service the snapshot was created from.");

export const snapshotGetPathSnapshotIdSchema = z.uuid().describe("ID of the requested snapshot.");

export const snapshotGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: snapshotSchema.optional(),
});

export const snapshotGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotGetResponseSchema = snapshotGetStatus200Schema;

export const snapshotGetErrorSchema = z.union([
	snapshotGetStatus400Schema,
	snapshotGetStatus500Schema,
]);

export const backupConfigurationGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const backupConfigurationGetPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const backupConfigurationGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupConfigurationSchema.optional(),
});

export const backupConfigurationGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupConfigurationGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupConfigurationGetResponseSchema = backupConfigurationGetStatus200Schema;

export const backupConfigurationGetErrorSchema = z.union([
	backupConfigurationGetStatus400Schema,
	backupConfigurationGetStatus500Schema,
]);

export const backupConfigurationUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const backupConfigurationUpdatePathServiceIdSchema = z.uuid().describe("ID of the service.");

export const backupConfigurationUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupConfigurationSchema.optional(),
});

export const backupConfigurationUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupConfigurationUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupConfigurationUpdateResponseSchema = backupConfigurationUpdateStatus200Schema;

export const backupConfigurationUpdateErrorSchema = z.union([
	backupConfigurationUpdateStatus400Schema,
	backupConfigurationUpdateStatus500Schema,
]);

export const backupConfigurationUpdateBodySchema = backupConfigurationPatchRequestSchema.optional();

export const snapshotConfigurationGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const snapshotConfigurationGetPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const snapshotConfigurationGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: snapshotConfigurationSchema.optional(),
});

export const snapshotConfigurationGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotConfigurationGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotConfigurationGetResponseSchema = snapshotConfigurationGetStatus200Schema;

export const snapshotConfigurationGetErrorSchema = z.union([
	snapshotConfigurationGetStatus400Schema,
	snapshotConfigurationGetStatus500Schema,
]);

export const snapshotConfigurationUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const snapshotConfigurationUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service.");

export const snapshotConfigurationUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: snapshotConfigurationSchema.optional(),
});

export const snapshotConfigurationUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotConfigurationUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const snapshotConfigurationUpdateResponseSchema = snapshotConfigurationUpdateStatus200Schema;

export const snapshotConfigurationUpdateErrorSchema = z.union([
	snapshotConfigurationUpdateStatus400Schema,
	snapshotConfigurationUpdateStatus500Schema,
]);

export const snapshotConfigurationUpdateBodySchema =
	snapshotConfigurationPatchRequestSchema.optional();

export const backupBucketGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const backupBucketGetPathServiceIdSchema = z.uuid().describe("ID of the service.");

export const backupBucketGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupBucketSchema.optional(),
});

export const backupBucketGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketGetResponseSchema = backupBucketGetStatus200Schema;

export const backupBucketGetErrorSchema = z.union([
	backupBucketGetStatus400Schema,
	backupBucketGetStatus500Schema,
]);

export const backupBucketCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const backupBucketCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const backupBucketCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupBucketSchema.optional(),
});

export const backupBucketCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketCreateResponseSchema = backupBucketCreateStatus200Schema;

export const backupBucketCreateErrorSchema = z.union([
	backupBucketCreateStatus400Schema,
	backupBucketCreateStatus500Schema,
]);

export const backupBucketCreateBodySchema = backupBucketPostRequestSchema.optional();

export const backupBucketUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const backupBucketUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const backupBucketUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: backupBucketSchema.optional(),
});

export const backupBucketUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketUpdateResponseSchema = backupBucketUpdateStatus200Schema;

export const backupBucketUpdateErrorSchema = z.union([
	backupBucketUpdateStatus400Schema,
	backupBucketUpdateStatus500Schema,
]);

export const backupBucketUpdateBodySchema = backupBucketPatchRequestSchema.optional();

export const backupBucketDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const backupBucketDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const backupBucketDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const backupBucketDeleteResponseSchema = backupBucketDeleteStatus200Schema;

export const backupBucketDeleteErrorSchema = z.union([
	backupBucketDeleteStatus400Schema,
	backupBucketDeleteStatus500Schema,
]);

export const openapiKeyGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const openapiKeyGetListQueryLimitSchema = z
	.int()
	.min(1)
	.max(250)
	.optional()
	.default(250)
	.describe("Maximum number of results to return.");

export const openapiKeyGetListQueryCursorSchema = z
	.string()
	.optional()
	.describe(
		"Opaque cursor from a previous response's `nextCursor`, marking where to resume the list.",
	);

export const openapiKeyGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(apiKeySchema).optional(),
	limit: z.int().optional().describe("Maximum number of results returned in this page."),
	totalCount: z
		.int()
		.nullish()
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.string()
		.nullish()
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
});

export const openapiKeyGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyGetListResponseSchema = openapiKeyGetListStatus200Schema;

export const openapiKeyGetListErrorSchema = z.union([
	openapiKeyGetListStatus400Schema,
	openapiKeyGetListStatus500Schema,
]);

export const openapiKeyCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that will own the key.");

export const openapiKeyCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: apiKeyPostResponseSchema.optional(),
});

export const openapiKeyCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyCreateResponseSchema = openapiKeyCreateStatus200Schema;

export const openapiKeyCreateErrorSchema = z.union([
	openapiKeyCreateStatus400Schema,
	openapiKeyCreateStatus500Schema,
]);

export const openapiKeyCreateBodySchema = apiKeyPostRequestSchema.optional();

export const openapiKeyGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const openapiKeyGetPathKeyIdSchema = z.uuid().describe("ID of the requested key.");

export const openapiKeyGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: apiKeySchema.optional(),
});

export const openapiKeyGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyGetResponseSchema = openapiKeyGetStatus200Schema;

export const openapiKeyGetErrorSchema = z.union([
	openapiKeyGetStatus400Schema,
	openapiKeyGetStatus500Schema,
]);

export const openapiKeyUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the key.");

export const openapiKeyUpdatePathKeyIdSchema = z.uuid().describe("ID of the key to update.");

export const openapiKeyUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: apiKeySchema.optional(),
});

export const openapiKeyUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyUpdateResponseSchema = openapiKeyUpdateStatus200Schema;

export const openapiKeyUpdateErrorSchema = z.union([
	openapiKeyUpdateStatus400Schema,
	openapiKeyUpdateStatus500Schema,
]);

export const openapiKeyUpdateBodySchema = apiKeyPatchRequestSchema.optional();

export const openapiKeyDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the key.");

export const openapiKeyDeletePathKeyIdSchema = z.uuid().describe("ID of the key to delete.");

export const openapiKeyDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const openapiKeyDeleteResponseSchema = openapiKeyDeleteStatus200Schema;

export const openapiKeyDeleteErrorSchema = z.union([
	openapiKeyDeleteStatus400Schema,
	openapiKeyDeleteStatus500Schema,
]);

export const memberGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const memberGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(memberSchema).optional(),
});

export const memberGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberGetListResponseSchema = memberGetListStatus200Schema;

export const memberGetListErrorSchema = z.union([
	memberGetListStatus400Schema,
	memberGetListStatus500Schema,
]);

export const memberGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization the member is part of.");

export const memberGetPathUserIdSchema = z.uuid().describe("ID of the requested user.");

export const memberGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: memberSchema.optional(),
});

export const memberGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberGetResponseSchema = memberGetStatus200Schema;

export const memberGetErrorSchema = z.union([memberGetStatus400Schema, memberGetStatus500Schema]);

export const memberUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization the member is part of.");

export const memberUpdatePathUserIdSchema = z.uuid().describe("ID of the user to patch");

export const memberUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: memberSchema.optional(),
});

export const memberUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberUpdateResponseSchema = memberUpdateStatus200Schema;

export const memberUpdateErrorSchema = z.union([
	memberUpdateStatus400Schema,
	memberUpdateStatus500Schema,
]);

export const memberUpdateBodySchema = memberPatchRequestSchema.optional();

export const memberDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const memberDeletePathUserIdSchema = z.uuid().describe("ID of the requested user.");

export const memberDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const memberDeleteResponseSchema = memberDeleteStatus200Schema;

export const memberDeleteErrorSchema = z.union([
	memberDeleteStatus400Schema,
	memberDeleteStatus500Schema,
]);

export const invitationGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const invitationGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(invitationSchema).optional(),
});

export const invitationGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationGetListResponseSchema = invitationGetListStatus200Schema;

export const invitationGetListErrorSchema = z.union([
	invitationGetListStatus400Schema,
	invitationGetListStatus500Schema,
]);

export const invitationCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization to invite a user to.");

export const invitationCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: invitationSchema.optional(),
});

export const invitationCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationCreateResponseSchema = invitationCreateStatus200Schema;

export const invitationCreateErrorSchema = z.union([
	invitationCreateStatus400Schema,
	invitationCreateStatus500Schema,
]);

export const invitationCreateBodySchema = invitationPostRequestSchema.optional();

export const invitationGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const invitationGetPathInvitationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const invitationGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: invitationSchema.optional(),
});

export const invitationGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationGetResponseSchema = invitationGetStatus200Schema;

export const invitationGetErrorSchema = z.union([
	invitationGetStatus400Schema,
	invitationGetStatus500Schema,
]);

export const invitationDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that has the invitation.");

export const invitationDeletePathInvitationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const invitationDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const invitationDeleteResponseSchema = invitationDeleteStatus200Schema;

export const invitationDeleteErrorSchema = z.union([
	invitationDeleteStatus400Schema,
	invitationDeleteStatus500Schema,
]);

export const activityGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const activityGetListQueryFromDateSchema = z.iso
	.datetime()
	.optional()
	.describe("A starting date for a search");

export const activityGetListQueryToDateSchema = z.iso
	.datetime()
	.optional()
	.describe("An ending date for a search");

export const activityGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(activitySchema).optional(),
});

export const activityGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activityGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activityGetListResponseSchema = activityGetListStatus200Schema;

export const activityGetListErrorSchema = z.union([
	activityGetListStatus400Schema,
	activityGetListStatus500Schema,
]);

export const activityGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const activityGetPathActivityIdSchema = z.string().describe("ID of the requested activity.");

export const activityGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: activitySchema.optional(),
});

export const activityGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activityGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activityGetResponseSchema = activityGetStatus200Schema;

export const activityGetErrorSchema = z.union([
	activityGetStatus400Schema,
	activityGetStatus500Schema,
]);

export const notificationTypesGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const notificationTypesGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(notificationTypeSchema).optional(),
});

export const notificationTypesGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const notificationTypesGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const notificationTypesGetListResponseSchema = notificationTypesGetListStatus200Schema;

export const notificationTypesGetListErrorSchema = z.union([
	notificationTypesGetListStatus400Schema,
	notificationTypesGetListStatus500Schema,
]);

export const usageCostGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const usageCostGetQueryFromDateSchema = z.iso
	.date()
	.describe("Start date for the report, e.g. 2024-12-19.");

export const usageCostGetQueryToDateSchema = z.iso
	.date()
	.describe(
		"End date (inclusive) for the report, e.g. 2024-12-20. This date cannot be more than 30 days after from_date (for a maximum queried period of 31 days).",
	);

export const usageCostGetQueryFilterSchema = z
	.array(z.string())
	.optional()
	.describe(
		"Filter criteria to apply when retrieving the usage cost report. Currently, only filtering by resource tags is supported.",
	);

export const usageCostGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: usageCostSchema.optional(),
});

export const usageCostGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const usageCostGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const usageCostGetResponseSchema = usageCostGetStatus200Schema;

export const usageCostGetErrorSchema = z.union([
	usageCostGetStatus400Schema,
	usageCostGetStatus500Schema,
]);

export const activeBalancesGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const activeBalancesGetQueryLimitSchema = z
	.int()
	.min(1)
	.max(100)
	.optional()
	.default(100)
	.describe("Maximum number of results to return.");

export const activeBalancesGetQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const activeBalancesGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: activeBalancesSchema.optional(),
});

export const activeBalancesGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activeBalancesGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const activeBalancesGetResponseSchema = activeBalancesGetStatus200Schema;

export const activeBalancesGetErrorSchema = z.union([
	activeBalancesGetStatus400Schema,
	activeBalancesGetStatus500Schema,
]);

export const creditBalancesGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const creditBalancesGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: creditBalancesSchema.optional(),
});

export const creditBalancesGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const creditBalancesGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const creditBalancesGetResponseSchema = creditBalancesGetStatus200Schema;

export const creditBalancesGetErrorSchema = z.union([
	creditBalancesGetStatus400Schema,
	creditBalancesGetStatus500Schema,
]);

export const clickPipeGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeGetListPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickPipeSchema).optional(),
});

export const clickPipeGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeGetListResponseSchema = clickPipeGetListStatus200Schema;

export const clickPipeGetListErrorSchema = z.union([
	clickPipeGetListStatus400Schema,
	clickPipeGetListStatus500Schema,
]);

export const clickPipeCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to create the ClickPipe for.");

export const clickPipeCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchema.optional(),
});

export const clickPipeCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCreateResponseSchema = clickPipeCreateStatus200Schema;

export const clickPipeCreateErrorSchema = z.union([
	clickPipeCreateStatus400Schema,
	clickPipeCreateStatus500Schema,
]);

export const clickPipeCreateBodySchema = clickPipePostRequestSchema.optional();

export const clickPipesServiceContextGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipesServiceContextGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to get ClickPipes context for.");

export const clickPipesServiceContextGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipesServiceContextSchema.optional(),
});

export const clickPipesServiceContextGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipesServiceContextGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipesServiceContextGetResponseSchema = clickPipesServiceContextGetStatus200Schema;

export const clickPipesServiceContextGetErrorSchema = z.union([
	clickPipesServiceContextGetStatus400Schema,
	clickPipesServiceContextGetStatus500Schema,
]);

export const clickPipeGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeGetPathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the requested ClickPipe.");

export const clickPipeGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchema.optional(),
});

export const clickPipeGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeGetResponseSchema = clickPipeGetStatus200Schema;

export const clickPipeGetErrorSchema = z.union([
	clickPipeGetStatus400Schema,
	clickPipeGetStatus500Schema,
]);

export const clickPipeUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to create the ClickPipe for.");

export const clickPipeUpdatePathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the requested ClickPipe.");

export const clickPipeUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchema.optional(),
});

export const clickPipeUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeUpdateResponseSchema = clickPipeUpdateStatus200Schema;

export const clickPipeUpdateErrorSchema = z.union([
	clickPipeUpdateStatus400Schema,
	clickPipeUpdateStatus500Schema,
]);

export const clickPipeUpdateBodySchema = clickPipePatchRequestSchema.optional();

export const clickPipeDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeDeletePathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the ClickPipe to delete.");

export const clickPipeDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeDeleteResponseSchema = clickPipeDeleteStatus200Schema;

export const clickPipeDeleteErrorSchema = z.union([
	clickPipeDeleteStatus400Schema,
	clickPipeDeleteStatus500Schema,
]);

export const clickPipeSettingsGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeSettingsGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeSettingsGetPathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the ClickPipe to get settings for.");

export const clickPipeSettingsGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSettingsSchema.optional(),
});

export const clickPipeSettingsGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSettingsGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSettingsGetResponseSchema = clickPipeSettingsGetStatus200Schema;

export const clickPipeSettingsGetErrorSchema = z.union([
	clickPipeSettingsGetStatus400Schema,
	clickPipeSettingsGetStatus500Schema,
]);

export const clickPipeSettingsUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeSettingsUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeSettingsUpdatePathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the ClickPipe to update settings for.");

export const clickPipeSettingsUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSettingsSchema.optional(),
});

export const clickPipeSettingsUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSettingsUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSettingsUpdateResponseSchema = clickPipeSettingsUpdateStatus200Schema;

export const clickPipeSettingsUpdateErrorSchema = z.union([
	clickPipeSettingsUpdateStatus400Schema,
	clickPipeSettingsUpdateStatus500Schema,
]);

export const clickPipeSettingsUpdateBodySchema = clickPipeSettingsPutRequestSchema.optional();

export const clickPipeSchemaDiscoveryPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeSchemaDiscoveryPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service to run schema discovery against.");

export const clickPipeSchemaDiscoveryStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchemaDiscoveryResponseSchema.optional(),
});

export const clickPipeSchemaDiscoveryStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSchemaDiscoveryStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeSchemaDiscoveryErrorSchema = z.union([
	clickPipeSchemaDiscoveryStatus400Schema,
	clickPipeSchemaDiscoveryStatus500Schema,
]);

export const clickPipeSchemaDiscoveryBodySchema = clickPipeSchemaDiscoveryRequestSchema.optional();

export const clickPipeScalingUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeScalingUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeScalingUpdatePathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the ClickPipe to update scaling settings.");

export const clickPipeScalingUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchema.optional(),
});

export const clickPipeScalingUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeScalingUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeScalingUpdateResponseSchema = clickPipeScalingUpdateStatus200Schema;

export const clickPipeScalingUpdateErrorSchema = z.union([
	clickPipeScalingUpdateStatus400Schema,
	clickPipeScalingUpdateStatus500Schema,
]);

export const clickPipeScalingUpdateBodySchema = clickPipeScalingPatchRequestSchema.optional();

export const clickPipeStateUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeStateUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeStateUpdatePathClickPipeIdSchema = z
	.uuid()
	.describe("ID of the ClickPipe to update state.");

export const clickPipeStateUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipeSchema.optional(),
});

export const clickPipeStateUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeStateUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeStateUpdateResponseSchema = clickPipeStateUpdateStatus200Schema;

export const clickPipeStateUpdateErrorSchema = z.union([
	clickPipeStateUpdateStatus400Schema,
	clickPipeStateUpdateStatus500Schema,
]);

export const clickPipeStateUpdateBodySchema = clickPipeStatePatchRequestSchema.optional();

export const clickPipeCdcScalingGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeCdcScalingGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeCdcScalingGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipesCdcScalingSchema.optional(),
});

export const clickPipeCdcScalingGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCdcScalingGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCdcScalingGetResponseSchema = clickPipeCdcScalingGetStatus200Schema;

export const clickPipeCdcScalingGetErrorSchema = z.union([
	clickPipeCdcScalingGetStatus400Schema,
	clickPipeCdcScalingGetStatus500Schema,
]);

export const clickPipeCdcScalingUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeCdcScalingUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the ClickPipe.");

export const clickPipeCdcScalingUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickPipesCdcScalingSchema.optional(),
});

export const clickPipeCdcScalingUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCdcScalingUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeCdcScalingUpdateResponseSchema = clickPipeCdcScalingUpdateStatus200Schema;

export const clickPipeCdcScalingUpdateErrorSchema = z.union([
	clickPipeCdcScalingUpdateStatus400Schema,
	clickPipeCdcScalingUpdateStatus500Schema,
]);

export const clickPipeCdcScalingUpdateBodySchema =
	clickPipesCdcScalingPatchRequestSchema.optional();

export const clickStackListDashboardsPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListDashboardsPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListDashboardsStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackDashboardResponseSchema).optional(),
});

export const clickStackListDashboardsStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListDashboardsStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListDashboardsResponseSchema = clickStackListDashboardsStatus200Schema;

export const clickStackListDashboardsErrorSchema = z.union([
	clickStackListDashboardsStatus400Schema,
	clickStackListDashboardsStatus500Schema,
]);

export const clickStackCreateDashboardPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateDashboardPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateDashboardStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackDashboardResponseSchema.optional(),
});

export const clickStackCreateDashboardStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateDashboardStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateDashboardResponseSchema = clickStackCreateDashboardStatus200Schema;

export const clickStackCreateDashboardErrorSchema = z.union([
	clickStackCreateDashboardStatus400Schema,
	clickStackCreateDashboardStatus500Schema,
]);

export const clickStackCreateDashboardBodySchema =
	clickStackCreateDashboardRequestSchema.optional();

export const clickStackGetDashboardPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackGetDashboardPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackGetDashboardPathClickStackDashboardIdSchema = z
	.string()
	.describe("ClickStack Dashboard ID");

export const clickStackGetDashboardStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackDashboardResponseSchema.optional(),
});

export const clickStackGetDashboardStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetDashboardStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetDashboardResponseSchema = clickStackGetDashboardStatus200Schema;

export const clickStackGetDashboardErrorSchema = z.union([
	clickStackGetDashboardStatus400Schema,
	clickStackGetDashboardStatus500Schema,
]);

export const clickStackUpdateDashboardPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateDashboardPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateDashboardPathClickStackDashboardIdSchema = z
	.string()
	.describe("ClickStack Dashboard ID");

export const clickStackUpdateDashboardStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackDashboardResponseSchema.optional(),
});

export const clickStackUpdateDashboardStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateDashboardStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateDashboardResponseSchema = clickStackUpdateDashboardStatus200Schema;

export const clickStackUpdateDashboardErrorSchema = z.union([
	clickStackUpdateDashboardStatus400Schema,
	clickStackUpdateDashboardStatus500Schema,
]);

export const clickStackUpdateDashboardBodySchema =
	clickStackUpdateDashboardRequestSchema.optional();

export const clickStackDeleteDashboardPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteDashboardPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteDashboardPathClickStackDashboardIdSchema = z
	.string()
	.describe("ClickStack Dashboard ID");

export const clickStackDeleteDashboardStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteDashboardStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteDashboardStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteDashboardResponseSchema = clickStackDeleteDashboardStatus200Schema;

export const clickStackDeleteDashboardErrorSchema = z.union([
	clickStackDeleteDashboardStatus400Schema,
	clickStackDeleteDashboardStatus500Schema,
]);

export const clickStackValidateDashboardPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackValidateDashboardPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackValidateDashboardStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackValidateDashboardResponseSchema.optional(),
});

export const clickStackValidateDashboardStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackValidateDashboardStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackValidateDashboardBodySchema =
	clickStackCreateDashboardRequestSchema.optional();

export const clickStackListAlertsPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListAlertsPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListAlertsQueryLimitSchema = z
	.int()
	.min(1)
	.max(1000)
	.optional()
	.default(1000)
	.describe("Maximum number of results to return.");

export const clickStackListAlertsQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const clickStackListAlertsStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackAlertResponseSchema).optional(),
});

export const clickStackListAlertsStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListAlertsStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListAlertsResponseSchema = clickStackListAlertsStatus200Schema;

export const clickStackListAlertsErrorSchema = z.union([
	clickStackListAlertsStatus400Schema,
	clickStackListAlertsStatus500Schema,
]);

export const clickStackCreateAlertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateAlertPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateAlertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackAlertResponseSchema.optional(),
});

export const clickStackCreateAlertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateAlertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateAlertResponseSchema = clickStackCreateAlertStatus200Schema;

export const clickStackCreateAlertErrorSchema = z.union([
	clickStackCreateAlertStatus400Schema,
	clickStackCreateAlertStatus500Schema,
]);

export const clickStackCreateAlertBodySchema = clickStackCreateAlertRequestSchema.optional();

export const clickStackListSourcesPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListSourcesPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListSourcesStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackSourceSchema).optional(),
});

export const clickStackListSourcesStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListSourcesStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListSourcesResponseSchema = clickStackListSourcesStatus200Schema;

export const clickStackListSourcesErrorSchema = z.union([
	clickStackListSourcesStatus400Schema,
	clickStackListSourcesStatus500Schema,
]);

export const clickStackCreateSourcePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateSourcePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateSourceStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSourceSchema.optional(),
});

export const clickStackCreateSourceStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateSourceStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateSourceResponseSchema = clickStackCreateSourceStatus200Schema;

export const clickStackCreateSourceErrorSchema = z.union([
	clickStackCreateSourceStatus400Schema,
	clickStackCreateSourceStatus500Schema,
]);

export const clickStackCreateSourceBodySchema = clickStackSourceSchema.optional();

export const clickStackGetSourcePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackGetSourcePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackGetSourcePathClickStackSourceIdSchema = z.string().describe("Source ID");

export const clickStackGetSourceStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSourceSchema.optional(),
});

export const clickStackGetSourceStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetSourceStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetSourceResponseSchema = clickStackGetSourceStatus200Schema;

export const clickStackGetSourceErrorSchema = z.union([
	clickStackGetSourceStatus400Schema,
	clickStackGetSourceStatus500Schema,
]);

export const clickStackUpdateSourcePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateSourcePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateSourcePathClickStackSourceIdSchema = z.string().describe("Source ID");

export const clickStackUpdateSourceStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSourceSchema.optional(),
});

export const clickStackUpdateSourceStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateSourceStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateSourceResponseSchema = clickStackUpdateSourceStatus200Schema;

export const clickStackUpdateSourceErrorSchema = z.union([
	clickStackUpdateSourceStatus400Schema,
	clickStackUpdateSourceStatus500Schema,
]);

export const clickStackUpdateSourceBodySchema = clickStackSourceSchema.optional();

export const clickStackDeleteSourcePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteSourcePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteSourcePathClickStackSourceIdSchema = z.string().describe("Source ID");

export const clickStackDeleteSourceStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSourceStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSourceStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSourceResponseSchema = clickStackDeleteSourceStatus200Schema;

export const clickStackDeleteSourceErrorSchema = z.union([
	clickStackDeleteSourceStatus400Schema,
	clickStackDeleteSourceStatus500Schema,
]);

export const clickStackGetAlertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackGetAlertPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackGetAlertPathClickStackAlertIdSchema = z
	.string()
	.describe("ClickStack Alert ID");

export const clickStackGetAlertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackAlertResponseSchema.optional(),
});

export const clickStackGetAlertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetAlertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetAlertResponseSchema = clickStackGetAlertStatus200Schema;

export const clickStackGetAlertErrorSchema = z.union([
	clickStackGetAlertStatus400Schema,
	clickStackGetAlertStatus500Schema,
]);

export const clickStackUpdateAlertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateAlertPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateAlertPathClickStackAlertIdSchema = z
	.string()
	.describe("ClickStack Alert ID");

export const clickStackUpdateAlertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackAlertResponseSchema.optional(),
});

export const clickStackUpdateAlertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateAlertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateAlertResponseSchema = clickStackUpdateAlertStatus200Schema;

export const clickStackUpdateAlertErrorSchema = z.union([
	clickStackUpdateAlertStatus400Schema,
	clickStackUpdateAlertStatus500Schema,
]);

export const clickStackUpdateAlertBodySchema = clickStackUpdateAlertRequestSchema.optional();

export const clickStackDeleteAlertPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteAlertPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteAlertPathClickStackAlertIdSchema = z
	.string()
	.describe("ClickStack Alert ID");

export const clickStackDeleteAlertStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteAlertStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteAlertStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteAlertResponseSchema = clickStackDeleteAlertStatus200Schema;

export const clickStackDeleteAlertErrorSchema = z.union([
	clickStackDeleteAlertStatus400Schema,
	clickStackDeleteAlertStatus500Schema,
]);

export const clickStackListWebhooksPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListWebhooksPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListWebhooksQueryLimitSchema = z
	.int()
	.min(1)
	.max(1000)
	.optional()
	.default(1000)
	.describe("Maximum number of results to return.");

export const clickStackListWebhooksQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const clickStackListWebhooksStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackWebhookSchema).optional(),
});

export const clickStackListWebhooksStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListWebhooksStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListWebhooksResponseSchema = clickStackListWebhooksStatus200Schema;

export const clickStackListWebhooksErrorSchema = z.union([
	clickStackListWebhooksStatus400Schema,
	clickStackListWebhooksStatus500Schema,
]);

export const clickStackCreateWebhookPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateWebhookPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateWebhookStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackWebhookSchema.optional(),
});

export const clickStackCreateWebhookStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateWebhookStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateWebhookResponseSchema = clickStackCreateWebhookStatus200Schema;

export const clickStackCreateWebhookErrorSchema = z.union([
	clickStackCreateWebhookStatus400Schema,
	clickStackCreateWebhookStatus500Schema,
]);

export const clickStackCreateWebhookBodySchema = clickStackWebhookInputSchema.optional();

export const clickStackUpdateWebhookPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateWebhookPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateWebhookPathClickStackWebhookIdSchema = z
	.string()
	.describe("Webhook ID");

export const clickStackUpdateWebhookStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackWebhookSchema.optional(),
});

export const clickStackUpdateWebhookStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateWebhookStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateWebhookResponseSchema = clickStackUpdateWebhookStatus200Schema;

export const clickStackUpdateWebhookErrorSchema = z.union([
	clickStackUpdateWebhookStatus400Schema,
	clickStackUpdateWebhookStatus500Schema,
]);

export const clickStackUpdateWebhookBodySchema = clickStackWebhookInputSchema.optional();

export const clickStackDeleteWebhookPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteWebhookPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteWebhookPathClickStackWebhookIdSchema = z
	.string()
	.describe("Webhook ID");

export const clickStackDeleteWebhookStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteWebhookStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteWebhookStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteWebhookResponseSchema = clickStackDeleteWebhookStatus200Schema;

export const clickStackDeleteWebhookErrorSchema = z.union([
	clickStackDeleteWebhookStatus400Schema,
	clickStackDeleteWebhookStatus500Schema,
]);

export const clickStackListRolesPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListRolesPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListRolesStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackRoleSchema).optional(),
});

export const clickStackListRolesStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListRolesStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListRolesResponseSchema = clickStackListRolesStatus200Schema;

export const clickStackListRolesErrorSchema = z.union([
	clickStackListRolesStatus400Schema,
	clickStackListRolesStatus500Schema,
]);

export const clickStackCreateRolePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateRolePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateRoleStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackRoleSchema.optional(),
});

export const clickStackCreateRoleStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateRoleStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateRoleResponseSchema = clickStackCreateRoleStatus200Schema;

export const clickStackCreateRoleErrorSchema = z.union([
	clickStackCreateRoleStatus400Schema,
	clickStackCreateRoleStatus500Schema,
]);

export const clickStackCreateRoleBodySchema = clickStackCreateRoleRequestSchema.optional();

export const clickStackGetRolePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackGetRolePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackGetRolePathClickStackRoleIdSchema = z.string().describe("id parameter");

export const clickStackGetRoleStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackRoleSchema.optional(),
});

export const clickStackGetRoleStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetRoleStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetRoleResponseSchema = clickStackGetRoleStatus200Schema;

export const clickStackGetRoleErrorSchema = z.union([
	clickStackGetRoleStatus400Schema,
	clickStackGetRoleStatus500Schema,
]);

export const clickStackUpdateRolePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateRolePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateRolePathClickStackRoleIdSchema = z.string().describe("id parameter");

export const clickStackUpdateRoleStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackRoleSchema.optional(),
});

export const clickStackUpdateRoleStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateRoleStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateRoleResponseSchema = clickStackUpdateRoleStatus200Schema;

export const clickStackUpdateRoleErrorSchema = z.union([
	clickStackUpdateRoleStatus400Schema,
	clickStackUpdateRoleStatus500Schema,
]);

export const clickStackUpdateRoleBodySchema = clickStackUpdateRoleRequestSchema.optional();

export const clickStackDeleteRolePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteRolePathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteRolePathClickStackRoleIdSchema = z.string().describe("id parameter");

export const clickStackDeleteRoleStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteRoleStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteRoleStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteRoleResponseSchema = clickStackDeleteRoleStatus200Schema;

export const clickStackDeleteRoleErrorSchema = z.union([
	clickStackDeleteRoleStatus400Schema,
	clickStackDeleteRoleStatus500Schema,
]);

export const clickStackListSavedSearchesPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackListSavedSearchesPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackListSavedSearchesQueryLimitSchema = z
	.int()
	.min(1)
	.max(1000)
	.optional()
	.default(1000)
	.describe("Maximum number of results to return.");

export const clickStackListSavedSearchesQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const clickStackListSavedSearchesStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(clickStackSavedSearchSchema).optional(),
});

export const clickStackListSavedSearchesStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListSavedSearchesStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackListSavedSearchesResponseSchema = clickStackListSavedSearchesStatus200Schema;

export const clickStackListSavedSearchesErrorSchema = z.union([
	clickStackListSavedSearchesStatus400Schema,
	clickStackListSavedSearchesStatus500Schema,
]);

export const clickStackCreateSavedSearchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackCreateSavedSearchPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackCreateSavedSearchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSavedSearchSchema.optional(),
});

export const clickStackCreateSavedSearchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateSavedSearchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackCreateSavedSearchResponseSchema = clickStackCreateSavedSearchStatus200Schema;

export const clickStackCreateSavedSearchErrorSchema = z.union([
	clickStackCreateSavedSearchStatus400Schema,
	clickStackCreateSavedSearchStatus500Schema,
]);

export const clickStackCreateSavedSearchBodySchema = clickStackSavedSearchInputSchema.optional();

export const clickStackGetSavedSearchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackGetSavedSearchPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackGetSavedSearchPathClickStackSavedSearchIdSchema = z
	.string()
	.describe("Saved search ID");

export const clickStackGetSavedSearchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSavedSearchSchema.optional(),
});

export const clickStackGetSavedSearchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetSavedSearchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackGetSavedSearchResponseSchema = clickStackGetSavedSearchStatus200Schema;

export const clickStackGetSavedSearchErrorSchema = z.union([
	clickStackGetSavedSearchStatus400Schema,
	clickStackGetSavedSearchStatus500Schema,
]);

export const clickStackUpdateSavedSearchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackUpdateSavedSearchPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackUpdateSavedSearchPathClickStackSavedSearchIdSchema = z
	.string()
	.describe("Saved search ID");

export const clickStackUpdateSavedSearchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: clickStackSavedSearchSchema.optional(),
});

export const clickStackUpdateSavedSearchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateSavedSearchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackUpdateSavedSearchResponseSchema = clickStackUpdateSavedSearchStatus200Schema;

export const clickStackUpdateSavedSearchErrorSchema = z.union([
	clickStackUpdateSavedSearchStatus400Schema,
	clickStackUpdateSavedSearchStatus500Schema,
]);

export const clickStackUpdateSavedSearchBodySchema = clickStackSavedSearchInputSchema.optional();

export const clickStackDeleteSavedSearchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickStackDeleteSavedSearchPathServiceIdSchema = z
	.uuid()
	.describe("ID of the ClickStack service.");

export const clickStackDeleteSavedSearchPathClickStackSavedSearchIdSchema = z
	.string()
	.describe("Saved search ID");

export const clickStackDeleteSavedSearchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSavedSearchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSavedSearchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickStackDeleteSavedSearchResponseSchema = clickStackDeleteSavedSearchStatus200Schema;

export const clickStackDeleteSavedSearchErrorSchema = z.union([
	clickStackDeleteSavedSearchStatus400Schema,
	clickStackDeleteSavedSearchStatus500Schema,
]);

export const postgresServiceCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that will own the service.");

export const postgresServiceCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresServiceCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceCreateResponseSchema = postgresServiceCreateStatus200Schema;

export const postgresServiceCreateErrorSchema = z.union([
	postgresServiceCreateStatus400Schema,
	postgresServiceCreateStatus500Schema,
]);

export const postgresServiceCreateBodySchema = postgresServicePostRequestSchema.optional();

export const postgresServiceGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the services.");

export const postgresServiceGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(postgresServiceListItemSchema).optional(),
});

export const postgresServiceGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceGetListResponseSchema = postgresServiceGetListStatus200Schema;

export const postgresServiceGetListErrorSchema = z.union([
	postgresServiceGetListStatus400Schema,
	postgresServiceGetListStatus500Schema,
]);

export const postgresOrgPrometheusGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const postgresOrgPrometheusGetStatus200Schema = z.unknown();

export const postgresOrgPrometheusGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresOrgPrometheusGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresOrgPrometheusGetResponseSchema = postgresOrgPrometheusGetStatus200Schema;

export const postgresOrgPrometheusGetErrorSchema = z.union([
	postgresOrgPrometheusGetStatus400Schema,
	postgresOrgPrometheusGetStatus500Schema,
]);

export const postgresServiceGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServiceGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServiceGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresServiceGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceGetResponseSchema = postgresServiceGetStatus200Schema;

export const postgresServiceGetErrorSchema = z.union([
	postgresServiceGetStatus400Schema,
	postgresServiceGetStatus500Schema,
]);

export const postgresServiceDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServiceDeletePathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServiceDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceDeleteResponseSchema = postgresServiceDeleteStatus200Schema;

export const postgresServiceDeleteErrorSchema = z.union([
	postgresServiceDeleteStatus400Schema,
	postgresServiceDeleteStatus500Schema,
]);

export const postgresServicePatchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServicePatchPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServicePatchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresServicePatchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServicePatchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServicePatchResponseSchema = postgresServicePatchStatus200Schema;

export const postgresServicePatchErrorSchema = z.union([
	postgresServicePatchStatus400Schema,
	postgresServicePatchStatus500Schema,
]);

export const postgresServicePatchBodySchema = postgresServicePatchRequestSchema.optional();

export const postgresServiceCertsGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServiceCertsGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServiceCertsGetStatus200Schema = z.unknown();

export const postgresServiceCertsGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceCertsGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceCertsGetResponseSchema = postgresServiceCertsGetStatus200Schema;

export const postgresServiceCertsGetErrorSchema = z.union([
	postgresServiceCertsGetStatus400Schema,
	postgresServiceCertsGetStatus500Schema,
]);

export const postgresInstanceRestorePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceRestorePathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstanceRestoreStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresInstanceRestoreStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceRestoreStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceRestoreResponseSchema = postgresInstanceRestoreStatus200Schema;

export const postgresInstanceRestoreErrorSchema = z.union([
	postgresInstanceRestoreStatus400Schema,
	postgresInstanceRestoreStatus500Schema,
]);

export const postgresInstanceRestoreBodySchema = postgresServiceRestoreRequestSchema.optional();

export const postgresServiceSetPasswordPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServiceSetPasswordPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServiceSetPasswordStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServicePasswordResourceSchema.optional(),
});

export const postgresServiceSetPasswordStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceSetPasswordStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceSetPasswordResponseSchema = postgresServiceSetPasswordStatus200Schema;

export const postgresServiceSetPasswordErrorSchema = z.union([
	postgresServiceSetPasswordStatus400Schema,
	postgresServiceSetPasswordStatus500Schema,
]);

export const postgresServiceSetPasswordBodySchema = postgresServiceSetPasswordSchema.optional();

export const postgresServicePatchStatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServicePatchStatePathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresServicePatchStateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresServicePatchStateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServicePatchStateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServicePatchStateResponseSchema = postgresServicePatchStateStatus200Schema;

export const postgresServicePatchStateErrorSchema = z.union([
	postgresServicePatchStateStatus400Schema,
	postgresServicePatchStateStatus500Schema,
]);

export const postgresServicePatchStateBodySchema = postgresServiceSetStateSchema.optional();

export const postgresInstanceCreateReadReplicaPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceCreateReadReplicaPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstanceCreateReadReplicaStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresServiceSchema.optional(),
});

export const postgresInstanceCreateReadReplicaStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceCreateReadReplicaStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceCreateReadReplicaResponseSchema =
	postgresInstanceCreateReadReplicaStatus200Schema;

export const postgresInstanceCreateReadReplicaErrorSchema = z.union([
	postgresInstanceCreateReadReplicaStatus400Schema,
	postgresInstanceCreateReadReplicaStatus500Schema,
]);

export const postgresInstanceCreateReadReplicaBodySchema =
	postgresServiceReadReplicaRequestSchema.optional();

export const postgresInstanceConfigGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceConfigGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstanceConfigGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresInstanceConfigSchema.optional(),
});

export const postgresInstanceConfigGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigGetResponseSchema = postgresInstanceConfigGetStatus200Schema;

export const postgresInstanceConfigGetErrorSchema = z.union([
	postgresInstanceConfigGetStatus400Schema,
	postgresInstanceConfigGetStatus500Schema,
]);

export const postgresInstanceConfigPostPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceConfigPostPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstanceConfigPostStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresInstanceUpdateConfigResponseSchema.optional(),
});

export const postgresInstanceConfigPostStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigPostStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigPostResponseSchema = postgresInstanceConfigPostStatus200Schema;

export const postgresInstanceConfigPostErrorSchema = z.union([
	postgresInstanceConfigPostStatus400Schema,
	postgresInstanceConfigPostStatus500Schema,
]);

export const postgresInstanceConfigPostBodySchema = postgresInstanceConfigSchema.optional();

export const postgresInstanceConfigPatchPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceConfigPatchPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstanceConfigPatchStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresInstanceUpdateConfigResponseSchema.optional(),
});

export const postgresInstanceConfigPatchStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigPatchStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceConfigPatchResponseSchema = postgresInstanceConfigPatchStatus200Schema;

export const postgresInstanceConfigPatchErrorSchema = z.union([
	postgresInstanceConfigPatchStatus400Schema,
	postgresInstanceConfigPatchStatus500Schema,
]);

export const postgresInstanceConfigPatchBodySchema = postgresInstanceConfigSchema.optional();

export const postgresInstancePrometheusGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstancePrometheusGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresInstancePrometheusGetStatus200Schema = z.unknown();

export const postgresInstancePrometheusGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstancePrometheusGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstancePrometheusGetResponseSchema =
	postgresInstancePrometheusGetStatus200Schema;

export const postgresInstancePrometheusGetErrorSchema = z.union([
	postgresInstancePrometheusGetStatus400Schema,
	postgresInstancePrometheusGetStatus500Schema,
]);

export const postgresInstanceMetricsGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresInstanceMetricsGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the Postgres service.");

export const postgresInstanceMetricsGetQueryFromDateSchema = z.iso
	.datetime()
	.describe("Inclusive start of the time window (RFC 3339 date-time).");

export const postgresInstanceMetricsGetQueryToDateSchema = z.iso
	.datetime()
	.describe("Exclusive end of the time window (RFC 3339 date-time).");

export const postgresInstanceMetricsGetQueryBucketSizeSecondsSchema = z
	.int()
	.min(1)
	.optional()
	.describe(
		"Time-series bucket size in seconds. When omitted, a bucket size is derived from the requested window. Requests are capped at 250 data points.",
	);

export const postgresInstanceMetricsGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresMetricsSchema.optional(),
});

export const postgresInstanceMetricsGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceMetricsGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresInstanceMetricsGetResponseSchema = postgresInstanceMetricsGetStatus200Schema;

export const postgresInstanceMetricsGetErrorSchema = z.union([
	postgresInstanceMetricsGetStatus400Schema,
	postgresInstanceMetricsGetStatus500Schema,
]);

export const postgresServiceBackupGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresServiceBackupGetListPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the Postgres service the backups were created from.");

export const postgresServiceBackupGetListQueryLimitSchema = z
	.int()
	.min(1)
	.max(100)
	.optional()
	.default(100)
	.describe("Maximum number of results to return.");

export const postgresServiceBackupGetListQueryCursorSchema = z
	.string()
	.optional()
	.describe(
		"Opaque cursor from a previous response's `nextCursor`, marking where to resume the list.",
	);

export const postgresServiceBackupGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(postgresBackupSchema).optional(),
	limit: z.int().optional().describe("Maximum number of results returned in this page."),
	totalCount: z
		.int()
		.nullish()
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.string()
		.nullish()
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
});

export const postgresServiceBackupGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceBackupGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresServiceBackupGetListResponseSchema =
	postgresServiceBackupGetListStatus200Schema;

export const postgresServiceBackupGetListErrorSchema = z.union([
	postgresServiceBackupGetListStatus400Schema,
	postgresServiceBackupGetListStatus500Schema,
]);

export const slowQueryPatternsGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const slowQueryPatternsGetListPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const slowQueryPatternsGetListQueryFromDateSchema = z.iso
	.datetime()
	.describe("Inclusive start of the time window (RFC 3339 date-time).");

export const slowQueryPatternsGetListQueryToDateSchema = z.iso
	.datetime()
	.describe("Exclusive end of the time window (RFC 3339 date-time).");

export const slowQueryPatternsGetListQueryDbNameSchema = z
	.string()
	.optional()
	.describe("Database name filter.");

export const slowQueryPatternsGetListQueryDbUserSchema = z
	.string()
	.optional()
	.describe("Database user filter.");

export const slowQueryPatternsGetListQueryDbOperationSchema = z
	.string()
	.optional()
	.describe("Database operation filter (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY).");

export const slowQueryPatternsGetListQueryAppSchema = z
	.string()
	.optional()
	.describe("Application name filter.");

export const slowQueryPatternsGetListQuerySortBySchema = z
	.enum([
		"total_duration",
		"avg_duration",
		"call_count",
		"total_blks_read",
		"total_cpu_time",
		"error_count",
		"max_duration",
		"p50_duration",
		"p95_duration",
		"p99_duration",
		"total_rows",
		"total_shared_blks_hit",
		"total_wal_bytes",
	])
	.optional()
	.default("total_duration")
	.describe("Field to sort results by.");

export const slowQueryPatternsGetListQuerySortOrderSchema = z
	.enum(["asc", "desc"])
	.optional()
	.default("desc")
	.describe("Sort order. One of `asc` or `desc`.");

export const slowQueryPatternsGetListQueryLimitSchema = z
	.int()
	.min(1)
	.max(500)
	.optional()
	.default(20)
	.describe("Maximum number of results to return.");

export const slowQueryPatternsGetListQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const slowQueryPatternsGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(postgresSlowQueryPatternSchema).optional(),
});

export const slowQueryPatternsGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const slowQueryPatternsGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const slowQueryPatternsGetListResponseSchema = slowQueryPatternsGetListStatus200Schema;

export const slowQueryPatternsGetListErrorSchema = z.union([
	slowQueryPatternsGetListStatus400Schema,
	slowQueryPatternsGetListStatus500Schema,
]);

export const slowQueryPatternGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const slowQueryPatternGetPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const slowQueryPatternGetPathQueryIdSchema = z
	.string()
	.describe("Stable identifier for the query pattern.");

export const slowQueryPatternGetQueryDbNameSchema = z.string().describe("Database name filter.");

export const slowQueryPatternGetQueryDbUserSchema = z.string().describe("Database user filter.");

export const slowQueryPatternGetQueryDbOperationSchema = z
	.string()
	.describe("Database operation filter (for example, SELECT, INSERT, UPDATE, DELETE, UTILITY).");

export const slowQueryPatternGetQueryAppSchema = z
	.string()
	.optional()
	.describe("Application name filter.");

export const slowQueryPatternGetQueryTimestampSchema = z.iso
	.datetime()
	.optional()
	.describe("Timestamp of a specific execution (RFC 3339).");

export const slowQueryPatternGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: postgresSlowQueryPatternDetailSchema.optional(),
});

export const slowQueryPatternGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const slowQueryPatternGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const slowQueryPatternGetResponseSchema = slowQueryPatternGetStatus200Schema;

export const slowQueryPatternGetErrorSchema = z.union([
	slowQueryPatternGetStatus400Schema,
	slowQueryPatternGetStatus500Schema,
]);

export const postgresLogsGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the Postgres service.");

export const postgresLogsGetListPathPostgresIdSchema = z
	.uuid()
	.describe("ID of the requested Postgres service.");

export const postgresLogsGetListQueryFromDateSchema = z.iso
	.datetime()
	.describe("Inclusive start of the time window (RFC 3339 date-time).");

export const postgresLogsGetListQueryToDateSchema = z.iso
	.datetime()
	.describe("Inclusive end of the time window (RFC 3339 date-time).");

export const postgresLogsGetListQueryBodyContainsSchema = z
	.string()
	.optional()
	.describe("Case-sensitive substring the log body must contain.");

export const postgresLogsGetListQuerySeveritySchema = z
	.string()
	.optional()
	.describe(
		"Filter to log entries with this PostgreSQL severity (for example, ERROR, WARNING, LOG).",
	);

export const postgresLogsGetListQuerySortOrderSchema = z
	.enum(["asc", "desc"])
	.optional()
	.default("desc")
	.describe("Sort order. One of `asc` or `desc`.");

export const postgresLogsGetListQueryLimitSchema = z
	.int()
	.min(1)
	.max(2000)
	.optional()
	.default(50)
	.describe("Maximum number of results to return.");

export const postgresLogsGetListQueryOffsetSchema = z
	.int()
	.min(0)
	.optional()
	.default(0)
	.describe("Number of results to skip before returning.");

export const postgresLogsGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(postgresLogEntrySchema).optional(),
});

export const postgresLogsGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresLogsGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const postgresLogsGetListResponseSchema = postgresLogsGetListStatus200Schema;

export const postgresLogsGetListErrorSchema = z.union([
	postgresLogsGetListStatus400Schema,
	postgresLogsGetListStatus500Schema,
]);

export const organizationPrivateEndpointConfigGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationPrivateEndpointConfigGetListQueryCloudProviderSchema = z
	.string()
	.describe("Cloud provider identifier. One of aws, gcp, or azure.");

export const organizationPrivateEndpointConfigGetListQueryRegionIdSchema = z
	.string()
	.describe("Region identifier within specific cloud providers.");

export const organizationPrivateEndpointConfigGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: organizationCloudRegionPrivateEndpointConfigSchema.optional(),
});

export const organizationPrivateEndpointConfigGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrivateEndpointConfigGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationPrivateEndpointConfigGetListResponseSchema =
	organizationPrivateEndpointConfigGetListStatus200Schema;

export const organizationPrivateEndpointConfigGetListErrorSchema = z.union([
	organizationPrivateEndpointConfigGetListStatus400Schema,
	organizationPrivateEndpointConfigGetListStatus500Schema,
]);

export const organizationByocInfrastructureCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocConfigSchema.optional(),
});

export const organizationByocInfrastructureCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureCreateResponseSchema =
	organizationByocInfrastructureCreateStatus200Schema;

export const organizationByocInfrastructureCreateErrorSchema = z.union([
	organizationByocInfrastructureCreateStatus400Schema,
	organizationByocInfrastructureCreateStatus500Schema,
]);

export const organizationByocInfrastructureCreateBodySchema =
	byocInfrastructurePostRequestSchema.optional();

export const organizationByocInfrastructureValidatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureValidateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocInfrastructureValidationSchema.optional(),
});

export const organizationByocInfrastructureValidateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureValidateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureValidateResponseSchema =
	organizationByocInfrastructureValidateStatus200Schema;

export const organizationByocInfrastructureValidateErrorSchema = z.union([
	organizationByocInfrastructureValidateStatus400Schema,
	organizationByocInfrastructureValidateStatus500Schema,
]);

export const organizationByocInfrastructureValidateBodySchema =
	byocInfrastructureValidatePostRequestSchema.optional();

export const organizationByocInfrastructureGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureGetPathByocInfrastructureIdSchema = z
	.uuid()
	.describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructureGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocInfrastructureDetailsSchema.optional(),
});

export const organizationByocInfrastructureGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureGetResponseSchema =
	organizationByocInfrastructureGetStatus200Schema;

export const organizationByocInfrastructureGetErrorSchema = z.union([
	organizationByocInfrastructureGetStatus400Schema,
	organizationByocInfrastructureGetStatus500Schema,
]);

export const organizationByocInfrastructureDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureDeletePathByocInfrastructureIdSchema = z
	.uuid()
	.describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructureDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureDeleteResponseSchema =
	organizationByocInfrastructureDeleteStatus200Schema;

export const organizationByocInfrastructureDeleteErrorSchema = z.union([
	organizationByocInfrastructureDeleteStatus400Schema,
	organizationByocInfrastructureDeleteStatus500Schema,
]);

export const organizationByocInfrastructureUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureUpdatePathByocInfrastructureIdSchema = z
	.uuid()
	.describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructureUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocConfigSchema.optional(),
});

export const organizationByocInfrastructureUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureUpdateResponseSchema =
	organizationByocInfrastructureUpdateStatus200Schema;

export const organizationByocInfrastructureUpdateErrorSchema = z.union([
	organizationByocInfrastructureUpdateStatus400Schema,
	organizationByocInfrastructureUpdateStatus500Schema,
]);

export const organizationByocInfrastructureUpdateBodySchema =
	byocInfrastructurePatchRequestSchema.optional();

export const organizationByocInfrastructureProgressGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureProgressGetPathByocInfrastructureIdSchema = z
	.uuid()
	.describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructureProgressGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocInfrastructureProgressSchema.optional(),
});

export const organizationByocInfrastructureProgressGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureProgressGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureProgressGetResponseSchema =
	organizationByocInfrastructureProgressGetStatus200Schema;

export const organizationByocInfrastructureProgressGetErrorSchema = z.union([
	organizationByocInfrastructureProgressGetStatus400Schema,
	organizationByocInfrastructureProgressGetStatus500Schema,
]);

export const organizationByocInfrastructureTagsGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructureTagsGetPathByocInfrastructureIdSchema = z
	.uuid()
	.describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructureTagsGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocInfrastructureTagsResponseSchema.optional(),
});

export const organizationByocInfrastructureTagsGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureTagsGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructureTagsGetResponseSchema =
	organizationByocInfrastructureTagsGetStatus200Schema;

export const organizationByocInfrastructureTagsGetErrorSchema = z.union([
	organizationByocInfrastructureTagsGetStatus400Schema,
	organizationByocInfrastructureTagsGetStatus500Schema,
]);

export const organizationByocInfrastructurePrivateEndpointConfigGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const organizationByocInfrastructurePrivateEndpointConfigGetPathByocInfrastructureIdSchema =
	z.uuid().describe("ID of the requested BYOC Infrastructure");

export const organizationByocInfrastructurePrivateEndpointConfigGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: byocInfrastructurePrivateEndpointConfigSchema.optional(),
});

export const organizationByocInfrastructurePrivateEndpointConfigGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructurePrivateEndpointConfigGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const organizationByocInfrastructurePrivateEndpointConfigGetResponseSchema =
	organizationByocInfrastructurePrivateEndpointConfigGetStatus200Schema;

export const organizationByocInfrastructurePrivateEndpointConfigGetErrorSchema = z.union([
	organizationByocInfrastructurePrivateEndpointConfigGetStatus400Schema,
	organizationByocInfrastructurePrivateEndpointConfigGetStatus500Schema,
]);

export const clickPipeReversePrivateEndpointGetListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeReversePrivateEndpointGetListPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the Reverse Private Endpoint.");

export const clickPipeReversePrivateEndpointGetListStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: z.array(reversePrivateEndpointSchema).optional(),
});

export const clickPipeReversePrivateEndpointGetListStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointGetListStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointGetListResponseSchema =
	clickPipeReversePrivateEndpointGetListStatus200Schema;

export const clickPipeReversePrivateEndpointGetListErrorSchema = z.union([
	clickPipeReversePrivateEndpointGetListStatus400Schema,
	clickPipeReversePrivateEndpointGetListStatus500Schema,
]);

export const clickPipeReversePrivateEndpointCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeReversePrivateEndpointCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the Reverse Private Endpoint.");

export const clickPipeReversePrivateEndpointCreateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: reversePrivateEndpointSchema.optional(),
});

export const clickPipeReversePrivateEndpointCreateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointCreateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointCreateResponseSchema =
	clickPipeReversePrivateEndpointCreateStatus200Schema;

export const clickPipeReversePrivateEndpointCreateErrorSchema = z.union([
	clickPipeReversePrivateEndpointCreateStatus400Schema,
	clickPipeReversePrivateEndpointCreateStatus500Schema,
]);

export const clickPipeReversePrivateEndpointCreateBodySchema =
	createReversePrivateEndpointSchema.optional();

export const clickPipeReversePrivateEndpointGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeReversePrivateEndpointGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the Reverse Private Endpoint.");

export const clickPipeReversePrivateEndpointGetPathReversePrivateEndpointIdSchema = z
	.uuid()
	.describe("ID of the reverse private endpoint to get.");

export const clickPipeReversePrivateEndpointGetStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: reversePrivateEndpointSchema.optional(),
});

export const clickPipeReversePrivateEndpointGetStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointGetStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointGetResponseSchema =
	clickPipeReversePrivateEndpointGetStatus200Schema;

export const clickPipeReversePrivateEndpointGetErrorSchema = z.union([
	clickPipeReversePrivateEndpointGetStatus400Schema,
	clickPipeReversePrivateEndpointGetStatus500Schema,
]);

export const clickPipeReversePrivateEndpointDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeReversePrivateEndpointDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the Reverse Private Endpoint.");

export const clickPipeReversePrivateEndpointDeletePathReversePrivateEndpointIdSchema = z
	.uuid()
	.describe("ID of the reverse private endpoint to delete.");

export const clickPipeReversePrivateEndpointDeleteStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointDeleteStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointDeleteStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointDeleteResponseSchema =
	clickPipeReversePrivateEndpointDeleteStatus200Schema;

export const clickPipeReversePrivateEndpointDeleteErrorSchema = z.union([
	clickPipeReversePrivateEndpointDeleteStatus400Schema,
	clickPipeReversePrivateEndpointDeleteStatus500Schema,
]);

export const clickPipeReversePrivateEndpointUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the organization that owns the service.");

export const clickPipeReversePrivateEndpointUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the service that owns the Reverse Private Endpoint.");

export const clickPipeReversePrivateEndpointUpdatePathReversePrivateEndpointIdSchema = z
	.uuid()
	.describe("ID of the reverse private endpoint to update.");

export const clickPipeReversePrivateEndpointUpdateStatus200Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
	result: reversePrivateEndpointSchema.optional(),
});

export const clickPipeReversePrivateEndpointUpdateStatus400Schema = z.object({
	status: z
		.number()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointUpdateStatus500Schema = z.object({
	status: z
		.int()
		.optional()
		.describe("HTTP status code.")
		.meta({ examples: [500] }),
	error: z.string().optional().describe("Detailed error description."),
	requestId: z.uuid().optional().describe("Unique id assigned to every request. UUIDv4"),
});

export const clickPipeReversePrivateEndpointUpdateResponseSchema =
	clickPipeReversePrivateEndpointUpdateStatus200Schema;

export const clickPipeReversePrivateEndpointUpdateErrorSchema = z.union([
	clickPipeReversePrivateEndpointUpdateStatus400Schema,
	clickPipeReversePrivateEndpointUpdateStatus500Schema,
]);

export const clickPipeReversePrivateEndpointUpdateBodySchema =
	updateReversePrivateEndpointSchema.optional();

export const queryApiEndpointListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const queryApiEndpointListPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const queryApiEndpointListQueryCursorSchema = z
	.string()
	.optional()
	.describe("Cursor returned as `nextCursor` on the previous page.");

export const queryApiEndpointListQueryLimitSchema = z
	.int()
	.max(100)
	.gt(0)
	.optional()
	.default(100)
	.describe("Maximum number of records to return per page. Defaults to 100. Maximum is 100.");

export const queryApiEndpointListStatus200Schema = z.strictObject({
	result: z
		.array(publicQueryApiEndpointListItemSchema)
		.describe("Active Query API endpoints for the service."),
	limit: z.int().describe("Maximum number of results returned in this page."),
	totalCount: z
		.union([z.int(), z.null()])
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.union([z.string(), z.null()])
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointListStatus400Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointListStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointListStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointListStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const queryApiEndpointListResponseSchema = queryApiEndpointListStatus200Schema;

export const queryApiEndpointListErrorSchema = z.union([
	queryApiEndpointListStatus400Schema,
	queryApiEndpointListStatus403Schema,
	queryApiEndpointListStatus404Schema,
	queryApiEndpointListStatus500Schema,
]);

export const queryApiEndpointCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const queryApiEndpointCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const queryApiEndpointCreateStatus201Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [201] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicQueryApiEndpointSchema,
});

export const queryApiEndpointCreateStatus400Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointCreateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointCreateStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointCreateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const queryApiEndpointCreateResponseSchema = queryApiEndpointCreateStatus201Schema;

export const queryApiEndpointCreateErrorSchema = z.union([
	queryApiEndpointCreateStatus400Schema,
	queryApiEndpointCreateStatus403Schema,
	queryApiEndpointCreateStatus404Schema,
	queryApiEndpointCreateStatus500Schema,
]);

export const queryApiEndpointCreateBodySchema = publicQueryApiEndpointRequestSchema.optional();

export const queryApiEndpointDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const queryApiEndpointDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const queryApiEndpointDeletePathEndpointIdSchema = z
	.uuid()
	.describe("ID of the requested Query API endpoint.");

export const queryApiEndpointDeleteStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointDeleteStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointDeleteStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointDeleteStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointDeleteStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointDeleteStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const queryApiEndpointDeleteResponseSchema = queryApiEndpointDeleteStatus200Schema;

export const queryApiEndpointDeleteErrorSchema = z.union([
	queryApiEndpointDeleteStatus400Schema,
	queryApiEndpointDeleteStatus403Schema,
	queryApiEndpointDeleteStatus404Schema,
	queryApiEndpointDeleteStatus409Schema,
	queryApiEndpointDeleteStatus500Schema,
]);

export const queryApiEndpointGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const queryApiEndpointGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const queryApiEndpointGetPathEndpointIdSchema = z
	.uuid()
	.describe("ID of the requested Query API endpoint.");

export const queryApiEndpointGetStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicQueryApiEndpointSchema,
});

export const queryApiEndpointGetStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointGetStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointGetStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointGetStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const queryApiEndpointGetResponseSchema = queryApiEndpointGetStatus200Schema;

export const queryApiEndpointGetErrorSchema = z.union([
	queryApiEndpointGetStatus400Schema,
	queryApiEndpointGetStatus403Schema,
	queryApiEndpointGetStatus404Schema,
	queryApiEndpointGetStatus500Schema,
]);

export const queryApiEndpointUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const queryApiEndpointUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const queryApiEndpointUpdatePathEndpointIdSchema = z
	.uuid()
	.describe("ID of the requested Query API endpoint.");

export const queryApiEndpointUpdateStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicQueryApiEndpointSchema,
});

export const queryApiEndpointUpdateStatus400Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointUpdateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointUpdateStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointUpdateStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const queryApiEndpointUpdateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const queryApiEndpointUpdateResponseSchema = queryApiEndpointUpdateStatus200Schema;

export const queryApiEndpointUpdateErrorSchema = z.union([
	queryApiEndpointUpdateStatus400Schema,
	queryApiEndpointUpdateStatus403Schema,
	queryApiEndpointUpdateStatus404Schema,
	queryApiEndpointUpdateStatus409Schema,
	queryApiEndpointUpdateStatus500Schema,
]);

export const queryApiEndpointUpdateBodySchema = publicQueryApiEndpointRequestSchema.optional();

export const savedQueryListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const savedQueryListPathServiceIdSchema = z.uuid().describe("ID of the requested service.");

export const savedQueryListQueryCursorSchema = z
	.string()
	.optional()
	.describe("Cursor returned as `nextCursor` on the previous page.");

export const savedQueryListQueryLimitSchema = z
	.int()
	.max(100)
	.gt(0)
	.optional()
	.default(100)
	.describe("Maximum number of records to return per page. Defaults to 100. Maximum is 100.");

export const savedQueryListStatus200Schema = z.strictObject({
	result: z.array(publicSavedQueryListItemSchema).describe("Saved queries for the service."),
	limit: z.int().describe("Maximum number of results returned in this page."),
	totalCount: z
		.union([z.int(), z.null()])
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.union([z.string(), z.null()])
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryListStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryListStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryListStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryListStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const savedQueryListResponseSchema = savedQueryListStatus200Schema;

export const savedQueryListErrorSchema = z.union([
	savedQueryListStatus400Schema,
	savedQueryListStatus403Schema,
	savedQueryListStatus404Schema,
	savedQueryListStatus500Schema,
]);

export const savedQueryCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const savedQueryCreatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const savedQueryCreateStatus201Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [201] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicSavedQuerySchema,
});

export const savedQueryCreateStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryCreateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryCreateStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryCreateStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryCreateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const savedQueryCreateResponseSchema = savedQueryCreateStatus201Schema;

export const savedQueryCreateErrorSchema = z.union([
	savedQueryCreateStatus400Schema,
	savedQueryCreateStatus403Schema,
	savedQueryCreateStatus404Schema,
	savedQueryCreateStatus409Schema,
	savedQueryCreateStatus500Schema,
]);

export const savedQueryCreateBodySchema = publicSavedQueryRequestSchema.optional();

export const savedQueryDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const savedQueryDeletePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const savedQueryDeletePathQueryIdSchema = z
	.uuid()
	.describe("ID of the requested saved query.");

export const savedQueryDeleteStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryDeleteStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryDeleteStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryDeleteStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryDeleteStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryDeleteStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const savedQueryDeleteResponseSchema = savedQueryDeleteStatus200Schema;

export const savedQueryDeleteErrorSchema = z.union([
	savedQueryDeleteStatus400Schema,
	savedQueryDeleteStatus403Schema,
	savedQueryDeleteStatus404Schema,
	savedQueryDeleteStatus409Schema,
	savedQueryDeleteStatus500Schema,
]);

export const savedQueryGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const savedQueryGetPathServiceIdSchema = z.uuid().describe("ID of the requested service.");

export const savedQueryGetPathQueryIdSchema = z.uuid().describe("ID of the requested saved query.");

export const savedQueryGetStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicSavedQuerySchema,
});

export const savedQueryGetStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryGetStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryGetStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryGetStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const savedQueryGetResponseSchema = savedQueryGetStatus200Schema;

export const savedQueryGetErrorSchema = z.union([
	savedQueryGetStatus400Schema,
	savedQueryGetStatus403Schema,
	savedQueryGetStatus404Schema,
	savedQueryGetStatus500Schema,
]);

export const savedQueryUpdatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const savedQueryUpdatePathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const savedQueryUpdatePathQueryIdSchema = z
	.uuid()
	.describe("ID of the requested saved query.");

export const savedQueryUpdateStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: publicSavedQuerySchema,
});

export const savedQueryUpdateStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryUpdateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryUpdateStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryUpdateStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const savedQueryUpdateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const savedQueryUpdateResponseSchema = savedQueryUpdateStatus200Schema;

export const savedQueryUpdateErrorSchema = z.union([
	savedQueryUpdateStatus400Schema,
	savedQueryUpdateStatus403Schema,
	savedQueryUpdateStatus404Schema,
	savedQueryUpdateStatus409Schema,
	savedQueryUpdateStatus500Schema,
]);

export const savedQueryUpdateBodySchema = publicSavedQueryRequestSchema.optional();

export const udfUploadSessionCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfUploadSessionCreateStatus201Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [201] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfUploadSessionSchema,
});

export const udfUploadSessionCreateStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfUploadSessionCreateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfUploadSessionCreateResponseSchema = udfUploadSessionCreateStatus201Schema;

export const udfUploadSessionCreateErrorSchema = z.union([
	udfUploadSessionCreateStatus400Schema,
	udfUploadSessionCreateStatus500Schema,
]);

export const udfListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfListQueryCursorSchema = z
	.string()
	.optional()
	.describe("Cursor returned as `nextCursor` on the previous page.");

export const udfListQueryLimitSchema = z
	.int()
	.max(100)
	.gt(0)
	.optional()
	.default(100)
	.describe("Maximum number of records to return per page. Defaults to 100. Maximum is 100.");

export const udfListStatus200Schema = z.strictObject({
	result: z.array(udfSchema).describe("Latest version of each UDF in the organization."),
	limit: z.int().describe("Maximum number of results returned in this page."),
	totalCount: z
		.union([z.int(), z.null()])
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.union([z.string(), z.null()])
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfListStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfListStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfListResponseSchema = udfListStatus200Schema;

export const udfListErrorSchema = z.union([udfListStatus400Schema, udfListStatus500Schema]);

export const udfCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfCreateStatus201Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [201] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfSchema,
});

export const udfCreateStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfCreateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfCreateStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfCreateStatus410Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [410] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfCreateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfCreateResponseSchema = udfCreateStatus201Schema;

export const udfCreateErrorSchema = z.union([
	udfCreateStatus400Schema,
	udfCreateStatus403Schema,
	udfCreateStatus409Schema,
	udfCreateStatus410Schema,
	udfCreateStatus500Schema,
]);

export const udfCreateBodySchema = udfCreateRequestSchema.optional();

export const udfDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfDeletePathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfDeleteStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDeleteStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDeleteStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDeleteStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDeleteStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfDeleteResponseSchema = udfDeleteStatus200Schema;

export const udfDeleteErrorSchema = z.union([
	udfDeleteStatus400Schema,
	udfDeleteStatus404Schema,
	udfDeleteStatus409Schema,
	udfDeleteStatus500Schema,
]);

export const udfGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfGetPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfGetStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfSchema,
});

export const udfGetStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfGetStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfGetStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfGetResponseSchema = udfGetStatus200Schema;

export const udfGetErrorSchema = z.union([
	udfGetStatus400Schema,
	udfGetStatus404Schema,
	udfGetStatus500Schema,
]);

export const udfAttachmentListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfAttachmentListPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfAttachmentListQueryCursorSchema = z
	.string()
	.optional()
	.describe("Cursor returned as `nextCursor` on the previous page.");

export const udfAttachmentListQueryLimitSchema = z
	.int()
	.max(100)
	.gt(0)
	.optional()
	.default(100)
	.describe("Maximum number of records to return per page. Defaults to 100. Maximum is 100.");

export const udfAttachmentListStatus200Schema = z.strictObject({
	result: z
		.array(udfAttachmentSchema)
		.describe("Current service attachments for the UDF in this page."),
	limit: z.int().describe("Maximum number of results returned in this page."),
	totalCount: z
		.union([z.int(), z.null()])
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.union([z.string(), z.null()])
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachmentListStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachmentListStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachmentListStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfAttachmentListResponseSchema = udfAttachmentListStatus200Schema;

export const udfAttachmentListErrorSchema = z.union([
	udfAttachmentListStatus400Schema,
	udfAttachmentListStatus404Schema,
	udfAttachmentListStatus500Schema,
]);

export const udfDetachPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfDetachPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfDetachPathServiceIdSchema = z.uuid().describe("ID of the requested service.");

export const udfDetachStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDetachStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDetachStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDetachStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfDetachStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfDetachResponseSchema = udfDetachStatus200Schema;

export const udfDetachErrorSchema = z.union([
	udfDetachStatus400Schema,
	udfDetachStatus404Schema,
	udfDetachStatus409Schema,
	udfDetachStatus500Schema,
]);

export const udfAttachmentGetPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfAttachmentGetPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfAttachmentGetPathServiceIdSchema = z
	.uuid()
	.describe("ID of the requested service.");

export const udfAttachmentGetStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfAttachmentSchema,
});

export const udfAttachmentGetStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachmentGetStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachmentGetStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfAttachmentGetResponseSchema = udfAttachmentGetStatus200Schema;

export const udfAttachmentGetErrorSchema = z.union([
	udfAttachmentGetStatus400Schema,
	udfAttachmentGetStatus404Schema,
	udfAttachmentGetStatus500Schema,
]);

export const udfAttachPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfAttachPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfAttachPathServiceIdSchema = z.uuid().describe("ID of the requested service.");

export const udfAttachStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfAttachmentSchema,
});

export const udfAttachStatus400Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachStatus422Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [422] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachStatus424Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	code: z
		.enum(["SERVICE_IDLE", "SERVICE_NOT_RUNNING", "SERVICE_STOPPED"])
		.describe("Reason the attachment could not be started."),
	serviceState: z
		.enum([
			"starting",
			"stopping",
			"terminating",
			"softdeleting",
			"awaking",
			"partially_running",
			"provisioning",
			"running",
			"stopped",
			"terminated",
			"softdeleted",
			"degraded",
			"failed",
			"idle",
		])
		.describe("Current state of the service."),
	canWake: z.boolean().describe("Whether the service can be woken before retrying the attachment."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [424] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfAttachStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfAttachResponseSchema = udfAttachStatus200Schema;

export const udfAttachErrorSchema = z.union([
	udfAttachStatus400Schema,
	udfAttachStatus404Schema,
	udfAttachStatus409Schema,
	udfAttachStatus422Schema,
	udfAttachStatus424Schema,
	udfAttachStatus500Schema,
]);

export const udfAttachBodySchema = z
	.object({
		version: z
			.int()
			.gt(0)
			.optional()
			.describe("Version to attach. When omitted, the latest ready version is attached.")
			.meta({ examples: [1] }),
	})
	.optional();

export const udfVersionListPathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfVersionListPathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfVersionListQueryCursorSchema = z
	.string()
	.optional()
	.describe("Cursor returned as `nextCursor` on the previous page.");

export const udfVersionListQueryLimitSchema = z
	.int()
	.max(100)
	.gt(0)
	.optional()
	.default(100)
	.describe("Maximum number of records to return per page. Defaults to 100. Maximum is 100.");

export const udfVersionListStatus200Schema = z.strictObject({
	result: z.array(udfSchema).describe("Versions of the UDF in this page."),
	limit: z.int().describe("Maximum number of results returned in this page."),
	totalCount: z
		.union([z.int(), z.null()])
		.describe(
			"Total number of results across all pages. It has only informative value, thus is not guaranteed and it is provided on a best-effort basis. Null if the total count is unknown.",
		),
	nextCursor: z
		.union([z.string(), z.null()])
		.describe(
			"Cursor for the next page, to be sent as the `cursor` query parameter. Null on the last page.",
		),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionListStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionListStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionListStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfVersionListResponseSchema = udfVersionListStatus200Schema;

export const udfVersionListErrorSchema = z.union([
	udfVersionListStatus400Schema,
	udfVersionListStatus404Schema,
	udfVersionListStatus500Schema,
]);

export const udfVersionCreatePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfVersionCreatePathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfVersionCreateStatus201Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [201] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	result: udfSchema,
});

export const udfVersionCreateStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionCreateStatus403Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [403] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionCreateStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionCreateStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionCreateStatus410Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [410] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionCreateStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfVersionCreateResponseSchema = udfVersionCreateStatus201Schema;

export const udfVersionCreateErrorSchema = z.union([
	udfVersionCreateStatus400Schema,
	udfVersionCreateStatus403Schema,
	udfVersionCreateStatus404Schema,
	udfVersionCreateStatus409Schema,
	udfVersionCreateStatus410Schema,
	udfVersionCreateStatus500Schema,
]);

export const udfVersionCreateBodySchema = udfVersionCreateRequestSchema.optional();

export const udfVersionDeletePathOrganizationIdSchema = z
	.uuid()
	.describe("ID of the requested organization.");

export const udfVersionDeletePathFunctionNameSchema = z
	.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]*$/)
	.describe("Name of the UDF.");

export const udfVersionDeletePathVersionSchema = z
	.int()
	.gt(0)
	.describe("Version number of the UDF.")
	.meta({ examples: [1] });

export const udfVersionDeleteStatus200Schema = z.strictObject({
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [200] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionDeleteStatus400Schema = z.strictObject({
	error: z.string().describe("Error message."),
	issues: z
		.array(
			z.strictObject({
				path: z.array(z.union([z.string(), z.number()])).describe("Path to the invalid field."),
				code: z.string().describe("Validation issue code."),
				message: z.string().describe("Human-readable description of the issue."),
			}),
		)
		.optional()
		.describe("Validation issues that caused the request to be rejected."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [400] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionDeleteStatus404Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [404] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionDeleteStatus409Schema = z.strictObject({
	error: z.string().describe("Human-readable error message."),
	status: z
		.int()
		.describe("HTTP status code.")
		.meta({ examples: [409] }),
	requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
});

export const udfVersionDeleteStatus500Schema = z
	.object({
		error: z.string().describe("Error message."),
		status: z
			.int()
			.describe("HTTP status code.")
			.meta({ examples: [500] }),
		requestId: z.uuid().describe("Unique id assigned to every request. UUIDv4"),
	})
	.catchall(z.unknown());

export const udfVersionDeleteResponseSchema = udfVersionDeleteStatus200Schema;

export const udfVersionDeleteErrorSchema = z.union([
	udfVersionDeleteStatus400Schema,
	udfVersionDeleteStatus404Schema,
	udfVersionDeleteStatus409Schema,
	udfVersionDeleteStatus500Schema,
]);
