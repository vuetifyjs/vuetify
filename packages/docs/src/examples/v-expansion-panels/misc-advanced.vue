<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row density="comfortable">
            <v-col class="d-flex justify-start" cols="4">
              Trip name
            </v-col>
            <v-col
              class="text-grey"
              cols="8"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="expanded"
                  key="0"
                >
                  Enter a name for the trip
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-text-field
          v-model="trip.name"
          placeholder="Caribbean Cruise"
          hide-details
        ></v-text-field>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row density="comfortable">
          <v-col class="d-flex justify-start" cols="4">
            Location
          </v-col>
          <v-col
            class="text--secondary"
            cols="8"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="expanded"
                key="0"
              >
                Select trip destination
              </span>
              <span
                v-else
                key="1"
              >
                {{ trip.location }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row density="comfortable">
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-select
              v-model="trip.location"
              :items="locations"
              variant="solo"
              chips
              flat
            ></v-select>
          </v-col>

          <v-divider
            class="mx-4"
            vertical
          ></v-divider>

          <v-col cols="3">
            Select your destination of choice
            <br>
            <a href="#">Learn more</a>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            variant="text"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row density="comfortable">
          <v-col class="d-flex justify-start" cols="4">
            Start and end dates
          </v-col>
          <v-col
            class="text--secondary"
            cols="8"
          >
            <v-fade-transition leave-absolute>
              <span v-if="expanded">When do you want to travel?</span>
              <v-row
                v-else
                density="compact"
                style="width: 100%"
              >
                <v-col class="d-flex justify-start" cols="6">
                  Start date: {{ trip.start || 'Not set' }}
                </v-col>
                <v-col class="d-flex justify-start" cols="6">
                  End date: {{ trip.end || 'Not set' }}
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row
          density="compact"
          justify="space-around"
        >
          <v-col cols="3">
            <v-text-field
              v-model="trip.start"
              label="Start date"
              type="date"
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              v-model="trip.end"
              label="End date"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
  import { ref } from 'vue'

  const locations = ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France']

  const trip = ref({
    name: '',
    location: null,
    start: null,
    end: null,
  })
</script>

<script>
  export default {
    data: () => ({
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
    }),
  }
</script>
