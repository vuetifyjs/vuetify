<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'fabs-page',

    data: () => ({
      component: 'v-btn',
      name: 'fab',
      usage: { file: 'promotedAction' },
      examples: [
        { file: 'small' },
        { file: 'displayAnimation' },
        { file: 'lateralScreens' },
        { file: 'speedDial' }
      ]
    })
  }
</script>
