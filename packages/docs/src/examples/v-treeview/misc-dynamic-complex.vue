<template>
  <v-treeview
    :items="items"
    open-on-click
    @click:open="load"
  ></v-treeview>
</template>

<script>
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

  export default {
    data: () => ({
      items: [
        {
          value: 'Users',
          title: 'Users',
          loaded: false,
          loading: false,
          $children: [],
        },
      ],
    }),

    methods: {
      find (path) {
        let items = this.items
        let found = null

        while (items && path.length) {
          const value = path.shift()
          found = items.find(item => item.value === value)
          items = found.$children
        }

        return found
      },
      async load ({ path }) {
        const item = this.find(path)

        if (item.loaded) return

        item.loading = true

        await pause(1000)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()

        item.$children = json.map(user => ({
          value: `${item.value}_${user.id}`,
          title: user.name,
          $children: Math.random() > 0.75 ? [] : undefined,
        }))

        item.loaded = true
        item.loading = false
      },
    },
  }
</script>
