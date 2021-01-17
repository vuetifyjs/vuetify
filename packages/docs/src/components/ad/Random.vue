<template>
  <vuetify-ad :medium="medium" />
</template>

<script>
  // Extensions
  import VuetifyAd from '@/components/ad/Vuetify'

  export default {
    name: 'RandomAd',

    extends: VuetifyAd,

    props: {
      medium: String,
    },

    computed: {
      ads () {
        return this.all.filter(({ metadata }) => {
          return (
            metadata.free &&
            (!metadata.sponsored || metadata.discoverable)
          )
        })
      },
    },
  }
</script>
