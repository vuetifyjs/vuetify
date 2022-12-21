<template>
  <v-btn
    :variant="variant"
    :icon="!!icon"
    class="text-body-2 text-capitalize px-3 app-btn"
    color="medium-emphasis"
  >
    <slot />

    <template v-if="text">
      {{ t(text) }}
    </template>

    <template v-else-if="icon || $slots.icon">
      <slot v-if="$slots.icon" name="icon" />

      <v-icon v-else :icon="icon" size="24" />
    </template>
  </v-btn>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  defineProps({
    icon: String,
    text: String,
    variant: {
      type: String,
      default: 'text',
    },
  })

  const { t } = useI18n()
</script>
