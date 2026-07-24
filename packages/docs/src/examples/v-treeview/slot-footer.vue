<template>
  <v-sheet class="mx-auto" max-width="500">
    <v-treeview
      :items="items"
      density="compact"
      hide-actions
      indent-lines
      item-props
      open-all
      open-on-click
      separate-roots
    >
      <template v-slot:header="{ props, item }">
        <v-treeview-item v-bind="props">
          <template v-slot:append>
            <small v-if="item.filesCount">{{ item.filesCount }} files</small>
          </template>
        </v-treeview-item>
      </template>
      <template v-slot:append="{ item }">
        <small>{{ item.size }} MB</small>
      </template>
      <template v-slot:footer="{ props, item }">
        <v-treeview-item
          v-if="item.hasMore"
          v-bind="props"
          :disabled="loading === item.value"
          :title="loading === item.value ? 'Loading...' : 'Load more'"
          class="text-primary"
          v-ripple
          @click="loadMore(item)"
        >
          <template v-slot:prepend>
            <v-progress-circular
              v-if="loading === item.value"
              class="mr-2"
              size="18"
              width="2"
              indeterminate
            ></v-progress-circular>
            <v-icon v-else icon="mdi-plus"></v-icon>
          </template>
        </v-treeview-item>
      </template>
    </v-treeview>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  function getFakeGroups (prefix, minIndex = 0, limit = 5) {
    return Array.from({ length: limit }, (_, i) => ({
      value: `${prefix}-${minIndex + i}`,
      size: 2 + ((minIndex + i) % 5),
      title: `${minIndex + i + 1}.jpg`,
      prependIcon: 'mdi-file-image',
    }))
  }

  const loading = ref(null)
  const items = ref([
    {
      value: 'root',
      title: 'My files',
      children: [
        {
          value: 'g2',
          prependIcon: 'mdi-folder',
          title: 'Public',
          filesCount: 12,
          hasMore: true,
          children: getFakeGroups('g2'),
        },
        {
          value: 'g3',
          prependIcon: 'mdi-folder',
          title: 'Shared',
          filesCount: 12,
          hasMore: true,
          children: getFakeGroups('g3'),
        },
      ],
    },
  ])

  async function loadMore (group) {
    if (loading.value) return
    loading.value = group.value
    await new Promise(resolve => setTimeout(resolve, 600))
    if (group.children.length < 10) {
      group.children.push(...getFakeGroups(group.value, group.children.length))
    } else {
      group.children.push(...getFakeGroups(group.value, group.children.length, 2))
      group.hasMore = false
    }
    loading.value = null
  }
</script>

<script>
  export default {
    data: () => ({
      loading: null,
      items: [],
    }),
    created () {
      this.items = [
        {
          value: 'root',
          title: 'My files',
          children: [
            {
              value: 'g2',
              prependIcon: 'mdi-folder',
              title: 'Public',
              filesCount: 12,
              hasMore: true,
              children: this.getFakeGroups('g2'),
            },
            {
              value: 'g3',
              prependIcon: 'mdi-folder',
              title: 'Shared',
              filesCount: 12,
              hasMore: true,
              children: this.getFakeGroups('g3'),
            },
          ],
        },
      ]
    },
    methods: {
      getFakeGroups (prefix, minIndex = 0, limit = 5) {
        return Array.from({ length: limit }, (_, i) => ({
          value: `${prefix}-${minIndex + i}`,
          size: 2 + ((minIndex + i) % 5),
          title: `${minIndex + i + 1}.jpg`,
          prependIcon: 'mdi-file-image',
        }))
      },
      async loadMore (group) {
        if (this.loading) return
        this.loading = group.value
        await new Promise(resolve => setTimeout(resolve, 600))
        if (group.children.length < 10) {
          group.children.push(...this.getFakeGroups(group.value, group.children.length))
        } else {
          group.children.push(...this.getFakeGroups(group.value, group.children.length, 2))
          group.hasMore = false
        }
        this.loading = null
      },
    },
  }
</script>
