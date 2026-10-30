// @ts-nocheck

import * as z from "zod";

export const chatDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the chat."),
		object: z.enum(["chat"]).describe("Fixed value identifying this object as a chat."),
		shareable: z.boolean().describe("Indicates whether the chat can be shared via public link."),
		privacy: z
			.enum(["private", "public", "team", "team-edit", "unlisted"])
			.describe("Defines the visibility of the chat—private, team-only, or public."),
		name: z.string().optional().describe("An optional name assigned to the chat by the user."),
		title: z
			.string()
			.optional()
			.describe("Deprecated title field preserved for backward compatibility."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the chat was created."),
		updatedAt: z.string().optional().describe("The ISO timestamp of the last update to the chat."),
		favorite: z.boolean().describe("Indicates whether the chat is marked as a favorite."),
		authorId: z.string().describe("The ID of the user who created the chat."),
		projectId: z
			.string()
			.optional()
			.describe("Optional ID of the v0 project associated with this chat."),
		vercelProjectId: z
			.string()
			.optional()
			.describe("Optional ID of the linked Vercel project, if connected."),
		webUrl: z.string().describe("Web URL to view this chat in the browser."),
		apiUrl: z.string().describe("API URL to access this chat via the API."),
		latestVersion: z
			.strictObject({
				id: z.string().describe("A unique identifier for the version."),
				object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
				status: z
					.enum(["completed", "failed", "pending"])
					.describe("The current status of the version generation process."),
				demoUrl: z
					.string()
					.optional()
					.describe("Optional URL for previewing the generated output."),
				screenshotUrl: z
					.string()
					.optional()
					.describe("URL to retrieve a screenshot of this version."),
				createdAt: z.iso
					.datetime({ offset: true })
					.describe("The date and time when the version was created, in ISO 8601 format."),
				updatedAt: z.iso
					.datetime({ offset: true })
					.optional()
					.describe("The date and time when the version was last updated, in ISO 8601 format."),
				files: z
					.array(
						z.strictObject({
							object: z.enum(["file"]).describe("Fixed value identifying this object as a file."),
							name: z.string().describe("The name of the file, including its extension."),
							content: z.string().describe("The full contents of the file as a raw string."),
							locked: z
								.boolean()
								.describe(
									"Whether the file is locked to prevent AI from overwriting it during new version generation.",
								),
						}),
					)
					.describe("A list of files that were generated or included in this version."),
			})
			.optional()
			.describe("Full details of the most recent generated version, if available."),
		metadata: z
			.record(z.string(), z.string())
			.describe("Arbitrary key-value data associated with this chat."),
		url: z.string().describe("The canonical URL to access this chat."),
		messages: z
			.array(
				z.strictObject({
					id: z.string().describe("A unique identifier for the message."),
					object: z.enum(["message"]).describe("Fixed value identifying this object as a message."),
					content: z.string().describe("The main text content of the message."),
					experimental_content: z
						.array(
							z.union([
								z.tuple([z.literal(0), z.array(z.unknown())]),
								z.tuple([
									z.literal(1),
									z.strictObject({
										toJSONSchema: z.string(),
										def: z.string(),
										type: z.string(),
										check: z.string(),
										with: z.string(),
										clone: z.string(),
										brand: z.string(),
										register: z.string(),
										parse: z.string(),
										safeParse: z.string(),
										parseAsync: z.string(),
										safeParseAsync: z.string(),
										spa: z.string(),
										encode: z.string(),
										decode: z.string(),
										encodeAsync: z.string(),
										decodeAsync: z.string(),
										safeEncode: z.string(),
										safeDecode: z.string(),
										safeEncodeAsync: z.string(),
										safeDecodeAsync: z.string(),
										refine: z.string(),
										superRefine: z.string(),
										overwrite: z.string(),
										optional: z.string(),
										exactOptional: z.string(),
										nullable: z.string(),
										nullish: z.string(),
										nonoptional: z.string(),
										array: z.string(),
										or: z.string(),
										and: z.string(),
										transform: z.string(),
										default: z.string(),
										prefault: z.string(),
										catch: z.string(),
										pipe: z.string(),
										readonly: z.string(),
										describe: z.string(),
										meta: z.string(),
										isOptional: z.string(),
										isNullable: z.string(),
										apply: z.string(),
										keyof: z.string(),
										catchall: z.string(),
										passthrough: z.string(),
										loose: z.string(),
										strict: z.string(),
										strip: z.string(),
										extend: z.string(),
										safeExtend: z.string(),
										merge: z.string(),
										pick: z.string(),
										omit: z.string(),
										partial: z.string(),
										required: z.string(),
									}),
								]),
							]),
						)
						.optional()
						.describe(
							"The parsed content of the message as an array structure containing AST nodes. This is an experimental field that may change.",
						),
					createdAt: z
						.string()
						.describe("The ISO timestamp representing when the message was created."),
					updatedAt: z.iso
						.datetime({ offset: true })
						.optional()
						.describe("The ISO timestamp representing when the message was last updated."),
					type: z
						.enum([
							"added-environment-variables",
							"added-integration",
							"answered-questions",
							"auto-fix-with-v0",
							"cloned-repo",
							"deleted-file",
							"design-mode",
							"edited-file",
							"fix-cve",
							"fix-with-v0",
							"forked-block",
							"forked-chat",
							"manual-commit",
							"message",
							"moved-file",
							"open-in-v0",
							"pull-changes",
							"refinement",
							"renamed-file",
							"replace-src",
							"reverted-block",
							"sync-git",
						])
						.describe(
							"Indicates the format or category of the message, such as plain text or code.",
						),
					role: z
						.enum(["assistant", "user"])
						.describe("Specifies whether the message was sent by the user or the assistant."),
					finishReason: z
						.enum(["content-filter", "error", "length", "other", "stop", "tool-calls"])
						.optional()
						.describe("The reason why the message generation finished."),
					apiUrl: z.string().describe("API URL to access this message via the API."),
					authorId: z.string().nullable().describe("The ID of the user who sent the message."),
					parentId: z.string().nullish().describe("The ID of the parent message."),
					attachments: z
						.array(
							z.strictObject({
								url: z.string().describe("The URL where the attachment file can be accessed."),
								name: z.string().optional().describe("The original filename of the attachment."),
								contentType: z
									.string()
									.optional()
									.describe(
										"The MIME type of the attachment file (e.g., image/png, application/pdf).",
									),
								size: z.number().describe("The size of the attachment file in bytes."),
								content: z
									.string()
									.optional()
									.describe("The base64-encoded content of the attachment file, if available."),
								type: z
									.enum(["figma", "screenshot", "zip"])
									.optional()
									.describe("Optional v0-specific attachment type for enhanced processing."),
							}),
						)
						.optional(),
				}),
			)
			.describe("All messages exchanged in the chat, including user and assistant entries."),
		files: z
			.array(
				z.strictObject({
					lang: z
						.string()
						.describe("Programming language used in the file (e.g., JavaScript, Python)."),
					meta: z
						.record(z.string(), z.string())
						.describe("A key-value map of metadata associated with the file (e.g., path, type)."),
					source: z
						.string()
						.describe("The origin or identifier of the file source (e.g., path or upload label)."),
				}),
			)
			.optional()
			.describe("Optional array of files associated with the chat context."),
		demo: z
			.string()
			.optional()
			.describe("Deprecated demo URL used for previewing the chat result."),
		text: z.string().describe("The main user prompt or instruction that started the chat."),
		modelConfiguration: z
			.strictObject({
				modelId: z
					.string()
					.min(3)
					.max(200)
					.regex(/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._/-]*$/)
					.optional()
					.default("v0-pro")
					.describe(
						"Model to use for the generation. `v0-auto` is deprecated and falls back to `v0-pro`.",
					),
				imageGenerations: z
					.boolean()
					.optional()
					.default(false)
					.describe("Enables image generations to generate up to 5 images per version."),
				thinking: z
					.boolean()
					.optional()
					.default(false)
					.describe("Enables thinking to generate a response in multiple steps."),
				thinkingEffort: z
					.union([z.enum(["none", "minimal", "low", "medium", "high", "max", "xhigh"]), z.null()])
					.optional(),
				fast: z.boolean().optional(),
			})
			.optional()
			.describe("The configuration used to generate responses in this chat."),
		permissions: z.strictObject({
			write: z.boolean().describe("If true, the user has write access to the chat."),
		}),
	})
	.describe(
		"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
	);

export const chatSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the chat."),
		object: z.enum(["chat"]).describe("Fixed value identifying this object as a chat."),
		shareable: z.boolean().describe("Indicates whether the chat can be shared via public link."),
		privacy: z
			.enum(["private", "public", "team", "team-edit", "unlisted"])
			.describe("Defines the visibility of the chat—private, team-only, or public."),
		name: z.string().optional().describe("An optional name assigned to the chat by the user."),
		title: z
			.string()
			.optional()
			.describe("Deprecated title field preserved for backward compatibility."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the chat was created."),
		updatedAt: z.string().optional().describe("The ISO timestamp of the last update to the chat."),
		favorite: z.boolean().describe("Indicates whether the chat is marked as a favorite."),
		authorId: z.string().describe("The ID of the user who created the chat."),
		projectId: z
			.string()
			.optional()
			.describe("Optional ID of the v0 project associated with this chat."),
		vercelProjectId: z
			.string()
			.optional()
			.describe("Optional ID of the linked Vercel project, if connected."),
		webUrl: z.string().describe("Web URL to view this chat in the browser."),
		apiUrl: z.string().describe("API URL to access this chat via the API."),
		latestVersion: z
			.strictObject({
				id: z.string().describe("A unique identifier for the version."),
				object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
				status: z
					.enum(["completed", "failed", "pending"])
					.describe("The current status of the version generation process."),
				demoUrl: z
					.string()
					.optional()
					.describe("Optional URL for previewing the generated output."),
				screenshotUrl: z
					.string()
					.optional()
					.describe("URL to retrieve a screenshot of this version."),
				createdAt: z.iso
					.datetime({ offset: true })
					.describe("The date and time when the version was created, in ISO 8601 format."),
				updatedAt: z.iso
					.datetime({ offset: true })
					.optional()
					.describe("The date and time when the version was last updated, in ISO 8601 format."),
			})
			.optional()
			.describe("The most recent generated version of the chat, if available."),
		metadata: z
			.record(z.string(), z.string())
			.describe("Arbitrary key-value data associated with this chat."),
	})
	.describe(
		"Summary of a chat, including metadata like privacy, author, latest version, and URLs.",
	);

export const deploymentDetailSchema = z.strictObject({
	id: z.string().describe("A unique identifier for the deployment."),
	object: z.enum(["deployment"]).describe("Fixed value identifying this object as a deployment."),
	inspectorUrl: z.string().describe("URL to the deployment inspector."),
	chatId: z.string().describe("The ID of the chat that this deployment is scoped to."),
	projectId: z
		.string()
		.optional()
		.describe("The ID of the project that this deployment is scoped to."),
	versionId: z.string().describe("The ID of the version that this deployment is scoped to."),
	apiUrl: z.url().describe("The API endpoint URL for accessing this deployment programmatically."),
	webUrl: z.url().describe("The web URL where the deployment can be viewed or managed."),
});

export const deploymentSummarySchema = z.strictObject({
	id: z.string().describe("A unique identifier for the deployment."),
	object: z.enum(["deployment"]).describe("Fixed value identifying this object as a deployment."),
	inspectorUrl: z.string().describe("URL to the deployment inspector."),
	chatId: z.string().describe("The ID of the chat that this deployment is scoped to."),
	projectId: z
		.string()
		.optional()
		.describe("The ID of the project that this deployment is scoped to."),
	versionId: z.string().describe("The ID of the version that this deployment is scoped to."),
	apiUrl: z.url().describe("The API endpoint URL for accessing this deployment programmatically."),
	webUrl: z.url().describe("The web URL where the deployment can be viewed or managed."),
});

export const environmentVariableDetailSchemaSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the environment variable."),
		object: z.enum(["environment_variable"]).describe("The object type."),
		key: z.string().describe("The name of the environment variable."),
		value: z.string().describe("The value of the environment variable."),
		decrypted: z.boolean().describe("Whether the value is decrypted or encrypted."),
		createdAt: z.number().describe("The timestamp when the environment variable was created."),
		updatedAt: z
			.number()
			.optional()
			.describe("The timestamp when the environment variable was last updated."),
	})
	.describe("Detailed information for an environment variable including its value.");

export const environmentVariableSummarySchemaSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the environment variable."),
		object: z.enum(["environment_variable"]).describe("The object type."),
		key: z.string().describe("The name of the environment variable."),
		value: z.string().describe("The value of the environment variable."),
		decrypted: z.boolean().describe("Whether the value is decrypted or encrypted."),
		createdAt: z.number().describe("The timestamp when the environment variable was created."),
		updatedAt: z
			.number()
			.optional()
			.describe("The timestamp when the environment variable was last updated."),
	})
	.describe("Summary information for an environment variable.");

export const environmentVariablesListSchemaSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					id: z.string().describe("A unique identifier for the environment variable."),
					object: z.enum(["environment_variable"]).describe("The object type."),
					key: z.string().describe("The name of the environment variable."),
					value: z.string().describe("The value of the environment variable."),
					decrypted: z.boolean().describe("Whether the value is decrypted or encrypted."),
					createdAt: z
						.number()
						.describe("The timestamp when the environment variable was created."),
					updatedAt: z
						.number()
						.optional()
						.describe("The timestamp when the environment variable was last updated."),
				}),
			)
			.describe("Array of environment variable details."),
	})
	.describe("List response containing environment variables.");

export const fileDetailSchema = z
	.strictObject({
		object: z.enum(["file"]).describe("Fixed value identifying this object as a file."),
		name: z.string().describe("The name of the file, including its extension."),
		content: z.string().describe("The full contents of the file as a raw string."),
		locked: z
			.boolean()
			.describe(
				"Whether the file is locked to prevent AI from overwriting it during new version generation.",
			),
	})
	.describe("Detailed representation of a file, including its content and lock status.");

export const fileSummarySchema = z
	.strictObject({
		object: z.enum(["file"]).describe("Fixed value identifying this object as a file."),
		name: z.string().describe("The name of the file, including its extension."),
	})
	.describe("Basic metadata about a file, such as its type and name.");

export const hookDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the webhook."),
		object: z.enum(["hook"]).describe("Fixed value identifying this object as a webhook."),
		name: z.string().describe("A user-defined name to label the webhook."),
		events: z
			.array(
				z.enum([
					"chat.created",
					"chat.deleted",
					"chat.updated",
					"message.created",
					"message.deleted",
					"message.finished",
					"message.updated",
				]),
			)
			.describe("List of event types this webhook is subscribed to."),
		chatId: z
			.string()
			.optional()
			.describe("Optional ID of the chat that this webhook is scoped to."),
		url: z.string().describe("Target URL that receives event payloads for this webhook."),
	})
	.describe("Full configuration details for a webhook, including its scope and subscription.");

export const hookEventDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the webhook event log entry."),
		object: z
			.enum(["hook_event"])
			.describe("Fixed value identifying this object as a webhook event."),
		event: z
			.enum([
				"chat.created",
				"chat.deleted",
				"chat.updated",
				"message.created",
				"message.deleted",
				"message.finished",
				"message.updated",
			])
			.describe("The type of event that triggered the webhook."),
		status: z
			.enum(["error", "pending", "success"])
			.optional()
			.default("pending")
			.describe("The delivery status of the webhook (e.g., delivered, failed)."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("Timestamp of when the webhook event was triggered."),
	})
	.describe("Detailed record of a webhook event, including its type, status, and timestamp.");

export const hookSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the webhook."),
		object: z.enum(["hook"]).describe("Fixed value identifying this object as a webhook."),
		name: z.string().describe("A user-defined name to label the webhook."),
	})
	.describe("Summary of a webhook, including its ID and display name.");

export const integrationConnectionDetailSchemaSchema = z
	.strictObject({
		object: z.enum(["integration_connection"]).describe("The object type."),
		id: z
			.string()
			.describe(
				"The unique ID of the integration connection (format: {projectId}_{integrationId}).",
			),
		connected: z.boolean().describe("Whether the integration is connected to the project."),
		integration: z
			.strictObject({
				id: z.string().describe("The ID of the integration."),
				object: z.enum(["integration"]).describe("The object type."),
				slug: z.string().describe("The slug of the integration."),
				name: z.string().describe("The name of the integration."),
			})
			.describe("Information about the connected integration."),
		metadata: z
			.record(z.string(), z.unknown())
			.optional()
			.describe("Additional metadata about the integration connection."),
	})
	.describe("Detailed information about an integration connection to a project.");

export const integrationConnectionListSchemaSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					object: z.enum(["integration_connection"]).describe("The object type."),
					id: z
						.string()
						.describe(
							"The unique ID of the integration connection (format: {projectId}_{integrationId}).",
						),
					connected: z.boolean().describe("Whether the integration is connected to the project."),
					integration: z
						.strictObject({
							id: z.string().describe("The ID of the integration."),
							object: z.enum(["integration"]).describe("The object type."),
							slug: z.string().describe("The slug of the integration."),
							name: z.string().describe("The name of the integration."),
						})
						.describe("Information about the connected integration."),
				}),
			)
			.describe("Array of integration connection summaries."),
	})
	.describe("List response containing integration connections.");

export const integrationConnectionSummarySchemaSchema = z
	.strictObject({
		object: z.enum(["integration_connection"]).describe("The object type."),
		id: z
			.string()
			.describe(
				"The unique ID of the integration connection (format: {projectId}_{integrationId}).",
			),
		connected: z.boolean().describe("Whether the integration is connected to the project."),
		integration: z
			.strictObject({
				id: z.string().describe("The ID of the integration."),
				object: z.enum(["integration"]).describe("The object type."),
				slug: z.string().describe("The slug of the integration."),
				name: z.string().describe("The name of the integration."),
			})
			.describe("Information about the connected integration."),
	})
	.describe("Summary information about an integration connection to a project.");

export const integrationDetailSchemaSchema = z
	.strictObject({
		id: z.string().describe("The ID of the integration."),
		object: z.enum(["integration"]).describe("The object type."),
		slug: z.string().describe("The slug of the integration."),
		name: z.string().describe("The name of the integration."),
		description: z.string().describe("A short description of the integration."),
		iconUrl: z.string().describe("URL to the integration icon."),
	})
	.describe("Detailed information about an integration.");

export const integrationListSchemaSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					id: z.string().describe("The ID of the integration."),
					object: z.enum(["integration"]).describe("The object type."),
					slug: z.string().describe("The slug of the integration."),
					name: z.string().describe("The name of the integration."),
					description: z.string().describe("A short description of the integration."),
					iconUrl: z.string().describe("URL to the integration icon."),
				}),
			)
			.describe("Array of integration details."),
	})
	.describe("List of available integrations.");

export const integrationSummarySchemaSchema = z
	.strictObject({
		id: z.string().describe("The ID of the integration."),
		object: z.enum(["integration"]).describe("The object type."),
		slug: z.string().describe("The slug of the integration."),
		name: z.string().describe("The name of the integration."),
	})
	.describe("Basic information about an integration.");

export const messageDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the message."),
		object: z.enum(["message"]).describe("Fixed value identifying this object as a message."),
		content: z.string().describe("The main text content of the message."),
		experimental_content: z
			.array(
				z.union([
					z.tuple([z.literal(0), z.array(z.unknown())]),
					z.tuple([
						z.literal(1),
						z.strictObject({
							toJSONSchema: z.string(),
							def: z.string(),
							type: z.string(),
							check: z.string(),
							with: z.string(),
							clone: z.string(),
							brand: z.string(),
							register: z.string(),
							parse: z.string(),
							safeParse: z.string(),
							parseAsync: z.string(),
							safeParseAsync: z.string(),
							spa: z.string(),
							encode: z.string(),
							decode: z.string(),
							encodeAsync: z.string(),
							decodeAsync: z.string(),
							safeEncode: z.string(),
							safeDecode: z.string(),
							safeEncodeAsync: z.string(),
							safeDecodeAsync: z.string(),
							refine: z.string(),
							superRefine: z.string(),
							overwrite: z.string(),
							optional: z.string(),
							exactOptional: z.string(),
							nullable: z.string(),
							nullish: z.string(),
							nonoptional: z.string(),
							array: z.string(),
							or: z.string(),
							and: z.string(),
							transform: z.string(),
							default: z.string(),
							prefault: z.string(),
							catch: z.string(),
							pipe: z.string(),
							readonly: z.string(),
							describe: z.string(),
							meta: z.string(),
							isOptional: z.string(),
							isNullable: z.string(),
							apply: z.string(),
							keyof: z.string(),
							catchall: z.string(),
							passthrough: z.string(),
							loose: z.string(),
							strict: z.string(),
							strip: z.string(),
							extend: z.string(),
							safeExtend: z.string(),
							merge: z.string(),
							pick: z.string(),
							omit: z.string(),
							partial: z.string(),
							required: z.string(),
						}),
					]),
				]),
			)
			.optional()
			.describe(
				"The parsed content of the message as an array structure containing AST nodes. This is an experimental field that may change.",
			),
		createdAt: z.string().describe("The ISO timestamp representing when the message was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp representing when the message was last updated."),
		type: z
			.enum([
				"added-environment-variables",
				"added-integration",
				"answered-questions",
				"auto-fix-with-v0",
				"cloned-repo",
				"deleted-file",
				"design-mode",
				"edited-file",
				"fix-cve",
				"fix-with-v0",
				"forked-block",
				"forked-chat",
				"manual-commit",
				"message",
				"moved-file",
				"open-in-v0",
				"pull-changes",
				"refinement",
				"renamed-file",
				"replace-src",
				"reverted-block",
				"sync-git",
			])
			.describe("Indicates the format or category of the message, such as plain text or code."),
		role: z
			.enum(["assistant", "user"])
			.describe("Specifies whether the message was sent by the user or the assistant."),
		finishReason: z
			.enum(["content-filter", "error", "length", "other", "stop", "tool-calls"])
			.optional()
			.describe("The reason why the message generation finished."),
		apiUrl: z.string().describe("API URL to access this message via the API."),
		authorId: z.string().nullable().describe("The ID of the user who sent the message."),
		parentId: z.string().nullish().describe("The ID of the parent message."),
		attachments: z
			.array(
				z.strictObject({
					url: z.string().describe("The URL where the attachment file can be accessed."),
					name: z.string().optional().describe("The original filename of the attachment."),
					contentType: z
						.string()
						.optional()
						.describe("The MIME type of the attachment file (e.g., image/png, application/pdf)."),
					size: z.number().describe("The size of the attachment file in bytes."),
					content: z
						.string()
						.optional()
						.describe("The base64-encoded content of the attachment file, if available."),
					type: z
						.enum(["figma", "screenshot", "zip"])
						.optional()
						.describe("Optional v0-specific attachment type for enhanced processing."),
				}),
			)
			.optional(),
		chatId: z.string().describe("The ID of the chat to which this message belongs."),
	})
	.describe("Detailed message object extending MessageSummary with chat metadata.");

