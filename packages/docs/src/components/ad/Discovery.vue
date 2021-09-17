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
      type: {
        type: String,
        default: 'discovery',
      },
    },
  }
</script>
