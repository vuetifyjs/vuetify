<template>
  <a
      class="v-chip v-chip--tidelift white--text"
      href="https://tidelift.com/subscription/npm/vuetify?utm_source=vuetify&utm_medium=referral&utm_campaign=homepage"
      rel="noopener"
      target="_blank"
    >
      <span class="v-chip__content">
        <img
          alt="Tidelift"
          class="mr-3"
          src="https://cdn.vuetifyjs.com/images/affiliates/tidelift-small.png"
          width="24px"
        >
        <span class="body-2 text-uppercase font-weight-regular hidden-sm-and-down">
          Get Professionally-Supported Vuetify
        </span>
        <span class="body-2 text-uppercase font-weight-regular hidden-md-and-up">
          Get Professional Support
        </span>
      </span>
    </a>
</template>

<style lang="stylus">
  .v-chip--tidelift
    background: #f6914d !important
    padding-right: 64px
    position: absolute !important
    right: -24px
    text-decoration: none
    top: 0

    .v-chip__content
      cursor: pointer !important
      > span
        line-height: 1
</style>
