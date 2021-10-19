import { defineStore } from 'pinia'
import { reactive, ref, toRefs, onBeforeMount } from 'vue'
import team from '@/data/team'

export type Member = {
  discord?: string
  focus: string[]
  funding: string[]
  languages: string[]
  linkedin?: string
  location?: string
  work?: string
  name: string
  avatar: string
  github?: string
  team: string
  twitter?: string
}

type RootState = {
  members: Member
}

export const useTeamStore = defineStore('team', () => {
  const members = ref<Member[]>([])

  onBeforeMount(() => {
    members.value = Object.keys(team).reduce<Member[]>((arr, key) => {
      return [...arr, (team as Record<string, Member>)[key]]
    }, [])
  })

  return { members }
})
