<template>
  <div>
    <v-text-field
      :rules="rules"
      hide-details="auto"
      label="Main input"
    ></v-text-field>
    <v-text-field label="Another input"></v-text-field>
  </div>
</template>

<script setup>
  const rules = [
    value => !!value || 'Required.',
    value => (value && value.length >= 3) || 'Min 3 characters',
  ]
</script>

<script>
  export default {
    data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    }),
  }
</script>
