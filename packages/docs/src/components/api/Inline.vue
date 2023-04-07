<template>
  <div v-if="components">
    <api-links v-if="!showInline && !hideLinks" :components="components" />

    <div v-if="showInline">
      <div class="d-flex justify-space-between align-center">
        <v-autocomplete
          v-model="name"
          :items="components"
          :readonly="components.length === 1"
          class="mb-2"
          color="primary"
          hide-details
          label="Component API"
          prepend-inner-icon="mdi-view-dashboard"
          style="max-width: 250px;"
          variant="outlined"
        />
      </div>

      <template v-for="section of sections" :key="section">
        <api-section
          :name="name"
          :section="section"
          show-headline
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, onBeforeMount, ref } from 'vue'

  // Data
  import pageToApi from '@/data/page-to-api.json'

  const props = defineProps({
    components: String,
    hideLinks: Boolean,
  })

  const route = useRoute()
  const { locale } = useI18n()
  const store = useUserStore()
  const name = ref()
  const sections = ['props', 'slots', 'events', 'functions']

  const components = computed(() => {
    if (props.components) return props.components.split(/, ?/)

    const path = route.path.replace(`/${locale.value}/`, '').replace(/\/$/, '')
    return pageToApi[path as keyof typeof pageToApi]
  })

  const showInline = computed(() => store.api === 'inline')

  onBeforeMount(() => {
    name.value = components.value?.[0] ?? ''
  })
</script>
