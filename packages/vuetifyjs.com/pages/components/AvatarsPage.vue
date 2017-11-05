<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'alerts-page',

    data: () => ({
      component: 'v-avatar',
      usage: { file: 'standard' },
      examples: [
        { file: 'advanced' },
        { file: 'iconAndText' }
      ]
    })
  }
</script>