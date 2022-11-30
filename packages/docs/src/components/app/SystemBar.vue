<template>
  <v-system-bar
    v-if="hasPromotion"
    class="px-0 text-start"
    theme="dark"
    height="50"
  >
    <a
      :href="banner.metadata.link"
      class="d-flex flex-grow-1 text-decoration-none"
      rel="noopener"
      target="_blank"
      v-bind="banner.metadata.attributes"
      @click="onClick"
    >
      <v-img
        :src="banner.metadata.images.bg.url"
        cover
        height="50"
      >
        <div class="d-flex align-center pe-2 text-white text-h6">
          <v-avatar
            class="ms-2 me-6"
            image="https://cdn.cosmicjs.com/ad4fd330-d740-11ea-8d04-338192d0d6f9-discord.svg"
            size="large"
          />

          <app-markdown
            :content="banner.metadata.text"
            class="flex-grow-1 mb-n4 font-weight-light"
          />

          <v-btn :color="banner.metadata.link_color">
            {{ banner.metadata.link_text }}
          </v-btn>

          <v-btn
            class="ms-6 me-2"
            density="comfortable"
            size="small"
            icon="$clear"
            variant="plain"
            @click="onClose"
          />
        </div>
      </v-img>
    </a>
  </v-system-bar>
</template>

<script setup lang="ts">
  // Composables
  import { useCosmic } from '@/composables/cosmic'
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, onBeforeMount, ref } from 'vue'
  import { differenceInHours } from 'date-fns'

  // Types
  interface Banner {
    slug: string
    title: string
    metadata: {
      label: string
      text: string
      link: string
      link_text: string
      link_color: string
      attributes: Record<string, any>
      images: {
        bg: {
          url: string
        }
        logo: {
          url: string
        }
      }
    }
  }

  const { notifications } = useUserStore()
  const { event } = useGtag()
  const { name } = useRoute()
  const banners = ref<Banner[]>([])

  const banner = computed(() => banners.value[0])
  const hasPromotion = computed(() => {
    const now = Date.now()

    return differenceInHours(now, Number(notifications.last.banner)) > 1 && banner.value
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

  onBeforeMount(async () => {
    if (banners.value.length) return

    const { bucket } = useCosmic<Banner>()

    const today = (new Date()).toISOString().substring(0, 10)
    const { objects = [] } = (
      await bucket?.objects
        .find({
          type: 'banners',
          'metadata.start_date': {
            $lte: today,
          },
          'metadata.end_date': {
            $gte: today,
          },
        })
        .props('metadata,slug,title')
        .sort('metadata.start_date')
        .status('published')
        .limit(1)
    ) || {}

    banners.value = objects
  })
</script>
