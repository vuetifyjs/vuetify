<template>
  <v-container
    fluid
    pa-0
  >
    <v-layout wrap>
      <v-flex
        mb-3
        xs12
      >
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-comment-search"
          label="Search"
          box
          single-line
          clearable
        />
      </v-flex>
      <v-flex
        xs12
        mb-5
      >
        <v-data-iterator
          :items="gotchas"
          :search.sync="search"
          content-class="v-data-iterator--faq"
          hide-default-footer
        >
          <template v-slot:item="{ item: gotcha, index }">
            <div class="mb-5">
              <core-goto :id="`question-${index + 1}`">
                <doc-markdown :code="gotcha.q" />
              </core-goto>
              <v-paper
                class="pa-3"
                elevation="1"
              >
                <doc-markdown :code="gotcha.a" />

                <doc-markdown
                  v-if="gotcha.a2"
                  :code="gotcha.a2"
                />

                <doc-markup
                  v-if="gotcha.s"
                  :value="gotcha.s"
                  class="mb-0 mt-3"
                />
              </v-paper>
            </div>
          </template>
        </v-data-iterator>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FrequentlyAskedQuestions',

    data: () => ({
      search: null
    }),

    computed: {
      gotchas () {
        return this.$t('GettingStarted.FrequentlyAskedQuestions.gotchas')
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
      }
    }
  }
</script>

<style lang="sass">
.v-data-iterator--faq
  p
    margin: 0

.text-decoration-none
  text-decoration: none
</style>
