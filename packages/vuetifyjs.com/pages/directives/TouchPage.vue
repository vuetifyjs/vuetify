<template lang="pug">
  example-view(:data="$data")
</template>

<script>
  export default {
    name: 'TouchSupportPage',

    data: () => ({
      component: 'v-touch',
      plural: true,
      usage: { file: 'default' }
    })
  }
</script>
