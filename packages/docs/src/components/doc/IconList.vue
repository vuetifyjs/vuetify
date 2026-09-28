<template>
  <v-autocomplete
    v-model="selection"
    v-model:menu="menu"
    v-model:search="search"
    :items="filteredIcons"
    :loading="loading ? 'primary' : false"
    :placeholder="t('search.icons')"
    item-title="name"
    item-value="name"
    variant="outlined"
    clearable
    no-filter
    return-object
    @focus.once="load"
  >
    <template #prepend-inner>
      <v-expand-x-transition>
        <v-icon v-if="selection" :icon="'mdi-' + selection.name" start />
      </v-expand-x-transition>

      <code class="me-n1">mdi-</code>
    </template>

    <template #item="{ props, item }">
      <v-list-item v-bind="props" :prepend-icon="'svg:' + item.path">
        <template #append>
          <v-btn
            icon="mdi-content-copy"
            size="small"
            tabindex="-1"
            variant="plain"
            @click.stop="copy(item.name)"
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

<script setup lang="ts">
  import type { IconEntry } from 'virtual:mdi-js-icons'

  const { t } = useI18n()

  const copied = shallowRef(false)
  const loading = shallowRef(false)
  const menu = shallowRef(false)
  const icons = shallowRef<IconEntry[]>([])
  const selection = shallowRef<IconEntry>()
  const search = shallowRef('')

  async function load () {
    const _menu = menu.value
    loading.value = true
    // TODO: virtual loads everything if menu is open
    menu.value = false
    await import('virtual:mdi-js-icons')
      .then(m => icons.value = m.icons)
      .catch(console.error)
    loading.value = false
    menu.value = _menu
  }

  function * filterIcons (s: string) {
    for (const icon of icons.value) {
      const distance = Math.max(
        getDistance(s, icon.name),
        ...icon.aliases.map(v => getDistance(search.value, v))
      )
      if (distance > 0.7) {
        yield {
          name: icon.name,
          path: icon.path,
          distance,
        }
      }
    }
  }

  const filteredIcons = computed(() => {
    const s = search.value.trim()
    if (!s.length) return icons.value

    return [...filterIcons(s)].sort((a, b) => b.distance - a.distance)
  })

  watch(selection, value => {
    value && copy(value.name)
  })

  function copy (name: string) {
    navigator.clipboard.writeText('mdi-' + name).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
</script>
