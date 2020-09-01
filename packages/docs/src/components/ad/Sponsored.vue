<template>
  <app-ad
    class="v-app-ad--sponsored"
    compact
    max-width="512"
    v-bind="$attrs"
  >
    <v-hover>
      <template v-slot="{ hover }">
        <a v-bind="adAttrs">
          <v-sheet
            class="overflow-none position-relative d-flex px-4 py-2 align-center"
            color="transparent"
            rounded
            width="512"
          >
            <v-overlay
              :color="color"
              :opacity="hover ? .15 : .1"
              absolute
            />

            <v-icon
              :color="color"
              class="mr-3"
              x-large
              v-text="icon"
            />

            <div
              :class="dcolor"
              class="text-subtitle-2 text-sm-subtitle-1 font-weight-medium"
              v-text="current.metadata.description"
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
    name: 'SponsoredAd',

    mixins: [Ad],

    data: () => ({
      color: 'light-blue darken-4',
      dcolor: 'light-blue--text text--darken-4',
    }),

    computed: {
      icon () {
        switch (this.current.metadata.type) {
          case 'Video': return '$mdiPlayCircle'
          default: return '$mdiVuetify'
        }
      },
    },
  }
</script>
