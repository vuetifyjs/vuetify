<script>
  // Extensions
  import SettingsGroup from './Group'

  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettingsApi',

    extends: SettingsGroup,

    data: () => ({ path: 'api' }),

    computed: {
      api: sync('user/api'),
      items () {
        return [
          {
            text: 'link-only',
            icon: '$mdiLink',
          },
          {
            text: 'inline',
            icon: '$mdiFormatWrapInline',
          },
        ]
      },
      internalValue: {
        get () {
          return this.api ? 'inline' : 'link-only'
        },
        set (val) {
          this.api = val === 'inline'
        },
      },
    },
  }
</script>
