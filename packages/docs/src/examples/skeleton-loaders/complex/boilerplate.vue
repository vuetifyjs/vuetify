<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-12"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="card-avatar, article, actions"
          ></v-boilerplate>

          <v-boilerplate type="date-picker"></v-boilerplate>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="article, actions"
          ></v-boilerplate>

          <v-boilerplate
            class="mb-6"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-boilerplate>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
          ></v-boilerplate>

          <v-boilerplate type="list-item-avatar-three-line, image, article"></v-boilerplate>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
  export default {
    // Vuetify components provide
    // a theme variable that is
    // used to determine dark
    inject: ['theme'],

    components: {
      // Create a new component that
      // extends v-skeleton-loader
      VBoilerplate: {
        functional: true,

        render (h, { data, props, children }) {
          return h('v-skeleton-loader', {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props,
            },
          }, children)
        },
      },
    },
  }
</script>
