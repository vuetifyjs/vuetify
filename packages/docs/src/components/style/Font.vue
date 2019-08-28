<template>
  <v-card
    class="mb-12"
    outlined
  >
    <v-simple-table>
      <caption class="pa-4">Typography Display Classes</caption>

      <thead>
        <tr>
          <th>Class</th>

          <th>Information</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="([c, info], i) in classes"
          :key="i"
        >
          <td>
            <code>.{{ c }}</code>
          </td>

          <td
            :class="`${c} py-3`"
            v-text="info"
          />
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      classes: [
        ['display-4', 'Light 96sp'],
        ['display-3', 'Light 60sp'],
        ['display-2', 'Regular 48sp'],
        ['display-1', 'Regular 34sp'],
        ['headline', 'Regular 24sp'],
        ['title', 'Medium 20sp'],
        ['subtitle-1', 'Regular 16sp'],
        ['subtitle-2', 'Medium 14sp'],
        ['body-1', 'Regular 16sp'],
        ['body-2', 'Regular 14sp'],
        ['caption', 'Regular 12sp'],
        ['overline', 'Regular 10sp'],
      ],
    }),
  }
</script>
