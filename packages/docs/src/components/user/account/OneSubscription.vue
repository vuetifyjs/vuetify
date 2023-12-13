<template>
  <v-list-item
    :disabled="!auth.user"
    border
    lines="two"
    prepend-icon="$vuetify"
    rounded
  >
    <template #prepend>
      <div class="pe-2">
        <v-icon :color="one.isSubscriber ? 'primary' : undefined" />
      </div>
    </template>

    <template #title>
      Subscription Status
    </template>

    <template #subtitle>
      {{ one.isSubscriber ? 'Active' : 'Inactive' }}
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
  import { useAuthStore } from '@/store/auth'
  import { useOneStore } from '@/store/one'

  const auth = useAuthStore()
  const one = useOneStore()

  function onClick () {
    one.isSubscriber ? one.cancel() : one.subscribe()
  }
</script>
