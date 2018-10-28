<template lang="pug">
  v-bottom-sheet(hide-overlay persistent v-model="showBar")
    v-card
      v-container(fluid)
        v-layout(wrap row)
          v-flex(xs12)
            h1.subheading {{ currentKey }}
          v-flex(xs6 pr-2)
            v-textarea(
              label="Original"
              disabled
              outline
              hide-details
              :value="$t(currentKey, 'en')")
          v-flex(xs6 pl-2)
            v-textarea(
              label="Translation"
              outline
              hide-details
              v-model="value")
          v-flex(xs6)
            v-chip
              v-avatar(color="warning" class="white--text")
                span {{ outdatedKeys }}
              span Outdated
            v-chip
              v-avatar(color="error" class="white--text")
                span {{ missingKeys }}
              span Missing
          v-flex(xs6 text-xs-right)
            v-btn(@click="show(false)" outline color="grey") close
            v-btn(
              @click="save"
              color="primary"
              :loading="isLoading"
            ) save
</template>

<script>
  import deepmerge from 'deepmerge'

  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    data: () => ({
      isLoading: false,
      value: ''
    }),

    computed: {
      ...mapState({
        buttons: state => state.translation.buttons,
        showBar: state => state.translation.showBar,
        currentKey: state => state.translation.currentKey
      }),
      outdatedKeys () {
        return this.buttons.filter(b => b.status === 'updated').length
      },
      missingKeys () {
        return this.buttons.filter(b => b.status === 'missing').length
      }
    },
    watch: {
      currentKey (v) {
        this.value = this.$te(v) ? this.$t(v) : ''
      }
    },
    methods: {
      ...mapMutations('translation', {
        show: 'SHOW_BAR'
      }),
      update (obj, path, value) {
        let pointer = obj
        for (let i = 0; i < path.length; i++) {
          const p = path[i]
          const matches = p.match(/(.*)\[(\d+)\](\.)?/)
          const isArray = matches && matches.length > 1

          const key = isArray ? matches[1] : p

          if (pointer[key] === undefined) pointer[key] = isArray ? [] : {}

          if (i === path.length - 1) {
            if (isArray) pointer[key][matches[2]] = value
            else pointer[key] = value
          } else {
            if (isArray) {
              pointer[key][matches[2]] = {}
              pointer = pointer[key][matches[2]]
            } else pointer = pointer[key]
          }
        }

        return obj
      },
      merge (locale, data) {
        const emptyTarget = value => Array.isArray(value) ? [] : {}
        const clone = (value, options) => deepmerge(emptyTarget(value), value, options)

        const arrayMerge = (target, source, options) => {
          const destination = target.slice()

          source.forEach(function (e, i) {
            if (typeof destination[i] === 'undefined') {
              const cloneRequested = options.clone !== false
              const shouldClone = cloneRequested && options.isMergeableObject(e)
              destination[i] = shouldClone ? clone(e, options) : e
            } else if (options.isMergeableObject(e)) {
              destination[i] = deepmerge(target[i], e, options)
            } else if (target.indexOf(e) === -1 && e !== null) {
              destination[i] = e
            }
          })
          return destination
        }

        return deepmerge(this.$i18n.getLocaleMessage(locale), data, { arrayMerge })
      },
      async save () {
        const msg = {
          locale: this.$i18n.locale,
          key: this.currentKey,
          value: this.value
        }

        this.isLoading = true
        let response = await this.$store.dispatch('translation/save', msg)

        setTimeout(() => {
          this.isLoading = false
        }, 500)

        if (response.status === 200) {
          const merged = this.merge(msg.locale, response.data)
          this.$i18n.setLocaleMessage(msg.locale, merged)

          response = await this.$store.dispatch('translation/status', msg)

          if (response.status === 200 && response.data.status) {
            let status = response.data.status

            this.$store.commit('translation/UPDATE_BTN', { key: this.currentKey, status })
          }
        }
      }
    }
  }
</script>
