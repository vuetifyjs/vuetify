<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="components"
      auto-select-first
      base-color="disabled"
      chips
      class="mb-2"
      clearable
      hide-details
      item-props
      persistent-clear
      placeholder="Search Vuetify API"
      prepend-inner-icon="mdi-database-search-outline"
      return-object
      variant="outlined"
    >
      <template #chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-icon="item.props.prependIcon"
          color="primary"
          label
          variant="flat"
        />
      </template>
    </v-autocomplete>

    <template v-if="model">
      <api-search ref="search" />

      <template v-for="(section, i) in sections" :key="i">
        <api-section
          :section="section"
          :name="model"
          show-headline
        />
      </template>
    </template>

    <div v-else class="text-center d-flex flex-column justify-center align-center my-10">
      <v-icon
        color="disabled"
        icon="mdi-text-box-search-outline"
        size="150"
      />

      <br>

      <v-list-subheader class="d-inline-flex">
        API Properties will appear here
      </v-list-subheader>
    </div>
  </div>
</template>

<script setup>
  // Utilities
  import { nextTick, ref, shallowRef, watch } from 'vue'

  const files = import.meta.glob('../../../../api-generator/dist/api/*.json')

  const model = ref()
  const search = shallowRef()

  const components = Object.keys(files).reduce((acc, cur) => {
    const name = cur.split('/').pop().split('.')[0]
    let prependIcon
    let subtitle

    if (name.startsWith('V')) {
      prependIcon = 'mdi-view-dashboard'
      subtitle = 'Component'
    } else if (name.startsWith('v-')) {
      prependIcon = 'mdi-function'
      subtitle = 'Directive'
    } else if (name.startsWith('use')) {
      prependIcon = '$vuetify'
      subtitle = 'Composable'
    } else {
      return acc
    }

    acc.push({
      title: name,
      value: name,
      prependIcon,
      subtitle,
    })

    return acc
  }, [])

  const sections = ['props', 'events', 'slots', 'exposed', 'sass', 'options', 'argument', 'modifiers']

  watch(model, async () => {
    if (!model.value) return

    await nextTick()

    search.value.$el.querySelector('input').focus()
  })
</script>
