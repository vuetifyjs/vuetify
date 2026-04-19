<template>
  <v-row>
    <v-col
      v-for="(person, index) in direct"
      :key="index"
      cols="12"
      md="5"
      sm="6"
      xl="4"
    >
      <AppSheet class="text-center px-10 py-8">
        <v-avatar :image="person.image" size="x-large" />

        <div class="text-title-large text-high-emphasis mb-8">
          {{ person.name }}

          <small class="text-body-small d-block text-medium-emphasis">
            {{ person.title }}
          </small>
        </div>

        <div class="text-headline-small font-weight-black">
          <span class="text-high-emphasis">${{ person.price }}</span>

          <small class="font-weight-regular"> / {{ person.duration }}mins</small>
        </div>

        <br>
        <br>

        <v-btn
          :href="person.link"
          append-icon="mdi-open-in-new"
          color="primary"
          target="_blank"
          variant="flat"
          block
        >
          Book Now
        </v-btn>
      </AppSheet>
    </v-col>
  </v-row>
</template>

<script setup>
  const direct = [
    {
      name: 'John Leider',
      title: 'Author of Vuetify',
      price: 180,
      duration: 60,
      link: 'https://l.kintell.com/M9y7D7',
      image: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
    },
  ]
</script>
