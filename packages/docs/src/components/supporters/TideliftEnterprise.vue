<template>
  <div>
    <v-responsive
      :max-width="$vuetify.breakpoint.lgAndUp ? '60%' : '100%'"
      class="float-left mb-12"
    >
      <base-heading>subHeader</base-heading>

      <base-markdown>subText1</base-markdown>

      <base-markdown>subText2</base-markdown>

      <supporters-tidelift-more-demo />
    </v-responsive>

    <v-img
      class="float-right hidden-md-and-down"
      src="https://cdn.vuetifyjs.com/images/affiliates/vuetify-tidelift.png"
      max-width="35%"
    />

    <div style="clear: both;">
      <base-heading>depHeader</base-heading>

      <base-markdown>depText1</base-markdown>

      <base-markdown>depText2</base-markdown>

      <supporters-tidelift-more-demo />
    </div>
  </div>
</template>
