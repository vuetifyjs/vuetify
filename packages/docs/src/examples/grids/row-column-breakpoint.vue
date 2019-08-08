<template>
  <v-container>
    <v-row v-bind="binding">
      <v-col>
        <v-card dark color="primary">
          <v-card-text>one</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card dark color="secondary">
          <v-card-text>two</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card dark color="accent">
          <v-card-text>three</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      },
    },
  }
</script>
