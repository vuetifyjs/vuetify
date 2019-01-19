<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg6>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          full-width
          max-width="290"
        >
          <v-text-field
            slot="activator"
            :value="computedDateFormattedMomentjs"
            clearable
            label="Formatted with Moment.js"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="date"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs12 lg6>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          full-width
          max-width="290"
        >
          <v-text-field
            slot="activator"
            :value="computedDateFormattedDatefns"
            clearable
            label="Formatted with datefns"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="date"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import format from 'date-fns/format'

  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }),

    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedDatefns () {
        return this.date ? format(this.date, 'dddd, MMMM Do YYYY') : ''
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "js": [
      "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js"
    ]
  }
</codepen-resources>
