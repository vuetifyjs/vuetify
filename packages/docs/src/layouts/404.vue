<template>
  <div class="px-4 py-10 text-center">
    <router-view />
    <div>
      <v-btn @click="router.back()">
        {{ t('back') }}
      </v-btn>
    </div>
    <div class="mt-5 mx-auto text-center">
      [404 Layout]
    </div>
  </div>
</template>

<script lang="ts">
// Utilities
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: '404Layout',

    setup () {
      const router = useRouter()
      const { t } = useI18n()

      return {
        router,
        t,
      }
    },

  })
</script>