export const messageSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the message."),
		object: z.enum(["message"]).describe("Fixed value identifying this object as a message."),
		content: z.string().describe("The main text content of the message."),
		experimental_content: z
			.array(
				z.union([
					z.tuple([z.literal(0), z.array(z.unknown())]),
					z.tuple([
						z.literal(1),
						z.strictObject({
							toJSONSchema: z.string(),
							def: z.string(),
							type: z.string(),
							check: z.string(),
							with: z.string(),
							clone: z.string(),
							brand: z.string(),
							register: z.string(),
							parse: z.string(),
							safeParse: z.string(),
							parseAsync: z.string(),
							safeParseAsync: z.string(),
							spa: z.string(),
							encode: z.string(),
							decode: z.string(),
							encodeAsync: z.string(),
							decodeAsync: z.string(),
							safeEncode: z.string(),
							safeDecode: z.string(),
							safeEncodeAsync: z.string(),
							safeDecodeAsync: z.string(),
							refine: z.string(),
							superRefine: z.string(),
							overwrite: z.string(),
							optional: z.string(),
							exactOptional: z.string(),
							nullable: z.string(),
							nullish: z.string(),
							nonoptional: z.string(),
							array: z.string(),
							or: z.string(),
							and: z.string(),
							transform: z.string(),
							default: z.string(),
							prefault: z.string(),
							catch: z.string(),
							pipe: z.string(),
							readonly: z.string(),
							describe: z.string(),
							meta: z.string(),
							isOptional: z.string(),
							isNullable: z.string(),
							apply: z.string(),
							keyof: z.string(),
							catchall: z.string(),
							passthrough: z.string(),
							loose: z.string(),
							strict: z.string(),
							strip: z.string(),
							extend: z.string(),
							safeExtend: z.string(),
							merge: z.string(),
							pick: z.string(),
							omit: z.string(),
							partial: z.string(),
							required: z.string(),
						}),
					]),
				]),
			)
			.optional()
			.describe(
				"The parsed content of the message as an array structure containing AST nodes. This is an experimental field that may change.",
			),
		createdAt: z.string().describe("The ISO timestamp representing when the message was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp representing when the message was last updated."),
		type: z
			.enum([
				"added-environment-variables",
				"added-integration",
				"answered-questions",
				"auto-fix-with-v0",
				"cloned-repo",
				"deleted-file",
				"design-mode",
				"edited-file",
				"fix-cve",
				"fix-with-v0",
				"forked-block",
				"forked-chat",
				"manual-commit",
				"message",
				"moved-file",
				"open-in-v0",
				"pull-changes",
				"refinement",
				"renamed-file",
				"replace-src",
				"reverted-block",
				"sync-git",
			])
			.describe("Indicates the format or category of the message, such as plain text or code."),
		role: z
			.enum(["assistant", "user"])
			.describe("Specifies whether the message was sent by the user or the assistant."),
		finishReason: z
			.enum(["content-filter", "error", "length", "other", "stop", "tool-calls"])
			.optional()
			.describe("The reason why the message generation finished."),
		apiUrl: z.string().describe("API URL to access this message via the API."),
		authorId: z.string().nullable().describe("The ID of the user who sent the message."),
		parentId: z.string().nullish().describe("The ID of the parent message."),
		attachments: z
			.array(
				z.strictObject({
					url: z.string().describe("The URL where the attachment file can be accessed."),
					name: z.string().optional().describe("The original filename of the attachment."),
					contentType: z
						.string()
						.optional()
						.describe("The MIME type of the attachment file (e.g., image/png, application/pdf)."),
					size: z.number().describe("The size of the attachment file in bytes."),
					content: z
						.string()
						.optional()
						.describe("The base64-encoded content of the attachment file, if available."),
					type: z
						.enum(["figma", "screenshot", "zip"])
						.optional()
						.describe("Optional v0-specific attachment type for enhanced processing."),
				}),
			)
			.optional(),
	})
	.describe(
		"Summary of a single message within a chat, including role, content, type, timestamp, and API URL.",
	);

export const messageSummaryListSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					id: z.string().describe("A unique identifier for the message."),
					object: z.enum(["message"]).describe("Fixed value identifying this object as a message."),
					content: z.string().describe("The main text content of the message."),
					experimental_content: z
						.array(
							z.union([
								z.tuple([z.literal(0), z.array(z.unknown())]),
								z.tuple([
									z.literal(1),
									z.strictObject({
										toJSONSchema: z.string(),
										def: z.string(),
										type: z.string(),
										check: z.string(),
										with: z.string(),
										clone: z.string(),
										brand: z.string(),
										register: z.string(),
										parse: z.string(),
										safeParse: z.string(),
										parseAsync: z.string(),
										safeParseAsync: z.string(),
										spa: z.string(),
										encode: z.string(),
										decode: z.string(),
										encodeAsync: z.string(),
										decodeAsync: z.string(),
										safeEncode: z.string(),
										safeDecode: z.string(),
										safeEncodeAsync: z.string(),
										safeDecodeAsync: z.string(),
										refine: z.string(),
										superRefine: z.string(),
										overwrite: z.string(),
										optional: z.string(),
										exactOptional: z.string(),
										nullable: z.string(),
										nullish: z.string(),
										nonoptional: z.string(),
										array: z.string(),
										or: z.string(),
										and: z.string(),
										transform: z.string(),
										default: z.string(),
										prefault: z.string(),
										catch: z.string(),
										pipe: z.string(),
										readonly: z.string(),
										describe: z.string(),
										meta: z.string(),
										isOptional: z.string(),
										isNullable: z.string(),
										apply: z.string(),
										keyof: z.string(),
										catchall: z.string(),
										passthrough: z.string(),
										loose: z.string(),
										strict: z.string(),
										strip: z.string(),
										extend: z.string(),
										safeExtend: z.string(),
										merge: z.string(),
										pick: z.string(),
										omit: z.string(),
										partial: z.string(),
										required: z.string(),
									}),
								]),
							]),
						)
						.optional()
						.describe(
							"The parsed content of the message as an array structure containing AST nodes. This is an experimental field that may change.",
						),
					createdAt: z
						.string()
						.describe("The ISO timestamp representing when the message was created."),
					updatedAt: z.iso
						.datetime({ offset: true })
						.optional()
						.describe("The ISO timestamp representing when the message was last updated."),
					type: z
						.enum([
							"added-environment-variables",
							"added-integration",
							"answered-questions",
							"auto-fix-with-v0",
							"cloned-repo",
							"deleted-file",
							"design-mode",
							"edited-file",
							"fix-cve",
							"fix-with-v0",
							"forked-block",
							"forked-chat",
							"manual-commit",
							"message",
							"moved-file",
							"open-in-v0",
							"pull-changes",
							"refinement",
							"renamed-file",
							"replace-src",
							"reverted-block",
							"sync-git",
						])
						.describe(
							"Indicates the format or category of the message, such as plain text or code.",
						),
					role: z
						.enum(["assistant", "user"])
						.describe("Specifies whether the message was sent by the user or the assistant."),
					finishReason: z
						.enum(["content-filter", "error", "length", "other", "stop", "tool-calls"])
						.optional()
						.describe("The reason why the message generation finished."),
					apiUrl: z.string().describe("API URL to access this message via the API."),
					authorId: z.string().nullable().describe("The ID of the user who sent the message."),
					parentId: z.string().nullish().describe("The ID of the parent message."),
					attachments: z
						.array(
							z.strictObject({
								url: z.string().describe("The URL where the attachment file can be accessed."),
								name: z.string().optional().describe("The original filename of the attachment."),
								contentType: z
									.string()
									.optional()
									.describe(
										"The MIME type of the attachment file (e.g., image/png, application/pdf).",
									),
								size: z.number().describe("The size of the attachment file in bytes."),
								content: z
									.string()
									.optional()
									.describe("The base64-encoded content of the attachment file, if available."),
								type: z
									.enum(["figma", "screenshot", "zip"])
									.optional()
									.describe("Optional v0-specific attachment type for enhanced processing."),
							}),
						)
						.optional(),
				}),
			)
			.describe("Array of message summaries in this page of results."),
		pagination: z
			.strictObject({
				hasMore: z
					.boolean()
					.describe("Indicates if there are more results available beyond this page."),
				nextCursor: z.string().optional().describe("Cursor for fetching the next page of results."),
				nextUrl: z.string().optional().describe("API URL for retrieving the next page of results."),
			})
			.describe("Pagination metadata for navigating through multiple pages of results."),
	})
	.describe("List response containing multiple message summaries with cursor-based pagination.");

export const notificationPreferenceSchemaSchema = z
	.strictObject({
		liveActivity: z.boolean().describe("Whether the user wants to receive live activities."),
		pushNotifications: z
			.boolean()
			.describe("Whether the user wants to receive push notifications."),
	})
	.describe("User preference for notification delivery methods.");

export const productDetailSchemaSchema = z
	.strictObject({
		object: z.enum(["product"]).describe("The object type."),
		id: z.string().describe("The unique ID of the product."),
		slug: z.string().describe("The URL-friendly slug of the product."),
		name: z.string().describe("The name of the product."),
		description: z.string().describe("A short description of the product."),
		iconUrl: z.string().describe("URL to the product icon."),
		v0Availability: z
			.enum(["in-review", "published"])
			.optional()
			.describe(
				"The product's availability in v0. 'in-review' products only appear for teams with the review view and should be rendered as such.",
			),
		iconBackgroundColor: z.string().optional().describe("Background color for the product icon."),
	})
	.describe("Detailed information about a marketplace or store product.");

export const productListSchemaSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					object: z.enum(["product"]).describe("The object type."),
					id: z.string().describe("The unique ID of the product."),
					slug: z.string().describe("The URL-friendly slug of the product."),
					name: z.string().describe("The name of the product."),
					description: z.string().describe("A short description of the product."),
					iconUrl: z.string().describe("URL to the product icon."),
					v0Availability: z
						.enum(["in-review", "published"])
						.optional()
						.describe(
							"The product's availability in v0. 'in-review' products only appear for teams with the review view and should be rendered as such.",
						),
				}),
			)
			.describe("Array of product summaries."),
	})
	.describe("List of available marketplace and store products.");

export const productSummarySchemaSchema = z
	.strictObject({
		object: z.enum(["product"]).describe("The object type."),
		id: z.string().describe("The unique ID of the product."),
		slug: z.string().describe("The URL-friendly slug of the product."),
		name: z.string().describe("The name of the product."),
		description: z.string().describe("A short description of the product."),
		iconUrl: z.string().describe("URL to the product icon."),
		v0Availability: z
			.enum(["in-review", "published"])
			.optional()
			.describe(
				"The product's availability in v0. 'in-review' products only appear for teams with the review view and should be rendered as such.",
			),
	})
	.describe("Summary information about a marketplace or store product.");

export const projectDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the project."),
		object: z.enum(["project"]).describe("Fixed value identifying this object as a project."),
		name: z.string().describe("The name of the project as defined by the user."),
		privacy: z
			.enum(["private", "team"])
			.describe("The privacy setting for the project - either private or team."),
		vercelProjectId: z
			.string()
			.optional()
			.describe("Optional ID of the linked Vercel project, if connected."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the project was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp of the most recent update, if available."),
		apiUrl: z.url().describe("The API endpoint URL for accessing this project programmatically."),
		webUrl: z.url().describe("The web URL where the project can be viewed or managed."),
		description: z.string().optional().describe("The description of the project."),
		instructions: z.string().optional().describe("The instructions for the project."),
		chats: z
			.array(
				z.strictObject({
					id: z.string().describe("A unique identifier for the chat."),
					object: z.enum(["chat"]).describe("Fixed value identifying this object as a chat."),
					shareable: z
						.boolean()
						.describe("Indicates whether the chat can be shared via public link."),
					privacy: z
						.enum(["private", "public", "team", "team-edit", "unlisted"])
						.describe("Defines the visibility of the chat—private, team-only, or public."),
					name: z
						.string()
						.optional()
						.describe("An optional name assigned to the chat by the user."),
					title: z
						.string()
						.optional()
						.describe("Deprecated title field preserved for backward compatibility."),
					createdAt: z.iso
						.datetime({ offset: true })
						.describe("The ISO timestamp representing when the chat was created."),
					updatedAt: z
						.string()
						.optional()
						.describe("The ISO timestamp of the last update to the chat."),
					favorite: z.boolean().describe("Indicates whether the chat is marked as a favorite."),
					authorId: z.string().describe("The ID of the user who created the chat."),
					projectId: z
						.string()
						.optional()
						.describe("Optional ID of the v0 project associated with this chat."),
					vercelProjectId: z
						.string()
						.optional()
						.describe("Optional ID of the linked Vercel project, if connected."),
					webUrl: z.string().describe("Web URL to view this chat in the browser."),
					apiUrl: z.string().describe("API URL to access this chat via the API."),
					latestVersion: z
						.strictObject({
							id: z.string().describe("A unique identifier for the version."),
							object: z
								.enum(["version"])
								.describe("Fixed value identifying this object as a version."),
							status: z
								.enum(["completed", "failed", "pending"])
								.describe("The current status of the version generation process."),
							demoUrl: z
								.string()
								.optional()
								.describe("Optional URL for previewing the generated output."),
							screenshotUrl: z
								.string()
								.optional()
								.describe("URL to retrieve a screenshot of this version."),
							createdAt: z.iso
								.datetime({ offset: true })
								.describe("The date and time when the version was created, in ISO 8601 format."),
							updatedAt: z.iso
								.datetime({ offset: true })
								.optional()
								.describe(
									"The date and time when the version was last updated, in ISO 8601 format.",
								),
						})
						.optional()
						.describe("The most recent generated version of the chat, if available."),
					metadata: z
						.record(z.string(), z.string())
						.describe("Arbitrary key-value data associated with this chat."),
				}),
			)
			.describe("List of all chats that are associated with this project."),
	})
	.describe("Full representation of a project, including its associated chats.");

export const projectSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the project."),
		object: z.enum(["project"]).describe("Fixed value identifying this object as a project."),
		name: z.string().describe("The name of the project as defined by the user."),
		privacy: z
			.enum(["private", "team"])
			.describe("The privacy setting for the project - either private or team."),
		vercelProjectId: z
			.string()
			.optional()
			.describe("Optional ID of the linked Vercel project, if connected."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the project was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp of the most recent update, if available."),
		apiUrl: z.url().describe("The API endpoint URL for accessing this project programmatically."),
		webUrl: z.url().describe("The web URL where the project can be viewed or managed."),
	})
	.describe("Summary of a project, including metadata, timestamps, and optional Vercel linkage.");

export const scopeSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the scope (e.g., user or team workspace)."),
		object: z.enum(["scope"]).describe("Fixed value identifying this object as a scope."),
		name: z.string().optional().describe("An optional human-readable name for the scope."),
	})
	.describe("Basic information about a workspace or identity context for projects and chats.");

export const searchResultItemSchema = z
	.strictObject({
		id: z.string().describe("The unique ID of the item returned in the search result."),
		object: z
			.enum(["chat", "project"])
			.describe("Type of item returned, either 'chat' or 'project'."),
		name: z.string().describe("The display name of the item."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the item was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp of the last update to the item."),
		apiUrl: z.string().describe("API endpoint for accessing the item programmatically."),
		webUrl: z.string().describe("Web URL for viewing the item in the interface."),
	})
	.describe(
		"Generic result returned from a search query, representing either a chat or a project.",
	);

export const userDetailSchemaSchema = z.strictObject({
	id: z.string().describe("A unique identifier for the user."),
	object: z.enum(["user"]).describe("Fixed value identifying this object as a user."),
	name: z.string().optional().describe("Optional full name of the user."),
	email: z.string().describe("The user's email address."),
	avatar: z.string().describe("URL to the user's avatar image."),
	createdAt: z.iso
		.datetime({ offset: true })
		.describe("The ISO timestamp representing when the user was created."),
	updatedAt: z.iso
		.datetime({ offset: true })
		.optional()
		.describe("The ISO timestamp of the last update to the user."),
});

export const userPreferencesPostResponseSchemaSchema = z
	.strictObject({
		object: z.enum(["user_preferences"]).describe("Object type identifier."),
		preferences: z
			.union([
				z.strictObject({
					notifications: z
						.strictObject({
							liveActivity: z
								.boolean()
								.describe("Whether the user wants to receive live activities."),
							pushNotifications: z
								.boolean()
								.describe("Whether the user wants to receive push notifications."),
						})
						.describe("The user's preferred method for receiving notifications."),
				}),
				z.null(),
			])
			.describe("The updated preferences if successful, or null if failed."),
	})
	.describe("Response schema for updating user preferences.");

export const userPreferencesResponseSchemaSchema = z
	.strictObject({
		object: z.enum(["user_preferences"]).describe("Object type identifier."),
		preferences: z
			.union([
				z.strictObject({
					notifications: z
						.strictObject({
							liveActivity: z
								.boolean()
								.describe("Whether the user wants to receive live activities."),
							pushNotifications: z
								.boolean()
								.describe("Whether the user wants to receive push notifications."),
						})
						.describe("The user's preferred method for receiving notifications."),
				}),
				z.null(),
			])
			.describe("The user's current preferences, or null if errored."),
	})
	.describe("Response schema for retrieving user preferences.");

export const userPreferencesSchemaSchema = z
	.strictObject({
		notifications: z
			.strictObject({
				liveActivity: z.boolean().describe("Whether the user wants to receive live activities."),
				pushNotifications: z
					.boolean()
					.describe("Whether the user wants to receive push notifications."),
			})
			.describe("The user's preferred method for receiving notifications."),
	})
	.describe("User preferences configuration including notification settings.");

export const userSummarySchemaSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the user."),
		object: z.enum(["user"]).describe("Fixed value identifying this object as a user."),
		name: z.string().optional().describe("Optional full name of the user."),
		email: z.string().describe("The user's email address."),
		avatar: z.string().describe("URL to the user's avatar image."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp representing when the user was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp of the last update to the user."),
	})
	.describe("Details of the authenticated user, including profile and contact information.");

export const vercelProjectDetailSchema = z.strictObject({
	id: z.string().describe("A unique identifier for the linked Vercel project."),
	object: z
		.enum(["vercel_project"])
		.describe("Fixed value identifying this object as a Vercel project."),
	name: z.string().describe("The name of the Vercel project."),
});

export const vercelProjectSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the linked Vercel project."),
		object: z
			.enum(["vercel_project"])
			.describe("Fixed value identifying this object as a Vercel project."),
		name: z.string().describe("The name of the Vercel project."),
	})
	.describe("Basic metadata about a Vercel project connected to a v0 project.");

export const versionDetailSchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the version."),
		object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
		status: z
			.enum(["completed", "failed", "pending"])
			.describe("The current status of the version generation process."),
		demoUrl: z.string().optional().describe("Optional URL for previewing the generated output."),
		screenshotUrl: z.string().optional().describe("URL to retrieve a screenshot of this version."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The date and time when the version was created, in ISO 8601 format."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The date and time when the version was last updated, in ISO 8601 format."),
		files: z
			.array(
				z.strictObject({
					object: z.enum(["file"]).describe("Fixed value identifying this object as a file."),
					name: z.string().describe("The name of the file, including its extension."),
					content: z.string().describe("The full contents of the file as a raw string."),
					locked: z
						.boolean()
						.describe(
							"Whether the file is locked to prevent AI from overwriting it during new version generation.",
						),
				}),
			)
			.describe("A list of files that were generated or included in this version."),
	})
	.describe("Detailed version data including file contents.");

export const versionSummarySchema = z
	.strictObject({
		id: z.string().describe("A unique identifier for the version."),
		object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
		status: z
			.enum(["completed", "failed", "pending"])
			.describe("The current status of the version generation process."),
		demoUrl: z.string().optional().describe("Optional URL for previewing the generated output."),
		screenshotUrl: z.string().optional().describe("URL to retrieve a screenshot of this version."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The date and time when the version was created, in ISO 8601 format."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The date and time when the version was last updated, in ISO 8601 format."),
	})
	.describe(
		"Summary of a generated version of a chat, including its status and optional demo link.",
	);

export const versionSummaryListSchema = z
	.strictObject({
		object: z.enum(["list"]).describe("Fixed value identifying this as a list response."),
		data: z
			.array(
				z.strictObject({
					id: z.string().describe("A unique identifier for the version."),
					object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
					status: z
						.enum(["completed", "failed", "pending"])
						.describe("The current status of the version generation process."),
					demoUrl: z
						.string()
						.optional()
						.describe("Optional URL for previewing the generated output."),
					screenshotUrl: z
						.string()
						.optional()
						.describe("URL to retrieve a screenshot of this version."),
					createdAt: z.iso
						.datetime({ offset: true })
						.describe("The date and time when the version was created, in ISO 8601 format."),
					updatedAt: z.iso
						.datetime({ offset: true })
						.optional()
						.describe("The date and time when the version was last updated, in ISO 8601 format."),
				}),
			)
			.describe("Array of version summaries in this page of results."),
		pagination: z
			.strictObject({
				hasMore: z
					.boolean()
					.describe("Indicates if there are more results available beyond this page."),
				nextCursor: z.string().optional().describe("Cursor for fetching the next page of results."),
				nextUrl: z.string().optional().describe("API URL for retrieving the next page of results."),
			})
			.describe("Pagination metadata for navigating through multiple pages of results."),
	})
	.describe("List response containing multiple version summaries with cursor-based pagination.");

export const unauthorizedErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["unauthorized_error"]),
	}),
});

export const forbiddenErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["forbidden_error"]),
	}),
});

export const notFoundErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["not_found_error"]),
	}),
});

export const conflictErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["conflict_error"]),
	}),
});

export const payloadTooLargeErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["payload_too_large_error"]),
	}),
});

export const unprocessableEntityErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["unprocessable_entity_error"]),
	}),
});

export const tooManyRequestsErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["too_many_requests_error"]),
	}),
});

export const internalServerErrorSchema = z.strictObject({
	error: z.strictObject({
		message: z.string(),
		type: z.enum(["internal_server_error"]),
	}),
});

export const chatsCreateStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsCreateStatus401Schema = unauthorizedErrorSchema;

export const chatsCreateStatus403Schema = forbiddenErrorSchema;

export const chatsCreateStatus404Schema = notFoundErrorSchema;

export const chatsCreateStatus409Schema = conflictErrorSchema;

