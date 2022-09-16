<template>
  <div class="border rounded mt-12">
    <v-autocomplete
      v-model="search"
      :items="releases"
      :menu-props="menuProps"
      hide-details
      item-title="name"
      label="Select Release Version"
      prepend-inner-icon="mdi-text-box-search-outline"
      return-object
      @blur="resetSearch"
      @focus="onFocus"
    />

    <v-card
      flat
      min-height="180"
      rounded="t-0 b"
    >
      <div
        v-if="!!search"
        class="d-flex justify-space-between"
      >
        <v-list-item
          :prepend-avatar="search.author.avatar_url"
          lines="two"
        >
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

        <div class="pr-3 d-flex align-center flex-1-0-auto">
          <app-tooltip-btn
            v-for="(tooltip, i) in tooltips"
            :key="i"
            :href="tooltip.href"
            :icon="tooltip.icon"
            :path="tooltip.path"
            :color="tooltip.color ?? 'grey-darken-1'"
            :target="tooltip.href ? '_blank' : undefined"
            variant="flat"
          />
        </div>
      </div>

      <v-divider />

      <div class="pa-4">
        <app-markdown
          :content="search?.body"
          class="releases"
        />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Utilities
  import { computed, nextTick, onMounted, ref } from 'vue'

  const isFocused = ref(false)
  const isLoading = ref(true)
  const isSearching = ref(false)
  const releases = ref<any[]>([])
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
    ]
  })

  onMounted(async () => {
    const filteredReleases = []
    const res = await Promise.all([
      fetch('https://api.github.com/repos/vuetifyjs/vuetify/releases', { method: 'GET' }),
      fetch('https://api.github.com/repos/vuetifyjs/vuetify/releases?page=2', { method: 'GET' }),
      // fetch('https://api.github.com/repos/vuetifyjs/vuetify/releases?page=3', { method: 'GET' }),
    ]).then(v => Promise.all(v.map(res => res.json())))

    for (const release of res.flat()) {
      if (release.name.startsWith('v2')) continue

      filteredReleases.push({
        ...release,
        published_at: new Date(release.published_at).toDateString(),
      })
    }

    isLoading.value = false
    releases.value = filteredReleases
    search.value = filteredReleases[0]
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
