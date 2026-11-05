const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
const countFormat = new Intl.NumberFormat("en-US");

/** Fixed locale and time zone so the server HTML and the client render agree. */
export function formatPublishDate(iso: string): string | undefined {
	const date = new Date(iso);
	return Number.isNaN(date.getTime()) ? undefined : dateFormat.format(date);
}

export function formatDownloads(count: number): string {
	return countFormat.format(count);
}
