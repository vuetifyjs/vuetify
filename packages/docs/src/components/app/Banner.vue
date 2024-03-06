<template>
  <v-app-bar
    v-if="banner"
    id="app-banner-bar"
    :color="banner.metadata.color"
    :height="height"
    :image="banner.metadata.images.bg?.url"
    :model-value="hasPromotion"
    :theme="banner.metadata.theme.key"
    flat
  >
    <v-list-item
      v-bind="link"
      :active="false"
      class="flex-grow-1"
      lines="two"
      @click="onClick"
    >
      <template v-if="banner.metadata.images.logo" #prepend>
        <v-avatar :image="banner.metadata.images.logo.url" size="x-large" />
      </template>

      <v-list-item-title
        v-if="banner.metadata.text"
        class="text-subtitle-2 text-md-subtitle-1 font-weight-medium"
      >
        <AppMarkdown :content="banner.metadata.text" />
      </v-list-item-title>

      <v-list-item-subtitle v-if="banner.metadata.subtext">
        {{ banner.metadata.subtext }}
      </v-list-item-subtitle>

      <template #append>
        <v-hover v-if="mdAndUp && banner.metadata.link && banner.metadata.link_text">
          <template #default="{ isHovering, props: activatorProps }">
            <v-btn
              v-bind="{
                ...activatorProps,
                ...link
              }"
              :color="banner.metadata.link_color"
              :elevation="isHovering ? 8 : 0"
              append-icon="mdi-open-in-new"
              class="text-none me-2"
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
          icon="$clear"
          size="small"
          variant="plain"
          @click="onClose"
        />
      </template>
    </v-list-item>
  </v-app-bar>
</template>

<script setup lang="ts">
  const { event } = useGtag()
  const { mdAndUp } = useDisplay()
  const { name } = useRoute()
  const user = useUserStore()
  const banners = useBannersStore()

  const banner = computed(() => banners.banner)
  const height = computed(() => banner.value?.metadata.height || (banner.value?.metadata.subtext ? 88 : 48))
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

    onClose()
  }

  function onClose () {
    if (!banner.value) return

    user.notifications.last.banner.push(banner.value.slug)
  }

  onBeforeMount(banners.fetch)

  const link = computed(() => {
    const metadata = banner.value?.metadata ?? { link: '' }

    return {
      href: metadata.link.startsWith('http') ? metadata.link : undefined,
      target: metadata.link.startsWith('http') ? '_blank' : undefined,
      to: !metadata.link.startsWith('http') ? metadata.link : undefined,
      ...banner.value?.metadata.attributes,
    }
  })
</script>

<style lang="sass">
  #app-banner-bar
    a
      color: inherit

    p
      margin-bottom: 0
</style>
