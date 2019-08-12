<template>
  <v-container px-0>
    <v-card
      id="release-notes"
      outlined
      class="mb-12"
      tag="section"
    >
      <v-card-title>
        <doc-subheading>releaseHeader</doc-subheading>
      </v-card-title>
      <v-card-text>
        <v-combobox
          v-model="releaseNotes"
          :items="releases"
          item-text="name"
          label="Select Version"
          chips
          clearable
          outlined
          solo
        />
        <doc-markdown :code="releaseNotes ? releaseNotes.body : ' '" />
      </v-card-text>
    </v-card>
    <v-card
      id="migration-guide"
      outlined
      class="mb-12"
      tag="section"
    >
      <v-card-title>
        <doc-subheading>migrationHeader</doc-subheading>
      </v-card-title>
      <v-card-text>
        <doc-markdown :code="migration || ' '" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { getBranch } from '@/util/helpers'

  export default {
    data: () => ({
      migration: undefined,
      branch: undefined,
      releases: [],
      releaseNotes: undefined,
    }),

    mounted () {
      this.branch = getBranch()
      // replace with this when ready to push pr
      // fetch(`https://api.github.com/repos/vuetifyjs/vuetify/contents/MIGRATION.md?ref=${this.branch}`, {
      fetch(`https://api.github.com/repos/vuetifyjs/vuetify/contents/MIGRATION.md?ref=feat/migration-page`, {
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
        .then(res => { this.releases = res })
        .catch(err => console.log(err))
    },
  }
</script>
