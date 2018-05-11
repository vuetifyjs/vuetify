describe('VTextField', () => {
  beforeEach(() => {
    cy.visit('/VtextField')
    cy.wait(100)
  })

  it('should work', () => {
    cy.get('.v-text-field').each(f => (
      cy.wrap(f).click().get(':focus').type('Hello world')
    ))

    cy.contains('two').click()
    cy.get(':focus').type('{selectall}second input')
  })
})
