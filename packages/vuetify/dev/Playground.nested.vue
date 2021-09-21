<template>
  <v-app>
    <div class="pa-10 d-flex justify-space-around">
      <!-- <v-nested>
        <v-nested-item value="a">a</v-nested-item>
        <v-nested-group value="group1">
          <template v-slot:header>
            group1
          </template>
          <v-nested-item value="b">b</v-nested-item>
          <v-nested-group value="group3">
            <template v-slot:header>
              group3
            </template>
            <v-nested-item value="e">e</v-nested-item>
            <v-nested-item value="f">f</v-nested-item>
          </v-nested-group>
        </v-nested-group>
        <v-nested-group value="group2">
          <template v-slot:header>
            group2
          </template>
          <v-nested-item value="c">c</v-nested-item>
          <v-nested-item value="d">d</v-nested-item>
        </v-nested-group>
      </v-nested>-->

      <!-- <v-nested v-model:selected="foo" :items="items" select-strategy="independent" /> -->

      <v-nested :items="loadedItems" :open-strategy="loadItems" :opened="opened" />

      <v-nested :items="items" :open-strategy="openStrategy" />
    </div>
    <div>
      {{ foo }}
    </div>

    <v-list v-model:selected="test" v-model:opened="open">
      <v-list-item active-color="primary" to="/" exact>foo</v-list-item>
      <v-list-item active-color="primary" to="/page1">bar</v-list-item>
      <v-list-group>
        <template #header="props">
          <v-list-item active-color="primary" prepend-icon="$close" v-bind="props" :active="$route.path.startsWith('/nested')">
            header
          </v-list-item>
        </template>
        <v-list-item active-color="primary" to="/nested/page1">baz</v-list-item>
        <v-list-item active-color="primary" to="/nested/page2">bro</v-list-item>
      </v-list-group>
    </v-list>
    <div>
      {{ test }}
    </div>
    <div>
      {{ open }}
    </div>

    <v-list v-model:selected="test2" v-model:opened="open2">
      <v-list-item value="/">foo</v-list-item>
      <v-list-item value="/page1">bar</v-list-item>
      <v-list-group>
        <template #header="props">
          <v-list-item prepend-icon="$close" v-bind="props">
            header
          </v-list-item>
        </template>
        <v-list-item value="/nested/page1">baz</v-list-item>
        <v-list-item value="/nested/page2">bro</v-list-item>
        <v-list-group>
          <template #header="props">
            <v-list-item prepend-icon="$close" v-bind="props">
              header 2
            </v-list-item>
          </template>
          <v-list-item value="/nested/foo/page1">baz 2</v-list-item>
          <v-list-item value="/nested/foo/page2">bro 2</v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <div>
      {{ test2 }}
    </div>
    <div>
      {{ open2 }}
    </div>

    <v-list open-on-select v-model:selected="openOnSelect" select-strategy="leaf">
      <v-list-group>
        <template #header="props">
          <v-list-item v-bind="props">group 1</v-list-item>
        </template>
        <v-list-item value="a">a</v-list-item>
        <v-list-item value="b">b</v-list-item>
      </v-list-group>
      <v-list-group>
        <template #header="props">
          <v-list-item v-bind="props">group 2</v-list-item>
        </template>
        <v-list-item value="c">c</v-list-item>
        <v-list-item value="d">d</v-list-item>
      </v-list-group>
      <v-list-group>
        <template #header="props">
          <v-list-item v-bind="props">group 3</v-list-item>
        </template>
        <v-list-item value="e">e</v-list-item>
        <v-list-item value="f">f</v-list-item>
        <v-list-group>
          <template #header="props">
            <v-list-item v-bind="props">group 4</v-list-item>
          </template>
          <v-list-item value="g">g</v-list-item>
          <v-list-item value="h">h</v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <v-btn @click="openOnSelect = ['a', 'g']">select</v-btn>

    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      openOnSelect: null,
      foo: null,
      open: null,
      test: null,
      open2: null,
      test2: ['/nested/foo/page2'],
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
          text: 'root',
          loaded: false,
          children: [],
        },
      ],
      opened: [],
      isCtrl: false,
      count: 1,
    }),
    mounted () {
      window.addEventListener('click', this.ctrlHandler, { passive: true })
      console.log(this.$route, this.$route.path.startsWith('/nested'))
    },
    beforeUnmount () {
      window.removeEventListener('click', this.ctrlHandler, { passive: true })
    },
    methods: {
      ctrlHandler (e) {
        this.isCtrl = e.ctrlKey
      },
      openStrategy ({ id, value, opened, children }) {
        const items = [id]

        while (items.length) {
          const item = items.shift()

          if (!children.has(item)) continue

          if (value) {
            opened.add(item)
          } else if (!value) {
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
              text: value,
              loaded: false,
              children: [],
            })
            item.loaded = true

            this.opened.push(id)
          }, 1000)
        }
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

  .v-list-group__header.v-list-item--active
    .v-list-item__overlay
      display: none

</style>
