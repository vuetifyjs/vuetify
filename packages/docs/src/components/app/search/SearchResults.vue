<!--  eslint-disable vue/no-template-shadow -->
<!--  eslint-disable vue/valid-v-for -->
<!--  eslint-disable vue/require-v-for-key -->
<template>
  <v-list
    ref="rootEl"
    bg-color="transparent"
    class="pa-0"
    density="compact"
    nav
  >
    <template
      v-for="(group, i) in props.groups"
      :key="`group-${group.name}-${i}`"
    >
      <AppSheet :class="['pa-3', i !== 0 && 'mt-4']" border>
        <div class="text-high-emphasis font-weight-bold d-flex align-center text-h6 mb-2">
          <v-icon
            :icon="getIcon(group)"
            class="me-2"
            color="medium-emphasis"
            size="22"
          />

          {{ group.name }}
        </div>

        <template
          v-for="(child, ci) in group.items"
          :key="`group-item-${child.name}-${i}`"
        >
          <v-list-item
            :to="getPathname(child)"
            append-icon="mdi-chevron-right"
            class="mb-0"
            prepend-icon="mdi-home-outline"
            slim
            @click="onSearchClick(child.name, getPathname(child))"
          >
            <template #append>
              <v-icon size="16" />
            </template>

            <v-list-item-title>
              <div class="d-inline-block" v-html="child.items[0]._highlightResult.hierarchy.lvl1.value" />

              <v-list-item-subtitle class="d-inline-flex ps-1">
                &rsaquo; Home
              </v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item>

          <template v-if="child.items[0]._highlightResult.hierarchy.lvl1.matchLevel !== 'full'">
            <v-list-item
              v-for="(item, it) in child.items"
              :key="`search-${i}-${ci}-${it}-children`"
              :append-icon="item.url.indexOf('#') > -1 ? 'mdi-chevron-right' : undefined"
              :prepend-icon="item.url.indexOf('#') > -1 ? 'mdi-pound' : undefined"
              :to="item.url"
              class="ps-6 mb-0"
              slim
              @click="onSearchClick(child.name, item.url)"
            >
              <template #prepend>
                <v-icon size="14" />
              </template>

              <template #append>
                <v-icon size="16" />
              </template>

              <v-list-item-subtitle
                class="text-wrap font-weight-bold"
                v-html="makeBreadcrumbs(item._highlightResult.hierarchy)"
              />

              <v-list-item-subtitle
                v-if="item.content"
                class="text-caption text-wrap text-high-emphasis font-weight-regular"
                v-html="truncateContent(item)"
              />
            </v-list-item>
          </template>
        </template>
      </AppSheet>
    </template>
  </v-list>
</template>

<script setup lang="ts">
  // Types
  import type { VList } from 'vuetify/components'

  const props = defineProps<{ groups: any[] }>()
  const emit = defineEmits(['click:result'])

  const app = useAppStore()

  const rootEl = ref<VList>()
  defineExpose({ rootEl })

  function makeBreadcrumbs (hierarchy: any) {
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
  function getIcon (group: Record<string, any>) {
    let name = group.name.toLowerCase().replace(/[^a-z]/g, '-')

    if (name === 'styles-and-animations') name = 'styles'

    return app.categories?.[name]?.icon ?? '$vuetify'
  }
  function onSearchClick (name: string, url: string) {
    emit('click:result', {
      name,
      hash: url.indexOf('#') > -1 ? url.split('#')[1] : undefined,
      url,
    })
  }
</script>

<style lang="sass" scoped>
//.v-list .v-list-item
//  min-height: 0

:deep(mark)
  background: rgb(33, 150, 243, 30%)
  color: inherit
</style>
