<template>
  <div class="ma-4 pa-4">
    <v-card>
      <v-card-title>
        Search for Public APIs
      </v-card-title>

      <v-card-text>
        Explore hundreds of free API's ready for consumption! For more information visit
        <a
          class="text-grey-lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
          rel="noopener noreferrer"
        >the GitHub repository</a>.
      </v-card-text>

      <v-card-text>
        <v-autocomplete
          v-model="model"
          v-model:search="search"
          :items="items"
          :loading="isLoading"
          hide-no-data
          hide-selected
          item-title="Description"
          item-value="API"
          label="Public APIs"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>

      <v-divider></v-divider>

      <v-expand-transition>
        <div v-if="model">
          <v-list color="red-lighten-3">
            <v-list-item
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-item-header>
                <v-list-item-title>{{ field.value }}</v-list-item-title>

                <v-list-item-subtitle>{{ field.key }}</v-list-item-subtitle>
              </v-list-item-header>
            </v-list-item>
          </v-list>
        </div>
      </v-expand-transition>

      <v-divider v-if="model"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :disabled="!model"
          variant="outlined"
          @click="model = null"
        >
          Clear

          <v-icon end>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <pre>{{ JSON.stringify(entries, null, 2) }}</pre>
  </div>
</template>

<script>
  export default {
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      },
    },

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const { entries } = res
            this.entries = entries.slice(0, 100)
            this.count = 100
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },

  }
</script>
