module.exports = {
  'v-mutate': {
    argument: [{
      name: 'argument',
      default: '(): {}',
      type: ['function', 'object'],
      snippet: `
<template>
  <div>
    // By default v-mutate enables all options
    // available in the Mutation Observer API
    <v-card v-mutate="onMutate">...</v-card>

    // A custom options object can be provided
    // in order to override the defaults
    <v-card v-mutate="mutate">...</v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mutate: {
          options: {
            attributes: true,
            subtree: true,
          },
          handler: this.onMutate
        },
      }
    },

    methods: {
      onMutate (mutationsList, observer) {}
    }
  }
</script>`,
    }],
    modifiers: [
      {
        name: 'once',
        default: false,
        type: ['boolean'],
        snippet: `
  <template>
    <div v-mutate.once="onMutate">...</div>
  </template>

  <script>
    export default {
      methods: {
        onMutate (mutationsList, observer) {}
      }
    }
  </script>`,
      },
      {
        name: 'attr',
        default: true,
        type: ['boolean'],
        snippet: `
  <template>
    <div v-mutate.attr="onMutate">...</div>
  </template>

  <script>
    export default {
      methods: {
        onMutate (mutationsList, observer) {}
      }
    }
  </script>`,
      },
      {
        name: 'char',
        default: true,
        type: ['boolean'],
        snippet: `
  <template>
    <div v-mutate.char="onMutate">...</div>
  </template>

  <script>
    export default {
      methods: {
        onMutate (mutationsList, observer) {}
      }
    }
  </script>`,
      },
      {
        name: 'child',
        default: true,
        type: ['boolean'],
        snippet: `
  <template>
    <div v-mutate.child="onMutate">...</div>
  </template>

  <script>
    export default {
      methods: {
        onMutate (mutationsList, observer) {}
      }
    }
  </script>`,
      },
      {
        name: 'sub',
        default: true,
        type: ['boolean'],
        snippet: `
  <template>
    <div v-mutate.attr.char.sub="onMutate">...</div>
  </template>

  <script>
    export default {
      methods: {
        onMutate (mutationsList, observer) {}
      }
    }
  </script>`,
      },
    ],
  },
}
