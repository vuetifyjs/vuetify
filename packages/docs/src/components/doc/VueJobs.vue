<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex">
        <app-text-field
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
      cols="12"
      :md="view ? 6 : undefined"
      class="d-flex"
    >
      <v-card
        :href="job.link"
        border
        class="transition-swing h-100 d-flex flex-column"
        max-height="225"
        rel="sponsored"
        target="_blank"
        variant="flat"
        @click="onClick(job)"
      >
        <v-list-item
          :prepend-avatar="typeof job.organization.avatar === 'string' ? job.organization.avatar : undefined"
          :title="job.title"
          class="mt-2"
        >
          <template v-if="job.locations.length > 0" #subtitle>
            <v-icon
              class="me-1"
              icon="mdi-map-marker-outline"
              size="14"
            />

            {{ job.locations.join(', ') }}
          </template>

          <template #append>
            <v-btn
              color="success"
              class="ms-6"
              size="small"
              style="pointer-events: none;"
              variant="flat"
            >
              {{ t('apply') }}

              <v-icon
                icon="mdi-open-in-new"
                end
                size="small"
              />
            </v-btn>
          </template>
        </v-list-item>

        <v-card-text class="pb-2 pt-2 d-flex">
          <div
            class="mb-4 text-medium-emphasis"
            v-text="job.description"
          />
        </v-card-text>

        <div class="d-flex align-center text-lowercase px-4 pb-4">
          <v-chip
            v-if="job.isNew"
            class="me-1"
            color="#e83e8c"
            label
            size="x-small"
          >
            <span class="font-weight-bold">#{{ t('new') }}</span>
          </v-chip>

          <v-chip
            v-if="job.remote"
            class="px-2"
            color="primary"
            label
            size="x-small"
          >
            <span class="font-weight-bold">#remote {{ job.remote }}</span>
          </v-chip>

          <v-spacer />

          <div class="text-end text-caption text-medium-emphasis">
            via {{ job.via }}
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useJobsStore } from '@/store/jobs'

  // Utilities
  import { computed, ref } from 'vue'
  import { useGtag } from 'vue-gtag-next'

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
