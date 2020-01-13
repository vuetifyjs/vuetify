<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-card
        width="342"
        v-bind="attrs"
      >

        <v-sheet
          v-if="internalAttrs.image"
          class="d-flex align-center justify-center"
          color="grey lighten-3"
          height="200"
        >
          <v-icon size="64">mdi-image</v-icon>
        </v-sheet>

        <v-card-title>
          Card title
        </v-card-title>

        <v-card-subtitle v-if="internalAttrs.subtitle">Secondary text</v-card-subtitle>

        <v-card-text v-if="internalAttrs.supportingText">
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],

    data: vm => ({
      internalAttrs: vm.attrs,
    }),

    computed: {
      $_attrs: {
        get () {
          return this.internalAttrs
        },
        set (val) {
          this.internalAttrs = val
        },
      },
    },

    watch: {
      attrs (val) {
        this.internalAttrs = val
      },
    },

    created () {
      for (const prop of ['outlined', 'raised', 'shaped', 'tile']) {
        this.$watch(`$_attrs.${prop}`, this.resetElevation)
      }
    },

    methods: {
      resetElevation () {
        this.internalAttrs.elevation = undefined
      },
    },
  }
</script>
