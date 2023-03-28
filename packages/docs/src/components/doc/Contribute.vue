<template>
  <div>
    <span class="font-weight-bold me-1 text-medium-emphasis">
      {{ t('edit-this-page') }}
    </span>
    <app-link :href="href">
      {{ t('github') }}
    </app-link>
  </div>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'
  import { getBranch } from '@/util/helpers'

  const { t } = useI18n()
  const route = useRoute()

  const href = computed(() => {
    const branch = getBranch()
    const [,, category, page] = route.path.split('/')

    return `https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/pages/en/${category}/${page}.md`
  })
</script>
