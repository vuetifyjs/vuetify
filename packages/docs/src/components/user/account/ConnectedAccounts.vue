<template>
  <AppSheet>
    <v-data-table
      :headers="headers"
      :items="identities"
      hide-footer
    >
      <template #item.provider="item">
        <div class="d-flex align-center">
          <v-icon :icon="`mdi-${item.value}`" color="medium-emphasis" class="me-1" />

          <span class="text-capitalize">
            {{ item.value }}
          </span>
        </div>
      </template>

      <template #item.status="{ item }">
        <v-btn
          :color="!item.status ? 'success' : 'error'"
          class="text-none text-caption"
          size="small"
          variant="outlined"
          width="100"
          @click="onClick(item)"
        >
          {{ item.status ? 'Disconnect' : 'Connect' }}
        </v-btn>
      </template>

      <template #bottom />
    </v-data-table>

  </AppSheet>
</template>

<script setup>
  const auth = useAuthStore()
  const headers = ref([
    { title: 'Provider', key: 'provider' },
    { title: 'Status', key: 'status', align: 'end' },
  ])
  const identities = computed(() => {
    return ['github', 'discord'].map(identity => {
      const found = auth.user?.identities.find(i => i.provider === identity)

      return {
        provider: identity,
        status: !!found,
      }
    })
  })

  function onClick (item) {
    const url = import.meta.env.VITE_API_SERVER_URL

    if (item.status) {
      fetch(`${url}/auth/${item.provider}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } else {
      //
    }
  }
</script>
