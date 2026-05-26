export function getFirstValidationMessage(
  errors: Record<string, string | undefined>,
): string | null {
  return Object.values(errors).find((message) => Boolean(message)) ?? null
}
