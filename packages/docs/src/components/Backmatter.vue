<template>
  <section
    id="ready-for-more"
    class="mt-16"
  >
    <app-heading
      :content="t('ready')"
      level="2"
      class="mb-2"
    />

    <!-- https://vue-i18n.intlify.dev/guide/advanced/component.html#scope-resolving -->
    <i18n-t
      class="mb-3"
      keypath="ready-text"
      scope="global"
      tag="div"
    >
      <template #team>
        <app-link :href="rpath('/introduction/meet-the-team/')">
          {{ t('team') }}
        </app-link>
      </template>
    </i18n-t>

    <related-pages />

    <app-divider class="mt-7 mb-5" />

    <up-next class="mb-5" />

    <vuetify class="mb-6" />

    <contribute />
  </section>
</template>

<script setup>
  // Components
  import Contribute from '@/components/doc/Contribute.vue'
  import RelatedPages from '@/components/doc/RelatedPages.vue'
  import UpNext from '@/components/doc/UpNext.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
</script>
