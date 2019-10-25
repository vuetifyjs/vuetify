<template>
  <v-container
    fluid
    pa-0
  >
    <v-layout wrap>
      <v-flex
        mb-4
        xs12
      >
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-comment-search"
          label="Search"
          filled
          single-line
          clearable
        />
      </v-flex>
      <v-flex
        xs12
        mb-12
      >
        <v-data-iterator
          :items="gotchas"
          :search.sync="search"
          class="v-data-iterator--faq"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:item="{ item: gotcha, index }">
            <section
              :id="gotcha.id"
              class="mb-12"
            >
              <core-goto
                :id="gotcha.id"
                :code="gotcha.q"
              />
              <v-card
                class="pa-4"
                outlined
              >
                <doc-markdown :code="gotcha.a" />

                <doc-markdown
                  v-if="gotcha.a2"
                  :code="gotcha.a2"
                />

                <doc-markup
                  v-if="gotcha.s"
                  :value="gotcha.s"
                  class="mb-0 mt-4"
                />
              </v-card>
            </section>
          </template>
        </v-data-iterator>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'FrequentlyAskedQuestions',

    data: () => ({
      search: null,
    }),

    computed: {
      gotchas () {
        return this.$t('GettingStarted.FrequentlyAskedQuestions.gotchas').map(faq => {
          return Object.assign({}, faq, {
            id: kebabCase(faq.q),
          })
        })
      },
      filtered () {
        if (!this.search) return this.gotchas

        const search = this.search.toLowerCase()

        return this.gotchas.filter(gotcha => {
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
