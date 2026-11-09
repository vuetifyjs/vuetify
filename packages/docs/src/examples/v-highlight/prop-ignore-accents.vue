<template>
  <div class="pa-6" style="max-width: 520px; margin: 0 auto">
    <v-text-field
      v-model="query"
      :hint="hint"
      class="mb-4"
      density="compact"
      label="Search"
      variant="outlined"
      clearable
      persistent-hint
    ></v-text-field>

    <v-btn-toggle
      v-model="ignoreAccents"
      class="mb-6"
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

    <v-list border rounded>
      <v-list-item v-for="city in cities" :key="city">
        <v-highlight
          :ignore-accents="ignoreAccents"
          :query="query"
          :text="city"
          class="text-body-1"
          ignore-case
        ></v-highlight>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
  const query = shallowRef('zurich')
  const ignoreAccents = shallowRef('target')

  const hints = {
    false: 'The query must match the exact characters.',
    target: 'Accents in the text are ignored — type “zurich" to try',
    query: 'Accents in the query are ignored — type or copy “trø”.',
    true: null,
  }
  const hint = computed(() => hints[ignoreAccents.value])

  const cities = [
    'São Paulo',
    'Zürich',
    'Kraków',
    'Málaga',
    'Bogotá',
    'Tromsø',
    'Montréal',
    'Reykjavík',
  ]
</script>
