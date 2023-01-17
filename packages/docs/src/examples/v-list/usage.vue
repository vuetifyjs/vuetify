<template>
  <usage-example
    v-model="model"
    :name="name"
    :code="code"
    :options="options"
  >
    <div>
      <v-list v-bind="props">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :subtitle="subtitle"
          :prepend-avatar="avatar ? item.avatar : undefined"
        ></v-list-item>
      </v-list>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="avatar" label="Show avatars"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-list'
  const model = ref('default')
  const options = ['two-lines', 'three-lines']
  const avatar = ref(false)

  const items = [
    {
      title: 'Item One',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    {
      title: 'Item Two',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      title: 'Item Three',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
  ]
  const lines = computed(() => {
    return {
      default: 'one',
      'two-lines': 'two',
      'three-lines': 'three',
    }[model.value]
  })
  const subtitle = computed(() => {
    switch (lines.value) {
      case 'two': return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima'
      case 'three': return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
      default: return 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
    }
  })

  const props = computed(() => {
    return {
      lines: lines.value,
    }
  })
  const itemProps = computed(() => {
    return {
      'v-for': 'item in items',
      ':key': 'item.title',
      ':title': 'item.title',
      subtitle: '...',
      ':prepend-avatar': avatar.value ? 'item.avatar' : undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>
  <v-list-item${propsToString(itemProps.value, 2)}></v-list-item>
</${name}>`
  })
</script>
