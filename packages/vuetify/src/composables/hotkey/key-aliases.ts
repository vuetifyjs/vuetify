/**
 * Centralized key alias mapping for consistent key normalization across the hotkey system.
 *
 * This maps various user-friendly aliases to canonical key names that match
 * KeyboardEvent.key values (in lowercase) where possible.
 */
export const keyAliasMap: Record<string, string> = {
  // Modifier aliases (from vue-use, other libraries, and current implementation)
  control: 'ctrl',
  command: 'cmd',
  option: 'alt',

  // Arrow key aliases (common abbreviations)
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',

  // Other common key aliases
  esc: 'escape',
  spacebar: ' ',
  space: ' ',
  return: 'enter',
  del: 'delete',

  // Symbol aliases (existing from hotkey-parsing.ts)
  minus: '-',
  hyphen: '-',
}

/**
 * Normalizes a key string to its canonical form using the alias map.
 *
 * @param key - The key string to normalize
 * @returns The canonical key name in lowercase
 */
export function normalizeKey (key: string): string {
  const lowerKey = key.toLowerCase()
  return keyAliasMap[lowerKey] || lowerKey
}
