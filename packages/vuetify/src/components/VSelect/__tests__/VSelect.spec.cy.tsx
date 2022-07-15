/// <reference types="../../../../types/cypress" />

import { VListItem } from '@/components/VList'
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

describe('VSelect', () => {
  it('should render prepend-item slot', () => {
    cy.mount(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'prepend-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))
      .get('.v-list-item').eq(0).invoke('text').should('equal', 'Foo')
  })

  it('should render append-item slot', () => {
    cy.mount(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'append-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))
      .get('.v-list-item').last().invoke('text').should('equal', 'Foo')
  })
})
