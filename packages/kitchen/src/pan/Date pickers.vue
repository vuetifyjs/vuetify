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
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Default
            </h3>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
            />
          </v-flex>
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              With week number
            </h3>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              show-week
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Landscape
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
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
            :landscape="landscape"
            class="mt-4"
            color="success"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-4"
            color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
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
            :landscape="landscape"
            class="mt-4"
            header-color="success"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-4"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
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
            :landscape="landscape"
            class="mt-4"
            color="red lighten-2"
            header-color="success"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-4"
            color="error"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model"
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
              Allowed dates: min/max
            </h3>
            <v-date-picker
              v-model="modelMM"
              :landscape="landscape"
              min="2019-01-14"
              max="2019-02-05"
            />
          </v-flex>
          <v-flex text-xs-center>
            <h3 class="title grey--text mb-4 mt-5 center">
              Allowed dates: function
            </h3>
            <v-date-picker
              v-model="modelMM"
              :landscape="landscape"
              :allowed-dates="val => parseInt(val.split('-')[2], 10) % 2 === 0"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Mulitple dates selection
      </h3>
      <v-flex>
        <v-layout
          column
          align-center
        >
          <v-date-picker
            v-model="dates"
            :landscape="landscape"
            multiple
          />

          <v-combobox
            v-model="dates"
            multiple
            chips
            small-chips
            label="Selected dates"
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
            :header-date-format="shortHeaderFormat"
            width="200"
            class="mt-3"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            width="290"
            class="mt-3"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            width="500"
            class="mt-3"
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
          justify-space-around
          align-center
        >
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            full-width
            class="mt-3"
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
              :landscape="landscape"
              :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
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
            :first-day-of-week="0"
            locale="zh-cn"
            class="mt-3"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            :first-day-of-week="1"
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
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Current day indicator
      </h3>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-4"
            :show-current="false"
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            class="mt-4"
            show-current="2019-01-05"
          />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'DatePickers',

    data: () => ({
      arrayEvents: ['2019-01-18', '2019-01-14', '2019-01-02', '2019-01-06', '2019-01-03', '2019-01-29'],
      dates: ['2019-01-16', '2019-02-25', '2019-02-26', '2019-02-13'],
      model: '2019-01-16',
      modelMM: '2019-01-16',
      landscape: false
    }),

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