export const chatsCreateStatus413Schema = payloadTooLargeErrorSchema;

export const chatsCreateStatus422Schema = unprocessableEntityErrorSchema;

export const chatsCreateStatus429Schema = tooManyRequestsErrorSchema;

export const chatsCreateStatus500Schema = internalServerErrorSchema;

export const chatsCreateResponseSchema = chatsCreateStatus200Schema;

export const chatsCreateErrorSchema = z.union([
	chatsCreateStatus401Schema,
	chatsCreateStatus403Schema,
	chatsCreateStatus404Schema,
	chatsCreateStatus409Schema,
	chatsCreateStatus413Schema,
	chatsCreateStatus422Schema,
	chatsCreateStatus429Schema,
	chatsCreateStatus500Schema,
]);

export const chatsCreateBodySchema = z.strictObject({
	message: z
		.string()
		.describe(
			"Creates a new chat using a user message, optional system context, and model configuration. Useful for prompting the model within the scope of a specific project.",
		),
	attachments: z
		.array(
			z.strictObject({
				url: z
					.string()
					.describe("The URL or data URI of the file or asset to include with the message."),
			}),
		)
		.optional()
		.describe(
			"A list of files or assets to be included in the conversation context. Useful when the chat or task requires referencing documents, images, or other resources.",
		),
	system: z
		.string()
		.optional()
		.describe(
			"Provides system-level context or background for the chat. This is typically used to specify frameworks, tools, or development environments relevant to the task.",
		),
	chatPrivacy: z
		.enum(["private", "public", "team", "team-edit", "unlisted"])
		.optional()
		.default("private")
		.describe(
			"Determines the privacy setting of the chat. This can control whether the chat is visible only to the user, to team members, or is public.",
		),
	projectId: z
		.string()
		.optional()
		.describe(
			"Associates the chat with a specific project in your workspace. Helps organize and group related chats under a common project context.",
		),
	modelConfiguration: z
		.strictObject({
			modelId: z
				.string()
				.min(3)
				.max(200)
				.regex(/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._/-]*$/)
				.optional()
				.default("v0-pro")
				.describe(
					"Model to use for the generation. Use a v0 model ID, or an [AI Gateway](https://vercel.com/ai-gateway/models) model ID in `creator/model` format. Gateway models must support tool calling and Zero Data Retention, and are subject to team model policy; unsupported IDs are rejected. `v0-auto` is deprecated and falls back to `v0-pro`.",
				),
			imageGenerations: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables image generations to generate up to 5 images per version."),
			thinking: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables thinking to generate a response in multiple steps."),
			thinkingEffort: z
				.union([z.enum(["none", "minimal", "low", "medium", "high", "max", "xhigh"]), z.null()])
				.optional(),
			fast: z.boolean().optional(),
		})
		.optional()
		.describe("Settings that control how the model behaves in the chat."),
	responseMode: z
		.enum(["async", "experimental_stream", "sync"])
		.optional()
		.default("sync")
		.describe(
			'Controls how the response is delivered.\n\n- `"sync"`: The response is returned immediately with the HTTP request.\n- `"async"`: Returns a message placeholder immediately; use getById to poll for completion status and final output.\n- `"experimental_stream"`: Returns content parts as Server-Sent Events for real-time streaming.',
		),
	designSystemId: z
		.string()
		.nullish()
		.describe(
			"The ID of a design system to apply to this chat. Design systems provide consistent styling and components for generated UI.",
		),
	mcpServerIds: z
		.array(z.string())
		.optional()
		.describe(
			"Array of MCP server IDs to enable for this chat. When provided, only the specified servers will be used. When omitted, falls back to the user's enabled MCP servers.",
		),
	attachedSkillIds: z
		.array(z.string())
		.optional()
		.describe(
			"Array of skill IDs (from skills.sh) to attach to this chat. Backwards-compatible alias for `skills` entries of type `remote`. Maximum 3 skills per chat.",
		),
	skills: z
		.array(
			z.discriminatedUnion("type", [
				z.strictObject({
					type: z.enum(["remote"]).describe("Discriminator: a skills.sh skill."),
					id: z.string().describe("Skill ID from skills.sh."),
				}),
				z.strictObject({
					type: z.enum(["memory"]).describe("Discriminator: a user- or team-scoped memory skill."),
					scope: z
						.enum(["user", "team"])
						.describe("Whether the skill lives in user or team memory."),
					skillName: z.string().describe("Name of the memory skill to attach."),
				}),
				z.strictObject({
					type: z.enum(["project"]).describe("Discriminator: a skill defined in the project repo."),
					skillName: z.string().describe("Name of the project skill to attach."),
				}),
			]),
		)
		.optional()
		.describe(
			"Skills to force-attach to this chat. Supports skills.sh (`remote`), user/team memory (`memory`), and project (`project`) skills. Merged with `attachedSkillIds`. Maximum 3 skills per chat.",
		),
	metadata: z
		.record(z.string().min(1).max(40), z.string().max(500))
		.optional()
		.default({})
		.describe(
			"Arbitrary key-value data to attach to the chat. Useful for storing additional data about the chat, such as external user IDs.",
		),
});

export const chatsFindQueryLimitSchema = z
	.number()
	.max(60)
	.optional()
	.default(60)
	.describe(
		"Specifies the maximum number of chat records to return in a single response. Useful for paginating results when there are many chats.",
	);

export const chatsFindQueryOffsetSchema = z
	.number()
	.optional()
	.default(0)
	.describe(
		"Determines the starting point for pagination. Used in conjunction with limit to retrieve a specific page of chat results.",
	);

export const chatsFindQueryIsFavoriteSchema = z
	.enum(["true", "false"])
	.optional()
	.describe(
		'Filters chats by their "favorite" status. Accepts `"true"` or `"false"` (as strings, not booleans).\n\n- `"true"`: returns only chats marked as favorites.\n- `"false"`: returns only non-favorite chats.',
	);

export const chatsFindQueryVercelProjectIdSchema = z
	.string()
	.optional()
	.describe(
		"Filters chats by the linked Vercel project ID. Only returns chats associated with the specified Vercel project.",
	);

export const chatsFindQueryBranchSchema = z
	.string()
	.optional()
	.describe(
		"Filters chats by the Git branch name. Only returns chats that have an active Git connection with the specified branch as the head.",
	);

export const chatsFindQueryMetadataSchema = z
	.record(z.string().min(1).max(40), z.string().max(500))
	.optional()
	.describe("Filters chats by metadata. Returns chats matching every supplied key-value pair.");

export const chatsFindStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(
		z.strictObject({
			id: z.string().describe("A unique identifier for the chat."),
			object: z.enum(["chat"]).describe("Fixed value identifying this object as a chat."),
			shareable: z.boolean().describe("Indicates whether the chat can be shared via public link."),
			privacy: z
				.enum(["private", "public", "team", "team-edit", "unlisted"])
				.describe("Defines the visibility of the chat—private, team-only, or public."),
			name: z.string().optional().describe("An optional name assigned to the chat by the user."),
			title: z
				.string()
				.optional()
				.describe("Deprecated title field preserved for backward compatibility."),
			createdAt: z.iso
				.datetime({ offset: true })
				.describe("The ISO timestamp representing when the chat was created."),
			updatedAt: z
				.string()
				.optional()
				.describe("The ISO timestamp of the last update to the chat."),
			favorite: z.boolean().describe("Indicates whether the chat is marked as a favorite."),
			authorId: z.string().describe("The ID of the user who created the chat."),
			projectId: z
				.string()
				.optional()
				.describe("Optional ID of the v0 project associated with this chat."),
			vercelProjectId: z
				.string()
				.optional()
				.describe("Optional ID of the linked Vercel project, if connected."),
			webUrl: z.string().describe("Web URL to view this chat in the browser."),
			apiUrl: z.string().describe("API URL to access this chat via the API."),
			latestVersion: z
				.strictObject({
					id: z.string().describe("A unique identifier for the version."),
					object: z.enum(["version"]).describe("Fixed value identifying this object as a version."),
					status: z
						.enum(["completed", "failed", "pending"])
						.describe("The current status of the version generation process."),
					demoUrl: z
						.string()
						.optional()
						.describe("Optional URL for previewing the generated output."),
					screenshotUrl: z
						.string()
						.optional()
						.describe("URL to retrieve a screenshot of this version."),
					createdAt: z.iso
						.datetime({ offset: true })
						.describe("The date and time when the version was created, in ISO 8601 format."),
					updatedAt: z.iso
						.datetime({ offset: true })
						.optional()
						.describe("The date and time when the version was last updated, in ISO 8601 format."),
					darkScreenshotUrl: z
						.string()
						.optional()
						.describe("URL to retrieve a dark mode screenshot of this version."),
				})
				.optional()
				.describe("The most recent generated version of the chat, if available."),
			metadata: z
				.record(z.string(), z.string())
				.describe("Arbitrary key-value data associated with this chat."),
		}),
	),
});

export const chatsFindStatus401Schema = unauthorizedErrorSchema;

export const chatsFindStatus403Schema = forbiddenErrorSchema;

export const chatsFindStatus404Schema = notFoundErrorSchema;

export const chatsFindStatus409Schema = conflictErrorSchema;

export const chatsFindStatus413Schema = payloadTooLargeErrorSchema;

export const chatsFindStatus422Schema = unprocessableEntityErrorSchema;

export const chatsFindStatus429Schema = tooManyRequestsErrorSchema;

export const chatsFindStatus500Schema = internalServerErrorSchema;

export const chatsFindResponseSchema = chatsFindStatus200Schema;

export const chatsFindErrorSchema = z.union([
	chatsFindStatus401Schema,
	chatsFindStatus403Schema,
	chatsFindStatus404Schema,
	chatsFindStatus409Schema,
	chatsFindStatus413Schema,
	chatsFindStatus422Schema,
	chatsFindStatus429Schema,
	chatsFindStatus500Schema,
]);

export const chatsFindQuerySchema = z.object({
	limit: z
		.number()
		.max(60)
		.optional()
		.default(60)
		.describe(
			"Specifies the maximum number of chat records to return in a single response. Useful for paginating results when there are many chats.",
		),
	offset: z
		.number()
		.optional()
		.default(0)
		.describe(
			"Determines the starting point for pagination. Used in conjunction with limit to retrieve a specific page of chat results.",
		),
	isFavorite: z
		.enum(["true", "false"])
		.optional()
		.describe(
			'Filters chats by their "favorite" status. Accepts `"true"` or `"false"` (as strings, not booleans).\n\n- `"true"`: returns only chats marked as favorites.\n- `"false"`: returns only non-favorite chats.',
		),
	vercelProjectId: z
		.string()
		.optional()
		.describe(
			"Filters chats by the linked Vercel project ID. Only returns chats associated with the specified Vercel project.",
		),
	branch: z
		.string()
		.optional()
		.describe(
			"Filters chats by the Git branch name. Only returns chats that have an active Git connection with the specified branch as the head.",
		),
	metadata: z
		.record(z.string().min(1).max(40), z.string().max(500))
		.optional()
		.describe("Filters chats by metadata. Returns chats matching every supplied key-value pair."),
});

export const chatsInitStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsInitStatus401Schema = unauthorizedErrorSchema;

export const chatsInitStatus403Schema = forbiddenErrorSchema;

export const chatsInitStatus404Schema = notFoundErrorSchema;

export const chatsInitStatus409Schema = conflictErrorSchema;

export const chatsInitStatus413Schema = payloadTooLargeErrorSchema;

export const chatsInitStatus422Schema = unprocessableEntityErrorSchema;

export const chatsInitStatus429Schema = tooManyRequestsErrorSchema;

export const chatsInitStatus500Schema = internalServerErrorSchema;

export const chatsInitResponseSchema = chatsInitStatus200Schema;

export const chatsInitErrorSchema = z.union([
	chatsInitStatus401Schema,
	chatsInitStatus403Schema,
	chatsInitStatus404Schema,
	chatsInitStatus409Schema,
	chatsInitStatus413Schema,
	chatsInitStatus422Schema,
	chatsInitStatus429Schema,
	chatsInitStatus500Schema,
]);

export const chatsInitBodySchema = z
	.strictObject({
		name: z
			.string()
			.optional()
			.describe(
				"A user-defined name for the chat. Helps identify or describe the purpose of the chat session in the UI or API responses.",
			),
		chatPrivacy: z
			.enum(["public", "private", "team-edit", "team", "unlisted"])
			.optional()
			.default("private")
			.describe(
				"Controls the visibility of the chat. Defines whether the chat is private, shared with a team, or publicly accessible.",
			),
		projectId: z
			.string()
			.optional()
			.describe(
				"Associates the chat with a specific project. Useful for organizing and grouping chats in a workspace.",
			),
		metadata: z
			.record(z.string().min(1).max(40), z.string().max(500))
			.optional()
			.default({})
			.describe(
				"Arbitrary key-value data to attach to the chat. Useful for storing additional data about the chat, such as external user IDs.",
			),
	})
	.and(
		z.discriminatedUnion("type", [
			z.strictObject({
				type: z
					.enum(["files"])
					.describe(
						"Specifies the initialization method. For this endpoint, it defines the source of content being used to initialize the chat.",
					),
				files: z
					.array(
						z.union([
							z.strictObject({
								name: z.string(),
								url: z.string(),
								locked: z
									.boolean()
									.optional()
									.describe(
										"Whether to lock this file to prevent AI from overwriting it during generation",
									),
							}),
							z.strictObject({
								name: z.string(),
								content: z.string(),
								locked: z
									.boolean()
									.optional()
									.describe(
										"Whether to lock this file to prevent AI from overwriting it during generation",
									),
							}),
						]),
					)
					.describe(
						"An array of inline file objects used to initialize the chat. Each object must contain a file `name` and its `content`.",
					),
			}),
			z.strictObject({
				type: z
					.enum(["repo"])
					.describe(
						"Specifies the initialization method. For this endpoint, it defines the source of content being used to initialize the chat.",
					),
				repo: z
					.strictObject({
						url: z.string(),
						branch: z.string().max(250).optional(),
					})
					.describe(
						"Specifies a repository source for initialization. Supports both public and private GitHub repositories. For private repositories, ensure your GitHub account is connected through Vercel.",
					),
				lockAllFiles: z
					.boolean()
					.optional()
					.describe(
						"Whether to lock all files in the repository to prevent AI from overwriting them during generation",
					),
			}),
			z.strictObject({
				type: z
					.enum(["registry"])
					.describe(
						"Specifies the initialization method. For this endpoint, it defines the source of content being used to initialize the chat.",
					),
				registry: z
					.strictObject({
						url: z.string(),
					})
					.describe(
						"Allows initialization from a predefined component or code registry. Includes the registry source and identifier for the desired component/module.",
					),
				lockAllFiles: z
					.boolean()
					.optional()
					.describe(
						"Whether to lock all files from the registry to prevent AI from overwriting them during generation",
					),
			}),
			z.strictObject({
				type: z
					.enum(["zip"])
					.describe(
						"Specifies the initialization method. For this endpoint, it defines the source of content being used to initialize the chat.",
					),
				zip: z
					.strictObject({
						url: z.url(),
					})
					.describe(
						"Provides a zipped bundle of files as the input source. Typically includes a base64-encoded archive or a remote URL reference.",
					),
				lockAllFiles: z
					.boolean()
					.optional()
					.describe(
						"Whether to lock all files from the zip archive to prevent AI from overwriting them during generation",
					),
			}),
			z.strictObject({
				type: z
					.enum(["template"])
					.describe(
						"Specifies the initialization method. For this endpoint, it defines the source of content being used to initialize the chat.",
					),
				templateId: z
					.string()
					.describe(
						"The ID of the template to initialize the chat from. This should be a valid template ID from the v0 template system.",
					),
			}),
		]),
	);

export const chatsDeletePathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat to delete. This must be passed as a path parameter in the URL.",
	);

export const chatsDeleteStatus200Schema = z.strictObject({
	id: z.string(),
	object: z.enum(["chat"]),
	deleted: z.literal(true),
});

export const chatsDeleteStatus401Schema = unauthorizedErrorSchema;

export const chatsDeleteStatus403Schema = forbiddenErrorSchema;

export const chatsDeleteStatus404Schema = notFoundErrorSchema;

export const chatsDeleteStatus409Schema = conflictErrorSchema;

export const chatsDeleteStatus413Schema = payloadTooLargeErrorSchema;

export const chatsDeleteStatus422Schema = unprocessableEntityErrorSchema;

export const chatsDeleteStatus429Schema = tooManyRequestsErrorSchema;

export const chatsDeleteStatus500Schema = internalServerErrorSchema;

export const chatsDeleteResponseSchema = chatsDeleteStatus200Schema;

export const chatsDeleteErrorSchema = z.union([
	chatsDeleteStatus401Schema,
	chatsDeleteStatus403Schema,
	chatsDeleteStatus404Schema,
	chatsDeleteStatus409Schema,
	chatsDeleteStatus413Schema,
	chatsDeleteStatus422Schema,
	chatsDeleteStatus429Schema,
	chatsDeleteStatus500Schema,
]);

export const chatsDeletePathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat to delete. This must be passed as a path parameter in the URL.",
		),
});

export const chatsGetByIdPathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat to retrieve. Must be provided as a path parameter.");

export const chatsGetByIdStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsGetByIdStatus401Schema = unauthorizedErrorSchema;

export const chatsGetByIdStatus403Schema = forbiddenErrorSchema;

export const chatsGetByIdStatus404Schema = notFoundErrorSchema;

export const chatsGetByIdStatus409Schema = conflictErrorSchema;

export const chatsGetByIdStatus413Schema = payloadTooLargeErrorSchema;

export const chatsGetByIdStatus422Schema = unprocessableEntityErrorSchema;

export const chatsGetByIdStatus429Schema = tooManyRequestsErrorSchema;

export const chatsGetByIdStatus500Schema = internalServerErrorSchema;

export const chatsGetByIdResponseSchema = chatsGetByIdStatus200Schema;

export const chatsGetByIdErrorSchema = z.union([
	chatsGetByIdStatus401Schema,
	chatsGetByIdStatus403Schema,
	chatsGetByIdStatus404Schema,
	chatsGetByIdStatus409Schema,
	chatsGetByIdStatus413Schema,
	chatsGetByIdStatus422Schema,
	chatsGetByIdStatus429Schema,
	chatsGetByIdStatus500Schema,
]);

export const chatsGetByIdPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat to retrieve. Must be provided as a path parameter.",
		),
});

export const chatsUpdatePathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat to update. Provided as a path parameter.");

export const chatsUpdateStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsUpdateStatus401Schema = unauthorizedErrorSchema;

export const chatsUpdateStatus403Schema = forbiddenErrorSchema;

export const chatsUpdateStatus404Schema = notFoundErrorSchema;

export const chatsUpdateStatus409Schema = conflictErrorSchema;

export const chatsUpdateStatus413Schema = payloadTooLargeErrorSchema;

export const chatsUpdateStatus422Schema = unprocessableEntityErrorSchema;

export const chatsUpdateStatus429Schema = tooManyRequestsErrorSchema;

export const chatsUpdateStatus500Schema = internalServerErrorSchema;

export const chatsUpdateResponseSchema = chatsUpdateStatus200Schema;

export const chatsUpdateErrorSchema = z.union([
	chatsUpdateStatus401Schema,
	chatsUpdateStatus403Schema,
	chatsUpdateStatus404Schema,
	chatsUpdateStatus409Schema,
	chatsUpdateStatus413Schema,
	chatsUpdateStatus422Schema,
	chatsUpdateStatus429Schema,
	chatsUpdateStatus500Schema,
]);

export const chatsUpdateBodySchema = z.strictObject({
	name: z
		.string()
		.optional()
		.describe("A new name to assign to the chat. Helps with identification and organization."),
	privacy: z
		.enum(["private", "public", "team", "team-edit", "unlisted"])
		.optional()
		.describe("Sets the privacy level of the chat."),
	metadata: z
		.union([
			z.record(z.string().min(1).max(40), z.union([z.string().max(500), z.null()])),
			z.null(),
		])
		.optional()
		.describe(
			"Arbitrary key-value data to attach to the chat. Useful for storing additional data about the chat, such as external user IDs. Metadata added will be merged with existing attributes. Pass `null` as the value to delete a specific key, or pass `null` instead of an object to delete all existing metadata.",
		),
});

export const chatsUpdatePathSchema = z.object({
	chatId: z
		.string()
		.describe("The unique identifier of the chat to update. Provided as a path parameter."),
});

export const chatsFavoritePathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat to update. Provided as a path parameter.");

export const chatsFavoriteStatus200Schema = z.strictObject({
	id: z.string(),
	object: z.enum(["chat"]),
	favorited: z.boolean(),
});

export const chatsFavoriteStatus401Schema = unauthorizedErrorSchema;

export const chatsFavoriteStatus403Schema = forbiddenErrorSchema;

export const chatsFavoriteStatus404Schema = notFoundErrorSchema;

export const chatsFavoriteStatus409Schema = conflictErrorSchema;

export const chatsFavoriteStatus413Schema = payloadTooLargeErrorSchema;

export const chatsFavoriteStatus422Schema = unprocessableEntityErrorSchema;

export const chatsFavoriteStatus429Schema = tooManyRequestsErrorSchema;

export const chatsFavoriteStatus500Schema = internalServerErrorSchema;

export const chatsFavoriteResponseSchema = chatsFavoriteStatus200Schema;

export const chatsFavoriteErrorSchema = z.union([
	chatsFavoriteStatus401Schema,
	chatsFavoriteStatus403Schema,
	chatsFavoriteStatus404Schema,
	chatsFavoriteStatus409Schema,
	chatsFavoriteStatus413Schema,
	chatsFavoriteStatus422Schema,
	chatsFavoriteStatus429Schema,
	chatsFavoriteStatus500Schema,
]);

export const chatsFavoriteBodySchema = z.strictObject({
	isFavorite: z
		.boolean()
		.describe(
			'Specifies whether the chat should be marked as a favorite.\n\n- `"true"`: mark as favorite\n- `"false"`: remove from favorites',
		),
});

export const chatsFavoritePathSchema = z.object({
	chatId: z
		.string()
		.describe("The unique identifier of the chat to update. Provided as a path parameter."),
});

export const chatsForkPathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat to fork. Provided as a path parameter.");

export const chatsForkStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsForkStatus401Schema = unauthorizedErrorSchema;

export const chatsForkStatus403Schema = forbiddenErrorSchema;

export const chatsForkStatus404Schema = notFoundErrorSchema;

export const chatsForkStatus409Schema = conflictErrorSchema;

export const chatsForkStatus413Schema = payloadTooLargeErrorSchema;

export const chatsForkStatus422Schema = unprocessableEntityErrorSchema;

