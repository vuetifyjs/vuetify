<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-menu
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="v-scale-transition"
          offset-y
          :nudge-left="40"
        >
          <v-text-field
            slot="activator"
            label="Picker in menu"
            v-model="e3"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="e3" no-title scrollable actions>
            <template scope="{ save, cancel }">
              <v-card-row actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                <v-btn flat primary @click.native="save()">Save</v-btn>
              </v-card-row>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 sm6>
        <v-dialog
          persistent
          v-model="modal"
          lazy
        >
          <v-text-field
            slot="activator"
            label="Picker in dialog"
            v-model="e3"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="e3" scrollable>
            <template scope="{ save, cancel }">
              <v-card-row actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                <v-btn flat primary @click.native="save()">Save</v-btn>
              </v-card-row>
            </template>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e3: null,
        menu: false,
        modal: false,
      }
    }
  }
</script>
