<template>
  <div class="d-flex mb-3 w-100">
    <div class="flex-1-1-0">
      <v-label :text="t(title)" class="mb-1 font-weight-medium">
        <slot name="title" />
      </v-label>
      <v-messages :messages="t(text)" active />
    </div>

    <slot />
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  })

  const { t } = useI18n()
</script>
