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
            template(v-if="row.header")
              td
                strong {{ row.text }}
            template(v-else)
              td(v-for="(mask, i) in row" :key="i") {{ mask }}
</template>

<script>
  export default {
    data: () => ({
      masks: [
        { header: true, text: 'Masks' },
        ['#', 'Any digit'],
        ['A', 'Any capital letter'],
        ['a', 'Any small letter'],
        ['N', 'Any capital alphanumeric character'],
        ['n', 'Any small alphanumeric character'],
        ['X', 'Any special symbol (-!$%^&*()_+|~=`{}[]:";\'<>?,./\\) or space'],
        { header: true, text: 'Pre-made' },
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
