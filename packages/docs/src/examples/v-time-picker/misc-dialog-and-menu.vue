<template>
  <v-container>
    <v-row class="justify-space-around">
      <v-col cols="11" sm="5">
        <v-text-field
          :model-value="time"
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
        >
          <v-menu
            v-model="showMenu"
            :close-on-content-click="false"
            activator="parent"
            min-width="0"
          >
            <v-time-picker v-model="time"></v-time-picker>
          </v-menu>
        </v-text-field>
      </v-col>

      <v-col cols="11" sm="5">
        <v-text-field
          :model-value="time"
          label="Picker in dialog"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
        >
          <v-dialog v-model="showDialog" activator="parent" width="auto">
            <v-time-picker v-model="time"></v-time-picker>
          </v-dialog>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const time = ref(null)
  const showMenu = ref(false)
  const showDialog = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        time: null,
        showMenu: false,
        showDialog: false,
      }
    },
  }
</script>
