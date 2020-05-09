<template>
  <v-row justify="space-around">
    <v-col cols="12">
      <v-row justify="space-around">
        <v-switch v-model="landscape" class="ma-4" label="Landscape"></v-switch>
        <v-switch v-model="reactive" class="ma-4" label="Reactive"></v-switch>
        <v-switch v-model="flat" class="ma-4" label="Flat"></v-switch>
        <v-switch v-model="fullWidth" class="ma-4" label="Full width"></v-switch>
        <v-switch v-model="showCurrent" class="ma-4" label="Show current date"></v-switch>
        <v-switch v-model="month" class="ma-4" label="Month picker"></v-switch>
        <v-switch v-model="multiple" class="ma-4" label="Multiple"></v-switch>
        <v-switch v-model="readonly" class="ma-4" label="Readonly"></v-switch>
        <v-switch v-model="disabled" class="ma-4" label="Disabled"></v-switch>
        <v-switch v-model="enableEvents" class="ma-4" label="Events"></v-switch>
      </v-row>
    </v-col>

    <v-date-picker
      v-model="picker"
      :landscape="landscape"
      :reactive="reactive"
      :flat="flat"
      :full-width="fullWidth"
      :show-current="showCurrent"
      :type="month ? 'month' : 'date'"
      :multiple="multiple"
      :readonly="readonly"
      :disabled="disabled"
      :events="enableEvents ? functionEvents : null"
    ></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false,
        fullWidth: false,
        flat: false,
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
