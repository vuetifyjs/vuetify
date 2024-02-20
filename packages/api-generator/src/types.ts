import type { Node, Type } from 'ts-morph'
import { Project, ts } from 'ts-morph'
import { prettifyType } from './utils'
import { kebabCase } from './helpers/text'

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
})

async function inspect (project: Project, node?: Node<ts.Node>) {
  if (!node) throw new Error('No node provided')

  const kind = node.getKind()

  if (kind === ts.SyntaxKind.TypeAliasDeclaration) {
    const definition = generateDefinition(node, [], project) as ObjectDefinition
    if (definition.properties) {
      definition.properties = Object.fromEntries(
        await Promise.all(
          Object.entries(definition.properties)
            // Exclude private properties
            .filter(([name]) => !name.startsWith('$') && !name.startsWith('_') && !name.startsWith('Ψ'))
            .map(async ([name, prop]) => [name, await prettifyType(name, prop)])
        )
      )
    }
    return definition
  }

  throw new Error(`Unsupported node kind: ${kind}`)
}

export async function generateComposableDataFromTypes (): Promise<ComposableData[]> {
  const sourceFile = project.addSourceFileAtPath('./templates/composables.d.ts')

  const composables = await inspect(project, sourceFile.getTypeAlias('Composables'))

  return Promise.all(
    Object.entries(composables.properties).map(async ([name, data]) => {
      const returnType = (data as FunctionDefinition).returnType
      let exposed: Record<string, Definition> = {}
      if (returnType.type === 'allOf') {
        exposed = returnType.items.reduce((acc, item) => {
          const props = (item as ObjectDefinition).properties
          Object.assign(acc, props)
          return acc
        }, {})
      } else if (returnType.type === 'object') {
        exposed = returnType.properties
      }
      if (exposed) {
        exposed = Object.fromEntries(
          await Promise.all(
            Object.entries(exposed)
              .map(async ([name, prop]) => [name, await prettifyType(name, prop)])
          )
        )
      }

      const kebabName = kebabCase(name)

      return {
        fileName: name,
        displayName: name,
        pathName: kebabName,
        exposed,
      }
    })
  )
}

export async function generateDirectiveDataFromTypes (): Promise<DirectiveData[]> {
  const sourceFile = project.addSourceFileAtPath('./templates/directives.d.ts')

  const directives = await inspect(project, sourceFile.getTypeAlias('Directives'))

  return Promise.all(
    Object.entries(directives.properties).map(async ([name, data]) => {
      const kebabName = kebabCase(name)
      return {
        fileName: `v-${kebabName}`,
        displayName: `v-${kebabName}`,
        pathName: `v-${kebabName}-directive`,
        argument: { value: await prettifyType(name, (data as ObjectDefinition).properties.value) },
        modifiers: ((data as ObjectDefinition).properties.modifiers as ObjectDefinition).properties,
      }
    })
  )
}

export async function generateComponentDataFromTypes (component: string): Promise<ComponentData> {
  const sourceFile = project.addSourceFileAtPath(`./templates/tmp/${component}.d.ts`)

  const props = await inspect(project, sourceFile.getTypeAlias('ComponentProps'))
  const events = await inspect(project, sourceFile.getTypeAlias('ComponentEvents'))
  const slots = await inspect(project, sourceFile.getTypeAlias('ComponentSlots'))
  const exposed = await inspect(project, sourceFile.getTypeAlias('ComponentExposed'))

  const sections = [props, events, slots, exposed]

  sections.forEach(item => {
    item.text = undefined!
    item.source = undefined
  })

  for (const [name, { formatted }] of Object.entries(props.properties)) {
    if (formatted.length > 400) {
      console.log(`\x1b[33mLong prop type (${formatted.length}): ${component}.${name}\x1b[0m`)
    }
  }

  return {
    props: props.properties,
    events: events.properties,
    slots: slots.properties,
    exposed: exposed.properties,
  }
}

type BaseDefinition = {
  text: string
  formatted: string
  source?: string
  description?: Record<string, string>
  descriptionSource?: Record<string, string>
  default?: string
  optional?: boolean
}

