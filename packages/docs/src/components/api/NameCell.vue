<template>
  <td :id="`${section}-${name.replace('$', '')}`">
    <div class="d-inline-flex align-center">
      <kbd class="name-item text-mono">
        <AppLink :href="href" class="font-weight-bold">
          {{ name }}
        </AppLink>
      </kbd>

      <v-fade-transition>
        <v-icon
          v-if="pointing"
          class="ms-2"
          color="warning"
          icon="mdi-hand-pointing-left"
        />
      </v-fade-transition>

      <new-in-chip
        v-if="newIn"
        :text="t('new-in', { version: newIn })"
        :to="to"
        density="comfortable"
      />
    </div>
  </td>
</template>

<script setup>
  const props = defineProps({
    section: String,
    name: String,
    newIn: String,
  })

  const { t } = useI18n()
  const route = useRoute()
  const frontmatter = useFrontmatter()

  const href = computed(() => {
    return `#${props.section}-${props.name.replace('$', '')}`
  })
  const to = computed(() => {
    return rpath(`/getting-started/release-notes/?version=v${props.newIn}`)
  })

  const pointing = shallowRef(false)
  let timeout
  watch(() => route.hash, hash => {
    if (hash === href.value) {
      clearTimeout(timeout)
      pointing.value = true
      timeout = setTimeout(() => {
        pointing.value = false
      }, 5000)
    } else if (hash && !frontmatter.value?.toc?.some(v => v.to === hash)) {
      pointing.value = false
    }
  }, { immediate: true })
  onScopeDispose(() => clearTimeout(timeout))
</script>

<style scoped>
  .app-link {
    margin-left: -14px;
    vertical-align: top;
  }

  .app-link :deep(.v-icon) {
    opacity: 0;
    margin: 0;
  }

  .app-link:hover :deep(.v-icon) {
    opacity: 1;
  }
</style>
