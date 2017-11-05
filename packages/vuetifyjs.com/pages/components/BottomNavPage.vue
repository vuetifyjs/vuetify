<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'bottom-nav-page',

    data: () => ({
      plural: true,
      component: 'v-bottom-nav',
      usage: { file: 'iconsAndText' },
      examples: [
        { file: 'colorAndShift' },
        { file: 'toggle' }
      ]
    })
  }
</script>
