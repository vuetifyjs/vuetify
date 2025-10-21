<template>
  <v-responsive class="py-16">
    <HomeBgGradient />

    <v-container class="pt-0">
      <div class="mb-10">
        <p class="text-primary font-weight-bold mb-0">
          Latest news and updates
        </p>

        <h4 class="text-h4 font-weight-bold my-3">
          Vuetify Blog
        </h4>

        <v-responsive class="mx-auto mb-5" max-width="700">
          <h6 class="text-h6 font-weight-regular text-medium-emphasis">
            Stay up to date with the latest news and updates from the Vuetify team.
          </h6>
        </v-responsive>
      </div>

      <v-row class="text-left mb-10">
        <v-col
          v-for="(item , i) in items"
          :key="i"
          class="d-flex"
          cols="12"
          md="4"
        >
          <v-card
            class="d-flex flex-column pa-4"
            rounded="lg"
            border
            flat
            link
          >
            <p class="text-caption text-medium-emphasis mb-0">{{ item.date }}</p>

            <p class="mb-1">{{ item.title }}</p>

            <p class="text-medium-emphasis mt-1 mb-1 flex-grow-1">
              {{ item.shortDescription }}
            </p>

            <div class="d-flex align-center ga-2 text-medium-emphasis">
              <v-icon size="small">mdi-circle-edit-outline</v-icon>
              {{ item.personName }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        append-icon="mdi-open-in-new"
        aria-label="See More Templates"
        class="text-none"
        color="primary"
        href="https://store.vuetifyjs.com"
        rel="noopener noreferrer"
        rounded="lg"
        size="large"
        target="_blank"
        variant="flat"
      >
        View More
      </v-btn>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const items = [
    {
      title: 'Enhance Your Lead Conversion Strategies',
      shortDescription: 'Culpa anim laboris consequat excepteur dolor ex adipisicing ea aliquip veniam. Officia duis mollit id labore. Duis labore ex minim anim nulla minim dolore amet...',
      date: 'Apr 5, 2023',
      personName: 'John Leider',
    },
    {
      title: 'Leveraging SEO to Boost Sales Effectively',
      shortDescription: 'Earum molestias dolores autem quam natus. Aut velit fugiat excepturi minus voluptatem rerum voluptas. Ea rerum nemo quaerat...',
      date: 'Sep 15, 2023',
      personName: 'Heather Leider',
    },
    {
      title: 'Optimizing Customer Engagement',
      shortDescription: 'Qui voluptatum molestiae sint et atque facere. Distinctio ipsum voluptatum asperiores fuga consequatur aliquam.',
      date: 'Feb 20, 2022',
      personName: 'Kael Watts-Deuchar',
    },
  ]

</script>
