<template>
  <v-list-item
    :to="path"
    v-bind="customAttrs"
    class="v-list-item--doc"
    ripple
    v-on="$listeners"
  >
    <v-list-item-avatar
      v-if="avatar"
      :color="avatarColor"
    >
      <v-icon
        dark
        v-text="avatar"
      />
    </v-list-item-avatar>
    <v-list-item-icon v-else-if="icon">
      <v-icon v-text="icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <span
          v-if="noMarkdown"
          v-text="text"
        />
        <doc-markdown v-else>{{ text }}</doc-markdown>
      </v-list-item-title>
      <v-list-item-subtitle v-if="subtext">
        <span
          v-if="noMarkdown"
          v-text="subtext"
        />
        <doc-markdown v-else>{{ subtext }}</doc-markdown>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-chip
      v-if="chip"
      :color="chipColor"
      x-small
      text-color="white"
    >{{ chip }}</v-chip>
    <slot />
  </v-list-item>
</template>

<script>
  export default {
    inheritAttrs: false,

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
      href: {
        type: String,
        default: undefined
      },
      name: {
        type: String,
        default: ''
      },
      icon: {
        type: [Boolean, String],
        default: false
      },
      chip: {
        type: String,
        default: ''
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
      chipColor () {
        if (this.chip === 'new') return 'primary'
        if (this.chip === 'updated') return 'warning'
        if (this.chip === 'deprecated') return 'black'
      },
      customAttrs () {
        const attrs = {
          ...this.$attrs
        }

        if (this.href) {
          attrs.target = '_blank'
          attrs.rel = 'noopener'
          attrs.href = this.href
        }

        return attrs
      },
      path () {
        if (!this.to) return this.to

        const lang = this.$route.params.lang || this.$i18n.fallbackLocale

        return {
          path: `/${lang}/${this.to}`
        }
      }
    }
  }
</script>

<style lang="stylus">
.v-list-item--doc {
  p {
    margin-bottom: 0;
  }
}
</style>
