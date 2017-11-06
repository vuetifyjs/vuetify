<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'tabs-page',

    data: () => ({
      component: 'v-tabs',
      components: [
        'v-tabs-bar',
        'v-tabs-slider',
        'v-tabs-item',
        'v-tabs-items',
        'v-tabs-content',
      ],
      plural: true,
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
