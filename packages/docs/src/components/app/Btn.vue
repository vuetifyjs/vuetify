<template>
  <v-btn
    :variant="variant"
    class="text-capitalize px-2 font-weight-regular"
    v-bind="$attrs"
  >
    <slot v-if="$slots.default" />

    <template v-else-if="text">
      {{ t(text) }}
    </template>
  </v-btn>
</template>

<script lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppBtn',

    props: {
      text: String,
      variant: {
        type: String,
        default: 'text',
      },
    },

    setup () {
      const { t } = useI18n()

      return {
        t,
      }
    },

  })
</script>
