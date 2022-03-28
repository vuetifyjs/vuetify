<template>
  <v-card>
    <v-card-text>
      <v-timeline side="end" align="top">
        <v-timeline-item
          align-dot="start"
          dot-color="pink"
          size="small"
        >
          <div class="d-flex">
            <strong class="mr-4">5pm</strong>
            <div>
              <strong>New Icon</strong>
              <div class="text-caption">
                Mobile App
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          align-dot="start"
          dot-color="teal-lighten-3"
          size="small"
        >
          <div class="d-flex">
            <strong class="mr-4">3-4pm</strong>
            <div>
              <strong>Design Stand Up</strong>
              <div class="text-caption mb-2">
                Hangouts
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          align-dot="start"
          dot-color="pink"
          size="small"
        >
          <div class="d-flex">
            <strong class="mr-4">12pm</strong>
            <div>
              <strong>Lunch break</strong>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          align-dot="start"
          dot-color="teal-lighten-3"
          size="small"
        >
          <div class="d-flex">
            <strong class="mr-4">9-11am</strong>
            <div>
              <strong>Finish Home Screen</strong>
              <div class="text-caption">
                Web App
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
