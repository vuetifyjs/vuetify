<template>
  <kbd
    :id="`${section}-${name.replace('$', '')}`"
    class="name-item text-mono"
  >
    <app-link
      :href="`#${section}-${name.replace('$', '')}`"
      class="font-weight-bold"
    >
      {{ name }}
    </app-link>
  </kbd>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      section: String,
      name: String,
    },
  })
</script>
