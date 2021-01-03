<template>
  <div>
    <v-dialog
      max-width="600px"
      :value="dialog"
    >
      <v-card>
        <v-card-title v-text="'Create a job listing'" />
        <v-card-text class="pb-0" v-text="'Lorem ipsum dolor sit amet consectetur, adiplicing elit.'" />
        <v-card-text>
          <v-form ref="job-form" v-model="valid">
            <div class="d-flex justify-space-between align-center">
              <v-hover v-slot="{ hover }">
                <v-avatar
                  class="mr-10"
                  :style="`transition: background .2s ease-in-out; ${hover && 'cursor: pointer;'}`"
                  size="84"
                  :color="hover ? 'teal' : 'teal darken-2'"
                  @click="true"
                >
                  <span v-text="'Click to Upload'" />
                </v-avatar>
              </v-hover>
              <v-text-field
                v-model="job.company.title"
                class="pt-7"
                filled
                label="Company Name"
              />
            </div>
            <v-text-field
              v-model="job.title"
              filled
              label="Job Title"
            />
            <v-text-field
              v-model="job.description"
              filled
              label="Job Description"
            />
            <div class="d-flex justify-space-between">
              <v-text-field
                v-model="job.city"
                class="mr-15"
                filled
                label="City"
              />
              <v-text-field
                v-model="job.country"
                filled
                label="Country"
              />
            </div>
            <v-select
              v-model="job.type"
              filled
              multiple
              label="Job Type"
              :items="['Full-Time', 'Part-Time', 'Remote']"
            />
            <v-checkbox
              v-model="accepted"
              label="Accept"
            />
          </v-form>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between">
          <v-btn
            text
            v-text="'Cancel'"
          />
          <v-btn
            text
            color="success"
            v-text="'Submit'"
          />
        </v-card-text>
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
      dialog: true,
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
