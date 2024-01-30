<template>
  <v-list-item
    :disabled="!auth.user"
    :subtitle="one.isSubscriber ? 'Active' : 'Inactive'"
    border
    lines="two"
    prepend-icon="$vuetify"
    rounded
    title="Subscription Status"
  >
    <template #prepend>
      <div class="pe-2">
        <v-icon :color="one.isSubscriber ? 'primary' : undefined" />
      </div>
    </template>

    <template #append>
      <v-btn
        :loading="one.isLoading"
        :text="hasBilling ? 'Manage' : 'Subscribe'"
        border
        class="text-none"
        color="primary"
        size="small"
        slim
        variant="outlined"
        width="80"
        @click="onClick"
      >
        <template #loader>
          <v-progress-circular
            indeterminate
            size="16"
            width="1"
          />
        </template>
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup>
  // Utilities
  import { computed } from 'vue'

  // Store
  import { useAuthStore, useHttpStore, useOneStore } from '@vuetify/one'

  const auth = useAuthStore()
  const http = useHttpStore()
  const one = useOneStore()

  const hasBilling = computed(() => !!one.subscription?.tierName)

  function onClick () {
    if (!hasBilling.value) return one.subscribe()

    one.isLoading = true
    window.location.href = http.url + '/one/manage'
  }
</script>
