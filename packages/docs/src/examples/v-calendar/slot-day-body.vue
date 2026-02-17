<template>
  <v-row>
    <v-col>
      <v-sheet height="500">
        <v-calendar
          ref="calendar"
          v-model="value"
          type="week"
        >
          <template v-slot:day-body="{ date, week }">
            <div
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY() }"
              class="v-current-time"
            ></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'

  const calendar = ref()

  const value = ref('')

  function nowY () {
    return calendar.value ? calendar.value.timeToY(calendar.value.times.now) + 'px' : '-10px'
  }

  let updateInterval = -1
  onMounted(() => {
    scrollToTime()
    updateInterval = setInterval(() => calendar.value?.updateTimes(), 60_000)
  })

  onUnmounted(() => {
    clearInterval(updateInterval)
  })

  function getCurrentTime () {
    return calendar.value ? calendar.value.times.now.hour * 60 + calendar.value.times.now.minute : 0
  }
  function scrollToTime () {
    const time = getCurrentTime()
    const first = Math.max(0, time - (time % 30) - 30)
    calendar.value?.scrollToTime(first)
  }
</script>

<script>
  export default {
    data: () => ({
      value: '',
      ready: false,
    }),
    computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
    },
    mounted () {
      this.ready = true
      this.scrollToTime()
      this.updateTime()
    },
    methods: {
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
      getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)

        this.cal.scrollToTime(first)
      },
      updateTime () {
        setInterval(() => this.cal.updateTimes(), 60 * 1000)
      },
    },
  }
</script>

<style>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
</style>
