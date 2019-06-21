<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="multiple" label="Multiple"></v-switch>
      <v-switch v-model="mandatory" label="Mandatory"></v-switch>
      <v-switch v-model="showArrows" label="Show arrows"></v-switch>
      <v-switch v-model="prevIcon" label="Custom prev icon"></v-switch>
      <v-switch v-model="nextIcon" label="Custom next icon"></v-switch>
      <v-switch v-model="centerActive" label="Center active item"></v-switch>
    </v-layout>

    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="800"
    >
      <v-slide-group
        v-model="model"
        class="pa-3"
        :prev-icon="prevIcon ? 'mdi-minus' : undefined"
        :next-icon="nextIcon ? 'mdi-plus' : undefined"
        :multiple="multiple"
        :mandatory="mandatory"
        :show-arrows="showArrows"
        :center-active="centerActive"
      >
        <v-slide-item
          v-for="n in 15"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-3"
            height="200"
            width="100"
            @click="toggle"
          >
            <v-layout
              align-center
              fill-height
              justify-center
            >
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-layout>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      model: null,
      multiple: false,
      mandatory: false,
      showArrows: true,
      prevIcon: false,
      nextIcon: false,
      centerActive: false,
    }),
  }
</script>
