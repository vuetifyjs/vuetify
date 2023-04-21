<template>
  <v-container>
    <div class="text-center mb-12">
      <v-btn
        size="x-large"
        @click="loading = !loading"
      >
        Toggle Loading
      </v-btn>
    </div>

    <v-row justify="center">
      <v-col
        class="mb-12"
        cols="12"
        md="6"
      >
        <div class="text-h5 text-center">
          Using slot
        </div>

        <v-skeleton-loader
          :loading="loading"
          type="list-item-two-line"
        >
          <v-list-item
            title="Title"
            subtitle="Subtitle"
            lines="two"
            rounded
          ></v-list-item>
        </v-skeleton-loader>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <div class="text-h5 text-center">
          Using if
        </div>

        <v-skeleton-loader
          v-if="loading"
          type="list-item-two-line"
        ></v-skeleton-loader>

        <v-list-item
          v-else
          title="Title"
          subtitle="Subtitle"
          lines="two"
          rounded
        ></v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: true,
    }),
  }
</script>
