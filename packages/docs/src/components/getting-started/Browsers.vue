<template>
  <v-list class="transparent py-0">
    <v-layout
      wrap
    >
      <v-flex
        v-for="browser in browsers"
        :key="browser.title"
        px-0
        xs12
        sm6
        md4
      >
        <v-list-item>
          <v-list-item-avatar
            :color="browser.supported ? browser.supported === 'polyfill' ? 'warning' : 'success' : 'error'"
          >
            <v-icon
              v-if="typeof browser.icon === 'string'"
              dark
            >mdi-{{ browser.icon }}</v-icon>
            <v-icon
              v-for="icon in browser.icon"
              v-else
              :key="icon"
              class="browser-icon--split"
              dark
            >mdi-{{ icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ browser.title }}</v-list-item-title>
            <v-list-item-subtitle><span>{{ $t(getBrowserSupport(browser)) }}</span></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-flex>
    </v-layout>
  </v-list>
</template>

<script>
  export default {
    data: () => ({
      browsers: [
        { icon: 'google-chrome', title: 'Chrome', supported: true },
        { icon: 'firefox', title: 'Firefox', supported: true },
        { icon: 'edge', title: 'Edge', supported: true },
        { icon: 'apple-safari', title: 'Safari 10+', supported: true },
        { icon: ['internet-explorer', 'apple-safari'], title: 'IE11 / Safari 9', supported: 'polyfill' },
        { icon: 'internet-explorer', title: 'IE9 / IE10', supported: false },
      ],
    }),

    methods: {
      getBrowserSupport (browser) {
        if (browser.supported === true) return 'GettingStarted.QuickStart.browserSupport.supported'
        else if (browser.supported === false) return 'GettingStarted.QuickStart.browserSupport.notSupported'
        else return `GettingStarted.QuickStart.browserSupport.${browser.supported}`
      },
    },
  }
</script>

<style lang="sass">
.browser-icon--split
  position: absolute

  &:nth-child(1)
    clip: rect(0px 21px 40px 0px)
  &:nth-child(2)
    clip: rect(0px 40px 40px 22px)
</style>
