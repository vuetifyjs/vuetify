<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'text-fields-page',

    data: () => ({
      namespace: 'TextFields',
      folder: 'text-fields',
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
        { file: 'FullWidthWithCharacterCounter' },
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
