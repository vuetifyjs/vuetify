<template>
  <v-card class="mx-auto" max-width="420" title="Team sync">
    <v-card-text>
      <v-date-time-input
        v-model="start"
        default-time="10:00"
        label="Starts"
        prepend-icon=""
      >
        <template v-slot:append-inner>
          <v-chip :text="zone" size="small" label></v-chip>
        </template>
      </v-date-time-input>

      <v-list v-if="start" density="compact">
        <v-list-subheader>Same moment for the team</v-list-subheader>

        <v-list-item
          v-for="city in cities"
          :key="city.zone"
          :subtitle="city.zone"
          :title="city.name"
        >
          <template v-slot:append>
            {{ formatIn(city.zone) }}
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const cities = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
  ]

  const zone = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .formatToParts()
    .find(part => part.type === 'timeZoneName').value

  const start = shallowRef(null)

  function formatIn (timeZone) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(start.value))
  }
</script>
