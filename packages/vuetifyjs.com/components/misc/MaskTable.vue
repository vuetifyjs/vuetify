<template lang="pug">
  v-card.mb-5
    v-table-overflow
      table.table
        caption.mt-3
          strong Mask legend
        thead
          tr.text-xs-left
            th Mask
            th Description
        tbody
          tr(
            v-for="(row, i) in masks"
            :key="i"
          )
            td(
              v-for="(mask, i) in row"
              :key="i"
              v-html="mask"
            )
</template>

<script>
  export default {
    data: () => ({
      masks: [
        ['<strong>Masks</strong>', ''],
        ['#', 'Any digit'],
        ['A', 'Any capital letter'],
        ['a', 'Any small letter'],
        ['N', 'Any capital alphanumeric character'],
        ['n', 'Any small alphanumeric character'],
        ['X', 'Any special symbol (-!$%^&*()_+|~=`{}[]:";\'<>?,./\\) or space'],
        ['<strong>Pre-made</strong>', ''],
        ['credit-card', '#### - #### - #### - ####'],
        ['date-with-time', '##/##/#### ##:##'],
        ['phone', '(###) ### - ####'],
        ['social', '###-##-####'],
        ['time', '##:##'],
        ['time-with-seconds', '##:##:##']
      ]
    })
  }
</script>
