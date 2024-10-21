import { VListGroup } from '../VListGroup'
import { VListItem } from '../VListItem'
import { VList } from '../VList'

// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { render, screen } from '@test'
import { userEvent } from '@vitest/browser/context'
import { ref } from 'vue'
// Types
import type { Ref } from 'vue'

describe('VListGroup', () => {
  it('supports header slot', () => {
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

  // it.only('should not remove opened when unmounted', () => {
  //   const visible = ref(true)
  //   const opened = ref(['Users'])
  //   render(() => (
  //       <VList opened={ opened.value }>
  //         {
  //           visible.value && (
  //             <VListGroup value="Users">
  //               {{
  //                 default: () => (
  //                   <>
  //                     <VListItem title="Foo" />
  //                     <VListItem title="Bar" />
  //                   </>
  //                 ),
  //               }}
  //             </VListGroup>
  //           )
  //         }
  //       </VList>
  //   ))

  //   expect(screen.getByCSS('.v-list')).toContainElement(screen.getByCSS('.v-list-group'))
  //   expect(screen.getByCSS('.v-list-group__items')).toBeVisible()
  //   // wrapper.get('.v-list .v-list-group').should('exist')
  //   //   .get('.v-list-group__items').should('be.visible')
  //   //   .then(() => {
  //   //     visible.value = false
  //   //   })
  //   //   .get('.v-list.v-list-group').should('not.exist')
  //   //   .then(() => {
  //   //     visible.value = true
  //   //   })
  //   //   .get('.v-list-group').should('exist')
  //   //   .get('.v-list-group__items').should('be.visible')
  // })

  // https://github.com/vuetifyjs/vuetify/issues/20354
  it('should support programmatically expand group via open model', async () => {
    const opened: Ref<string[]> = ref([])

    const { container } = render(() => (
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

    await userEvent.click(container.querySelector('button')!)
    expect(opened.value).toStrictEqual(['Users'])
    expect(screen.getByCSS('.v-list-group__items')).toBeVisible()
  })
})