export type ObjectDefinition = {
  type: 'object'
  properties: Record<string, Definition>
} & BaseDefinition

type BooleanDefinition = {
  type: 'boolean'
  literal?: string
} & BaseDefinition

type StringDefinition = {
  type: 'string'
  literal?: string
} & BaseDefinition

type NumberDefinition = {
  type: 'number'
  literal?: string
} & BaseDefinition

type UnionDefinition = {
  type: 'anyOf'
  items: Definition[]
} & BaseDefinition

type IntersectionDefinition = {
  type: 'allOf'
  items: Definition[]
} & BaseDefinition

type ArrayDefinition = {
  type: 'array'
  items: Definition[]
  length?: number
} & BaseDefinition

type FunctionDefinition = {
  type: 'function'
  parameters: NamedDefinition[]
  returnType: Definition
} & BaseDefinition

type RefDefinition = {
  type: 'ref'
  ref: string
} & BaseDefinition

type ConstructorDefinition = {
  type: 'constructor'
} & BaseDefinition

type RecordDefinition = {
  type: 'record'
  key: Definition
  value: Definition
} & BaseDefinition

type InterfaceDefinition = {
  type: 'interface'
  name: string
  parameters: NamedDefinition[]
} & BaseDefinition

type NamedDefinition = Definition & { name: string }

export type Definition =
  | ObjectDefinition
  | BooleanDefinition
  | StringDefinition
  | NumberDefinition
  | UnionDefinition
  | IntersectionDefinition
  | ArrayDefinition
  | FunctionDefinition
  | RefDefinition
  | ConstructorDefinition
  | RecordDefinition
  | InterfaceDefinition

export type BaseData = {
  displayName: string // user visible name used in page titles
  fileName: string // file name for translation strings and generated types
  pathName: string // kebab-case name for use in urls
}
export type ComponentData = BaseData & {
  sass: Record<string, { default: string }>
  props: Record<string, Definition>
  slots: Record<string, Definition>
  events: Record<string, Definition>
  exposed: Record<string, Definition>
  argument?: never
  modifiers?: never
}
export type DirectiveData = BaseData & {
  sass?: never
  props?: never
  slots?: never
  events?: never
  exposed?: never
  argument: { value: Definition }
  modifiers: Record<string, Definition>
}
export type ComposableData = BaseData & {
  sass?: never
  props?: never
  slots?: never
  events?: never
  exposed: Record<string, Definition>
  argument?: never
  modifiers?: never
}
export type PartData = ComponentData | DirectiveData | ComposableData

function isExternalDeclaration (declaration?: Node<ts.Node>, definitionText?: string) {
  const filePath = declaration?.getSourceFile().getFilePath()

  // Some internal typescript types should be processed (Array etc)
  if (filePath?.includes('/typescript/lib/') && (
    definitionText?.endsWith('[]') ||
    /(Record|Map|Set|NonNullable)<.*?>/.test(definitionText ?? '')
  )) return false

  if (filePath?.includes('/@vue/') && /^ToRefs<.*?>/.test(definitionText!)) {
    return false
  }

  return filePath?.includes('/node_modules/')
}

