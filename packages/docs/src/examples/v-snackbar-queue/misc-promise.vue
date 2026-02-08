<template>
  <v-layout height="200">
    <v-container class="d-flex justify-center ga-3">
      <v-btn color="success" @click="addSuccess">
        Succeeding Task
      </v-btn>

      <v-btn color="error" @click="addError">
        Failing Task
      </v-btn>
    </v-container>

    <v-snackbar-queue
      v-model="messages"
      :total-visible="3"
      contained
    ></v-snackbar-queue>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const messages = ref([])

  function addSuccess () {
    messages.value.push({
      text: 'Saving...',
      promise: new Promise(resolve => setTimeout(() => resolve('Done'), 1500)),
      success: onSuccess,
      error: onError,
    })
  }

  function addError () {
    messages.value.push({
      text: 'Deleting...',
      promise: new Promise((resolve, reject) => setTimeout(() => reject(new Error('500')), 1500)),
      success: onSuccess,
      error: onError,
    })
  }

  function onSuccess () {
    return {
      text: 'Saved successfully!',
      color: 'success',
      prependIcon: '$success',
      timeout: 1500,
    }
  }

  function onError (data) {
    return {
      text: `Failed to save. Error code: ${data.message}`,
      color: 'error',
      prependIcon: '$error',
      timeout: 3000,
      timer: 'bottom',
      reverseTimer: true,
    }
  }
</script>

<script>
  export default {
    data: () => ({
      messages: [],
    }),
    methods: {
      addSuccess () {
        this.messages.push({
          text: 'Saving...',
          promise: new Promise(resolve => setTimeout(() => resolve('Done'), 1500)),
          success: this.onSuccess,
          error: this.onError,
        })
      },
      addError () {
        this.messages.push({
          text: 'Deleting...',
          promise: new Promise((resolve, reject) => setTimeout(() => reject(new Error('500')), 1500)),
          success: this.onSuccess,
          error: this.onError,
        })
      },
      onSuccess () {
        return {
          text: 'Saved successfully!',
          color: 'success',
          prependIcon: '$success',
          timeout: 1500,
        }
      },
      onError (data) {
        return {
          text: `Failed to save. Error code: ${data.message}`,
          color: 'error',
          prependIcon: '$error',
          timeout: 3000,
          timer: 'bottom',
          reverseTimer: true,
        }
      },
    },
  }
</script>
