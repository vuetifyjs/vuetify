<template>
  <app-sheet>
    <v-data-table
      :headers="headers"
      :items="identities"
      hide-footer
    >
      <template #item.provider="item">
        <div class="d-flex align-center">
          <v-icon :icon="`mdi-${item.value}`" color="medium-emphasis" class="me-1" />

          {{ t(item.value) }}
        </div>
      </template>

      <template #item.status="{ item }">
        <v-btn
          :color="!item.status ? 'success' : 'error'"
          class="text-none text-caption"
          size="small"
          variant="outlined"
          width="90"
          @click="onClick(item)"
        >
          {{ item.status ? t('Disconnect') : t('Connect') }}
        </v-btn>
      </template>

      <template #bottom />
    </v-data-table>

  </app-sheet>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useAuthStore } from '@/store/auth'
  import { useI18n } from 'vue-i18n'

  const auth = useAuthStore()
  const { t } = useI18n()
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
