<template>
  <v-card
    class="mb-6"
    outlined
  >
    <v-simple-table>
      <thead>
        <tr>
          <th>Screen Size</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="([text, value], i) in classes"
          :key="i"
        >
          <td v-text="text" />
          <td>
            <code v-text="value" />
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      classes: [
        ['Hidden on all', '.d-none'],
        ['Hidden only on xs', '.d-none .d-sm-flex'],
        ['Hidden only on sm', '.d-sm-none .d-md-flex'],
        ['Hidden only on md', '.d-md-none .d-lg-flex'],
        ['Hidden only on lg', '.d-lg-none .d-xl-flex'],
        ['Hidden only on xl', '.d-xl-none'],
        ['Visible on all', '.d-flex'],
        ['Visible only on xs', '.d-flex .d-sm-none'],
        ['Visible only on sm', '.d-none .d-sm-flex .d-md-none'],
        ['Visible only on md', '.d-none .d-md-flex .d-lg-none'],
        ['Visible only on lg', '.d-none .d-lg-flex .d-xl-none'],
        ['Visible only on xl', '.d-none .d-xl-flex'],
      ],
    }),
  }
</script>
