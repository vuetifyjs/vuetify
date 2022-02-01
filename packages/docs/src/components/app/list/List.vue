<template>
  <v-list
    v-model:active="active"
    v-model:opened="opened"
    density="compact"
    :nav="nav"
    :items="computedItems"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import type { Prop } from 'vue'
  import { useI18n } from 'vue-i18n'
  import routes from 'virtual:generated-pages'

  type Item = {
    title: string,
    activeIcon: string,
    inactiveIcon: string,
    items: string[] | Item[]
    heading?: string;
    divider?: boolean;
  }

  function generateApiItems (locale: string) {
    return (routes as { path: string}[])
      .filter(route => route.path.includes(`${locale}/api/`))
      .sort((a, b) => a.path.localeCompare(b.path))
      .map(route => {
        return {
          title: route.path.slice(route.path.lastIndexOf('/') + 1),
          to: route.path,
        }
      })
  }

  function generateItems (item: Item, path: string, locale: string, t: (key: string) => string): any {
    if (item.items) {
      return item.items.map(child => {
        if (typeof child === 'string') {
          const route = routes.find((route: { path: string }) => route.path.endsWith(`${locale}/${path}/${child}`))

          return {
            title: route?.meta?.nav ?? route?.meta?.title ?? child,
            to: route?.path,
            disabled: !route,
          }
        } else {
          return {
            title: t(child.title),
            $children: generateItems(child, path, locale, t),
          }
        }
      })
    }

    return undefined
  }

  export default defineComponent({
    name: 'AppList',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      } as Prop<Item[]>,
      nav: Boolean,
    },

    setup (props) {
      const { t, te, locale } = useI18n()
      const active = ref<string[]>([])
      const opened = ref<string[]>([])

      const computedItems = computed(() => props.items?.map(item => {
        if (item.heading) return { $type: 'subheader', text: item.heading }
        if (item.divider) return { $type: 'divider' }

        return {
          title: item.title && te(item.title) ? t(item.title) : item.title,
          prependIcon: opened.value.includes(item.title) ? item.activeIcon : item.inactiveIcon,
          value: item.title,
          $children: item.title === 'api' ? generateApiItems(locale.value) : generateItems(item, item.title, locale.value, t),
        }
      }))

      return {
        computedItems,
        active,
        opened,
      }
    },
  })
</script>
