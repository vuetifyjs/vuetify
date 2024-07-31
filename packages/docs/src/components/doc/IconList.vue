<template>
  <v-autocomplete
    v-model="selection"
    v-model:search="search"
    :item-props="itemProps"
    :items="filteredIcons"
    :loading="loading"
    :placeholder="t('search.icons')"
    item-title="name"
    item-value="name"
    variant="outlined"
    clearable
    no-filter
  >
    <template #prepend-inner>
      <v-expand-x-transition>
        <v-icon v-if="selection" start>
          {{ getIcon(selection) }}
        </v-icon>
      </v-expand-x-transition>

      <code class="me-n1">mdi-</code>
    </template>

    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <template #append>
          <v-btn
            icon="mdi-content-copy"
            size="small"
            variant="plain"
            @click.stop="copy(item.raw.name)"
          />
        </template>
      </v-list-item>
    </template>

    <template #append-inner>
      <v-expand-x-transition>
        <span v-if="copied" class="text-primary pt-1">
          {{ t('copied') }}
        </span>
      </v-expand-x-transition>
    </template>
  </v-autocomplete>
</template>

<script setup>
  // Data
  import * as paths from '@mdi/js'

  const { t } = useI18n()

  const copied = shallowRef(false)
  const loading = shallowRef(true)
  const icons = shallowRef([])
  const selection = shallowRef()
  const search = shallowRef('')

  import('@mdi/svg/meta.json')
    .then(i => icons.value = i.default)
    .catch(console.error)
    .finally(() => loading.value = false)

  /** @param s {string} */
  function * mapIcons (s) {
    for (const icon of icons.value) {
      yield {
        name: icon.name,
        distance: Math.max(
          distance(s, icon.name),
          ...icon.aliases.map(v => distance(search.value, v))
        ),
      }
    }
  }

  /** @param s {string} */
  function * filterIcons (s) {
    for (const icon of mapIcons(s)) {
      if (icon.distance > 0.7) {
        yield icon
      }
    }
  }

  const filteredIcons = computed(() => {
    const s = search.value.trim()
    if (!s.length) return icons.value

    return [...filterIcons(s)].sort((a, b) => b.distance - a.distance)
  })

  watch(selection, value => {
    value && copy(value)
  })

  function getIcon (name) {
    return 'svg:' + paths[camelize('mdi-' + name)]
  }
  function itemProps (item) {
    return {
      prependIcon: getIcon(item.name),
    }
  }
  function copy (item) {
    navigator.clipboard.writeText('mdi-' + item).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
</script>
