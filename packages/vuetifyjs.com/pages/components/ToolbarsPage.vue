<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'toolbar-page',

    data: () => ({
      component: 'v-toolbar',
      components: [
        'v-toolbar-title',
        'v-toolbar-items',
        'v-toolbar-side-icon',
        'v-system-bar'
      ],
      usage: { file: 'default' },
      examples: [
        { file: 'appBar' },
        { file: 'appBarExtension' },
        { file: 'columnWidthWithHierarchy' },
        { file: 'flexibleAndCard' },
        { file: 'floatingWithSearch', uninverted: true },
        { file: 'variations', uninverted: true },
        { file: 'prominent' },
        { file: 'dense', inverted: true },
        { file: 'denseProminent', uninverted: true },
        { file: 'scrolling' },
        { file: 'appBarMenu' },
        { file: 'systemBarsStatusWindow' }
      ]
    })
  }
</script>
