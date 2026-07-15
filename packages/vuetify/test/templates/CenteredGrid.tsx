import { FunctionalComponent } from 'vue'

export const CenteredGrid: FunctionalComponent<{ width?: string }> = (props, { slots, attrs }) => {
  const width = props.width || 'auto'
  return (
    <div
      class="d-flex flex-column mx-auto py-2"
      style={{ width, gridGap: '1.2rem' }}
    >
      { slots.default?.() }
    </div>
  )
}
