<template>
  <div class="pa-6" style="max-width: 520px; margin: 0 auto">
    <v-autocomplete
      :hint="hint"
      :ignore-accents="ignoreAccents"
      :items="cities"
      label="Destination"
      variant="outlined"
      auto-select-first
      item-props
      persistent-hint
    ></v-autocomplete>

    <v-btn-toggle
      v-model="ignoreAccents"
      class="mt-2"
      color="primary"
      density="comfortable"
      variant="outlined"
      divided
      mandatory
    >
      <v-btn :value="false">Off</v-btn>
      <v-btn value="target">Target</v-btn>
      <v-btn value="query">Query</v-btn>
      <v-btn :value="true">Both</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
  const ignoreAccents = shallowRef('target')

  const hints = {
    false: 'The query must match the exact characters.',
    target: 'Accents in the text are ignored — type “zurich" to try',
    query: 'Accents in the query are ignored — type or copy “trø”.',
    true: null,
  }
  const hint = computed(() => hints[ignoreAccents.value])

  const cities = [
    { title: 'São Paulo', subtitle: 'Brazil' },
    { title: 'Zürich', subtitle: 'Switzerland' },
    { title: 'Kraków', subtitle: 'Poland' },
    { title: 'Málaga', subtitle: 'Spain' },
    { title: 'Bogotá', subtitle: 'Colombia' },
    { title: 'Tromsø', subtitle: 'Norway' },
    { title: 'Montréal', subtitle: 'Canada' },
    { title: 'Reykjavík', subtitle: 'Iceland' },
  ]
</script>
