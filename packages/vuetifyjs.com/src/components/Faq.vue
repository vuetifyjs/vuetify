<template>
  <v-container
    fluid
    pa-0
  >
    <v-layout wrap>
      <v-flex
        mb-5
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
          hide-actions
        >
          <template slot="item" slot-scope="{ item: gotcha, index }">
            <div class="mb-5">
              <h5
                :id="`question-${index + 1}`"
                class="subheading font-weight-medium mb-2"
              >
                <a
                  :href="`#question-${index + 1}`"
                  class="text-decoration-none"
                  @click="$vuetify.goTo(`#question-${index + 1}`, { offset: -80 })"
                >
                  <v-hover>
                    <v-icon
                      slot-scope="{ hover }"
                      :color="hover ? 'primary' : ''"
                      class="mr-2"
                      size="18"
                    >
                      mdi-pound
                    </v-icon>
                  </v-hover>
                </a>
                <span v-html="gotcha.q" />
              </h5>
              <v-paper
                class="pa-3"
                elevation="1"
              >
                <core-markdown :code="gotcha.a" />
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
      }
    }
  }
</script>

<style>
.v-data-iterator--faq p {
  margin: 0;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
