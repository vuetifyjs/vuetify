<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ isSelected, selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center', selectedClass]"
              dark
              height="200"
              @click="toggle"
            >
              <div
                class="text-h3 flex-grow-1 text-center"
              >
                {{ isSelected ? 'Selected' : 'Click Me!' }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script></script>
