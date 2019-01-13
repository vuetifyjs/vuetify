<template>
  <v-btn
    v-bind="$attrs"
    :to="!href && to ? to : undefined"
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
      to: {
        type: [Object, String],
        default: () => ({
          params: {
            namespace: 'getting-started',
            page: 'sponsors-and-backers'
          }
        })
      },
      href: {
        type: String,
        default: undefined
      }
    }
  }
</script>
