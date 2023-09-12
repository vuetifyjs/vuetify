<template>
  <div class="mb-8">
    <page-feature-chip
      v-if="meta.figma"
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
      v-if="meta.issues"
      :text="t('report-an-issue')"
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
      v-if="meta.github"
      :text="t('view-in-github')"
      prepend-icon="mdi-github"
      :href="`https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/vuetify/src${meta.github}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #prepend>
        <v-icon color="black" />
      </template>
    </page-feature-chip>

    <page-feature-chip
      v-if="meta.spec"
      :text="t('design-spec')"
      prepend-icon="mdi-material-design"
      :href="meta.spec"
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
  import { getBranch } from '@/util/helpers'

  const meta = useRoute().meta
  const { t } = useI18n()
  const branch = getBranch()
</script>
