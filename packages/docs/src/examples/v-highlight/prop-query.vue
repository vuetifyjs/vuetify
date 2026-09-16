<template>
  <div class="pa-6" style="max-width: 600px; margin: 0 auto">
    <v-combobox
      v-model="terms"
      class="mb-6"
      label="Highlight terms"
      variant="outlined"
      chips
      closable-chips
      hide-details
      multiple
    ></v-combobox>

    <v-highlight :query="terms" :text="text" class="text-body-1" tag="p"></v-highlight>
  </div>
</template>

<script setup>
  const terms = shallowRef(['TypeScript', 'JavaScript'])

  const text = 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. JavaScript itself remains the language of the web — TypeScript simply adds a type layer on top. Any valid JavaScript program is also a valid TypeScript program, so the two languages always stay in sync.'
</script>
