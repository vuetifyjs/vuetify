<template>
  <v-calendar-daily
    start="2018-08-12"
    end="2018-08-18"
    :interval-style="styleInterval"
    @view-day="viewDay"
    @click:time="clickTime"
    @click:day="clickDay">

    <template slot="dayHeader" slot-scope="day">
      <div class="dayHeader"
        v-if="day.weekday % 2"
        @click.stop="clickEvent">
        dayHeader slot {{ day.date }}
      </div>
    </template>
    
    <template slot="dayBody" slot-scope="day">
      <div class="dayBody"
        v-if="day.weekday % 3 === 2"
        @click.stop="clickEvent">
        dayBody slot {{ day.date }}
      </div>
    </template>

  </v-calendar-daily>
</template>

<script>
  export default {
    data: () => ({
    }),
    methods: {
      viewDay (day) {
        alert('View day: ' + day.date)
      },
      clickTime (day) {
        alert('Click at ' + day.date + ' ' + day.time)
      },
      clickDay (day) {
        alert('Click on day ' + day.date)
      },
      clickEvent () {
        alert('Clicked on event')
      },
      styleInterval (interval) {
        var dark = interval.weekday === 0
          || interval.weekday === 6
          || interval.hour < 9
          || interval.hour > 17
        var startOfHour = interval.minute === 0
        return {
          backgroundColor: dark ? '#eeeeee' : undefined,
          borderBottom: startOfHour ? undefined : '1px dashed #757575'
        }
      }
    }
  }
</script>

<style>
.dayHeader {
  margin: 0px 2px 2px 2px;
  padding: 2px 6px;
  background-color: #1976D2;
  color: white;
}

.dayBody {
  position: absolute;
  top: 400px;
  height: 36px;
  margin: 2px;
  padding: 2px 6px;
  background-color: #1976D2;
  color: white;
  left: 0;
  right: 0;
}
</style>
