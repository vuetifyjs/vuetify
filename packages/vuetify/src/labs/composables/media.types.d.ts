export type MediaSeekStep = number | readonly [number, number]

export type MediaSeekTarget = { to: number | string } | { by: number | string }
