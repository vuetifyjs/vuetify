<template>
  <div
    style="width: 360px; height: 650px; margin: auto;"
    class="grey lighten-3"
  >
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          <v-switch label="primary"
            v-model="ex11"
            color="primary"
            value="primary"
            hide-details></v-switch>
          <v-switch label="secondary"
            v-model="ex11"
            color="secondary"
            value="secondary"
            hide-details></v-switch>
          <v-switch label="success"
            v-model="ex11"
            color="success"
            value="success"
            hide-details></v-switch>
          <v-switch label="info"
            v-model="ex11"
            color="info"
            value="info"
            hide-details></v-switch>
          <v-switch label="warning"
            v-model="ex11"
            color="warning"
            value="warning"
            hide-details></v-switch>
          <v-switch label="error"
            v-model="ex11"
            color="error"
            value="error"
            hide-details></v-switch>
        </v-flex>
        <v-flex xs6>
          <v-radio-group v-model="ex8" column>
            <v-radio label="primary"
              color="primary"
              value="primary"></v-radio>
            <v-radio label="secondary"
              color="secondary"
              value="secondary"></v-radio>
            <v-radio label="success"
              color="success"
              value="success"></v-radio>
            <v-radio label="info"
              color="info"
              value="info"></v-radio>
            <v-radio label="warning"
              color="warning"
              value="warning"></v-radio>
            <v-radio label="error"
              color="error"
              value="error"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ex8: 'primary',
        ex11: ["primary", "secondary", "error", "success", "warning", "info"]
      }
    }
  }
</script>

<style lang="stylus">
  .radio-group
    padding: 0
</style>
