<template>
  <v-layout row wrap>
    <v-flex xs11 sm5>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="menu2"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Picker in menu"
          v-model="time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="time" autosave></v-time-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs11 sm5>
      <v-dialog
        persistent
        v-model="modal2"
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          label="Picker in dialog"
          v-model="time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="time" actions>
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">Save</v-btn>
            </v-card-actions>
          </template>
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
        modal2: false,
      }
    }
  }
</script>
