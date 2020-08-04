<template>
  <div>
    <v-text-field
      v-model="filter"
      clearable
      dense
      label="Search by keywords"
      outlined
      prepend-inner-icon="mdi-magnify"
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
      <jobs-card
        v-for="job in jobs"
        :key="job.id"
        :job="job"
      />
    </v-fade-transition>

    <div
      v-else-if="isLoading != null"
      class="text-center title pa-4"
    >
      No Jobs Found
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JobsList',

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
