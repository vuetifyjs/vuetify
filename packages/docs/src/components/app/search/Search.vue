<template>
  <AppBtn
    :active="model"
    :block="isMobile"
    :class="{'justify-start px-5': isMobile, 'ms-2': !isMobile}"
    :loading="loading ? 'primary' : undefined"
    :variant="isMobile ? 'tonal' : undefined"
    prepend-icon="mdi-magnify"
    @click="shouldLoad = true"
  >
    <span :class="isMobile && 'me-n1'">
      <span> {{ t('search.label') }} </span>

      <span v-if="!isMobile" class="py-1 px-2 ms-2 border rounded text-disabled text-caption">
        <span>
          {{ t(`search.key-hint${user.slashSearch ? '-slash' : platform.mac ? '-mac' : ''}`) }}
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
  const { platform } = useDisplay()
  const { query } = useRoute()
  const user = useUserStore()
  const one = useOneStore()

  const shouldLoad = shallowRef(false)
  const loading = shallowRef(false)
  const model = shallowRef(false)
  const searchString = shallowRef('')

  const isMobile = computed(() => one.mobileBreakpoint.value)

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
