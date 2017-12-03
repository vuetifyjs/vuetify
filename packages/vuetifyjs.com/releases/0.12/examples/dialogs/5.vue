<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable>
      <v-btn primary light slot="activator">Open Dialog</v-btn>
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-row height="300px">
          <v-card-text>
            <v-radio label="Bahamas, The" v-model="dialogm1" value="bahamas"></v-radio>
            <v-radio label="Bahrain" v-model="dialogm1" value="bahrain"></v-radio>
            <v-radio label="Bangladesh" v-model="dialogm1" value="bangladesh"></v-radio>
            <v-radio label="Barbados" v-model="dialogm1" value="barbados"></v-radio>
            <v-radio label="Belarus" v-model="dialogm1" value="belarus"></v-radio>
            <v-radio label="Belgium" v-model="dialogm1" value="belgium"></v-radio>
            <v-radio label="Belize" v-model="dialogm1" value="belize"></v-radio>
            <v-radio label="Benin" v-model="dialogm1" value="benin"></v-radio>
            <v-radio label="Bhutan" v-model="dialogm1" value="bhutan"></v-radio>
            <v-radio label="Bolivia" v-model="dialogm1" value="bolivia"></v-radio>
            <v-radio label="Bosnia and Herzegovina" v-model="dialogm1" value="bosnia"></v-radio>
            <v-radio label="Botswana" v-model="dialogm1" value="botswana"></v-radio>
            <v-radio label="Brazil" v-model="dialogm1" value="brazil"></v-radio>
            <v-radio label="Brunei" v-model="dialogm1" value="brunei"></v-radio>
            <v-radio label="Bulgaria" v-model="dialogm1" value="bulgaria"></v-radio>
            <v-radio label="Burkina Faso" v-model="dialogm1" value="burkina"></v-radio>
            <v-radio label="Burma" v-model="dialogm1" value="burma"></v-radio>
            <v-radio label="Burundi" v-model="dialogm1" value="burundi"></v-radio>
          </v-card-text>
        </v-card-row>
        <v-divider></v-divider>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialogm1: '',
        dialog: false
      }
    }
  }
</script>
