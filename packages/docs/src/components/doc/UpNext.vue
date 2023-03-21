<template>
  <div
    id="up-next"
    class="d-flex"
  >
    <router-link
      v-if="(prev && prev.name !== 'home')"
      :to="prev.path"
      class="text-decoration-none text-body-1 d-inline-flex align-center"
    >
      <v-icon
        :icon="arrows.prev"
        class="me-1"
        color="primary"
      />

      <span
        class="text-primary"
        v-text="prev.meta.nav ?? prev.meta.title"
      />
    </router-link>

    <v-spacer />

    <router-link
      v-if="next"
      :to="next.path"
      class="text-decoration-none text-body-1 d-inline-flex align-center"
    >
      <span
        class="text-primary"
        v-text="next.meta.nav ?? next.meta.title"
      />

      <v-icon
        :icon="arrows.next"
        class="ms-1"
        color="primary"
      />
    </router-link>
  </div>
</template>

<script setup>
  // Composables
  import { useRoute, useRouter } from 'vue-router'
  import { useRtl } from 'vuetify'
  import { useAppStore } from '@/store/app'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const { pages } = useAppStore()
  const route = useRoute()
  const path = computed(() => route.path.split('/').slice(2, -1))
  const routes = computed(() => useRouter().getRoutes())
  const currentIndex = computed(() => pages.indexOf(path.value.join('/')))
  const prev = computed(() => {
    if (currentIndex.value === -1) return false

    const prevPath = rpath(pages[currentIndex.value - 1])

    if (prevPath == null) return false

    return routes.value.find(r => r.path === prevPath)
  })
  const next = computed(() => {
    if (currentIndex.value === -1) return false

    const nextPath = rpath(pages[currentIndex.value + 1])

    return routes.value.find(r => r.path === nextPath)
  })

  const { isRtl } = useRtl()
  const arrows = computed(() => ({
    next: !isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right',
    prev: !isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left',
  }))
</script>
