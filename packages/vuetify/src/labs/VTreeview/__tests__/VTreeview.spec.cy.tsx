/// <reference types="../../../../types/cypress" />

// Components
import { VTreeview } from '../VTreeview'
import { VTextField } from '@/components/VTextField'

// Utilities
import { ref, shallowRef } from 'vue'

function compareItemObject (a: any, b: any) {
  return a.id - b.id
}

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

describe('VTreeview', () => {
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
    it('independent strategy', () => {
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

  describe('return-object', () => {
    describe('open', () => {
      it('open and collapse should both work', () => {
        cy.mount(() => (
          <>
            <VTreeview
              items={ items.value }
              item-title="title"
              item-value="id"
              return-object
            />
          </>
        ))
          .get('.v-list-item-action .v-btn').eq(0).click()
          .get('.v-list-group__items').eq(0).should('be.visible')
          .get('.v-list-item-action .v-btn').eq(0).click()
          .get('.v-list-group__items').eq(0).should('not.be.visible')
      })
      it('opan-all should work', () => {
        cy.mount(() => (
          <>
            <VTreeview
              open-all
              items={ items.value }
              item-title="title"
              item-value="id"
              return-object
            />
          </>
        ))
          .get('.v-treeview-item').eq(1).should('be.visible')
          .get('.v-treeview-item').eq(2).should('be.visible')
          .get('.v-treeview-item').eq(3).should('be.visible')
          .get('.v-treeview-item').eq(4).should('be.visible')
          .get('.v-treeview-item').eq(5).should('be.visible')
          .get('.v-treeview-item').eq(6).should('be.visible')
      })
      it('should return opened object to v-model:opened', () => {
        const opened = ref([])
        cy.mount(() => (
          <>
            <VTreeview
              v-model:opened={ opened.value }
              items={ items.value }
              item-title="title"
              item-value="id"
              return-object
            />
          </>
        ))
          .get('.v-list-item-action .v-btn').eq(0).click()
          .then(_ => {
            expect(opened.value).to.deep.equal([
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
              }])
          })
          .get('.v-list-item-action .v-btn').eq(1).click()
          .then(_ => {
            expect(opened.value.sort(compareItemObject)).to.deep.equal([
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
              {
                id: 2,
                title: 'Tutorials :',
                children: [
                  { id: 3, title: 'Basic layouts : mp4' },
                  { id: 4, title: 'Advanced techniques : mp4' },
                  { id: 5, title: 'All about app : dir' },
                ],
              },
            ].sort(compareItemObject))
          })
      })
    })
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
              return-object
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
            expect(activated.value).to.deep.equal([{ id: 5, title: 'All about app : dir' }])
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
              return-object
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
            expect(activated.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
              { id: 5, title: 'All about app : dir' },
            ].sort(compareItemObject))
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
              return-object
            />
          </>
        ))

        cy.get('.v-treeview-item').should('have.length', 7)
          .get('.v-treeview-item').eq(0).click()
          .then(_ => {
            expect(activated.value).to.deep.equal([
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
          })
          .get('.v-treeview-item').eq(1).click()
          .then(_ => {
            expect(activated.value.sort(compareItemObject)).to.deep.equal([
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
              {
                id: 2,
                title: 'Tutorials :',
                children: [
                  { id: 3, title: 'Basic layouts : mp4' },
                  { id: 4, title: 'Advanced techniques : mp4' },
                  { id: 5, title: 'All about app : dir' },
                ],
              },
            ].sort(compareItemObject))
          })
          .get('.v-treeview-item').eq(2).click()
          .get('.v-treeview-item').eq(3).click()
          .get('.v-treeview-item').eq(4).click()
          .then(_ => {
            expect(activated.value.sort(compareItemObject)).to.deep.equal([
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
              {
                id: 2,
                title: 'Tutorials :',
                children: [
                  { id: 3, title: 'Basic layouts : mp4' },
                  { id: 4, title: 'Advanced techniques : mp4' },
                  { id: 5, title: 'All about app : dir' },
                ],
              },
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
              { id: 5, title: 'All about app : dir' },
            ].sort(compareItemObject))
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
              return-object
            />
          </>
        ))

        cy.get('.v-treeview-item').should('have.length', 7)
          .get('.v-treeview-item').eq(0).click()
          .then(_ => {
            expect(activated.value).to.deep.equal([
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
          })
          .get('.v-treeview-item').eq(1).click()
          .then(_ => {
            expect(activated.value).to.deep.equal([
              {
                id: 2,
                title: 'Tutorials :',
                children: [
                  { id: 3, title: 'Basic layouts : mp4' },
                  { id: 4, title: 'Advanced techniques : mp4' },
                  { id: 5, title: 'All about app : dir' },
                ],
              },
            ])
          })
          .get('.v-treeview-item').eq(2).click()
          .get('.v-treeview-item').eq(3).click()
          .get('.v-treeview-item').eq(4).click()
          .then(_ => {
            expect(activated.value).to.deep.equal([{ id: 5, title: 'All about app : dir' }])
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
              return-object
              selectable
              select-strategy="single-leaf"
            />
          </>
        ))

        cy.get('.v-checkbox-btn').should('have.length', 5)
          .get('.v-checkbox-btn').eq(0).click(20, 20)
          .get('.v-checkbox-btn').eq(1).click(20, 20)
          .then(_ => {
            expect(selected.value).to.deep.equal([{ id: 4, title: 'Advanced techniques : mp4' }])
          })
          .get('.v-checkbox-btn').eq(3).click(20, 20)
          .then(_ => {
            expect(selected.value).to.deep.equal([{ id: 6, title: 'Intro : mov' }])
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
              return-object
              selectable
              select-strategy="leaf"
            />
          </>
        ))

        cy.get('.v-checkbox-btn').should('have.length', 5)
          .get('.v-checkbox-btn').eq(0).click(20, 20)
          .get('.v-checkbox-btn').eq(1).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
            ].sort(compareItemObject))
          })
          .get('.v-checkbox-btn').eq(3).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
              { id: 6, title: 'Intro : mov' },
            ].sort(compareItemObject))
          })
      })
      it('independent strategy', () => {
        const selected = ref([])
        cy.mount(() => (
          <>
            <VTreeview
              v-model:selected={ selected.value }
              open-all
              items={ items.value }
              item-title="title"
              item-value="id"
              return-object
              selectable
              select-strategy="independent"
            />
          </>
        ))

        cy.get('.v-checkbox-btn').should('have.length', 7)
          .get('.v-checkbox-btn').eq(2).click(20, 20)
          .get('.v-checkbox-btn').eq(3).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
            ].sort(compareItemObject))
          })
          .get('.v-checkbox-btn').eq(1).click(20, 20)
          .get('.v-checkbox-btn').eq(0).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
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
              {
                id: 2,
                title: 'Tutorials :',
                children: [
                  { id: 3, title: 'Basic layouts : mp4' },
                  { id: 4, title: 'Advanced techniques : mp4' },
                  { id: 5, title: 'All about app : dir' },
                ],
              },
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
            ].sort(compareItemObject))
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
              return-object
              selectable
              select-strategy="single-independent"
            />
          </>
        ))

        cy.get('.v-checkbox-btn').should('have.length', 7)
          .get('.v-checkbox-btn').eq(2).click(20, 20)
          .get('.v-checkbox-btn').eq(3).click(20, 20)
          .then(_ => {
            expect(selected.value).to.deep.equal([{ id: 4, title: 'Advanced techniques : mp4' }])
          })
          .get('.v-checkbox-btn').eq(1).click(20, 20)
          .get('.v-checkbox-btn').eq(0).click(20, 20)
          .then(_ => {
            expect(selected.value).to.deep.equal([
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
              return-object
              select-strategy="classic"
            />
          </>
        ))

        cy.get('.v-checkbox-btn').eq(0).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
              { id: 5, title: 'All about app : dir' },
              { id: 6, title: 'Intro : mov' },
              { id: 7, title: 'Conference introduction : avi' },
            ].sort(compareItemObject))
          })
          .get('.v-checkbox-btn').eq(0).click(20, 20)
          .then(_ => {
            expect(selected.value).to.deep.equal([])
          })
          .get('.v-checkbox-btn').eq(1).click(20, 20)
          .then(_ => {
            expect(selected.value.sort(compareItemObject)).to.deep.equal([
              { id: 3, title: 'Basic layouts : mp4' },
              { id: 4, title: 'Advanced techniques : mp4' },
              { id: 5, title: 'All about app : dir' },
            ].sort(compareItemObject))
          })
      })
    })
    describe('search', () => {
      // https://github.com/vuetifyjs/vuetify/issues/20488
      it('should filter items based on the search text and return the correct result', () => {
        const items = ref([
          {
            id: 1,
            title: 'Vuetify Human Resources',
            children: [
              {
                id: 2,
                title: 'Core team',
                children: [
                  {
                    id: 201,
                    title: 'John',
                  },
                  {
                    id: 202,
                    title: 'Kael',
                  },
                  {
                    id: 203,
                    title: 'Nekosaur',
                  },
                  {
                    id: 204,
                    title: 'Jacek',
                  },
                  {
                    id: 205,
                    title: 'Andrew',
                  },
                ],
              },
              {
                id: 3,
                title: 'Administrators',
                children: [
                  {
                    id: 301,
                    title: 'Mike',
                  },
                  {
                    id: 302,
                    title: 'Hunt',
                  },
                ],
              },
              {
                id: 4,
                title: 'Contributors',
                children: [
                  {
                    id: 401,
                    title: 'Phlow',
                  },
                  {
                    id: 402,
                    title: 'Brandon',
                  },
                  {
                    id: 403,
                    title: 'Sean',
                  },
                ],
              },
            ],
          },
        ])
        const search = shallowRef('')

        function filterFn (value: string, search: string) {
          return value.toLowerCase().includes(search.toLowerCase())
        }
        cy.mount(() => (
          <>
            <VTextField v-model={ search.value } />
            <VTreeview
              customFilter={ filterFn }
              search={ search.value }
              items={ items.value }
              item-title="title"
              item-value="id"
              open-all
              return-object
            />
          </>
        ))
          .get('.v-text-field input')
          .type('j')
          .get('.v-treeview-item').eq(0).should('be.visible') // { id: 1, title: 'Vuetify Human Resources' }
          .get('.v-treeview-item').eq(1).should('be.visible') // { id: 2, title: 'Core team' }
          .get('.v-treeview-item').eq(2).should('be.visible') // { id: 201, title: 'John' }
          .get('.v-treeview-item').eq(3).should('not.be.visible')
          .get('.v-treeview-item').eq(4).should('not.be.visible')
          .get('.v-treeview-item').eq(5).should('be.visible') // { id: 204, title: 'Jacek' }
          .get('.v-treeview-item').eq(9).should('not.be.visible')
          .get('.v-treeview-item').eq(13).should('not.be.visible')
      })
    })
  })

  it('should have all items visible when open-all is applied', () => {
    cy.mount(() => (
      <>
        <VTreeview
          open-all
          items={ items.value }
          item-title="title"
          item-value="id"
        />
      </>
    ))
      .get('.v-treeview-item')
      .filter(':visible')
      .should('have.length', 7)
  })
})
