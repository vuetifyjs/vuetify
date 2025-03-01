<template>
  <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    label="Avatar"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
  ></v-file-input>
</template>

<script setup>
  const rules = [
    value => {
      return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      rules: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
        },
      ],
    }),
  }
</script>
