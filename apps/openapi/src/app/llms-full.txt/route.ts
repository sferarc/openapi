import { buildLlmsFullTxt, textResponse } from "../../lib/llms";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
	return textResponse(await buildLlmsFullTxt());
}
