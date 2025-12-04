<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, i) in statItems"
        :key="i"
        cols="6"
        md="3"
      >
        <v-list
          elevation="0"
          lines="two"
          rounded="lg"
          border
        >
          <v-list-item>
            <v-list-item-title class="text-caption">{{ item.subtitle }}</v-list-item-title>

            <v-list-item-title>{{ item.title }}</v-list-item-title>

            <template #append>
              <v-icon :color="item.color" :icon="item.icon" size="30" />
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-card class="my-5" elevation="0" rounded="lg" title="Recent Orders" border>
      <template #text>
        <v-text-field
          v-model="search"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          rounded
        />

        <v-data-table :headers="headers" :items="tableItems" :search="search" hide-default-footer>
          <template #item.name="{ item }">
            <div class="d-flex align-center ga-4">
              <v-avatar :image="item.avatar" color="surface-light" />

              <span>{{ item.name }}</span>
            </div>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="item.status === 'Completed' ? 'success' : 'warning'"
              :text="item.status"
              border="current sm"
              size="x-small"
              label
            />
          </template>

          <template #item.rating="{ item }">
            <div class="d-flex align-center justify-end">
              ({{ item.rating }})

              <v-icon color="orange" icon="mdi-star" />
            </div>
          </template>
        </v-data-table>
      </template>
    </v-card>

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
                  :color="item.color"
                  :icon="item.icon"
                  :text="item.initials"
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
    { title: 'Rating', key: 'rating', align: 'end' },
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
      color: 'blue',
    },
    {
      subtitle: 'Total revenue',
      title: '$14,301',
      icon: 'mdi-star-outline',
      color: 'green',
    },
    {
      subtitle: 'Total orders',
      title: '402',
      icon: 'mdi-cart-outline',
      color: 'orange',
    },
    {
      subtitle: 'Total products',
      title: '76',
      icon: 'mdi-shape-outline',
      color: 'red',
    },
  ]

  const listItems = [
    {
      title: 'John Leider',
      initials: 'JL',
      amount: '+$36.11',
      subtitle: '21 Mar 8:00PM',
      color: 'success',
    },
    {
      title: 'ATM withdrawal',
      initials: '$',
      amount: '-$20.00',
      subtitle: '21 Mar 6:00PM',
      color: 'warning',
    },
    {
      title: 'Jane Doe',
      initials: 'JD',
      amount: '+$45.00',
      subtitle: '21 Mar 4:00PM',
      color: 'success',
    },
    {
      title: 'Amazon',
      initials: 'A',
      amount: '-$99.99',
      subtitle: '21 Mar 10:00AM',
      color: 'orange',
    },
    {
      title: 'Water Bill',
      initials: 'W',
      amount: '-$25.00',
      subtitle: '16 Mar 9:00AM',
      color: 'info',
    },
    {
      title: 'Electricity Bill',
      initials: 'E',
      amount: '-$45.00',
      subtitle: '14 Mar 8:00AM',
      color: 'purple',
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
