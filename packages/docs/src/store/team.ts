// Plugins
import octokit from '@/plugins/octokit'

// Utilities
import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'

// Data
import team from '@/data/team.json'

export type Member = {
  discord?: string
  focus: string[]
  funding?: string[]
  languages: string[]
  linkedin?: string
  location?: string
  work?: string
  name: string
  avatar?: string
  github?: string
  team: string
  twitter?: string
}

export type GithubMember = {
  avatar_url: string
  login: string
}

export const useTeamStore = defineStore('team', () => {
  const members = ref<Member[]>([])

  for (const key in team) {
    const record: Member = (team as Record<string, Member>)[key]

    members.value.push({
      ...record,
      github: key,
    })
  }

  onBeforeMount(async () => {
    const res = await octokit.request('GET /orgs/vuetifyjs/members')
    const data = res.data as GithubMember[]

    members.value = members.value.map(member => {
      const record = data.find(u => u.login.localeCompare(member.github ?? '', 'en', {
        sensitivity: 'base',
      }) === 0)

      return {
        ...member,
        avatar: record?.avatar_url,
      }
    })
  })

  return { members }
})
