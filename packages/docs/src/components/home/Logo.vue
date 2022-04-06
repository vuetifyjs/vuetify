<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
    :width="size"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script lang="ts">
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useTheme } from 'vuetify'

  export default defineComponent({
    name: 'Logo',

    props: {
      size: String,
    },

    setup () {
      const theme = useTheme()

      const logo = computed(() => {
        return `vuetify-logo-v3-${theme.current.value}.svg`
      })

      return { logo }
    },
  })
</script>
