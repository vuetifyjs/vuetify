<template>
  <v-container>
    <v-btn
      large
      color="red"
      dark
      fab
      fixed
      bottom
      right
      @click="() => landscape = !landscape"
    >
      <v-icon small>
        {{ landscape ? 'mdi-phone-rotate-portrait' : 'mdi-phone-rotate-landscape' }}
      </v-icon>
    </v-btn>

    <v-layout column>

      <main-header>Date pickers</main-header>
      <core-section>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <core-title>
              Default
            </core-title>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
            />
          </v-flex>
          <v-flex text-xs-center>
            <core-title>
              With week number
            </core-title>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              show-week
            />
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Landscape
      </core-title>
      <core-section center>
        <v-date-picker
          v-model="model"
          landscape
        />
      </core-section>

      <core-section>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <core-title>
              Readonly
            </core-title>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              readonly
            />
          </v-flex>
          <v-flex text-xs-center>
            <core-title>
              Disabled
            </core-title>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              disabled
            />
          </v-flex>
          <v-flex text-xs-center>
            <core-title>
              Reactive
            </core-title>
            <v-date-picker
              v-model="model"
              :landscape="landscape"
              reactive
            />
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Color
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Header colors
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Using header colors with colors
      </core-title>
      <core-section>
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
      </core-section>

      <core-section>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-flex text-xs-center>
            <core-title>
              Allowed dates: min/max
            </core-title>
            <v-date-picker
              v-model="modelMM"
              :landscape="landscape"
              min="2019-01-14"
              max="2019-02-05"
            />
          </v-flex>
          <v-flex text-xs-center>
            <core-title>
              Allowed dates: function
            </core-title>
            <v-date-picker
              v-model="modelMM"
              :landscape="landscape"
              :allowed-dates="val => parseInt(val.split('-')[2], 10) % 2 === 0"
            />
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Mulitple dates selection
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Custom width
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Full width
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Events
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        i18n
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Custom icons
      </core-title>
      <core-section center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        />
      </core-section>

      <core-title>
        Current day indicator
      </core-title>
      <core-section>
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
      </core-section>
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
      landscape: false,
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
      },
    },
  }
</script>
