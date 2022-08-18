<template>
  <app-tooltip-btn
    :input-value="app.settings"
    path="settings"
    @click="app.settings = !app.settings"
  >
    <template #icon>
      <v-icon
        color="medium-emphasis"
        icon="mdi-cog-outline"
      />
    </template>
  </app-tooltip-btn>
</template>

<script lang="ts">
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useAppStore } from '@/store/app'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SettingsToggle',

    components: { AppTooltipBtn },

    setup () {
      const app = useAppStore()

      return { app }
    },
  })
</script>
