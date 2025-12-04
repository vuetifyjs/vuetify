<template>
  <v-container class="pa-md-6" fluid>
    <v-row dense>
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        md="6"
        sm="6"
      >
        <v-hover v-slot="{ isHovering, props: hoverProps }">
          <v-card
            class="mx-auto pa-2"
            elevation="2"
            rounded="lg"
            variant="elevated"
            v-bind="hoverProps"
          >
            <v-img
              :aspect-ratio="16/9"
              :src="item.image"
              class="cursor-pointer"
              block
              cover
            >
              <div class="fill-height d-flex align-center justify-center">
                <v-fade-transition>
                  <div v-if="isHovering" class="fill-height w-100 d-flex align-top justify-end pa-2">
                    <v-btn
                      :ripple="false"
                      class="text-none"
                      color="white"
                      icon="mdi-eye"
                      size="small"
                      variant="tonal"
                    />
                  </div>
                </v-fade-transition>
              </div>
            </v-img>

            <div class="d-flex justify-space-between mt-3 align-center">
              <span class="text-body-1 font-weight-bold text-truncate">{{ item.title }}</span>
              <span class="text-medium-emphasis text-caption">{{ item.createdAt }}</span>
            </div>

            <div class="d-flex align-center ga-2 mt-1">
              <v-avatar :image="item.avatar" size="24" />
              <span class="text-medium-emphasis text-caption">Published by {{ item.creator }}</span>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const items = [
    {
      title: 'Misty Mountains',
      image: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af',
      creator: 'John Leider',
      avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
      createdAt: '2024-01-15',
    },
    {
      title: 'Lake Reflection',
      image: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f',
      creator: 'Hayden Brown',
      avatar: 'https://randomuser.me/api/portraits/women/74.jpg',
      createdAt: '2024-02-10',
    },
    {
      title: 'Forest Sunrise',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
      creator: 'Mo Hassan',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      createdAt: '2024-03-15',
    },
    {
      title: 'Mountain Vista',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      creator: 'Sara Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/71.jpg',
      createdAt: '2024-04-20',
    },
    {
      title: 'Lava Dripping',
      image: 'https://images.unsplash.com/photo-1475598322381-f1b499717dda',
      creator: 'Matt Barrie',
      avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
      createdAt: '2024-04-20',
    },
    {
      title: 'Lightning Storm',
      image: 'https://images.unsplash.com/photo-1431440869543-efaf3388c585',
      creator: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      createdAt: '2024-04-20',
    },
    {
      title: 'Rock Monolith',
      image: 'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b',
      creator: 'Natalie Smith',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      createdAt: '2024-04-20',
    },
    {
      title: 'Northern Lights',
      image: 'https://images.unsplash.com/photo-1491466424936-e304919aada7',
      creator: 'Jason Doe',
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      createdAt: '2024-04-20',
    },
  ]
</script>
