/** Error detail. */
export type ErrorDetailDto = Readonly<{
	code: string;
	detail: string;
	attr: string | null;
}>;
