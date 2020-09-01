<template>
  <div class="text-center">
    <div>
      <v-btn
        class="ma-2"
        color="primary"
        dark
      >
        Accept
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="red"
        dark
      >
        Decline
        <v-icon
          dark
          right
        >
          mdi-cancel
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-minus-circle
        </v-icon>Cancel
      </v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        color="orange darken-2"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn>

      <v-btn
        class="ma-2"
        color="purple"
        dark
      >
        <v-icon dark>
          mdi-wrench
        </v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="indigo"
        dark
      >
        <v-icon dark>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        text
        icon
        color="blue lighten-2"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        text
        icon
        color="red lighten-2"
      >
        <v-icon>mdi-thumb-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>
