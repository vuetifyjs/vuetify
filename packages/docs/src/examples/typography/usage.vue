<template>
  <div>
    <v-item-group
      v-model="model"
      class="pa-2 mb-4 d-flex justify-center"
      mandatory
    >
      <v-item
        v-for="([icon, bp, size], i) in sizes"
        :key="i"
        :value="size"
      >
        <template v-slot="{ active, toggle }">
          <div
            :class="active ? 'text--primary' : 'text--secondary'"
            class="ma-3 text-center"
          >
            <v-icon
              :color="active ? 'grey darken-4' : 'grey lighten-1'"
              class="pa-1 mb-1"
              @click="toggle"
              v-text="icon"
            ></v-icon>

            <div
              class="caption"
              v-text="bp"
            ></div>
          </div>
        </template>
      </v-item>
    </v-item-group>

    <v-card class="text-center pa-4">
      <v-typography :size="model">
        The quick brown fox jumped over the lazy dog.
      </v-typography>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      model: 'caption',
      sizes: [
        ['mdi-devices', 'all', 'caption'],
        ['mdi-cellphone-iphone', 'sm', 'body-2'],
        ['mdi-laptop', 'md', 'body-1'],
        ['mdi-monitor', 'lg', 'title'],
        ['mdi-television', 'xl', 'display-1'],
      ],
    }),
  }
</script>
