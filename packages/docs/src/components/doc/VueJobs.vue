<template>
  <div>
    <div
      v-for="job in jobs"
      :key="job.id"
    >
      <v-card
        :href="job.url"
        border
        class="mb-4 transition-swing"
        rel="sponsored"
        target="_blank"
        variant="flat"
      >
        <v-list-item
          :prepend-avatar="job.avatar"
          :title="job.title"
          class="mt-2"
        >
          <template #subtitle>
            <v-icon
              class="mr-1"
              icon="mdi-map-marker-outline"
              size="14"
            />

            {{ job.location }}
          </template>

          <template #append>
            <v-btn
              color="success"
              class="ml-auto"
              size="small"
              variant="flat"
            >
              {{ t('apply') }}

              <v-icon
                icon="mdi-open-in-new"
                end
                small
              />
            </v-btn>
          </template>
        </v-list-item>

        <v-card-text class="pb-2 pt-2">
          <div
            class="mb-4 text-medium-emphasis"
            v-text="job.description"
          />

          <div class="d-flex align-center text-lowercase">
            <v-chip
              v-if="job.isNew"
              class="mr-1"
              color="#e83e8c"
              label
              size="x-small"
            >
              <span class="font-weight-bold">#{{ t('new') }}</span>
            </v-chip>

            <v-chip
              class="px-2"
              color="primary"
              label
              size="x-small"
            >
              <span class="font-weight-bold">#{{ job.type }}</span>
            </v-chip>

            <v-spacer />

            <div class="text-end text-caption text-medium-emphasis">
              via {{ job.via }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useJobsStore } from '../../store/jobs'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VueJobs',

    setup () {
      const { jobs } = useJobsStore()
      const { t } = useI18n()

      return { jobs, t }
    },
  })
</script>
