<template>
  <div class="mb-3">
    <AppHeading
      :content="t('ready')"
      class="mb-2"
      level="2"
    />

    <!-- https://vue-i18n.intlify.dev/guide/advanced/component.html#scope-resolving -->
    <i18n-t
      keypath="ready-text"
      scope="global"
      tag="div"
    >
      <template #team>
        <AppLink :href="rpath('/about/meet-the-team/')">
          {{ t('team') }}
        </AppLink>
      </template>
    </i18n-t>
  </div>
</template>

<script setup>
  const { t } = useI18n()
</script>
