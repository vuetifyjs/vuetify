<template>
  <v-container
    grid-list-md
    fluid
    pa-0
    mb-5
  >
    <v-layout wrap>
      <v-flex
        v-for="(philosophy, i) in philosophies"
        :key="i"
        xs12
        md6
        d-flex
      >
        <v-card class="text-xs-center">
          <div>
            <v-avatar
              :color="philosophy.color"
              class="ma-4"
              size="150"
            >
              <v-icon dark size="54" v-text="philosophy.icon" />
            </v-avatar>
          </div>
          <v-headline class="mb-3" v-text="philosophy.title" />
          <v-card-text class="text-xs-justify">
            <doc-markdown :code="philosophy.caption" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    provide: {
      namespace: undefined
    },

    data: () => ({
      icons: [
        {
          icon: 'mdi-account-multiple',
          color: 'indigo'
        },
        {
          icon: 'mdi-toolbox',
          color: 'purple'
        },
        {
          icon: 'mdi-update',
          color: 'red lighten-2'
        },
        {
          icon: 'mdi-flash',
          color: 'yellow darken-3'
        }
      ]
    }),

    computed: {
      philosophies () {
        return this.$t('GettingStarted.WhyVuetify.philosophies', 'en').map((o, i) => {
          return Object.assign({}, o, this.icons[i])
        })
      }
    }
  }
</script>
