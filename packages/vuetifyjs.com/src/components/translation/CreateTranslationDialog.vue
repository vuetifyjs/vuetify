<template lang="pug">
  v-dialog(v-model="show" max-width="50%")
    v-card
      v-card-title(class="primary")
        h3(class="white--text") Create new translation
      v-card-text
        div.mb-3
          v-text-field(
            label="Name"
            v-model="name"
            placeholder="English"
            hint="Name of language written in that language (e.g 日本語 for Japanese)"
            persistent-hint
          )
        div.mb-3
          v-text-field(
            label="Locale code"
            v-model="locale"
            placeholder="en"
          )
          div Use tag and/or subtag property from <a href="http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry">this</a> reference
        div.mb-3
          v-text-field(
            label="Country code"
            v-model="country"
            placeholder="us"
          )
          div Use two-letter code from <a href="https://countrycode.org/">this</a> reference
        v-btn(@click="create") create
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        locale: '',
        country: ''
      }
    },
    computed: {
      show: {
        get () {
          return this.$store.state.translation.showCreateDialog
        },
        set (v) {
          this.$store.commit('translation/SHOW_CREATE_DIALOG', v)
        }
      }
    },
    methods: {
      async create () {
        try {
          const payload = {
            name: this.name,
            locale: this.locale,
            country: this.country
          }

          const response = await this.$store.dispatch('translation/new', payload)

          if (response.status === 200) {
            // TODO: change to newly created language
            // problem is we have to wait for compilation
            // to finish. and no way to know?
          }
        } catch (err) {
          // console.log(err)
          throw err
        } finally {
          this.$store.commit('translation/SHOW_CREATE_DIALOG', false)
        }
      }
    }
  }
</script>
