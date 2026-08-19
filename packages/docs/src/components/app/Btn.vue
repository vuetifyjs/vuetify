<template>
  <v-btn
    :icon="!!icon"
    :size="smAndUp ? 'default' : 'small'"
    :variant="variant"
    class="text-body-medium text-capitalize px-3 app-btn"
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
  defineProps({
    icon: String,
    text: String,
    variant: {
      type: String,
      default: 'text',
    },
  })

  const { smAndUp } = useDisplay()
  const { t } = useI18n()
</script>
