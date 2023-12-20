<template>
  <v-card
    v-if="one.isSubscriber"
    class="pa-4 text-white font-weight-bold d-flex align-start flex-column mt-2"
    flat
    image="https://cdn.vuetifyjs.com/docs/images/one/banners/one-sub-banner.png"
    width="250"
  >
    <div>
      Vuetify One

      <span class="font-weight-light">Subscriber</span>
    </div>

    <div class="text-caption font-weight-regular text-grey-lighten-2 mb-2">
      Since {{ memberSince }}
    </div>

    <border-chip
      :to="rpath('/user/subscriptions/')"
      text="Manage Subscription"
      theme="dark"
    />
  </v-card>
</template>

<script setup>
  // Composables
  import { useDate } from 'vuetify'

  // Stores
  import { useOneStore } from '@vuetify/one'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const adapter = useDate()
  const one = useOneStore()

  const memberSince = computed(() => {
    if (!one.subscription) return ''

    const createdAt = one.subscription.createdAt

    if (!adapter.isValid(createdAt)) return ''

    return adapter.format(adapter.date(createdAt), 'monthAndYear')
  })
</script>
