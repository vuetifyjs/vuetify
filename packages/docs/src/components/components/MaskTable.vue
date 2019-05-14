<template>
  <v-card class="mb-5">
    <v-simple-table class="v-table">
      <caption class="mt-3">
        <strong>Mask legend</strong>
      </caption>
      <thead>
        <tr class="text-xs-left">
          <th>Mask</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in masks"
          :key="i"
        >
          <template v-if="row.header">
            <td colspan="2">
              <strong v-text="row.text" />
            </td>
          </template>
          <template v-else>
            <td
              v-for="(mask, j) in row"
              :key="j"
              v-text="mask"
            />
          </template>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
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
