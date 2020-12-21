<template>
  <div>
    <v-dialog
      max-width="600px"
      :value="dialog"
    >
      <v-card>
        <v-card-title v-text="'Create a job listing'" />
        <v-card-text v-text="'Lorem ipsum dolor sit amet consectetur, adiplicing elit.'" />
        <v-card-text>
          <v-form ref="job-form">
            <v-text-field
              filled
              label="Stuff"
            />
            <v-text-field
              filled
              label="Stuff"
            />
            <div class="d-flex justify-space-between">
              <v-text-field
                class="mr-15"
                filled
                label="Stuff"
              />
              <v-text-field
                filled
                label="Stuff"
              />
            </div>
            <v-text-field
              filled
              label="Stuff"
            />
            <v-checkbox
              label="Accept"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn
            text
            v-text="'Cancel'"
          />
          <v-btn
            text
            color="success"
            v-text="'Submit'"
          />
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
      dialog: true,
    }),
  }
</script>
