<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'touch-support-page',

    data: () => ({
      component: 'v-touch',
      plural: true,
      usage: { file: 'default' }
    })
  }
</script>
