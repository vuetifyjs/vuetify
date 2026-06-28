<template>
  <v-textarea v-model="message" label="Message">
    <template v-slot:placeholder>
      <v-fade-transition mode="out-in">
        <span :key="hint">{{ hint }}</span>
      </v-fade-transition>
    </template>
  </v-textarea>
</template>

<script setup>
  import { ref } from 'vue'

  const message = ref('')

  const hints = [
    'Type something here...',
    'Share your thoughts...',
    'What\'s on your mind?',
  ]

  let idx = 0
  const hint = ref(hints[0])

  setInterval(() => {
    if (!message.value) {
      idx = (idx + 1) % hints.length
      hint.value = hints[idx]
    }
  }, 2000)
</script>
