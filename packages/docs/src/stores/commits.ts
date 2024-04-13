// Plugins
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Commit = octokitComponents['schemas']['commit']

export type State = {
  latest: Commit | null
  commits: Commit[]
  isLoading: boolean
}

const url = import.meta.env.VITE_API_SERVER_URL

export const useCommitsStore = defineStore('commits', {
  state: (): State => ({
    latest: null,
    commits: [] as Commit[],
    isLoading: false,
  }),

  actions: {
    async fetch () {
      this.isLoading = true

      try {
        this.latest = await fetch(`${url}/github/commits`, {
          method: 'GET',
          credentials: 'include',
        }).then(res => res.json())
      } catch (err: any) {
        console.error(err)
      }

      this.isLoading = false
    },
  },
})
