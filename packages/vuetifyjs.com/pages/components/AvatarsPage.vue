<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'avatars-page',

    data: () => ({
      namespace: 'Avatars',
      folder: 'avatars',
      usage: { file: 'standard' },
      examples: [
        { file: 'advanced' },
        { file: 'iconAndText' }
      ]
    })
  }
</script>
