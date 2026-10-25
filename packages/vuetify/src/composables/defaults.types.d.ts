export type DefaultsOptions = Partial<DefaultsInstance>

export type DefaultsInstance = undefined | {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export {}
