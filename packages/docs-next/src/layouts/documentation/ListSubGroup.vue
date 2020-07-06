<template>
  <documentation-list-group
    :item="item"
    sub-group
  />
</template>

<script>
  export default {
    name: 'DocumentationListSubGroup',

    components: {
      DocumentationListGroup: () => import('./ListGroup'),
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
