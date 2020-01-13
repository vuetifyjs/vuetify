<template>
  <v-form>
    <v-autocomplete
      v-model="selected"
      :items="['Trevor Handsen', 'Alex Nelson']"
      chips
      label="To"
      full-width
      hide-details
      hide-no-data
      hide-selected
      multiple
      single-line
    ></v-autocomplete>
    <v-divider></v-divider>
    <v-text-field
      label="Subject"
      value="Plans for the weekend"
      single-line
      full-width
      hide-details
    ></v-text-field>
    <v-divider></v-divider>
    <v-textarea
      v-model="title"
      label="Message"
      counter
      maxlength="120"
      full-width
      single-line
    ></v-textarea>
  </v-form>
</template>

<script>
  export default {
    data () {
      return {
        selected: ['Trevor Handsen'],
        items: ['Trevor Handsen', 'Alex Nelson'],
        title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa',
      }
    },
  }
</script>
