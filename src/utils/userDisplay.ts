export function getUserNickname(name?: string | null): string {
  const trimmedName = name?.trim()

  if (!trimmedName) {
    return "Usuario"
  }

  return trimmedName.split(/\s+/)[0]
}

export function getUserInitial(name?: string | null): string {
  return getUserNickname(name).charAt(0).toUpperCase()
}
