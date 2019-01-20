<template>
  <v-container>
    <v-layout column>
      <core-title>
        Default
      </core-title>
      <v-flex align-self-center>
        <v-time-picker value="9:41" />
      </v-flex>

      <core-title>
        Landscape
      </core-title>
      <v-flex align-self-center>
        <v-time-picker
          value="9:41"
          landscape
        />
      </v-flex>

      <core-title>
        Disabled
      </core-title>
      <v-flex>
        <v-layout
          row
          justify-space-around
          align-center
        >
          <v-time-picker
            value="9:41"
            disabled
          />
          <v-time-picker
            value="9:41"
            disabled
            landscape
          />
        </v-layout>
      </v-flex>

      <core-title>
        Colors
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            class="mt-4"
            color="success"
          />
          <v-time-picker
            value="9:41"
            class="mt-4"
            color="warning"
          />
          <v-time-picker
            value="9:41"
            class="mt-4"
            color="teal lighten-1"
          />
        </v-layout>

        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            class="mt-4"
            landscape
            color="success"
          />
          <v-time-picker
            value="9:41"
            class="mt-4"
            landscape
            color="warning"
          />
          <v-time-picker
            value="9:41"
            class="mt-4"
            landscape
            color="teal lighten-1"
          />
        </v-layout>
      </v-flex>

      <core-title>
        24 hour format
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-time-picker
            value="9:41"
            format="24hr"
          />
          <v-time-picker
            value="9:41"
            landscape
            format="24hr"
          />
        </v-layout>
      </v-flex>

      <core-title>
        Disabled with 24 hour format
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
          align-center
        >
          <v-time-picker
            value="9:41"
            disabled
            format="24hr"
          />
          <v-time-picker
            value="9:41"
            disabled
            landscape
            format="24hr"
          />
        </v-layout>
      </v-flex>

      <core-title>
        In dialog
      </core-title>
      <v-flex align-self-center>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="time1"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time1"
            label="Picker in dialog"
            prepend-icon="mdi-clock-outline"
            readonly
          />
          <v-time-picker
            v-if="modal"
            v-model="time1"
            value="9:41"
            full-width
          >
            <v-spacer />
            <v-btn
              flat
              color="primary"
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              color="primary"
              @click="$refs.dialog.save(time1)"
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>

      <core-title>
        In menu
      </core-title>
      <v-flex align-self-center>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time2"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time2"
            label="Picker in menu"
            prepend-icon="mdi-clock-outline"
            readonly
          />
          <v-time-picker
            v-if="menu"
            v-model="time2"
            full-width
            @change="$refs.menu.save(time2)"
          />
        </v-menu>
      </v-flex>

      <core-title>
        Allowed hours
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          align-center
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 2 && v <= 13"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 3 && v <= 11"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 8 && v <= 17"
            class="mt-3"
            format="24hr"
          />
        </v-layout>
      </v-flex>

      <core-title>
        Allowed minutes
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          align-center
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            :allowed-minutes="v => v >= 10 && v <= 50"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-minutes="v => v >= 5 && v <= 40"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-minutes="v => v >= 20 && v <= 40"
            class="mt-3"
            format="24hr"
          />
        </v-layout>
      </v-flex>

      <core-title>
        Allowed hours & minutes
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          align-center
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 2 && v <= 13"
            :allowed-minutes="v => v >= 10 && v <= 50"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 3 && v <= 11"
            :allowed-minutes="v => v >= 5 && v <= 40"
            class="mt-3"
            format="24hr"
          />

          <v-time-picker
            value="9:41"
            :allowed-hours="v => v >= 8 && v <= 17"
            :allowed-minutes="v => v >= 20 && v <= 40"
            class="mt-3"
            format="24hr"
          />
        </v-layout>
      </v-flex>

      <core-title>
        Custom width
      </core-title>
      <v-flex>
        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            width="150"
          />
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            width="200"
          />
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            width="300"
          />
        </v-layout>

        <v-layout
          row
          wrap
          justify-space-around
        >
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            landscape
            width="150"
          />
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            landscape
            width="200"
          />
          <v-time-picker
            value="9:41"
            class="mt-4 center"
            landscape
            width="400"
          />
        </v-layout>
      </v-flex>

      <core-title>
        Full width
      </core-title>
      <v-flex>
        <v-layout column>
          <v-time-picker
            value="9:41"
            class="mt-4"
            full-width
          />
          <v-time-picker
            value="9:41"
            class="mt-4"
            landscape
            full-width
          />
        </v-layout>
      </v-flex>

      <core-title>
        With seconds
      </core-title>
      <v-flex align-self-center>
        <v-time-picker
          value="9:41:14"
          use-seconds
        />
      </v-flex>

      <core-title>
        Allowed seconds
      </core-title>
      <v-flex align-self-center>
        <v-time-picker
          value="9:41:14"
          use-seconds
          :allowed-seconds="v => v <= 40 && v >= 15"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'TimePickers',

    data: () => ({
      modal: false,
      menu: false,
      time1: '9:41',
      time2: '9:41'
    })
  }
</script>
