// Plugins
import type { components as octokitComponents } from '@octokit/openapi-types'

export type Release = octokitComponents['schemas']['release']

export type State = {
  releases: Release[]
  isLoading: boolean
  page: number
}

const url = import.meta.env.VITE_API_SERVER_URL

export const useReleasesStore = defineStore('releases', {
  state: (): State => ({
    releases: [] as Release[],
    isLoading: false,
    page: 1,
  }),

  actions: {
    format (release: Release) {
      return {
        ...release,
        props: {
          prependIcon: `mdi-numeric-${release.tag_name.slice(1, 2)}-box`,
          title: release.tag_name,
        },
      }
    },
    async fetch () {
      this.isLoading = true

      let data = []
      try {
        data = await fetch(`${url}/github/releases?page=${this.page}`, {
          method: 'GET',
          credentials: 'include',
        }).then(res => res.json())
      } catch (err: any) {
        console.error(err)
      }

      for (const release of data) {
        this.releases.push(this.format(release))
      }

      this.isLoading = false
      this.page++
    },
    async find (tag: string) {
      if (!tag.startsWith('v')) tag = `v${tag}`

      const found = this.releases.find(release => release.tag_name === tag)

      if (found) return found

      this.isLoading = true

      let res: any

      if (tag.length >= 6) {
        try {
          res = await fetch(`${url}/github/releases/find?tag=${tag}`, {
            method: 'GET',
            credentials: 'include',
          }).then(res => res.json())
        } catch (err: any) {
          console.error(err)
        }
      }

      this.isLoading = false

      if (res) {
        this.releases.push(this.format(res))

        return res
      }
    },
  },
})
