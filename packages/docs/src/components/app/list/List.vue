<template>
  <v-list
    v-model:opened="opened"
    :nav="nav"
    :items="computedItems"
    :lines="false"
    color="primary"
    density="compact"
    item-props
  >
    <template #divider>
      <slot name="divider" />

      <v-divider
        v-if="!$slots.divider"
        class="my-3 mb-4 ms-2 me-n2"
      />
    </template>

    <template #title="{ item }">
      {{ item.title }}

      <v-badge
        v-if="item.emphasized"
        class="ms-n1"
        color="success"
        dot
        inline
      />
    </template>

    <template #subheader="{ props: subheaderProps }">
      <slot
        name="subheader"
        v-bind="{ subheaderProps }"
      />

      <v-list-subheader
        v-if="!$slots.subheader"
        class="text-high-emphasis text-uppercase font-weight-black"
      >
        {{ subheaderProps.title }}
      </v-list-subheader>
    </template>
  </v-list>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utiltities
  import { computed, ref } from 'vue'
  import { generatedRoutes as routes } from '@/util/routes'
  import { RouteLocationRaw, RouteRecordRaw } from 'vue-router'

  // Types
  import type { Prop } from 'vue'

  export type Item = {
    title?: string
    appendIcon?: string
    activeIcon?: string
    inactiveIcon?: string
    items?: (string | Item)[]
    subheader?: string
    divider?: boolean
    to?: RouteLocationRaw
    href?: string
    subfolder?: string
    disabled?: boolean
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

  function generateListItem (item: string | Item, path = '', locale = 'en', t = (key: string) => key): any {
    const isString = typeof item === 'string'
    const isLink = !isString && (item.to || item.href)
    const isParent = !isString && item.items
    const isType = !isString && (item.divider || item.subheader)

    if (isString || (!isLink && !isParent && !isType)) {
      const litem = isString ? { title: item } : item

      if (litem.subfolder) path = litem.subfolder

      const route = routes.find((route: { path: string }) => route.path.endsWith(`/${locale}/${path}/${litem.title}/`))

      return {
        title: route?.meta?.nav ?? route?.meta?.title ?? litem.title,
        emphasized: route?.meta?.emphasized ?? false,
        to: route?.path,
        disabled: !route,
      }
    } else if (item.divider) {
      return {
        type: 'divider',
      }
    } else if (item.subheader) {
      return {
        title: t(item.subheader!),
        type: 'subheader',
      }
    } else if (item.items) {
      const p = item.subfolder ? `${item.subfolder}/${item.title}` : path
      return {
        title: t(item.title!),
        children: item.items.map(item => generateListItem(item, p, locale, t)),
      }
    }

    return item
  }

  function generateListItems (item: Item, path: string, locale: string, t: (key: string) => string): any {
    if (!item.items) return undefined

    return item.items.map(child => generateListItem(child, path, locale, t))
  }

  const props = defineProps({
    items: {
      type: Array,
      default: () => ([]),
    } as Prop<Item[]>,
    nav: Boolean,
  })

  const { t, te, locale } = useI18n()
  const opened = ref<string[]>([])

  const computedItems = computed(() => props.items?.map(item => {
    if (item.divider || item.subheader) return generateListItem(item)

    const title = item.title && te(item.title) ? t(item.title) : item.title

    return {
      ...generateListItem({
        title,
        to: item?.to,
        href: item?.href,
      }),
      rel: item.href ? 'noopener noreferrer' : undefined,
      target: item.href ? '_blank' : undefined,
      children: item.title === 'api' ? generateApiItems(locale.value) : generateListItems(item, item.title!, locale.value, t),
      prependIcon: opened.value.includes(title ?? '') ? item.activeIcon : item.inactiveIcon,
      value: title,
      appendIcon: item.appendIcon,
      disabled: item.disabled,
    }
  }))
</script>
