<template lang="pug">
  table
    thead
      tr
        th Name
        th Action
        slot(name="test")
    tbody
      tr(v-for="i in items")
        td(v-for="value in i")
          v-slot(v-bind:item="i")
</template>

<script>
  export default {
    components: {
      'v-slot': {
        functional: true,
        render: (h, n) => {
          console.log(n)
          return h('template', n.data, n.children)
        }
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>