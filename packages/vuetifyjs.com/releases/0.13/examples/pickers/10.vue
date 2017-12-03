<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
          :primary="allowedTimes === everyOtherValue"
          :class="{ 'white--text': allowedTimes === everyOtherValue }"
          @click.native="allowedTimes = everyOtherValue"
        >Function</v-btn>
        <v-btn
          :primary="allowedTimes === randomValues"
          :class="{ 'white--text': allowedTimes === randomValues }"
          @click.native="allowedTimes = randomValues"
        >Array</v-btn>
        <v-btn
          :primary="allowedTimes === minMaxValues"
          :class="{ 'white--text': allowedTimes === minMaxValues }"
          @click.native="allowedTimes = minMaxValues"
        >Object</v-btn>
        <v-time-picker
          class="mt-3"
          landscape
          scrollable
          v-model="date"
          :allowed-hours="allowedTimes.hours"
          :allowed-minutes="allowedTimes.minutes"
        ></v-time-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        date: null,
        allowedTimes: {
          hours: null,
          minutes: null
        },
        everyOtherValue: {
          hours: function (value) {
            return value % 2 === 0
          },
          minutes: function (value) {
            return value % 15 === 0
          }
        },
        randomValues: {
          hours: [],
          minute: []
        },
        minMaxValues: {
          hours: {
            min: '9AM',
            max: '3PM'
          },
          minutes: {
            min: 30,
            max: 60
          }
        }
      }
    },
    mounted () {
      this.randomValues.hours = [...Array(6)].map(() => {
        return Math.floor(Math.random() * 12)
      })
      this.randomValues.minutes = [...Array(6)].map(() => {
        return Math.floor(Math.random() * 12) * 5
      })

      this.allowedTimes = this.everyOtherValue
    }
  }
</script>
