<template>
  <v-btn
    v-bind="$attrs"
    :to="!href && to"
    :href="href"
    :target="href ? '_blank' : undefined"
    color="primary"
    outline
    v-on="$listeners"
  >
    <span class="caption font-weight-bold">
      {{ $t("Vuetify.Home.becomeSponsor") }}
    </span>
  </v-btn>
</template>

<script>
  export default {
    inheritAttrs: false,

    props: {
      to: {
        type: [Object, String],
        default: () => ({
          name: 'getting-started/SponsorsAndBackers'
        })
      },
      href: {
        type: String,
        default: undefined
      }
    }
  }
</script>
