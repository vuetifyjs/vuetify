<script>
  // Extensions
  import SettingsGroup from './Group'

  // Utilities
  import { sync } from 'vuex-pathify'

  // Globals
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'DefaultSettingsTheme',

    extends: SettingsGroup,

    data: () => ({ path: 'theme' }),

    computed: {
      ...sync('user', [
        'theme@dark',
        'theme@mixed',
        'theme@system',
      ]),
      items () {
        return [
          {
            text: 'light',
            icon: '$mdiWhiteBalanceSunny',
            cb: () => this.setTheme(),
          },
          {
            text: 'dark',
            icon: '$mdiWeatherNight',
            cb: () => this.setTheme(true),
          },
          {
            text: 'system',
            icon: '$mdiDesktopTowerMonitor',
            cb: () => this.setSystemTheme(),
          },
          {
            text: 'mixed',
            icon: '$mdiThemeLightDark',
            cb: () => this.setTheme(false, true),
          },
        ]
      },
      internalValue: {
        get () {
          if (this.mixed) return 'mixed'
          if (this.system) return 'system'

          return this.dark ? 'dark' : 'light'
        },
        set (val) {
          const set = this.items.find(item => item.text === val)

          set.cb()
        },
      },
    },

    watch: {
      '$vuetify.theme.dark' (val) {
        if (this.dark === val) return

        this.dark = val
      },
      dark (val) {
        if (this.$vuetify.theme.dark === val) return

        this.$vuetify.theme.dark = val
      },
    },

    methods: {
      setTheme (
        dark = false,
        mixed = false,
        system = false,
      ) {
        this.dark = dark
        this.mixed = mixed
        this.system = system
      },
      setSystemTheme () {
        if (!IN_BROWSER || !window.matchMedia) return

        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches

        this.setTheme(dark, this.mixed, true)
      },
    },
  }
</script>
