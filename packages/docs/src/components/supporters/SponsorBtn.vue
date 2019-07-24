<template>
  <v-btn
    v-bind="$attrs"
    :href="href"
    :target="href ? '_blank' : undefined"
    color="primary"
    outline
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
      href: {
        type: String,
        default: 'https://github.com/users/johnleider/sponsorship'
      }
    }
  }
</script>
