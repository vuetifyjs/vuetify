<template>
  <app-tooltip-btn
    :input-value="app.settings"
    icon="mdi-cog-outline"
    path="settings"
    @click="app.settings = !app.settings"
  />
</template>

<script>
  import { useAppStore } from '@/store-v3/app'

  import AppTooltipBtn from '@/components-v3/app/TooltipBtn.vue'

  export default {
    name: 'SettingsToggle',

    components: {
      AppTooltipBtn,
    },

    setup () {
      const app = useAppStore()

      return { app }
    },
  }
</script>
