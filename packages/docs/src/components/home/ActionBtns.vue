<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          :min-width="btnWidth"
          :to="{
            name: 'Documentation',
            params: {
              category: 'getting-started',
              page: 'installation'
            }
          }"
          color="primary"
          depressed
          x-large
        >
          <v-icon left>
            $mdiSpeedometer
          </v-icon>

          {{ $t('home.get-started') }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :min-width="btnWidth"
          :to="{
            name: 'Documentation',
            params: {
              category: 'introduction',
              page: 'why-vuetify'
            }
          }"
          color="primary"
          outlined
          x-large
        >
          <v-icon left>
            $mdiVuetify
          </v-icon>

          {{ $t('home.why-vuetify') }}
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :min-width="btnWidth"
          color="#212121"
          dark
          depressed
          href="https://github.com/vuetifyjs/vuetify"
          rel="noopener"
          target="_blank"
          x-large
        >
          <v-icon left>
            $mdiGithub
          </v-icon>

          GitHub
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomeActionBtns',

    data: () => ({
      btnWidth: 228,
    }),
  }
</script>
