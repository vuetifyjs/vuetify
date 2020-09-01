<script>
  // Extensions
  import SettingsGroup from './Group'

  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettingsRtl',

    extends: SettingsGroup,

    data: () => ({ path: 'direction' }),

    computed: {
      rtl: sync('user/rtl'),
      items () {
        return [
          {
            text: 'ltr',
            icon: '$mdiFormatTextdirectionLToR',
          },
          {
            text: 'rtl',
            icon: '$mdiFormatTextdirectionRToL',
          },
        ]
      },
      internalValue: {
        get () {
          return this.rtl ? 'rtl' : 'ltr'
        },
        set (val) {
          val = val === 'rtl'

          this.rtl = val
          this.$vuetify.rtl = val
        },
      },
    },
  }
</script>
