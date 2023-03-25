<template>
  <v-app-bar
    v-if="banner"
    id="app-banner-bar"
    :color="banner.metadata.color"
    :height="height"
    :image="banner.metadata.images.bg.url"
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
      <v-list-item lines="three">
        <template #prepend>
          <v-avatar :image="banner.metadata.images.logo.url" size="x-large" />
        </template>

        <v-list-item-title class="text-subtitle-1 text-md-h6 font-weight-medium mb-1">
          <app-markdown
            v-if="banner.metadata.text"
            :content="banner.metadata.text"
          />
        </v-list-item-title>

        <v-list-item-subtitle
          v-if="banner.metadata.subtext"
          v-text="banner.metadata.subtext"
        />
      </v-list-item>
      <v-spacer />
    </a>

    <template v-if="mdAndUp" #append>
      <v-hover>
        <template #default="{ isHovering, props }">
          <v-btn
            :color="banner.metadata.link_color"
            :href="banner.metadata.link"
            :elevation="isHovering ? 8 : 0"
            v-bind="{ ...props, ...banner.metadata.attributes }"
            append-icon="mdi-open-in-new"
            class="text-none"
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
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, onBeforeMount } from 'vue'
  import { differenceInHours } from 'date-fns'

  const { event } = useGtag()
  const { mdAndUp } = useDisplay()
  const { name } = useRoute()
  const { notifications } = useUserStore()
  const banners = useBannersStore()

  const banner = computed(() => banners.banner)
  const height = computed(() => banner.value?.metadata.subtext ? 80 : 64)
  const hasPromotion = computed(() => {
    if (!banner.value) return false

    const now = Date.now()

    return differenceInHours(now, Number(notifications.last.banner)) > 1
  })

  function onClick () {
    event('click', {
      event_category: 'vuetify-banner',
      event_label: banner.value?.metadata.label,
      value: name?.toString().toLowerCase(),
    })
  }

  function onClose () {
    notifications.last.banner = Date.now()
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
