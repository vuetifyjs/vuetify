<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Default
      </h3>
      <v-flex align-self-center>
        <v-date-picker v-model="model1" />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Landscape
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="model2"
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
            :value="new Date().toISOString().substr(0, 10)"
            disabled
          />
          <v-date-picker
            :value="new Date().toISOString().substr(0, 10)"
            landscape
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
            v-model="model3"
            reactive
          />
          <v-date-picker
            v-model="model4"
            landscape
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
            v-model="model5"
            class="mt-4"
            color="success"
          />
          <v-date-picker
            v-model="model6"
            class="mt-4"
            color="red lighten-2"
          />
          <v-date-picker
            v-model="model7"
            class="mt-4"
            color="blue"
          />
          <v-date-picker
            v-model="model8"
            class="mt-4"
            landscape
            color="success"
          />
          <v-date-picker
            v-model="model9"
            class="mt-4"
            landscape
            color="red lighten-2"
          />
          <v-date-picker
            v-model="model10"
            class="mt-4"
            landscape
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
            v-model="model11"
            class="mt-4"
            header-color="success"
          />
          <v-date-picker
            v-model="model12"
            class="mt-4"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model13"
            class="mt-4"
            header-color="blue"
          />
          <v-date-picker
            v-model="model14"
            class="mt-4"
            landscape
            header-color="success"
          />
          <v-date-picker
            v-model="model15"
            class="mt-4"
            landscape
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model16"
            class="mt-4"
            landscape
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
            v-model="model17"
            class="mt-4"
            color="red lighten-2"
            header-color="success"
          />
          <v-date-picker
            v-model="model18"
            class="mt-4"
            color="error"
            header-color="red lighten-2"
          />
          <v-date-picker
            v-model="model19"
            class="mt-4"
            color="teal"
            header-color="blue"
          />
          <v-date-picker
            v-model="model20"
            class="mt-4"
            color="red lighten-2"
            header-color="success"
            landscape
          />
          <v-date-picker
            v-model="model21"
            class="mt-4"
            color="error"
            header-color="red lighten-2"
            landscape
          />
          <v-date-picker
            v-model="model22"
            class="mt-4"
            color="teal"
            header-color="blue"
            landscape
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
          :return-value.sync="date1"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date1"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="date1"
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
              @click="$refs.menu.save(date1)"
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
          :return-value.sync="date1"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date1"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="date1"
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
              @click="$refs.dialog.save(date1)"
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
          v-model="date2"
          no-title
        />
        <p>Date in ISO format: <strong>{{ date2 }}</strong></p>
        <p>Date in custom format: <strong>{{ date2 | customFormat }}</strong></p>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Allowed dates: min-max
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="date3"
          min="2016-06-15"
          max="2018-03-20"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Allowed dates: function
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="date4"
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
            v-model="date5"
            width="200"
            class="mt-3"
          />
          <v-date-picker
            v-model="date6"
            width="290"
            class="mt-3"
          />
          <v-date-picker
            v-model="date7"
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
            v-model="date8"
            full-width
            class="mt-3"
          />
          <v-date-picker
            v-model="date9"
            landscape
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
          v-model="date8"
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
              v-model="date9"
              :events="arrayEvents"
              event-color="green lighten-1"
            />
          </div>
          <div class="mt-3">
            <div class="subheading text-center">
              Defined by function
            </div>
            <v-date-picker
              v-model="date10"
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
            v-model="picker"
            :first-day-of-week="0"
            locale="zh-cn"
            class="mt-3"
          />
          <v-date-picker
            v-model="picker"
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
          v-model="picker1"
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
          v-model="date11"
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
            v-model="date12"
            class="mt-4"
            :show-current="false"
          />
          <v-date-picker
            v-model="date13"
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
            v-model="picker2"
            class="mt-4"
            type="month"
          />
          <v-date-picker
            v-model="picker3"
            class="mt-4"
            landscape
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
            v-model="picker4"
            class="mt-4"
            color="info"
            type="month"
          />
          <v-date-picker
            v-model="picker5"
            class="mt-4"
            color="success"
            landscape
            type="month"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month pickers - allowed months
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="picker6"
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
          :return-value.sync="date16"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date16"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="date16"
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
              @click="$refs.menu2.save(date16)"
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
          :return-value.sync="dialDate2"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dialDate2"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
          />
          <v-date-picker
            v-model="dialDate2"
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
              @click="$refs.dialog2.save(dialDate2)"
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
            v-model="date14"
            class="mt-4"
            type="month"
            width="150"
          />
          <v-date-picker
            v-model="date14"
            class="mt-4"
            type="month"
            width="290"
          />
          <v-date-picker
            v-model="date14"
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
            v-model="date15"
            class="mt-4"
            full-width
            type="month"
          />
          <v-date-picker
            v-model="date15"
            class="mt-4"
            full-width
            landscape
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
              v-model="picker7"
              type="month"
              locale="th"
            />
          </div>
          <div class="mt-4">
            <v-date-picker
              v-model="picker8"
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
          v-model="picker9"
          readonly
          type="month"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Month picker - custom icons
      </h3>
      <v-flex align-self-center>
        <v-date-picker
          v-model="picker10"
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
              v-model="month1"
              :show-current="false"
              type="month"
            />
          </div>
          <div class="mt-4">
            <v-date-picker
              v-model="month2"
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
    model1: new Date().toISOString().substr(0, 10),
    model2: new Date().toISOString().substr(0, 10),
    model3: new Date().toISOString().substr(0, 10),
    model4: new Date().toISOString().substr(0, 10),
    model5: new Date().toISOString().substr(0, 10),
    model6: new Date().toISOString().substr(0, 10),
    model7: new Date().toISOString().substr(0, 10),
    model8: new Date().toISOString().substr(0, 10),
    model9: new Date().toISOString().substr(0, 10),
    model10: new Date().toISOString().substr(0, 10),
    model11: new Date().toISOString().substr(0, 10),
    model12: new Date().toISOString().substr(0, 10),
    model13: new Date().toISOString().substr(0, 10),
    model14: new Date().toISOString().substr(0, 10),
    model15: new Date().toISOString().substr(0, 10),
    model16: new Date().toISOString().substr(0, 10),
    model17: new Date().toISOString().substr(0, 10),
    model18: new Date().toISOString().substr(0, 10),
    model19: new Date().toISOString().substr(0, 10),
    model20: new Date().toISOString().substr(0, 10),
    model21: new Date().toISOString().substr(0, 10),
    model22: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal1: false,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    date3: new Date().toISOString().substr(0, 10),
    date4: new Date().toISOString().substr(0, 10),
    dates: [],
    date5: new Date().toISOString().substr(0, 10),
    date6: new Date().toISOString().substr(0, 10),
    date7: new Date().toISOString().substr(0, 10),
    date8: new Date().toISOString().substr(0, 10),
    pickerDate: null,
    arrayEvents: null,
    date9: new Date().toISOString().substr(0, 10),
    date10: new Date().toISOString().substr(0, 10),
    picker: new Date().toISOString().substr(0, 10),
    picker1: new Date().toISOString().substr(0, 10),
    date11: new Date().toISOString().substr(0, 10),
    date12: new Date().toISOString().substr(0, 10),
    date13: '2013-07-29',
    picker2: new Date().toISOString().substr(0, 10),
    picker3: new Date().toISOString().substr(0, 10),
    picker4: new Date().toISOString().substr(0, 10),
    picker5: new Date().toISOString().substr(0, 10),
    picker6: new Date().toISOString().substr(0, 10),
    dialDate2: new Date().toISOString().substr(0, 7),
    modal2: false,
    months: [],
    date14: new Date().toISOString().substr(0, 10),
    date15: new Date().toISOString().substr(0, 10),
    date16: new Date().toISOString().substr(0, 7),
    menu2: false,
    picker7: new Date().toISOString().substr(0, 10),
    picker8: new Date().toISOString().substr(0, 10),
    picker9: '2018-06',
    picker10: new Date().toISOString().substr(0, 10),
    month1: new Date().toISOString().substr(0, 7),
    month2: '2013-09'
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
