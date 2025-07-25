// Components
import { VTreeview } from '../VTreeview'

// Utilities
import { render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
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
            disabled: true,
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
  ['plain', items],
  ['reactive', reactive(items)],
])('VTreeview with %s items', (_, items) => {
  describe('activate', () => {
    it('single-leaf strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          openAll
          items={ items }
          itemValue="id"
          activatable
          activeStrategy="single-leaf"
        />
      ))

      await userEvent.click(screen.getByText(/Administrators/))
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
          openAll
          items={ items }
          itemValue="id"
          activatable
          activeStrategy="leaf"
        />
      ))

      await userEvent.click(screen.getByText(/Administrators/))
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
          openAll
          items={ items }
          itemValue="id"
          activatable
          activeStrategy="independent"
        />
      ))

      await userEvent.click(screen.getByText(/Administrators/))
      expect(activated.value).toStrictEqual([3])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([3, 201, 202, 203])

      await userEvent.click(screen.getByText(/Core team/))
      expect(activated.value).toStrictEqual([3, 201, 202, 203, 2])
    })

    it('single-independent strategy', async () => {
      const activated = ref([])
      render(() => (
        <VTreeview
          v-model:activated={ activated.value }
          openAll
          items={ items }
          itemValue="id"
          activatable
          activeStrategy="single-independent"
        />
      ))

      await userEvent.click(screen.getByText(/Administrators/))
      expect(activated.value).toStrictEqual([3])

      await userEvent.click(screen.getByText(/John/))
      await userEvent.click(screen.getByText(/Kael/))
      await userEvent.click(screen.getByText(/Nekosaur/))
      expect(activated.value).toStrictEqual([203])

      await userEvent.click(screen.getByText(/Core team/))
      expect(activated.value).toStrictEqual([2])
    })

    // https://github.com/vuetifyjs/vuetify/issues/20665
    it('should emit only once', async () => {
      const onActivated = vi.fn()
      render(() => (
        <VTreeview
          openAll
          items={ items }
          itemValue="id"
          activatable
          activeStrategy="independent"
          onUpdate:activated={ onActivated }
        />
      ))

      await userEvent.click(screen.getByText(/John/))
      expect(onActivated).toHaveBeenCalledOnce()

      await userEvent.click(screen.getByText(/Human Resources/))
      expect(onActivated).toHaveBeenCalledTimes(2)
    })
  })

  describe('select', () => {
    it('single-leaf strategy', async () => {
      const selected = ref([])
      render(() => (
        <VTreeview
          v-model:selected={ selected.value }
          openAll
          items={ items }
          itemValue="id"
          selectable
          selectStrategy="single-leaf"
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
          openAll
          items={ items }
          itemValue="id"
          selectable
          selectStrategy="leaf"
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
          openAll
          items={ items }
          itemValue="id"
          selectable
          selectStrategy="independent"
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
          openAll
          items={ items }
          itemValue="id"
          selectable
          selectStrategy="single-independent"
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
          openAll
          items={ items }
          itemValue="id"
          selectable
          selectStrategy="classic"
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
            itemValue="id"
            returnObject
          />
        ))

        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        await expect.element(screen.getByText(/Core/)).toBeVisible()
        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        await expect.element(screen.getByText(/Core/)).not.toBeVisible()
      })

      it('open-all should work', async () => {
        render(() => (
          <VTreeview
            openAll
            items={ items }
            itemValue="id"
            returnObject
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
            itemValue="id"
            returnObject
          />
        ))

        await userEvent.click(screen.getByText(/Vuetify/).parentElement!.previousElementSibling!)
        await expect.poll(() => opened.value).toEqual([
          expect.objectContaining({ id: 1 }),
        ])

        await waitAnimationFrame()
        await userEvent.click(screen.getByText(/Core/).parentElement!.previousElementSibling!)
        await expect.poll(() => opened.value).toEqual([
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
            openAll
            items={ items }
            itemValue="id"
            activatable
            activeStrategy="single-leaf"
            returnObject
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
            openAll
            items={ items }
            itemValue="id"
            activatable
            activeStrategy="leaf"
            returnObject
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
            openAll
            items={ items }
            itemValue="id"
            activatable
            activeStrategy="independent"
            returnObject
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
            openAll
            items={ items }
            itemValue="id"
            activatable
            activeStrategy="single-independent"
            returnObject
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
            openAll
            items={ items }
            itemValue="id"
            returnObject
            selectable
            selectStrategy="single-leaf"
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
            openAll
            items={ items }
            itemValue="id"
            returnObject
            selectable
            selectStrategy="leaf"
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
            openAll
            items={ items }
            itemValue="id"
            returnObject
            selectable
            selectStrategy="independent"
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
            openAll
            items={ items }
            itemValue="id"
            returnObject
            selectable
            selectStrategy="single-independent"
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
            openAll
            items={ items }
            itemValue="id"
            itemProps={ item => ({ disabled: item.disabled }) }
            selectable
            returnObject
            selectStrategy="classic"
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
          // expect.objectContaining({ id: 203 }), // disabled
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
            itemValue="id"
            openAll
            returnObject
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
        openAll
        items={ items }
        itemValue="id"
      />
    ))

    const itemEl = screen.getAllByCSS('.v-treeview-item')
    expect(itemEl).toHaveLength(11)
    itemEl.forEach(el => {
      expect(el).toBeVisible()
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/20830
  it('should return correct isOpen state in prepend slot', async () => {
    render(() => (
      <VTreeview
        items={ items }
        itemValue="id"
        openOnClick
        returnObject
      >
        {{
          prepend: ({ isOpen }) => (<span class="prepend-is-open">{ `${isOpen}` }</span>),
        }}
      </VTreeview>
    ))

    const itemsPrepend = screen.getAllByCSS('.v-treeview-item .v-list-item__prepend .prepend-is-open')

    await userEvent.click(screen.getByText(/Vuetify Human Resources/))
    await waitIdle()
    expect(itemsPrepend[0]).toHaveTextContent(/^true$/)
    expect(itemsPrepend[1]).toHaveTextContent(/^false$/)

    await userEvent.click(screen.getByText(/Core team/))
    await waitIdle()
    expect(itemsPrepend[0]).toHaveTextContent(/^true$/)
    expect(itemsPrepend[1]).toHaveTextContent(/^true$/)

    await userEvent.click(screen.getByText(/Core team/))
    await waitIdle()
    expect(itemsPrepend[0]).toHaveTextContent(/^true$/)
    expect(itemsPrepend[1]).toHaveTextContent(/^false$/)

    await userEvent.click(screen.getByText(/Vuetify Human Resources/))
    await waitIdle()
    expect(itemsPrepend[0]).toHaveTextContent(/^false$/)
    expect(itemsPrepend[1]).toHaveTextContent(/^false$/)
  })
})
