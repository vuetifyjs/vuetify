<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'fabs-page',

    data: () => ({
      component: 'v-btn',
      name: 'fab',
      usage: { file: 'promotedAction', uninverted: true },
      examples: [
        { file: 'small' },
        { file: 'displayAnimation', uninverted: true },
        { file: 'lateralScreens', uninverted: true },
        { file: 'speedDial' }
      ]
    })
  }
</script>
