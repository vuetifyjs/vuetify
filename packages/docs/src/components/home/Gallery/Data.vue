<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, i) in statItems"
        :key="i"
        cols="12"
        md="3"
        sm="6"
      >
        <v-card
          color="primary"
          elevation="0"
          rounded="lg"
          variant="tonal"
        >
          <v-card-item class="pt-4" height="64">
            <v-card-title class="py-0 text-caption">{{ item.subtitle }}</v-card-title>

            <v-card-title class="py-0">{{ item.title }}</v-card-title>

            <template #append>
              <v-icon :icon="item.icon" color="primary" size="30" />
            </template>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="my-5" elevation="0" rounded="lg" title="Recent Orders">
      <div class="px-4">
        <v-text-field
          v-model="search"
          density="compact"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          rounded
        />
      </div>

      <div class="px-4">
        <v-data-table :headers="headers" :items="tableItems" :search="search" hide-default-footer>
          <template #item.name="{ item }">
            <div class="d-flex align-center ga-4">
              <v-avatar :image="item.avatar" color="surface-light" />

              <span>{{ item.name }}</span>
            </div>
          </template>

          <template #item.status="{ item }">
            <v-chip :text="item.status" color="primary" size="small" label />
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-divider class="my-5" />

    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="0" rounded="lg" title="Transactions" border>
          <template #append>
            <div class="my-5" />
          </template>

          <template #text>
            <v-list-item
              v-for="(item, i) in listItems"
              :key="i"
              :class="i !== 0 && 'mt-4'"
              :subtitle="item.subtitle"
              :title="item.title"
              class="px-0"
              lines="one"
            >
              <template #prepend>
                <v-avatar
                  :icon="item.icon"
                  :text="item.initials"
                  color="primary"
                  variant="tonal"
                  rounded
                />
              </template>

              <template #append>
                <span class="text-subtitle-1 font-weight-regular">
                  {{ item.amount }}
                </span>
              </template>
            </v-list-item>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="0" rounded="lg" title="Summary" border>
          <template #append>
            <div class="my-5" />
          </template>

          <template #text>
            <v-list-item
              v-for="(item, i) in summaryItems"
              :key="i"
              :class="i !== 0 && 'mt-4'"
              class="px-0"
            >
              <template #prepend>
                <v-avatar :text="item.text" color="primary" size="large" variant="tonal" />
              </template>

              <template #title>
                <div class="d-flex justify-space-between align-center text-medium-emphasis">
                  <span>{{ item.title }}</span>

                  <span>{{ item.value }}</span>
                </div>
              </template>

              <template #subtitle>
                <div class="py-1">
                  <v-progress-linear
                    :model-value="item.progress"
                    bg-color="surface-light"
                    bg-opacity="1"
                    color="primary"
                    height="8"
                    rounded
                  />
                </div>
              </template>
            </v-list-item>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const search = shallowRef('')

  const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Amount', key: 'amount', value: item => `$${item.amount}` },
    { title: 'Vendor', key: 'vendor' },
    { title: 'Status', key: 'status' },
    { title: 'Rating', key: 'rating' },
  ]

  const tableItems = [
    {
      avatar: 'https://picsum.photos/id/244/200/300',
      name: 'Sports Shoes',
      amount: 149,
      vendor: 'Nike',
      status: 'Completed',
      rating: '5.0',
    },
    {
      avatar: 'https://picsum.photos/id/122/200/300',
      name: 'Headphones',
      amount: 79,
      vendor: 'Sony',
      status: 'Pending',
      rating: '4.5',
    },
    {
      avatar: 'https://picsum.photos/id/312/200/300',
      name: 'Smart Watch',
      amount: 299,
      vendor: 'Apple',
      status: 'Completed',
      rating: '4.8',
    },
    {
      avatar: 'https://picsum.photos/id/420/200/300',
      name: 'Wireless Mouse',
      amount: 29,
      vendor: 'Logitech',
      status: 'Completed',
      rating: '4.2',
    },
    {
      avatar: 'https://picsum.photos/id/600/200/300',
      name: 'Wireless Keyboard',
      amount: 49,
      vendor: 'Logitech',
      status: 'Cancelled',
      rating: '4.0',
    },
  ]

  const statItems = [
    {
      subtitle: 'Total subscribers',
      title: '23,412',
      icon: 'mdi-account-group-outline',
    },
    {
      subtitle: 'Total revenue',
      title: '$14,301',
      icon: 'mdi-star-outline',
    },
    {
      subtitle: 'Total orders',
      title: '402',
      icon: 'mdi-cart-outline',
    },
    {
      subtitle: 'Total products',
      title: '76',
      icon: 'mdi-shape-outline',
    },
  ]

  const listItems = [
    {
      title: 'John Leider',
      initials: 'JL',
      amount: '+$36.11',
      subtitle: '21 Mar 8:00PM',
    },
    {
      title: 'ATM withdrawal',
      initials: '$',
      amount: '-$20.00',
      subtitle: '21 Mar 6:00PM',
    },
    {
      title: 'Jane Doe',
      initials: 'JD',
      amount: '+$45.00',
      subtitle: '21 Mar 4:00PM',
    },
    {
      title: 'Amazon',
      initials: 'A',
      amount: '-$99.99',
      subtitle: '21 Mar 10:00AM',
    },
    {
      title: 'Water Bill',
      initials: 'W',
      amount: '-$25.00',
      subtitle: '16 Mar 9:00AM',
    },
    {
      title: 'Electricity Bill',
      initials: 'E',
      amount: '-$45.00',
      subtitle: '14 Mar 8:00AM',
    },
  ]

  const summaryItems = [
    {
      title: 'Revenue',
      progress: 80,
      text: 'R',
      value: '$47,230',
    },
    {
      title: 'Sales',
      progress: 60,
      text: 'S',
      value: '$14,345',
    },
    {
      title: 'Cost',
      progress: 40,
      text: 'C',
      value: '$12,345',
    },
    {
      title: 'Profit',
      progress: 20,
      text: 'P',
      value: '$34,567',
    },
  ]
</script>
