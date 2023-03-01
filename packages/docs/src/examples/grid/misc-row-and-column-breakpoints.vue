<template>
  <v-container class="bg-surface-variant">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col :cols="cols[0]">
        <v-sheet class="pa-2 ma-2">
          .v-col-{{ cols[0] }}
        </v-sheet>
      </v-col>

      <v-col :cols="cols[1]">
        <v-sheet class="pa-2 ma-2">
          .v-col-{{ cols[1] }}
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
      cols () {
        const { lg, sm } = this.$vuetify.display
        return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
      },
    },
  }
</script>
