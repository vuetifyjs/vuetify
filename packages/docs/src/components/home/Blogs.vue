<template>
  <v-responsive class="py-16">
    <HomeCommonGradient opacity-class="opacity-10" />

    <v-container class="pt-0">
      <HomeCommonTitle
        :description="t('home.blogs.description')"
        :subtitle="t('home.blogs.subtitle')"
        :title="t('home.blogs.title')"
        class="mb-16"
      />

      <v-row class="text-left align-center justify-space-between">
        <v-col v-if="latestBlogs.length" cols="12" md="7">
          <v-card
            v-for="(blog, index) in latestBlogs"
            :key="index"
            :class="{ 'mb-8': index !== latestBlogs.length - 1 }"
            class="pr-10 overflow-hidden"
            color="transparent"
            flat
          >

            <v-card-subtitle class="pt-3 pb-1 text-title-small pl-0 text-medium-emphasis d-inline-flex align-center ga-1">
              <v-icon icon="$calendar" size="small" />

              {{ blog.date }}
            </v-card-subtitle>

            <v-card-title class="text-pre-wrap pl-0 pt-0">
              <router-link :to="blog.to" class="text-high-emphasis d-inline-flex">
                {{ blog.title }}
              </router-link>
            </v-card-title>

            <div class="text-medium-emphasis text-body-large pl-0">
              {{ blog.shortDescription }}
            </div>

            <!-- <v-img
              v-if="blog.image"
              :src="blog.image"
              gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)"
              max-height="150"
              rounded="lg"
              width="100%"
              cover
            /> -->

            <v-card-text class="pl-0 pt-2">
              <div class="d-flex align-center ga-2 text-title-small text-medium-emphasis">
                <v-avatar :image="blog.avatar" size="32" />

                {{ blog.author }}

                <v-spacer />

                <v-btn
                  :text="t('home.blogs.read-more')"
                  :to="blog.to"
                  append-icon="mdi-page-next"
                  class="text-none px-0 ml-5"
                  color="primary"
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
            <v-card-subtitle class="pt-5 text-body-small text-medium-emphasis d-inline-flex align-center ga-1">
              <v-icon icon="mdi-calendar" size="16" /> {{ item.date }}
            </v-card-subtitle>

            <v-card-title class="d-inline-block text-body-large pt-1">
              <router-link :to="item.to" class="text-high-emphasis d-inline-flex">
                {{ item.title }}
              </router-link>
            </v-card-title>

            <v-card-text
              :class="{ 'text-truncate': smAndDown }"
              class="text-medium-emphasis text-body-medium py-0"
            >
              {{ item.shortDescription?.substring(0, 115) + (item.shortDescription?.length > 300 ? '...' : '') }}
            </v-card-text>

            <v-card-text class="text-body-medium text-medium-emphasis pt-2">
              <div class="d-flex align-center ga-2 text-body-medium text-medium-emphasis">
                <v-avatar :image="item.avatar" size="22" />

                {{ item.author }}

                <v-spacer />

                <v-btn
                  :text="t('home.blogs.read-more')"
                  :to="item.to"
                  append-icon="mdi-page-next"
                  class="text-none px-0 ml-5"
                  color="primary"
                  size="small"
                  variant="plain"
                />
              </div>
            </v-card-text>

            <v-divider v-if="index !== remainingBlogs.length - 1" />
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        :aria-label="t('home.blogs.read-more-posts')"
        :text="t('home.blogs.read-more-posts')"
        :to="rpath('/blog/')"
        append-icon="mdi-open-in-new"
        class="text-none mt-10"
        color="primary"
        rel="noopener noreferrer"
        rounded="lg"
        size="large"
        target="_blank"
        variant="flat"
      />
    </v-container>
  </v-responsive>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const { smAndDown } = useDisplay()

  const items = [
    {
      title: 'December 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/december-2025-update/december-hero.png',
      shortDescription: 'December was our most productive month of 2025 with 522 commits across 16 repositories. The month delivered Vuetify 4.0.0-alpha.0 with CSS layers, six v3.11.x patches, the Vuetify CLI public release, Google OAuth for Vuetify One, PWA support across all ecosystem products, and 6 Vuetify0 releases with new composables including usePagination, useClickOutside, and useVirtual...',
      date: 'January 12, 2026',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/december-2025-update'),
    },
    {
      title: 'Vuetify Project baseline with Nuxt and UnoCSS',
      shortDescription: `Let's explore a lean, production-ready setup for Nuxt application that combines Vuetify 3 with UnoCSS. By disabling Vuetify's default CSS bundles (basic colors and utility classes) and generating only the styles actually used, the resulting CSS footprint shrinks dramatically. We will ensure the project foundation works with themes, typography, and breakpoints without compromises...`,
      date: 'December 22, 2025',
      author: 'Jacek Czarniecki',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/j-sek.png',
      to: rpath('/blog/building-with-nuxt-and-unocss'),
    },
    {
      title: 'November 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/november-hero.png',
      shortDescription: 'November delivered Vuetify v3.11.0 (Harbinger) with VCalendar and VHotkey promoted from labs, new VTimePicker input variant, VDatePicker MD3 improvements, and significant CLI progress. J-Sek contributed an impressive 14 PRs while the v0 project hit 109 commits across 5 releases...',
      date: 'December 10, 2025',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/november-2025-update'),
    },
    {
      title: 'October 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/october-hero.png',
      shortDescription: `October focused on refinement and reliability, delivering critical accessibility improvements with enhanced focus trap functionality, optimized VDataTable performance for large datasets, and refined components across the board. The month also saw the launch of Vuetify Link, our new URL shortening service, and significant updates to the Vuetify MCP server with HTTP transport support. We made substantial progress on v0 composables, laying the groundwork for Vuetify 4.0...`,
      date: 'Nov 11, 2025',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/october-2025-update'),
    },
    {
      title: 'September 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/september-2025-update/september-hero.png',
      shortDescription: `September marks significant progress as we assemble the building blocks for Vuetify's next phase. From revolutionary design-to-development workflows with our new Figma UI Kit to foundational v0 composables, September has been about connecting the pieces that will define the future of Vue development. This update includes the release of v3.10.0 (Argo), updated Figma UI Kit, new Vuetify0 composables, and over 60 bug fixes and features...`,
      date: 'Oct 12, 2025',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/september-2025-update'),
    },
    {
      title: 'August 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/august-2025-update/august-hero.png',
      shortDescription: `August marks a pivotal moment in Vuetify's evolution as we prepare to release the pre-alpha of Vuetify0 (v0), launch our redesigned issues page, and continue delivering powerful components and improvements. This month brings exciting developments including the "Mastering Vuetify Theming" webinar recap, VEditor final testing phase, free premium themes for personal use, and significant framework updates with 87 merged pull requests...`,
      date: 'Sep 9, 2025',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/august-2025-update'),
    },
    {
      title: 'July 2025 Update',
      image: 'https://cdn.vuetifyjs.com/docs/images/blog/july-2025-update/july-hero.png',
      shortDescription: 'July was a month of significant advancements in the Vuetify ecosystem, highlighted by the release of v3.9.0 (Zealot) and the promotion of VTreeview and VTimePicker from labs to core components. This update also includes a focus on component stability, bug fixes, and developer experience improvements, with subsequent patches up to v3.9.3...',
      date: 'August 6, 2025',
      author: 'John Leider',
      avatar: 'https://cdn.vuetifyjs.com/docs/images/team/john.png',
      to: rpath('/blog/july-2025-update'),
    },
  ]

  const latestBlogs = computed(() => smAndDown.value ? [] : items.slice(0, 2))
  const remainingBlogs = computed(() => smAndDown.value ? items.slice(0, 4) : items.slice(2, 6))
</script>
