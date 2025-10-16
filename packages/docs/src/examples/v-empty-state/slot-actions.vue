<template>
  <v-empty-state image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png">
    <template v-slot:title>
      <div class="text-subtitle-2 mt-8">
        Manage your inventory transfers
      </div>
    </template>

    <template v-slot:text>
      <div class="text-caption">
        Track and receive your incoming inventory from suppliers
      </div>
    </template>

    <template v-slot:actions>
      <v-btn
        class="text-none"
        color="white"
        elevation="1"
        rounded="lg"
        size="small"
        text="Learn more"
        width="96"
      ></v-btn>

      <v-btn
        class="text-none"
        elevation="1"
        rounded="lg"
        size="small"
        text="Add transfer"
        width="96"
      ></v-btn>
    </template>
  </v-empty-state>
</template>
