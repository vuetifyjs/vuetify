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
        Default
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
        />
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

      <h3 class="title grey--text mb-4 mt-5 center">
        Disabled
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
            disabled
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Reactive
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
            reactive
          />
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

      <h3 class="title grey--text mb-4 mt-5 center">
        In menu
      </h3>
      <v-flex>
        <v-menu
          ref="menu"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="model"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="model"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="menu1 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.menu.save(model)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        In dialog
      </h3>
      <v-flex>
        <v-dialog
          ref="dialog"
          v-model="modal1"
          :return-value.sync="model"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="model"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="model"
            :landscape="landscape"
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="modal1 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.dialog.save(model)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom format
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          no-title
        />
        <p>Date in ISO format: <strong>{{ model }}</strong></p>
        <p>Date in custom format: <strong>{{ model | customFormat }}</strong></p>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Allowed dates: min-max
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="modelMM"
          :landscape="landscape"
          min="2016-06-15"
          max="2018-03-20"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Allowed dates: function
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          :allowed-dates="val => parseInt(val.split('-')[2], 10) % 2 === 0"
        />
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
        Watch month/year
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          :picker-date.sync="pickerDate"
        />
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
        Read-only
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model"
          :landscape="landscape"
          readonly
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        <code>show-current</code> prop
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
            show-current="2013-07-13"
          />
        </v-layout>
      </v-flex>

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
        Month pickers - in menus
      </h3>
      <v-flex>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="monthModel"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="monthModel"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            type="month"
            no-title
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="menu2 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.menu2.save(monthModel)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers - in dialogs
      </h3>
      <v-flex>
        <v-dialog
          ref="dialog2"
          v-model="modal2"
          :return-value.sync="monthModel"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="monthModel"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="monthModel"
            :landscape="landscape"
            type="month"
            scrollable
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="modal2 = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.dialog2.save(monthModel)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
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

  filters: {
    customFormat: v => `${v.split('-')[1]}/${v.split('-')[2]}/${v.split('-')[0]}`
  },

  data: () => ({
    menu1: false,
    modal1: false,
    pickerDate: null,
    arrayEvents: null,
    modal2: false,
    months: [],
    dates: [],
    menu2: false,
    model: '2019-01-16',
    modelMM: '2017-07-15',
    monthModel: '2019-01',
    landscape: false
  }),

  watch: {
    pickerDate (val, oldVal) {
      oldVal && alert(val) // Don't trigger on page open
    }
  },

  mounted () {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  },

  methods: {
    functionEvents (date) {
      const [,, day] = date.split('-')
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
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