export const chatsForkStatus429Schema = tooManyRequestsErrorSchema;

export const chatsForkStatus500Schema = internalServerErrorSchema;

export const chatsForkResponseSchema = chatsForkStatus200Schema;

export const chatsForkErrorSchema = z.union([
	chatsForkStatus401Schema,
	chatsForkStatus403Schema,
	chatsForkStatus404Schema,
	chatsForkStatus409Schema,
	chatsForkStatus413Schema,
	chatsForkStatus422Schema,
	chatsForkStatus429Schema,
	chatsForkStatus500Schema,
]);

export const chatsForkBodySchema = z.strictObject({
	versionId: z
		.string()
		.max(32)
		.optional()
		.describe(
			"The identifier of the specific chat version to fork from. If omitted, the latest version will be used.",
		),
	privacy: z
		.enum(["private", "public", "team", "team-edit", "unlisted"])
		.optional()
		.default("private")
		.describe(
			"Determines the privacy setting of the forked chat. This can control whether the chat is visible only to the user, to team members, or is public.",
		),
});

export const chatsForkPathSchema = z.object({
	chatId: z
		.string()
		.describe("The unique identifier of the chat to fork. Provided as a path parameter."),
});

export const projectsGetByChatIdPathChatIdSchema = z
	.string()
	.describe("The ID of the chat to retrieve the associated project for.");

export const projectsGetByChatIdStatus200Schema = projectDetailSchema.describe(
	"Full representation of a project, including its associated chats.",
);

export const projectsGetByChatIdStatus401Schema = unauthorizedErrorSchema;

export const projectsGetByChatIdStatus403Schema = forbiddenErrorSchema;

export const projectsGetByChatIdStatus404Schema = notFoundErrorSchema;

export const projectsGetByChatIdStatus409Schema = conflictErrorSchema;

export const projectsGetByChatIdStatus413Schema = payloadTooLargeErrorSchema;

export const projectsGetByChatIdStatus422Schema = unprocessableEntityErrorSchema;

export const projectsGetByChatIdStatus429Schema = tooManyRequestsErrorSchema;

export const projectsGetByChatIdStatus500Schema = internalServerErrorSchema;

export const projectsGetByChatIdResponseSchema = projectsGetByChatIdStatus200Schema;

export const projectsGetByChatIdErrorSchema = z.union([
	projectsGetByChatIdStatus401Schema,
	projectsGetByChatIdStatus403Schema,
	projectsGetByChatIdStatus404Schema,
	projectsGetByChatIdStatus409Schema,
	projectsGetByChatIdStatus413Schema,
	projectsGetByChatIdStatus422Schema,
	projectsGetByChatIdStatus429Schema,
	projectsGetByChatIdStatus500Schema,
]);

export const projectsGetByChatIdPathSchema = z.object({
	chatId: z.string().describe("The ID of the chat to retrieve the associated project for."),
});

export const chatsFindMessagesPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat to retrieve messages for. Provided as a path parameter.",
	);

export const chatsFindMessagesQueryLimitSchema = z
	.number()
	.min(1)
	.max(150)
	.optional()
	.default(20)
	.describe(
		"Specifies the maximum number of message records to return in a single response. Useful for paginating results when there are many messages.",
	);

export const chatsFindMessagesQueryCursorSchema = z
	.string()
	.optional()
	.describe("Base64 encoded cursor containing pagination data");

export const chatsFindMessagesStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(messageSummarySchema),
	pagination: z.strictObject({
		hasMore: z.boolean(),
		nextCursor: z.string().optional(),
		nextUrl: z.string().optional(),
	}),
});

export const chatsFindMessagesStatus401Schema = unauthorizedErrorSchema;

export const chatsFindMessagesStatus403Schema = forbiddenErrorSchema;

export const chatsFindMessagesStatus404Schema = notFoundErrorSchema;

export const chatsFindMessagesStatus409Schema = conflictErrorSchema;

export const chatsFindMessagesStatus413Schema = payloadTooLargeErrorSchema;

export const chatsFindMessagesStatus422Schema = unprocessableEntityErrorSchema;

export const chatsFindMessagesStatus429Schema = tooManyRequestsErrorSchema;

export const chatsFindMessagesStatus500Schema = internalServerErrorSchema;

export const chatsFindMessagesResponseSchema = chatsFindMessagesStatus200Schema;

export const chatsFindMessagesErrorSchema = z.union([
	chatsFindMessagesStatus401Schema,
	chatsFindMessagesStatus403Schema,
	chatsFindMessagesStatus404Schema,
	chatsFindMessagesStatus409Schema,
	chatsFindMessagesStatus413Schema,
	chatsFindMessagesStatus422Schema,
	chatsFindMessagesStatus429Schema,
	chatsFindMessagesStatus500Schema,
]);

export const chatsFindMessagesPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat to retrieve messages for. Provided as a path parameter.",
		),
});

export const chatsFindMessagesQuerySchema = z.object({
	limit: z
		.number()
		.min(1)
		.max(150)
		.optional()
		.default(20)
		.describe(
			"Specifies the maximum number of message records to return in a single response. Useful for paginating results when there are many messages.",
		),
	cursor: z.string().optional().describe("Base64 encoded cursor containing pagination data"),
});

export const chatsSendMessagePathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat to send the message to. Provided as a path parameter.",
	);

export const chatsSendMessageStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsSendMessageStatus401Schema = unauthorizedErrorSchema;

export const chatsSendMessageStatus403Schema = forbiddenErrorSchema;

export const chatsSendMessageStatus404Schema = notFoundErrorSchema;

export const chatsSendMessageStatus409Schema = conflictErrorSchema;

export const chatsSendMessageStatus413Schema = payloadTooLargeErrorSchema;

export const chatsSendMessageStatus422Schema = unprocessableEntityErrorSchema;

export const chatsSendMessageStatus429Schema = tooManyRequestsErrorSchema;

export const chatsSendMessageStatus500Schema = internalServerErrorSchema;

export const chatsSendMessageResponseSchema = chatsSendMessageStatus200Schema;

export const chatsSendMessageErrorSchema = z.union([
	chatsSendMessageStatus401Schema,
	chatsSendMessageStatus403Schema,
	chatsSendMessageStatus404Schema,
	chatsSendMessageStatus409Schema,
	chatsSendMessageStatus413Schema,
	chatsSendMessageStatus422Schema,
	chatsSendMessageStatus429Schema,
	chatsSendMessageStatus500Schema,
]);

export const chatsSendMessageBodySchema = z.strictObject({
	message: z
		.string()
		.describe("The prompt or instruction to send to the model as part of the chat."),
	attachments: z
		.array(
			z.strictObject({
				url: z
					.string()
					.describe("The URL or data URI of the file or asset to include with the message."),
			}),
		)
		.optional()
		.default([])
		.describe("A list of files or assets to include with the message."),
	system: z
		.string()
		.optional()
		.describe(
			"Provides system-level context or background for the chat. This is typically used to specify frameworks, tools, or development environments relevant to the task.",
		),
	modelConfiguration: z
		.strictObject({
			modelId: z
				.string()
				.min(3)
				.max(200)
				.regex(/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._/-]*$/)
				.optional()
				.default("v0-pro")
				.describe(
					"Model to use for the generation. Use a v0 model ID, or an [AI Gateway](https://vercel.com/ai-gateway/models) model ID in `creator/model` format. Gateway models must support tool calling and Zero Data Retention, and are subject to team model policy; unsupported IDs are rejected. `v0-auto` is deprecated and falls back to `v0-pro`.",
				),
			imageGenerations: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables image generations to generate up to 5 images per version."),
			thinking: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables thinking to generate a response in multiple steps."),
			thinkingEffort: z
				.union([z.enum(["none", "minimal", "low", "medium", "high", "max", "xhigh"]), z.null()])
				.optional(),
			fast: z.boolean().optional(),
		})
		.optional()
		.describe("Overrides for the model behavior."),
	responseMode: z
		.enum(["async", "experimental_stream", "sync"])
		.optional()
		.default("sync")
		.describe(
			'Controls how the response is delivered.\n\n- `"sync"`: The response is returned immediately with the HTTP request.\n- `"async"`: Returns a message placeholder immediately; use getById to poll for completion status and final output.\n- `"experimental_stream"`: Returns content parts as Server-Sent Events for real-time streaming.',
		),
	mcpServerIds: z
		.array(z.string())
		.optional()
		.describe(
			"Array of MCP server IDs to enable for this message. When provided, only the specified servers will be used. When omitted, falls back to the user's enabled MCP servers.",
		),
	attachedSkillIds: z
		.array(z.string())
		.optional()
		.describe(
			"Array of skill IDs (from skills.sh) to attach to this message. Backwards-compatible alias for `skills` entries of type `remote`. Maximum 3 skills per chat.",
		),
	skills: z
		.array(
			z.discriminatedUnion("type", [
				z.strictObject({
					type: z.enum(["remote"]).describe("Discriminator: a skills.sh skill."),
					id: z.string().describe("Skill ID from skills.sh."),
				}),
				z.strictObject({
					type: z.enum(["memory"]).describe("Discriminator: a user- or team-scoped memory skill."),
					scope: z
						.enum(["user", "team"])
						.describe("Whether the skill lives in user or team memory."),
					skillName: z.string().describe("Name of the memory skill to attach."),
				}),
				z.strictObject({
					type: z.enum(["project"]).describe("Discriminator: a skill defined in the project repo."),
					skillName: z.string().describe("Name of the project skill to attach."),
				}),
			]),
		)
		.optional()
		.describe(
			"Skills to force-attach to this message. Supports skills.sh (`remote`), user/team memory (`memory`), and project (`project`) skills. Merged with `attachedSkillIds`. Maximum 3 skills per chat.",
		),
	action: z
		.strictObject({
			type: z.enum(["fix-with-v0"]),
		})
		.optional()
		.describe(
			"An optional action to perform. Use `fix-with-v0` to trigger automatic error fixing — the message should contain the error logs or context to fix.",
		),
});

export const chatsSendMessagePathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat to send the message to. Provided as a path parameter.",
		),
});

export const chatsGetMessagePathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the message. Provided as a path parameter.",
	);

export const chatsGetMessagePathMessageIdSchema = z
	.string()
	.describe("The unique identifier of the message to retrieve. Provided as a path parameter.");

export const chatsGetMessageStatus200Schema = messageDetailSchema.describe(
	"Detailed message object extending MessageSummary with chat metadata.",
);

export const chatsGetMessageStatus401Schema = unauthorizedErrorSchema;

export const chatsGetMessageStatus403Schema = forbiddenErrorSchema;

export const chatsGetMessageStatus404Schema = notFoundErrorSchema;

export const chatsGetMessageStatus409Schema = conflictErrorSchema;

export const chatsGetMessageStatus413Schema = payloadTooLargeErrorSchema;

export const chatsGetMessageStatus422Schema = unprocessableEntityErrorSchema;

export const chatsGetMessageStatus429Schema = tooManyRequestsErrorSchema;

export const chatsGetMessageStatus500Schema = internalServerErrorSchema;

export const chatsGetMessageResponseSchema = chatsGetMessageStatus200Schema;

export const chatsGetMessageErrorSchema = z.union([
	chatsGetMessageStatus401Schema,
	chatsGetMessageStatus403Schema,
	chatsGetMessageStatus404Schema,
	chatsGetMessageStatus409Schema,
	chatsGetMessageStatus413Schema,
	chatsGetMessageStatus422Schema,
	chatsGetMessageStatus429Schema,
	chatsGetMessageStatus500Schema,
]);

export const chatsGetMessagePathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the message. Provided as a path parameter.",
		),
	messageId: z
		.string()
		.describe("The unique identifier of the message to retrieve. Provided as a path parameter."),
});

export const chatsFindVersionsPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat to retrieve versions for. Provided as a path parameter.",
	);

export const chatsFindVersionsQueryLimitSchema = z
	.number()
	.min(1)
	.max(150)
	.optional()
	.default(20)
	.describe(
		"Specifies the maximum number of version records to return in a single response. Useful for paginating results when there are many versions.",
	);

export const chatsFindVersionsQueryCursorSchema = z
	.string()
	.optional()
	.describe("Base64 encoded cursor containing pagination data");

export const chatsFindVersionsStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(versionSummarySchema),
	pagination: z.strictObject({
		hasMore: z.boolean(),
		nextCursor: z.string().optional(),
		nextUrl: z.string().optional(),
	}),
	meta: z.strictObject({
		totalCount: z.number(),
	}),
});

export const chatsFindVersionsStatus401Schema = unauthorizedErrorSchema;

export const chatsFindVersionsStatus403Schema = forbiddenErrorSchema;

export const chatsFindVersionsStatus404Schema = notFoundErrorSchema;

export const chatsFindVersionsStatus409Schema = conflictErrorSchema;

export const chatsFindVersionsStatus413Schema = payloadTooLargeErrorSchema;

export const chatsFindVersionsStatus422Schema = unprocessableEntityErrorSchema;

export const chatsFindVersionsStatus429Schema = tooManyRequestsErrorSchema;

export const chatsFindVersionsStatus500Schema = internalServerErrorSchema;

export const chatsFindVersionsResponseSchema = chatsFindVersionsStatus200Schema;

export const chatsFindVersionsErrorSchema = z.union([
	chatsFindVersionsStatus401Schema,
	chatsFindVersionsStatus403Schema,
	chatsFindVersionsStatus404Schema,
	chatsFindVersionsStatus409Schema,
	chatsFindVersionsStatus413Schema,
	chatsFindVersionsStatus422Schema,
	chatsFindVersionsStatus429Schema,
	chatsFindVersionsStatus500Schema,
]);

export const chatsFindVersionsPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat to retrieve versions for. Provided as a path parameter.",
		),
});

export const chatsFindVersionsQuerySchema = z.object({
	limit: z
		.number()
		.min(1)
		.max(150)
		.optional()
		.default(20)
		.describe(
			"Specifies the maximum number of version records to return in a single response. Useful for paginating results when there are many versions.",
		),
	cursor: z.string().optional().describe("Base64 encoded cursor containing pagination data"),
});

export const chatsGetVersionPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the version. Provided as a path parameter.",
	);

export const chatsGetVersionPathVersionIdSchema = z
	.string()
	.describe("The unique identifier of the version to retrieve. Provided as a path parameter.");

export const chatsGetVersionQueryIncludeDefaultFilesSchema = z
	.enum(["true", "false"])
	.optional()
	.describe(
		"When true, includes all default files (package.json, configuration files, etc.) that would be part of a ZIP download. When false or omitted, returns only the generated source files.",
	);

export const chatsGetVersionStatus200Schema = versionDetailSchema.describe(
	"Detailed version data including file contents.",
);

export const chatsGetVersionStatus401Schema = unauthorizedErrorSchema;

export const chatsGetVersionStatus403Schema = forbiddenErrorSchema;

export const chatsGetVersionStatus404Schema = notFoundErrorSchema;

export const chatsGetVersionStatus409Schema = conflictErrorSchema;

export const chatsGetVersionStatus413Schema = payloadTooLargeErrorSchema;

export const chatsGetVersionStatus422Schema = unprocessableEntityErrorSchema;

export const chatsGetVersionStatus429Schema = tooManyRequestsErrorSchema;

export const chatsGetVersionStatus500Schema = internalServerErrorSchema;

export const chatsGetVersionResponseSchema = chatsGetVersionStatus200Schema;

export const chatsGetVersionErrorSchema = z.union([
	chatsGetVersionStatus401Schema,
	chatsGetVersionStatus403Schema,
	chatsGetVersionStatus404Schema,
	chatsGetVersionStatus409Schema,
	chatsGetVersionStatus413Schema,
	chatsGetVersionStatus422Schema,
	chatsGetVersionStatus429Schema,
	chatsGetVersionStatus500Schema,
]);

export const chatsGetVersionPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the version. Provided as a path parameter.",
		),
	versionId: z
		.string()
		.describe("The unique identifier of the version to retrieve. Provided as a path parameter."),
});

export const chatsGetVersionQuerySchema = z.object({
	includeDefaultFiles: z
		.enum(["true", "false"])
		.optional()
		.describe(
			"When true, includes all default files (package.json, configuration files, etc.) that would be part of a ZIP download. When false or omitted, returns only the generated source files.",
		),
});

export const chatsUpdateVersionPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the version to update. Provided as a path parameter.",
	);

export const chatsUpdateVersionPathVersionIdSchema = z
	.string()
	.describe(
		"The unique identifier of the version (block) to update. Provided as a path parameter.",
	);

export const chatsUpdateVersionStatus200Schema = versionDetailSchema.describe(
	"Detailed version data including file contents.",
);

export const chatsUpdateVersionStatus401Schema = unauthorizedErrorSchema;

export const chatsUpdateVersionStatus403Schema = forbiddenErrorSchema;

export const chatsUpdateVersionStatus404Schema = notFoundErrorSchema;

export const chatsUpdateVersionStatus409Schema = conflictErrorSchema;

export const chatsUpdateVersionStatus413Schema = payloadTooLargeErrorSchema;

export const chatsUpdateVersionStatus422Schema = unprocessableEntityErrorSchema;

export const chatsUpdateVersionStatus429Schema = tooManyRequestsErrorSchema;

export const chatsUpdateVersionStatus500Schema = internalServerErrorSchema;

export const chatsUpdateVersionResponseSchema = chatsUpdateVersionStatus200Schema;

export const chatsUpdateVersionErrorSchema = z.union([
	chatsUpdateVersionStatus401Schema,
	chatsUpdateVersionStatus403Schema,
	chatsUpdateVersionStatus404Schema,
	chatsUpdateVersionStatus409Schema,
	chatsUpdateVersionStatus413Schema,
	chatsUpdateVersionStatus422Schema,
	chatsUpdateVersionStatus429Schema,
	chatsUpdateVersionStatus500Schema,
]);

export const chatsUpdateVersionBodySchema = z.strictObject({
	files: z
		.array(
			z.strictObject({
				name: z
					.string()
					.describe('The full file path including extension (e.g., "components/test.tsx")'),
				content: z.string().describe("The new content for the file"),
				locked: z
					.boolean()
					.optional()
					.describe(
						"Whether to lock or unlock the file to prevent AI from overwriting it during generation",
					),
			}),
		)
		.describe("Array of files to update with their new content"),
});

export const chatsUpdateVersionPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the version to update. Provided as a path parameter.",
		),
	versionId: z
		.string()
		.describe(
			"The unique identifier of the version (block) to update. Provided as a path parameter.",
		),
});

export const chatsDownloadVersionPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the version. Provided as a path parameter.",
	);

export const chatsDownloadVersionPathVersionIdSchema = z
	.string()
	.describe("The unique identifier of the version to download. Provided as a path parameter.");

export const chatsDownloadVersionQueryFormatSchema = z
	.enum(["zip", "tarball"])
	.optional()
	.default("zip")
	.describe(
		'The archive format for the download. Choose "zip" for broad compatibility or "tarball" for Unix/Linux systems.',
	);

export const chatsDownloadVersionQueryIncludeDefaultFilesSchema = z
	.enum(["true", "false"])
	.optional()
	.describe(
		"When true, includes all default files (package.json, configuration files, etc.) that would be part of a complete deployment. When false or omitted, returns only the generated source files.",
	);

export const chatsDownloadVersionStatus200Schema = z
	.instanceof(File)
	.describe("ZIP archive containing the version files");

export const chatsDownloadVersionStatus401Schema = unauthorizedErrorSchema;

export const chatsDownloadVersionStatus403Schema = forbiddenErrorSchema;

export const chatsDownloadVersionStatus404Schema = notFoundErrorSchema;

export const chatsDownloadVersionStatus409Schema = conflictErrorSchema;

export const chatsDownloadVersionStatus413Schema = payloadTooLargeErrorSchema;

export const chatsDownloadVersionStatus422Schema = unprocessableEntityErrorSchema;

export const chatsDownloadVersionStatus429Schema = tooManyRequestsErrorSchema;

export const chatsDownloadVersionStatus500Schema = internalServerErrorSchema;

export const chatsDownloadVersionResponseSchema = chatsDownloadVersionStatus200Schema;

export const chatsDownloadVersionErrorSchema = z.union([
	chatsDownloadVersionStatus401Schema,
	chatsDownloadVersionStatus403Schema,
	chatsDownloadVersionStatus404Schema,
	chatsDownloadVersionStatus409Schema,
	chatsDownloadVersionStatus413Schema,
	chatsDownloadVersionStatus422Schema,
	chatsDownloadVersionStatus429Schema,
	chatsDownloadVersionStatus500Schema,
]);

export const chatsDownloadVersionPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the version. Provided as a path parameter.",
		),
	versionId: z
		.string()
		.describe("The unique identifier of the version to download. Provided as a path parameter."),
});

export const chatsDownloadVersionQuerySchema = z.object({
	format: z
		.enum(["zip", "tarball"])
		.optional()
		.default("zip")
		.describe(
			'The archive format for the download. Choose "zip" for broad compatibility or "tarball" for Unix/Linux systems.',
		),
	includeDefaultFiles: z
		.enum(["true", "false"])
		.optional()
		.describe(
			"When true, includes all default files (package.json, configuration files, etc.) that would be part of a complete deployment. When false or omitted, returns only the generated source files.",
		),
});

export const chatsDeleteVersionFilesPathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat containing the version to delete files from.");

export const chatsDeleteVersionFilesPathVersionIdSchema = z
	.string()
	.describe("The unique identifier of the version (block) to delete files from.");

export const chatsDeleteVersionFilesStatus200Schema = versionDetailSchema.describe(
	"Detailed version data including file contents.",
);

export const chatsDeleteVersionFilesStatus401Schema = unauthorizedErrorSchema;

export const chatsDeleteVersionFilesStatus403Schema = forbiddenErrorSchema;

export const chatsDeleteVersionFilesStatus404Schema = notFoundErrorSchema;

export const chatsDeleteVersionFilesStatus409Schema = conflictErrorSchema;

export const chatsDeleteVersionFilesStatus413Schema = payloadTooLargeErrorSchema;

export const chatsDeleteVersionFilesStatus422Schema = unprocessableEntityErrorSchema;

export const chatsDeleteVersionFilesStatus429Schema = tooManyRequestsErrorSchema;

export const chatsDeleteVersionFilesStatus500Schema = internalServerErrorSchema;

export const chatsDeleteVersionFilesResponseSchema = chatsDeleteVersionFilesStatus200Schema;

export const chatsDeleteVersionFilesErrorSchema = z.union([
	chatsDeleteVersionFilesStatus401Schema,
	chatsDeleteVersionFilesStatus403Schema,
	chatsDeleteVersionFilesStatus404Schema,
	chatsDeleteVersionFilesStatus409Schema,
	chatsDeleteVersionFilesStatus413Schema,
	chatsDeleteVersionFilesStatus422Schema,
	chatsDeleteVersionFilesStatus429Schema,
	chatsDeleteVersionFilesStatus500Schema,
]);

