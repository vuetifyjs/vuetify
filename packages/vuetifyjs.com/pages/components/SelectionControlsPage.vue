<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'selection-controls-page',

    data: () => ({
      component: 'v-checkbox',
      components: [
        'v-radio-group',
        'v-radio',
        'v-switch'
      ],
      name: 'selection-controls',
      plural: true,
      usage: { file: 'example' },
      examples: [
        { file: 'checkboxesBoolean' },
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
