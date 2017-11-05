<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'subheaders-page',

    data: () => ({
      namespace: 'Subheaders',
      folder: 'subheaders',
      usage: { file: 'list' },
      examples: [
        { file: 'grid' },
        { file: 'menu' },
        { file: 'avatarThreeLines' }
      ]
    })
  }
</script>
