<template>
  <v-app full-height>
    <!-- <v-list :items="items" @click:open="foo" /> -->
    <!-- <v-list :items="routes" /> -->
    <v-tabs :items="tabs" />

    <v-divider class="my-10" />

    <v-tabs :items="tabs" direction="vertical" />

    <v-divider class="my-10" />

    <v-tabs stacked class="ma-10" color="primary">
      <v-tab title="foo" prepend-icon="mdi-home" />
      <v-tab title="bar" />
    </v-tabs>

    <v-btn>test</v-btn>

    <!-- <v-treeview :items="items" />

    <v-divider class="my-10" />
    compact

    <v-treeview :items="items" density="compact" @click:expand="foo" />

    <v-divider class="my-10" />

    comfortable

    <v-treeview :items="items" density="comfortable" />

    <v-divider class="my-10" />

    <v-treeview select-on-click>
      <v-treeview-group>
        <template #activator="{ props }">
          <v-treeview-item v-bind="props" title="Parent" />
        </template>
        <v-treeview-item title="Child #1" />
        <v-treeview-item title="Child #2" />
        <v-treeview-group>
          <template #activator="{ props }">
            <v-treeview-item v-bind="props" title="Child #3" />
          </template>
          <v-treeview-item title="Child #3-1" />
        </v-treeview-group>
      </v-treeview-group>
    </v-treeview> -->
  </v-app>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      const routes = ref([
        {
          to: '/',
          title: 'Home',
        },
        {
          to: '/page1',
          title: 'Page 1',
        },
      ])
      const items = ref([
        {
          value: 'parent',
          title: 'Parent',
          $children: [
            {
              value: 'child_1',
              title: 'Child #1',
            },
            {
              value: 'child_2',
              title: 'Child #2',
              prependIcon: 'mdi-home',
            },
            {
              value: 'child_3',
              title: 'Child #3',
              $children: [],
            },
          ],
        },
      ])

      const tabs = ref([
        'foo', 'bar',
      ])

      const getItem = path => {
        let arr = items.value

        for (const p of path) {
          const item = arr.find(v => v.value === p)

          if (!item) throw new Error('foo')

          if (item.value === path[path.length - 1]) return item

          if (!item.$children) throw new Error('foo')

          arr = item.$children
        }
      }

      return {
        foo: ({ id, value, path }) => {
          const item = getItem(path)

          if (item.$children.length > 0) return

          item.loading = true

          setTimeout(() => {
            item.loading = false

            item.$children = [
              {
                value: 'child_3_1',
                title: 'Child #3-1',
              },
            ]
          }, 1000)
        },
        items,
        routes,
        tabs,
      }
    },
  }
</script>
