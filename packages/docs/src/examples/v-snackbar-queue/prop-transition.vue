<template>
  <v-layout height="250">
    <v-container class="d-flex flex-column align-center gr-4 align-self-start">
      <v-icon-btn
        color="primary"
        icon="mdi-refresh"
        @click="replay"
      ></v-icon-btn>
      <v-code class="px-3 pb-0">{{ currentLocation }}</v-code>
    </v-container>

    <v-snackbar-queue
      ref="queue"
      v-model="messages"
      :location="currentLocation"
      timeout="3000"
      total-visible="4"
      transition="bouncy-slide-auto"
      closable
      contained
    >
      <template v-slot:actions="{ item, props }">
        <v-icon-btn
          v-if="!item.vertical"
          aria-label="Close"
          icon="$close"
          size="small"
          variant="text"
          v-bind="props"
        ></v-icon-btn>
        <v-btn
          v-else
          text="Close"
          variant="text"
          v-bind="props"
        ></v-btn>
      </template>
    </v-snackbar-queue>
  </v-layout>
</template>

<script setup>
  import { ref, shallowRef, toRef, useTemplateRef } from 'vue'

  const messages = ref([])
  const queue = useTemplateRef('queue')

  const locationIndex = shallowRef(0)
  const locations = [
    'top start',
    'top end',
    'bottom start',
    'bottom end',
  ]
  const currentLocation = toRef(() => locations[locationIndex.value % 4])
  let timeouts = []

  async function replay () {
    timeouts.forEach(clearTimeout)
    queue.value?.clear()

    await new Promise(resolve => setTimeout(resolve, 500))

    timeouts = []
    locationIndex.value++

    messages.value = []

    timeouts.push(setTimeout(() => {
      messages.value.push({
        text: 'Inbox check... please wait.',
        color: 'info',
      })
    }, 300))
    timeouts.push(setTimeout(() => {
      messages.value.push({
        text: 'You have 3 new messages in your Inbox.',
        color: 'primary',
      })
    }, 700))
    timeouts.push(setTimeout(() => {
      messages.value.push({
        text: 'Task submitted.',
        color: 'success',
      })
    }, 1200))
    timeouts.push(setTimeout(() => {
      messages.value.push({
        text: 'Your session will expire in 5 minutes.',
        color: 'warning',
      })
    }, 1700))
  }

  replay()
</script>

<style>
.bouncy-slide-x-transition-enter-active,
.bouncy-slide-x-transition-leave-active,
.bouncy-slide-x-transition-move,
.bouncy-slide-x-reverse-transition-enter-active,
.bouncy-slide-x-reverse-transition-leave-active,
.bouncy-slide-x-reverse-transition-move {
  transition: transform, opacity;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bouncy-slide-x-transition-enter-from,
.bouncy-slide-x-transition-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
.bouncy-slide-x-reverse-transition-enter-from,
.bouncy-slide-x-reverse-transition-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
</style>
