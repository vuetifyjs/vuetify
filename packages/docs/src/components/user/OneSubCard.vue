<template>
  <v-card
    v-if="one.isSubscriber"
    class="pa-4 text-white font-weight-bold d-flex align-start flex-column mt-2"
    image="https://cdn.vuetifyjs.com/docs/images/one/banners/one-sub-banner.png"
    width="250"
    flat
  >
    <div>
      Vuetify One

      <span class="font-weight-light">Subscriber</span>
    </div>

    <div class="text-caption font-weight-regular text-grey-lighten-2">
      Since {{ memberSince }}
    </div>
  </v-card>
</template>

<script setup>
  const adapter = useDate()
  const one = useOneStore()

  const memberSince = computed(() => {
    if (!one.subscription) return ''

    const createdAt = one.subscription.createdAt

    if (!adapter.isValid(createdAt)) return ''

    return adapter.format(adapter.date(createdAt), 'monthAndYear')
  })
</script>
