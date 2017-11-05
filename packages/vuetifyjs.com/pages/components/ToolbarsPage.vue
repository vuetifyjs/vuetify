<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'toolbar-page',

    data: () => ({
      namespace: 'Toolbar',
      folder: 'toolbar',
      usage: { file: 'default' },
      examples: [
        { file: 'appBar' },
        { file: 'appBarExtension' },
        { file: 'columnWidthWithHierarchy' },
        { file: 'flexibleAndCard' },
        { file: 'floatingWithSearch' },
        { file: 'variations' },
        { file: 'prominent' },
        { file: 'dense' },
        { file: 'denseProminent' },
        { file: 'scrolling' },
        { file: 'appBarMenu' },
        { file: 'systemBarsStatusWindow' }
      ]
    })
  }
</script>
