<template>
  <v-item-group selected-class="primary">
    <v-container>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ selected, selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center', selectedClass]"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="selected"
                  class="display-3 flex-grow-1 text-center"
                >
                  Selected
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
