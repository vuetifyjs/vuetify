<template>
  <div>
    <v-autocomplete
      v-model="model"
      :items="components"
      base-color="disabled"
      class="mb-2"
      placeholder="Search Vuetify API"
      prepend-inner-icon="mdi-database-search-outline"
      variant="outlined"
      auto-select-first
      autofocus
      chips
      clearable
      hide-details
      item-props
      persistent-clear
    >
      <template #chip="{ props, item }">
        <v-chip
          v-bind="props"
          :prepend-icon="item.props.prependIcon"
          color="primary"
          variant="flat"
          label
        />
      </template>
    </v-autocomplete>

    <template v-if="model">
      <ApiSearch ref="search" />

      <template v-for="(section, i) in sections" :key="i">
        <ApiSection
          :name="model"
          :section="section"
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
  import files from 'virtual:api-list'

  const route = useRoute()
  const router = useRouter()

  const search = shallowRef()

  const components = files.reduce((acc, name) => {
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

  const name = route.params.name?.replace('/', '')
  const pascalName = name ? `${name.charAt(0).toUpperCase()}${camelize(name.slice(1))}` : undefined
  const model = shallowRef(components.some(v => v.value === name) ? name : pascalName)

  const sections = ['props', 'events', 'slots', 'exposed', 'sass', 'options', 'argument', 'modifiers']

  watch(model, async () => {
    if (!model.value) return

    await nextTick()

    search.value.$el.querySelector('input').focus()
    router.replace({ params: { name: kebabCase(model.value) } })
  })
</script>
