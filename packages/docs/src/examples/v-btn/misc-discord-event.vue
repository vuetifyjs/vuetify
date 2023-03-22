<template>
  <v-card
    class="mx-auto mt-5"
    color="#36393f"
    max-width="650"
    min-height="350"
    theme="dark"
    variant="flat"
  >
    <v-sheet color="#202225">
      <v-card-item>
        <template v-slot:prepend>
          <v-card-title>
            <v-icon
              icon="mdi-calendar"
              start
            ></v-icon>

            1 Event
          </v-card-title>
        </template>

        <v-divider vertical class="mx-2"></v-divider>

        <v-btn
          class="text-none text-subtitle-1"
          color="#5865f2"
          size="small"
          variant="flat"
        >
          Create Event
        </v-btn>

        <template v-slot:append>
          <v-btn
            icon="$close"
            size="large"
            variant="text"
          ></v-btn>
        </template>
      </v-card-item>
    </v-sheet>

    <v-card
      class="ma-4"
      color="#2f3136"
      rounded="lg"
      variant="flat"
    >
      <v-card-item>
        <v-card-title class="text-body-2 d-flex align-center">
          <v-icon
            color="#949cf7"
            icon="mdi-calendar"
            start
          ></v-icon>

          <span class="text-medium-emphasis font-weight-bold">1 Fri Dec 16th - 9:00 PM</span>

          <v-spacer></v-spacer>

          <v-avatar
            image="https://cdn.vuetifyjs.com/images/john-smirk.png"
            size="x-small"
          ></v-avatar>

          <v-chip
            class="ms-2 text-medium-emphasis"
            color="grey-darken-4"
            prepend-icon="mdi-account-multiple"
            size="small"
            text="81"
            variant="flat"
          ></v-chip>
        </v-card-title>

        <div class="py-2">
          <div class="text-h6">Live Q&A</div>

          <div class="font-weight-light text-medium-emphasis">
            Join the Vuetify team for a live Question and Answer session.
          </div>
        </div>
      </v-card-item>

      <v-divider></v-divider>

      <div class="pa-4 d-flex align-center">
        <v-icon
          color="disabled"
          icon="mdi-broadcast"
          start
        ></v-icon>

        <v-icon
          color="#949cf7"
          icon="mdi-video-vintage"
          size="x-small"
        ></v-icon>

        <span class="text-caption text-medium-emphasis ms-1 font-weight-light">
          streaming
        </span>

        <v-spacer></v-spacer>

        <v-icon
          class="me-3"
          icon="mdi-dots-horizontal"
        ></v-icon>

        <v-btn
          class="me-2 text-none"
          color="#4f545c"
          prepend-icon="mdi-export-variant"
          variant="flat"
        >
          Share
        </v-btn>

        <v-btn
          border
          class="text-none"
          prepend-icon="mdi-check"
          variant="text"
        >
          Interested
        </v-btn>
      </div>
    </v-card>
  </v-card>
</template>
