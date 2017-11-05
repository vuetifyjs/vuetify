<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'pickers-page',

    data: () => ({
      namespace: 'Pickers',
      folder: 'pickers',
      usage: { file: 'dateLight' },
      examples: [
        { file: 'dateDark' },
        { file: 'dateDialogAndMenu' },
        { file: 'dateAllowedDates' },
        { file: 'dateCustomFormat' },
        { file: 'dateInternationalization' },
        { file: 'monthLight' },
        { file: 'monthDark' },
        { file: 'monthDialogAndMenu' },
        { file: 'monthAllowedMonths' },
        { file: 'monthCustomFormat' },
        { file: 'monthInternationalization' },
        { file: 'timeLight' },
        { file: 'timeDark' },
        { file: 'timeDialogAndMenu' },
        { file: 'time24hFormat' },
        { file: 'timeAllowed' }
      ]
    })
  }
</script>
