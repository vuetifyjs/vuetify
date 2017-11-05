<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'buttons-page',

    data: () => ({
      namespace: 'Buttons',
      folder: 'buttons',
      usage: { file: 'flat' },
      examples: [
        { file: 'raised' },
        { file: 'dropdown' },
        { file: 'toggle' },
        { file: 'icon' },
        { file: 'floating' },
        { file: 'loaders' },
        { file: 'sizing' },
        { file: 'outline' },
        { file: 'round' },
        { file: 'block' }
      ]
    })
  }
</script>
