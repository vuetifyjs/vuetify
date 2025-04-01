<template>
  <v-list
    v-model:opened="opened"
    :items="computedItems"
    :lines="false"
    :nav="nav"
    color="primary"
    density="compact"
    item-props
    slim
  >
    <template v-if="$slots.item" #item="itemProps">
      <slot name="item" v-bind="itemProps" />
    </template>

    <template #header="{ props: itemProps }">
      <v-list-item v-bind="itemProps">
        <template #title>
          {{ itemProps.title }}

          <v-badge
            v-if="itemProps.emphasized"
            class="ms-n1"
            color="success"
            dot
            inline
          />
        </template>
      </v-list-item>
    </template>

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

    <template #subtitle="{ item }">
      <span v-if="item.subtitle" class="text-high-emphasis">
        {{ item.subtitle }}
      </span>
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
  // Types
  import type { RouteLocationRaw } from 'vue-router'
  import type { Prop } from 'vue'
  import apiList from 'virtual:api-list'

  export type Item = {
    title?: string
    subtitle?: string
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
    routeMatch?: string
    routePath?: string
    emphasized?: boolean
    onClick?: () => void
  }

  function generateApiItems (locale: string) {
    return apiList.map(name => {
      const path = kebabCase(name.startsWith('v-') ? name + '-directive' : name)
      return {
        title: name,
        to: `/${locale}/api/${path}`,
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

      const route = litem.routeMatch
        ? generatedRoutes.find((route: { path: string }) => route.path.endsWith(`/${locale}/${path}/${litem.routeMatch}/`))
        : generatedRoutes.find((route: { path: string }) => route.path.endsWith(`/${locale}/${path}/${litem.title}/`))

      const to = litem.routePath
        ? `/${locale}/${path}/${litem.routePath}/`
        : route?.path

      return {
        title: route?.meta?.nav ?? route?.meta?.title ?? litem.title,
        subtitle: litem.subtitle && te(litem.subtitle) ? t(litem.subtitle) : litem.subtitle,
        emphasized: route?.meta?.emphasized ?? false,
        to,
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
        emphasized: item.emphasized,
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
      onClick: item?.onClick,
      rel: item.href ? 'noopener noreferrer' : undefined,
      target: item.href ? '_blank' : undefined,
      children: item.title === 'api'
        ? generateApiItems(locale.value)
        : generateListItems(item, item.title!, locale.value, t),
      prependIcon: opened.value.includes(title ?? '') ? item.activeIcon : item.inactiveIcon,
      value: title,
      appendIcon: item.appendIcon,
      disabled: item.disabled,
      emphasized: item.emphasized,
    }
  }))
</script>
