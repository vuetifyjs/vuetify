<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="menu2"
        transition="scale-transition"
        offset-y
        :nudge-left="40"
      >
        <v-text-field
          slot="activator"
          label="Picker in menu"
          v-model="e6"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="e6" autosave></v-time-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12 sm6>
      <v-dialog
        persistent
        v-model="modal2"
        lazy
      >
        <v-text-field
          slot="activator"
          label="Picker in dialog"
          v-model="e6"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="e6" actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat primary @click="cancel()">Cancel</v-btn>
              <v-btn flat primary @click="save()">OK</v-btn>
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
        e6: null,
        menu2: false,
        modal2: false,
      }
    }
  }
</script>
