<template>
  <v-responsive class="py-16">
    <HomeBgGradient />

    <v-container class="pt-0">
      <div class="mb-16 text-center">
        <p class="text-primary font-weight-bold mb-2">
          Latest news and updates
        </p>

        <h4 class="text-h4 font-weight-bold mb-2">
          Vuetify Blog
        </h4>

        <h6 class="text-h6 font-weight-regular text-medium-emphasis">
          Stay up to date with the latest news and updates from the Vuetify team.
        </h6>
      </div>

      <v-row align="center" class="text-left" justify="space-between">
        <v-col v-if="latestBlog" cols="12" md="7">
          <v-card
            class="pr-10"
            color="transparent"
            rounded="xl"
            flat
          >
            <v-card-subtitle class="pt-5 text-subtitle-2 pl-0">
              {{ latestBlog.date }}
            </v-card-subtitle>

            <v-card-title class="text-pre-wrap mb-2 pl-0">
              {{ latestBlog.title }}
            </v-card-title>

            <div class="text-medium-emphasis text-subtitle-1 pl-0">
              {{ latestBlog.shortDescription }}
            </div>

            <v-card-text class="pl-0">
              <div class="d-flex align-center ga-2 text-subtitle-2 text-medium-emphasis">
                <v-icon size="small">mdi-circle-edit-outline</v-icon>
                {{ latestBlog.personName }}

                <v-btn
                  class="text-none px-0 ml-5"
                  color="primary"
                  text="Read more"
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

            <v-card-text class="text-medium-emphasis text-subtitle-1 text-truncate py-0">
              {{ item.shortDescription }}
            </v-card-text>

            <v-card-text class="text-body-2 text-medium-emphasis pt-2">
              <div class="d-flex align-center ga-2 text-body-2 text-medium-emphasis">
                <v-icon size="small">mdi-circle-edit-outline</v-icon>
                {{ item.personName }}

                <v-btn
                  class="text-none px-0 ml-5"
                  color="primary"
                  size="small"
                  text="Read more"
                  variant="text"
                />
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
        class="text-none mt-10"
        color="primary"
        rel="noopener noreferrer"
        rounded="lg"
        size="large"
        target="_blank"
        variant="flat"
      >
        All Blogs
      </v-btn>

    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const { smAndDown } = useDisplay()

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
  ]

  const latestBlog = computed(() => smAndDown.value ? null : items[0])
  const remainingBlogs = computed(() => smAndDown.value ? items : items.slice(1))
</script>
