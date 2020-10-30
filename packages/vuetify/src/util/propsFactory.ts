import type { ComponentObjectPropsOptions, Prop, PropType } from 'vue'

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
  PropsOptions extends ComponentObjectPropsOptions
> (props: PropsOptions) {
  return <Defaults extends PartialKeys<PropsOptions> = {}>(
    defaults?: Defaults
  ): AppendDefault<PropsOptions, Defaults> => {
    if (!defaults) {
      return props as any
    } else {
      return Object.keys(props).reduce<any>((obj, prop) => {
        const definition = props[prop]
        if (prop in defaults) {
          if (typeof definition === 'object' && definition != null && !Array.isArray(definition)) {
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

type AppendDefault<T extends ComponentObjectPropsOptions, D extends PartialKeys<T>> = {
  [P in keyof T]-?: unknown extends D[P]
    ? T[P]
    : T[P] extends Dictionary<unknown>
      ? Omit<T[P], 'type' | 'default'> & {
        type: PropType<MergeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
      : {
        type: PropType<MergeDefault<T[P], D[P]>>
        default: MergeDefault<T[P], D[P]>
      }
}

type MergeDefault<T, D> = unknown extends D ? InferPropType<T> : (NonNullable<InferPropType<T>> | D)

/**
 * Like `Partial<T>` but doesn't care what the value is
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }

// Copied from Vue
type InferPropType<T> = T extends null
  ? any // null & true would fail to infer
  : T extends { type: null | true }
    ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends BooleanConstructor | { type: BooleanConstructor }
        ? boolean
        : T extends Prop<infer V, infer D> ? (unknown extends V ? D : V) : T
