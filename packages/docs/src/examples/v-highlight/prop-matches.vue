<template>
  <div class="pa-6" style="max-width: 480px; margin: 0 auto">
    <v-text-field
      v-model="search"
      class="mb-4"
      density="compact"
      label="Fuzzy search"
      variant="outlined"
      clearable
      hide-details
    ></v-text-field>

    <v-list lines="two" border rounded>
      <template v-if="results.length">
        <v-list-item v-for="item in results" :key="item.title" :subtitle="item.subtitle">
          <template v-slot:title>
            <v-highlight :matches="item.matches" :text="item.title"></v-highlight>
          </template>
        </v-list-item>
      </template>

      <v-list-item v-else class="text-medium-emphasis" title="No results"></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
  const search = shallowRef('scrt')

  const items = [
    { title: 'JavaScript', subtitle: 'Dynamic scripting for the web' },
    { title: 'TypeScript', subtitle: 'Typed superset of JavaScript' },
    { title: 'CoffeeScript', subtitle: 'Syntactic sugar for JavaScript' },
    { title: 'Python', subtitle: 'General-purpose interpreted language' },
    { title: 'Rust', subtitle: 'Systems language without a GC' },
    { title: 'Ruby', subtitle: 'Optimised for developer happiness' },
  ]

  function fuzzy (text, query) {
    const lower = text.toLocaleLowerCase()
    const spans = []
    let pos = 0
    for (const ch of query.toLocaleLowerCase()) {
      pos = lower.indexOf(ch, pos)
      if (pos < 0) return null
      spans.push([pos, ++pos])
    }
    return spans
  }

  const results = computed(() => {
    const query = search.value?.trim()
    if (!query) return items.map(item => ({ ...item, matches: undefined }))
    return items
      .map(item => ({ ...item, matches: fuzzy(item.title, query) ?? undefined }))
      .filter(item => item.matches)
  })
</script>
