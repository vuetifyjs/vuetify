<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'selection-controls-page',

    data: () => ({
      namespace: 'Selection-controls',
      folder: 'selection-controls',
      usage: { file: 'checkboxesBoolean' },
      examples: [
        { file: 'checkboxesArray' },
        { file: 'checkboxesStates' },
        { file: 'checkboxesColors' },
        { file: 'radiosDefault' },
        { file: 'radiosDirection' },
        { file: 'radiosColors' },
        { file: 'switchesBoolean' },
        { file: 'switchesArray' },
        { file: 'switchesStates' },
        { file: 'switchesColors' }
      ]
    })
  }
</script>
