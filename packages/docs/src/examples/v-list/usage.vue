<template>
  <usage-example
    v-model="model"
    :options="options"
    name="v-list"
  >
    <v-defaults-provider
      :defaults="{
        VList: {
          lines: lines
        }
      }"
    >
      <v-card max-width="400" class="mx-auto">
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :title="item.title"
            :subtitle="subtitle"
            :prepend-avatar="model === 'avatar' ? item.avatar : undefined"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VListUsageExample',

    data: () => ({
      model: 'default',
      options: ['two-lines', 'three-lines', 'avatar'],
      items: [
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
      ],
    }),

    computed: {
      lines () {
        return ['two-lines', 'avatar'].includes(this.model)
          ? 'two'
          : this.model === 'three-lines'
            ? 'three'
            : 'one'
      },
      subtitle () {
        switch (this.lines) {
          case 'two': return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima'
          case 'three': return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
          default: return 'Lorem ipsum dolor sit amet consectetur adipisicing elit'
        }
      },
    },
  }
</script>
