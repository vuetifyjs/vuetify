import type { Node, Type } from 'ts-morph'
import { Project, ts } from 'ts-morph'
import fs from 'fs/promises'
import path from 'path'

function inspect (project: Project, node?: Node<ts.Node>) {
  if (!node) return null

  const kind = node.getKind()

  if (kind === ts.SyntaxKind.TypeAliasDeclaration) {
    return generateDefinition(node, [], project)
  }

  return null
}

export function generateComposableDataFromTypes () {
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const sourceFile = project.addSourceFileAtPath('./src/composables.d.ts')

  const composables = inspect(project, sourceFile.getTypeAlias('Composables')) as ObjectDefinition

  return Object.entries(composables.properties).map(([name, data]) => {
    return {
      name,
      data: {
        exposed: (data as FunctionDefinition).returnType,
      },
    }
  }) as { name: string, data: { exposed: ObjectDefinition } }[]
}

export function generateDirectiveDataFromTypes () {
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const sourceFile = project.addSourceFileAtPath('./src/directives.d.ts')

  const directives = inspect(project, sourceFile.getTypeAlias('Directives')) as ObjectDefinition

  return Object.entries(directives.properties).map(([name, data]) => {
    return {
      name,
      data: {
        exposed: data,
      },
    }
  }) as { name: string, data: { exposed: ObjectDefinition } }[]
}

export async function generateComponentDataFromTypes (component: string) {
  const template = await fs.readFile('./src/template.d.ts', 'utf-8')

  await fs.writeFile('./src/tmp.d.ts', template.replaceAll('__component__', component))

  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  })

  const sourceFile = project.addSourceFileAtPath('./src/tmp.d.ts')

  const props = inspect(project, sourceFile.getTypeAlias('ComponentProps'))
  const events = inspect(project, sourceFile.getTypeAlias('ComponentEvents'))
  const slots = inspect(project, sourceFile.getTypeAlias('ComponentSlots'))
  const exposed = inspect(project, sourceFile.getTypeAlias('ComponentExposed'))

  const sections = [props, events, slots, exposed]

  sections.forEach(item => {
    item.text = undefined
    item.source = undefined
  })

  return {
    props,
    events,
    slots,
    exposed,
  }
}

type BaseDefinition = {
  text: string
  formatted: string
  source?: string
  description?: Record<string, string>
  default?: string
}

