<template>
  <v-card
    :aria-label="sponsor?.metadata.name"
    :href="sponsor?.metadata.href"
    :ripple="false"
    class="d-inline-flex align-center pa-2"
    color="transparent"
    rel="noopener"
    target="_blank"
    variant="flat"
    rounded
    @click="onClick"
  >
    <v-img
      :alt="sponsor?.metadata.name"
      :src="src"
      :width="imgWidth"
      max-height="64"
    />
  </v-card>
</template>

<script setup>
  const props = defineProps({
    slug: String,
    sponsor: Object,
    compact: Boolean,
    comfortable: Boolean,
    width: [Number, String],
  })

  const { event } = useGtag()
  const { name } = useRoute()
  const theme = useTheme()
  const sponsorStore = useSponsorsStore()
  const sponsor = shallowRef(props.sponsor)

  const src = computed(() => {
    const {
      logodark = { url: '' },
      darkLogo = '',
      logolight = { url: '' },
      lightLogo = '',
    } = sponsor?.value?.metadata ?? {}

    const current = theme.current.value
    return !current.dark ? logolight.url || lightLogo : logodark.url || darkLogo
  })

  const imgWidth = computed(() => {
    if (props.width) return props.width
    if (props.compact) return 112
    if (props.comfortable) return 148

    return 212
  })

  if (props.slug && !props.sponsor) {
    watch(() => sponsorStore.sponsors, val => {
      if (sponsor.value || !val.length) return

      sponsor.value = sponsorStore.bySlug(props.slug)
    }, { immediate: true })
  }

  function onClick () {
    const slug = sponsor.value?.slug ?? props.slug

    if (!slug) return

    event('click', {
      event_category: 'vuetify-sponsor',
      event_label: slug,
      value: name,
    })
  }
</script>
