<template>
  <v-container class="pa-2">
    <v-row>
      <v-col cols="12">
        <v-label class="d-block mb-4">Size Scale</v-label>

        <v-btn-toggle
          v-model="size"
          variant="outlined"
          class="overflow-auto"
          density="compact"
          direction="vertical"
          divided
        >
          <v-btn text="X-small" value="x-small"></v-btn>

          <v-btn text="Small" value="small"></v-btn>

          <v-btn text="Default" value="default"></v-btn>

          <v-btn text="Large" value="large"></v-btn>

          <v-btn text="x-large" value="x-large"></v-btn>
        </v-btn-toggle>
      </v-col>

      <v-divider class="flex-grow-1 my-2 mx-n1"></v-divider>

      <v-col cols="12">
        <v-list-subheader>Buttons</v-list-subheader>

        <v-btn
          :size="size"
          text="Export"
          class="me-2 mb-2"
        ></v-btn>

        <v-btn
          :size="size"
          class="me-2 mb-2"
          text="Edit"
          variant="text"
        ></v-btn>

        <v-btn
          :size="size"
          class="me-2 mb-2"
          text="Preview"
          variant="outlined"
        ></v-btn>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Chips</v-list-subheader>

        <v-chip
          :size="size"
          class="me-2 mb-2"
          text="Completed"
        ></v-chip>

        <v-chip
          :size="size"
          class="me-2 mb-2"
          text="Archived"
        ></v-chip>

        <v-chip
          :size="size"
          class="me-2 mb-2"
          text="New"
        ></v-chip>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Ratings</v-list-subheader>

        <v-rating
          :size="size"
          label="Customer Satisfaction"
          length="3"
        ></v-rating>

        <br>

        <v-rating
          :size="size"
          label="Ease of Use"
          length="4"
        ></v-rating>

        <br>

        <v-rating
          :size="size"
          label="Quality"
        ></v-rating>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Avatars</v-list-subheader>

        <v-avatar
          :size="size"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/dark.png"
          class="mb-2 me-2"
        ></v-avatar>

        <v-avatar
          :size="size"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/blackhole.png"
          class="mb-2 me-2"
        ></v-avatar>

        <v-avatar
          :size="size"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/meteor.png"
          class="mb-2 me-2"
        ></v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const size = shallowRef('default')
</script>
