<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
        cols="11"
        sm="5"
      >
        <v-text-field
          v-model="time"
          :active="menu2"
          :focus="menu2"
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
        >
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            activator="parent"
            transition="scale-transition"
          >
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
            ></v-time-picker>
          </v-menu>
        </v-text-field>
      </v-col>

      <v-col
        cols="11"
        sm="5"
      >
        <v-text-field
          v-model="time"
          :active="modal2"
          :focused="modal2"
          label="Picker in dialog"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
        >
          <v-dialog
            v-model="modal2"
            activator="parent"
            width="auto"
          >
            <v-time-picker
              v-if="modal2"
              v-model="time"
            ></v-time-picker>
          </v-dialog>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const time = ref(null)
  const menu2 = ref(false)
  const modal2 = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        time: null,
        menu2: false,
        modal2: false,
      }
    },
  }
</script>