export type ObjectDefinition = {
  type: 'object'
  key?: Definition
  value?: Definition
  properties: Record<string, Definition>
  optional: string[]
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

function isExternalDeclaration (declaration?: Node<ts.Node>, definitionText?: string) {
  const filePath = declaration?.getSourceFile().getFilePath()

  // Some internal typescript types should be processed (Array etc)
  if (filePath?.includes('/typescript/lib/') && (
    definitionText?.endsWith('[]') ||
    /(Record|Map|Set)<.*?>/.test(definitionText ?? '')
  )) return false

  if (filePath?.includes('/@vue/') && /^ToRefs<.*?>/.test(definitionText)) {
    return false
  }

  return filePath?.includes('/node_modules/')
}

function getSource (declaration?: Node<ts.Node>) {
  const filePath = declaration?.getSourceFile().getFilePath()
    .replace(/.*\/node_modules\//, '')
    .replace(/.*\/packages\/vuetify\//, 'vuetify/')
  const lineNumber = declaration?.getStartLineNumber()

  if (!filePath || !lineNumber || filePath.startsWith(process.cwd())) return undefined

  return filePath && lineNumber ? `${filePath}@L${lineNumber}` : undefined
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

// eslint-disable-next-line complexity
function generateDefinition (node: Node<ts.Node>, recursed: string[], project: Project, type?: Type<ts.Type>): Definition {
  const tc = project.getTypeChecker()
  type = type ?? node.getType()

  const symbol = type.getAliasSymbol() ?? type.getSymbol()
  const declaration = symbol?.getDeclarations()?.[0]
  const targetType = type.getTargetType()

  let definition: Definition = {
    text: getCleanText(type.getText()),
    source: getSource(declaration),
  } as Definition

  // console.log(definition.text)

  if (count(recursed, type.getText()) > 1 || isExternalDeclaration(declaration, definition.text)) {
    definition = definition as RefDefinition
    definition.type = 'ref'

    // TODO: Parse this better?
    definition.ref = symbol?.getFullyQualifiedName().replace(/".*"\./, '') ?? ''

    if (['Component', 'ComponentPublicInstance', 'ComponentInternalInstance', 'FunctionalComponent'].includes(definition.ref)) {
      definition.formatted = definition.ref
    } else {
      definition.formatted = definition.text
    }
  } else if (type.isAny() || type.isUnknown() || type.isNever()) {
    // @ts-expect-error asd
    definition.type = type.getText()
    definition.formatted = definition.text
  } else if (type.isBooleanLiteral()) {
    definition = definition as BooleanDefinition
    definition.type = 'boolean'
    definition.literal = type.getText()
    definition.formatted = definition.text
  } else if (type.isBoolean()) {
    definition = definition as BooleanDefinition
    definition.type = 'boolean'
    definition.formatted = definition.text
  } else if (type.isStringLiteral()) {
    definition = definition as StringDefinition
    definition.type = 'string'
    definition.literal = type.getText()
    definition.formatted = definition.text
  } else if (type.isString()) {
    definition = definition as StringDefinition
    definition.type = 'string'
    definition.formatted = definition.text
  } else if (type.isNumberLiteral()) {
    definition = definition as NumberDefinition
    definition.type = 'number'
    definition.literal = type.getText()
    definition.formatted = definition.text
  } else if (type.isNumber()) {
    definition = definition as NumberDefinition
    definition.type = 'number'
    definition.formatted = definition.text
  } else if (type.isArray()) {
    definition = definition as ArrayDefinition
    definition.type = 'array'

    const arrayElementType = type.getArrayElementType()

    const arrayType = generateDefinition(node, getRecursiveArrayTypes(recursed, type), project, arrayElementType)

    definition.items = arrayType.type === 'anyOf' ? arrayType.items : [arrayType]
    definition.formatted = `${definition.items.length > 1 ? '(' : ''}${definition.items.map(item => ['function', 'constructor'].includes(item.type) ? `(${item.formatted})` : item.formatted).join(' | ')}${definition.items.length > 1 ? ')' : ''}[]`
  } else if (type.isIntersection()) {
    definition = definition as IntersectionDefinition
    definition.type = 'allOf'
    definition.items = type.getIntersectionTypes().map(type => generateDefinition(node, recursed, project, type))
    definition.formatted = `${definition.items.map(item => item.formatted).join(' & ')}`

    // TODO: Should we collapse allOf with only objects to single object?
  } else if (type.isUnion()) {
    definition = definition as UnionDefinition
    definition.type = 'anyOf'
    definition.items = type.getUnionTypes().map(type => generateDefinition(node, recursed, project, type))

    // Ugly hack to get rid of explicit false and true types
    // TODO: Do this some other way
    let found: string | undefined
    const foundIndices: number[] = []
    for (let i = 0; i < definition.items.length; i++) {
      const item = definition.items[i]

      if (item.type === 'boolean' && item.literal != null && found == null) {
        found = item.literal
        foundIndices.push(i)
      } else if (item.type === 'boolean' && item.literal != null && found != null && found !== item.literal) {
        foundIndices.push(i)
      }
    }

    if (foundIndices.length === 2) {
      definition.items = definition.items.filter((_, i) => !foundIndices.includes(i))
      definition.items.splice(foundIndices[0], 0, {
        text: 'boolean',
        type: 'boolean',
        formatted: 'boolean',
      })
    }
    definition.formatted = `${definition.items.map(item => ['function', 'constructor'].includes(item.type) ? `(${item.formatted})` : item.formatted).join(' | ')}`
  } else if (type.getConstructSignatures().length) {
    definition = definition as ConstructorDefinition
    definition.type = 'constructor'
    definition.formatted = definition.text
  } else if (type.getCallSignatures().length) {
    definition = definition as FunctionDefinition
    definition.type = 'function'

    const signature = type.getCallSignatures()[0]

    definition.parameters = signature.getParameters().map(parameter => {
      const parameterType = tc.getTypeOfSymbolAtLocation(parameter, node)
      return {
        name: parameter.getEscapedName(),
        ...generateDefinition(node, getRecursiveObjectTypes(recursed, parameterType), project, parameterType),
      }
    })
    definition.returnType = generateDefinition(node, recursed, project, signature.getReturnType())
    definition.formatted = `(${definition.parameters.map(p => `${p.name}: ${p.formatted}`).join(', ')}) => ${definition.returnType.formatted}`
  } else if (targetType && /^(Map|Set)<.*>/.test(definition.text)) { // TODO: Better way to detect Map/Set type
    definition = definition as InterfaceDefinition
    definition.type = 'interface'
    definition.name = targetType?.getText()
    const instanceTypeArguments = type.getTypeArguments()
    definition.parameters = targetType?.getTypeArguments().map((arg, i) => {
      return { name: arg.getText(), ...generateDefinition(node, recursed, project, instanceTypeArguments[i]) }
    })
    definition.formatted = definition.text // TODO: use resolve parameters
  } else if (/^Record<.*>/.test(definition.text)) { // TODO: Better way to detect Record type
    definition = definition as ObjectDefinition
    definition.type = 'object'
    definition.key = generateDefinition(node, recursed, project, type.getAliasTypeArguments()[0])
    definition.value = generateDefinition(node, recursed, project, type.getAliasTypeArguments()[1])
    definition.properties = {}
    definition.formatted = definition.text // TODO: use resolved key/value
  } else if (type.isTuple()) {
    definition = definition as ArrayDefinition
    definition.type = 'array'
    definition.items = type.getTupleElements().map(t => generateDefinition(node, recursed, project, t))
    definition.length = definition.items.length
    definition.formatted = definition.text // TODO: use resolved items
  } else if (type.isObject()) {
    definition = definition as ObjectDefinition
    definition.type = 'object'
    definition.properties = {}
    definition.optional = []

    for (const property of type.getProperties()) {
      const propertyName = property.getEscapedName()
      const propertyType = tc.getTypeOfSymbolAtLocation(property, node)

      definition.properties[propertyName] = generateDefinition(node, getRecursiveObjectTypes(recursed, propertyType), project, propertyType)

      property.isOptional() && definition.optional.push(propertyName)
    }
    definition.formatted = `{ ${Object.entries(definition.properties).reduce<string[]>((arr, [name, prop]) => {
      arr.push(`${name}: ${prop.formatted}`)
      return arr
    }, []).join('; ')} }`
  } else if (ts.TypeFlags.Void & type.getFlags()) {
    // @ts-expect-error asd
    definition.type = 'void'
    definition.formatted = definition.text
  } else {
    // @ts-expect-error asd
    definition.type = 'UNSUPPORTED'
  }

  return definition
}

function getRecursiveObjectTypes (recursiveTypes: string[], type: Type<ts.Type>) {
  return recursiveTypes.slice().concat(findPotentialRecursiveObjectTypes(type)).concat(['SubmitEventPromise'])
}

function getRecursiveArrayTypes (recursiveTypes: string[], type: Type<ts.Type>) {
  return recursiveTypes.slice().concat(findPotentialRecursiveArrayTypes(type)).concat(['SubmitEventPromise'])
}

function findPotentialRecursiveObjectTypes (type: Type<ts.Type>) {
  if (type == null || type.isArray()) return []

  const recursiveTypes = []

  if (type.isUnionOrIntersection()) {
    recursiveTypes.push(...type.getAliasTypeArguments().map(t => t.getText()))
  } else if (type.getAliasSymbol() || type.isClassOrInterface()) {
    recursiveTypes.push(type.getText())
  }

  return recursiveTypes
}

function findPotentialRecursiveArrayTypes (type: Type<ts.Type>) {
  if (type == null) return []

  const recursiveTypes = []

  if (type.isUnionOrIntersection()) {
    recursiveTypes.push(...type.getAliasTypeArguments().map(t => t.getText()))
  } else if (type.isArray()) {
    recursiveTypes.push(...findPotentialRecursiveArrayTypes(type.getArrayElementType()))
  } else if (type.getAliasSymbol() || type.isClassOrInterface()) {
    recursiveTypes.push(type.getText())
  }

  return recursiveTypes
}
