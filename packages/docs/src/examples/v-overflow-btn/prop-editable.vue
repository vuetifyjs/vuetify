<template>
  <v-container id="dropdown-example-3">
    <v-overflow-btn
      class="my-2"
      :items="dropdownEdit"
      label="Overflow Btn w/ editable"
      editable
      item-value="text"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  const dropdownEdit = [
    { text: '100%' },
    { text: '75%' },
    { text: '50%' },
    { text: '25%' },
    { text: '0%' },
  ]
</script>

<script>
  export default {
    data: () => ({
      dropdownEdit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
    }),
  }
</script>