export const chatsDeleteVersionFilesBodySchema = z.strictObject({
	filePaths: z
		.array(z.string())
		.describe('Array of file paths to delete (e.g., ["components/test.tsx", "lib/utils.ts"])'),
});

export const chatsDeleteVersionFilesPathSchema = z.object({
	chatId: z
		.string()
		.describe("The unique identifier of the chat containing the version to delete files from."),
	versionId: z
		.string()
		.describe("The unique identifier of the version (block) to delete files from."),
});

export const chatsResumePathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the message to resume. Provided as a path parameter.",
	);

export const chatsResumePathMessageIdSchema = z
	.string()
	.describe("The identifier of the specific message to resume. Provided as a path parameter.");

export const chatsResumeStatus200Schema = z
	.string()
	.describe("A Server-Sent Events stream of chat and message delta events.");

export const chatsResumeStatus401Schema = unauthorizedErrorSchema;

export const chatsResumeStatus403Schema = forbiddenErrorSchema;

export const chatsResumeStatus404Schema = notFoundErrorSchema;

export const chatsResumeStatus409Schema = conflictErrorSchema;

export const chatsResumeStatus413Schema = payloadTooLargeErrorSchema;

export const chatsResumeStatus422Schema = unprocessableEntityErrorSchema;

export const chatsResumeStatus429Schema = tooManyRequestsErrorSchema;

export const chatsResumeStatus500Schema = internalServerErrorSchema;

export const chatsResumeResponseSchema = chatsResumeStatus200Schema;

export const chatsResumeErrorSchema = z.union([
	chatsResumeStatus401Schema,
	chatsResumeStatus403Schema,
	chatsResumeStatus404Schema,
	chatsResumeStatus409Schema,
	chatsResumeStatus413Schema,
	chatsResumeStatus422Schema,
	chatsResumeStatus429Schema,
	chatsResumeStatus500Schema,
]);

export const chatsResumePathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the message to resume. Provided as a path parameter.",
		),
	messageId: z
		.string()
		.describe("The identifier of the specific message to resume. Provided as a path parameter."),
});

export const chatsStopPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the message to stop. Provided as a path parameter.",
	);

export const chatsStopPathMessageIdSchema = z
	.string()
	.describe("The identifier of the specific message to stop. Provided as a path parameter.");

export const chatsStopStatus200Schema = z.strictObject({
	success: z.literal(true),
});

export const chatsStopStatus401Schema = unauthorizedErrorSchema;

export const chatsStopStatus403Schema = forbiddenErrorSchema;

export const chatsStopStatus404Schema = notFoundErrorSchema;

export const chatsStopStatus409Schema = conflictErrorSchema;

export const chatsStopStatus413Schema = payloadTooLargeErrorSchema;

export const chatsStopStatus422Schema = unprocessableEntityErrorSchema;

export const chatsStopStatus429Schema = tooManyRequestsErrorSchema;

export const chatsStopStatus500Schema = internalServerErrorSchema;

export const chatsStopResponseSchema = chatsStopStatus200Schema;

export const chatsStopErrorSchema = z.union([
	chatsStopStatus401Schema,
	chatsStopStatus403Schema,
	chatsStopStatus404Schema,
	chatsStopStatus409Schema,
	chatsStopStatus413Schema,
	chatsStopStatus422Schema,
	chatsStopStatus429Schema,
	chatsStopStatus500Schema,
]);

export const chatsStopPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the message to stop. Provided as a path parameter.",
		),
	messageId: z
		.string()
		.describe("The identifier of the specific message to stop. Provided as a path parameter."),
});

export const chatsResolveTaskPathChatIdSchema = z
	.string()
	.describe(
		"The unique identifier of the chat containing the pending task. Provided as a path parameter.",
	);

export const chatsResolveTaskStatus200Schema = chatDetailSchema.describe(
	"Detailed representation of a chat, including its messages, files, versions, and model configuration.",
);

export const chatsResolveTaskStatus401Schema = unauthorizedErrorSchema;

export const chatsResolveTaskStatus403Schema = forbiddenErrorSchema;

export const chatsResolveTaskStatus404Schema = notFoundErrorSchema;

export const chatsResolveTaskStatus409Schema = conflictErrorSchema;

export const chatsResolveTaskStatus413Schema = payloadTooLargeErrorSchema;

export const chatsResolveTaskStatus422Schema = unprocessableEntityErrorSchema;

export const chatsResolveTaskStatus429Schema = tooManyRequestsErrorSchema;

export const chatsResolveTaskStatus500Schema = internalServerErrorSchema;

export const chatsResolveTaskResponseSchema = chatsResolveTaskStatus200Schema;

export const chatsResolveTaskErrorSchema = z.union([
	chatsResolveTaskStatus401Schema,
	chatsResolveTaskStatus403Schema,
	chatsResolveTaskStatus404Schema,
	chatsResolveTaskStatus409Schema,
	chatsResolveTaskStatus413Schema,
	chatsResolveTaskStatus422Schema,
	chatsResolveTaskStatus429Schema,
	chatsResolveTaskStatus500Schema,
]);

export const chatsResolveTaskBodySchema = z.strictObject({
	task: z
		.discriminatedUnion("type", [
			z.strictObject({
				type: z.enum(["confirmed-steps"]),
				connectedIntegrationNames: z
					.array(z.string().max(2052))
					.optional()
					.default([])
					.describe(
						'Names of integrations that were successfully connected (e.g. "Neon"). Pass an empty array to skip.',
					),
				connectedNpmRegistryIds: z
					.array(z.string().max(2052))
					.optional()
					.default([])
					.describe(
						"Deprecated. npm registry connections are no longer supported; this field is accepted for compatibility and ignored.",
					),
				connectedMcpPresetNames: z
					.array(
						z.enum([
							"Linear",
							"Notion",
							"Context7",
							"Sentry",
							"Zapier",
							"Glean",
							"Hex",
							"Sanity",
							"Granola",
							"PostHog",
							"Contentful",
							"Mobbin",
							"Slack",
							"Nitrosend",
							"Datadog",
						]),
					)
					.optional()
					.default([])
					.describe(
						'Names of MCP presets that were connected (e.g. "Linear", "Sentry"). Pass an empty array to skip.',
					),
				appliedScripts: z
					.array(z.string().min(1))
					.optional()
					.default([])
					.describe("Names of scripts that were applied."),
				addedEnvVars: z
					.array(z.string().min(1))
					.optional()
					.default([])
					.describe("Names of environment variables that were added."),
			}),
			z.strictObject({
				type: z.enum(["plan-exit-response"]),
				status: z
					.enum(["approved", "rejected", "request-changes"])
					.describe("Whether the plan is approved, rejected, or needs changes."),
				content: z.string().min(1).describe("Feedback or instructions for the agent."),
			}),
			z.strictObject({
				type: z.enum(["answered-questions"]),
				answers: z
					.array(
						z.strictObject({
							questionId: z.string().min(1).describe("The ID of the question being answered."),
							questionText: z.string().min(1).describe("The text of the question being answered."),
							selectedLabels: z
								.array(z.string().min(1))
								.describe(
									"The labels of the selected options. For single-select questions, pass one item.",
								),
							customText: z
								.string()
								.min(1)
								.optional()
								.describe(
									'Free-form text input, used when the user selects "Other" or wants to add context.',
								),
						}),
					)
					.describe("Answers to the questions the agent asked."),
			}),
			z.strictObject({
				type: z.enum(["confirmed-permissions"]),
				permissions: z
					.array(
						z.strictObject({
							type: z.enum(["ALLOW_DYNAMIC_TOOL_STRICT"]),
							toolName: z.string().min(1).describe("The name of the tool being permitted."),
							input: z
								.unknown()
								.describe(
									"The tool call input arguments. Pass the exact input from the stopped task.",
								),
							toolDisplayName: z
								.union([z.string().min(1).max(100), z.null()])
								.optional()
								.describe(
									"The tool's original human-readable name from the stopped task. Display-only; pass back unchanged. Capped at 100 characters, matching the cap applied when the name is ingested from the server.",
								),
							taskNameActive: z
								.union([z.string().min(1), z.null()])
								.optional()
								.describe('Label shown while the tool is running (e.g. "Running migration").'),
							taskNameComplete: z
								.union([z.string().min(1), z.null()])
								.optional()
								.describe('Label shown after the tool completes (e.g. "Migration complete").'),
							userMessage: z
								.string()
								.min(1)
								.optional()
								.describe("Optional message from the user about this permission."),
						}),
					)
					.describe(
						"The permissions to grant. Pass the suggestedPermissions from the stopped task.",
					),
				userMessage: z
					.string()
					.min(1)
					.optional()
					.describe("Optional message from the user about the permission grant."),
			}),
			z.strictObject({
				type: z.enum(["vercel-connect-setup"]),
			}),
			z.strictObject({
				type: z.enum(["vercel-connect-authorization"]),
			}),
		])
		.describe(
			"The task resolution data. Use this when the chat is waiting for user input on the matching task type.",
		),
	responseMode: z
		.enum(["async", "experimental_stream", "sync"])
		.optional()
		.default("sync")
		.describe(
			'Controls how the response is delivered.\n\n- `"sync"`: The response is returned immediately with the HTTP request.\n- `"async"`: Returns a message placeholder immediately; use getById to poll for completion status and final output.\n- `"experimental_stream"`: Returns content parts as Server-Sent Events for real-time streaming.',
		),
	modelConfiguration: z
		.strictObject({
			modelId: z
				.string()
				.min(3)
				.max(200)
				.regex(/^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._/-]*$/)
				.optional()
				.default("v0-pro")
				.describe(
					"Model to use for the generation. Use a v0 model ID, or an [AI Gateway](https://vercel.com/ai-gateway/models) model ID in `creator/model` format. Gateway models must support tool calling and Zero Data Retention, and are subject to team model policy; unsupported IDs are rejected. `v0-auto` is deprecated and falls back to `v0-pro`.",
				),
			imageGenerations: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables image generations to generate up to 5 images per version."),
			thinking: z
				.boolean()
				.optional()
				.default(false)
				.describe("Enables thinking to generate a response in multiple steps."),
			thinkingEffort: z
				.union([z.enum(["none", "minimal", "low", "medium", "high", "max", "xhigh"]), z.null()])
				.optional(),
			fast: z.boolean().optional(),
		})
		.optional()
		.describe("Overrides for the model behavior."),
});

export const chatsResolveTaskPathSchema = z.object({
	chatId: z
		.string()
		.describe(
			"The unique identifier of the chat containing the pending task. Provided as a path parameter.",
		),
});

export const deploymentsFindQueryProjectIdSchema = z
	.string()
	.optional()
	.describe("The ID of the project to find deployments for");

export const deploymentsFindQueryChatIdSchema = z
	.string()
	.describe("The ID of the chat to find deployments for");

export const deploymentsFindQueryVersionIdSchema = z
	.string()
	.describe("The ID of the version to find deployments for");

export const deploymentsFindStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(deploymentDetailSchema),
});

export const deploymentsFindStatus401Schema = unauthorizedErrorSchema;

export const deploymentsFindStatus403Schema = forbiddenErrorSchema;

export const deploymentsFindStatus404Schema = notFoundErrorSchema;

export const deploymentsFindStatus409Schema = conflictErrorSchema;

export const deploymentsFindStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsFindStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsFindStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsFindStatus500Schema = internalServerErrorSchema;

export const deploymentsFindResponseSchema = deploymentsFindStatus200Schema;

export const deploymentsFindErrorSchema = z.union([
	deploymentsFindStatus401Schema,
	deploymentsFindStatus403Schema,
	deploymentsFindStatus404Schema,
	deploymentsFindStatus409Schema,
	deploymentsFindStatus413Schema,
	deploymentsFindStatus422Schema,
	deploymentsFindStatus429Schema,
	deploymentsFindStatus500Schema,
]);

export const deploymentsFindQuerySchema = z.object({
	projectId: z.string().optional().describe("The ID of the project to find deployments for"),
	chatId: z.string().describe("The ID of the chat to find deployments for"),
	versionId: z.string().describe("The ID of the version to find deployments for"),
});

export const deploymentsCreateStatus200Schema = deploymentDetailSchema;

export const deploymentsCreateStatus401Schema = unauthorizedErrorSchema;

export const deploymentsCreateStatus403Schema = forbiddenErrorSchema;

export const deploymentsCreateStatus404Schema = notFoundErrorSchema;

export const deploymentsCreateStatus409Schema = conflictErrorSchema;

export const deploymentsCreateStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsCreateStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsCreateStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsCreateStatus500Schema = internalServerErrorSchema;

export const deploymentsCreateResponseSchema = deploymentsCreateStatus200Schema;

export const deploymentsCreateErrorSchema = z.union([
	deploymentsCreateStatus401Schema,
	deploymentsCreateStatus403Schema,
	deploymentsCreateStatus404Schema,
	deploymentsCreateStatus409Schema,
	deploymentsCreateStatus413Schema,
	deploymentsCreateStatus422Schema,
	deploymentsCreateStatus429Schema,
	deploymentsCreateStatus500Schema,
]);

export const deploymentsCreateBodySchema = z.strictObject({
	projectId: z.string().optional(),
	chatId: z.string(),
	versionId: z.string(),
});

export const deploymentsGetByIdPathDeploymentIdSchema = z
	.string()
	.describe('Path parameter "deploymentId"');

export const deploymentsGetByIdStatus200Schema = deploymentDetailSchema;

export const deploymentsGetByIdStatus401Schema = unauthorizedErrorSchema;

export const deploymentsGetByIdStatus403Schema = forbiddenErrorSchema;

export const deploymentsGetByIdStatus404Schema = notFoundErrorSchema;

export const deploymentsGetByIdStatus409Schema = conflictErrorSchema;

export const deploymentsGetByIdStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsGetByIdStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsGetByIdStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsGetByIdStatus500Schema = internalServerErrorSchema;

export const deploymentsGetByIdResponseSchema = deploymentsGetByIdStatus200Schema;

export const deploymentsGetByIdErrorSchema = z.union([
	deploymentsGetByIdStatus401Schema,
	deploymentsGetByIdStatus403Schema,
	deploymentsGetByIdStatus404Schema,
	deploymentsGetByIdStatus409Schema,
	deploymentsGetByIdStatus413Schema,
	deploymentsGetByIdStatus422Schema,
	deploymentsGetByIdStatus429Schema,
	deploymentsGetByIdStatus500Schema,
]);

export const deploymentsGetByIdPathSchema = z.object({
	deploymentId: z.string().describe('Path parameter "deploymentId"'),
});

export const deploymentsDeletePathDeploymentIdSchema = z
	.string()
	.describe('Path parameter "deploymentId"');

export const deploymentsDeleteStatus200Schema = z.strictObject({
	id: z.string(),
	object: z.enum(["deployment"]),
	deleted: z.literal(true),
});

export const deploymentsDeleteStatus401Schema = unauthorizedErrorSchema;

export const deploymentsDeleteStatus403Schema = forbiddenErrorSchema;

export const deploymentsDeleteStatus404Schema = notFoundErrorSchema;

export const deploymentsDeleteStatus409Schema = conflictErrorSchema;

export const deploymentsDeleteStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsDeleteStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsDeleteStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsDeleteStatus500Schema = internalServerErrorSchema;

export const deploymentsDeleteResponseSchema = deploymentsDeleteStatus200Schema;

export const deploymentsDeleteErrorSchema = z.union([
	deploymentsDeleteStatus401Schema,
	deploymentsDeleteStatus403Schema,
	deploymentsDeleteStatus404Schema,
	deploymentsDeleteStatus409Schema,
	deploymentsDeleteStatus413Schema,
	deploymentsDeleteStatus422Schema,
	deploymentsDeleteStatus429Schema,
	deploymentsDeleteStatus500Schema,
]);

export const deploymentsDeletePathSchema = z.object({
	deploymentId: z.string().describe('Path parameter "deploymentId"'),
});

export const deploymentsFindLogsPathDeploymentIdSchema = z
	.string()
	.describe(
		"The unique identifier of the deployment to retrieve logs for. Provided as a path parameter.",
	);

export const deploymentsFindLogsQuerySinceSchema = z
	.number()
	.optional()
	.describe(
		"A UNIX timestamp (in seconds) used to filter logs. Returns only log entries generated after the specified time.",
	);

export const deploymentsFindLogsStatus200Schema = z.strictObject({
	logs: z
		.array(
			z.strictObject({
				createdAt: z.string().describe("Log creation timestamp."),
				deploymentId: z.string().describe("Deployment ID."),
				id: z.string().describe("Log entry ID."),
				text: z.string().describe("Log message content."),
				type: z.enum(["stderr", "stdout"]).describe("Output stream type."),
				level: z
					.enum(["error", "info", "warning"])
					.optional()
					.default("info")
					.describe("Log severity level."),
				object: z.enum(["deployment_log"]).describe("Object type identifier."),
			}),
		)
		.describe("Array of log entries."),
	nextSince: z.number().optional().describe("Timestamp for pagination."),
	object: z.enum(["list"]).describe("Object type identifier."),
});

export const deploymentsFindLogsStatus401Schema = unauthorizedErrorSchema;

export const deploymentsFindLogsStatus403Schema = forbiddenErrorSchema;

export const deploymentsFindLogsStatus404Schema = notFoundErrorSchema;

export const deploymentsFindLogsStatus409Schema = conflictErrorSchema;

export const deploymentsFindLogsStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsFindLogsStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsFindLogsStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsFindLogsStatus500Schema = internalServerErrorSchema;

export const deploymentsFindLogsResponseSchema = deploymentsFindLogsStatus200Schema;

export const deploymentsFindLogsErrorSchema = z.union([
	deploymentsFindLogsStatus401Schema,
	deploymentsFindLogsStatus403Schema,
	deploymentsFindLogsStatus404Schema,
	deploymentsFindLogsStatus409Schema,
	deploymentsFindLogsStatus413Schema,
	deploymentsFindLogsStatus422Schema,
	deploymentsFindLogsStatus429Schema,
	deploymentsFindLogsStatus500Schema,
]);

export const deploymentsFindLogsPathSchema = z.object({
	deploymentId: z
		.string()
		.describe(
			"The unique identifier of the deployment to retrieve logs for. Provided as a path parameter.",
		),
});

export const deploymentsFindLogsQuerySchema = z.object({
	since: z
		.number()
		.optional()
		.describe(
			"A UNIX timestamp (in seconds) used to filter logs. Returns only log entries generated after the specified time.",
		),
});

export const deploymentsFindErrorsPathDeploymentIdSchema = z
	.string()
	.describe(
		"The unique identifier of the deployment to inspect for errors. Provided as a path parameter.",
	);

export const deploymentsFindErrorsStatus200Schema = z.strictObject({
	fullErrorText: z.string().optional(),
	errorType: z.string().optional(),
	formattedError: z.string().optional(),
});

export const deploymentsFindErrorsStatus401Schema = unauthorizedErrorSchema;

export const deploymentsFindErrorsStatus403Schema = forbiddenErrorSchema;

export const deploymentsFindErrorsStatus404Schema = notFoundErrorSchema;

export const deploymentsFindErrorsStatus409Schema = conflictErrorSchema;

export const deploymentsFindErrorsStatus413Schema = payloadTooLargeErrorSchema;

export const deploymentsFindErrorsStatus422Schema = unprocessableEntityErrorSchema;

export const deploymentsFindErrorsStatus429Schema = tooManyRequestsErrorSchema;

export const deploymentsFindErrorsStatus500Schema = internalServerErrorSchema;

export const deploymentsFindErrorsResponseSchema = deploymentsFindErrorsStatus200Schema;

export const deploymentsFindErrorsErrorSchema = z.union([
	deploymentsFindErrorsStatus401Schema,
	deploymentsFindErrorsStatus403Schema,
	deploymentsFindErrorsStatus404Schema,
	deploymentsFindErrorsStatus409Schema,
	deploymentsFindErrorsStatus413Schema,
	deploymentsFindErrorsStatus422Schema,
	deploymentsFindErrorsStatus429Schema,
	deploymentsFindErrorsStatus500Schema,
]);

export const deploymentsFindErrorsPathSchema = z.object({
	deploymentId: z
		.string()
		.describe(
			"The unique identifier of the deployment to inspect for errors. Provided as a path parameter.",
		),
});

export const hooksFindStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(hookSummarySchema),
});

export const hooksFindStatus401Schema = unauthorizedErrorSchema;

export const hooksFindStatus403Schema = forbiddenErrorSchema;

export const hooksFindStatus404Schema = notFoundErrorSchema;

export const hooksFindStatus409Schema = conflictErrorSchema;

export const hooksFindStatus413Schema = payloadTooLargeErrorSchema;

export const hooksFindStatus422Schema = unprocessableEntityErrorSchema;

export const hooksFindStatus429Schema = tooManyRequestsErrorSchema;

export const hooksFindStatus500Schema = internalServerErrorSchema;

export const hooksFindResponseSchema = hooksFindStatus200Schema;

export const hooksFindErrorSchema = z.union([
	hooksFindStatus401Schema,
	hooksFindStatus403Schema,
	hooksFindStatus404Schema,
	hooksFindStatus409Schema,
	hooksFindStatus413Schema,
	hooksFindStatus422Schema,
	hooksFindStatus429Schema,
	hooksFindStatus500Schema,
]);

export const hooksCreateStatus200Schema = hookDetailSchema.describe(
	"Full configuration details for a webhook, including its scope and subscription.",
);

export const hooksCreateStatus401Schema = unauthorizedErrorSchema;

export const hooksCreateStatus403Schema = forbiddenErrorSchema;

export const hooksCreateStatus404Schema = notFoundErrorSchema;

export const hooksCreateStatus409Schema = conflictErrorSchema;

export const hooksCreateStatus413Schema = payloadTooLargeErrorSchema;

export const hooksCreateStatus422Schema = unprocessableEntityErrorSchema;

export const hooksCreateStatus429Schema = tooManyRequestsErrorSchema;

export const hooksCreateStatus500Schema = internalServerErrorSchema;

export const hooksCreateResponseSchema = hooksCreateStatus200Schema;

export const hooksCreateErrorSchema = z.union([
	hooksCreateStatus401Schema,
	hooksCreateStatus403Schema,
	hooksCreateStatus404Schema,
	hooksCreateStatus409Schema,
	hooksCreateStatus413Schema,
	hooksCreateStatus422Schema,
	hooksCreateStatus429Schema,
	hooksCreateStatus500Schema,
]);

