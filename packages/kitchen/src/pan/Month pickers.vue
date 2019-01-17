<template>
  <v-container>
    <v-btn
      large
      color="red"
      dark
      fab
      fixed
      bottom
      left
      @click="() => landscape = !landscape"
    >
      <v-icon small>
        {{ landscape ? 'mdi-phone-rotate-portrait' : 'mdi-phone-rotate-landscape' }}
      </v-icon>
    </v-btn>

    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers & colors
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            color="info"
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers - allowed months
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="monthModel"
          :landscape="landscape"
          :allowed-dates="val => parseInt(val.split('-')[1], 10) % 2 === 0"
          type="month"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers - multiple
      </h3>
      <v-flex>
        <v-layout
          column
          align-center
        >
          <v-date-picker
            v-model="months"
            :landscape="landscape"
            type="month"
            multiple
          />

          <v-combobox
            v-model="months"
            multiple
            chips
            small-chips
            label="Selected months"
            prepend-icon="mdi-calendar"
            readonly
            clearable
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - custom width
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            type="month"
            width="150"
          />
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            type="month"
            width="290"
          />
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            type="month"
            width="400"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - full width
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          align-center
          justify-space-around
        >
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            class="mt-4"
            full-width
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - i18n
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <div class="mt-4">
            <v-date-picker
              v-model="monthModel"
              :landscape="landscape"
              type="month"
              locale="th"
            />
          </div>
          <div class="mt-4">
            <v-date-picker
              v-model="monthModel"
              :landscape="landscape"
              type="month"
              locale="sv-se"
            />
          </div>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - <code>readonly</code>
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="monthModel"
          :landscape="landscape"
          readonly
          type="month"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - custom icons
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="monthModel"
          :landscape="landscape"
          type="month"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - current month indicator
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <div class="mt-4">
            <v-date-picker
              v-model="monthModel"
              :landscape="landscape"
              :show-current="false"
              type="month"
            />
          </div>
          <div class="mt-4">
            <v-date-picker
              v-model="monthModel"
              :landscape="landscape"
              type="month"
              show-current="2013-07"
            />
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'DatePickers',

    data: () => ({
      menu1: false,
      modal1: false,
      pickerDate: null,
      arrayEvents: ['2019-01-18', '2019-01-14', '2019-01-02', '2019-01-06', '2019-01-03', '2019-01-29'],
      modal2: false,
      months: [],
      dates: [],
      menu2: false,
      model: '2019-01-16',
      monthModel: '2019-01',
      landscape: false
    }),

    watch: {
      pickerDate (val, oldVal) {
        oldVal && alert(val) // Don't trigger on page open
      }
    },

    methods: {
      functionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      shortHeaderFormat (date) {
        return date.substr(0, 7)
      }
    }
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
