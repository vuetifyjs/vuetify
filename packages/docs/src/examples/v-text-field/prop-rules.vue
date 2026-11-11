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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14348-5618"
  }
</example-meta>
