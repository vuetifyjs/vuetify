import type { ComponentObjectPropsOptions, ExtractPropTypes, PropType } from 'vue'

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
  PropsOptions extends ComponentObjectPropsOptions,
  PropsTypes extends ExtractPropTypes<PropsOptions>
> (props: PropsOptions) {
  return <
    Defaults extends PartialKeys<PropsTypes> = {}
  >(
    defaults?: Defaults
  ): AppendDefault<PropsTypes, Defaults> => {
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

type AppendDefault<T, D extends PartialKeys<T>> = {
  [P in keyof T]-?: {
    type: PropType<PropTypeDefault<T[P], D[P]>>
    default: PropTypeDefault<T[P], D[P]>
  }
}

type PropTypeDefault<T, D> = unknown extends D ? T : (NonNullable<T> | D)

/**
 * Like `Partial<T>` but doesn't care what the value is
 */
type PartialKeys<T> = { [P in keyof T]?: unknown }
