<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          ref="menu1"
          v-model="menu1Active"
          :close-on-content-click="false"
          max-width="290px"
          min-width="auto"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              hint="MM/DD/YYYY format"
              label="Date"
              prepend-icon="mdi-calendar"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              @blur="date = parseDate(dateFormatted)"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <p>Date in ISO format: <strong>{{ date }}</strong></p>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290px"
          min-width="auto"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computedDateFormatted"
              hint="MM/DD/YYYY format"
              label="Date (read only text field)"
              prepend-icon="mdi-calendar"
              persistent-hint
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <p>Date in ISO format: <strong>{{ date }}</strong></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const menu1 = ref()

  const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
  const dateFormatted = ref(formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)))
  const menu1Active = ref(false)
  const menu2 = ref(false)

  const computedDateFormatted = computed(() => {
    return formatDate(date.value)
  })

  watch(date, val => {
    dateFormatted.value = formatDate(val)
  })

  function formatDate (date) {
    if (!date) return null
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
  }
  function parseDate (date) {
    if (!date) return null
    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
</script>

<script>
  export default {
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

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
      },
    },
  }
</script>
