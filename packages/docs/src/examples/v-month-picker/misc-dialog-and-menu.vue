<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          min-width="auto"
          transition="scale-transition"
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-inner-icon="mdi-calendar"
              hide-details
              readonly
              v-bind="activatorProps"
            ></v-text-field>
          </template>
          <v-month-picker
            v-model="date"
            @update:model-value="menu = false"
          ></v-month-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        sm="6"
      >
        <v-dialog
          v-model="dialog"
          location="center center"
          max-width="360"
          persistent
        >
          <template v-slot:activator="{ props: activatorProps }">
            <v-text-field
              v-model="date"
              label="Picker in dialog"
              prepend-inner-icon="mdi-calendar"
              hide-details
              readonly
              v-bind="activatorProps"
            ></v-text-field>
          </template>
          <v-month-picker
            v-model="dialogDate"
          >
            <template v-slot:actions>
              <v-btn
                color="primary"
                text="Cancel"
                variant="text"
                @click="dialog = false"
              ></v-btn>
              <v-btn
                color="primary"
                text="OK"
                variant="text"
                @click="onDialogSave(dialogDate)"
              ></v-btn>
            </template>
          </v-month-picker>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useDate } from 'vuetify'

  const adapter = useDate()

  const date = ref(adapter.toISO(adapter.addMonths(adapter.date(), 2)).substring(0, 7))
  const dialogDate = ref(date.value)
  const menu = ref(false)
  const dialog = ref(false)

  function onDialogSave (value) {
    date.value = value
    dialog.value = false
  }
</script>
