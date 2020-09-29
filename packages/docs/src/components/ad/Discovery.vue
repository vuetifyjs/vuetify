<script>
  // Extensions
  import VuetifyAd from '@/components/ad/Vuetify'

  export default {
    name: 'DiscoveryAd',

    extends: VuetifyAd,

    computed: {
      ads () {
        return this.all.filter(({ metadata }) => {
          return metadata.discoverable
        })
      },
    },
  }
</script>
