<template>
  <div class="mt-2 mb-6">
    <v-menu
      v-model="menu"
      :open-on-click="filteredIcons.length > 0"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          hide-details
          :loading="!icons"
          clearable
          outlined
          placeholder="Search for icons (e.g. account, close)"
          v-bind="attrs"
          @click:clear="reset"
          v-on="on"
        >
          <template v-slot:prepend-inner>
            <v-icon
              v-if="copied"
              color="primary"
            >
              mdi-{{ search }}
            </v-icon>
            <code class="mx-1 py-1">mdi-</code>
          </template>

          <template v-slot:append>
            <span
              v-if="copied"
              class="text--primary pt-1"
            >
              Copied
            </span>
          </template>
        </v-text-field>
      </template>

      <v-list v-show="filteredIcons.length > 0">
        <v-virtual-scroll
          :items="filteredIcons"
          :item-height="56"
          :height="Math.min(filteredIcons.length * 56, 336)"
        >
          <template v-slot="{ item }">
            <v-list-item
              :key="item"
              @click.stop="copy(item)"
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                  class="mr-2"
                  v-text="item"
                />
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.substring(4)" />
              </v-list-item-content>

              <v-btn
                icon
                @click.stop="copy(item)"
              >
                <v-icon size="21">
                  $mdiContentCopy
                </v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import * as allIcons from '@mdi/js'
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'IconList',

    data: () => ({
      copied: false,
      icons: [],
      menu: false,
      search: '',
    }),

    computed: {
      filteredIcons () {
        if (!this.icons.length || !this.search) return []
        if (!this.search) return this.icons

        return this.icons.filter(item => {
          return item.toLowerCase().match(this.search.toLowerCase())
        })
      },
    },

    watch: {
      search () {
        if (this.filteredIcons.length > 0 && !this.menu) {
          this.menu = true
        } else if (!this.filteredIcons.length) {
          this.menu = false
        }
      },
    },

    mounted () {
      this.icons = Object.keys(allIcons).map(icon => {
        return kebabCase(icon)
      })
    },

    methods: {
      copy (item) {
        navigator.clipboard.writeText(item).then(() => {
          this.search = item.substring(4)
          this.copied = true
        })
      },
      reset () {
        this.menu = false
        this.copied = false
        this.search = ''
      },
    },
  }
</script>
