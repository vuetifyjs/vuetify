<template lang="pug">
  v-badge(v-if="isTranslating" v-model="isTranslating" left :color="color" class="translatable")
    v-icon(dark slot="badge" @click.capture.prevent="translate(i18n)") mode_edit
    slot
  div(v-else)
    slot
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    name: 'Translatable',

    inheritAttrs: false,

    props: {
      i18n: {
        type: String,
        required: true
      }
    },

    computed: {
      ...mapState('translation', ['buttons', 'isTranslating']),
      status () {
        const state = this.buttons.find(b => b.key === this.i18n)
        return state ? state.status : 'unchanged'
      },
      color () {
        switch (this.status) {
          case 'updated': return 'warning'
          case 'missing': return 'error'
          case 'new': return 'success'
          default: return 'grey'
        }
      },
      locale () {
        return this.$i18n.locale
      }
    },
    watch: {
      value: {
        handler: 'fetchStatus',
        immediate: true
      },
      locale: {
        handler: 'fetchStatus'
      }
    },
    created () {
      this.isTranslating && this.registerBtn({ key: this.i18n, status: 'unchanged' })
    },
    beforeDestroy () {
      this.isTranslating && this.unregisterBtn({ key: this.i18n })
    },
    methods: {
      ...mapMutations('translation', {
        translate: 'TRANSLATE',
        registerBtn: 'REGISTER_BTN',
        unregisterBtn: 'UNREGISTER_BTN',
        updateBtn: 'UPDATE_BTN'
      }),
      async fetchStatus () {
        if (!this.isTranslating || this.i18n.length <= 0) return

        try {
          const msg = { locale: this.locale, key: this.i18n }
          const response = await this.$store.dispatch('translation/status', msg)

          if (response.status === 200 && response.data.status) {
            let status = response.data.status

            this.updateBtn({ key: this.i18n, status })
          }
        } catch (err) {
          // console.log(err)
          throw err
        }
      }
    }
  }
</script>

<style lang="stylus">
  .translatable
    cursor: pointer
</style>
