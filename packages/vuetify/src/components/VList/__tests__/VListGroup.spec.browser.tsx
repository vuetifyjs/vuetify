// Components
import { VList } from '../VList'
import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VBtn } from '@/components/VBtn'

// Utilities
import { render, userEvent } from '@test'
import { nextTick, ref } from 'vue'

describe('VListGroup', () => {
  it('supports header slot', () => {
    const { container } = render(() => (
      <div style="width: 200px;">
        <h2 class="mt-8">ListGroup</h2>
        <VList>
          <VListGroup>
            {{ activator: props => <VListItem { ...props } title="Group" /> }}
          </VListGroup>
        </VList>
      </div>
    ))

    expect(container.querySelector('.v-list-item-title')).toHaveTextContent('Group')
  })

  it('supports children', () => {
    const { container } = render(() => (
      <div style="width: 200px;">
        <h2 class="mt-8">ListGroup</h2>
        <VList opened={['group']}>
          <VListGroup value="group">
            {{
              activator: props => <VListItem { ...props } title="Group" />,
              default: () => (
                <>
                  <VListItem title="Child 1" />
                  <VListItem title="Child 2" />
                </>
              ),
            }}
          </VListGroup>
        </VList>
      </div>
    ))

    expect(container.querySelector('.v-list-item-title')).toHaveTextContent('Group')
    // Children are rendered, so this implicitly tests it.
  })

  it('should not remove opened when unmounted', async () => {
    const visible = ref(true)
    const opened = ref(['Users'])
    const { container, unmount } = render(() => (
      <div style="width: 200px;">
        <h2 class="mt-8">ListGroup</h2>
        <VList v-model:opened={ opened.value }>
          {
            visible.value && (
              <VListGroup value="Users">
                {{
                  activator: ({ props }) => <VListItem { ...props } title="Users" />,
                  default: () => (
                    <>
                      <VListItem title="Foo" />
                      <VListItem title="Bar" />
                    </>
                  ),
                }}
              </VListGroup>
            )
          }
        </VList>
      </div>
    ))

    expect(container.querySelector('.v-list-group')).toBeInTheDocument()
    await nextTick()
    expect(container.querySelector('.v-list-group__items')).not.toBeNull()

    visible.value = false
    // Re-render by changing a reactive prop and awaiting nextTick
    opened.value = [...opened.value]
    await nextTick()

    expect(container.querySelector('.v-list-group')).not.toBeInTheDocument()

    visible.value = true
    opened.value = [...opened.value]
    await nextTick()

    expect(container.querySelector('.v-list-group')).toBeInTheDocument()
    await nextTick()
    expect(container.querySelector('.v-list-group__items')).not.toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/20354
  it('should support programmatically expand group via open model', async () => {
    const opened = ref<string[]>([])

    const { container } = render(() => (
      <>
        <VBtn onClick={ () => { opened.value = ['Users'] } }>Click me</VBtn>
        <VList v-model:opened={ opened.value }>
          <VListGroup value="Users">
            {{
              activator: ({ props }) => <VListItem { ...props } title="Users" />,
              default: () => (
                <>
                  <VListItem title="Foo" />
                  <VListItem title="Bar" />
                </>
              ),
            }}
          </VListGroup>
        </VList>
      </>
    ))

    const button = container.querySelector('button')
    if (button) {
      await userEvent.click(button)
      await nextTick()
      expect(opened.value).toEqual(['Users'])
      expect(container.querySelector('.v-list-group__items')).not.toBeNull()
    }
  })
})
