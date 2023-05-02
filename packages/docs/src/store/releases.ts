// Plugins
import octokit from '@/plugins/octokit'
import type { components as octokitComponents } from '@octokit/openapi-types'

// Utilities
import { defineStore } from 'pinia'

export type Release = octokitComponents['schemas']['release']

export type State = {
  releases: Release[]
  isLoading: boolean
  page: number
}

export const useReleasesStore = defineStore('releases', {
  state: (): State => ({
    releases: [],
    isLoading: false,
    page: 1,
  }),

  actions: {
    async fetch () {
      this.isLoading = true

      const res = await octokit.request('GET /repos/vuetifyjs/vuetify/releases', {
        page: this.page,
      })
      const data = res.data

      for (const release of data) {
        this.releases.push({
          ...release,
          published_at: new Date(release.published_at).toDateString(),
          props: {
            prependIcon: `mdi-numeric-${release.tag_name.slice(1, 2)}-box`,
            title: release.tag_name,
          },
        })
      }

      this.isLoading = false
      this.page++
    },
  },
})
