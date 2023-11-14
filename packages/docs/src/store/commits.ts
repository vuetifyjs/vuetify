// Plugins
import octokit from '@/plugins/octokit'
import type { components as octokitComponents } from '@octokit/openapi-types'

// Utilities
import { defineStore } from 'pinia'

export type Commit = octokitComponents['schemas']['commit']

export type State = {
  latest: Commit | null
  commits: Commit[]
  isLoading: boolean
}

export const useCommitsStore = defineStore('commits', {
  state: (): State => ({
    latest: null,
    commits: [] as Commit[],
    isLoading: false,
  }),

  actions: {
    async fetch () {
      this.isLoading = true

      const res = await octokit.request('GET /repos/vuetifyjs/vuetify/commits/master', {
        page: 1,
        order: 'created_at',
      })
      const data = res.data

      this.latest = data
      this.isLoading = false
    },
  },
})
