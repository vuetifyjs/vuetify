<template>
  <v-app>
    <div class="pa-10">
      <h2>async load of items</h2>
      <v-list :items="loadedItems" :open-strategy="loadItems" :opened="opened" />

      <h2>custom ctrl + click open strategy</h2>
      <v-list :items="listItems" :open-strategy="openStrategyFn" density="compact">
        <template #prepend v-if="useSlot">
          foo
        </template>
      </v-list>
      <v-btn @click="doStuff">click me</v-btn>

      <h2>router integration</h2>
      <v-list v-model:selected="test" v-model:opened="open">
        <v-list-item active-color="primary" to="/" exact title="foo" />
        <v-list-item active-color="primary" to="/page1" title="bar" />
        <v-list-group>
          <template #header="props">
            <v-list-item active-color="primary" v-bind="props" :active="$route.path.startsWith('/nested')" title="header" />
          </template>
          <v-list-item active-color="primary" to="/nested/page1" title="baz" />
          <v-list-item active-color="primary" to="/nested/page2" title="bro" />
        </v-list-group>
      </v-list>

      <h2>value prop</h2>
      <v-list v-model:active="test2" v-model:opened="open2">
        <v-list-item value="/" title="foo" />
        <v-list-item value="/page1" title="bar" />
        <v-list-group>
          <template #header="props">
            <v-list-item v-bind="props" title="header" />
          </template>
          <v-list-item value="/nested/page1" title="baz" />
          <v-list-item value="/nested/page2" title="bro" />
          <v-list-group>
            <template #header="props">
              <v-list-item v-bind="props" title="header 2" />
            </template>
            <v-list-item value="/nested/foo/page1" title="baz 2" />
            <v-list-item value="/nested/foo/page2" title="bro 2" />
          </v-list-group>
        </v-list-group>
      </v-list>
      {{ test2 }}

      <h2>with checkbox and selected</h2>
      <v-list :items="listItems" v-model:selected="selected">
        <template #item="props">
          <v-list-item v-bind="props">
            <template #prepend="{ select, isSelected }">
              <input type="checkbox" :checked="isSelected" @click="select(!isSelected)" />
            </template>
          </v-list-item>
        </template>
      </v-list>
      {{ selected }}

      <h2>open on programmatic activate</h2>
      <v-list v-model:active="openOnSelect" v-model:opened="openStuff" active-strategy="multiple" ref="listRef">
        <v-list-group>
          <template #header="props">
            <v-list-item v-bind="props" title="group 1" />
          </template>
          <v-list-item value="a" title="a" />
          <v-list-item value="b" title="b" />
        </v-list-group>
        <v-list-group>
          <template #header="props">
            <v-list-item v-bind="props" title="group 2" />
          </template>
          <v-list-item value="c" title="c" />
          <v-list-item value="d" title="d" />
        </v-list-group>
        <v-list-group>
          <template #header="props">
            <v-list-item v-bind="props" title="group 3" />
          </template>
          <v-list-item value="e" title="e" />
          <v-list-item value="f" title="f" />
          <v-list-group>
            <template #header="props">
              <v-list-item v-bind="props" title="group 4" />
            </template>
            <v-list-item value="g" title="g" />
            <v-list-item value="h" title="h" />
          </v-list-group>
        </v-list-group>
      </v-list>
      <v-btn @click="activateStuff">activate</v-btn>

      <h2>select strategies</h2>
      <select v-model="selectStrategy">
        <option value="single-leaf">single-leaf</option>
        <option value="leaf">leaf</option>
      </select>
      <v-list :items="listItems" :select-strategy="selectStrategy" />

      <h2>open strategies</h2>
      <select v-model="openStrategy">
        <option value="single">single</option>
        <option value="multiple">multiple</option>
      </select>
      <v-list :items="listItems" :open-strategy="openStrategy" />

      <h2>router view</h2>
      <router-view />
    </div>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      useSlot: false,
      selected: [],
      selectStrategy: 'leaf',
      openStrategy: 'multiple',
      openStuff: null,
      openOnSelect: null,
      foo: null,
      open: null,
      test: null,
      open2: null,
      test2: ['/nested/foo/page2'],
      listItems: [
        {
          title: 'Foo',
          subtitle: 'Bar',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
          prependIcon: '$close',
        },
        {
          title: 'Group 1',
          children: [
            {
              title: 'Child 1',
              subtitle: 'Subtitle',
              // value: 'child1',
            },
            {
              title: 'Child 2',
              prependIcon: '$close',
              children: [
                {
                  title: 'Grandchild 1',
                  value: 'grandchild1',
                  // prependIcon: '$collapse',
                },
              ],
            },
          ],
        },
        // {
        //   title: 'Group 2',
        //   children: [
        //     {
        //       title: 'Child 3',
        //     },
        //   ],
        // },
      ],
      items: [
        {
          value: 'a',
          text: 'a',
        },
        {
          value: 'group1',
          text: 'group1',
          children: [
            {
              value: 'b',
              text: 'b',
            },
            {
              value: 'group3',
              text: 'group3',
              children: [
                {
                  value: 'e',
                  text: 'e',
                },
                {
                  value: 'f',
                  text: 'f',
                },
              ],
            },
          ],
        },
        {
          value: 'group2',
          text: 'group2',
          children: [
            {
              value: 'c',
              text: 'd',
            },
            {
              value: 'd',
              text: 'd',
            },
          ],
        },
      ],
      loadedItems: [
        {
          value: 'root',
          title: 'root',
          loaded: false,
          children: [],
        },
      ],
      opened: [],
      isCtrl: false,
      count: 1,
    }),
    mounted () {
      window.addEventListener('mousedown', this.ctrlHandler, { passive: true })
    },
    beforeUnmount () {
      window.removeEventListener('mousedown', this.ctrlHandler, { passive: true })
    },
    methods: {
      ctrlHandler (e) {
        this.isCtrl = e.ctrlKey
      },
      openStrategyFn ({ id, value, opened, children }) {
        const items = [id]

        while (items.length) {
          const item = items.shift()

          if (!children.has(item)) continue

          if (value) {
            opened.add(item)
          } else {
            opened.delete(item)
          }

          if (this.isCtrl) {
            items.push(...children.get(item))
          }
        }

        return opened
      },
      findItem (id) {
        const queue = [...this.loadedItems]

        while (queue.length) {
          const item = queue.shift()
          console.log('check', item, id)

          if (item.value === id) return item

          if (item.children?.length) queue.push(...item.children)
        }

        return null
      },
      loadItems ({ id, value, opened, children, parents }) {
        const item = this.findItem(id)

        if (item.loaded) {
          value ? this.opened.push(id) : this.opened.splice(this.opened.indexOf(id), 1)
        } else {
          setTimeout(() => {
            const value = `child #${this.count++}`
            item.children.push({
              value,
              title: value,
              loaded: false,
              children: [],
            })
            item.loaded = true

            this.opened.push(id)
          }, 1000)
        }
      },
      activateStuff () {
        const foo = ['a', 'g']
        this.openOnSelect = foo
        // console.log(this.$refs.listRef)
        for (const k of foo) {
          this.$refs.listRef.open(k, true)
        }
        // this.$refs.listRef.openParents(['a', 'g'])
        // this.openStuff = ['a', 'g']
      },
      doStuff () {
        // this.listItems = this.listItems.map((item, i) => i === 0 ? ({
        //   ...item,
        //   prependIcon: '$expand',
        // }) : item)
        this.useSlot = !this.useSlot
      },
    },
  }
</script>

<style lang="sass">
  .v-nested
    input[type="checkbox"]
      margin: 4px

  .v-nested-item:not(.v-nested-item--header)
    display: flex
    align-items: center
    margin-left: 21px

  .v-nested-group
    .items
      margin-left: calc(20px)

  // .v-list-group__header.v-list-item--active
  //   .v-list-item__overlay
  //     display: none

</style>
