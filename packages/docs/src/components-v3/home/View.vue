<template>
  <v-main>
    <v-container class="px-4 text-center font-weight-light">
      <!-- <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view> -->
      <home-logo size="300px" />

      <br>

      <app-heading level="1" :content="t('home.material-design-framework')" />

      <p style="max-width: 568px" class="mx-auto">
        {{ t('home.what-is-vuetify') }}
      </p>

      <br>

      <home-action-btns />

      <br>
      <br>
      <br>
      <br>

      <app-heading level="2" :content="t('home.project-sponsors')" />

      <p style="max-width: 400px" class="mx-auto">
        {{ t('home.sponsors-description') }}
      </p>

      <br>

      <home-sponsors />

    </v-container>

    <home-footer />
  </v-main>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'View',

    setup () {
      const { t } = useI18n()

      return { t }
    },
  })
</script>
