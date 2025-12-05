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
                {{ latestBlog.author }}

                <v-btn
                  :to="latestBlog.to"
                  append-icon="mdi-page-next"
                  class="text-none px-0 ml-5"
                  color="primary"
                  text="Read more"
                  variant="plain"
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
                {{ item.author }}

                <v-btn
                  :to="item.to"
                  append-icon="mdi-page-next"
                  class="text-none px-0 ml-5"
                  color="primary"
                  text="Read more"
                  variant="plain"
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
        text="Read More Posts"
        variant="flat"
      />

    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const { smAndDown } = useDisplay()

  const items = [
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/october-hero.png',
      title: 'October 2025 Update',
      shortDescription: 'October\'s development cycle focused on polish and developer experience. We delivered critical accessibility improvements with enhanced focus trap functionality, optimized VDataTable performance, and refined components across the board. The month also saw the launch of Vuetify Link and significant updates to the Vuetify MCP server.',
      date: 'Nov 11, 2025',
      author: 'John Leider',
      to: rpath('/blog/october-2025-update'),
    },
    {
      title: 'September 2025 Update',
      shortDescription: 'Assembling the building blocks for Vuetify\'s next phase with our new Figma UI Kit and foundational v0 composables.',
      date: 'Oct 12, 2025',
      author: 'John Leider',
      to: rpath('/blog/september-2025-update'),
    },
    {
      title: 'August 2025 Update',
      shortDescription: 'Vuetify0 pre-alpha release, redesigned issues page, and powerful new components.',
      date: 'Sep 9, 2025',
      author: 'John Leider',
      to: rpath('/blog/august-2025-update'),
    },
  ]

  const latestBlog = computed(() => smAndDown.value ? null : items[0])
  const remainingBlogs = computed(() => smAndDown.value ? items : items.slice(1))
</script>
