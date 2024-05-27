<template>
  <AppBtn
    href="https://cdn.vuetifyjs.com/docs/images/brand-kit/vuetify-brand-kit.zip"
    prepend-icon="mdi-download-box-outline"
    target="_blank"
    text="download-brand-kit"
    border
  />

  <v-container class="px-0">
    <v-row>
      <v-col class="pb-0 font-weight-bold" cols="12">{{ t('logo') }}</v-col>

      <v-col v-for="logo in logos" :key="logo.title" cols="auto">
        <v-sheet class="pa-4" border rounded>
          <AppFigure
            :src="`${logo.src}.svg`"
            :title="logo.title"
            class="mb-4 mx-auto"
            width="125"
          />

          <div class="d-flex justify-center">
            <v-btn
              :href="`${logo.src}.svg`"
              class="mx-1"
              color="medium-emphasis"
              size="x-small"
              target="_blank"
              text="SVG"
              variant="outlined"
            />

            <v-btn
              :href="`${logo.src}.png`"
              class="mx-1"
              color="medium-emphasis"
              size="x-small"
              target="_blank"
              text="PNG"
              variant="outlined"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col class="pb-0 font-weight-bold" cols="12">{{ t('text') }}</v-col>

      <v-col v-for="logo in text" :key="logo.title" cols="auto">
        <v-sheet
          :theme="logo.src.indexOf('dark') > -1 ? 'dark' : 'light'"
          class="pa-4"
          width="300"
          border
          rounded
        >
          <AppFigure
            :src="`${logo.src}.svg`"
            :title="logo.title"
            class="mb-4"
            cover
          />

          <div class="d-flex justify-center">
            <v-btn
              :href="`${logo.src}.svg`"
              class="mx-1"
              color="medium-emphasis"
              size="x-small"
              target="_blank"
              text="SVG"
              variant="outlined"
            />

            <v-btn
              :href="`${logo.src}.png`"
              class="mx-1"
              color="medium-emphasis"
              size="x-small"
              target="_blank"
              text="PNG"
              variant="outlined"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col class="pb-0 font-weight-bold" cols="12">{{ t('icon') }}</v-col>

      <v-col
        v-for="icon in icons"
        :key="icon.title"
        cols="12"
        sm="6"
      >
        <v-sheet
          class="pa-2"
          border
          rounded
        >
          <div class="text-center">
            <v-icon
              :color="icon.color"
              :icon="icon.icon"
              size="88"
            />
          </div>

          <figcaption class="text-caption font-weight-bold text-center text-medium-emphasis mb-2">
            {{ icon.title }}
          </figcaption>

          <AppMarkup :code="icon.code" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const { t } = useI18n()

  const logos = [
    {
      title: 'Vuetify Logo',
      src: 'https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo',
    },
    {
      title: 'Vuetify Atom Logo',
      src: 'https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-atom',
    },
    {
      title: 'Vuetify Circle Logo',
      src: 'https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle',
    },
  ]

  const text = [
    {
      title: 'Vuetify Light Text Logo',
      src: 'https://cdn.vuetifyjs.com/docs/images/brand-kit/v-text-logo-light',
    },
    {
      title: 'Vuetify Dark Text Logo',
      src: 'https://cdn.vuetifyjs.com/docs/images/brand-kit/v-text-logo-dark',
    },
  ]

  const icons = [
    {
      title: 'Vuetify Icon',
      icon: '$vuetify',
      code: '<v-icon icon="$vuetify" />',
    },
    {
      title: 'Vuetify Outlined Icon',
      icon: '$vuetify-outline',
      code: '<v-icon icon="$vuetify-outline" />',
    },
  ]
</script>
