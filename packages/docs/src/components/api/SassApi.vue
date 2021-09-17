<template>
  <v-row>
    <v-col cols="12">
      <api-search
        v-model="apiItem"
        :items="items"
        :label="$t('search-sass-api')"
      />
    </v-col>
    <v-col
      v-if="apiItem"
      cols="12"
    >
      <api-section
        :key="`sass-${apiItem}`"
        hide-header
        :name="apiItem"
        section="sass"
      />
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import sassApi from '@/api/sass'

  export default {
    name: 'SassApi',

    data: () => ({
      apiItem: '',
      icons: {
        component: '$mdiViewDashboardOutline',
        functional: '$mdiViewStream',
        theme: '$mdiThemeLightDark',
      },
      types: {
        $vuetify: 'functional',
      },
      sassApi,
    }),

    computed: {
      locale: get('route/params@locale'),
      items () {
        const items = []
        for (const item of this.sassApi) {
          const type = this.types[item] || 'component'
          items.push({
            text: item,
            icon: this.icons[type],
          })
        }
        return items
      },
    },
  }
</script>
