<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog">
      <v-btn primary light slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-row>
          <v-card-title>Use Google's location service?</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>
