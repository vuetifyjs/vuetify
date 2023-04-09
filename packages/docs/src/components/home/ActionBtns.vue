<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="({ icon, text, ...attrs }, i) in buttons"
        :key="`home-btn-${i}`"
        cols="auto"
      >
        <v-btn
          :min-width="btnWidth"
          v-bind="attrs"
          size="x-large"
        >
          <v-icon :icon="icon" start />
          {{ t(text) }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const buttons = [
    {
      color: 'primary',
      flat: true,
      icon: 'mdi-speedometer',
      text: 'home.get-started',
      to: {
        name: 'getting-started-installation',
      },
    },
    {
      color: 'primary',
      icon: '$vuetify',
      variant: 'outlined',
      text: 'home.why-vuetify',
      to: {
        name: 'introduction-why-vuetify',
      },
    },
    {
      color: '#212121',
      theme: 'dark',
      flat: true,
      href: 'https://github.com/vuetifyjs/vuetify',
      icon: 'mdi-github',
      rel: 'noopener',
      target: '_blank',
      text: 'github',
    },
  ]
  const btnWidth = 228
</script>
