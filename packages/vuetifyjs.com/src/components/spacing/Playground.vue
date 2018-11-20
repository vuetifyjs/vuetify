<template lang="pug">
  v-container(
    class="spacing-playground"
    grid-list-lg
  )
    v-layout(
      row
      wrap
    )
      v-flex(
        xs12
        sm6
        class="d-flex align-center"
      )
        v-select(
          :items="directions"
          :label="$t('Layout.Spacing.padding')"
          class="pr-2"
          v-model="paddingDirection"
        )
          strong(slot="prepend").primary--text p
          div(slot="append-outer") -

        v-select(
          :items="sizes.slice(1)"
          :label="$t('Layout.Spacing.size')"
          v-model="paddingSize"
        )
      v-flex(
        xs12
        sm6
        class="d-flex"
      )
        v-select(
          :items="directions"
          :label="$t('Layout.Spacing.margin')"
          class="pr-2"
          v-model="marginDirection"
        )
          strong(slot="prepend").primary--text m
          div(slot="append-outer") -

        v-select(
          :items="sizes"
          :label="$t('Layout.Spacing.size')"
          v-model="marginSize"
        )
      v-flex(
        xs12
        class="orange lighten-3 pa-0"
      )
        v-card(
          :class="[computedMargin]"
          class="elevation-4"
        )
          div(
            :class="[computedPadding]"
            class="light-green lighten-3"
          )
            div(
              class="white text-xs-center"
              v-text="$t('Layout.Spacing.playgroundText2')"
            )
</template>

<script>
  export default {
    data: () => ({
      directions: ['t', 'b', 'l', 'r', 'x', 'y', 'a'],
      sizes: ['auto', '0', '1', '2', '3', '4', '5'],
      paddingDirection: 'a',
      paddingSize: '2',
      marginDirection: 'a',
      marginSize: '2'
    }),
    computed: {
      computedPadding () {
        return `p${this.paddingDirection}-${this.paddingSize}`
      },
      computedMargin () {
        return `m${this.marginDirection}-${this.marginSize}`
      }
    }
  }
</script>

<style>
  .spacing-playground .v-select .v-input__prepend-outer, .spacing-playground .v-select .v-input__append-outer{
    margin-top: 0.55rem;
    margin-right: 0.2rem;
  }
</style>
