<template>
  <v-system-bar
    v-if="showBanner"
    color="#e7f0f6"
    height="52"
  >
    <div class="text-blue-darken-3 text-start ms-4">
      <div class="text-caption">
        You are currently viewing the documentation for <strong>Vuetify 3</strong>
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
      class="ms-6 me-6"
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
  import { differenceInHours } from 'date-fns'

  const user = useUserStore()

  const showBanner = computed(() => {
    const now = Date.now()

    return differenceInHours(now, Number(user.notifications.last.v2banner)) > 1
  })

  function onClose () {
    user.notifications.last.v2banner = Date.now()
  }
</script>
