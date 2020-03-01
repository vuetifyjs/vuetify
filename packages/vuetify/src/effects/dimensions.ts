// Setup
import { computed, Prop } from 'vue'
import { convertToUnit } from '../util/helpers'

// Props
const allDimensionsProps = {
  height: {
    type: [Number, String],
  },
  maxHeight: {
    type: [Number, String],
  },
  maxWidth: {
    type: [Number, String],
  },
  minHeight: {
    type: [Number, String],
  },
  minWidth: {
    type: [Number, String],
  },
  width: {
    type: [Number, String],
  },
}

// Types
type PropValue = string | number | undefined
type PropNames = keyof typeof allDimensionsProps

// Effect
export function dimensionsFactory<S extends PropNames> (...possibleProps: S[]) {
  const selectedProps = possibleProps.length ? possibleProps : Object.keys(allDimensionsProps) as S[]
  const dimensionsProps = (defaults?: Partial<Record<S, PropValue>>) => selectedProps.reduce((obj, prop) => {
    obj[prop] = {
      ...allDimensionsProps[prop],
      default: defaults && defaults[prop],
    }
    return obj
  }, {} as Record<S, Prop<PropValue>>)

  const useDimensions = (props: Partial<Record<S, PropValue>>) => {
    const dimensions = computed(() => {
      return selectedProps.reduce((obj, key) => {
        const value: PropValue = props[key]
        if (value) {
          obj.style[key] = convertToUnit(value)
        }
        return obj
      }, { style: {} } as { style: Record<S, string | undefined> })
    })

    return { dimensions }
  }

  return {
    dimensionsProps,
    useDimensions,
  }
}
