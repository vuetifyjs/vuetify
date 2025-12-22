<template>
  <div class="d-flex my-6 justify-center">
    <v-card class="pa-6" elevation="2" rounded="xl">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-truncate mr-6">Expenses</div>
        <v-select
          v-model="selectedGroup"
          :items="['Transactions', 'Other']"
          density="compact"
          max-width="200"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-select>
      </v-card-title>

      <v-pie
        :key="selectedGroup"
        :items="currentItems"
        :legend="{ position: $vuetify.display.mdAndUp ? 'right' : 'bottom' }"
        :tooltip="{ subtitleFormat: '[value]%' }"
        class="pa-3 mt-3 justify-center"
        gap="2"
        inner-cut="70"
        item-key="id"
        rounded="2"
        size="300"
        animation
        hide-slice
        reveal
      >
        <template v-slot:center>
          <div class="text-center">
            <div class="text-h3">130</div>
            <div class="opacity-70 mt-1 mb-n1">Total</div>
          </div>
        </template>

        <template v-slot:legend="{ items, toggle, isActive }">
          <v-list class="py-0 mb-n5 mb-md-0 bg-transparent" density="compact" width="300">
            <v-list-item
              v-for="item in items"
              :key="item.key"
              :class="['my-1', { 'opacity-40': !isActive(item) }]"
              :title="item.title"
              rounded="lg"
              link
              @click="toggle(item)"
            >
              <template v-slot:prepend>
                <v-avatar :color="item.color" :size="16"></v-avatar>
              </template>
              <template v-slot:append>
                <div class="font-weight-bold">{{ item.value }}%</div>
              </template>
            </v-list-item>
          </v-list>
        </template>
      </v-pie>
    </v-card>
  </div>

  <div class="h-0">
    <svg height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="pattern-0"
          height="20"
          patternTransform="rotate(145) scale(.2)"
          patternUnits="userSpaceOnUse"
          width="20"
        >
          <path d="M0 10h20zm0 20h20zm0 20h20zm0 20h20z" fill="none" stroke="rgb(var(--v-theme-surface))" stroke-width="3" />
        </pattern>
      </defs>
    </svg>
  </div>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const selectedGroup = shallowRef('Transactions')
  const currentItems = toRef(() => selectedGroup.value === 'Transactions'
    ? [
      { id: 1, title: 'House & Bills', value: 40, color: 'rgba(var(--v-theme-on-surface), .2)', pattern: 'url(#pattern-0)' },
      { id: 2, title: 'Transportation', value: 25, color: 'rgba(255, 151, 215, .4)' },
      { id: 3, title: 'Entertainment', value: 20, color: 'rgba(255, 151, 215, .6)' },
      { id: 4, title: 'Food', value: 10, color: 'rgba(255, 151, 215, .8)' },
      { id: 5, title: 'Other', value: 5, color: 'rgba(255, 151, 215, 1)' },
    ]
    : [
      { id: 1, title: 'OSS Donations', value: 37, color: '#767119' },
      { id: 2, title: 'Travel', value: 22, color: '#9e850d' },
      { id: 3, title: 'Investment', value: 20, color: '#cb9700' },
      { id: 4, title: 'Books', value: 11, color: '#ffa600' },
    ])
</script>

<script>
  export default {
    data: () => ({
      selectedGroup: 'Transactions',
    }),
    computed: {
      currentItems () {
        return this.selectedGroup === 'Transactions'
          ? [
            { id: 1, title: 'House & Bills', value: 40, color: 'rgba(var(--v-theme-on-surface), .2)', pattern: 'url(#pattern-0)' },
            { id: 2, title: 'Transportation', value: 25, color: 'rgba(255, 151, 215, .4)' },
            { id: 3, title: 'Entertainment', value: 20, color: 'rgba(255, 151, 215, .6)' },
            { id: 4, title: 'Food', value: 10, color: 'rgba(255, 151, 215, .8)' },
            { id: 5, title: 'Other', value: 5, color: 'rgba(255, 151, 215, 1)' },
          ]
          : [
            { id: 1, title: 'OSS Donations', value: 37, color: '#767119' },
            { id: 2, title: 'Travel', value: 22, color: '#9e850d' },
            { id: 3, title: 'Investment', value: 20, color: '#cb9700' },
            { id: 4, title: 'Books', value: 11, color: '#ffa600' },
          ]
      },
    },
  }
</script>
