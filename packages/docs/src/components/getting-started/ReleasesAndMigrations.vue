<template>
  <v-layout
    wrap
    mb-12
  >
    <v-flex
      xs12
      mb-12
    >
      <section id="release-notes">
        <doc-heading id="release-notes">releaseHeader</doc-heading>
        <v-autocomplete
          v-model="releaseNotes"
          :items="releases"
          label="Select Release Version"
          item-text="name"
          solo
          prepend-inner-icon="mdi-database-search"
          clearable
          chips
          return-object
          hide-details
        >
          <template v-slot:selection="props">
            <v-chip
              :value="props.selected"
              color="primary"
              class="white--text"
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
            outlined
            class="pa-4 mt-3"
          >
            <doc-markdown
              class="migration-markdown"
              :code="releaseNotes ? releaseNotes.body : ' '"
            />
          </v-card>
        </v-expand-transition>
      </section>
    </v-flex>

    <v-flex
      xs12
      mb-12
    >
      <section id="migration-guide">
        <doc-heading id="migration-guide">migrationHeader</doc-heading>

        <v-card
          outlined
          class="pa-4"
        >
          <doc-markdown
            class="migration-markdown"
            :code="migration || ' '"
          />
        </v-card>
      </section>
    </v-flex>
  </v-layout>

</template>

<script>
  import { getBranch } from '@/util/helpers'
  // Utilities
  import { mapState } from 'vuex'
  import { sortBy } from 'lodash'

  export default {
    data: () => ({
      migration: undefined,
      branch: undefined,
      githubReleases: [],
      releaseNotes: undefined,
    }),

    computed: {
      ...mapState('app', ['currentVersion']),
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
      this.branch = getBranch()
      fetch(`https://api.github.com/repos/vuetifyjs/vuetify/contents/MIGRATION.md?ref=${this.branch}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(res => {
          this.migration = res.content ? Buffer.from(res.content, 'base64').toString() : ' '
        })
        .catch(err => console.log(err))

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
<style lang="sass" scoped>
  ::v-deep pre
    background: #2d2d2d !important
    border-radius: 4px
    margin: 16px
    padding: 16px

    code
      background: transparent
      background-color: unset !important
      box-shadow: none !important
      color: #ccc !important
      font-family: "Inconsolata", monospace
      font-weight: 300
      font-size: 15px
      line-height: 1.55

  ::v-deep .migration-markdown
    h1, h2, h3, h4, h5, p, pre, ul
      margin-bottom: 16px !important

</style>
