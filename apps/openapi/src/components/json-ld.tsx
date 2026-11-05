import { type SoftwareSourceCode, serializeJsonLd } from "@/lib/structured-data";

export function JsonLd({ data }: { data: SoftwareSourceCode }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
		/>
	);
}
