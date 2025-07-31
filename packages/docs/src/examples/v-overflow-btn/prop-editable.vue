<template>
  <v-container id="dropdown-example-3">
    <v-overflow-btn
      :items="dropdownEdit"
      class="my-2"
      item-value="text"
      label="Overflow Btn w/ editable"
      editable
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
