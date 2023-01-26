<!--  eslint-disable vue/no-template-shadow -->
<!--  eslint-disable vue/valid-v-for -->
<!--  eslint-disable vue/require-v-for-key -->
<template>
  <v-list ref="rootEl" density="compact" nav bg-color="transparent">
    <template v-for="(group, i) in props.groups">
      <v-divider
        v-if="i !== 0"
        class="mb-2 mt-2 ms-2 me-n2"
      />

      <div class="text-high-emphasis font-weight-black text-uppercase">
        {{ group.name }}
      </div>

      <template v-for="(child, ci) in group.items">
        <v-list-item
          v-if="child.items[0]._highlightResult.hierarchy.lvl1.matchLevel === 'full'"
          :key="`search-${i}-${ci}`"
          :to="getPathname(child)"
        >
          <v-list-item-title>
            <div class="d-inline-block" v-html="child.items[0]._highlightResult.hierarchy.lvl1.value" />

            <v-list-item-subtitle class="d-inline-flex ps-1">
              &rsaquo; Home
            </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item>

        <template v-else>
          <v-list-item
            :key="`search-${i}-${child.name}`"
            class="mb-0"
          >
            <v-list-item-title v-html="child.name" />
          </v-list-item>

          <v-list-item
            v-for="(item, it) in child.items"
            :key="`search-${i}-${ci}-${it}-children`"
            :to="item.url"
            class="ps-4 mb-0"
          >
            <v-list-item-subtitle
              class="text-wrap font-weight-medium"
              v-html="makeBreadcrumbs(item)"
            />

            <v-list-item-subtitle
              v-if="item.content"
              class="text-caption text-wrap text-high-emphasis font-weight-regular ps-2"
              v-html="truncateContent(item)"
            />
          </v-list-item>
        </template>
      </template>
    </template>
  </v-list>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { VList } from 'vuetify/components'

  const props = defineProps<{ groups: any[] }>()

  const rootEl = ref<VList>()
  defineExpose({ rootEl })

  function makeBreadcrumbs (item: any) {
    const hierarchy = item._highlightResult.hierarchy
    let str = ''

    for (const lvl of Object.keys(hierarchy).slice(2)) {
      if (str.length) str += ' &rsaquo; '
      str += hierarchy[lvl].value
      if (hierarchy[lvl].matchLevel === 'full') break
    }

    return str
  }
  function truncateContent (item: any) {
    const val = item._highlightResult.content.value.trim()

    // number of characters until the word after the end of the first mark
    const withMark = val.match(/^.*?<\/mark>(.{4,}?\b)?/)?.[0].length ?? 0

    // characters until the end of the first word after the 72char limit
    const minLength = val.match(/^.{0,72}.?\b/)?.[0].length ?? 0

    const length = Math.max(withMark, minLength)
    const continues = val.length > length

    return val.slice(0, length) + (continues ? '&mldr;' : '')
  }
  function getPathname (group: any) {
    return new URL(location.origin + group.items[0].url).pathname
  }
</script>

<style lang="sass" scoped>
//.v-list .v-list-item
//  min-height: 0

:deep(mark)
  background: rgb(33, 150, 243, 30%)
  color: inherit
</style>
