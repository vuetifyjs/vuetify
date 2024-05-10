<template>
  <div>
    <AppMarkup :code="item.formatted" :rounded="false" language="ts" />
    <br>
    <AppMarkdown
      v-if="localeStore.locale !== 'eo-UY'"
      :content="item.description"
      class="mb-0"
    />
    <span v-else>{{ item.description }}</span>

    <p v-if="user.dev && item.source">
      <strong>source: {{ item.source }}</strong>
      <template v-if="user.dev && item.descriptionSource && item.source !== item.descriptionSource">
        <br>
        <strong>description source: {{ item.descriptionSource }}</strong>
      </template>
    </p>
  </div>
</template>

<script setup>
  const props = defineProps({
    items: Array,
    headers: Array,
  })

  const localeStore = useLocaleStore()
  const user = useUserStore()

  const item = computed(() => props.items[0])
</script>
