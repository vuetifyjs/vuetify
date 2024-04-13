<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex">
        <AppTextField
          v-model="search"
          :append-inner-icon="view ? 'mdi-view-grid-outline' : 'mdi-view-list-outline'"
          :placeholder="placeholder"
          @click:append-inner.stop.prevent="view = !view"
        />
      </div>
    </v-col>

    <v-col
      v-for="job in items"
      :key="job.id"
      :md="view ? 6 : undefined"
      cols="12"
    >
      <v-card
        :href="job.url"
        class="transition-swing"
        max-height="225"
        rel="sponsored"
        target="_blank"
        variant="flat"
        border
        @click="onClick(job)"
      >
        <v-list-item
          :title="job.title"
          lines="two"
        >
          <template #prepend>
            <v-avatar
              :class="!job.avatar && 'pt-1'"
              :color="!job.avatar ? 'primary' : undefined"
              :image="job.avatar"
              icon="$vuetify"
            />
          </template>

          <template v-if="job.locations.length > 0" #subtitle>
            <div class="d-flex align-center">
              <v-icon
                class="me-1"
                icon="mdi-map-marker-outline"
                size="14"
              />

              {{ job.locations.join(', ') }}
            </div>
          </template>

          <template #append>
            <v-btn
              class="ms-6"
              color="success"
              size="small"
              style="pointer-events: none;"
              variant="flat"
            >
              {{ t('apply') }}

              <v-icon
                icon="mdi-open-in-new"
                size="small"
                end
              />
            </v-btn>
          </template>
        </v-list-item>

        <v-card-text class="text-medium-emphasis py-0">
          <AppMarkdown :content="job.description" />
        </v-card-text>

        <div class="text-end text-caption text-disabled mb-1 me-2">
          via {{ job.via }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  const { event } = useGtag()
  const { jobs } = useJobsStore()
  const { t } = useI18n()
  const view = ref(true)
  const search = ref('')
  const items = computed(() => {
    return jobs.filter(job => {
      if (!search.value) return true

      const title = job.title.toLowerCase()
      const description = job.description.toLowerCase()
      const s = search.value.toLowerCase()

      return (title.includes(s) || description.includes(s))
    })
  })
  const placeholder = computed(() => {
    return t('search-jobs')
  })

  function onClick (job) {
    event('click', {
      event_category: 'vuetify-job',
      event_label: job.title,
      value: job.id,
    })
  }
</script>
