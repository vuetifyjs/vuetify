<template lang="pug">
  views-example(:data="$data")
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
