<template>
  <div>
    <v-container
      class="bg-surface-variant mb-6"
    >
      <v-row
        class="align-start"
        style="height: 150px;"
      >
        <v-col
          v-for="n in 3"
          :key="n"
        >
          <v-sheet class="pa-2">
            align-start
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="bg-surface-variant mb-6"
    >
      <v-row
        class="align-center"
        style="height: 150px;"
      >
        <v-col
          v-for="n in 3"
          :key="n"
        >
          <v-sheet class="pa-2">
            align-center
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="bg-surface-variant mb-6"
    >
      <v-row
        class="align-end"
        style="height: 150px;"
      >
        <v-col
          v-for="n in 3"
          :key="n"
        >
          <v-sheet class="pa-2">
            align-end
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="bg-surface-variant">
      <v-row style="height: 150px;">
        <v-col class="align-self-start">
          <v-sheet class="pa-2">
            align-self-start
          </v-sheet>
        </v-col>

        <v-col class="align-self-center">
          <v-sheet class="pa-2">
            align-self-center
          </v-sheet>
        </v-col>

        <v-col class="align-self-end">
          <v-sheet class="pa-2">
            align-self-end
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
