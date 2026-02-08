<template>
  <v-layout height="300">
    <v-container class="d-flex flex-wrap gc-3 justify-center align-self-start">
      <v-btn color="primary" height="50" prepend-icon="$arrowleft" spaced="start" @click="addMessage1">
        <span class="text-right">
          <div class="mb-1">Add Message</div>
          <small class="opacity-80">default (hold)</small>
        </span>
      </v-btn>
      <v-btn append-icon="$arrowright" color="primary" height="50" spaced="end" @click="addMessage2">
        <span class="text-left">
          <div class="mb-1">Add Message</div>
          <small class="opacity-80">overflow</small>
        </span>
      </v-btn>
      <v-divider class="mt-4"></v-divider>
      <v-switch v-model="collapsed" color="primary" density="comfortable" label="Collapsed" hide-details></v-switch>
      <v-divider class="mb-4"></v-divider>
      <v-btn text="Clear all" @click="clearAll"></v-btn>
    </v-container>

    <v-snackbar-queue
      ref="queue1"
      v-model="messages1"
      :collapsed="collapsed"
      :total-visible="3"
      location="bottom start"
      closable
      contained
    >
      <template v-slot:actions="{ props }">
        <v-icon-btn
          aria-label="Close"
          icon="$close"
          size="small"
          variant="text"
          v-bind="props"
        ></v-icon-btn>
      </template>
    </v-snackbar-queue>

    <v-snackbar-queue
      ref="queue2"
      v-model="messages2"
      :collapsed="collapsed"
      :total-visible="3"
      display-strategy="overflow"
      location="bottom end"
      closable
      contained
    >
      <template v-slot:actions="{ props }">
        <v-icon-btn
          aria-label="Close"
          icon="$close"
          size="small"
          variant="text"
          v-bind="props"
        ></v-icon-btn>
      </template>
    </v-snackbar-queue>
  </v-layout>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const queue1 = ref()
  const queue2 = ref()
  const messages1 = ref([])
  const messages2 = ref([])
  const collapsed = shallowRef(false)

  let count = 0
  let typeIndex = 1

  function addMessage1 () {
    messages1.value.push({
      text: `Message #${++count}`,
      colors: typeIndex++ % 3 === 1 ? 'success'
        : typeIndex++ % 3 === 2 ? 'error'
          : 'info',
      zIndex: count,
    })
  }

  function addMessage2 () {
    messages2.value.push({
      text: `Message #${++count}`,
      colors: typeIndex++ % 3 === 1 ? 'success'
        : typeIndex++ % 3 === 2 ? 'error'
          : 'info',
      zIndex: count,
    })
  }

  function clearAll () {
    queue1.value.clear()
    queue2.value.clear()
  }
</script>
