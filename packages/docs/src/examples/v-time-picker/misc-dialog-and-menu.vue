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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14752-321918"
}
</example-meta>
