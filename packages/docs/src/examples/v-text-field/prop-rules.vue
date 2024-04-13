<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      :rules="[rules.required]"
      label="Last name"
      clearable
    ></v-text-field>
  </v-responsive>
</template>

<script setup>
  const rules = {
    required: value => !!value || 'Field is required',
  }
</script>

<script>
  export default {
    data: () => ({
      rules: {
        required: value => !!value || 'Field is required',
      },
    }),
  }
</script>
