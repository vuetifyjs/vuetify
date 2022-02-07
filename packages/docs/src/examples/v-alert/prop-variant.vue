<template>
  <div>
    <v-alert
      color="info"
      class="ma-2"
      variant="contained-text"
    >
      <h3 class="text-h5">
        Lorem Ipsum
      </h3>
      <div>Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur turpis.</div>

      <v-divider
        class="my-4 bg-info"
        style="opacity: 0.22"
      ></v-divider>

      <div class="d-flex flex-row align-center justify-space-between">
        <div>
          Proin magna. Vivamus in erat ut urna cursus vestibulum. Etiam imperdiet imperdiet orci.
        </div>
        <v-btn
          color="info"
          variant="outlined"
        >
          Okay
        </v-btn>
      </div>
    </v-alert>

    <v-alert
      variant="outlined"
      color="deep-orange"
      icon="mdi-fire"
      class="ma-2"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. Maecenas egestas arcu quis ligula mattis placerat. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
    </v-alert>

    <v-alert
      variant="contained-text"
      density="compact"
      color="teal"
      icon="mdi-clock-fast"
      border="start"
      class="ma-2"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Curabitur at lacus ac velit ornare lobortis.
    </v-alert>

    <v-alert
      variant="text"
      prominent
      type="error"
      icon="mdi-cloud-alert"
      class="ma-2"
    >
      Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Duis leo.
    </v-alert>

    <v-alert
      variant="plain"
      density="compact"
      color="orange"
      icon="mdi-note"
      prominent
      border="end"
      class="ma-2"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Curabitur at lacus ac velit ornare lobortis.
    </v-alert>
  </div>
</template>
