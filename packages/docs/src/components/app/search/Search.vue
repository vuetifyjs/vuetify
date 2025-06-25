<template>
  <AppBtn
    :active="model"
    :loading="loading ? 'primary' : undefined"
    prepend-icon="mdi-magnify"
    :block="mobile"
    :variant="mobile ? 'tonal' : undefined"
    :class="{'ms-2': !mobile}"
    size="default"
    @click="shouldLoad = true"
  >
    <span class="me-n1">
      <span> {{ t('search.label') }} </span>

      <span v-if="!mobile" class="py-1 px-2 ms-2 border rounded text-disabled text-caption">
          {{ t(`search.key-hint${user.slashSearch ? '-slash' : platform.mac ? '-mac' : ''}`) }}
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
  const { platform, mobile } = useDisplay()
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
    const isSearchKey = user.slashSearch ? e.key === '/' : modifierKey && e.key === 'k'

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
