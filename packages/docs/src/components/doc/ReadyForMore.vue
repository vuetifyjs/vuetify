<template>
  <div class="mb-3">
    <app-heading
      :content="t('ready')"
      level="2"
      class="mb-2"
    />

    <!-- https://vue-i18n.intlify.dev/guide/advanced/component.html#scope-resolving -->
    <i18n-t
      keypath="ready-text"
      scope="global"
      tag="div"
    >
      <template #team>
        <app-link :href="rpath('/about/meet-the-team/')">
          {{ t('team') }}
        </app-link>
      </template>
    </i18n-t>
  </div>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
</script>
