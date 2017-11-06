<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'selects-page',

    data: () => ({
      component: 'v-select',
      usage: { file: 'light' },
      examples: [
        { file: 'dark' },
        { file: 'icons' },
        { file: 'multiple' },
        { file: 'autocomplete' },
        { file: 'scopedSlots' },
        { file: 'customTextAndValue' },
        { file: 'tags' },
        { file: 'asynchronous' }
      ]
    })
  }
</script>
