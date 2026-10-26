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
  import posts from '@/data/blog.json'

  const { t } = useI18n()
  const { smAndDown } = useDisplay()

  const items = posts.map(post => ({
    ...post,
    to: rpath(post.to),
  }))

  const latestBlogs = computed(() => smAndDown.value ? [] : items.slice(0, 2))
  const remainingBlogs = computed(() => smAndDown.value ? items.slice(0, 4) : items.slice(2, 6))
</script>
