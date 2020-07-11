<template>
  <app-ad
    class="v-app-ad--sponsored"
    compact
    v-bind="$attrs"
  >
    <v-hover>
      <template v-slot="{ hover }">
        <a v-bind="adAttrs">
          <v-sheet
            class="overflow-none position-relative d-flex px-4 py-2 align-center"
            color="transparent"
            rounded
          >
            <v-overlay
              :color="color"
              :opacity="hover ? .15 : .1"
              absolute
            />

            <v-icon
              :color="color"
              class="mr-4"
              x-large
              v-text="icon"
            />

            <app-md
              v-if="description"
              :class="dcolor"
              class="text-subtitle-2 text-sm-subtitle-1"
              v-text="description"
            />
          </v-sheet>
        </a>
      </template>
    </v-hover>
  </app-ad>
</template>

<script>
  // Mixins
  import Ad from '@/mixins/ad'

  export default {
    name: 'HighlightedAd',

    mixins: [Ad],

    data: () => ({
      color: 'light-blue darken-4',
      dcolor: 'light-blue--text text--darken-4',
    }),

    computed: {
      icon () {
        const current = this.current || { metadata: {} }

        switch (current.metadata.type) {
          case 'Documentation': return '$mdiTextBoxSearch'
          case 'Theme': return '$mdiMonitorDashboard'
          case 'Video': return '$mdiPlayCircle'
          default: return '$mdiVuetify'
        }
      },
    },
  }
</script>

<style lang="sass">
  .v-app-ad--sponsored
    p
      line-height: 1.3
</style>