export const hooksCreateBodySchema = z.strictObject({
	name: z.string().describe("A human-readable name for the hook."),
	events: z
		.array(
			z.enum([
				"chat.created",
				"chat.deleted",
				"chat.updated",
				"message.created",
				"message.deleted",
				"message.finished",
				"message.updated",
			]),
		)
		.describe("List of event types the hook should subscribe to."),
	chatId: z.string().optional().describe("The ID of a chat to scope the hook to."),
	url: z.url().describe("The target URL to receive the webhook payloads."),
});

export const hooksGetByIdPathHookIdSchema = z
	.string()
	.describe("The unique identifier of the hook to retrieve.");

export const hooksGetByIdStatus200Schema = hookDetailSchema.describe(
	"Full configuration details for a webhook, including its scope and subscription.",
);

export const hooksGetByIdStatus401Schema = unauthorizedErrorSchema;

export const hooksGetByIdStatus403Schema = forbiddenErrorSchema;

export const hooksGetByIdStatus404Schema = notFoundErrorSchema;

export const hooksGetByIdStatus409Schema = conflictErrorSchema;

export const hooksGetByIdStatus413Schema = payloadTooLargeErrorSchema;

export const hooksGetByIdStatus422Schema = unprocessableEntityErrorSchema;

export const hooksGetByIdStatus429Schema = tooManyRequestsErrorSchema;

export const hooksGetByIdStatus500Schema = internalServerErrorSchema;

export const hooksGetByIdResponseSchema = hooksGetByIdStatus200Schema;

export const hooksGetByIdErrorSchema = z.union([
	hooksGetByIdStatus401Schema,
	hooksGetByIdStatus403Schema,
	hooksGetByIdStatus404Schema,
	hooksGetByIdStatus409Schema,
	hooksGetByIdStatus413Schema,
	hooksGetByIdStatus422Schema,
	hooksGetByIdStatus429Schema,
	hooksGetByIdStatus500Schema,
]);

export const hooksGetByIdPathSchema = z.object({
	hookId: z.string().describe("The unique identifier of the hook to retrieve."),
});

export const hooksUpdatePathHookIdSchema = z
	.string()
	.describe("The ID of the webhook to update. Provided as a path parameter.");

export const hooksUpdateStatus200Schema = hookDetailSchema.describe(
	"Full configuration details for a webhook, including its scope and subscription.",
);

export const hooksUpdateStatus401Schema = unauthorizedErrorSchema;

export const hooksUpdateStatus403Schema = forbiddenErrorSchema;

export const hooksUpdateStatus404Schema = notFoundErrorSchema;

export const hooksUpdateStatus409Schema = conflictErrorSchema;

export const hooksUpdateStatus413Schema = payloadTooLargeErrorSchema;

export const hooksUpdateStatus422Schema = unprocessableEntityErrorSchema;

export const hooksUpdateStatus429Schema = tooManyRequestsErrorSchema;

export const hooksUpdateStatus500Schema = internalServerErrorSchema;

export const hooksUpdateResponseSchema = hooksUpdateStatus200Schema;

export const hooksUpdateErrorSchema = z.union([
	hooksUpdateStatus401Schema,
	hooksUpdateStatus403Schema,
	hooksUpdateStatus404Schema,
	hooksUpdateStatus409Schema,
	hooksUpdateStatus413Schema,
	hooksUpdateStatus422Schema,
	hooksUpdateStatus429Schema,
	hooksUpdateStatus500Schema,
]);

export const hooksUpdateBodySchema = z.strictObject({
	name: z.string().optional().describe("A new name for the hook."),
	events: z
		.array(
			z.enum([
				"chat.created",
				"chat.deleted",
				"chat.updated",
				"message.created",
				"message.deleted",
				"message.finished",
				"message.updated",
			]),
		)
		.optional()
		.describe("Updated list of event types to subscribe to."),
	url: z.url().optional().describe("A new URL to send webhook payloads to."),
});

export const hooksUpdatePathSchema = z.object({
	hookId: z.string().describe("The ID of the webhook to update. Provided as a path parameter."),
});

export const hooksDeletePathHookIdSchema = z
	.string()
	.describe("The ID of the webhook to delete. Provided as a path parameter.");

export const hooksDeleteStatus200Schema = z.strictObject({
	id: z.string(),
	object: z.enum(["hook"]),
	deleted: z.literal(true),
});

export const hooksDeleteStatus401Schema = unauthorizedErrorSchema;

export const hooksDeleteStatus403Schema = forbiddenErrorSchema;

export const hooksDeleteStatus404Schema = notFoundErrorSchema;

export const hooksDeleteStatus409Schema = conflictErrorSchema;

export const hooksDeleteStatus413Schema = payloadTooLargeErrorSchema;

export const hooksDeleteStatus422Schema = unprocessableEntityErrorSchema;

export const hooksDeleteStatus429Schema = tooManyRequestsErrorSchema;

export const hooksDeleteStatus500Schema = internalServerErrorSchema;

export const hooksDeleteResponseSchema = hooksDeleteStatus200Schema;

export const hooksDeleteErrorSchema = z.union([
	hooksDeleteStatus401Schema,
	hooksDeleteStatus403Schema,
	hooksDeleteStatus404Schema,
	hooksDeleteStatus409Schema,
	hooksDeleteStatus413Schema,
	hooksDeleteStatus422Schema,
	hooksDeleteStatus429Schema,
	hooksDeleteStatus500Schema,
]);

export const hooksDeletePathSchema = z.object({
	hookId: z.string().describe("The ID of the webhook to delete. Provided as a path parameter."),
});

export const integrationsVercelProjectsFindStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(vercelProjectSummarySchema),
});

export const integrationsVercelProjectsFindStatus401Schema = unauthorizedErrorSchema;

export const integrationsVercelProjectsFindStatus403Schema = forbiddenErrorSchema;

export const integrationsVercelProjectsFindStatus404Schema = notFoundErrorSchema;

export const integrationsVercelProjectsFindStatus409Schema = conflictErrorSchema;

export const integrationsVercelProjectsFindStatus413Schema = payloadTooLargeErrorSchema;

export const integrationsVercelProjectsFindStatus422Schema = unprocessableEntityErrorSchema;

export const integrationsVercelProjectsFindStatus429Schema = tooManyRequestsErrorSchema;

export const integrationsVercelProjectsFindStatus500Schema = internalServerErrorSchema;

export const integrationsVercelProjectsFindResponseSchema =
	integrationsVercelProjectsFindStatus200Schema;

export const integrationsVercelProjectsFindErrorSchema = z.union([
	integrationsVercelProjectsFindStatus401Schema,
	integrationsVercelProjectsFindStatus403Schema,
	integrationsVercelProjectsFindStatus404Schema,
	integrationsVercelProjectsFindStatus409Schema,
	integrationsVercelProjectsFindStatus413Schema,
	integrationsVercelProjectsFindStatus422Schema,
	integrationsVercelProjectsFindStatus429Schema,
	integrationsVercelProjectsFindStatus500Schema,
]);

export const integrationsVercelProjectsCreateStatus200Schema = vercelProjectDetailSchema;

export const integrationsVercelProjectsCreateStatus401Schema = unauthorizedErrorSchema;

export const integrationsVercelProjectsCreateStatus403Schema = forbiddenErrorSchema;

export const integrationsVercelProjectsCreateStatus404Schema = notFoundErrorSchema;

export const integrationsVercelProjectsCreateStatus409Schema = conflictErrorSchema;

export const integrationsVercelProjectsCreateStatus413Schema = payloadTooLargeErrorSchema;

export const integrationsVercelProjectsCreateStatus422Schema = unprocessableEntityErrorSchema;

export const integrationsVercelProjectsCreateStatus429Schema = tooManyRequestsErrorSchema;

export const integrationsVercelProjectsCreateStatus500Schema = internalServerErrorSchema;

export const integrationsVercelProjectsCreateResponseSchema =
	integrationsVercelProjectsCreateStatus200Schema;

export const integrationsVercelProjectsCreateErrorSchema = z.union([
	integrationsVercelProjectsCreateStatus401Schema,
	integrationsVercelProjectsCreateStatus403Schema,
	integrationsVercelProjectsCreateStatus404Schema,
	integrationsVercelProjectsCreateStatus409Schema,
	integrationsVercelProjectsCreateStatus413Schema,
	integrationsVercelProjectsCreateStatus422Schema,
	integrationsVercelProjectsCreateStatus429Schema,
	integrationsVercelProjectsCreateStatus500Schema,
]);

export const integrationsVercelProjectsCreateBodySchema = z.strictObject({
	projectId: z.string().describe("The ID of the v0 project to link to the new Vercel project."),
	name: z.string().describe("The name to assign to the new Vercel project."),
});

export const projectsFindStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(projectSummarySchema),
});

export const projectsFindStatus401Schema = unauthorizedErrorSchema;

export const projectsFindStatus403Schema = forbiddenErrorSchema;

export const projectsFindStatus404Schema = notFoundErrorSchema;

export const projectsFindStatus409Schema = conflictErrorSchema;

export const projectsFindStatus413Schema = payloadTooLargeErrorSchema;

export const projectsFindStatus422Schema = unprocessableEntityErrorSchema;

export const projectsFindStatus429Schema = tooManyRequestsErrorSchema;

export const projectsFindStatus500Schema = internalServerErrorSchema;

export const projectsFindResponseSchema = projectsFindStatus200Schema;

export const projectsFindErrorSchema = z.union([
	projectsFindStatus401Schema,
	projectsFindStatus403Schema,
	projectsFindStatus404Schema,
	projectsFindStatus409Schema,
	projectsFindStatus413Schema,
	projectsFindStatus422Schema,
	projectsFindStatus429Schema,
	projectsFindStatus500Schema,
]);

export const projectsCreateStatus200Schema = projectDetailSchema.describe(
	"Full representation of a project, including its associated chats.",
);

export const projectsCreateStatus401Schema = unauthorizedErrorSchema;

export const projectsCreateStatus403Schema = forbiddenErrorSchema;

export const projectsCreateStatus404Schema = notFoundErrorSchema;

export const projectsCreateStatus409Schema = conflictErrorSchema;

export const projectsCreateStatus413Schema = payloadTooLargeErrorSchema;

export const projectsCreateStatus422Schema = unprocessableEntityErrorSchema;

export const projectsCreateStatus429Schema = tooManyRequestsErrorSchema;

export const projectsCreateStatus500Schema = internalServerErrorSchema;

export const projectsCreateResponseSchema = projectsCreateStatus200Schema;

export const projectsCreateErrorSchema = z.union([
	projectsCreateStatus401Schema,
	projectsCreateStatus403Schema,
	projectsCreateStatus404Schema,
	projectsCreateStatus409Schema,
	projectsCreateStatus413Schema,
	projectsCreateStatus422Schema,
	projectsCreateStatus429Schema,
	projectsCreateStatus500Schema,
]);

export const projectsCreateBodySchema = z.strictObject({
	name: z.string().max(255).describe("The name of the project."),
	description: z
		.string()
		.max(1000)
		.optional()
		.describe("A brief summary of the project’s purpose."),
	icon: z
		.string()
		.optional()
		.default("icon-wand-sparkles")
		.describe("An icon identifier to visually represent the project."),
	environmentVariables: z
		.array(
			z.strictObject({
				key: z.string().max(255),
				value: z.string().max(1000),
			}),
		)
		.optional()
		.describe("A list of key-value pairs used to define runtime variables for the project."),
	instructions: z
		.string()
		.max(2000)
		.optional()
		.describe(
			"Guidance or goals that provide context for the model when working within the project.",
		),
	vercelProjectId: z
		.string()
		.optional()
		.describe(
			"The ID of an existing Vercel project to link to. If not provided, a new Vercel project will be created.",
		),
	privacy: z
		.enum(["private", "team"])
		.optional()
		.describe(
			'The privacy setting for the project. For user accounts, this is always "private". For team/enterprise accounts, this can be either "private" or "team".',
		),
});

export const projectsGetByIdPathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project to retrieve.");

export const projectsGetByIdStatus200Schema = projectDetailSchema.describe(
	"Full representation of a project, including its associated chats.",
);

export const projectsGetByIdStatus401Schema = unauthorizedErrorSchema;

export const projectsGetByIdStatus403Schema = forbiddenErrorSchema;

export const projectsGetByIdStatus404Schema = notFoundErrorSchema;

export const projectsGetByIdStatus409Schema = conflictErrorSchema;

export const projectsGetByIdStatus413Schema = payloadTooLargeErrorSchema;

export const projectsGetByIdStatus422Schema = unprocessableEntityErrorSchema;

export const projectsGetByIdStatus429Schema = tooManyRequestsErrorSchema;

export const projectsGetByIdStatus500Schema = internalServerErrorSchema;

export const projectsGetByIdResponseSchema = projectsGetByIdStatus200Schema;

export const projectsGetByIdErrorSchema = z.union([
	projectsGetByIdStatus401Schema,
	projectsGetByIdStatus403Schema,
	projectsGetByIdStatus404Schema,
	projectsGetByIdStatus409Schema,
	projectsGetByIdStatus413Schema,
	projectsGetByIdStatus422Schema,
	projectsGetByIdStatus429Schema,
	projectsGetByIdStatus500Schema,
]);

export const projectsGetByIdPathSchema = z.object({
	projectId: z.string().describe("The unique identifier of the project to retrieve."),
});

export const projectsUpdatePathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project to update. Provided as a path parameter.");

export const projectsUpdateStatus200Schema = projectDetailSchema.describe(
	"Full representation of a project, including its associated chats.",
);

export const projectsUpdateStatus401Schema = unauthorizedErrorSchema;

export const projectsUpdateStatus403Schema = forbiddenErrorSchema;

export const projectsUpdateStatus404Schema = notFoundErrorSchema;

export const projectsUpdateStatus409Schema = conflictErrorSchema;

export const projectsUpdateStatus413Schema = payloadTooLargeErrorSchema;

export const projectsUpdateStatus422Schema = unprocessableEntityErrorSchema;

export const projectsUpdateStatus429Schema = tooManyRequestsErrorSchema;

export const projectsUpdateStatus500Schema = internalServerErrorSchema;

export const projectsUpdateResponseSchema = projectsUpdateStatus200Schema;

export const projectsUpdateErrorSchema = z.union([
	projectsUpdateStatus401Schema,
	projectsUpdateStatus403Schema,
	projectsUpdateStatus404Schema,
	projectsUpdateStatus409Schema,
	projectsUpdateStatus413Schema,
	projectsUpdateStatus422Schema,
	projectsUpdateStatus429Schema,
	projectsUpdateStatus500Schema,
]);

export const projectsUpdateBodySchema = z.strictObject({
	name: z
		.string()
		.optional()
		.describe("A new name to assign to the project. Helps with identification and organization."),
	description: z
		.string()
		.optional()
		.describe(
			"A new description to assign to the project. Helps with identification and organization.",
		),
	instructions: z
		.string()
		.optional()
		.describe(
			"Guidance or goals that provide context for the model when working within the project.",
		),
	privacy: z
		.enum(["private", "team"])
		.optional()
		.describe(
			'The privacy setting for the project. For user accounts, this must be "private". For team/enterprise accounts, this can be either "private" or "team".',
		),
});

export const projectsUpdatePathSchema = z.object({
	projectId: z
		.string()
		.describe("The unique identifier of the project to update. Provided as a path parameter."),
});

export const projectsDeletePathProjectIdSchema = z
	.string()
	.describe(
		"The unique identifier of the project to delete. This must be passed as a path parameter in the URL.",
	);

export const projectsDeleteQueryDeleteAllChatsSchema = z
	.enum(["true", "false"])
	.optional()
	.default("false")
	.describe(
		"If true, deletes all the chats associated with the given project ID. Deleting is permanent. Defaults to false.",
	);

export const projectsDeleteStatus200Schema = z.strictObject({
	id: z.string().describe("The unique identifier of the deleted project."),
	object: z.enum(["project"]).describe("Fixed value identifying this object as a project."),
	deleted: z.literal(true).describe("Confirmation that the project has been deleted."),
});

export const projectsDeleteStatus401Schema = unauthorizedErrorSchema;

export const projectsDeleteStatus403Schema = forbiddenErrorSchema;

export const projectsDeleteStatus404Schema = notFoundErrorSchema;

export const projectsDeleteStatus409Schema = conflictErrorSchema;

export const projectsDeleteStatus413Schema = payloadTooLargeErrorSchema;

export const projectsDeleteStatus422Schema = unprocessableEntityErrorSchema;

export const projectsDeleteStatus429Schema = tooManyRequestsErrorSchema;

export const projectsDeleteStatus500Schema = internalServerErrorSchema;

export const projectsDeleteResponseSchema = projectsDeleteStatus200Schema;

export const projectsDeleteErrorSchema = z.union([
	projectsDeleteStatus401Schema,
	projectsDeleteStatus403Schema,
	projectsDeleteStatus404Schema,
	projectsDeleteStatus409Schema,
	projectsDeleteStatus413Schema,
	projectsDeleteStatus422Schema,
	projectsDeleteStatus429Schema,
	projectsDeleteStatus500Schema,
]);

export const projectsDeletePathSchema = z.object({
	projectId: z
		.string()
		.describe(
			"The unique identifier of the project to delete. This must be passed as a path parameter in the URL.",
		),
});

export const projectsDeleteQuerySchema = z.object({
	deleteAllChats: z
		.enum(["true", "false"])
		.optional()
		.default("false")
		.describe(
			"If true, deletes all the chats associated with the given project ID. Deleting is permanent. Defaults to false.",
		),
});

export const projectsAssignPathProjectIdSchema = z
	.string()
	.describe("The ID of the project to assign.");

export const projectsAssignStatus200Schema = z.strictObject({
	object: z.enum(["project"]),
	id: z.string(),
	assigned: z.literal(true),
});

export const projectsAssignStatus401Schema = unauthorizedErrorSchema;

export const projectsAssignStatus403Schema = forbiddenErrorSchema;

export const projectsAssignStatus404Schema = notFoundErrorSchema;

export const projectsAssignStatus409Schema = conflictErrorSchema;

export const projectsAssignStatus413Schema = payloadTooLargeErrorSchema;

export const projectsAssignStatus422Schema = unprocessableEntityErrorSchema;

export const projectsAssignStatus429Schema = tooManyRequestsErrorSchema;

export const projectsAssignStatus500Schema = internalServerErrorSchema;

export const projectsAssignResponseSchema = projectsAssignStatus200Schema;

export const projectsAssignErrorSchema = z.union([
	projectsAssignStatus401Schema,
	projectsAssignStatus403Schema,
	projectsAssignStatus404Schema,
	projectsAssignStatus409Schema,
	projectsAssignStatus413Schema,
	projectsAssignStatus422Schema,
	projectsAssignStatus429Schema,
	projectsAssignStatus500Schema,
]);

export const projectsAssignBodySchema = z.strictObject({
	chatId: z.string().describe("The ID of the chat to assign the project to."),
});

export const projectsAssignPathSchema = z.object({
	projectId: z.string().describe("The ID of the project to assign."),
});

export const projectsFindEnvVarsPathProjectIdSchema = z
	.string()
	.describe(
		"The unique identifier of the project whose environment variables should be retrieved.",
	);

export const projectsFindEnvVarsQueryDecryptedSchema = z
	.enum(["true", "false"])
	.optional()
	.describe("Whether to return decrypted values. Defaults to false (encrypted).");

export const projectsFindEnvVarsStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(environmentVariableSummarySchemaSchema),
});

export const projectsFindEnvVarsStatus401Schema = unauthorizedErrorSchema;

export const projectsFindEnvVarsStatus403Schema = forbiddenErrorSchema;

export const projectsFindEnvVarsStatus404Schema = notFoundErrorSchema;

export const projectsFindEnvVarsStatus409Schema = conflictErrorSchema;

export const projectsFindEnvVarsStatus413Schema = payloadTooLargeErrorSchema;

export const projectsFindEnvVarsStatus422Schema = unprocessableEntityErrorSchema;

export const projectsFindEnvVarsStatus429Schema = tooManyRequestsErrorSchema;

export const projectsFindEnvVarsStatus500Schema = internalServerErrorSchema;

export const projectsFindEnvVarsResponseSchema = projectsFindEnvVarsStatus200Schema;

export const projectsFindEnvVarsErrorSchema = z.union([
	projectsFindEnvVarsStatus401Schema,
	projectsFindEnvVarsStatus403Schema,
	projectsFindEnvVarsStatus404Schema,
	projectsFindEnvVarsStatus409Schema,
	projectsFindEnvVarsStatus413Schema,
	projectsFindEnvVarsStatus422Schema,
	projectsFindEnvVarsStatus429Schema,
	projectsFindEnvVarsStatus500Schema,
]);

export const projectsFindEnvVarsPathSchema = z.object({
	projectId: z
		.string()
		.describe(
			"The unique identifier of the project whose environment variables should be retrieved.",
		),
});

export const projectsFindEnvVarsQuerySchema = z.object({
	decrypted: z
		.enum(["true", "false"])
		.optional()
		.describe("Whether to return decrypted values. Defaults to false (encrypted)."),
});

export const projectsCreateEnvVarsPathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project where environment variables should be created.");

export const projectsCreateEnvVarsQueryDecryptedSchema = z
	.enum(["true", "false"])
	.optional()
	.describe("Whether to return decrypted values. Defaults to false (encrypted).");

export const projectsCreateEnvVarsStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(environmentVariableSummarySchemaSchema),
});

export const projectsCreateEnvVarsStatus401Schema = unauthorizedErrorSchema;

export const projectsCreateEnvVarsStatus403Schema = forbiddenErrorSchema;

export const projectsCreateEnvVarsStatus404Schema = notFoundErrorSchema;

export const projectsCreateEnvVarsStatus409Schema = conflictErrorSchema;

export const projectsCreateEnvVarsStatus413Schema = payloadTooLargeErrorSchema;

export const projectsCreateEnvVarsStatus422Schema = unprocessableEntityErrorSchema;

export const projectsCreateEnvVarsStatus429Schema = tooManyRequestsErrorSchema;

export const projectsCreateEnvVarsStatus500Schema = internalServerErrorSchema;

export const projectsCreateEnvVarsResponseSchema = projectsCreateEnvVarsStatus200Schema;

export const projectsCreateEnvVarsErrorSchema = z.union([
	projectsCreateEnvVarsStatus401Schema,
	projectsCreateEnvVarsStatus403Schema,
	projectsCreateEnvVarsStatus404Schema,
	projectsCreateEnvVarsStatus409Schema,
	projectsCreateEnvVarsStatus413Schema,
	projectsCreateEnvVarsStatus422Schema,
	projectsCreateEnvVarsStatus429Schema,
	projectsCreateEnvVarsStatus500Schema,
]);

