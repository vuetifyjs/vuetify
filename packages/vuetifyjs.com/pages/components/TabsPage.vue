<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'tabs-page',

    data: () => ({
      namespace: 'Tabs',
      folder: 'tabs',
      usage: { file: 'toolbar' },
      examples: [
        { file: 'centered' },
        { file: 'content' },
        { file: 'search' },
        { file: 'icons' },
        { file: 'desktop' },
        { file: 'grow' },
        { file: 'pagination' },
        { file: 'disabledScroll' }
      ]
    })
  }
</script>
