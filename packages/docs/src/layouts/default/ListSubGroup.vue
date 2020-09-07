<template>
  <default-list-group
    :item="item"
    sub-group
  />
</template>

<script>
  // Components
  import DefaultListGroup from './ListGroup'

  export default {
    name: 'DefaultListSubGroup',

    components: { DefaultListGroup },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
