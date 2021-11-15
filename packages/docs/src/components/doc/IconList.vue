<template>
  <div class="mt-2 mb-6">
    <v-menu
      v-model="menu"
      :open-on-click="filteredIcons.length > 0"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="search"
          hide-details
          clearable
          outlined
          placeholder="Search for icons (e.g. account, close)"
          v-bind="attrs"
          @click:clear="reset"
          v-on="on"
        >
          <template #prepend-inner>
            <v-icon
              v-if="copied"
              color="primary"
            >
              mdi-{{ search }}
            </v-icon>
            <code class="mx-1 py-1">mdi-</code>
          </template>

          <template #append>
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
          :bench="6"
          :height="Math.min(filteredIcons.length * 56, 336)"
        >
          <template #default="{ item }">
            <v-list-item
              :key="item"
              @click.stop="copy(item)"
            >
              <v-list-item-icon>
                <v-icon
                  color="primary"
                  class="mr-2"
                >mdi-{{ item }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item }}</v-list-item-title>
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
  import icons from '@mdi/svg/meta.json'
  import { distance } from '@/util/helpers'

  export default {
    name: 'IconList',

    data: () => ({
      copied: false,
      menu: false,
      search: '',
    }),

    computed: {
      iconDistance () {
        return icons.map(icon => ({
          icon,
          distance: Math.max(
            distance(this.search, icon.name),
            ...icon.aliases.map(v => distance(this.search, v))
          ),
        }))
      },
      filteredIcons () {
        if (!icons.length || !this.search) return []
        if (!this.search) return icons

        const items = this.iconDistance
          .filter(v => v.distance > 0.7)
          .sort((a, b) => {
            return b.distance - a.distance
          })

        return items.map(v => v.icon.name)
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

    methods: {
      copy (item) {
        navigator.clipboard.writeText('mdi-' + item).then(() => {
          this.search = item
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
