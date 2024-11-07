<template>
  <section class="bg-light-blue-darken-4 py-8">
    <h2 class="v-heading mb-2 text-h4 text-sm-h4">{{ t("epicmax.title") }}</h2>
    <p class="mx-auto" style="width: 700px">{{ t("epicmax.message") }}</p>
    <v-btn
      :aria-label="t('epicmax.learn-more')"
      class="px-16 text-light-blue-darken-4"
      color="grey-lighten-5"
      href="https://www.epicmax.co/?ref=vuetify"
      rounded="0"
      size="large"
      variant="flat"
    >
      <span
        class="text-capitalize font-weight-regular"
        v-text="t('epicmax.learn-more')"
      />
    </v-btn>
  </section>
</template>

<script setup>
  const { t } = useI18n()
</script>
