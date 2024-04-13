<template>
  <v-snackbar
    v-if="isVisible && current"
    v-model="isActive"
    :color="current.color"
    :timeout="current.timeout"
    timer
    @after-leave="onAfterLeave"
  >
    {{ current.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
  // Types
  import type { Notification } from '@/stores/app'

  const store = useAppStore()
  const isActive = ref(false)
  const isVisible = ref(false)
  const current = shallowRef<Notification>()

  watch(() => store.notifications.length, (val, oldVal) => {
    if (!isVisible.value && val > oldVal) {
      showNext()
    }
  })
  watch(isActive, val => {
    if (val) isVisible.value = true
  })

  function onAfterLeave () {
    if (store.notifications.length) {
      showNext()
    } else {
      current.value = undefined
      isVisible.value = false
    }
  }
  function showNext () {
    current.value = store.notifications[0]
    store.notifications.splice(0, 1)
    nextTick(() => {
      isActive.value = true
    })
  }
</script>
