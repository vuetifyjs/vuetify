<template>
  <div>
    <v-autocomplete
      v-model="releaseNotes"
      :items="releases"
      chips
      clearable
      hide-details
      item-text="name"
      label="Select Release Version"
      prepend-inner-icon="mdi-database-search"
      return-object
      solo
    >
      <template v-slot:selection="props">
        <v-chip
          :value="props.selected"
          class="white--text"
          color="primary"
          label
        >
          <v-icon left>
            mdi-tag
          </v-icon>

          <span v-text="props.item.name" />
        </v-chip>
      </template>

      <template v-slot:item="props">
        <v-list-item-action>
          <v-icon>mdi-tag</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :id="props.attrs['aria-labelledby']"
            v-text="props.item.name"
          />

          <v-list-item-subtitle v-text="`Published: ${new Date(props.item.published_at).toDateString()}`" />
        </v-list-item-content>
      </template>
    </v-autocomplete>

    <v-expand-transition>
      <v-card
        v-if="releaseNotes"
        class="pa-4 mt-3"
        outlined
      >
        <base-markdown
          class="migration-markdown"
          :code="releaseNotes ? releaseNotes.body : ' '"
        />
      </v-card>
    </v-expand-transition>
  </div>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'
  import { sortBy } from 'lodash'

  export default {
    name: 'GettingStartedReleases',

    data: () => ({
      branch: undefined,
      githubReleases: [],
      releaseNotes: undefined,
    }),

    computed: {
      currentVersion: sync('app/currentVersion'),
      releases () {
        const v1 = sortBy(
          this.githubReleases.filter(release => release.name && release.name.substring(0, 3) === 'v1.'),
          ['published_at']
        ).reverse()
        const v2 = sortBy(
          this.githubReleases.filter(release => release.name && release.name.substring(0, 3) === 'v2.'),
          ['published_at']
        ).reverse()
        if (v1.length > 0) {
          v1.unshift({ header: 'v1.x' })
        }
        if (v2.length > 0) {
          v2.unshift({ header: 'v2.x' })
        }
        return v2.concat(v1) || []
      },
    },

    mounted () {
      fetch(`https://api.github.com/repos/vuetifyjs/vuetify/releases?per_page=100`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(res => {
          this.githubReleases = res
          this.releaseNotes = res.find(release => release.name === `v${this.currentVersion}`)
        })
        .catch(err => console.log(err))
    },
  }
</script>
