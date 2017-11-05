<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'fabs-page',

    data: () => ({
      namespace: 'Fabs',
      folder: 'fabs',
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
