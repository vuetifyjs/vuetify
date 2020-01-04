<template>
  <v-container
    :class="attrs.bordered ? 'grey lighten-2' : undefined"
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-badge
        :content="!attrs.icon ? '9' : undefined"
        :icon="attrs.icon ? 'mdi-bell' : undefined"
        :value="!attrs.hidden"
        v-bind="computedAttrs"
      >
        <v-icon
          v-if="!attrs.text"
          x-large
        >
          mdi-vuetify
        </v-icon>

        <span v-else>Example of inline text</span>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      computedAttrs () {
        const {
          default: x,
          hidden: y,
          ...attrs
        } = this.attrs

        return attrs
      },
    },
  }
</script>
