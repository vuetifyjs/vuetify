<template>
  <v-row>
    <v-col
      v-for="(person, index) in direct"
      :key="index"
      cols="12"
      sm="6"
      md="5"
      xl="4"
    >
      <app-sheet class="text-center px-10 py-8">
        <v-avatar size="x-large" :image="person.image" />

        <div class="text-h6 text-high-emphasis mb-8">
          {{ person.name }}

          <small class="text-caption d-block text-medium-emphasis">
            {{ person.title }}
          </small>
        </div>

        <div class="text-h5 font-weight-black">
          <span class="text-high-emphasis">${{ person.price }}</span>

          <small class="font-weight-regular"> / {{ person.duration }}mins</small>
        </div>

        <br>
        <br>

        <v-btn
          :href="person.link"
          append-icon="mdi-open-in-new"
          block
          color="primary"
          target="_blank"
          variant="flat"
        >
          Book Now
        </v-btn>
      </app-sheet>
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
      image: 'https://avatars.githubusercontent.com/u/9064066?v=4',
    },
  ]
</script>
