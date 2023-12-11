<template>
  <v-list-item
    title="Subscription Status"
    :subtitle="order?.state ?? 'Inactive'"
    flat
    slim
    lines="two"
    border
    prepend-icon="$vuetify"
  >
    <template #append>
      <v-btn
        :href="manageUrl"
        color="primary"
        text="Manage"
        target="_blank"
        size="small"
        width="90"
        class="text-none"
        variant="outlined"
      />

    </template>
  </v-list-item>
</template>

<script setup>
  // Utilities
  import { computed, onBeforeMount, ref } from 'vue'

  // Store
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()

  const order = ref(null)

  const manageUrl = computed(() => {
    return order.value?.subscription_management_url
  })

  onBeforeMount(async () => {
    await auth.verify()

    if (!auth.isOneSubscriber) return

    const orderId = auth.subscription.tierName

    order.value = await auth.manage(orderId)
  })
</script>
