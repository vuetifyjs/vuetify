<template>
  <v-autocomplete
    v-model="model"
    :custom-filter="customFilter"
    :items="variables"
    base-color="disabled"
    item-value="id"
    placeholder="Search SASS API"
    prepend-inner-icon="mdi-database-search-outline"
    variant="outlined"
    auto-select-first
    chips
    clearable
    item-props
    multiple
    persistent-clear
    return-object
  >
    <template #chip="{ props }">
      <v-chip
        v-bind="props"
        color="primary"
        variant="flat"
        label
      />
    </template>
  </v-autocomplete>

  <AppMarkup
    v-if="model.length > 0"
    :code="code"
    class="mb-6"
    language="scss"
    resource="src/styles/main.scss"
  />
</template>

<script setup>
  const files = import.meta.glob('../../../../api-generator/dist/api/*.json')

  const variables = ref([])
  const model = shallowRef([])

  const code = computed(() => {
    const $parsed = model.value.map(variable => {
      return `  ${variable.title}: ${variable.default}`
    }).join(',\n')

    return `@use 'vuetify/settings' with (\n${$parsed},\n);`
  })

  async function getVariables (name) {
    return import(`../../../../api-generator/dist/api/${name}.json`)
  }

  function customFilter (value, query, item) {
    console.log(value)
    return (
      item.props.title.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      item.props.subtitle.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  async function fetchApiData () {
    try {
      for (const file in files) {
        const name = file.split('/').pop().split('.')[0]

        if (!name.startsWith('V') && name !== 'globals') continue

        const component = await getVariables(name)

        for (const variable in component.sass) {
          variables.value.push({
            default: component.sass[variable]?.default || null,
            title: variable,
            subtitle: name,
            value: `${variable}-${name}`,
          })
        }
      }
    } catch (err) {}
  }

  fetchApiData()
</script>
