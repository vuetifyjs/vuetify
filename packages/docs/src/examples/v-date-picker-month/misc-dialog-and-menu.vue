<template>
  <v-row>
    <v-col
      cols="11"
      sm="5"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        v-model:return-value="date"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="text"
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    <v-col
      cols="11"
      sm="5"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        v-model:return-value="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          type="month"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="text"
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
    }),
  }
</script>
