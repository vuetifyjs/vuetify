import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'
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
  // avatar: string
  github?: string
  team: string
  twitter?: string
}

export const useTeamStore = defineStore('team', () => {
  const members = ref<Member[]>([])

  onBeforeMount(() => {
    members.value = (Object.keys(team) as any as (keyof typeof team)[]).reduce<Member[]>((arr, key) => {
      return [...arr, team[key]]
    }, [])
  })

  return { members }
})
