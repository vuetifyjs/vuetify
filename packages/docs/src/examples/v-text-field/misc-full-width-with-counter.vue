<template>
  <v-form>
    <v-autocomplete
      v-model="selected"
      :items="['Trevor Handsen', 'Alex Nelson']"
      chips
      hide-details
      hide-no-data
      hide-selected
      label="To"
      multiple
      single-line
    ></v-autocomplete>

    <v-divider></v-divider>

    <v-text-field
      v-model="subject"
      hide-details
      label="Subject"
      single-line
    ></v-text-field>

    <v-divider></v-divider>

    <v-textarea
      v-model="title"
      counter
      label="Message"
      maxlength="120"
      single-line
    ></v-textarea>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      items: ['Trevor Handsen', 'Alex Nelson'],
      selected: ['Trevor Handsen'],
      subject: 'Plans for the weekend',
      title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa',
    }),
  }
</script>
