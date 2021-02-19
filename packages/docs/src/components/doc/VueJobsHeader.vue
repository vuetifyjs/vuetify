<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title v-text="'Create a job listing'" />

        <v-card-text class="pb-0" v-text="'Lorem ipsum dolor sit amet consectetur, adiplicing elit.'" />

        <v-card-text>
          <v-form ref="job-form" v-model="valid">
            <div class="d-flex justify-space-between align-center">
              <v-hover v-slot="{ hover }">
                <v-avatar
                  :color="`teal ${!hover && 'darken-2'}`"
                  :style="`${hover && 'cursor: pointer;'}`"
                  class="mr-10 transition-fast-out-slow-in text-subtitle-1 white--text"
                  size="84"
                  @click="true"
                >
                  {{ $t('upload') }}
                </v-avatar>
              </v-hover>

              <v-text-field
                class="pt-7"
                dense
                filled
                label="Company Name"
                v-model="job.company.title"
              />
            </div>

            <v-text-field
              v-model="job.title"
              dense
              filled
              label="Job Title"
            />

            <v-text-field
              v-model="job.description"
              dense
              filled
              label="Job Description"
            />

            <div class="d-flex justify-space-between">
              <v-text-field
                v-model="job.city"
                class="mr-12"
                dense
                filled
                label="City"
              />

              <v-text-field
                v-model="job.country"
                filled
              dense
                label="Country"
              />
            </div>

            <v-select
              :items="['Full-Time', 'Part-Time', 'Remote']"
              dense
              filled
              label="Job Type"
              multiple
              v-model="job.type"
            />

            <v-checkbox
              v-model="accepted"
              label="Accept"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn text>
            {{ $t('cancel') }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="success"
            text
          >
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="d-flex align-center justify-space-between mb-4">
      <div class="v-heading text-sm-h3">Vue and Vuetify jobs</div>

      <app-btn text @click="dialog = true">Create Listing</app-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueJobsHeader',

    data: () => ({
      accepted: false,
      dialog: false,
      job: {
        city: '',
        company: {
          image: '',
          title: '',
        },
        country: '',
        description: '',
        title: '',
        type: [],
      },
      valid: false,
    }),
  }
</script>
