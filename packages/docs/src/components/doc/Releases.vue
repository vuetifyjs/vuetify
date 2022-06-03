<template>
  <div>
    <v-autocomplete
      v-model="search"
      :background-color="backgroundColor"
      :class="isFocused ? 'rounded-b-0 rounded-t-lg' : 'rounded-lg'"
      :items="releases"
      class="mt-8 mb-12"
      item-title="name"
      label="Select Release Version"
      :menu-props="menuProps"
      prepend-inner-icon="mdi-text-box-search-outline"
      return-object
      variant="contained"
      @blur="resetSearch"
      @focus="onFocus"
    >
      <template #prepend-inner>
        <div
          class="ml-1 mr-2"
          style="width: 40px;"
        >
          <v-progress-circular
            v-if="isLoading"
            color="primary"
            indeterminate
            size="20"
            width="1"
          />

          <v-icon
            v-else
            :color="!isFocused ? 'grey' : undefined"
          >
            $mdiTextBoxSearchOutline
          </v-icon>
        </div>
      </template>

      <!-- <template #item="props">
        <v-list-item-action>
          <v-icon>$mdiTagOutline</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :id="props.attrs['aria-labelledby']"
            v-text="props.item.name"
          />

          <v-list-item-subtitle>
            <i18n-t path="published-on">
              <template #date>
                <strong v-text="props.item.published_at" />
              </template>
            </i18n-t>
          </v-list-item-subtitle>
        </v-list-item-content>
      </template> -->
    </v-autocomplete>

    <!-- <v-skeleton-loader
      v-if="isLoading"
      type="image"
      height="180"
    /> -->

    <v-card
      min-height="180"
      variant="outlined"
    >
      <div
        v-if="!!search"
        class="d-flex justify-space-between"
      >
        <v-list-item>
          <v-list-item-avatar size="48" class="mr-4 mt-2 mb-2">
            <v-img :src="search.author.avatar_url" />
          </v-list-item-avatar>

          <v-list-item-header>
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
                  <strong v-text="search.published_at" />
                </template>
              </i18n-t>
            </v-list-item-subtitle>
          </v-list-item-header>
        </v-list-item>

        <div class="pr-3 d-flex align-center flex-1-0-auto">
          <app-tooltip-btn
            v-for="(tooltip, i) in tooltips"
            :key="i"
            :href="tooltip.href"
            :icon="tooltip.icon"
            :path="tooltip.path"
            :target="tooltip.href ? '_blank' : undefined"
          />
        </div>
      </div>

      <v-divider />

      <div class="pa-4">
        <app-markdown class="releases" :content="search ? search.body : ''" />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, nextTick, onMounted, ref } from 'vue'

  const theme = useTheme()
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

  const backgroundColor = computed(() => {
    return theme.current.value.dark ? undefined : `grey lighten-${isFocused.value ? '5' : '3'}`
  })

  const menuProps = computed(() => {
    return {
      contentClass: 'notes-autocomplete rounded-b-lg',
    }
  })

  const tooltips = computed(() => {
    return [
      {
        icon: 'mdi-discord',
        href: 'https://discord.gg/QHWSAbA',
        path: 'discuss-on-discord',
      },
      {
        icon: 'mdi-github',
        href: `https://github.com/vuetifyjs/vuetify/discussions?discussions_q=${search.value.tag_name}`,
        path: 'discuss-on-github',
      },
      {
        icon: 'mdi-alert-circle-outline',
        href: 'https://issues.vuetifyjs.com/',
        path: 'file-a-bug-report',
      },
      {
        icon: 'mdi-open-in-new',
        href: search.value.html_url,
        path: 'open-github-release',
      },
    ]
  })

  onMounted(async () => {
    const filteredReleases = []
    const res = await fetch('https://api.github.com/repos/vuetifyjs/vuetify/releases', { method: 'GET' })

    isLoading.value = false

    for (const release of await res.json()) {
      if (release.name.startsWith('v2')) continue

      filteredReleases.push({
        ...release,
        published_at: new Date(release.published_at).toDateString(),
      })
    }

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
