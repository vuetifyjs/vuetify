<template>
  <div>
    <doc-subheading>Generic.Pages.api</doc-subheading>
    <v-card class="py-1">
      <doc-parameters
        :headers="headers[tab]"
        :items="component[tab]"
      />
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },

    data: vm => ({
      headers: {
        props: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 6 },
          { value: 'type', align: 'right', size: 3 }
        ],
        slots: [
          { value: 'name', align: 'left' }
        ],
        scopedSlots: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'props', align: 'right', size: 9 }
        ],
        events: [
          { value: 'name', align: 'left' },
          { value: 'value', align: 'right' }
        ],
        functions: [
          { value: 'name', align: 'left' },
          { value: 'signature', align: 'right' }
        ],
        functional: [
          { value: 'name', align: 'left' },
          { value: 'description', align: 'left' }
        ],
        options: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 3 },
          { value: 'type', align: 'right' }
        ]
      },
      // select first option if available
      index: vm.value.length > 0 ? 0 : -1
    }),

    computed: {
      ...mapState('documentation', ['api']),
      component () {
        return this.api[this.selected] || {
          props: [],
          slots: [],
          scopedSlots: [],
          params: [],
          events: [],
          functions: [],
          functional: [],
          options: []
        }
      },
      selected () {
        if (this.index < 0) return undefined

        return this.value[this.index]
      },
      tab () {
        const directives = ['v-resize', 'v-ripple', 'v-scroll', 'v-touch']
        if (directives.indexOf(this.selected) !== -1 ) {
          return 'options'
        } else if (this.selected == '$vuetify') {
          return 'functions'
        } else {
          return 'props'
        }
      }
    }
  }
</script>
