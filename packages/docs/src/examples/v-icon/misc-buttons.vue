<template>
  <div class="text-center">
    <div>
      <v-btn
        class="ma-2"
        color="primary"
      >
        Accept
        <v-icon
          end
          icon="mdi-checkbox-marked-circle"
        ></v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="red"
      >
        Decline
        <v-icon
          end
          icon="mdi-cancel"
        ></v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
      >
        <v-icon
          start
          icon="mdi-minus-circle"
        ></v-icon>
        Cancel
      </v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        color="orange-darken-2"
      >
        <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon>
        Back
      </v-btn>

      <v-btn
        class="ma-2"
        color="purple"
        icon="mdi-wrench"
      ></v-btn>

      <v-btn
        class="ma-2"
        color="indigo"
        icon="mdi-cloud-upload"
      ></v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-thumb-up"
        color="blue-lighten-2"
      ></v-btn>

      <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-thumb-down"
        color="red-lighten-2"
      ></v-btn>
    </div>
  </div>
</template>
