<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'menus-page',

    data: () => ({
      component: 'v-menu',
      usage: { file: 'activator' },
      examples: [
        { file: 'absolute' },
        { file: 'absoluteWithoutActivator' },
        { file: 'hover' },
        { file: 'menus' },
        { file: 'customTransition' },
        { file: 'popover' }
      ]
    })
  }
</script>
