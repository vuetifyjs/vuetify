import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VList } from '../VList'

// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { render, screen } from '@test'
import { commands, userEvent } from '@vitest/browser/context'
import { ref } from 'vue'

describe('VListGroup', () => {
  it('supports activator slot', () => {
    render(() => (
      <VList>
        <VListGroup>
          {{ activator: props => <VListItem { ...props } title="Group" /> }}
        </VListGroup>
      </VList>
    ))

    expect(screen.getByCSS('.v-list-item-title')).toHaveTextContent('Group')
  })

  it('supports children', () => {
    render(() => (
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
    ))

    expect(screen.getAllByCSS('.v-list-item-title')[0]).toHaveTextContent('Group')
  })

  it('should not remove opened when unmounted', async () => {
    const visible = ref(true)
    const opened = ref(['Users'])
    render(() => (
        <VList opened={ opened.value }>
          {
            visible.value && (
              <VListGroup value="Users">
                {{
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
    ))

    expect(screen.queryByRole('group')).not.toBeNull()
    expect(screen.getByCSS('.v-list-group__items')).toBeVisible()
    visible.value = false
    await commands.waitStable('.v-list')
    expect(screen.queryByRole('group')).toBeNull()
    visible.value = true
    await commands.waitStable('.v-list')
    expect(screen.queryByRole('group')).not.toBeNull()
    expect(screen.getByCSS('.v-list-group__items')).toBeVisible()
  })

  // https://github.com/vuetifyjs/vuetify/issues/20354
  it('should support programmatically expand group via open model', async () => {
    const opened = ref<string[]>([])

    render(() => (
      <>
        <VBtn onClick={ () => { opened.value.push('Users') } }>Click me</VBtn>
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

    await userEvent.click(screen.getByText(/click me/i))
    await commands.waitStable('.v-list')
    expect(opened.value).toStrictEqual(['Users'])
    expect(screen.getByCSS('.v-list-group__items')).toBeVisible()
  })

  it('should correctly set v-model:opened when return-object is applied', async () => {
    const opened = ref<{}[]>([])
    const items = [
      {
        title: 'Item #1',
        newValue: 1,
        children: [
          {
            title: 'Child 1',
            newValue: 100,
          },
        ],
      },
      {
        title: 'Item #2',
        newValue: 2,
      },
      {
        title: 'Item #3',
        newValue: 3,
      },
    ]
    render(() => (
      <VList
        v-model:opened={ opened.value }
        itemValue="newValue"
        items={ items }
        returnObject
      >
      </VList>
    ))

    expect(opened.value).toStrictEqual([])

    await userEvent.click(screen.getByCSS('.v-list-group__header'))

    expect(opened.value).toStrictEqual([{
      title: 'Item #1',
      newValue: 1,
      children: [
        {
          title: 'Child 1',
          newValue: 100,
        },
      ],
    }])
  })
})