function getSource (declaration?: Node<ts.Node>) {
  const filePath = declaration?.getSourceFile().getFilePath()
    .replace(/.*\/node_modules\//, '')
    .replace(/.*\/packages\/vuetify\//, 'vuetify/')
  const startLine = declaration?.getStartLineNumber()
  const endLine = declaration?.getEndLineNumber()

  if (!filePath || !startLine || filePath.startsWith(process.cwd())) return undefined

  return filePath && startLine ? `${filePath}#L${startLine}-L${endLine}` : undefined
}

function listFlags (flags: object, value?: number) {
  if (!value) return []

  const entries = Object.entries(flags).filter(([_, flag]) => typeof flag === 'number')

  return entries.reduce<string[]>((arr, [name, flag]) => {
    if (value & flag) {
      arr.push(name)
    }
    return arr
  }, [])
}

function getCleanText (text: string) {
  return text.replaceAll(/import\(.*?\)\./g, '')
}

function count (arr: string[], needle: string) {
  return arr.reduce((count, str) => {
    return str === needle ? count + 1 : count
  }, 0)
}

// Types that are displayed as links
const allowedRefs = [
  'Anchor',
  'DataIteratorItem',
  'DataTableHeader',
  'DataTableItem',
  'FilterFunction',
  'FormValidationResult',
  'Group',
  'InternalDataTableHeader',
  'ListItem',
  'LocationStrategyFn',
  'OpenSelectStrategyFn',
  'OpenStrategyFn',
  'ScrollStrategyFn',
  'SelectItemKey',
  'SelectStrategyFn',
  'SortItem',
  'SubmitEventPromise',
  'TouchHandlers',
  'ValidationRule',
]

// Types that displayed without their generic arguments
const plainRefs = [
  'Component',
  'ComponentPublicInstance',
  'ComponentInternalInstance',
  'FunctionalComponent',
  'DataTableItem',
  'ListItem',
  'Group',
  'DataIteratorItem',
]

function formatDefinition (definition: Definition) {
  let formatted = ''

  switch (definition.type) {
    case 'allOf':
      formatted = `${definition.items.map(item => item.formatted).join(' & ')}`
      break
    case 'anyOf': {
      const formattedItems = definition.items.map(item => (
        ['function', 'constructor'].includes(item.type) ? `(${item.formatted})` : item.formatted
      )).filter(item => item !== 'null' && item !== 'undefined')
      formatted = `${formattedItems.join(' | ')}`
      break
    }
    case 'array': {
      const formattedItems = definition.items.map(item => (
        ['function', 'constructor', 'allOf', 'anyOf'].includes(item.type) ? `(${item.formatted})` : item.formatted)
      ).filter(item => item !== 'null' && item !== 'undefined')
      if (definition.length) {
        formatted = `[${formattedItems.join(', ')}]`
      } else {
        formatted = `${definition.items.length > 1 ? '(' : ''}${formattedItems.join(' | ')}${definition.items.length > 1 ? ')' : ''}[]`
      }
      break
    }
    case 'function':
      const formattedParameters = definition.parameters.map(p => `${p.name}: ${p.formatted}`)
      formatted = `(${formattedParameters.join(', ')}) => ${definition.returnType.formatted}`
      break
    case 'record':
      formatted = `Record<${definition.key.formatted}, ${definition.value.formatted}>`
      break
    case 'object':
      formatted = `{ ${Object.entries(definition.properties).reduce<string[]>((arr, [name, prop]) => {
        if (name.includes(':') || name.includes('-')) name = `'${name}'`
        arr.push(`${name}: ${prop.formatted}`)
        return arr
      }, []).join('; ')} }`
      break
    case 'ref':
      if (plainRefs.includes(definition.ref)) {
        formatted = definition.ref
      } else {
        formatted = definition.text
      }
      break
    case 'interface':
    case 'boolean':
    case 'number':
    case 'string':
    case 'constructor':
    default:
      formatted = definition.text
      break
  }

  definition.formatted = formatted

  if (allowedRefs.includes(formatted)) {
    definition.formatted = `<a href="https://github.com/vuetifyjs/vuetify/blob/master/packages/${definition.source}" target="_blank">${formatted}</a>`
  }
}

// eslint-disable-next-line complexity
function generateDefinition (node: Node<ts.Node>, recursed: string[], project: Project, type?: Type<ts.Type>): Definition {
  const tc = project.getTypeChecker()
  type = type ?? node.getType()

  if (type.getAliasSymbol()?.getName() === 'NonNullable') {
    const typeArguments = type.getAliasTypeArguments()
    if (typeArguments.length) {
      type = typeArguments[0]
    }
  }

  const symbol = type.getAliasSymbol() ?? type.getSymbol()
  const declaration = symbol?.getDeclarations()?.[0]
  const targetType = type.getTargetType()

  let definition: Definition = {
    text: getCleanText(type.getText()),
    source: getSource(declaration),
  } as Definition

  if (
    count(recursed, type.getText()) > 1 ||
    allowedRefs.includes(symbol?.getName() as string) ||
    isExternalDeclaration(declaration, definition.text)
  ) {
    definition = definition as RefDefinition
    definition.type = 'ref'

    // TODO: Parse this better?
    definition.ref = symbol?.getFullyQualifiedName().replace(/".*"\./, '') ?? ''
  } else if (type.isAny() || type.isUnknown() || type.isNever()) {
    // @ts-expect-error asd
    definition.type = type.getText()
  } else if (type.isBoolean() || type.isBooleanLiteral()) {
    definition = definition as BooleanDefinition
    definition.type = 'boolean'
    definition.literal = type.isBooleanLiteral() ? type.getText() : undefined
  } else if (type.isString() || type.isStringLiteral()) {
    definition = definition as StringDefinition
    definition.type = 'string'
    definition.literal = type.isStringLiteral() ? type.getText() : undefined
  } else if (type.isNumber() || type.isNumberLiteral()) {
    definition = definition as NumberDefinition
    definition.type = 'number'
    definition.literal = type.isNumberLiteral() ? type.getText() : undefined
  } else if (type.isArray()) {
    definition = definition as ArrayDefinition
    definition.type = 'array'

    const arrayElementType = type.getArrayElementType()

    const arrayType = generateDefinition(node, getRecursiveTypes(recursed, type), project, arrayElementType)

    definition.items = arrayType.type === 'anyOf' ? arrayType.items : [arrayType]
  } else if (type.isIntersection()) {
    definition = definition as IntersectionDefinition
    definition.type = 'allOf'
    definition.items = type.getIntersectionTypes()
      .map(intersectionType => generateDefinition(node, recursed, project, intersectionType))

    // TODO: Should we collapse allOf with only objects to single object?
  } else if (type.isUnion()) {
    definition = definition as UnionDefinition
    definition.type = 'anyOf'
    definition.items = getUnionTypes(type)
      .map(unionType => generateDefinition(node, recursed, project, unionType))

    // Replace explicit true|false with boolean
    // TODO: Do this some other way
    let found = -1
    for (let i = 0; i < definition.items.length; i++) {
      const item = definition.items[i]

      if (item.type === 'boolean' && item.literal != null) {
        if (~found) {
          definition.items.splice(i, 1)
          definition.items.splice(found, 1, {
            text: 'boolean',
            type: 'boolean',
            formatted: 'boolean',
          })
          break
        } else {
          found = i
        }
      }
    }
  } else if (type.getConstructSignatures().length) {
    definition = definition as ConstructorDefinition
    definition.type = 'constructor'
  } else if (type.getCallSignatures().length) {
    definition = definition as FunctionDefinition
    definition.type = 'function'

    const signature = type.getCallSignatures()[0]

    definition.parameters = signature.getParameters().map(parameter => {
      const parameterType = tc.getTypeOfSymbolAtLocation(parameter, node)
      return {
        name: parameter.getEscapedName(),
        optional: parameter.isOptional(),
        ...generateDefinition(node, getRecursiveTypes(recursed, parameterType), project, parameterType),
      }
    })
    const returnType = signature.getReturnType()
    definition.returnType = generateDefinition(node, getRecursiveTypes(recursed, returnType), project, returnType)
  } else if (targetType && /^(Map|Set)<.*>/.test(definition.text)) { // TODO: Better way to detect Map/Set type
    definition = definition as InterfaceDefinition
    definition.type = 'interface'
    definition.name = targetType?.getText()
    const instanceTypeArguments = type.getTypeArguments()
    definition.parameters = targetType?.getTypeArguments().map((arg, i) => {
      return { name: arg.getText(), ...generateDefinition(node, recursed, project, instanceTypeArguments[i]) }
    })
  } else if (/^Record<.*>/.test(definition.text)) { // TODO: Better way to detect Record type
    definition = definition as RecordDefinition
    definition.type = 'record'
    definition.key = generateDefinition(node, recursed, project, type.getAliasTypeArguments()[0])
    definition.value = generateDefinition(node, recursed, project, type.getAliasTypeArguments()[1])
  } else if (type.isTuple()) {
    definition = definition as ArrayDefinition
    definition.type = 'array'
    definition.items = type.getTupleElements().map(t => generateDefinition(node, recursed, project, t))
    definition.length = definition.items.length
  } else if (type.isObject()) {
    definition = definition as ObjectDefinition
    definition.type = 'object'
    definition.properties = {}

    for (const property of type.getProperties()) {
      const propertyName = property.getEscapedName()
      const propertyType = tc.getTypeOfSymbolAtLocation(property, node)

      definition.properties[propertyName] = generateDefinition(node, getRecursiveTypes(recursed, propertyType), project, propertyType)

      definition.properties[propertyName].optional = property.isOptional()
    }
    if (type.compilerType.indexInfos.length) {
      for (const index of type.compilerType.indexInfos) {
        const indexName = '[' + type._context.compilerFactory.getType(index.keyType).getText() + ']'
        const indexType = type._context.compilerFactory.getType(index.type)
        definition.properties[indexName] = generateDefinition(node, getRecursiveTypes(recursed, indexType), project, indexType)
        definition.properties[indexName].optional = true
      }
    }
  } else if (ts.TypeFlags.Void & type.getFlags()) {
    // @ts-expect-error asd
    definition.type = 'void'
  } else {
    // @ts-expect-error asd
    definition.type = 'UNSUPPORTED'
  }

  formatDefinition(definition)

  return definition
}

/** type.getUnionTypes() but without unwrapping named string unions */
function getUnionTypes (type: Type<ts.Type>): Type<ts.Type>[] {
  if (!type.isUnion()) return [type]

  const compilerType = (type as any).compilerType

  if (compilerType.origin) {
    return compilerType.origin.types
      .map((unionType: any) => (type as any)._context.compilerFactory.getType(unionType))
  } else {
    return type.getUnionTypes()
  }
}

// function getRecursiveObjectTypes (recursiveTypes: string[], type: Type<ts.Type>) {
//   return recursiveTypes.slice().concat(findPotentialRecursiveObjectTypes(type))
// }

// function getRecursiveArrayTypes (recursiveTypes: string[], type: Type<ts.Type>) {
//   return recursiveTypes.slice().concat(findPotentialRecursiveArrayTypes(type))
// }

// function findPotentialRecursiveObjectTypes (type: Type<ts.Type>) {
//   if (type == null || type.isArray()) return []

//   const recursiveTypes = []

//   if (type.isUnionOrIntersection()) {
//     recursiveTypes.push(...type.getAliasTypeArguments().map(t => t.getText()))
//   } else if (type.getAliasSymbol() || type.isClassOrInterface() || type.getTypeArguments().length) {
//     recursiveTypes.push(type.getText())
//   }

//   return recursiveTypes
// }

// function findPotentialRecursiveArrayTypes (type: Type<ts.Type>) {
//   if (type == null) return []

//   const recursiveTypes = []

//   if (type.isUnionOrIntersection()) {
//     recursiveTypes.push(...type.getAliasTypeArguments().map(t => t.getText()))
//   } else if (type.isArray()) {
//     recursiveTypes.push(...findPotentialRecursiveArrayTypes(type.getArrayElementType()))
//   } else if (type.getAliasSymbol() || type.isClassOrInterface() || type.getTypeArguments().length) {
//     recursiveTypes.push(type.getText())
//   }

//   return recursiveTypes
// }

function getRecursiveTypes (recursiveTypes: string[], type: Type<ts.Type>) {
  return recursiveTypes.slice().concat(findPotentialRecursiveTypes(type))
}

function findPotentialRecursiveTypes (type?: Type<ts.Type>): string[] {
  if (type == null) return []

  const recursiveTypes = []

  if (type.isUnion()) {
    recursiveTypes.push(...getUnionTypes(type).map(t => t.getText()))
  } else if (type.isIntersection()) {
    recursiveTypes.push(...type.getIntersectionTypes().map(t => t.getText()))
  } else if (type.isArray()) {
    recursiveTypes.push(...findPotentialRecursiveTypes(type.getArrayElementType()))
  } else if (type.getAliasSymbol() || type.isClassOrInterface() || type.getTypeArguments().length) {
    recursiveTypes.push(type.getText())
  }

  return recursiveTypes
}
