<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <template v-slot:default="{ expanded }">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex justify-start">
              Trip name
            </v-col>
            <v-col
              cols="8"
              class="text-grey"
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
          hide-details
          placeholder="Caribbean Cruise"
        ></v-text-field>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start">
            Location
          </v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
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
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-select
              v-model="trip.location"
              :items="locations"
              chips
              flat
              variant="solo"
            ></v-select>
          </v-col>

          <v-divider
            vertical
            class="mx-4"
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
            variant="text"
            color="secondary"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="text"
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start">
            Start and end dates
          </v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to travel?</span>
              <v-row
                v-else
                no-gutters
                style="width: 100%"
              >
                <v-col cols="6" class="d-flex justify-start">
                  Start date: {{ trip.start || 'Not set' }}
                </v-col>
                <v-col cols="6" class="d-flex justify-start">
                  End date: {{ trip.end || 'Not set' }}
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row
          justify="space-around"
          no-gutters
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

<script>
  export default {
    data: () => ({
      date: null,
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
