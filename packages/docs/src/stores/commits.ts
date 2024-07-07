// Plugins
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Commit = octokitComponents['schemas']['commit']

export type State = {
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
        this.commits = await fetch(`${url}/github/commits`, {
          method: 'GET',
          credentials: 'include',
        }).then(res => res.json())
      } catch (err: any) {
        console.error(err)
      }

      this.isLoading = false
    },
  },

  getters: {
    latest (state) {
      return state.commits[0]
    },
  },
})
