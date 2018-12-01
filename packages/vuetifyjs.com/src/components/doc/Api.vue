<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card class="py-1">
      <doc-parameters
        :headers="headers[type]"
        :items="component[type]"
        :target="target"
        :type="type"
      />
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import api from '@vuetify/api-generator'

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },

    data: vm => ({
      headers: {
        api: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 6 },
          { value: 'type', align: 'right', size: 3 }
        ],
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
      component () {
        const component = api[this.target] || {}

        return {
          api: [],
          props: [],
          slots: [],
          scopedSlots: [],
          params: [],
          events: [],
          functions: [],
          functional: [],
          options: [],
          ...component
        }
      },
      target () {
        if (this.index < 0) return undefined

        return this.value[this.index]
      },
      type () {
        return [
          'api',
          'props',
          'slots',
          'scopedSlots',
          'params',
          'events',
          'functions',
          'functional',
          'options'
        ].find(type => this.component[type].length > 0)
      }
    }
  }
</script>
