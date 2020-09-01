<script>
  // Extensions
  import SettingsGroup from './Group'

  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettingsDrawerGrouping',

    extends: SettingsGroup,

    data: () => ({ path: 'drawer-navigation-grouping' }),

    computed: {
      alphabetical: sync('user/drawer@alphabetical'),
      items () {
        return [
          {
            text: 'standard',
            icon: '$mdiOrderBoolAscending',
          },
          {
            text: 'alpha',
            icon: '$mdiOrderAlphabeticalAscending',
          },
        ]
      },
      internalValue: {
        get () {
          return this.alphabetical ? 'alpha' : 'standard'
        },
        set (val) {
          this.alphabetical = val === 'alpha'
        },
      },
    },
  }
</script>
