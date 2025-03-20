// Plugins
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Commit = octokitComponents['schemas']['commit']

type State = {
  commits: Commit[]
  isLoading: boolean
}

const url = import.meta.env.VITE_API_SERVER_URL

export const useCommitsStore = defineStore('commits', {
  state: (): State => ({
    commits: [] as Commit[],
    isLoading: false,
  }),

  actions: {
    async fetch () {
      this.isLoading = true

      try {
        const res = await fetch(`${url}/github/commits`, {
          method: 'GET',
          credentials: 'include',
        }).then(async res => res.json())

        this.commits = res
      } catch (err: any) {
        console.warn(`Failed to fetch commits: ${err.message}`)
      }

      this.isLoading = false
    },
  },

  getters: {
    latest (state) {
      return state.commits?.[0]
    },
  },
})
