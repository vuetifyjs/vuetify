<template>
  <default-list-group
    :item="item"
    sub-group
  />
</template>

<script>
  export default {
    name: 'DefaultListSubGroup',

    components: {
      DefaultListGroup: () => import('./ListGroup'),
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
