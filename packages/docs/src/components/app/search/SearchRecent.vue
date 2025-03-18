<template>
  <AppSheet v-if="searches.length" class="pa-3 flex-1-1-100" border>
    <div class="text-high-emphasis font-weight-bold d-flex align-center text-h6 mb-2">
      <v-icon
        class="me-2"
        color="medium-emphasis"
        icon="mdi-history"
        size="22"
      />

      {{ t('search.recent') }}
    </div>

    <div class="d-flex flex-column ga-1">
      <template v-for="(search, i) in searches" :key="`search-${i}`">
        <v-list-item
          :title="search.name"
          :to="search.url"
          append-icon="mdi-delete-outline"
          density="comfortable"
          lines="one"
          prepend-icon="mdi-file-document-outline"
          nav
          slim
        >
          <template v-if="search.hash" #subtitle>
            <div class="d-flex align-center">
              <v-icon
                class="me-1"
                icon="mdi-pound"
                size="x-small"
              />
              <span class="text-capitalize">{{ search.hash }}</span>
            </div>
          </template>

          <template #append>
            <v-icon size="18" @click.prevent="emit('click:delete', i)" />
          </template>
        </v-list-item>
      </template>
    </div>
  </AppSheet>
</template>

<script setup>
  defineProps({
    searches: {
      type: Array,
      default: () => ([]),
    },
  })

  const emit = defineEmits(['click:delete'])

  const { t } = useI18n()
</script>
