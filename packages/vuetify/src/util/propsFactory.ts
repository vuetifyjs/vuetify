import type { ComponentObjectPropsOptions, ExtractPropTypes, Prop } from 'vue'

/**
 * Creates a factory function for props definitions.
 * This is used to define props in a composable then override
 * default values in an implementing component.
 *
 * @example Simplified signature
 * (props: Props) => (defaults?: Record<keyof props, any>) => Props
 *
 * @example Usage
 * const makeProps = propsFactory({
 *   foo: String,
 * })
 *
 * defineComponent({
 *   props: {
 *     ...makeProps({
 *       foo: 'a',
 *     }),
 *   },
 *   setup (props) {
 *     // would be "string | undefined", now "string" because a default has been provided
 *     props.foo
 *   },
 * }
 */

export default function propsFactory<
  PropsOptions extends Readonly<ComponentObjectPropsOptions>,
  PropsTypes extends Readonly<ExtractPropTypes<PropsOptions>>,
> (props: PropsOptions) {
  return <
    Defaults extends Partial<PropsTypes>,
    Props = Readonly<ExtractPropTypesDefault<PropsOptions, Defaults>>,
  >(defaults?: Defaults): NoNullableFields<ComponentObjectPropsOptions<Props>> => {
    if (!defaults) {
      return props as any
    } else {
      return Object.keys(props).reduce<any>((obj, prop) => {
        const definition = props[prop]
        if (prop in defaults) {
          if (typeof definition === 'object' && definition != null) {
            obj[prop] = {
              ...definition,
              default: defaults[prop],
            }
          } else {
            obj[prop] = { type: props[prop], default: defaults[prop] }
          }
        } else {
          obj[prop] = definition
        }

        return obj
      }, {})
    }
  }
}

/**
 * Now for the fun stuff.
 * These types are copied from vue, with the addition of an extra generic
 * parameter so an object of default values can be supplied afterwards.
 */

type RequiredKeysDefault<T, U extends { [K in keyof T]?: InferPropType<T[K]> }> = {
  [K in keyof T]: T[K] extends Prop<infer V, infer D>
    ? unknown extends D
      ? T[K] extends
        | { required: true }
        | { default: any }
        // don't mark Boolean props as undefined
        | BooleanConstructor
        | { type: BooleanConstructor }
        ? K
        : undefined extends U[K]
          ? never
          : K
      : K
    : never
}[keyof T]

type OptionalKeysDefault<T, U> = Exclude<keyof T, RequiredKeysDefault<T, U>>

type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D> ? (unknown extends V ? D : V) : T

type ExtractPropTypesDefault<O extends object, D extends { [K in keyof O]?: InferPropType<O[K]> } = {}> = {
  [K in RequiredKeysDefault<O, D>]: InferPropType<O[K]>
} & {
  [K in OptionalKeysDefault<O, D>]?: InferPropType<O[K]>
}

// Removes null and undefined from an object's properties
type NoNullableFields<T> = { [P in keyof T]-?: NonNullable<T[P]> }
