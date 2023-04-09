<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      :rules="[rules.required]"
      clearable
      label="Last name"
    ></v-text-field>
  </v-responsive>
</template>

<script>
  export default {
    data: () => ({
      rules: {
        required: value => !!value || 'Field is required',
      },
    }),
  }
</script>
