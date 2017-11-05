<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'selects-page',

    data: () => ({
      namespace: 'Selects',
      folder: 'selects',
      usage: { file: 'light' },
      examples: [
        { file: 'dark' },
        { file: 'icons' },
        { file: 'multiple' },
        { file: 'autocomplete' },
        { file: 'scopedSlots' },
        { file: 'CustomTextAndValue' },
        { file: 'tags' },
        { file: 'asynchronous' }
      ]
    })
  }
</script>
