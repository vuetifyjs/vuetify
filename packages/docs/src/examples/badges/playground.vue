<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="space-between"
      style="flex-grow: 0;"
    >
      <v-col>
        <v-select
          v-model="color"
          :items="colors"
          style="width: 250px;"
          label="Color"
        ></v-select>
      </v-col>

      <v-col>
        <v-switch
          v-model="left"
          label="Left"
        ></v-switch>
      </v-col>

      <v-col>
        <v-switch
          v-model="bottom"
          label="Bottom"
        ></v-switch>
      </v-col>

      <v-col>
        <v-switch
          v-model="overlap"
          label="Overlap"
        ></v-switch>
      </v-col>

      <v-col
        cols="12"
        class="text-center"
      >
        <v-badge
          :bottom="bottom"
          :color="color"
          :left="left"
          :overlap="overlap"
          class="align-self-center"
        >
          <template v-slot:badge>
            <span>!</span>
          </template>
          <v-icon
            large
            color="grey"
          >
            mail
          </v-icon>
        </v-badge>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      bottom: false,
      color: 'primary',
      colors: ['primary', 'accent', 'warning lighten-2', 'teal', 'error lighten-2'],
      left: false,
      overlap: true,
    }),
  }
</script>
