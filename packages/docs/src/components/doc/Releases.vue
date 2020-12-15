<template>
  <div>
    <v-autocomplete
      v-model="search"
      :background-color="backgroundColor"
      :class="isFocused ? 'rounded-b-0 rounded-t-lg' : 'rounded-lg'"
      :items="releases"
      :menu-props="menuProps"
      class="mt-8 mb-12"
      dense
      flat
      hide-details
      item-text="name"
      label="Select Release Version"
      prepend-inner-icon="$mdiTextBoxSearchOutline"
      return-object
      solo
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

      <template #item="props">
        <v-list-item-action>
          <v-icon>$mdiTagOutline</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :id="props.attrs['aria-labelledby']"
            v-text="props.item.name"
          />

          <v-list-item-subtitle>
            <i18n path="published-on">
              <template #date>
                <strong v-text="props.item.published_at" />
              </template>
            </i18n>
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <v-skeleton-loader
      v-if="isLoading"
      type="image"
      height="180"
    />

    <v-card
      v-else
      min-height="180"
      outlined
    >
      <div
        v-if="!!search"
        class="d-flex"
      >
        <v-list-item>
          <v-list-item-avatar size="48">
            <v-img :src="search.author.avatar_url" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="mb-1 text-h6">
              <i18n path="released-by">
                <template #author>
                  <app-link :href="search.author.html_url">
                    {{ search.author.login }}
                  </app-link>
                </template>
              </i18n>
            </v-list-item-title>

            <v-list-item-subtitle>
              <i18n path="published-on">
                <template #date>
                  <strong v-text="search.published_at" />
                </template>
              </i18n>
            </v-list-item-subtitle>
          </v-list-item-content>
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
        <app-md class="releases">
          {{ search ? search.body : ' ' }}
        </app-md>
      </div>
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import octokit from '@/plugins/octokit'

  export default {
    name: 'Releases',

    inject: ['theme'],

    data: () => ({
      isFocused: false,
      isLoading: true,
      isSearching: false,
      releases: [],
      search: undefined,
    }),

    computed: {
      ...get('app', ['modified']),
      ...get('route', [
        'params@category',
        'params@page',
      ]),
      version: get('app/version'),
      at () {
        const stat = this.modified[`/${this.category}/${this.page}/`] || {}

        return stat.modified
      },
      backgroundColor () {
        return this.$vuetify.theme.dark ? undefined : `grey lighten-${this.isFocused ? '5' : '3'}`
      },
      menuProps () {
        return {
          contentClass: `notes-autocomplete rounded-b-lg elevation-0 grey ${this.$vuetify.theme.dark ? 'darken-4' : 'lighten-5'}`,
        }
      },
      tooltips () {
        return [
          {
            icon: '$mdiDiscord',
            href: 'https://discord.gg/QHWSAbA',
            path: 'discuss-on-discord',
          },
          {
            icon: '$mdiGithub',
            href: `https://github.com/vuetifyjs/vuetify/discussions?discussions_q=${this.search.tag_name}`,
            path: 'discuss-on-github',
          },
          {
            icon: '$mdiAlertCircleOutline',
            href: 'https://issues.vuetifyjs.com/',
            path: 'file-a-bug-report',
          },
          {
            icon: '$mdiOpenInNew',
            href: this.search.html_url,
            path: 'open-github-release',
          },
        ]
      },
    },

    async mounted () {
      const releases = []
      const res = await octokit.request('GET /repos/vuetifyjs/vuetify/releases')

      this.isLoading = false

      for (const release of res.data) {
        if (!release.name.startsWith('v2')) continue

        releases.push({
          ...release,
          published_at: new Date(release.published_at).toDateString(),
        })
      }

      this.releases = releases
      this.search = releases[0]
    },

    methods: {
      onFocus () {
        clearTimeout(this.timeout)

        this.isFocused = true
      },
      resetSearch (timeout = 0) {
        clearTimeout(this.timeout)

        this.$nextTick(() => {
          this.isSearching = false

          this.timeout = setTimeout(() => (this.isFocused = false), timeout)
        })
      },
    },
  }
</script>

<style lang="sass">
  .notes-autocomplete
    > .v-list.v-select-list
      background: transparent !important
  .releases
    img
      max-width: 100%
</style>
