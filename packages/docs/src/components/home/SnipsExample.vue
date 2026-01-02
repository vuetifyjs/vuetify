<template>
  <v-container class="pa-md-6" fluid>
    <v-row>
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        md="6"
        sm="6"
      >
        <v-card
          class="mx-auto"
          elevation="2"
          rounded="lg"
        >
          <v-img
            :aspect-ratio="16/7"
            :src="item.image"
            class="cursor-pointer ma-2 mb-0 rounded-lg"
            cover
          />

          <div class="pt-1 pa-3">
            <div class="d-flex justify-space-between align-center">
              <span class="text-body-1 font-weight-bold text-truncate">{{ item.title }}</span>

              <v-btn
                color="grey"
                icon="mdi-heart"
                size="x-small"
                variant="text"
              />
            </div>

            <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
              <v-icon icon="mdi-calendar-blank-outline" size="small" />
              {{ item.createdAt }}
            </div>

          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const items = [
    {
      title: 'Misty Mountains',
      image: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af',
      createdAt: '1st Dec 2025',
    },
    {
      title: 'Lake Reflection',
      image: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f',
      createdAt: '2nd Dec 2025',
    },
    {
      title: 'Forest Sunrise',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
      createdAt: '3rd Dec 2025',
    },
    {
      title: 'Mountain Vista',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      createdAt: '4th Dec 2025',
    },
    {
      title: 'Lava Dripping',
      image: 'https://images.unsplash.com/photo-1475598322381-f1b499717dda',
      createdAt: '5th Dec 2025',
    },
    {
      title: 'Lightning Storm',
      image: 'https://images.unsplash.com/photo-1431440869543-efaf3388c585',
      createdAt: '6th Dec 2025',
    },
    {
      title: 'Rock Monolith',
      image: 'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b',
      creator: 'Natalie Smith',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      createdAt: '7th Dec 2025',
    },
    {
      title: 'Northern Lights',
      image: 'https://images.unsplash.com/photo-1491466424936-e304919aada7',
      creator: 'Jason Doe',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      createdAt: '8th Dec 2025',
    },
  ]
</script>
