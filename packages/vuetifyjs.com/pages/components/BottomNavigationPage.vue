<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'bottom-navigation-page',

    data: () => ({
      namespace: 'BottomNavigation',
      folder: 'bottom-navigation',
      usage: { file: 'iconsAndText' },
      examples: [
        { file: 'colorAndShift' },
        { file: 'toggle' }
      ]
    })
  }
</script>
