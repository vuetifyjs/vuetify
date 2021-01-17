<script>
  // Extensions
  import VuetifyAd from '@/components/ad/Vuetify'

  export default {
    name: 'DiscoveryAd',

    extends: VuetifyAd,

    props: {
      medium: {
        type: String,
        default: 'discovery-ad',
      },
    },

    computed: {
      ads () {
        return this.all.filter(({ metadata }) => {
          return metadata.discoverable
        })
      },
    },
  }
</script>
