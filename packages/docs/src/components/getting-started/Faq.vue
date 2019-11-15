<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        clearable
        filled
        label="Search"
        prepend-inner-icon="mdi-comment-search"
        single-line
      />
    </v-col>

    <v-col
      class="mb-12"
      cols="12"
    >
      <v-data-iterator
        :items="gotchas"
        :search.sync="search"
        class="v-data-iterator--faq"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item="{ item: gotcha, index }">
          <section
            :id="gotcha.id"
            class="mb-12"
          >
            <base-goto
              :id="gotcha.id"
              :code="gotcha.q"
            />

            <v-card
              class="pa-4"
              outlined
            >
              <base-markdown :code="gotcha.a" />

              <base-markdown
                v-if="gotcha.a2"
                :code="gotcha.a2"
              />

              <template v-if="gotcha.s">
                <v-btn
                  class="mt-4"
                  depressed
                  small
                  @click="gotcha.m = !gotcha.m"
                >
                  Open code snippet

                  <v-icon right>mdi-code-tags</v-icon>
                </v-btn>

                <div class="mt-3 mb-n4">
                  <v-expand-transition>
                    <div
                      v-show="gotcha.m"
                      class="swing-transition"
                    >
                      <template v-if="Array.isArray(gotcha.s)">
                        <doc-markup
                          v-for="(g, i) in gotcha.s"
                          :key="i"
                          :value="g"
                        />
                      </template>

                      <doc-markup
                        v-else
                        :value="gotcha.s"
                      />
                    </div>
                  </v-expand-transition>
                </div>
              </template>
            </v-card>
          </section>
        </template>
      </v-data-iterator>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'GettingStartedFaq',

    data: () => ({
      internalFiltered: [],
      search: null,
    }),

    computed: {
      gotchas () {
        return this.$t('Introduction.FrequentlyAskedQuestions.gotchas').map(faq => {
          return Object.assign({}, faq, {
            id: kebabCase(faq.q),
            m: false,
          })
        })
      },
      filtered: {
        get () {
          return this.internalFiltered
        },
        set (val) {
          this.internalFiltered = this.filterItems()
        },
      },
    },

    beforeMount () {
      this.internalFiltered = this.filterItems()
    },

    methods: {
      filterItems () {
        const search = (this.search || '').toLowerCase()

        return this.gotchas
          .filter(gotcha => {
            const q = gotcha.q.toLowerCase()
            const a = gotcha.a.toLowerCase()

            return (
              q.indexOf(search) > -1 ||
              a.indexOf(search) > -1
            )
          })
      },
    },
  }
</script>

<style lang="sass">
.v-data-iterator--faq
  p
    margin: 0

.text-decoration-none
  text-decoration: none
</style>
