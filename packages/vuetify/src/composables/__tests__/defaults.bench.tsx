// Components
import { VBtn } from '@/components/VBtn'
import { VList } from '@/components/VList'

// Utilities
import { render } from '@test'
import { bench } from 'vitest'
import { nextTick, shallowRef } from 'vue'

describe('render', () => {
  describe('VBtn', () => {
    bench('No defaults', async () => {
      render(() => <VBtn title="foo" prependIcon="$vuetify" />)
    })
    bench('Overridden defaults', async () => {
      render(
        () => <VBtn title="foo" prependIcon="$vuetify" />,
        null,
        {
          defaults: {
            VBtn: { prependIcon: '$vuetify-outline' },
          },
        }
      )
    })
    bench('Used defaults', async () => {
      render(
        () => <VBtn title="foo" />,
        null,
        {
          defaults: {
            VBtn: { prependIcon: '$vuetify-outline' },
          },
        }
      )
    })
  })

  describe('VList', () => {
    const items = [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' },
      { title: 'Item 5' },
      {
        title: 'Group 6',
        children: [
          { title: 'Item 6-1' },
          { title: 'Item 6-2' },
          { title: 'Item 6-3' },
          { title: 'Item 6-4' },
          { title: 'Item 6-5' },
        ],
      },
      { title: 'Item 7' },
      { title: 'Item 8' },
      { title: 'Item 9' },
    ]
    bench('No defaults', async () => {
      render(() => <VList items={ items } variant="tonal" />)
    })
    bench('Overridden defaults', async () => {
      render(
        () => <VList items={ items } variant="tonal" />,
        null,
        {
          defaults: {
            VListItem: { variant: 'outlined' },
          },
        }
      )
    })
    bench('Used defaults', async () => {
      render(
        () => <VList items={ items } />,
        null,
        {
          defaults: {
            VListItem: { variant: 'outlined' },
          },
        }
      )
    })
  })
})

describe('update', () => {
  describe('VBtn', () => {
    const title = shallowRef(String(Math.random()))
    bench('No defaults', async () => {
      title.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(() => <VBtn title={ title.value } prependIcon="$vuetify" />)
      },
    })
    bench('Overridden defaults', async () => {
      title.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(
          () => <VBtn title={ title.value } prependIcon="$vuetify" />,
          null,
          {
            defaults: {
              VBtn: { prependIcon: '$vuetify-outline' },
            },
          }
        )
      },
    })
    bench('Used defaults', async () => {
      title.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(
          () => <VBtn title={ title.value } />,
          null,
          {
            defaults: {
              VBtn: { prependIcon: '$vuetify-outline' },
            },
          }
        )
      },
    })
  })

  describe('VList', () => {
    const items = [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
      { title: 'Item 4' },
      { title: 'Item 5' },
      {
        title: 'Group 6',
        children: [
          { title: 'Item 6-1' },
          { title: 'Item 6-2' },
          { title: 'Item 6-3' },
          { title: 'Item 6-4' },
          { title: 'Item 6-5' },
        ],
      },
      { title: 'Item 7' },
      { title: 'Item 8' },
      { title: 'Item 9' },
    ]
    const color = shallowRef(String(Math.random()))
    bench('No defaults', async () => {
      color.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(() => <VList items={ items } variant="tonal" color={ color.value } />)
      },
    })
    bench('Overridden defaults', async () => {
      color.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(
          () => <VList items={ items } variant="tonal" color={ color.value } />,
          null,
          {
            defaults: {
              VListItem: { variant: 'outlined' },
            },
          }
        )
      },
    })
    bench('Used defaults', async () => {
      color.value = String(Math.random())
      await nextTick()
    }, {
      setup () {
        render(
          () => <VList items={ items } color={ color.value } />,
          null,
          {
            defaults: {
              VListItem: { variant: 'outlined' },
            },
          }
        )
      },
    })
  })
})
