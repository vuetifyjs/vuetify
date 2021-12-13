<template>
  <div v-if="showInline">
    <div class="d-flex justify-space-between align-center">
      <select v-model="name">
        <template v-for="component of components" :key="component">
          <option :value="component">{{ component }}</option>
        </template>
      </select>
    </div>
    <template v-for="section of sections" :key="section">
      <api-section :name="name" :section="section" show-headline />
    </template>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import pageToApi from '@/data/page-to-api.json'
  import { useUserStore } from '../../store/user'

  const sections = ['props', 'slots', 'events', 'functions']

  export default defineComponent({
    name: 'ApiInline',

    setup () {
      const route = useRoute()
      const { locale } = useI18n()
      const store = useUserStore()
      const name = ref()

      const components = computed(() => {
        return pageToApi[route.path.replace(`/${locale.value}/`, '')] as string[]
      })

      const showInline = computed(() => store.api === 'inline')

      onBeforeMount(() => {
        name.value = components.value[0]
      })

      return {
        name,
        sections,
        components,
        showInline,
      }
    },
  })
</script>
