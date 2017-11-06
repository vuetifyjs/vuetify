<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'text-fields-page',

    data: () => ({
      component: 'v-text-field',
      usage: { file: 'label' },
      examples: [
        { file: 'labelDark' },
        { file: 'singleLine' },
        { file: 'singleLineDark' },
        { file: 'icon' },
        { file: 'iconDark' },
        { file: 'multiLine' },
        { file: 'multiLineDark' },
        { file: 'characterCounter' },
        { file: 'password' },
        { file: 'validation' },
        { file: 'fullWidthWithCharacterCounter' },
        { file: 'requiredFields' },
        { file: 'hint' },
        { file: 'prefixesAndSuffixes' },
        { file: 'customValidation' },
        { file: 'textarea' },
        { file: 'box' },
        { file: 'customColors' },
        { file: 'masks' },
        { file: 'progressBar' }
      ]
    })
  }
</script>
