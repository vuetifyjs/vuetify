<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : undefined"
        :href="job.url"
        class="mb-4"
        outlined
        rel="sponsored"
        target="_blank"
        @click="$ga.event('jobs', 'click', `${job.company} - ${job.id}`)"
      >
        <v-card-title class="white align-start">
          <v-avatar
            class="mr-3"
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
            Apply Now

            <v-icon
              right
              small
            >
              mdi-open-in-new
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
              class="px-2 mr-1"
              color="#e83e8c"
              dark
              label
              x-small
            >
              <span class="font-weight-bold">#new</span>
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
</template>

<script>
  export default {
    name: 'JobsCard',

    props: {
      job: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
