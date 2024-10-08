<template>
  <div class="mb-4">
    <page-feature-chip
      v-if="one.isSubscriber && user.pins"
      :prepend-icon="`mdi-pin${!pinned ? '-outline' : ''}`"
      text="Pin"
      @click="onClickPin"
    >
      <template #prepend>
        <v-icon :color="pinned ? 'primary' : undefined" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="frontmatter?.features?.figma"
      :text="t('figma-design')"
      href="https://figma.vuetifyjs.com/"
      prepend-icon="mdi-image"
      rel="noopener noreferrer"
      target="_blank"
    >
      <template #prepend>
        <v-icon color="purple" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="frontmatter?.features?.report"
      :text="t('report-a-bug')"
      href="https://issues.vuetifyjs.com/"
      prepend-icon="mdi-bug-outline"
      rel="noopener noreferrer"
      target="_blank"
    >
      <template #prepend>
        <v-icon color="red" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="label"
      :href="label"
      :text="t('open-issues')"
      prepend-icon="mdi-alert-circle-outline"
      rel="noopener noreferrer"
      target="_blank"
    >
      <template #prepend>
        <v-icon color="warning" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="frontmatter?.features?.github"
      :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/vuetify/src${frontmatter.features.github}`"
      :text="t('view-in-github')"
      prepend-icon="mdi-github"
      rel="noopener noreferrer"
      target="_blank"
    >
      <template #prepend>
        <v-icon color="black" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="frontmatter?.features?.spec"
      :href="frontmatter.features.spec"
      :text="t('design-spec')"
      prepend-icon="mdi-material-design"
      rel="noopener noreferrer"
      target="_blank"
    >
      <template #prepend>
        <v-icon color="surface-variant" />
      </template>
    </page-feature-chip>
  </div>
</template>

<script setup>
  const one = useOneStore()
  const pins = usePinsStore()
  const route = useRoute()
  const user = useUserStore()
  const { t } = useI18n()
  const frontmatter = useFrontmatter()

  const branch = getBranch()

  const pinned = computed(() => {
    return pins.pins.some(p => p.to === route.path)
  })

  const label = computed(() => {
    if (!frontmatter.value?.features?.label) return false

    const original = encodeURIComponent(frontmatter.value.features.label)

    return `https://github.com/vuetifyjs/vuetify/labels/${original}`
  })

  function onClickPin () {
    pins.toggle(!pinned.value, {
      title: route.meta.title,
      to: route.path,
      category: frontmatter.value?.category,
    })
  }
</script>
