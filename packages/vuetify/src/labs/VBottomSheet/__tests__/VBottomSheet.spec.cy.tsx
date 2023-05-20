/// <reference types="../../../../types/cypress" />

// Components
import { VBottomSheet } from '..'
import { VSheet } from '@/components/VSheet'

// Tests
describe('VBottomSheet', () => {
  it('reduces maximum width with the inset prop', () => {
    cy.mount(({ inset }: any) => (
      <VBottomSheet model-value inset={ inset }>
        <VSheet class="pa-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed hic, iusto tenetur rerum eum libero numquam reprehenderit
        </VSheet>
      </VBottomSheet>
    ))
      .get('.v-bottom-sheet')
      .should('have.not.class', 'v-bottom-sheet--inset')
      .percySnapshot()
      .setProps({ inset: true })
      .get('.v-bottom-sheet')
      .should('have.class', 'v-bottom-sheet--inset')
      .should('have.css', 'max-width', '70%')
      .percySnapshot()
  })
})
