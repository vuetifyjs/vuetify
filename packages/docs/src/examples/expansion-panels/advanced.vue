<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-layout>
          <v-flex xs4>Trip name</v-flex>
          <v-flex xs8 class="text--secondary">
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
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
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          v-model="trip.name"
          placeholder="Caribbean Cruise"
        ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-layout>
          <v-flex xs4>Location</v-flex>
          <v-flex
            xs8
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
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-layout>
          <v-spacer></v-spacer>
          <v-flex xs5>
            <v-select
              v-model="trip.location"
              :items="locations"
              chips
              flat
              solo
            ></v-select>
          </v-flex>

          <v-divider
            vertical
            class="mx-3"
          ></v-divider>

          <v-flex xs3>
            Select your destination of choice
            <br>
            <a href="javascript:void(0)">Learn more</a>
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="secondary"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-layout>
          <v-flex xs4>Start and end dates</v-flex>
          <v-flex
            xs8
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to travel?</span>
              <v-layout
                v-else
                style="width: 100%"
              >
                <v-flex xs6>Start date: {{ trip.start || 'Not set' }}</v-flex>
                <v-flex xs6>End date: {{ trip.end || 'Not set' }}</v-flex>
              </v-layout>
            </v-fade-transition>
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-layout justify-space-around>
          <v-flex xs3>
            <v-menu
              ref="startMenu"
              :close-on-content-click="false"
              :return-value.sync="date"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="trip.start"
                  label="Start date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="trip.start" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.startMenu.isActive = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.startMenu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs3>
            <v-menu
              ref="endMenu"
              :close-on-content-click="false"
              :return-value.sync="date"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="trip.end"
                  label="End date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="trip.end"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endMenu.isActive = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endMenu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
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
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Equador', 'France'],
    }),
  }
</script>
