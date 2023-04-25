<template>
  <v-system-bar
    v-if="showBanner"
    color="#e7f0f6"
    theme="light"
    height="52"
  >
    <div class="text-blue-darken-3 text-start ms-4">
      <div class="text-caption">
        You are viewing the documentation for <strong>Vuetify 3</strong>
      </div>
    </div>

    <v-spacer />

    <v-btn
      class="text-capitalize"
      color="primary"
      height="32"
      href="https://v2.vuetifyjs.com/"
      target="_blank"
      variant="flat"
    >
      Go to Vuetify 2
    </v-btn>

    <v-btn
      class="ms-4 ms-md-6 me-2"
      density="comfortable"
      size="small"
      icon="$clear"
      variant="plain"
      @click="onClose"
    />
  </v-system-bar>
</template>

<script setup>
  import { useUserStore } from '@/store/user'
  import { computed } from 'vue'

  const user = useUserStore()

  const showBanner = computed(() => !user.notifications.last.v2banner)

  function onClose () {
    user.notifications.last.v2banner = Date.now()
  }
</script>
