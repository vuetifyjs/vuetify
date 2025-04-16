<template>
  <v-row>
    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
      <v-date-picker
        v-model="date"
        @contextmenu:year="contextMenu"
        @dblclick:date="dblClick"
        @mouseenter:month="mouseEnter"
        @mouseleave:month="mouseLeave"
      ></v-date-picker>
    </v-col>

    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
      <div class="text-body-1 mb-2">
        <v-icon size="small">
          {{ done[0] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Double click on any date
      </div>

      <div class="text-body-1">
        <v-icon size="small">
          {{ done[1] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Move mouse cursor over any month button
      </div>

      <div class="text-h6 mb-2">
        Mouse pointer is located on: {{ mouseMonth || '-' }}
      </div>

      <div class="text-body-1">
        <v-icon size="small">
          {{ done[2] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Right click on any year
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
  const done = ref([false, false, false])
  const mouseMonth = ref(null)

  function contextMenu (year, event) {
    done.value[2] = true
    event.preventDefault()
    alert(`You have activated context menu for year ${year}`)
  }
  function dblClick (date) {
    done.value[0] = true
    alert(`You have just double clicked the following date: ${date}`)
  }
  function mouseEnter (month) {
    done.value[1] = true
    mouseMonth.value = month
  }
  function mouseLeave () {
    mouseMonth.value = null
  }
</script>

<script>
  export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      done: [false, false, false],
      mouseMonth: null,
    }),

    methods: {
      contextMenu (year, event) {
        this.done[2] = true

        event.preventDefault()

        alert(`You have activated context menu for year ${year}`)
      },
      dblClick (date) {
        this.done[0] = true

        alert(`You have just double clicked the following date: ${date}`)
      },
      mouseEnter (month) {
        this.done[1] = true
        this.mouseMonth = month
      },
      mouseLeave () {
        this.mouseMonth = null
      },
    },
  }
</script>