export const projectsCreateEnvVarsBodySchema = z.strictObject({
	environmentVariables: z
		.array(
			z.strictObject({
				key: z.string().min(1).describe("The name of the environment variable."),
				value: z.string().describe("The value of the environment variable."),
			}),
		)
		.describe("An array of environment variables to create with key and value fields."),
	upsert: z
		.boolean()
		.optional()
		.describe(
			"Whether to overwrite existing environment variables with the same keys. Defaults to false.",
		),
});

export const projectsCreateEnvVarsPathSchema = z.object({
	projectId: z
		.string()
		.describe(
			"The unique identifier of the project where environment variables should be created.",
		),
});

export const projectsCreateEnvVarsQuerySchema = z.object({
	decrypted: z
		.enum(["true", "false"])
		.optional()
		.describe("Whether to return decrypted values. Defaults to false (encrypted)."),
});

export const projectsUpdateEnvVarsPathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project whose environment variables should be updated.");

export const projectsUpdateEnvVarsQueryDecryptedSchema = z
	.enum(["true", "false"])
	.optional()
	.describe("Whether to return decrypted values. Defaults to false (encrypted).");

export const projectsUpdateEnvVarsStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(environmentVariableSummarySchemaSchema),
});

export const projectsUpdateEnvVarsStatus401Schema = unauthorizedErrorSchema;

export const projectsUpdateEnvVarsStatus403Schema = forbiddenErrorSchema;

export const projectsUpdateEnvVarsStatus404Schema = notFoundErrorSchema;

export const projectsUpdateEnvVarsStatus409Schema = conflictErrorSchema;

export const projectsUpdateEnvVarsStatus413Schema = payloadTooLargeErrorSchema;

export const projectsUpdateEnvVarsStatus422Schema = unprocessableEntityErrorSchema;

export const projectsUpdateEnvVarsStatus429Schema = tooManyRequestsErrorSchema;

export const projectsUpdateEnvVarsStatus500Schema = internalServerErrorSchema;

export const projectsUpdateEnvVarsResponseSchema = projectsUpdateEnvVarsStatus200Schema;

export const projectsUpdateEnvVarsErrorSchema = z.union([
	projectsUpdateEnvVarsStatus401Schema,
	projectsUpdateEnvVarsStatus403Schema,
	projectsUpdateEnvVarsStatus404Schema,
	projectsUpdateEnvVarsStatus409Schema,
	projectsUpdateEnvVarsStatus413Schema,
	projectsUpdateEnvVarsStatus422Schema,
	projectsUpdateEnvVarsStatus429Schema,
	projectsUpdateEnvVarsStatus500Schema,
]);

export const projectsUpdateEnvVarsBodySchema = z.strictObject({
	environmentVariables: z
		.array(
			z.strictObject({
				id: z.string().describe("The unique identifier of the environment variable to update."),
				value: z.string().describe("The new value of the environment variable."),
			}),
		)
		.describe("An array of environment variables to update with id and value fields."),
});

export const projectsUpdateEnvVarsPathSchema = z.object({
	projectId: z
		.string()
		.describe(
			"The unique identifier of the project whose environment variables should be updated.",
		),
});

export const projectsUpdateEnvVarsQuerySchema = z.object({
	decrypted: z
		.enum(["true", "false"])
		.optional()
		.describe("Whether to return decrypted values. Defaults to false (encrypted)."),
});

export const projectsDeleteEnvVarsPathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project whose environment variables should be deleted.");

export const projectsDeleteEnvVarsStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(
		z.strictObject({
			id: z.string(),
			object: z.enum(["environment_variable"]),
			deleted: z.literal(true),
		}),
	),
});

export const projectsDeleteEnvVarsStatus401Schema = unauthorizedErrorSchema;

export const projectsDeleteEnvVarsStatus403Schema = forbiddenErrorSchema;

export const projectsDeleteEnvVarsStatus404Schema = notFoundErrorSchema;

export const projectsDeleteEnvVarsStatus409Schema = conflictErrorSchema;

export const projectsDeleteEnvVarsStatus413Schema = payloadTooLargeErrorSchema;

export const projectsDeleteEnvVarsStatus422Schema = unprocessableEntityErrorSchema;

export const projectsDeleteEnvVarsStatus429Schema = tooManyRequestsErrorSchema;

export const projectsDeleteEnvVarsStatus500Schema = internalServerErrorSchema;

export const projectsDeleteEnvVarsResponseSchema = projectsDeleteEnvVarsStatus200Schema;

export const projectsDeleteEnvVarsErrorSchema = z.union([
	projectsDeleteEnvVarsStatus401Schema,
	projectsDeleteEnvVarsStatus403Schema,
	projectsDeleteEnvVarsStatus404Schema,
	projectsDeleteEnvVarsStatus409Schema,
	projectsDeleteEnvVarsStatus413Schema,
	projectsDeleteEnvVarsStatus422Schema,
	projectsDeleteEnvVarsStatus429Schema,
	projectsDeleteEnvVarsStatus500Schema,
]);

export const projectsDeleteEnvVarsBodySchema = z.strictObject({
	environmentVariableIds: z
		.array(z.string())
		.describe("An array of environment variable IDs to delete."),
});

export const projectsDeleteEnvVarsPathSchema = z.object({
	projectId: z
		.string()
		.describe(
			"The unique identifier of the project whose environment variables should be deleted.",
		),
});

export const projectsGetEnvVarPathProjectIdSchema = z
	.string()
	.describe("The unique identifier of the project that owns the environment variable.");

export const projectsGetEnvVarPathEnvironmentVariableIdSchema = z
	.string()
	.describe("The unique identifier of the environment variable to retrieve.");

export const projectsGetEnvVarQueryDecryptedSchema = z
	.enum(["true", "false"])
	.optional()
	.describe("Whether to return decrypted values. Defaults to false (encrypted).");

export const projectsGetEnvVarStatus200Schema = z.strictObject({
	object: z.enum(["environment_variable"]),
	data: environmentVariableDetailSchemaSchema.describe(
		"Detailed information for an environment variable including its value.",
	),
});

export const projectsGetEnvVarStatus401Schema = unauthorizedErrorSchema;

export const projectsGetEnvVarStatus403Schema = forbiddenErrorSchema;

export const projectsGetEnvVarStatus404Schema = notFoundErrorSchema;

export const projectsGetEnvVarStatus409Schema = conflictErrorSchema;

export const projectsGetEnvVarStatus413Schema = payloadTooLargeErrorSchema;

export const projectsGetEnvVarStatus422Schema = unprocessableEntityErrorSchema;

export const projectsGetEnvVarStatus429Schema = tooManyRequestsErrorSchema;

export const projectsGetEnvVarStatus500Schema = internalServerErrorSchema;

export const projectsGetEnvVarResponseSchema = projectsGetEnvVarStatus200Schema;

export const projectsGetEnvVarErrorSchema = z.union([
	projectsGetEnvVarStatus401Schema,
	projectsGetEnvVarStatus403Schema,
	projectsGetEnvVarStatus404Schema,
	projectsGetEnvVarStatus409Schema,
	projectsGetEnvVarStatus413Schema,
	projectsGetEnvVarStatus422Schema,
	projectsGetEnvVarStatus429Schema,
	projectsGetEnvVarStatus500Schema,
]);

export const projectsGetEnvVarPathSchema = z.object({
	projectId: z
		.string()
		.describe("The unique identifier of the project that owns the environment variable."),
	environmentVariableId: z
		.string()
		.describe("The unique identifier of the environment variable to retrieve."),
});

export const projectsGetEnvVarQuerySchema = z.object({
	decrypted: z
		.enum(["true", "false"])
		.optional()
		.describe("Whether to return decrypted values. Defaults to false (encrypted)."),
});

export const rateLimitsFindQueryScopeSchema = z
	.string()
	.optional()
	.describe(
		"The context or namespace to check rate limits for (e.g., a project slug or feature area).",
	);

export const rateLimitsFindStatus200Schema = z.strictObject({
	remaining: z.number().optional(),
	reset: z.number().optional(),
	limit: z.number(),
	dailyLimit: z
		.strictObject({
			limit: z.number().describe("The maximum number of daily messages allowed for free users."),
			remaining: z.number().describe("The number of messages the user has remaining for the day."),
			reset: z.number().describe("Unix timestamp (in milliseconds) when the daily limit resets."),
			isWithinGracePeriod: z
				.boolean()
				.describe(
					"Whether the user is within the 48-hour grace period for new users, during which usage tracking is disabled.",
				),
		})
		.optional()
		.describe("Daily message limit information for free users."),
});

export const rateLimitsFindStatus401Schema = unauthorizedErrorSchema;

export const rateLimitsFindStatus403Schema = forbiddenErrorSchema;

export const rateLimitsFindStatus404Schema = notFoundErrorSchema;

export const rateLimitsFindStatus409Schema = conflictErrorSchema;

export const rateLimitsFindStatus413Schema = payloadTooLargeErrorSchema;

export const rateLimitsFindStatus422Schema = unprocessableEntityErrorSchema;

export const rateLimitsFindStatus429Schema = tooManyRequestsErrorSchema;

export const rateLimitsFindStatus500Schema = internalServerErrorSchema;

export const rateLimitsFindResponseSchema = rateLimitsFindStatus200Schema;

export const rateLimitsFindErrorSchema = z.union([
	rateLimitsFindStatus401Schema,
	rateLimitsFindStatus403Schema,
	rateLimitsFindStatus404Schema,
	rateLimitsFindStatus409Schema,
	rateLimitsFindStatus413Schema,
	rateLimitsFindStatus422Schema,
	rateLimitsFindStatus429Schema,
	rateLimitsFindStatus500Schema,
]);

export const rateLimitsFindQuerySchema = z.object({
	scope: z
		.string()
		.optional()
		.describe(
			"The context or namespace to check rate limits for (e.g., a project slug or feature area).",
		),
});

export const userGetStatus200Schema = userSummarySchemaSchema.describe(
	"Details of the authenticated user, including profile and contact information.",
);

export const userGetStatus401Schema = unauthorizedErrorSchema;

export const userGetStatus403Schema = forbiddenErrorSchema;

export const userGetStatus404Schema = notFoundErrorSchema;

export const userGetStatus409Schema = conflictErrorSchema;

export const userGetStatus413Schema = payloadTooLargeErrorSchema;

export const userGetStatus422Schema = unprocessableEntityErrorSchema;

export const userGetStatus429Schema = tooManyRequestsErrorSchema;

export const userGetStatus500Schema = internalServerErrorSchema;

export const userGetResponseSchema = userGetStatus200Schema;

export const userGetErrorSchema = z.union([
	userGetStatus401Schema,
	userGetStatus403Schema,
	userGetStatus404Schema,
	userGetStatus409Schema,
	userGetStatus413Schema,
	userGetStatus422Schema,
	userGetStatus429Schema,
	userGetStatus500Schema,
]);

export const userGetBillingQueryScopeSchema = z
	.string()
	.optional()
	.describe("Filters billing data by a specific scope, such as a project ID or slug.");

export const userGetBillingStatus200Schema = z.discriminatedUnion("billingType", [
	z.strictObject({
		billingType: z.enum(["token"]),
		data: z.strictObject({
			plan: z.string(),
			billingMode: z.enum(["test"]).optional(),
			role: z.string(),
			billingCycle: z.strictObject({
				start: z.number(),
				end: z.number(),
			}),
			balance: z.strictObject({
				remaining: z.number(),
				total: z.number(),
			}),
			onDemand: z.strictObject({
				balance: z.number(),
				blocks: z
					.array(
						z.strictObject({
							expirationDate: z.number().optional(),
							effectiveDate: z.number(),
							originalBalance: z.number(),
							currentBalance: z.number(),
						}),
					)
					.optional(),
			}),
		}),
	}),
	z.strictObject({
		billingType: z.enum(["legacy"]),
		data: z.strictObject({
			remaining: z.number().optional(),
			reset: z.number().optional(),
			limit: z.number(),
		}),
	}),
]);

export const userGetBillingStatus401Schema = unauthorizedErrorSchema;

export const userGetBillingStatus403Schema = forbiddenErrorSchema;

export const userGetBillingStatus404Schema = notFoundErrorSchema;

export const userGetBillingStatus409Schema = conflictErrorSchema;

export const userGetBillingStatus413Schema = payloadTooLargeErrorSchema;

export const userGetBillingStatus422Schema = unprocessableEntityErrorSchema;

export const userGetBillingStatus429Schema = tooManyRequestsErrorSchema;

export const userGetBillingStatus500Schema = internalServerErrorSchema;

export const userGetBillingResponseSchema = userGetBillingStatus200Schema;

export const userGetBillingErrorSchema = z.union([
	userGetBillingStatus401Schema,
	userGetBillingStatus403Schema,
	userGetBillingStatus404Schema,
	userGetBillingStatus409Schema,
	userGetBillingStatus413Schema,
	userGetBillingStatus422Schema,
	userGetBillingStatus429Schema,
	userGetBillingStatus500Schema,
]);

export const userGetBillingQuerySchema = z.object({
	scope: z
		.string()
		.optional()
		.describe("Filters billing data by a specific scope, such as a project ID or slug."),
});

export const userGetPlanStatus200Schema = z.strictObject({
	object: z.enum(["plan"]),
	plan: z.string(),
	billingCycle: z.strictObject({
		start: z.number(),
		end: z.number(),
	}),
	balance: z.strictObject({
		remaining: z.number(),
		total: z.number(),
	}),
});

export const userGetPlanStatus401Schema = unauthorizedErrorSchema;

export const userGetPlanStatus403Schema = forbiddenErrorSchema;

export const userGetPlanStatus404Schema = notFoundErrorSchema;

export const userGetPlanStatus409Schema = conflictErrorSchema;

export const userGetPlanStatus413Schema = payloadTooLargeErrorSchema;

export const userGetPlanStatus422Schema = unprocessableEntityErrorSchema;

export const userGetPlanStatus429Schema = tooManyRequestsErrorSchema;

export const userGetPlanStatus500Schema = internalServerErrorSchema;

export const userGetPlanResponseSchema = userGetPlanStatus200Schema;

export const userGetPlanErrorSchema = z.union([
	userGetPlanStatus401Schema,
	userGetPlanStatus403Schema,
	userGetPlanStatus404Schema,
	userGetPlanStatus409Schema,
	userGetPlanStatus413Schema,
	userGetPlanStatus422Schema,
	userGetPlanStatus429Schema,
	userGetPlanStatus500Schema,
]);

export const userGetScopesStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(scopeSummarySchema),
});

export const userGetScopesStatus401Schema = unauthorizedErrorSchema;

export const userGetScopesStatus403Schema = forbiddenErrorSchema;

export const userGetScopesStatus404Schema = notFoundErrorSchema;

export const userGetScopesStatus409Schema = conflictErrorSchema;

export const userGetScopesStatus413Schema = payloadTooLargeErrorSchema;

export const userGetScopesStatus422Schema = unprocessableEntityErrorSchema;

export const userGetScopesStatus429Schema = tooManyRequestsErrorSchema;

export const userGetScopesStatus500Schema = internalServerErrorSchema;

export const userGetScopesResponseSchema = userGetScopesStatus200Schema;

export const userGetScopesErrorSchema = z.union([
	userGetScopesStatus401Schema,
	userGetScopesStatus403Schema,
	userGetScopesStatus404Schema,
	userGetScopesStatus409Schema,
	userGetScopesStatus413Schema,
	userGetScopesStatus422Schema,
	userGetScopesStatus429Schema,
	userGetScopesStatus500Schema,
]);

export const chatsRestorePathChatIdSchema = z
	.string()
	.describe("The unique identifier of the chat containing the version to restore.");

export const chatsRestorePathVersionIdSchema = z
	.string()
	.describe("The unique identifier of the version to restore.");

export const chatsRestoreStatus200Schema = versionDetailSchema.describe(
	"Detailed version data including file contents.",
);

export const chatsRestoreStatus401Schema = unauthorizedErrorSchema;

export const chatsRestoreStatus403Schema = forbiddenErrorSchema;

export const chatsRestoreStatus404Schema = notFoundErrorSchema;

export const chatsRestoreStatus409Schema = conflictErrorSchema;

export const chatsRestoreStatus413Schema = payloadTooLargeErrorSchema;

export const chatsRestoreStatus422Schema = unprocessableEntityErrorSchema;

export const chatsRestoreStatus429Schema = tooManyRequestsErrorSchema;

export const chatsRestoreStatus500Schema = internalServerErrorSchema;

export const chatsRestoreResponseSchema = chatsRestoreStatus200Schema;

export const chatsRestoreErrorSchema = z.union([
	chatsRestoreStatus401Schema,
	chatsRestoreStatus403Schema,
	chatsRestoreStatus404Schema,
	chatsRestoreStatus409Schema,
	chatsRestoreStatus413Schema,
	chatsRestoreStatus422Schema,
	chatsRestoreStatus429Schema,
	chatsRestoreStatus500Schema,
]);

export const chatsRestorePathSchema = z.object({
	chatId: z
		.string()
		.describe("The unique identifier of the chat containing the version to restore."),
	versionId: z.string().describe("The unique identifier of the version to restore."),
});

export const reportsGetUsageQueryStartDateSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe('Query parameter "startDate"');

export const reportsGetUsageQueryEndDateSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe('Query parameter "endDate"');

export const reportsGetUsageQueryChatIdSchema = z
	.string()
	.optional()
	.describe('Query parameter "chatId"');

export const reportsGetUsageQueryMessageIdSchema = z
	.string()
	.optional()
	.describe('Query parameter "messageId"');

export const reportsGetUsageQueryUserIdSchema = z
	.string()
	.optional()
	.describe('Query parameter "userId"');

export const reportsGetUsageQueryLimitSchema = z
	.number()
	.min(1)
	.max(150)
	.optional()
	.default(20)
	.describe(
		"Bounds the raw billing transactions scanned per ledger group and page. A page can contain more events than this value (large teams are scanned in parallel ledger groups), and a filtered page (chatId, userId, or messageId) can contain fewer or zero events while more data remains. Events are sorted newest-first within a page but not across pages on large teams. Always paginate with `pagination.hasMore` and `pagination.nextCursor` rather than stopping on an empty page.",
	);

export const reportsGetUsageQueryCursorSchema = z
	.string()
	.optional()
	.describe("Base64 encoded cursor containing pagination data");

export const reportsGetUsageStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(
		z.strictObject({
			id: z.string(),
			object: z.enum(["usage_event"]),
			type: z
				.enum([
					"api_request",
					"buy-template",
					"image_generation",
					"inline-edit",
					"manual_debit",
					"message",
					"refund_template_purchase",
					"reverse_template_sale",
				])
				.optional(),
			promptCost: z.string().optional(),
			completionCost: z.string().optional(),
			costBreakdownStatus: z
				.enum(["estimated", "unavailable"])
				.optional()
				.describe(
					"Whether the cost components are estimated or unavailable. Unavailable components are omitted; totalCost remains authoritative.",
				),
			totalCost: z.string(),
			chatId: z.string().optional(),
			messageId: z.string().optional(),
			userId: z.string().optional().describe("Deprecated - use user object instead"),
			user: userSummarySchemaSchema
				.optional()
				.describe("Details of the authenticated user, including profile and contact information."),
			createdAt: z.iso
				.datetime({ offset: true })
				.describe("The ISO timestamp representing when the usage event was created."),
		}),
	),
	pagination: z.strictObject({
		hasMore: z.boolean(),
		nextCursor: z.string().optional(),
		nextUrl: z.string().optional(),
	}),
	meta: z.strictObject({
		totalCount: z
			.number()
			.describe(
				"Number of events in THIS page only, counted after events are rolled up per message. Not a total across the query, and not a page size — do not use it to track progress or to decide whether to stop paginating. Use `pagination.hasMore` for that.",
			),
	}),
});

export const reportsGetUsageStatus401Schema = unauthorizedErrorSchema;

export const reportsGetUsageStatus403Schema = forbiddenErrorSchema;

export const reportsGetUsageStatus404Schema = notFoundErrorSchema;

export const reportsGetUsageStatus409Schema = conflictErrorSchema;

export const reportsGetUsageStatus413Schema = payloadTooLargeErrorSchema;

export const reportsGetUsageStatus422Schema = unprocessableEntityErrorSchema;

export const reportsGetUsageStatus429Schema = tooManyRequestsErrorSchema;

export const reportsGetUsageStatus500Schema = internalServerErrorSchema;

export const reportsGetUsageResponseSchema = reportsGetUsageStatus200Schema;

export const reportsGetUsageErrorSchema = z.union([
	reportsGetUsageStatus401Schema,
	reportsGetUsageStatus403Schema,
	reportsGetUsageStatus404Schema,
	reportsGetUsageStatus409Schema,
	reportsGetUsageStatus413Schema,
	reportsGetUsageStatus422Schema,
	reportsGetUsageStatus429Schema,
	reportsGetUsageStatus500Schema,
]);

export const reportsGetUsageQuerySchema = z.object({
	startDate: z.iso.datetime({ offset: true }).optional().describe('Query parameter "startDate"'),
	endDate: z.iso.datetime({ offset: true }).optional().describe('Query parameter "endDate"'),
	chatId: z.string().optional().describe('Query parameter "chatId"'),
	messageId: z.string().optional().describe('Query parameter "messageId"'),
	userId: z.string().optional().describe('Query parameter "userId"'),
	limit: z
		.number()
		.min(1)
		.max(150)
		.optional()
		.default(20)
		.describe(
			"Bounds the raw billing transactions scanned per ledger group and page. A page can contain more events than this value (large teams are scanned in parallel ledger groups), and a filtered page (chatId, userId, or messageId) can contain fewer or zero events while more data remains. Events are sorted newest-first within a page but not across pages on large teams. Always paginate with `pagination.hasMore` and `pagination.nextCursor` rather than stopping on an empty page.",
		),
	cursor: z.string().optional().describe("Base64 encoded cursor containing pagination data"),
});

export const reportsGetAIUsageQueryStartSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe("Inclusive start datetime filter.");

export const reportsGetAIUsageQueryEndSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe("Exclusive end datetime filter.");

export const reportsGetAIUsageQueryCursorSchema = z
	.string()
	.optional()
	.describe("Opaque cursor returned by a previous request for forward pagination.");

export const reportsGetAIUsageQueryLimitSchema = z
	.int()
	.min(1)
	.max(5000)
	.optional()
	.default(1000)
	.describe("Maximum number of rows to return.");

