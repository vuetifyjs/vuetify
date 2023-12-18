<template>
  <v-app-bar
    v-if="banner"
    id="app-banner-bar"
    :color="banner.metadata.color"
    :height="height"
    :image="banner.metadata.images.bg?.url"
    :theme="banner.metadata.theme.key"
    :model-value="hasPromotion"
    flat
  >
    <a
      :href="banner.metadata.link"
      class="d-flex align-center flex-grow-1 text-decoration-none"
      rel="noopener"
      target="_blank"
      v-bind="banner.metadata.attributes"
      @click="onClick"
    >
      <v-list-item lines="two">
        <template v-if="banner.metadata.images.logo" #prepend>
          <v-avatar :image="banner.metadata.images.logo.url" size="x-large" />
        </template>

        <v-list-item-title
          v-if="banner.metadata.text"
          class="text-subtitle-2 text-md-subtitle-1 font-weight-medium"
        >
          <app-markdown :content="banner.metadata.text" />
        </v-list-item-title>

        <v-list-item-subtitle v-if="banner.metadata.subtext">
          {{ banner.metadata.subtext }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-spacer />
    </a>

    <template #append>
      <v-hover v-if="mdAndUp && banner.metadata.link">
        <template #default="{ isHovering, props }">
          <v-btn
            :color="banner.metadata.link_color"
            :href="banner.metadata.link"
            :elevation="isHovering ? 8 : 0"
            v-bind="{ ...props, ...banner.metadata.attributes }"
            append-icon="mdi-open-in-new"
            class="text-none me-2"
            rel="noopener"
            target="_blank"
            variant="elevated"
            @click="onClick"
          >
            {{ banner.metadata.link_text }}
          </v-btn>

        </template>
      </v-hover>

      <v-btn
        v-if="banner.metadata.closable"
        class="ms-6 me-2"
        density="comfortable"
        size="small"
        icon="$clear"
        variant="plain"
        @click="onClose"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  // Composables
  import { useBannersStore } from '@/store/banners'
  import { useDisplay } from 'vuetify'
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@vuetify/one'

  // Utilities
  import { computed, onBeforeMount } from 'vue'

  const { event } = useGtag()
  const { mdAndUp } = useDisplay()
  const { name } = useRoute()
  const user = useUserStore()
  const banners = useBannersStore()

  const banner = computed(() => banners.banner)
  const height = computed(() => banner.value?.metadata.subtext ? 88 : 48)
  const hasPromotion = computed(() => {
    return !banner.value || !user.notifications.last.banner.includes(banner.value.slug)
  })

  function onClick () {
    if (!banner.value) return

    event('click', {
      event_category: 'vuetify-banner',
      event_label: banner.value.slug,
      value: name?.toString().toLowerCase(),
    })
  }

  function onClose () {
    if (!banner.value) return

    user.notifications.last.banner.push(banner.value.slug)
  }

  onBeforeMount(banners.fetch)
</script>

<style lang="sass">
  #app-banner-bar
    a
      color: inherit

    p
      margin-bottom: 0
</style>
