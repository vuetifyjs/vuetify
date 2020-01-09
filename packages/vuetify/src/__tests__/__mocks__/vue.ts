export * from 'vue'

export function inject () {
  return Symbol.for('vuetify')
}
