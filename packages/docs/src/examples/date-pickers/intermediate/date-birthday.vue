<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        label="Birthday date"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      active-picker="year"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data: () => ({
      date: null,
      menu: false,
    }),
  }
</script>
