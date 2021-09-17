<template>
  <v-btn
    class="text-capitalize px-2"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default" />

    <template v-else-if="text">
      {{ t(text) }}
    </template>
  </v-btn>
</template>

<script>
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'AppBtn',

    props: {
      text: String,
    },

    setup () {
      const { t } = useI18n()

      return {
        t,
      }
    },

  })
</script>
