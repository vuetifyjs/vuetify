<template>
  <v-layout id="VCalendar_slots">
    <v-flex>
      <v-calendar
        :now="today"
        :value="today"
        color="primary"
      >
        <template
          slot="day"
          slot-scope="{ present, past, date }"
        >
          <div v-if="past && tracked[date]" class="bar-chart">
            <div
              v-for="(percent, index) in tracked[date]"
              :key="index"
              :title="category[index]"
              :style="{ width: percent + '%', backgroundColor: colors[index] }"
              class="bar"
            ></div>
          </div>
        </template>
      </v-calendar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      today: '2019-01-10',
      tracked: {
        '2019-01-09': [23, 45, 10],
        '2019-01-08': [10],
        '2019-01-07': [0, 78, 5],
        '2019-01-06': [0, 0, 50],
        '2019-01-05': [0, 10, 23],
        '2019-01-04': [2, 90],
        '2019-01-03': [10, 32],
        '2019-01-02': [80, 10, 10],
        '2019-01-01': [20, 25, 10]
      },
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['Development', 'Meetings', 'Slacking']
    })
  }
</script>

<style lang="stylus">
  #VCalendar_slots {
    .v-calendar {
      min-height: 400px;

      .v-calendar-weekly__day {
        padding: 2px;

        .v-calendar-weekly__day-month {
          left: 0;
          text-align: center;
          color: #fff;
          top: -4px;
          line-height: 30px;
          font-weight: bold;
          text-shadow: 0 0 1px #000;
          font-size: 18px;
          width: 100%;
        }

        .v-calendar-weekly__day-label {
          width: 100%;
          height: 100%;
          color: white;
          font-size: 30px;
          text-align: center;
          font-weight: bold;
          line-height: 70px;
          text-shadow: 0 0 1px black;

          &:hover {
            text-decoration: none;
          }
        }

        &.v-present .v-calendar-weekly__day-label {
          border: none;
        }
      }
    }
    .bar-chart {
      height: 100%;

      .bar {
        float: left;
        height: 100%;
        cursor: pointer;
      }
    }
  }
</style>
