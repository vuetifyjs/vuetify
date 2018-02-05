<template>
  <v-layout row wrap>
    <v-flex xs11 sm5>
      <v-menu
        ref="menu"
        lazy
        :close-on-content-click="false"
        v-model="menu2"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
        :return-value.sync="time"
      >
        <v-text-field
          slot="activator"
          label="Picker in menu"
          v-model="time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="time" @change="$refs.menu.save(time)"></v-time-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs11 sm5>
      <v-dialog
        ref="dialog"
        persistent
        v-model="modal2"
        lazy
        full-width
        width="290px"
        :return-value.sync="time"
      >
        <v-text-field
          slot="activator"
          label="Picker in dialog"
          v-model="time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="time" actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        time: null,
        menu2: false,
        modal2: false
      }
    }
  }
</script>
