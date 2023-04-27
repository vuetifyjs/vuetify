<template>
  <div class="border rounded my-6">
    <v-autocomplete
      v-model="search"
      :items="releases"
      :loading="store.isLoading"
      :menu-props="menuProps"
      :placeholder="`v${version}`"
      hide-details
      item-title="name"
      label="Select Release Version"
      persistent-placeholder
      prepend-inner-icon="mdi-text-box-search-outline"
      return-object
      @blur="resetSearch"
      @focus="onFocus"
    >
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
      min-height="180"
      rounded="t-0 b"
    >
      <div
        v-if="!!search"
        class="d-flex justify-space-between"
      >
        <v-list-item lines="two">
          <v-list-item-title class="mb-1 text-h6">
            <i18n-t keypath="released-by">
              <template #author>
                <app-link :href="search.author.html_url">
                  {{ search.author.login }}
                </app-link>
              </template>
            </i18n-t>
          </v-list-item-title>

          <v-list-item-subtitle>
            <i18n-t keypath="published-on">
              <template #date>
                <v-chip
                  color="green-darken-3"
                  density="comfortable"
                  label
                  size="small"
                  variant="flat"
                >
                  <strong v-text="search.published_at" />
                </v-chip>
              </template>
            </i18n-t>
          </v-list-item-subtitle>
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
            variant="flat"
          />
        </div>
      </div>

      <v-divider />

      <div class="px-4 pt-4">
        <app-markdown
          v-if="search?.body"
          :content="search.body"
          class="releases"
        />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useReleasesStore } from '@/store/releases'

  // Utilities
  import { computed, nextTick, onBeforeMount, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { version } from 'vuetify'

  const { t } = useI18n()
  const store = useReleasesStore()
  const isFocused = ref(false)
  const isSearching = ref(false)
  const route = useRoute()
  const search = ref<any>()
  let timeout = -1

  const onFocus = () => {
    clearTimeout(timeout)

    isFocused.value = true
  }

  const resetSearch = async () => {
    clearTimeout(timeout)

    await nextTick(() => {
      isSearching.value = false

      timeout = window.setTimeout(() => (isFocused.value = false), timeout)
    })
  }

  const menuProps = computed(() => {
    return {
      contentClass: 'notes-autocomplete rounded-b-lg',
      maxHeight: 300,
    }
  })

  const tooltips = computed(() => {
    return [
      {
        color: '#738ADB',
        icon: 'mdi-discord',
        href: 'https://discord.gg/QHWSAbA',
        path: 'discuss-on-discord',
      },
      {
        color: '#212121',
        href: search.value.html_url,
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

  onBeforeMount(async () => {
    await store.fetch()

    if (route.query.version) {
      const found = store.releases.find(release => release.tag_name === route.query.version)

      if (found) return (search.value = found)
    }

    search.value = store.releases[0]
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
