<template>
  <div class="border rounded my-6">
    <v-autocomplete
      v-model="search"
      :items="releases"
      :loading="store.isLoading"
      :menu-props="menuProps"
      :placeholder="tag"
      hide-details
      density="comfortable"
      item-title="name"
      label="Select Release Version"
      persistent-placeholder
      prepend-inner-icon="mdi-text-box-search-outline"
      return-object
    >
      <template #selection>
        <div class="d-flex align-center">
          <div class="me-1">{{ search?.tag_name }}</div>

          &mdash;

          <template v-for="(value, key) in reactions" :key="key">
            <template v-if="search?.reactions?.[key]">
              <span class="d-inline-flex align-center text-body-2 me-2">
                {{ value }}

                <span class="text-caption">{{ search.reactions[key] }}</span>
              </span>
            </template>
          </template>
        </div>
      </template>

      <template #item="{ item, props: itemProps }">
        <v-list-item
          v-if="item?.title"
          v-bind="itemProps"
        />

        <template v-else>
          <v-divider />

          <v-list-item
            :title="t('load-more')"
            class="mb-n2"
            @click="store.fetch"
          />
        </template>
      </template>
    </v-autocomplete>

    <v-card
      variant="flat"
      rounded="t-0 b"
    >
      <div
        v-if="search?.author"
        class="d-flex justify-space-between"
      >
        <v-list-item v-if="publishedOn" lines="two">
          <v-list-item-title class="d-flex align-center">
            <i18n-t keypath="published">
              <template #date>
                <v-chip
                  :text="publishedOn"
                  class="ms-2 text-caption"
                  density="comfortable"
                  label
                  variant="flat"
                />
              </template>
            </i18n-t>
          </v-list-item-title>
        </v-list-item>

        <div class="pe-3 d-flex align-center flex-1-0-auto">
          <app-tooltip-btn
            v-for="(tooltip, i) in tooltips"
            :key="i"
            :href="tooltip.href"
            :icon="tooltip.icon"
            :path="tooltip.path"
            :color="tooltip.color ?? 'text-high-emphasis'"
            :target="tooltip.href ? '_blank' : undefined"
            class="text-white ms-2"
            density="comfortable"
            size="small"
            variant="flat"
            @click="tooltip?.onClick?.()"
          />
        </div>
      </div>

      <template v-if="search?.body && !store.isLoading">
        <v-divider />

        <div class="px-4 pt-4">
          <app-markdown
            v-if="search?.body"
            :content="search.body"
            class="releases"
          />
        </div>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useDate } from 'vuetify/labs/date'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'

  // Stores
  import { Release, useReleasesStore } from '@/store/releases'

  // Utilities
  import { computed, onBeforeMount, ref, watch } from 'vue'
  import { version } from 'vuetify'
  import { wait } from '@/util/helpers'

  const reactions = {
    '+1': '👍',
    hooray: '🎉',
    rocket: '🚀',
    laugh: '😂',
    heart: '❤️',
    eyes: '👀',
  }

  const { t } = useI18n()
  const date = useDate()
  const route = useRoute()
  const router = useRouter()
  const store = useReleasesStore()

  const clicked = ref('copy-link')
  const search = ref<Release>()

  const menuProps = computed(() => {
    return {
      contentClass: 'notes-autocomplete rounded-b-lg',
      maxHeight: 300,
    }
  })

  const tooltips = computed(() => {
    return [
      {
        color: '#3b5998',
        icon: clicked.value === 'copied' ? 'mdi-check' : 'mdi-share-variant-outline',
        async onClick () {
          navigator.clipboard.writeText(`${window.location.origin}/getting-started/release-notes/?version=${search.value!.tag_name}`)

          clicked.value = 'copied'

          await wait(1500)

          clicked.value = 'copy-link'
        },
        path: clicked.value,
      },
      {
        color: '#738ADB',
        icon: 'mdi-discord',
        href: 'https://discord.gg/QHWSAbA',
        path: 'discuss-on-discord',
      },
      {
        color: '#212121',
        href: search.value!.html_url,
        icon: 'mdi-github',
        path: 'open-github-release',
      },
    ]
  })

  const releases = computed(() => {
    const releases = store.releases.slice()

    releases.push(null as any)

    return releases
  })

  const tag = computed(() => (route.query.version ?? `v${version}`) as string)

  const publishedOn = computed(() => {
    if (!search.value?.published_at) return undefined

    return date.format(new Date(search.value.published_at), 'fullDateWithWeekday')
  })

  onBeforeMount(async () => {
    await store.fetch()

    search.value = await store.find(tag.value)
  })

  watch(search, val => {
    const version = val?.tag_name ?? tag.value

    if (!version) return

    router.push({ query: { version } })
  })
</script>

<style lang="sass">
  .notes-autocomplete
    > .v-list.v-select-list
      background: transparent !important
  .releases
    img
      max-width: 100%
</style>
