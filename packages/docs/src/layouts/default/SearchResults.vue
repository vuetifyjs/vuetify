<template>
  <!--  eslint-disable vue/no-template-shadow -->
  <!--  eslint-disable vue/valid-v-for -->
  <!--  eslint-disable vue/require-v-for-key -->
  <v-list dense nav>
    <template v-for="(group, i) in groups">
      <v-divider
        v-if="i !== 0"
        class="mb-2 mt-2 ml-2 mr-n2"
      />

      <v-subheader
        class="text--primary font-weight-black text-uppercase"
        v-text="group.name"
      />

      <template v-for="child in group.items">
        <v-list-item
          v-if="child.items[0]._highlightResult.hierarchy.lvl1.matchLevel === 'full'"
          :to="new URL(location.origin + child.items[0].url).pathname"
        >
          <v-list-item-content>
            <v-list-item-title>
              <div class="d-inline-block" v-html="child.items[0]._highlightResult.hierarchy.lvl1.value" />

              <v-list-item-subtitle class="d-inline-flex pl-1">
                &rsaquo; Home
              </v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-else>
          <v-list-item class="mb-0">
            <v-list-item-content class="pb-1">
              <v-list-item-title
                v-html="child.name"
              />
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="item in child.items"
            :to="item.url"
            class="pl-4 mb-0"
          >
            <v-list-item-content>
              <v-list-item-subtitle
                class="text-wrap font-weight-medium"
                v-html="makeBreadcrumbs(item)"
              />

              <v-list-item-subtitle
                v-if="item.content"
                class="text-caption text-wrap text--primary font-weight-regular pl-2"
                v-html="item._highlightResult.content.value"
              />
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'SearchResults',

    props: ['groups'],

    data: () => ({ location }),

    methods: {
      URL,
      makeBreadcrumbs (item) {
        const hierarchy = item._highlightResult.hierarchy
        let str = ''

        for (const lvl of Object.keys(hierarchy).slice(2)) {
          if (str.length) str += ' &rsaquo; '
          str += hierarchy[lvl].value
          if (hierarchy[lvl].matchLevel === 'full') break
        }

        return str
      },
    },
  }
</script>

<style lang="sass" scoped>
  .v-list-item
    min-height: 0

  ::v-deep mark
    background: rgb(33, 150, 243, 30%)
    color: inherit
</style>
