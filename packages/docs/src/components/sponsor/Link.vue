<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
    :size="size"
    :to="rpath('/introduction/sponsors-and-backers/')"
    color="primary"
    variant="outlined"
    @click="onClick"
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

  const { event } = useGtag()
  const { name } = useRoute()
  const { t } = useI18n()

  function onClick () {
    event('click', {
      event_category: 'button',
      event_label: 'sponsors',
      value: name,
    })
  }
</script>
