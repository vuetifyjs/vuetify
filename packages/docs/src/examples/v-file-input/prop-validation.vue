<template>
  <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    label="Photos"
    placeholder="Upload your photos"
    prepend-icon="mdi-camera"
    multiple
  ></v-file-input>
</template>

<script setup>
  const maxSize = 5000000 // 5 MB
  const errorMessage = 'Total image size should be less than 5 MB!'

  const rules = [
    value => {
      // Multiple files
      if (value && Array.isArray(value)) {
        const totalSize = value.reduce((acc, current) => acc + current.size, 0)
        return totalSize < maxSize || errorMessage
      }

      // Single file (if multiple is undefined or set to false)
      return !value || value.size < maxSize || errorMessage
    },
  ]
</script>
