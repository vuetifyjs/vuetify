<template>
  <div>
    <app-text-field
      v-model="filter"
      :placeholder="$t('search-jobs')"
      class="mt-8 mb-12"
      clearable
      icon="$mdiBriefcaseSearchOutline"
    />

    <v-fade-transition
      v-if="jobs.length"
      group
      hide-on-leave
      leave-absolute
    >
      <div
        v-for="job in jobs"
        :key="job.id"
      >
        <v-card
          :href="job.url"
          class="mb-4 transition-swing"
          outlined
          rel="sponsored"
          target="_blank"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="job.avatar"
                contain
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-text="job.title"
              />

              <v-list-item-subtitle class="d-flex">
                <v-icon
                  class="mr-1"
                  size="14"
                >
                  $mdiMapMarkerOutline
                </v-icon>

                {{ job.location }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
              color="green"
              class="white--text ml-auto"
              depressed
              small
            >
              {{ $t('apply') }}

              <v-icon
                right
                small
              >
                $mdiOpenInNew
              </v-icon>
            </v-btn>
          </v-list-item>

          <v-card-text class="pb-2 pt-0">
            <div
              class="pb-2"
              v-text="job.description"
            />

            <div class="d-flex align-center text-lowercase">
              <v-chip
                v-if="job.isNew"
                :class="$vuetify.rtl ? 'px-2 ml-1' : 'px-2 mr-1'"
                color="#e83e8c"
                dark
                label
                x-small
              >
                <span class="font-weight-bold">#{{ $t('new') }}</span>
              </v-chip>

              <v-chip
                class="px-2"
                color="primary"
                label
                x-small
              >
                <span class="font-weight-bold">#{{ job.type }}</span>
              </v-chip>

              <v-spacer />

              <div class="text-right caption text--secondary">
                via {{ job.via }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VueJobs',

    data: () => ({ filter: '' }),

    computed: {
      all: get('jobs/all'),
      jobs () {
        if (!this.filter) return this.all

        return this.all.filter(job => {
          const { company, description, location, title } = job
          const string = `${company} ${description} ${location} ${title}`.toLowerCase()

          return string.indexOf((this.filter || '').toLowerCase()) > -1
        })
      },
    },
  }
</script>
