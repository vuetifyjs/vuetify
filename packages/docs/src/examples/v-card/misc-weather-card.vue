<template>
  <v-card
    class="mx-auto"
    max-width="368"
  >
    <v-card-item>
      <v-card-title class="text-h5">Florida</v-card-title>

      <v-card-subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="mr-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" hide-gutters no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          64&deg;F
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon size="88" color="error" icon="mdi-weather-hurricane"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item density="compact">
      <v-list-item-avatar left>
        <v-icon icon="mdi-weather-windy"></v-icon>
      </v-list-item-avatar>

      <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
    </v-list-item>

    <v-list-item density="compact">
      <v-list-item-avatar left>
        <v-icon icon="mdi-weather-pouring"></v-icon>
      </v-list-item-avatar>

      <v-list-item-subtitle>48%</v-list-item-subtitle>
    </v-list-item>

    <v-expand-transition>
      <div v-if="expand">
        <v-slider
          v-model="time"
          :max="6"
          :step="1"
          :ticks="labels"
          class="mx-4"
          color="primary"
          density="compact"
          hide-details
          show-ticks="always"
          thumb-size="10"
        ></v-slider>

        <v-list class="transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
            :title="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn @click="expand = !expand">
        Full Report
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
      expand: false,
      time: 0,
      forecast: [
        { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
        { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
        { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
      ],
    }),
  }
</script>
