<template>
  <v-card class="mx-auto mt-10" max-width="800" rounded>
    <v-card-title>Recent Activity</v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="one.isLoading"
      item-value="id"
    >
      <template #item.title="{ item }">
        <a
          :href="properties[item.property].url + '/' + item.slug"
          class="text-decoration-none"
          target="_blank"
        >
          {{ item.title || item.slug }}

          <v-icon
            v-if="item.pinned"
            color="primary"
            icon="mdi-pin"
            size="small"
          />

          <v-icon
            v-if="item.favorite"
            color="warning"
            icon="mdi-star"
            size="small"
          />
        </a>
      </template>

      <template #item.property="{ item }">
        <v-chip
          :href="properties[item.property].url"
          size="small"
          target="_blank"
        >
          <template #prepend>
            <v-img
              :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/${properties[item.property].img}`"
              class="me-1"
              width="16"
            />
          </template>

          {{ properties[item.property].name }}
        </v-chip>
      </template>

      <template #item.updatedAt="{ item }">
        {{ formatDate(item.updatedAt) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
  interface Activity {
    id: string
    slug: string
    title: string | null
    createdAt: string
    updatedAt: string
    favorite: boolean
    pinned: boolean
    property: string
  }

  const one = useOneStore()
  const adapter = useDate()

  const items = ref<Activity[]>([])

  const headers = [
    { title: 'Title', key: 'title' },
    { title: 'Property', key: 'property' },
    { title: 'Updated', key: 'updatedAt' },
  ]

  const properties: Record<string, { name: string, url: string, img: string }> = {
    'default::Bin': {
      name: 'Bin',
      url: 'https://bin.vuetifyjs.com/bins',
      img: 'vbin.svg',
    },
    'default::Playground': {
      name: 'Play',
      url: 'https://play.vuetifyjs.com/playgrounds',
      img: 'vplay.svg',
    },
    'default::Link': {
      name: 'Link',
      url: 'https://link.vuetifyjs.com/links',
      img: 'vlink.svg',
    },
    'default::Studios': {
      name: 'Studio',
      url: 'https://studios.vuetifyjs.com/projects',
      img: 'vstudio.svg',
    },
  }

  function formatDate (date: string) {
    if (!adapter.isValid(date)) return ''

    return adapter.format(adapter.date(date), 'normalDateWithWeekday')
  }

  async function load () {
    items.value = await one.recentActivity()
  }

  onMounted(load)
</script>
