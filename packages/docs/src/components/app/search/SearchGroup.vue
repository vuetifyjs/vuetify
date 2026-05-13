<template>
  <v-fade-transition hide-on-leave>
    <AppSheet v-if="results.length" class="pa-3 flex-1-1-100" border>
      <div class="text-high-emphasis font-weight-bold d-flex align-center text-title-large mb-2">
        <v-icon
          class="me-2"
          color="medium-emphasis"
          icon="mdi-history"
          size="22"
        />

        {{ title }}
      </div>

      <div class="d-flex flex-column ga-1">
        <v-fade-transition group hide-on-leave>
          <template v-for="(result, i) in results" :key="`${title}-${i}`">
            <v-list-item
              :title="result.name"
              :to="result.url"
              append-icon="mdi-delete-outline"
              density="comfortable"
              lines="one"
              prepend-icon="mdi-file-document-outline"
              nav
              slim
            >
              <template v-if="result.hash" #subtitle>
                <div class="d-flex align-center">
                  <v-icon
                    class="me-1"
                    icon="mdi-pound"
                    size="x-small"
                  />
                  <span class="text-capitalize">{{ result.hash }}</span>
                </div>
              </template>

              <template #append>
                <slot :index="i" name="actions" />
              </template>
            </v-list-item>
          </template>
        </v-fade-transition>
      </div>
    </AppSheet>
  </v-fade-transition>
</template>

  <script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    results: {
      type: Array,
      default: () => ([]),
    },
  })
  </script>
