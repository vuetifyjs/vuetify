<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'bottom-sheets-page',

    data: () => ({
      namespace: 'BottomSheets',
      folder: 'bottom-sheets',
      usage: { file: 'standard' },
      examples: [
        { file: 'inset' }
      ]
    })
  }
</script>
