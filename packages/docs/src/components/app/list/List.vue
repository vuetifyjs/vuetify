<template>
  <v-list
    v-model:opened="opened"
    density="compact"
    color="primary"
    :nav="nav"
    :items="computedItems"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import type { Prop } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { generatedRoutes as routes } from '@/util/routes'
  import { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

  export type Item = {
    title?: string
    activeIcon?: string
    inactiveIcon?: string
    items?: (string | Item)[]
    heading?: string
    divider?: boolean
    to?: RouteLocationRaw
    href?: string
  }

  function generateApiItems (locale: string) {
    return (routes as RouteRecordRaw[])
      .filter(route => route.path.includes(`${locale}/api/`))
      .sort((a, b) => a.path.localeCompare(b.path))
      .map(route => {
        return {
          title: (route.meta!.title as string).slice(0, -4),
          to: route.path,
        }
      })
  }

  function generateItems (item: Item, path: string, locale: string, t: (key: string) => string): any {
    if (item.items) {
      return item.items.map(child => {
        if (typeof child === 'string') {
          const route = routes.find((route: { path: string }) => route.path.endsWith(`${locale}/${path}/${child}/`))

          return {
            title: route?.meta?.nav ?? route?.meta?.title ?? child,
            to: route?.path,
            disabled: !route,
          }
        } else {
          return {
            title: t(child.title!),
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
      const opened = ref<string[]>([])

      const computedItems = computed(() => props.items?.map(item => {
        if (item.heading) return { type: 'subheader', title: item.heading }
        if (item.divider) return { type: 'divider' }

        return {
          activeIcon: item.activeIcon,
          inactiveIcon: item.inactiveIcon,
          title: item.title && te(item.title) ? t(item.title) : item.title,
          value: item.title,
          $children: item.title === 'api' ? generateApiItems(locale.value) : generateItems(item, item.title!, locale.value, t),
        }
      }))

      function itemProps (item: any) {
        return {
          prependIcon: opened.value.includes(item.title) ? item.activeIcon : item.inactiveIcon,
        }
      }

      return {
        computedItems,
        opened,
        itemProps,
      }
    },
  })
</script>
