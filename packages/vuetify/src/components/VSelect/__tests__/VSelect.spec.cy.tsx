import { VSelect } from '../VSelect'

const items = [
  { title: 'a' },
  { title: 'b' },
  { title: 'c' },
]
let model: { title: string }[] = []

const T = (
  <VSelect
    multiple
    returnObject
    items={ items }
    modelValue={ model }
    onUpdate:modelValue={ val => model = val }
  >
    {{
      selection: ({ item, index }) => {
        item.toUpperCase()
      },
    }}
  </VSelect>
)
