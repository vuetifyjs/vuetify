<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-slider
          v-model="size"
          class="pt-6"
          hide-details
          label="Size"
          max="4"
          min="0"
          step="1"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ modelValue }">
            <div class="text-no-wrap">
              {{ sizes[modelValue] }}
            </div>
          </template>
        </v-slider>
      </v-col>

      <v-col cols="12" md="6">
        <v-slider
          v-model="density"
          class="pt-6"
          hide-details
          label="Density"
          max="2"
          min="0"
          step="1"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ modelValue }">
            <div class="text-no-wrap">
              {{ densities[modelValue] }}
            </div>
          </template>
        </v-slider>
      </v-col>

      <v-divider class="flex-grow-1 my-2 mx-n1"></v-divider>

      <v-col cols="12">
        <v-list-subheader>Buttons</v-list-subheader>

        <v-btn
          :size="sizes[size]"
          :density="densities[density]"
          class="me-2 mb-2"
          prepend-icon="$vuetify"
          text="Default Button"
        ></v-btn>

        <v-btn
          :size="sizes[size]"
          :density="densities[density]"
          append-icon="mdi-account-outline"
          class="me-2 mb-2"
          text="User Profile"
          variant="tonal"
        ></v-btn>

        <v-btn
          icon="$vuetify"
          :size="sizes[size]"
          :density="densities[density]"
          class="me-2 mb-2"
        ></v-btn>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Chips</v-list-subheader>

        <v-chip
          :density="densities[density]"
          :size="sizes[size]"
          class="me-2 mb-2"

          text="Complete"
        ></v-chip>

        <v-chip
          text="Reset"
          :size="sizes[size]"
          :density="densities[density]"
          class="me-2 mb-2"
          variant="outlined"
        ></v-chip>

        <v-chip
          text="Disabled"
          :size="sizes[size]"
          :density="densities[density]"
          class="me-2 mb-2"
          disabled
        ></v-chip>
      </v-col>

      <v-col cols="12">
        <v-list-subheader>Avatars</v-list-subheader>

        <v-avatar
          :size="sizes[size]"
          :density="densities[density]"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/grass.png"
          color="surface-variant"
        ></v-avatar>

        <v-avatar
          :size="sizes[size]"
          :density="densities[density]"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/gold.png"
          class="ms-2"
        ></v-avatar>

        <v-avatar
          :size="sizes[size]"
          :density="densities[density]"
          image="https://cdn.vuetifyjs.com/docs/images/avatars/planet.png"
          color="surface-variant"
          class="ms-2"
        ></v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const size = shallowRef(2)
  const density = shallowRef(2)

  const densities = ['compact', 'comfortable', 'default']
  const sizes = ['x-small', 'small', 'default', 'large', 'x-large']
</script>
