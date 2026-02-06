<template>
  <v-app theme="dark">
    <v-container>
      <v-snackbar-queue
        v-model="messages"
        location="top center"
        timeout="2000"
        total-visible="5"
        timer
      />
    </v-container>
  </v-app>
</template>
<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  let counter = 0
  let _interval = -1
  const messages = ref([])

  onMounted(() => {
    _interval = window.setInterval(() => {
      messages.value.push(`You have ${counter++} messages in the Inbox.`)
    }, 400)
  })

  onBeforeUnmount(() => {
    counter = 0
    messages.value = []
    clearInterval(_interval)
  })
</script>
