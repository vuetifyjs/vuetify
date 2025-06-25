<script setup lang="ts">
  import type { PartData } from '@vuetify/api-generator/src/types'
  import DefaultLayout from '@/layouts/default.vue'
  import ErrorLayout from '@/layouts/404.vue'

  const emit = defineEmits(['update:name'])

  const sections = ['props', 'events', 'slots', 'exposed', 'sass', 'argument', 'modifiers', 'value'] as const

  const route = useRoute()

  const error = shallowRef(false)
  const name = computed(() => {
    const name = route.params.name as string
    if (name.endsWith('-directive')) return name.replace('-directive', '')
    else if (name.startsWith('use-')) return camelCase(name)
    else return `${name.charAt(0).toUpperCase()}${camelize(name.slice(1))}`
  })
  const component = shallowRef<any>({})
  watch(name, async () => {
    emit('update:name', name.value)
    try {
      component.value = await getApi(name.value)
      error.value = false
    } catch (err) {
      error.value = true
    }
  }, { immediate: true })

  function getApi (name: string): Promise<{ default: PartData }> {
    return import(`../../../../api-generator/dist/api/${name}.json`).then(m => m.default)
  }
</script>

<template>
  <ErrorLayout v-if="error" />
  <DefaultLayout v-else>
    <template #view>
      <slot />
      <template v-for="section of sections" :key="section">
        <ApiSection
          v-if="section in component && Object.keys(component[section]).length"
          :name="name"
          :section="section"
        />
      </template>
    </template>
  </DefaultLayout>
</template>
