<template>
  <v-layout min-height="100">
    <v-snackbar
      v-model="loadingSnackbar"
      :timeout="-1"
      text="Uploading file..."
      contained
      loading
    ></v-snackbar>
    <v-snackbar
      v-model="successSnackbar"
      :timeout="2000"
      color="success"
      prepend-icon="$complete"
      text="Uploading successful!"
      contained
    ></v-snackbar>
  </v-layout>
</template>

<script setup>
  import { shallowRef, watch } from 'vue'

  const loadingSnackbar = shallowRef(true)
  const successSnackbar = shallowRef(false)

  watch(loadingSnackbar, val => {
    if (val) {
      setTimeout(() => {
        loadingSnackbar.value = false
        successSnackbar.value = true
      }, 2000)
    } else {
      setTimeout(() => {
        loadingSnackbar.value = true
      }, 3000)
    }
  }, { immediate: true })
</script>
