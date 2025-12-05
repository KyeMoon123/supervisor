import "server-only";
import { z } from "zod";
export function parseSearchParams<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
): z.infer<T> {
  const url = new URL(req.url);
  const rawParams = Object.fromEntries(url.searchParams.entries());

  return schema.parse(rawParams); // throws if invalid
}

export async function parseRequestBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
): Promise<z.infer<T>> {
  const body = await req.json();
  return schema.parse(body);
}

export async function parseRequestParams<T extends z.ZodTypeAny>(
  params: Record<string, string | string[] | undefined>, // The `context.params` object
  schema: T
): Promise<z.infer<T>> {
  const awaitedParams = await params;
  return schema.parse(awaitedParams);
}
