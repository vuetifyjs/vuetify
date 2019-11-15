<template>
  <base-group
    :item="item"
    sub-group
  />
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => ({
          text: '',
          icon: false,
        }),
      },
    },
  }
</script>
