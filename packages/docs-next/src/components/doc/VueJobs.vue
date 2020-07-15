<template>
  <div>
    <v-text-field
      v-model="filter"
      clearable
      dense
      :label="$i18n.t('search-jobs')"
      outlined
      prepend-inner-icon="$mdiMagnify"
    >
      <template
        v-if="isLoading"
        v-slot:append
      >
        <v-progress-circular
          color="primary"
          indeterminate
          size="22"
          width="2"
        />
      </template>
    </v-text-field>

    <v-fade-transition
      v-if="jobs.length"
      group
      hide-on-leave
      leave-absolute
    >
      <v-hover
        v-for="job in jobs"
        :key="job.id"
      >
        <template v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : undefined"
            :href="job.url"
            class="mb-4"
            outlined
            rel="sponsored"
            target="_blank"
          >
            <v-card-title class="align-start">
              <v-avatar
                :class="$vuetify.rtl ? 'ml-3' : 'mr-3'"
                tile
              >
                <v-img
                  :src="job.avatar"
                  contain
                  height="48"
                  width="48"
                />
              </v-avatar>

              <div>
                <div
                  class="subtitle-1 font-weight-bold mb-n1"
                  v-text="job.title"
                />

                <div
                  class="caption grey--text text-darken-1"
                  v-text="job.location"
                />
              </div>

              <v-spacer />

              <v-btn
                color="green"
                class="white--text mt-2 mt-md-0"
                depressed
                small
              >
                {{ $i18n.t('apply') }}

                <v-icon
                  right
                  small
                >
                  $mdiOpenInNew
                </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="pb-2 pt-0">
              <div
                class="pb-2"
                v-text="job.description"
              />

              <div class="d-flex align-center">
                <v-chip
                  v-if="job.isNew"
                  :class="$vuetify.rtl ? 'px-2 ml-1' : 'px-2 mr-1'"
                  color="#e83e8c"
                  dark
                  label
                  x-small
                >
                  <span class="font-weight-bold">#{{ $i18n.t('new') }}</span>
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
        </template>
      </v-hover>
    </v-fade-transition>

    <div
      v-else-if="isLoading != null"
      class="text-center title pa-4"
    >
      {{ $i18n.t('not-found') }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueJobs',

    data: () => ({
      allJobs: [],
      filter: null,
      isLoading: null,
      jobs: [],
      timeout: null,
    }),

    watch: {
      allJobs: 'setJobs',

      filter () {
        clearTimeout(this.timeout)
        this.isLoading = true
        this.timeout = setTimeout(() => {
          this.setJobs()
          this.isLoading = false
        }, 500)
      },
    },

    mounted () {
      this.loadJobs()
    },

    methods: {
      apiVueJobs () {
        return fetch('https://vuejobs.com/api/jobs', {
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then(res => res.map(job => ({ ...job, via: 'VueJobs' })))
      },

      mapVueJobs (job) {
        const {
          company,
          description,
          location,
          id,
          published_at: publishedAt = { for_humans: '' },
          title,
          type,
          url,
          via,
        } = job
        return {
          id,
          avatar: company.avatar,
          company: company.name,
          description,
          isNew: publishedAt.for_humans.indexOf('day') > -1,
          location,
          title,
          type,
          url,
          via,
        }
      },

      filterJobs (job) {
        if (!this.filter) return job
        const { company, description, location, title } = job
        const string = `${company} ${description} ${location} ${title}`.toLowerCase()
        return string.indexOf((this.filter || '').toLowerCase()) > -1
      },

      // Load all jobs from sources
      async loadJobs () {
        const jobs = await this.apiVueJobs()
        this.allJobs = [...jobs]
      },

      // Invoke the job's mapping method
      // and add documentation reference
      mapJob (job) {
        const mapped = this[`map${job.via}`](job)
        return {
          ...mapped,
          url: `${mapped.url}?ref=vuetify`,
        }
      },

      setJobs () {
        this.jobs = this.allJobs.map(this.mapJob).filter(this.filterJobs)
      },
    },
  }
</script>
