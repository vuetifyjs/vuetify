<template>
  <div>
    <div class="text-center">
      <v-btn
        size="x-large"
        class="mb-12"
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
              type="image, list-item-two-line"
              height="240"
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
          src: 'https://media.istockphoto.com/id/1428437700/photo/mini-cookies-and-cream-cheesecakes.jpg?s=1024x1024&w=is&k=20&c=uX9YiCbNiN-GkjnQdYncnfqi2SrlHM1e4HzFVM5sOks=',
        },
        {
          title: 'Salted Caramel Swirl Ice Cream',
          subtitle: 'Stone Kitchen',
          src: 'https://media.istockphoto.com/id/1296474411/photo/piece-of-sachertorte-sachr-cake-on-white-plate-top-view-copy-space.jpg?s=1024x1024&w=is&k=20&c=KScDPSoeX-Fe9dajh2bYKKYSUQwsILxJtUhK2HV7k38=',
        },
        {
          title: 'Peanut Butter No-Churn Ice Cream',
          subtitle: 'The Sweeter Side',
          src: 'https://media.istockphoto.com/id/1429640388/photo/vanilla-ice-cream-cup-dessert-with-brownie-and-hot-fudge-syrup-with-spoon-in-female-hand.jpg?s=1024x1024&w=is&k=20&c=iGx_rGJSGThmIwG5ywNcKkyPIFVytY9fLsGI762q_OQ=',
        },
      ],
      loading: true,
    }),
  }
</script>
