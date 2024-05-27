<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :model-value="computedDateFormattedMomentjs"
              label="Formatted with Moment.js"
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :model-value="computedDateFormattedDatefns"
              label="Formatted with datefns"
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import moment from 'moment'
  import { format, parseISO } from 'date-fns'

  const date = ref(format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'))
  const menu1 = ref(false)
  const menu2 = ref(false)

  const computedDateFormattedMomentjs = computed(() => {
    return date.value ? moment(date.value).format('dddd, MMMM Do YYYY') : ''
  })
  const computedDateFormattedDatefns = computed(() => {
    return date.value ? format(parseISO(date.value), 'EEEE, MMMM do yyyy') : ''
  })
</script>

<script>
  import moment from 'moment'
  import { format, parseISO } from 'date-fns'

  export default {
    data: () => ({
      // https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
      date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu1: false,
      menu2: false,
    }),

    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedDatefns () {
        return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
      },
    },
  }
</script>

<playground-resources lang="json">
  {
    "imports": {
      "moment": "https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js",
      "date-fns": "https://cdn.jsdelivr.net/npm/date-fns@2.30.0/esm/index.js/+esm"
    }
  }
</playground-resources>
