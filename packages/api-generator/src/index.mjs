import { createVuetify } from 'vuetify'
import { components as VuetifyComponents } from 'vuetify/dist/vuetify.esm.mjs'
import { createApp } from 'vue'
import { writeJsonFile } from './helpers/write.js'

const app = createApp()
const vuetify = createVuetify({ components: VuetifyComponents })

app.use(vuetify)

function wrapInArray (variable) {
  return Array.isArray(variable) ? variable : [variable]
}

function getDefaultValue (prop, types) {
  return undefined
}

function getType (prop) {
  // boolean | string | number | object | array
  if (typeof prop === 'string' && prop.length > 0) return prop
  // { prop: Boolean }
  if (typeof prop === 'function') return getType(prop())
  // { prop: { type: Boolean }}
  if (typeof prop?.type === 'function') return getType(prop.type())
  // { prop: [Boolean, String] }
  if (Array.isArray(prop)) return prop.map(getType)
  // { prop: { type: [Boolean, String] } }
  if (Array.isArray(prop?.type)) return prop.type.map(getType)

  return typeof prop
}

function parseProps (props) {
  const parsed = []

  for (const key in props) {
    if (
      key.startsWith('_') ||
      ['name'].includes(key)
    ) continue

    const prop = props[key]
    const types = wrapInArray(getType(prop))

    parsed.push({
      name: key,
      default: getDefaultValue(prop, types),
      types,
      source: prop?.source
    })
  }

  return parsed
}

function parseEmits (emits) {
  return emits
}

const context = app._context

const components = {}

for (const key in context.components) {
  const component = context.components[key]
  const name = component.name
  const props = parseProps(component.props)
  const emits = parseEmits(component.emits)

  if (key !== 'VAppBar') continue

  components[key] = {
    props,
    emits,
    name,
  }
}

writeJsonFile(components, 'dist/test.json')
