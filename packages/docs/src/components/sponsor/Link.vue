<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
    :size="size"
    :to="rpath('/introduction/sponsors-and-backers/')"
    color="primary"
    variant="outlined"
    @click="sweClick('button', 'sponsors', name)"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="t('become-a-sponsor')"
    />
  </v-btn>
</template>

<script setup>
  defineProps({
    size: String,
  })

  const { name } = useRoute()
  const { t } = useI18n()
</script>
