import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const DATABASE_TIMEOUT_MS = 3000;

async function checkDatabase(): Promise<"ok" | "error"> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(
			() => reject(new Error(`select 1 did not finish within ${DATABASE_TIMEOUT_MS}ms`)),
			DATABASE_TIMEOUT_MS,
		);
	});

	try {
		await Promise.race([db.execute(sql`select 1`), timeout]);
		return "ok";
	} catch (error) {
		// Drizzle wraps the driver error, so the reason (DNS, refused, auth) is on `cause`.
		const cause = error instanceof Error && error.cause instanceof Error ? error.cause : error;
		const name = cause instanceof Error ? cause.name : "UnknownError";
		const message = cause instanceof Error ? cause.message : String(cause);
		console.error(JSON.stringify({ check: "database", error: name, message }));
		return "error";
	} finally {
		clearTimeout(timer);
	}
}

export async function GET() {
	const database = await checkDatabase();
	const healthy = database === "ok";

	return Response.json(
		{ status: healthy ? "ok" : "error", checks: { database } },
		{ status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } },
	);
}
