<template>
  <promoted-base
    border
    class="v-promotions-card"
    max-width="360"
  >
    <v-container class="pa-2">
      <v-row dense>
        <v-col cols="auto">
          <v-img
            class="rounded-s"
            :src="store.promotions[0].metadata.images.default.url"
            width="130"
          />
        </v-col>

        <v-col>
          <div class="px-2">
            Experiment and create beautiful UIs with our interactive playground!
          </div>
        </v-col>
      </v-row>
    </v-container>

    <span
      style="position: absolute; display: inline-block; bottom: .5rem; right: .5rem; font-size: 0.625rem; letter-spacing: 0.09375rem; font-weight: 400;"
      class="text-medium-emphasis"
    >
      ADS VIA VUETIFY
    </span>
  </promoted-base>
</template>

<script setup>
  // Components
  import PromotedBase from '@/components/promoted/Base.vue'

  import { usePromotionsStore } from '@/store/promotions'

  // Composables
  import { useDisplay } from 'vuetify'

  const props = defineProps({
    color: String,
  })

  const store = usePromotionsStore()

  const { smAndUp } = useDisplay()
</script>

<style lang="sass">
  .v-promotions-card
    font-size: 0.75rem
    position: relative
</style>
