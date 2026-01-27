<template>
  <v-list-item
    base-color="surface-light"
    border="opacity-50 md"
    lines="two"
    max-width="796"
    prepend-avatar="https://cdn.vuetifyjs.com/docs/images/one/logos/one.png"
    rounded="lg"
    variant="flat"
  >
    <v-list-item-title>
      <span class="text-title-large">Vuetify One Subscriber</span>
    </v-list-item-title>

    <v-list-item-subtitle :opacity="isSubscriber ? .8 : undefined">
      <v-scroll-y-reverse-transition mode="out-in">
        <div
          v-if="isSubscriber"
          key="subscribed"
          class="text-success text-body-small"
        >
          <v-icon icon="mdi-medal" size="1em"></v-icon>
          $2.99 /month
        </div>

        <div
          v-else
          key="not-subscribed"
          class="text-body-small"
        >
          Support Vuetify by becoming a Subscriber
        </div>
      </v-scroll-y-reverse-transition>
    </v-list-item-subtitle>

    <template v-slot:append>
      <v-fade-transition mode="out-in">
        <v-btn
          :key="`subscribe-${isSubscriber}`"
          :border="`thin ${isSubscriber ? 'error' : 'success'}`"
          :color="isSubscriber ? 'error' : 'success'"
          :prepend-icon="isSubscriber ? 'mdi-close' : 'mdi-email'"
          :slim="isSubscriber"
          :text="isSubscriber ? 'Cancel' : 'Subscribe'"
          :variant="isSubscriber ? 'plain' : 'tonal'"
          class="me-2 text-none"
          size="small"
          @click="isSubscriber = !isSubscriber"
        ></v-btn>
      </v-fade-transition>

      <v-fade-transition mode="out-in">
        <v-btn
          :key="`info-${isSubscriber}`"
          :color="isSubscriber ? 'success' : 'primary'"
          :prepend-icon="isSubscriber ? 'mdi-check' : 'mdi-open-in-new'"
          :readonly="isSubscriber"
          :text="isSubscriber ? 'Subscribed' : 'More Info'"
          class="text-none"
          size="small"
          variant="flat"
        ></v-btn>
      </v-fade-transition>
    </template>
  </v-list-item>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const isSubscriber = shallowRef(false)
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1489-93848&t=igC9QPO7ZOgBrTij-4"
  }
</example-meta>
