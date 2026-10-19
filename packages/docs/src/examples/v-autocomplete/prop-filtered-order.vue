<template>
  <div class="pa-6" style="max-width: 520px; margin: 0 auto">
    <v-autocomplete
      :filter-keys="['title', 'raw.aliases']"
      :filtered-order="filteredOrder"
      :items="countries"
      hint="Type “an”, “am” or “br”"
      label="Country"
      variant="outlined"
      persistent-hint
    ></v-autocomplete>

    <v-btn-toggle
      v-model="filteredOrder"
      class="mt-2"
      color="primary"
      density="comfortable"
      variant="outlined"
      divided
      mandatory
    >
      <v-btn value="none">None</v-btn>
      <v-btn value="prefix">Prefix</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
  const filteredOrder = shallowRef('prefix')

  const countries = [
    { title: 'Bahamas', aliases: [] },
    { title: 'Panama', aliases: [] },
    { title: 'Cayman Islands', aliases: [] },
    { title: 'USA', aliases: ['United States', 'America'] },
    { title: 'Gibraltar', aliases: [] },
    { title: 'Andorra', aliases: [] },
    { title: 'United Kingdom', aliases: ['UK', 'Great Britain'] },
    { title: 'Brazil', aliases: [] },
  ]
</script>
