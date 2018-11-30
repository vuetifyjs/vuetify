<template>
  <v-list-tile
    :to="path"
    ripple
  >
    <v-list-tile-avatar
      v-if="avatar"
      :color="avatarColor"
    >
      <v-icon
        dark
        v-text="avatar"
      />
    </v-list-tile-avatar>
    <v-list-tile-action v-else-if="icon">
      <v-icon v-text="icon" />
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        <span
          v-if="noMarkdown"
          v-text="text"
        />
        <doc-markdown v-else>{{ text }}</doc-markdown>
      </v-list-tile-title>
      <v-list-tile-sub-title v-if="subtext">
        <span
          v-if="noMarkdown"
          v-text="subtext"
        />
        <doc-markdown v-else>{{ subtext }}</doc-markdown>
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <slot />
  </v-list-tile>
</template>

<script>
  export default {
    props: {
      avatar: {
        type: String,
        default: undefined
      },
      avatarColor: {
        type: String,
        default: undefined
      },
      text: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      icon: {
        type: [Boolean, String],
        default: false
      },
      noMarkdown: {
        type: Boolean,
        default: false
      },
      subtext: {
        type: String,
        default: undefined
      },
      to: {
        type: String,
        default: undefined
      }
    },

    computed: {
      path () {
        if (!this.to) return this.to

        const lang = this.$route.params.lang || 'en'

        return {
          path: `/${lang}/${this.to}`
        }
      }
    }
  }
</script>