export const reportsGetAIUsageStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(
		z.strictObject({
			eventId: z.string(),
			modelId: z.string(),
			inputTokens: z.number(),
			outputTokens: z.number(),
			totalTokens: z.number(),
			cacheCreationInputTokens: z.number(),
			cacheCreationInputTokens1h: z.number().optional().default(0),
			cacheReadInputTokens: z.number(),
			timestamp: z.string(),
			requestId: z.string(),
			useCase: z.string(),
			chatId: z.string(),
			messageId: z.string(),
			userId: z.string(),
			userEmail: z.string(),
		}),
	),
	pagination: z.strictObject({
		nextCursor: z.string().nullable(),
	}),
	dateRange: z.strictObject({
		start: z.string().nullable(),
		end: z.string().nullable(),
	}),
});

export const reportsGetAIUsageStatus401Schema = unauthorizedErrorSchema;

export const reportsGetAIUsageStatus403Schema = forbiddenErrorSchema;

export const reportsGetAIUsageStatus404Schema = notFoundErrorSchema;

export const reportsGetAIUsageStatus409Schema = conflictErrorSchema;

export const reportsGetAIUsageStatus413Schema = payloadTooLargeErrorSchema;

export const reportsGetAIUsageStatus422Schema = unprocessableEntityErrorSchema;

export const reportsGetAIUsageStatus429Schema = tooManyRequestsErrorSchema;

export const reportsGetAIUsageStatus500Schema = internalServerErrorSchema;

export const reportsGetAIUsageResponseSchema = reportsGetAIUsageStatus200Schema;

export const reportsGetAIUsageErrorSchema = z.union([
	reportsGetAIUsageStatus401Schema,
	reportsGetAIUsageStatus403Schema,
	reportsGetAIUsageStatus404Schema,
	reportsGetAIUsageStatus409Schema,
	reportsGetAIUsageStatus413Schema,
	reportsGetAIUsageStatus422Schema,
	reportsGetAIUsageStatus429Schema,
	reportsGetAIUsageStatus500Schema,
]);

export const reportsGetAIUsageQuerySchema = z.object({
	start: z.iso.datetime({ offset: true }).optional().describe("Inclusive start datetime filter."),
	end: z.iso.datetime({ offset: true }).optional().describe("Exclusive end datetime filter."),
	cursor: z
		.string()
		.optional()
		.describe("Opaque cursor returned by a previous request for forward pagination."),
	limit: z
		.int()
		.min(1)
		.max(5000)
		.optional()
		.default(1000)
		.describe("Maximum number of rows to return."),
});

export const reportsGetUserActivityQueryStartDateSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe("Inclusive ISO timestamp lower bound for activity.");

export const reportsGetUserActivityQueryEndDateSchema = z.iso
	.datetime({ offset: true })
	.optional()
	.describe(
		"Exclusive ISO timestamp upper bound for activity. Pass the end of the last day (e.g. 23:59:59.999) to include it.",
	);

export const reportsGetUserActivityStatus200Schema = z.strictObject({
	object: z.enum(["list"]),
	data: z.array(
		z.strictObject({
			id: z.string(),
			object: z.enum(["user_activity"]),
			user: z.strictObject({
				id: z.string().describe("A unique identifier for the user."),
				object: z.enum(["user"]).describe("Fixed value identifying this object as a user."),
				name: z.string().optional().describe("Optional full name of the user."),
				email: z.string().describe("The user's email address."),
				avatar: z.string().describe("URL to the user's avatar image."),
				createdAt: z.iso
					.datetime({ offset: true })
					.describe("The ISO timestamp representing when the user was created."),
				updatedAt: z.iso
					.datetime({ offset: true })
					.optional()
					.describe("The ISO timestamp of the last update to the user."),
				teamV0Role: z
					.union([z.enum(["V0Builder", "V0Chatter", "V0Viewer"]), z.null()])
					.describe("The user's v0 role"),
			}),
			chatCount: z.number().describe("Total number of chats created by the user"),
			messageCount: z.number().describe("Total number of messages sent by the user"),
			activeDays: z.number().describe("Number of distinct days the user was active"),
			firstActivity: z
				.union([z.iso.datetime({ offset: true }), z.null()])
				.describe("Timestamp of the user's first activity"),
			lastActivity: z
				.union([z.iso.datetime({ offset: true }), z.null()])
				.describe("Timestamp of the user's last activity"),
		}),
	),
	meta: z.strictObject({
		totalCount: z.number(),
		dateRange: z.strictObject({
			start: z.union([z.iso.datetime({ offset: true }), z.null()]),
			end: z.union([z.iso.datetime({ offset: true }), z.null()]),
		}),
	}),
});

export const reportsGetUserActivityStatus401Schema = unauthorizedErrorSchema;

export const reportsGetUserActivityStatus403Schema = forbiddenErrorSchema;

export const reportsGetUserActivityStatus404Schema = notFoundErrorSchema;

export const reportsGetUserActivityStatus409Schema = conflictErrorSchema;

export const reportsGetUserActivityStatus413Schema = payloadTooLargeErrorSchema;

export const reportsGetUserActivityStatus422Schema = unprocessableEntityErrorSchema;

export const reportsGetUserActivityStatus429Schema = tooManyRequestsErrorSchema;

export const reportsGetUserActivityStatus500Schema = internalServerErrorSchema;

export const reportsGetUserActivityResponseSchema = reportsGetUserActivityStatus200Schema;

export const reportsGetUserActivityErrorSchema = z.union([
	reportsGetUserActivityStatus401Schema,
	reportsGetUserActivityStatus403Schema,
	reportsGetUserActivityStatus404Schema,
	reportsGetUserActivityStatus409Schema,
	reportsGetUserActivityStatus413Schema,
	reportsGetUserActivityStatus422Schema,
	reportsGetUserActivityStatus429Schema,
	reportsGetUserActivityStatus500Schema,
]);

export const reportsGetUserActivityQuerySchema = z.object({
	startDate: z.iso
		.datetime({ offset: true })
		.optional()
		.describe("Inclusive ISO timestamp lower bound for activity."),
	endDate: z.iso
		.datetime({ offset: true })
		.optional()
		.describe(
			"Exclusive ISO timestamp upper bound for activity. Pass the end of the last day (e.g. 23:59:59.999) to include it.",
		),
});

export const mcpServersFindStatus200Schema = z
	.strictObject({
		object: z.enum(["list"]),
		data: z.array(
			z.strictObject({
				object: z.enum(["mcp_server"]).describe("The object type."),
				id: z.string().describe("The unique identifier for the MCP server."),
				name: z.string().describe("The display name of the MCP server."),
				url: z.url().describe("The URL of the MCP server."),
				description: z.string().optional().describe("An optional description of the MCP server."),
				enabled: z.boolean().describe("Whether the MCP server is enabled for use in chats."),
				auth: z
					.strictObject({
						type: z
							.enum(["bearer", "custom-headers", "none", "oauth"])
							.describe("The type of authentication configured."),
					})
					.describe(
						"Authentication type for the MCP server. Sensitive values like tokens and headers are not returned.",
					),
				scope: z.enum(["team", "user"]).describe("The scope of the MCP server (user or team)."),
				createdAt: z.iso
					.datetime({ offset: true })
					.describe("The ISO timestamp when the MCP server was created."),
				updatedAt: z.iso
					.datetime({ offset: true })
					.optional()
					.describe("The ISO timestamp when the MCP server was last updated."),
			}),
		),
	})
	.describe("List of MCP servers for the authenticated user.");

export const mcpServersFindStatus401Schema = unauthorizedErrorSchema;

export const mcpServersFindStatus403Schema = forbiddenErrorSchema;

export const mcpServersFindStatus404Schema = notFoundErrorSchema;

export const mcpServersFindStatus409Schema = conflictErrorSchema;

export const mcpServersFindStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersFindStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersFindStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersFindStatus500Schema = internalServerErrorSchema;

export const mcpServersFindResponseSchema = mcpServersFindStatus200Schema;

export const mcpServersFindErrorSchema = z.union([
	mcpServersFindStatus401Schema,
	mcpServersFindStatus403Schema,
	mcpServersFindStatus404Schema,
	mcpServersFindStatus409Schema,
	mcpServersFindStatus413Schema,
	mcpServersFindStatus422Schema,
	mcpServersFindStatus429Schema,
	mcpServersFindStatus500Schema,
]);

export const mcpServersCreateStatus200Schema = z
	.strictObject({
		object: z.enum(["mcp_server"]).describe("The object type."),
		id: z.string().describe("The unique identifier for the MCP server."),
		name: z.string().describe("The display name of the MCP server."),
		url: z.url().describe("The URL of the MCP server."),
		description: z.string().optional().describe("An optional description of the MCP server."),
		enabled: z.boolean().describe("Whether the MCP server is enabled for use in chats."),
		auth: z
			.strictObject({
				type: z
					.enum(["bearer", "custom-headers", "none", "oauth"])
					.describe("The type of authentication configured."),
			})
			.describe(
				"Authentication type for the MCP server. Sensitive values like tokens and headers are not returned.",
			),
		scope: z.enum(["team", "user"]).describe("The scope of the MCP server (user or team)."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp when the MCP server was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp when the MCP server was last updated."),
	})
	.describe("Summary information about an MCP server.");

export const mcpServersCreateStatus401Schema = unauthorizedErrorSchema;

export const mcpServersCreateStatus403Schema = forbiddenErrorSchema;

export const mcpServersCreateStatus404Schema = notFoundErrorSchema;

export const mcpServersCreateStatus409Schema = conflictErrorSchema;

export const mcpServersCreateStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersCreateStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersCreateStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersCreateStatus500Schema = internalServerErrorSchema;

export const mcpServersCreateResponseSchema = mcpServersCreateStatus200Schema;

export const mcpServersCreateErrorSchema = z.union([
	mcpServersCreateStatus401Schema,
	mcpServersCreateStatus403Schema,
	mcpServersCreateStatus404Schema,
	mcpServersCreateStatus409Schema,
	mcpServersCreateStatus413Schema,
	mcpServersCreateStatus422Schema,
	mcpServersCreateStatus429Schema,
	mcpServersCreateStatus500Schema,
]);

export const mcpServersCreateBodySchema = z.strictObject({
	name: z.string().min(1).max(100).describe("The display name of the MCP server."),
	url: z.url().max(500).describe("The URL of the MCP server. Must be HTTPS in production."),
	description: z
		.string()
		.max(500)
		.optional()
		.describe("An optional description of the MCP server."),
	enabled: z
		.boolean()
		.optional()
		.default(true)
		.describe("Whether the MCP server is enabled. Defaults to true."),
	auth: z
		.discriminatedUnion("type", [
			z.strictObject({
				type: z.enum(["none"]).describe("No authentication required."),
			}),
			z.strictObject({
				type: z.enum(["bearer"]).describe("Bearer token authentication."),
				token: z.string().min(1).max(1000).describe("The bearer token for authentication."),
			}),
			z.strictObject({
				type: z.enum(["custom-headers"]).describe("Custom headers authentication."),
				headers: z
					.record(z.string().max(100), z.string().max(500))
					.describe("Key-value pairs of custom headers to include in requests."),
			}),
			z.strictObject({
				type: z.enum(["oauth"]).describe("OAuth 2.1 authentication."),
				config: z
					.strictObject({
						authorizationUrl: z.url().describe("The OAuth authorization endpoint URL."),
						tokenUrl: z.url().describe("The OAuth token endpoint URL."),
						registrationUrl: z
							.url()
							.optional()
							.describe("The optional dynamic client registration endpoint URL."),
						clientId: z.string().min(1).describe("The OAuth client ID."),
						clientSecret: z
							.string()
							.optional()
							.describe(
								"The optional OAuth client secret. This value is stored securely and is never returned by the API.",
							),
						scopes: z
							.array(z.string())
							.optional()
							.default([])
							.describe("OAuth scopes to request during authorization."),
						usePKCE: z
							.boolean()
							.optional()
							.default(true)
							.describe("Whether to use PKCE for the authorization code flow."),
						issuer: z
							.string()
							.optional()
							.describe("The optional issuer identifier for mix-up protection."),
						resource: z
							.string()
							.optional()
							.describe(
								"The optional RFC 8707 resource indicator. For MCP servers, this is usually the MCP server URL.",
							),
						clientIdMetadataDocumentSupported: z
							.boolean()
							.optional()
							.describe("Whether the authorization server supports Client ID Metadata Documents."),
					})
					.describe("OAuth configuration for the MCP server."),
			}),
		])
		.optional()
		.default({ type: "none" })
		.describe("Authentication configuration. Defaults to no authentication."),
	scope: z
		.enum(["team", "user"])
		.optional()
		.default("user")
		.describe("The scope of the MCP server. Defaults to user."),
});

export const mcpServersGetByIdPathMcpServerIdSchema = z
	.string()
	.describe("The ID of the MCP server to retrieve.");

export const mcpServersGetByIdStatus200Schema = z
	.strictObject({
		object: z.enum(["mcp_server"]).describe("The object type."),
		id: z.string().describe("The unique identifier for the MCP server."),
		name: z.string().describe("The display name of the MCP server."),
		url: z.url().describe("The URL of the MCP server."),
		description: z.string().optional().describe("An optional description of the MCP server."),
		enabled: z.boolean().describe("Whether the MCP server is enabled for use in chats."),
		auth: z
			.strictObject({
				type: z
					.enum(["bearer", "custom-headers", "none", "oauth"])
					.describe("The type of authentication configured."),
			})
			.describe(
				"Authentication type for the MCP server. Sensitive values like tokens and headers are not returned.",
			),
		scope: z.enum(["team", "user"]).describe("The scope of the MCP server (user or team)."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp when the MCP server was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp when the MCP server was last updated."),
	})
	.describe("Summary information about an MCP server.");

export const mcpServersGetByIdStatus401Schema = unauthorizedErrorSchema;

export const mcpServersGetByIdStatus403Schema = forbiddenErrorSchema;

export const mcpServersGetByIdStatus404Schema = notFoundErrorSchema;

export const mcpServersGetByIdStatus409Schema = conflictErrorSchema;

export const mcpServersGetByIdStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersGetByIdStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersGetByIdStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersGetByIdStatus500Schema = internalServerErrorSchema;

export const mcpServersGetByIdResponseSchema = mcpServersGetByIdStatus200Schema;

export const mcpServersGetByIdErrorSchema = z.union([
	mcpServersGetByIdStatus401Schema,
	mcpServersGetByIdStatus403Schema,
	mcpServersGetByIdStatus404Schema,
	mcpServersGetByIdStatus409Schema,
	mcpServersGetByIdStatus413Schema,
	mcpServersGetByIdStatus422Schema,
	mcpServersGetByIdStatus429Schema,
	mcpServersGetByIdStatus500Schema,
]);

export const mcpServersGetByIdPathSchema = z.object({
	mcpServerId: z.string().describe("The ID of the MCP server to retrieve."),
});

export const mcpServersUpdatePathMcpServerIdSchema = z
	.string()
	.describe("The ID of the MCP server to update.");

export const mcpServersUpdateStatus200Schema = z
	.strictObject({
		object: z.enum(["mcp_server"]).describe("The object type."),
		id: z.string().describe("The unique identifier for the MCP server."),
		name: z.string().describe("The display name of the MCP server."),
		url: z.url().describe("The URL of the MCP server."),
		description: z.string().optional().describe("An optional description of the MCP server."),
		enabled: z.boolean().describe("Whether the MCP server is enabled for use in chats."),
		auth: z
			.strictObject({
				type: z
					.enum(["bearer", "custom-headers", "none", "oauth"])
					.describe("The type of authentication configured."),
			})
			.describe(
				"Authentication type for the MCP server. Sensitive values like tokens and headers are not returned.",
			),
		scope: z.enum(["team", "user"]).describe("The scope of the MCP server (user or team)."),
		createdAt: z.iso
			.datetime({ offset: true })
			.describe("The ISO timestamp when the MCP server was created."),
		updatedAt: z.iso
			.datetime({ offset: true })
			.optional()
			.describe("The ISO timestamp when the MCP server was last updated."),
	})
	.describe("Summary information about an MCP server.");

export const mcpServersUpdateStatus401Schema = unauthorizedErrorSchema;

export const mcpServersUpdateStatus403Schema = forbiddenErrorSchema;

export const mcpServersUpdateStatus404Schema = notFoundErrorSchema;

export const mcpServersUpdateStatus409Schema = conflictErrorSchema;

export const mcpServersUpdateStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersUpdateStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersUpdateStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersUpdateStatus500Schema = internalServerErrorSchema;

export const mcpServersUpdateResponseSchema = mcpServersUpdateStatus200Schema;

export const mcpServersUpdateErrorSchema = z.union([
	mcpServersUpdateStatus401Schema,
	mcpServersUpdateStatus403Schema,
	mcpServersUpdateStatus404Schema,
	mcpServersUpdateStatus409Schema,
	mcpServersUpdateStatus413Schema,
	mcpServersUpdateStatus422Schema,
	mcpServersUpdateStatus429Schema,
	mcpServersUpdateStatus500Schema,
]);

export const mcpServersUpdateBodySchema = z.strictObject({
	name: z.string().min(1).max(100).optional().describe("The display name of the MCP server."),
	url: z.url().max(500).optional().describe("The URL of the MCP server."),
	description: z
		.string()
		.max(500)
		.optional()
		.describe("An optional description of the MCP server."),
	enabled: z.boolean().optional().describe("Whether the MCP server is enabled."),
	auth: z
		.discriminatedUnion("type", [
			z.strictObject({
				type: z.enum(["none"]).describe("No authentication required."),
			}),
			z.strictObject({
				type: z.enum(["bearer"]).describe("Bearer token authentication."),
				token: z.string().min(1).max(1000).describe("The bearer token for authentication."),
			}),
			z.strictObject({
				type: z.enum(["custom-headers"]).describe("Custom headers authentication."),
				headers: z
					.record(z.string().max(100), z.string().max(500))
					.describe("Key-value pairs of custom headers to include in requests."),
			}),
			z.strictObject({
				type: z.enum(["oauth"]).describe("OAuth 2.1 authentication."),
				config: z
					.strictObject({
						authorizationUrl: z.url().describe("The OAuth authorization endpoint URL."),
						tokenUrl: z.url().describe("The OAuth token endpoint URL."),
						registrationUrl: z
							.url()
							.optional()
							.describe("The optional dynamic client registration endpoint URL."),
						clientId: z.string().min(1).describe("The OAuth client ID."),
						clientSecret: z
							.string()
							.optional()
							.describe(
								"The optional OAuth client secret. This value is stored securely and is never returned by the API.",
							),
						scopes: z
							.array(z.string())
							.optional()
							.default([])
							.describe("OAuth scopes to request during authorization."),
						usePKCE: z
							.boolean()
							.optional()
							.default(true)
							.describe("Whether to use PKCE for the authorization code flow."),
						issuer: z
							.string()
							.optional()
							.describe("The optional issuer identifier for mix-up protection."),
						resource: z
							.string()
							.optional()
							.describe(
								"The optional RFC 8707 resource indicator. For MCP servers, this is usually the MCP server URL.",
							),
						clientIdMetadataDocumentSupported: z
							.boolean()
							.optional()
							.describe("Whether the authorization server supports Client ID Metadata Documents."),
					})
					.describe("OAuth configuration for the MCP server."),
			}),
		])
		.optional()
		.describe("Authentication configuration."),
	scope: z.enum(["team", "user"]).optional().describe("The scope of the MCP server."),
});

export const mcpServersUpdatePathSchema = z.object({
	mcpServerId: z.string().describe("The ID of the MCP server to update."),
});

export const mcpServersDeletePathMcpServerIdSchema = z
	.string()
	.describe("The ID of the MCP server to delete.");

export const mcpServersDeleteStatus200Schema = z.strictObject({
	object: z.enum(["mcp_server"]),
	id: z.string().describe("The ID of the deleted MCP server."),
	deleted: z.literal(true).describe("Indicates the server was deleted."),
});

export const mcpServersDeleteStatus401Schema = unauthorizedErrorSchema;

export const mcpServersDeleteStatus403Schema = forbiddenErrorSchema;

export const mcpServersDeleteStatus404Schema = notFoundErrorSchema;

export const mcpServersDeleteStatus409Schema = conflictErrorSchema;

export const mcpServersDeleteStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersDeleteStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersDeleteStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersDeleteStatus500Schema = internalServerErrorSchema;

export const mcpServersDeleteResponseSchema = mcpServersDeleteStatus200Schema;

export const mcpServersDeleteErrorSchema = z.union([
	mcpServersDeleteStatus401Schema,
	mcpServersDeleteStatus403Schema,
	mcpServersDeleteStatus404Schema,
	mcpServersDeleteStatus409Schema,
	mcpServersDeleteStatus413Schema,
	mcpServersDeleteStatus422Schema,
	mcpServersDeleteStatus429Schema,
	mcpServersDeleteStatus500Schema,
]);

export const mcpServersDeletePathSchema = z.object({
	mcpServerId: z.string().describe("The ID of the MCP server to delete."),
});

export const mcpServersCreateOAuthAuthorizationUrlPathMcpServerIdSchema = z
	.string()
	.describe("The ID of the OAuth MCP server to authorize.");

export const mcpServersCreateOAuthAuthorizationUrlStatus200Schema = z.strictObject({
	object: z.enum(["mcp_server_oauth_authorization"]).describe("The object type."),
	mcpServerId: z.string().describe("The MCP server being authorized."),
	url: z.url().describe("The provider authorization URL to redirect the user to."),
	state: z.string().describe("The OAuth state value. This expires after 5 minutes."),
	expiresAt: z.iso
		.datetime({ offset: true })
		.describe("The ISO timestamp when the authorization URL expires."),
});

export const mcpServersCreateOAuthAuthorizationUrlStatus401Schema = unauthorizedErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus403Schema = forbiddenErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus404Schema = notFoundErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus409Schema = conflictErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus413Schema = payloadTooLargeErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus422Schema = unprocessableEntityErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus429Schema = tooManyRequestsErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlStatus500Schema = internalServerErrorSchema;

export const mcpServersCreateOAuthAuthorizationUrlResponseSchema =
	mcpServersCreateOAuthAuthorizationUrlStatus200Schema;

export const mcpServersCreateOAuthAuthorizationUrlErrorSchema = z.union([
	mcpServersCreateOAuthAuthorizationUrlStatus401Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus403Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus404Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus409Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus413Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus422Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus429Schema,
	mcpServersCreateOAuthAuthorizationUrlStatus500Schema,
]);

export const mcpServersCreateOAuthAuthorizationUrlBodySchema = z.strictObject({
	returnUrl: z
		.url()
		.describe(
			"An absolute URL in your application where v0 redirects after OAuth completes. HTTPS is required in production.",
		),
});

export const mcpServersCreateOAuthAuthorizationUrlPathSchema = z.object({
	mcpServerId: z.string().describe("The ID of the OAuth MCP server to authorize."),
});
