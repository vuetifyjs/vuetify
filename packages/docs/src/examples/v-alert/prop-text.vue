<template>
  <div>
    <v-alert
      text
      color="info"
    >
      <h3 class="headline">
        Lorem Ipsum
      </h3>
      <div>Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur turpis.</div>

      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      ></v-divider>

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
          Proin magna. Vivamus in erat ut urna cursus vestibulum. Etiam imperdiet imperdiet orci.
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn
            color="info"
            outlined
          >
            Okay
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-alert
      text
      outlined
      color="deep-orange"
      icon="mdi-fire"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. Maecenas egestas arcu quis ligula mattis placerat. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
    </v-alert>
    <v-alert
      text
      dense
      color="teal"
      icon="mdi-clock-fast"
      border="left"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Curabitur at lacus ac velit ornare lobortis.
    </v-alert>
    <v-alert
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
      Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Duis leo.
    </v-alert>
  </div>
</template>
