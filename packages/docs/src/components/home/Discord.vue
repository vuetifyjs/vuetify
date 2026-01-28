<template>
  <v-sheet color="#5662f6">
    <v-container class="pa-6 text-left">
      <v-row class="justify-center">
        <v-col
          class="pa-6 pa-md-12 text-center"
          cols="12"
        >
          <v-icon class="mb-5" size="60">
            mdi-discord
          </v-icon>

          <h4 class="text-headline-large font-weight-bold mb-5 mt-0">
            {{ t('home.discord.title') }}
          </h4>

          <p class="text-title-large font-weight-regular mb-6 w-100 w-md-50 mx-auto">
            {{ t('home.discord.description') }}
          </p>

          <v-btn
            :text="t('home.discord.join')"
            append-icon="mdi-open-in-new"
            class="mr-4 text-none"
            href="https://community.vuetifyjs.com/"
            rel="noopener noreferrer"
            rounded="lg"
            size="large"
            target="_blank"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
  const { t } = useI18n()
</script>
