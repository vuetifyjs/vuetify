<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <v-layout row wrap justify-space-around>
        <v-switch v-model="landscape" class="ma-3" label="Landscape"></v-switch>
        <v-switch v-model="reactive" class="ma-3" label="Reactive"></v-switch>
        <v-switch v-model="fullWidth" class="ma-3" label="Full width"></v-switch>
        <v-switch v-model="showCurrent" class="ma-3" label="Show current date"></v-switch>
        <v-switch v-model="month" class="ma-3" label="Month picker"></v-switch>
        <v-switch v-model="multiple" class="ma-3" label="Multiple"></v-switch>
        <v-switch v-model="readonly" class="ma-3" label="Readonly"></v-switch>
        <v-switch v-model="disabled" class="ma-3" label="Disabled"></v-switch>
        <v-switch v-model="enableEvents" class="ma-3" label="Events"></v-switch>
      </v-layout>
    </v-flex>

    <v-date-picker
      v-model="picker"
      :landscape="landscape"
      :reactive="reactive"
      :full-width="fullWidth"
      :showCurrent="showCurrent"
      :type="month ? 'month' : 'date'"
      :multiple="multiple"
      :readonly="readonly"
      :disabled="disabled"
      :events="enableEvents ? functionEvents : null"
    ></v-date-picker>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false,
        fullWidth: false,
        showCurrent: true,
        month: false,
        multiple: false,
        readonly: false,
        disabled: false,
        enableEvents: false,
      }
    },

    computed: {
      functionEvents () {
        return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
      },
    },

    methods: {
      dateFunctionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      monthFunctionEvents (date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) return true
        if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        return false
      },
    },
  }
</script>
