// Components
import { VTreeview } from '../VTreeview'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, reactive, ref, shallowRef } from 'vue'

const items = [
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
        title: 'Other contributors',
      },
    ],
  },
]

describe.each([
  // ['plain', items], // TODO: broken
  ['reactive', reactive(items)],
])('VTreeview with %s items', (_, items) => {
  describe('activate', () => {
    it('single-leaf strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          open-all
          items={ items }
          item-value="id"
          activatable
          active-strategy="single-leaf"
        />
      ))

      await userEvent.click(screen.getByText(/Human Resources/))
      expect(activated.value).toStrictEqual([])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([203])
    })

    it('leaf strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          open-all
          items={ items }
          item-value="id"
          activatable
          active-strategy="leaf"
        />
      ))

      await userEvent.click(screen.getByText(/Human Resources/))
      expect(activated.value).toStrictEqual([])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([201, 202, 203])
    })

    it('independent strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          open-all
          items={ items }
          item-value="id"
          activatable
          active-strategy="independent"
        />
      ))

      await userEvent.click(screen.getByText(/Human Resources/))
      expect(activated.value).toStrictEqual([1])

      await userEvent.click(screen.getByText(/Core team/))
      expect(activated.value).toStrictEqual([1, 2])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([1, 2, 201, 202, 203])
    })

    it('single-independent strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          open-all
          items={ items }
          item-value="id"
          activatable
          active-strategy="single-independent"
        />
      ))

      await userEvent.click(screen.getByText(/Human Resources/))
      expect(activated.value).toStrictEqual([1])

      await userEvent.click(screen.getByText(/Core team/))
      expect(activated.value).toStrictEqual([2])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([203])
    })
  })

  describe('select', () => {
    it('single-leaf strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          open-all
          items={ items }
          item-value="id"
          selectable
          select-strategy="single-leaf"
        />
      ))

      expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(8)
      await userEvent.click(screen.getByText(/Mike/))
      await userEvent.click(screen.getByText(/Hunt/))
      expect(selected.value).toStrictEqual([302])
      await userEvent.click(screen.getByText(/contributors/))
      expect(selected.value).toStrictEqual([4])
    })

    it('leaf strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          open-all
          items={ items }
          item-value="id"
          selectable
          select-strategy="leaf"
        />
      ))

      expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(8)
      await userEvent.click(screen.getByText(/Mike/))
      await userEvent.click(screen.getByText(/Hunt/))
      expect(selected.value).toStrictEqual([301, 302])
      await userEvent.click(screen.getByText(/contributors/))
      expect(selected.value).toStrictEqual([301, 302, 4])
    })

    it('independent strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          open-all
          items={ items }
          item-value="id"
          selectable
          select-strategy="independent"
        />
      ))

      expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
      await userEvent.click(screen.getByText(/Mike/))
      await userEvent.click(screen.getByText(/Hunt/))
      expect(selected.value).toStrictEqual([301, 302])
      await userEvent.click(screen.getByText(/contributors/))
      expect(selected.value).toStrictEqual([301, 302, 4])
      await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
      await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
      expect(selected.value).toStrictEqual([301, 302, 4, 2, 1])
    })

    it('single-independent strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          open-all
          items={ items }
          item-value="id"
          selectable
          select-strategy="single-independent"
        />
      ))

      expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      expect(selected.value).toStrictEqual([202])
      await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
      await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
      expect(selected.value).toStrictEqual([1])
    })

    it('classic strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          open-all
          items={ items }
          item-value="id"
          selectable
          select-strategy="classic"
        />
      ))

      expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
      await userEvent.click(screen.getByText(/Mike/))
      await userEvent.click(screen.getByText(/Hunt/))
      expect(selected.value).toStrictEqual([301, 302])
      await userEvent.click(screen.getByText(/Administrators/).parentElement!.previousElementSibling!)
      expect(selected.value).toStrictEqual([])
      await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
      expect(selected.value).toStrictEqual([4, 201, 202, 203, 204, 205, 301, 302])
    })
  })

  describe('return-object', () => {
    describe('open', () => {
      it('open and collapse should both work', async () => {
        render(() => (
          <VTreeview
            items={ items }
            item-value="id"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect.element(screen.getByText(/Core/)).toBeVisible()
        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect.element(screen.getByText(/Core/)).not.toBeVisible()
      })

      it('open-all should work', async () => {
        render(() => (
          <VTreeview
            open-all
            items={ items }
            item-value="id"
            return-object
          />
        ))

        const itemEl = screen.getAllByCSS('.v-treeview-item')
        expect(itemEl).toHaveLength(11)
        itemEl.forEach(el => {
          expect(el).toBeVisible()
        })
      })

      it('should return opened object to v-model:opened', async () => {
        const opened = ref<any[]>([])
        render(() => (
          <VTreeview
            v-model:opened={ opened.value }
            items={ items }
            item-value="id"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect(opened.value).toEqual([
          expect.objectContaining({ id: 1 }),
        ])

        await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
        expect(opened.value).toEqual([
          expect.objectContaining({ id: 1 }),
          expect.objectContaining({ id: 2 }),
        ])
      })
    })

    describe('activate', () => {
      it('single-leaf strategy', async () => {
        const activated = ref([])
        render(() => (
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items }
            item-value="id"
            activatable
            active-strategy="single-leaf"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Human Resources/))
        expect(activated.value).toStrictEqual([])

        await userEvent.click(screen.getByText(/John/))
        await userEvent.click(screen.getByText(/Kael/))
        await userEvent.click(screen.getByText(/Nekosaur/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 203 }),
        ])
      })

      it('leaf strategy', async () => {
        const activated = ref([])
        render(() => (
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items }
            item-value="id"
            activatable
            active-strategy="leaf"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Human Resources/))
        expect(activated.value).toStrictEqual([])

        await userEvent.click(screen.getByText(/John/))
        await userEvent.click(screen.getByText(/Kael/))
        await userEvent.click(screen.getByText(/Nekosaur/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 201 }),
          expect.objectContaining({ id: 202 }),
          expect.objectContaining({ id: 203 })]
        )
      })

      it('independent strategy', async () => {
        const activated = ref([])
        render(() => (
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items }
            item-value="id"
            activatable
            active-strategy="independent"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Human Resources/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 1 }),
        ])

        await userEvent.click(screen.getByText(/Core team/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 1 }),
          expect.objectContaining({ id: 2 }),
        ])

        await userEvent.click(screen.getByText(/John/))
        await userEvent.click(screen.getByText(/Kael/))
        await userEvent.click(screen.getByText(/Nekosaur/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 1 }),
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 201 }),
          expect.objectContaining({ id: 202 }),
          expect.objectContaining({ id: 203 }),
        ])
      })

      it('single-independent strategy', async () => {
        const activated = ref([])
        render(() => (
          <VTreeview
            v-model:activated={ activated.value }
            open-all
            items={ items }
            item-value="id"
            activatable
            active-strategy="single-independent"
            return-object
          />
        ))

        await userEvent.click(screen.getByText(/Human Resources/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 1 }),
        ])

        await userEvent.click(screen.getByText(/Core team/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 2 }),
        ])

        await userEvent.click(screen.getByText(/John/))
        await userEvent.click(screen.getByText(/Kael/))
        await userEvent.click(screen.getByText(/Nekosaur/))
        expect(activated.value).toStrictEqual([
          expect.objectContaining({ id: 203 }),
        ])
      })
    })

    describe('select', () => {
      it('single-leaf strategy', async () => {
        const selected = ref([])
        render(() => (
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items }
            item-value="id"
            return-object
            selectable
            select-strategy="single-leaf"
          />
        ))

        expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(8)
        await userEvent.click(screen.getByText(/Mike/))
        await userEvent.click(screen.getByText(/Hunt/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 302 }),
        ])
        await userEvent.click(screen.getByText(/contributors/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 4 }),
        ])
      })

      it('leaf strategy', async () => {
        const selected = ref([])
        render(() => (
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items }
            item-value="id"
            return-object
            selectable
            select-strategy="leaf"
          />
        ))

        expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(8)
        await userEvent.click(screen.getByText(/Mike/))
        await userEvent.click(screen.getByText(/Hunt/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
        ])
        await userEvent.click(screen.getByText(/contributors/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
          expect.objectContaining({ id: 4 }),
        ])
      })

      it('independent strategy', async () => {
        const selected = ref([])
        render(() => (
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items }
            item-value="id"
            return-object
            selectable
            select-strategy="independent"
          />
        ))

        expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
        await userEvent.click(screen.getByText(/Mike/))
        await userEvent.click(screen.getByText(/Hunt/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
        ])
        await userEvent.click(screen.getByText(/contributors/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
          expect.objectContaining({ id: 4 }),
        ])
        await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
          expect.objectContaining({ id: 4 }),
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 1 }),
        ])
      })

      it('single-independent strategy', async () => {
        const selected = ref([])
        render(() => (
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items }
            item-value="id"
            return-object
            selectable
            select-strategy="single-independent"
          />
        ))

        expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
        await userEvent.click(screen.getByText(/John/))
        await userEvent.click(screen.getByText(/Kael/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 202 }),
        ])
        await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 1 }),
        ])
      })

      it('classic strategy', async () => {
        const selected = ref([])
        render(() => (
          <VTreeview
            v-model:selected={ selected.value }
            open-all
            items={ items }
            item-value="id"
            selectable
            return-object
            select-strategy="classic"
          />
        ))

        expect(screen.getAllByCSS('.v-checkbox-btn')).toHaveLength(11)
        await userEvent.click(screen.getByText(/Mike/))
        await userEvent.click(screen.getByText(/Hunt/))
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
        ])
        await userEvent.click(screen.getByText(/Administrators/).parentElement!.previousElementSibling!)
        expect(selected.value).toStrictEqual([])
        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        expect(selected.value).toStrictEqual([
          expect.objectContaining({ id: 4 }),
          expect.objectContaining({ id: 201 }),
          expect.objectContaining({ id: 202 }),
          expect.objectContaining({ id: 203 }),
          expect.objectContaining({ id: 204 }),
          expect.objectContaining({ id: 205 }),
          expect.objectContaining({ id: 301 }),
          expect.objectContaining({ id: 302 }),
        ])
      })
    })

    describe('search', () => {
      // https://github.com/vuetifyjs/vuetify/issues/20488
      it('should filter items based on the search text and return the correct result', async () => {
        const search = shallowRef('')
        render(() => (
          <VTreeview
            search={ search.value }
            items={ items }
            item-value="id"
            open-all
            return-object
          />
        ))

        search.value = 'j'
        await nextTick()
        expect(screen.getByText(/Vuetify/)).toBeVisible()
        expect(screen.getByText(/Core/)).toBeVisible()
        expect(screen.getByText(/John/)).toBeVisible()
        expect(screen.getByText(/Jacek/)).toBeVisible()
        expect(screen.getByText(/Andrew/)).not.toBeVisible()
        expect(screen.getByText(/Administrators/)).not.toBeVisible()
      })
    })
  })

  it('should have all items visible when open-all is applied', async () => {
    render(() => (
      <VTreeview
        open-all
        items={ items }
        item-value="id"
      />
    ))

    const itemEl = screen.getAllByCSS('.v-treeview-item')
    expect(itemEl).toHaveLength(11)
    itemEl.forEach(el => {
      expect(el).toBeVisible()
    })
  })
})
