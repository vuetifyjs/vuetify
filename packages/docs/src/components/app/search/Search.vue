<template>
  <AppBtn
    :active="model"
    :icon="xs ? 'mdi-magnify' : undefined"
    :loading="loading ? 'primary' : undefined"
    :prepend-icon="smAndUp ? 'mdi-magnify' : undefined"
    @click="shouldLoad = true"
  >
    <span :class="mdAndUp && 'me-n1'">
      <span v-if="lgAndUp">
        {{ t('search.label') }}
      </span>

      <span
        :class="[
          smAndDown ? 'border-opacity-0' : 'py-1 px-2 ms-2',
          'border rounded text-disabled text-caption'
        ]"
      >
        <span v-if="mdAndUp">
          {{ t(`search.key-hint${user.ecosystem.docs.slashSearch ? '-slash' : platform.mac ? '-mac' : ''}`) }}
        </span>
      </span>
    </span>

    <SearchDialog
      v-if="shouldLoad"
      v-model="model"
      v-model:search="searchString"
      @vue:mounted="onMount"
    />
  </AppBtn>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'

  const SearchDialog = defineAsyncComponent(() => import('@/components/app/search/SearchDialog.vue'))

  const { t } = useI18n()
  const { smAndUp, smAndDown, mdAndUp, lgAndUp, xs, platform } = useDisplay()
  const { query } = useRoute()
  const user = useUserStore()

  const shouldLoad = shallowRef(false)
  const loading = shallowRef(false)
  const model = shallowRef(false)
  const searchString = shallowRef('')

  watch(shouldLoad, () => {
    loading.value = true
    model.value = true
  })

  onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
    if (query?.search) {
      searchString.value = query.search as string
      shouldLoad.value = true
    }
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
  })
  onBeforeRouteLeave(() => {
    model.value = false
  })

  function onDocumentKeydown (e: KeyboardEvent) {
    const modifierKey = platform.value.mac ? e.metaKey : e.ctrlKey
    const isSearchKey = user.ecosystem.docs.slashSearch ? e.key === '/' : modifierKey && e.key === 'k'

    if (!model.value && isSearchKey) {
      e.preventDefault()

      shouldLoad.value = true
      model.value = true
    } else if (model.value && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()

      // list.value?.rootEl?.focus()
    }
  }
  function onMount () {
    loading.value = false
  }
</script>
