<template>
  <views-doc>
    <section id="roadmap">
      <v-container>
        <v-timeline
          class="mb-5"
          dense
        >
          <v-timeline-item
            v-for="(item, i) in items"
            v-if="index == null || index >= i"
            :key="i"
            :icon="item.complete ? 'mdi-check' : item.icon"
            :color="item.complete ? 'success darken-1' : item.color"
            :small="item.complete || item.small"
            fill-dot
          >
            <strong
              slot="opposite"
              :class="index === i ? 'primary--text' : undefined"
              v-text="item.caption"
            />
            <v-card
              :class="`elevation-${item.value ? 8 : 1}`"
              class="py-2"
              hover
              @click.native="item.value = !item.value"
            >
              <v-card-title class="py-0 pr-2">
                <span
                  class="body-2"
                  v-text="item.title"
                />
                <v-spacer />
                <v-btn
                  :color="item.value ? 'primary' : ''"
                  :disabled="item.complete"
                  :input-value="item.value"
                  :ripple="false"
                  class="font-weight-light ma-0"
                  flat
                >
                  <span
                    class="mr-2"
                    v-text="item.caption"
                  />
                  <v-icon
                    small
                  >mdi-calendar</v-icon>
                </v-btn>
              </v-card-title>
              <v-expand-transition>
                <div v-if="(index != null && index >= i) || item.value">
                  <v-card-text>
                    <helpers-markdown>{{ item.text }}</helpers-markdown>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <misc-support-vuetify />
      </v-container>
    </section>
  </views-doc>
</template>

<script>
  const release = {
    icon: 'mdi-package-variant-closed',
    color: 'indigo lighten-1'
  }

  const packages = {
    icon: 'mdi-server-network',
    color: 'red lighten-2',
    small: true
  }

  const site = {
    icon: 'mdi-content-cut',
    color: 'blue-grey',
    small: true
  }

  const video = {
    icon: 'mdi-video',
    color: 'blue',
    small: true
  }

  export default {
    data: () => ({
      index: null,
      interval: null,
      items: [
        {
          ...release,
          complete: true,
          title: 'Alpha Launch',
          caption: 'December 2016',
          text: 'Vuetify is officially announced to the public. The framework initially shipped with 40 components and came in at a whopping 46kb.',
          value: false
        },
        {
          ...release,
          complete: true,
          title: 'v1.0 Release',
          caption: 'February 2018',
          text: 'The officialy v1.0 release party. After 18 months and kaels sanity, we rolled into our first **MAJOR** release.',
          value: false
        },
        {
          ...release,
          complete: true,
          title: 'v1.1 Release',
          caption: 'June 2018',
          text: 'A complete rebuild of all form functionality. Abstracted features from components like `v-select` into new implementations, `v-autocomplete`, `v-combobox`, etc. First official support of **RTL** support.',
          value: false
        },
        {
          ...release,
          complete: true,
          title: 'v1.2 Release',
          caption: 'July 2018',
          text: 'Add new components, `v-img`, `v-rating` and `v-hover`. Improve theme propagation system and expand the functionality of the **colorable** mixin.',
          value: false
        },
        {
          ...release,
          complete: false,
          title: 'v1.3 Release',
          caption: 'October 2018',
          text: 'Add new components, `v-treeview`, `v-timeline` and `v-item-group`. Unify the interfaces used in `v-tabs` and `v-carousel`. Improve the **vuetify-loader** to support effortless application tree-shaking of Vuetify components.',
          value: true
        },
        {
          ...packages,
          complete: false,
          title: 'AWS Cognito Vuex Module',
          caption: 'November 2018',
          text: 'A fully featured Vuex module for interacting with AWS Cognito. Useful for websites that require authentication.',
          value: false
        },
        {
          ...release,
          complete: false,
          title: 'v1.4 Release',
          caption: 'December 2018',
          text: 'Add new components, `v-calendar`, `v-sparkline` and a abstracting `v-toolbar`\'s functionality into multiple components.',
          value: false
        },
        {
          ...release,
          complete: false,
          title: 'v1.5 Release',
          caption: 'Q1 2019',
          text: 'Add new components, `v-file-upload`, `v-discovery` and `v-color-picker`.',
          value: false
        },
        {
          ...site,
          complete: false,
          title: 'Vuetify Snips',
          caption: 'Q2 2019',
          text: 'Website dedicated to creating and sharing Vuetify snippets.',
          value: false
        },
        {
          ...release,
          complete: false,
          title: 'v2.0 Release',
          caption: 'Q2 2019',
          text: 'A complete rebuild of the framework core. Improving the layout and theme systems, platform integration, accessibility and performance. Fully modular and automatic tree-shaking from the vuetify-loader.',
          value: false
        }
      ]
    })
  }
</script>

<style lang="stylus">
  #roadmap .v-timeline-item__body
    p
      margin: 0
</style>
