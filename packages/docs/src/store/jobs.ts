// Utilities
import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'

// Types
type Company = {
  avatar: string
  name: string
}

type Published = {
  date: string
  for_humans: string
}

type Job = {
  company: Company
  description: string
  id: number
  location: string
  published_at: Published
  title: string
  type: 'full-time' | 'part-time'
  url: string
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])

  onBeforeMount(async () => {
    if (jobs.value.length) return

    await fetch('https://app.vuejobs.com/feed/vuetify?format=json', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => {
        for (const job of res.data) {
          jobs.value.push({
            ...job,
            isNew: false,
            via: 'vue-jobs',
          })
        }
      })
  })

  return { jobs }
})
