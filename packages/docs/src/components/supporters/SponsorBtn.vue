<template>
  <v-btn
    v-bind="$attrs"
    :to="!href && to ? to : undefined"
    :href="href"
    :target="href ? '_blank' : undefined"
    color="primary"
    outlined
    rounded
    rel="noopener"
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
      to: String,
      href: {
        type: String,
        default: undefined,
      },
    },
  }
</script>
