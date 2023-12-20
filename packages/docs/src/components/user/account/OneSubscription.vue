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
        :color="one.isSubscriber ? 'error' : 'primary'"
        :loading="one.isLoading"
        :text="one.isSubscriber ? 'Cancel' : 'Subscribe'"
        border
        class="text-none border-error border-opacity-100"
        size="small"
        slim
        width="80"
        :variant="one.isSubscriber ? 'plain' : 'outlined'"
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
  // Store
  import { useAuthStore, useOneStore } from '@vuetify/one'

  const auth = useAuthStore()
  const one = useOneStore()

  function onClick () {
    one.isSubscriber ? one.cancel() : one.subscribe()
  }
</script>
