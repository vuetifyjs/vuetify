<template>
  <border-chip
    :prepend-icon="user.api === 'inline' ? 'mdi-flask-outline' : 'mdi-flask-empty-outline'"
    :text="t('toggle', [`${t('inline')} ${t('api')}`])"
    class="mb-2"
    @click="onClick"
  />

  <div v-if="components" :class="showInline && 'mt-4'">
    <ApiLinks v-if="!showInline && !hideLinks" :components="components" />

    <div v-if="showInline">
      <div class="d-flex justify-space-between align-center">
        <v-autocomplete
          v-model="name"
          :items="components"
          :readonly="components.length === 1"
          class="mb-2"
          color="primary"
          label="Component API"
          prepend-inner-icon="mdi-view-dashboard"
          style="max-width: 250px;"
          variant="outlined"
          hide-details
        />
      </div>

      <template v-for="section of sections" :key="section">
        <ApiSection
          :name="name"
          :section="section"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Data
  import pageToApi from '@/data/page-to-api.json'

  const props = defineProps({
    components: String,
    hideLinks: Boolean,
  })

  const route = useRoute()
  const { t, locale } = useI18n()
  const user = useUserStore()
  const name = shallowRef()
  const sections = ['props', 'slots', 'events', 'exposed'] as const

  const components = computed(() => {
    if (props.components) return props.components.split(/, ?/)

    const path = route.path.replace(`/${locale.value}/`, '').replace(/\/$/, '')
    return pageToApi[path as keyof typeof pageToApi]
  })

  const showInline = computed(() => user.api === 'inline')

  onBeforeMount(() => {
    name.value = components.value?.[0] ?? ''
  })

  function onClick () {
    user.api = user.api === 'inline' ? 'link-only' : 'inline'
  }
</script>
