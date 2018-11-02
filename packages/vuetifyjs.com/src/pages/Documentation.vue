<template>
  <div>
    <core-ad />

    <core-toolbar />

    <core-drawer />

    <core-view />

    <core-fab />

    <core-snackbar />
  </div>
</template>

<script>
  // Utilities
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'

  export default {
    name: 'Documentation',

    provide () {
      return {
        namespace: upperFirst(camelCase(this.namespace)),
        page: upperFirst(camelCase(this.page))
      }
    },

    props: {
      // Provided by router
      namespace: {
        type: String,
        default: undefined
      },
      page: {
        type: String,
        default: undefined
      }
    }
  }
</script>
