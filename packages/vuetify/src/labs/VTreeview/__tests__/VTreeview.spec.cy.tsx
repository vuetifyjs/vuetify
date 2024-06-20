/// <reference types="../../../../types/cypress" />

// Components
import { VTreeview } from '../VTreeview'

// Utilities
import { ref } from 'vue'

describe('VTreeview', () => {
  const items = ref([
    {
      id: 1,
      title: 'Videos :',
      children: [
        {
          id: 2,
          title: 'Tutorials :',
          children: [
            { id: 3, title: 'Basic layouts : mp4' },
            { id: 4, title: 'Advanced techniques : mp4' },
            { id: 5, title: 'All about app : dir' },
          ],
        },
        { id: 6, title: 'Intro : mov' },
        { id: 7, title: 'Conference introduction : avi' },
      ],
    },
  ])
  describe('activate', () => {
    it('single-leaf strategy', () => {
      const activated = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            activatable
            active-strategy="single-leaf"
          />
        </>
      ))

      cy.get('.v-treeview-item').should('have.length', 7)
        .get('.v-treeview-item').eq(0).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([])
        })
        .get('.v-treeview-item').eq(2).click()
        .get('.v-treeview-item').eq(3).click()
        .get('.v-treeview-item').eq(4).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([5])
        })
    })
    it('leaf strategy', () => {
      const activated = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            activatable
            active-strategy="leaf"
          />
        </>
      ))

      cy.get('.v-treeview-item').should('have.length', 7)
        .get('.v-treeview-item').eq(0).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([])
        })
        .get('.v-treeview-item').eq(2).click()
        .get('.v-treeview-item').eq(3).click()
        .get('.v-treeview-item').eq(4).click()
        .then(_ => {
          expect(activated.value.sort()).to.deep.equal([3, 4, 5].sort())
        })
    })
    it('independent strategy', () => {
      const activated = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            activatable
            active-strategy="independent"
          />
        </>
      ))

      cy.get('.v-treeview-item').should('have.length', 7)
        .get('.v-treeview-item').eq(0).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([1])
        })
        .get('.v-treeview-item').eq(1).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([1, 2])
        })
        .get('.v-treeview-item').eq(2).click()
        .get('.v-treeview-item').eq(3).click()
        .get('.v-treeview-item').eq(4).click()
        .then(_ => {
          expect(activated.value.sort()).to.deep.equal([1, 2, 3, 4, 5].sort())
        })
    })
    it('single-independent strategy', () => {
      const activated = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            activatable
            active-strategy="single-independent"
          />
        </>
      ))

      cy.get('.v-treeview-item').should('have.length', 7)
        .get('.v-treeview-item').eq(0).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([1])
        })
        .get('.v-treeview-item').eq(1).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([2])
        })
        .get('.v-treeview-item').eq(2).click()
        .get('.v-treeview-item').eq(3).click()
        .get('.v-treeview-item').eq(4).click()
        .then(_ => {
          expect(activated.value).to.deep.equal([5])
        })
    })
  })
  describe('select', () => {
    it('single-leaf strategy', () => {
      const selected = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            selectable
            select-strategy="single-leaf"
          />
        </>
      ))

      cy.get('.v-checkbox-btn').should('have.length', 5)
        .get('.v-checkbox-btn').eq(0).click(20, 20)
        .get('.v-checkbox-btn').eq(1).click(20, 20)
        .then(_ => {
          expect(selected.value).to.deep.equal([4])
        })
        .get('.v-checkbox-btn').eq(3).click(20, 20)
        .then(_ => {
          expect(selected.value).to.deep.equal([6])
        })
    })
    it('leaf strategy', () => {
      const selected = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            selectable
            select-strategy="leaf"
          />
        </>
      ))

      cy.get('.v-checkbox-btn').should('have.length', 5)
        .get('.v-checkbox-btn').eq(0).click(20, 20)
        .get('.v-checkbox-btn').eq(1).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([3, 4].sort())
        })
        .get('.v-checkbox-btn').eq(3).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([3, 4, 6].sort())
        })
    })
    it.only('independent strategy', () => {
      const selected = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            selectable
            select-strategy="independent"
          />
        </>
      ))

      cy.get('.v-checkbox-btn').should('have.length', 7)
        .get('.v-checkbox-btn').eq(2).click(20, 20)
        .get('.v-checkbox-btn').eq(3).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([3, 4].sort())
        })
        .get('.v-checkbox-btn').eq(1).click(20, 20)
        .get('.v-checkbox-btn').eq(0).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([1, 2, 3, 4].sort())
        })
    })
    it('single-independent strategy', () => {
      const selected = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            selectable
            select-strategy="single-independent"
          />
        </>
      ))

      cy.get('.v-checkbox-btn').should('have.length', 7)
        .get('.v-checkbox-btn').eq(2).click(20, 20)
        .get('.v-checkbox-btn').eq(3).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([4].sort())
        })
        .get('.v-checkbox-btn').eq(1).click(20, 20)
        .get('.v-checkbox-btn').eq(0).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([1].sort())
        })
    })
    it('classic strategy', () => {
      const selected = ref([])
      cy.mount(() => (
        <>
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items.value }
            item-title="title"
            item-value="id"
            selectable
            select-strategy="classic"
          />
        </>
      ))

      cy.get('.v-checkbox-btn').eq(2).click(20, 20)
        .get('.v-checkbox-btn').eq(3).click(20, 20)
        .get('.v-checkbox-btn').eq(4).click(20, 20)
        .then(_ => {
          expect(selected.value).to.deep.equal([3, 4, 5])
        })
        .get('.v-checkbox-btn').eq(1).click(20, 20)
        .then(_ => {
          expect(selected.value).to.deep.equal([])
        })
        .get('.v-checkbox-btn').eq(0).click(20, 20)
        .then(_ => {
          expect(selected.value.sort()).to.deep.equal([3, 4, 5, 6, 7].sort())
        })
    })
  })
})
