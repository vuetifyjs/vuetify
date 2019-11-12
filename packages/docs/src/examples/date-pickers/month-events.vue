<template>
  <v-row justify="space-between">
    <v-col cols="12" sm="6" class="my-4">
      <div class="subheading">Defined by array</div>
      <v-date-picker
        v-model="date1"
        :events="arrayEvents"
        event-color="green lighten-1"
        type="month"
      ></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="my-4">
      <div class="subheading">Defined by function</div>
      <v-date-picker
        v-model="date2"
        :events="functionEvents"
        type="month"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      arrayEvents: null,
      date1: new Date().toISOString().substr(0, 7),
      date2: new Date().toISOString().substr(0, 7),
    }),

    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const month = Math.floor(Math.random() * 12)
        const d = new Date()
        d.setMonth(month)
        return d.toISOString().substr(0, 7)
      })
    },

    methods: {
      functionEvents (date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) return true
        if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        return false
      },
    },
  }
</script>
