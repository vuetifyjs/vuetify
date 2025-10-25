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

      <v-row align="center" class="text-left mb-10" justify="space-between">
        <v-col v-if="latestBlog" cols="12" md="7">
          <v-card
            color="transparent"
            rounded="xl"
            flat
          >
            <v-card-subtitle class="pt-5 text-subtitle-2">
              {{ latestBlog.date }}
            </v-card-subtitle>

            <v-card-title class="text-pre-wrap mb-2">
              {{ latestBlog.title }}
            </v-card-title>

            <div class="text-medium-emphasis text-subtitle-1 px-4">
              {{ latestBlog.shortDescription }}
            </div>

            <v-card-text>
              <div class="d-flex align-center ga-2 text-subtitle-2 text-medium-emphasis">
                <v-icon size="small">mdi-circle-edit-outline</v-icon>
                {{ latestBlog.personName }}

                <v-btn
                  append-icon="mdi-arrow-right"
                  class="text-none px-0 ml-5"
                  color="primary"
                  text="Continue reading"
                  variant="text"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          cols="12"
          md="5"
        >
          <v-card
            v-for="(item , index) in remainingBlogs"
            :key="index"
            class="d-flex flex-column"
            color="transparent"
            rounded="lg"
            flat
          >
            <v-card-subtitle class="pt-5 text-body-2">
              {{ item.date }}
            </v-card-subtitle>

            <v-card-title class="text-subtitle-1 pt-1">
              {{ item.title }}
            </v-card-title>

            <v-card-text class="text-body-2 text-medium-emphasis">
              <div class="d-flex align-center ga-2 text-body-2 text-medium-emphasis">
                <v-icon size="small">mdi-circle-edit-outline</v-icon>
                {{ item.personName }}
              </div>
            </v-card-text>

            <v-divider v-if="index !== remainingBlogs.length - 1" />
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        :to="rpath('/blog/')"
        append-icon="mdi-open-in-new"
        aria-label="See More Templates"
        class="text-none"
        color="primary"
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

<script setup lang="ts">
  const { mobile } = useDisplay()

  const items = [
    {
      title: 'August 2025 Update',
      shortDescription: 'August marks a pivotal moment in Vuetify’s evolution as we prepare to release the pre-alpha of Vuetify0 (v0), launch our redesigned issues page, and continue delivering powerful components and improvements. This month brings exciting developments including the “Mastering Vuetify Theming',
      date: 'Apr 5, 2023',
      personName: 'John Leider',
    },
    {
      title: 'July 2025 Update',
      shortDescription: 'Earum molestias dolores autem quam natus. Aut velit fugiat excepturi minus voluptatem rerum voluptas. Ea rerum nemo quaerat...',
      date: 'Sep 15, 2023',
      personName: 'John Leider',
    },
    {
      title: 'State of the Union 2024 - Post Mortem',
      shortDescription: 'Qui voluptatum molestiae sint et atque facere. Distinctio ipsum voluptatum asperiores fuga consequatur aliquam.',
      date: 'Feb 20, 2022',
      personName: 'John Leider',
    },
    {
      title: 'Building a Basic Nuxt Application with Vuetify',
      shortDescription: 'Qui voluptatum molestiae sint et atque facere. Distinctio ipsum voluptatum asperiores fuga consequatur aliquam.',
      date: 'Feb 20, 2022',
      personName: 'John Leider',
    },
  ]

  const latestBlog = computed(() => mobile.value ? null : items[0])
  const remainingBlogs = computed(() => mobile.value ? items : items.slice(1))
</script>
