// Types
type Job = {
  id: number
  title: string
  description: string
  avatar: string
  company: string
  locations: string[]
  published: string
  url: string
  via: string
}

type VueJobsJob = {
  description: string
  link: string
  locations: string[]
  organization: {
    name: string
    avatar: string
  }
  published_at: string
  remote: string
  title: string
}

type FreeflowJob = {
  compensation: string
  created: string
  description: string
  location: string
  number: number
  post_url: string
  title: string
}

async function fetchVueJobs () {
  const res = await fetch('https://app.vuejobs.com/feed/vuetify?format=json', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())

  return res.data.map((job: VueJobsJob) => ({
    id: job.title,
    title: job.title,
    description: job.description,
    avatar: job.organization.avatar,
    company: job.organization.name,
    locations: job.locations.length ? job.locations : ['Remote'],
    published: job.published_at,
    url: job.link,
    via: 'vue-jobs',
  }))
}

async function fetchFreeflowJobs () {
  const res = await fetch('https://public.freeflow.network/api/jobs', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'anidjttnd2339590052',
    },
  }).then(res => res.json())

  return res.map((job: FreeflowJob) => ({
    id: job.number,
    title: job.title,
    description: job.description.length > 200 ? job.description.slice(0, 200) + '...' : job.description,
    avatar: undefined,
    company: 'Vuetify Discord',
    locations: ['Remote'],
    published: job.created,
    url: job.post_url,
    via: 'discord',
  }))
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])

  onBeforeMount(async () => {
    if (jobs.value.length) return

    jobs.value.push(...await fetchVueJobs())
    jobs.value.push(...await fetchFreeflowJobs())

    jobs.value.sort((a, b) => {
      return new Date(b.published).getTime() - new Date(a.published).getTime()
    })
  })

  return { jobs }
})
