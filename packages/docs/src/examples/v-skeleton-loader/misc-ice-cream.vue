<template>
  <div>
    <div class="text-center">
      <v-btn
        class="mb-12"
        size="x-large"
        @click="loading = !loading"
      >
        Toggle Loading
      </v-btn>
    </div>

    <v-card
      theme="dark"
      max-width="800"
      rounded="lg"
    >
      <v-container>
        <v-row>
          <v-col
            v-for="{ src, title, subtitle } in cards"
            :key="title"
            cols="12"
            md="6"
            lg="4"
          >
            <v-skeleton-loader
              :loading="loading"
              height="240"
              type="image, list-item-two-line"
            >
              <v-responsive>
                <v-img
                  :src="src"
                  class="rounded-lg mb-2"
                  cover
                  height="184"
                ></v-img>

                <v-list-item
                  :title="title"
                  :subtitle="subtitle"
                  class="px-0"
                ></v-list-item>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>

        <br>

        <v-chip
          border
          prepend-icon="mdi-check-circle"
          size="large"
          variant="text"
        >
          <template v-slot:prepend>
            <v-icon color="disabled"></v-icon>
          </template>

          <span class="text-subtitle-1">
            Homemade Dulce de Leche Ice Cream with Chocolate Chips
          </span>
        </v-chip>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        {
          title: 'Homemade Dulce de Leche Ice Cream with Chocolate Chips',
          subtitle: 'Happy Foods',
          src: 'https://cdn.vuetifyjs.com/docs/images/graphics/dulce-ice-cream.png',
        },
        {
          title: 'Salted Caramel Swirl Ice Cream',
          subtitle: 'Stone Kitchen',
          src: 'https://cdn.vuetifyjs.com/docs/images/graphics/salted-caramel-ice-cream.png',
        },
        {
          title: 'Peanut Butter No-Churn Ice Cream',
          subtitle: 'The Sweeter Side',
          src: 'https://cdn.vuetifyjs.com/docs/images/graphics/peanut-butter-ice-cream.png',
        },
      ],
      loading: true,
    }),
  }
</script>
