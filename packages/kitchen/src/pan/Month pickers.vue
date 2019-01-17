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
            v-model="model"
            :landscape="landscape"
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Landscape
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          type="month"
          landscape
        />
      </v-flex>

      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Readonly
            </h3>
            <v-date-picker
              v-model="model"
              type="month"
              :landscape="landscape"
              readonly
            />
          </v-flex>
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Disabled
            </h3>
            <v-date-picker
              v-model="model"
              type="month"
              :landscape="landscape"
              disabled
            />
          </v-flex>
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Reactive
            </h3>
            <v-date-picker
              v-model="model"
              type="month"
              :landscape="landscape"
              reactive
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Color
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="success"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="blue"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Header colors
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            header-color="success"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            header-color="blue"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Using header colors with colors
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="red lighten-2"
            header-color="success"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="error"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
            type="month"
            :landscape="landscape"
            class="mt-4"
            color="teal"
            header-color="blue"
          />
        </v-layout>
      </v-flex>

      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Allowed months: min/max
            </h3>
            <v-date-picker
              v-model="modelMM"
              type="month"
              :landscape="landscape"
              min="2018-11"
              max="2019-08"
            />
          </v-flex>
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Allowed dates: function
            </h3>
            <v-date-picker
              v-model="modelMM"
              type="month"
              :landscape="landscape"
              :allowed-dates="val => parseInt(val.split('-')[1], 10) % 2 === 1"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Multiple
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
        Custom width
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-3"
            type="month"
            width="150"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-3"
            type="month"
            width="290"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-3"
            type="month"
            width="400"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Full width
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          align-center
          justify-space-around
        >
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-3"
            full-width
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Events
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
        >
          <div class="mt-3">
            <div class="subheading text-center">
              Defined by array
            </div>
            <v-date-picker
              v-model="model"
              type="month"
              :landscape="landscape"
              :events="arrayEvents"
              event-color="green lighten-1"
            />
          </div>
          <div class="mt-3">
            <div class="subheading text-center">
              Defined by function
            </div>
            <v-date-picker
              v-model="model"
              type="month"
              :landscape="landscape"
              :event-color="date => date[6] % 2 ? 'red' : 'yellow'"
              :events="functionEvents"
            />
          </div>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        i18n
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            type="month"
            locale="th"
            class="mt-3"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            type="month"
            locale="sv-se"
            class="mt-3"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom icons
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          type="month"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Current month indicator
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
              v-model="model"
              :landscape="landscape"
              :show-current="false"
              type="month"
            />
          </div>
          <div class="mt-4">
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              type="month"
              show-current="2019-07"
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
      arrayEvents: ['2019-01', '2019-03', '2019-06', '2019-12'],
      model: '2019-03',
      modelMM: '2019-03',
      months: ['2019-01', '2019-03', '2020-05', '2020-07'],
      landscape: false
    }),

    methods: {
      functionEvents (date) {
        const [, month] = date.split('-')
        if ([1, 3, 12].includes(parseInt(month, 10))) return true
        if ([5, 6, 11].includes(parseInt(month, 10))) return ['red', '#00f']
        return false
      }
    }
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
