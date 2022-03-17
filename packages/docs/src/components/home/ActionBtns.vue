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
          <v-icon :icon="icon" left />
          {{ t(text) }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'ActionBtns',

    setup () {
      const { locale, t } = useI18n()

      // data
      const buttons: Array<Object> = [
        {
          color: 'primary',
          flat: true,
          icon: 'mdi-speedometer',
          text: 'home.get-started',
          to: {
            name: `${locale.value}-getting-started-installation`,
          },
        },
        {
          color: 'primary',
          icon: 'mdi-vuetify',
          variant: 'outlined',
          text: 'home.why-vuetify',
          to: {
            name: `${locale.value}-introduction-why-vuetify`,
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

      return {
        buttons,
        btnWidth,
        t,
      }
    },

  })
</script>
