<template>
  <div class="text-center">
    <div>
      <v-btn
        class="ma-2"
        color="primary"
      >
        Accept
        <v-icon
          icon="i-mdi:checkbox-marked-circle"
          end
        ></v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
        color="red"
      >
        Decline
        <v-icon
          icon="i-mdi:cancel"
          end
        ></v-icon>
      </v-btn>

      <v-btn
        class="ma-2"
      >
        <v-icon
          icon="i-mdi:minus-circle"
          start
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
          icon="i-mdi:arrow-left"
          start
        ></v-icon>
        Back
      </v-btn>

      <v-btn
        class="ma-2"
        color="purple"
        icon="i-mdi:wrench"
      ></v-btn>

      <v-btn
        class="ma-2"
        color="indigo"
        icon="i-mdi:cloud-upload"
      ></v-btn>
    </div>

    <div>
      <v-btn
        class="ma-2"
        color="blue-lighten-2"
        icon="i-mdi:thumb-up"
        variant="text"
      ></v-btn>

      <v-btn
        class="ma-2"
        color="red-lighten-2"
        icon="i-mdi:thumb-down"
        variant="text"
      ></v-btn>
    </div>
  </div>
</template>
