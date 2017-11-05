<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'badges-page',

    data: () => ({
      namespace: 'Badges',
      folder: 'badges',
      usage: { file: 'character' },
      examples: [
        { file: 'icon' },
        { file: 'inline' },
        { file: 'visibility' }
      ]
    })
  }
</script>
