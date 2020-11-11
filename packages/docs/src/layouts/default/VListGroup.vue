<script>
  // Extensions
  import { VListGroup } from 'vuetify/lib'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VListGroup',

    extends: VListGroup,

    computed: { scrolling: get('app/scrolling') },

    methods: {
      onRouteChange (to) {
        if (this.scrolling) return

        VListGroup.options.methods.onRouteChange.call(this, to)
      },
    },
  }
</script>
