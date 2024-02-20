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
      <PrimaryBtn
        v-if="!one.isSubscriber"
        :loading="one.isLoading"
        color="success"
        prepend-icon="mdi-check"
        text="Activate"
        @click="one.subscribe"
      >
        <template #loader>
          <v-progress-circular />
        </template>
      </PrimaryBtn>

      <PrimaryBtn
        v-if="hasBilling"
        :loading="billing"
        class="ms-2"
        prepend-icon="mdi-credit-card-outline"
        text="Billing"
        @click="onClickBilling"
      >
        <template #loader>
          <v-progress-circular />
        </template>
      </PrimaryBtn>
    </template>
  </v-list-item>
</template>

<script setup>
  const auth = useAuthStore()
  const http = useHttpStore()
  const one = useOneStore()

  const hasBilling = computed(() => !!one.subscription?.tierName)

  const billing = shallowRef(false)

  function onClickBilling () {
    billing.value = true
    window.location.href = http.url + '/one/manage'
  }
</script>
