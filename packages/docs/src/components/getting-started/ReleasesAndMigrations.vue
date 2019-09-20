<template>
  <v-layout wrap mb-12>
    <doc-subheading>releaseHeader</doc-subheading>
    <v-flex
      xs12
      mb-12
    >
      <v-autocomplete
        v-model="releaseNotes"
        :items="releases"
        label="Select Label"
        item-text="name"
        solo
        prepend-inner-icon="mdi-database-search"
        clearable
        chips
        return-object
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
            <v-list-item-subtitle v-text="`published: ${new Date(props.item.published_at).toDateString()}`" />
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <doc-markdown :code="releaseNotes ? releaseNotes.body : ' '" />
    </v-flex>

    <v-flex>
      <doc-subheading>migrationHeader</doc-subheading>
      <doc-markdown class="migration-markdown" :code="migration || ' '" />
    </v-flex>
  </v-layout>

</template>

<script>
  import { getBranch } from '@/util/helpers'
  // Utilities
  import { mapState } from 'vuex'

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
        const v1 = this.githubReleases.filter(release => release.name && release.name.substring(0, 3) === 'v1.')
        const v2 = this.githubReleases.filter(release => release.name && release.name.substring(0, 3) === 'v2.')
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
    padding: 8px
    margin: 8px

    code
      box-shadow: none !important
      background-color: unset !important
      color: #ccc !important

  ::v-deep .migration-markdown
    h4, h3, p, pre, ul
      margin-bottom: 16px !important
</style>
