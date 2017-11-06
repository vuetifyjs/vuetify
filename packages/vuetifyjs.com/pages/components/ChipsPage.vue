<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'chips-page',

    data: () => ({
      component: 'v-chip',
      usage: { file: 'default' },
      examples: [
        { file: 'colored' },
        { file: 'icon' },
        { file: 'outline' },
        { file: 'label' },
        { file: 'closable' },
        { file: 'inSelects' }
      ]
    })
  }
</script>
