<template>
  <v-responsive
    max-height="252"
    :class="$_attrs.sticky ? undefined : 'fill-height'"
    style="overflow-y: auto;"
    tag="v-container"
  >
    <v-row
      :align="$_attrs.sticky ? undefined : 'center'"
      :class="$_attrs.sticky ? undefined : 'fill-height'"
      :style="$_attrs.sticky ? 'min-height: 300vh;' : undefined"
    >
      <v-col>
        <v-banner v-bind="$_attrs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis magnam necessitatibus possimus

          <template v-if="attrs.action" v-slot:actions>
            <v-btn
              color="deep-purple accent-4"
              text
            >
              Action Button
            </v-btn>
          </template>
        </v-banner>
      </v-col>
    </v-row>
  </v-responsive>
</template>

<script>
  export default {
    name: 'BannersUsage',

    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      $_attrs () {
        const {
          icon = undefined,
          ...attrs
        } = this.attrs

        return {
          ...attrs,
          icon: icon ? 'mdi-vuetify' : undefined,
        }
      },
    },
  }
</script>
