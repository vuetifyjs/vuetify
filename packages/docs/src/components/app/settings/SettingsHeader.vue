<template>
  <div class="mb-3">
    <v-label :text="t(title)" class="mb-2 font-weight-medium" />

    <v-messages :messages="t(text)" active />
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
