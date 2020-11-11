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
      <div class="body-1 mb-2">
        <v-icon small>
          {{ done[0] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Double click on any date
      </div>

      <div class="body-1">
        <v-icon small>
          {{ done[1] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Move mouse cursor over any month button
      </div>

      <div class="title mb-2">
        Mouse pointer is located on: {{ mouseMonth || '-' }}
      </div>

      <div class="body-1">
        <v-icon small>
          {{ done[2] ? '$checkboxOn' : '$checkboxOff' }}
        </v-icon>
        Right click on any year
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      done: [false, false, false],
      mouseMonth: null,
    }),

    methods: {
      contextMenu (year, event) {
        this.$set(this.done, 2, true)

        event.preventDefault()

        alert(`You have activated context menu for year ${year}`)
      },
      dblClick (date) {
        this.$set(this.done, 0, true)

        alert(`You have just double clicked the following date: ${date}`)
      },
      mouseEnter (month) {
        this.$set(this.done, 1, true)
        this.mouseMonth = month
      },
      mouseLeave () {
        this.mouseMonth = null
      },
    },
  }
</script>
