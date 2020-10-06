<template>
  <v-container id="dropdown-example-3">
    <v-overflow-btn
      class="my-2"
      :items="dropdown_edit"
      label="Overflow Btn w/ counter"
      counter
      item-value="text"
    ></v-overflow-btn>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dropdown_edit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
    }),
  }
</script>
