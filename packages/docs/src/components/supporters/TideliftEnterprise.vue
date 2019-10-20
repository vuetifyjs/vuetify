<template>
  <div>
    <v-responsive
      :max-width="$vuetify.breakpoint.lgAndUp ? '60%' : '100%'"
      class="float-left mb-12"
    >
      <base-heading>subHeader</base-heading>
      <doc-markdown>subText1</doc-markdown>
      <doc-markdown>subText2</doc-markdown>

      <supporters-tidelift-more-demo />
    </v-responsive>

    <v-img
      class="float-right hidden-md-and-down"
      src="https://cdn.vuetifyjs.com/images/affiliates/vuetify-tidelift.png"
      max-width="35%"
    />

    <div style="clear: both;">
      <base-heading>depHeader</base-heading>
      <doc-markdown>depText1</doc-markdown>
      <doc-markdown>depText2</doc-markdown>

      <supporters-tidelift-more-demo />
    </div>
  </div>
</template>
