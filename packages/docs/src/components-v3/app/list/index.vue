<template>
  <v-list
    v-model:active="active"
    v-model:opened="opened"
    density="compact"
    :items="computedItems"
  />
    <!-- <template v-for="(item, i) in items">
      <v-list-subheader
        v-if="item.heading"
        :key="`heading-${i}`"
        class="text--primary font-weight-black text-uppercase"
        v-text="item.heading"
      />

      <v-divider
        v-else-if="item.divider"
        :key="`divider-${i}`"
        class="mt-3 mb-2 ml-2 mr-n2"
      />

      <app-list-group
        v-else-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <slot
        v-else-if="$slots.item"
        name="item"
        :index="i"
        :item="item"
      />

      <app-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template> -->
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import type { Prop } from 'vue'
  import { useI18n } from 'vue-i18n'
  import routes from 'virtual:generated-pages'

  type Item = { title: string, activeIcon: string, inactiveIcon: string, items: string[] }

  function generateApiItems (locale: string) {
    return routes
      .filter(route => route.path.includes(`${locale}/api/`))
      .sort((a, b) => a.path.localeCompare(b.path))
      .map(route => {
        return {
          title: route.path.slice(route.path.lastIndexOf('/') + 1),
          to: route.path,
        }
      })
  }

  function generateItems (item: Item, locale: string) {
    if (!item.items) return undefined

    return item.items.map(child => {
      const route = routes.find((route: { path: string }) => route.path.endsWith(`${locale}/${item.title}/${child}`))
      return {
        title: route?.meta?.nav ?? route?.meta?.title ?? child,
        to: route?.path,
        disabled: !route,
      }
    })
  }

  export default defineComponent({
    name: 'AppList',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      } as Prop<Item[]>,
    },

    setup (props) {
      const { t, te, locale } = useI18n()
      const active = ref<string[]>([])
      const opened = ref<string[]>([])

      const computedItems = computed(() => props.items?.map(item => {
        return {
          title: item.title && te(item.title) ? t(item.title) : item.title,
          prependIcon: opened.value.includes(item.title) ? item.activeIcon : item.inactiveIcon,
          value: item.title,
          children: item.title === 'api' ? generateApiItems(locale.value) : generateItems(item, locale.value),
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
