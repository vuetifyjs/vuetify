<template>
  <v-layout row wrap>
    <v-flex xs11 sm5>
      <v-menu
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="dateFormatted"
          label="Date in M/D/Y format"
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          actions
          @input="dateFormatted = formatDate($event)"
        >
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
      <p>Date in ISO format: <strong>{{ date }}</strong></p>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      date: null,
      dateFormatted: null,
      menu: false
    }),

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>
