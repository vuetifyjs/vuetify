// Composables
import { useIcon } from '../icons'

// Utilities
import { unfill } from '@test'
import { mount } from '@vue/test-utils'
import { defineComponent, toRef } from 'vue'
import { createVuetify } from '@/framework'

describe('icons.tsx', () => {
  const Component = defineComponent({
    props: {
      icon: String,
    },
    setup (props) {
      const { iconData } = useIcon(toRef(props, 'icon'))

      return () => iconData.value.icon
    },
  })

  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      sets: {
        custom: {
          component: () => null,
        },
      },
    },
  })

  it.each([
    // Default icon set.
    ['success', 'success'],
    ['https://example.com/icon.svg', 'https://example.com/icon.svg'],
    // MDI icon set.
    ['mdi:success', 'success'],
    // Custom icon set.
    ['custom:https://example.com/icon.png', 'https://example.com/icon.png'],
  ])('should return the correct icon name', (icon, expected) => {
    const wrapper = mount(Component, {
      props: {
        icon,
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toEqual(expected)
  })

  it('has the same aliases in all presets', async () => {
    const sets = {
      fa: await import('@/iconsets/fa').then(m => m.aliases),
      fa4: await import('@/iconsets/fa4').then(m => m.aliases),
      faSvg: await import('@/iconsets/fa-svg').then(m => m.aliases),
      md: await import('@/iconsets/md').then(m => m.aliases),
      mdi: await import('@/iconsets/mdi').then(m => m.aliases),
      mdiSvg: await import('@/iconsets/mdi-svg').then(m => m.aliases),
    }
    const mdi = unfill(sets.mdi)

    for (const [name, value] of Object.entries(sets)) {
      expect({ [name]: unfill(value) }).toStrictEqual(expect.objectContaining({ [name]: mdi }))
    }
  })
})
