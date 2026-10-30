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
          <template v-slot:activator="{ props }">
            <v-text-field
              :model-value="computedDateFormattedMomentjs"
              label="Formatted with Moment.js"
              clearable
              readonly
              v-bind="props"
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
          <template v-slot:activator="{ props }">
            <v-text-field
              :model-value="computedDateFormattedDatefns"
              label="Formatted with datefns"
              clearable
              readonly
              v-bind="props"
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
  import { useDate } from 'vuetify'
  import { computed, ref } from 'vue'
  import moment from 'moment'
  import { format, parseISO } from 'date-fns'

  const date = ref(format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'))
  const adapter = useDate()
  const isoDate = computed(() => date.value ? adapter.toISO(adapter.date(date.value)) : '')
  const menu1 = ref(false)
  const menu2 = ref(false)

  const computedDateFormattedMomentjs = computed(() => {
    return isoDate.value ? moment(isoDate.value).format('dddd, MMMM Do YYYY') : ''
  })
  const computedDateFormattedDatefns = computed(() => {
    return isoDate.value ? format(parseISO(isoDate.value), 'EEEE, MMMM do yyyy') : ''
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
      isoDate () {
        return this.date ? this.$vuetify.date.toISO(this.$vuetify.date.date(this.date)) : ''
      },
      computedDateFormattedMomentjs () {
        return this.isoDate ? moment(this.isoDate).format('dddd, MMMM Do YYYY') : ''
      },
      computedDateFormattedDatefns () {
        return this.isoDate ? format(parseISO(this.isoDate), 'EEEE, MMMM do yyyy') : ''
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
