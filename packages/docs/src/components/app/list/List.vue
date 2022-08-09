<template>
  <v-list
    v-model:opened="opened"
    :items="computedItems"
    :lines="false"
    :nav="nav"
    color="primary"
    density="compact"
    item-props
  />
</template>

<script lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utiltities
  import { computed, defineComponent, ref } from 'vue'
  import { generatedRoutes as routes } from '@/util/routes'
  import { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

  // Types
  import type { Prop } from 'vue'

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
            children: generateItems(child, path, locale, t),
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
        if (item.heading) {
          return {
            type: 'subheader',
            title: item.heading,
            class: 'on-surface font-weight-black text-uppercase',
          }
        }

        if (item.divider) {
          return {
            type: 'divider',
            class: 'my-2 ml-2 mr-n2',
          }
        }

        return {
          title: item.title && te(item.title) ? t(item.title) : item.title,
          value: item.title,
          to: item?.to,
          href: item?.href,
          target: item.href ? '_blank' : undefined,
          rel: item.href ? 'noopener noreferrer' : undefined,
          prependIcon: opened.value.includes(item.title!) ? item.activeIcon : item.inactiveIcon,
          children: item.title === 'api' ? generateApiItems(locale.value) : generateItems(item, item.title!, locale.value, t),
        }
      }))

      return {
        computedItems,
        opened,
      }
    },
  })
</script>
