<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container class="pt-0">
      <HomeCommonTitle
        class="mb-16"
        description="Stay up to date with the latest news and updates from the Vuetify team."
        subtitle="Latest news and updates"
        title="Vuetify Blog"
      />

      <v-row align="center" class="text-left" justify="space-between">
        <v-col v-if="latestBlog" cols="12" md="7">
          <v-card
            class="pr-10 overflow-hidden"
            color="transparent"
            flat
          >
            <v-img
              v-if="latestBlog.image"
              :src="latestBlog.image"
              gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)"
              max-height="150"
              rounded="lg"
              width="100%"
              cover
            />

            <v-card-subtitle class="pt-3 pb-1 text-subtitle-2 pl-0">
              {{ latestBlog.date }}
            </v-card-subtitle>

            <v-card-title class="text-pre-wrap pl-0 pt-0">
              {{ latestBlog.title }}
            </v-card-title>

            <div class="text-medium-emphasis text-subtitle-1 pl-0">
              {{ latestBlog.shortDescription }}
            </div>

            <v-card-text class="pl-0 pt-2">
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

        <v-col cols="12" md="5">
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

            <v-card-text :class="{ 'text-truncate': smAndDown}" class="text-medium-emphasis text-subtitle-1 py-0">
              {{ item.shortDescription }}
            </v-card-text>

            <v-card-text class="text-body-2 text-medium-emphasis pt-2">
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
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
