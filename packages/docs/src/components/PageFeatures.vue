<template>
  <div class="mb-8">
    <page-feature-chip
      v-if="meta?.features?.figma"
      :text="t('figma-design')"
      prepend-icon="mdi-image"
      href="https://figma.vuetifyjs.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #prepend>
        <v-icon color="purple" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="meta?.features?.report"
      :text="t('report-a-bug')"
      prepend-icon="mdi-bug-outline"
      target="_blank"
      rel="noopener noreferrer"
      href="https://issues.vuetifyjs.com/"
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
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #prepend>
        <v-icon color="warning" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="meta?.features?.github"
      :text="t('view-in-github')"
      prepend-icon="mdi-github"
      :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/vuetify/src${meta.features.github}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #prepend>
        <v-icon color="black" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="meta?.features?.spec"
      :text="t('design-spec')"
      prepend-icon="mdi-material-design"
      :href="meta.features.spec"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #prepend>
        <v-icon color="surface-variant" />
      </template>
    </page-feature-chip>
  </div>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'
  import { getBranch } from '@/util/helpers'

  const meta = useRoute().meta

  const { t } = useI18n()
  const branch = getBranch()

  const label = computed(() => {
    if (!meta.features.label) return false

    const original = encodeURIComponent(meta.features.label)

    return `https://github.com/vuetifyjs/vuetify/labels/${original}`
  })
</script>
