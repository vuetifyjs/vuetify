<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Basic
      </h3>
      <v-flex>
        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon>mdi-home</v-icon>
            <v-icon>mdi-calendar</v-icon>
            <v-icon>mdi-information</v-icon>
          </span>

          <span class="group pa-2 teal">
            <v-icon dark>
              mdi-folder-open
            </v-icon>
            <v-icon dark>
              mdi-widgets
            </v-icon>
            <v-icon dark>
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon medium>
              mdi-home
            </v-icon>
            <v-icon medium>
              mdi-calendar
            </v-icon>
            <v-icon medium>
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2 teal">
            <v-icon
              medium
              dark
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              medium
              dark
            >
              mdi-widgets
            </v-icon>
            <v-icon
              medium
              dark
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon large>
              mdi-home
            </v-icon>
            <v-icon large>
              mdi-calendar
            </v-icon>
            <v-icon large>
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2 teal">
            <v-icon
              large
              dark
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              large
              dark
            >
              mdi-widgets
            </v-icon>
            <v-icon
              large
              dark
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout justify-space-around>
          <span class="group pa-2">
            <v-icon x-large>
              mdi-home
            </v-icon>
            <v-icon x-large>
              mdi-calendar
            </v-icon>
            <v-icon x-large>
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2 teal">
            <v-icon
              x-large
              dark
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              x-large
              dark
            >
              mdi-widgets
            </v-icon>
            <v-icon
              x-large
              dark
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Colors
      </h3>
      <v-flex>
        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon color="primary">
              mdi-home
            </v-icon>
            <v-icon color="primary">
              mdi-calendar
            </v-icon>
            <v-icon color="primary">
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2">
            <v-icon color="teal">
              mdi-folder-open
            </v-icon>
            <v-icon color="teal">
              mdi-widgets
            </v-icon>
            <v-icon color="teal">
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon
              color="primary"
              medium
            >
              mdi-home
            </v-icon>
            <v-icon
              color="primary"
              medium
            >
              mdi-calendar
            </v-icon>
            <v-icon
              color="primary"
              medium
            >
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2">
            <v-icon
              medium
              color="teal"
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              medium
              color="teal"
            >
              mdi-widgets
            </v-icon>
            <v-icon
              medium
              color="teal"
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout
          justify-space-around
          class="mb-2"
        >
          <span class="group pa-2">
            <v-icon
              color="primary"
              large
            >
              mdi-home
            </v-icon>
            <v-icon
              color="primary"
              large
            >
              mdi-calendar
            </v-icon>
            <v-icon
              color="primary"
              large
            >
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2">
            <v-icon
              large
              color="teal"
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              large
              color="teal"
            >
              mdi-widgets
            </v-icon>
            <v-icon
              large
              color="teal"
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>

        <v-layout justify-space-around>
          <span class="group pa-2">
            <v-icon
              color="primary"
              x-large
            >
              mdi-home
            </v-icon>
            <v-icon
              color="primary"
              x-large
            >
              mdi-calendar
            </v-icon>
            <v-icon
              color="primary"
              x-large
            >
              mdi-information
            </v-icon>
          </span>

          <span class="group pa-2">
            <v-icon
              x-large
              color="teal"
            >
              mdi-folder-open
            </v-icon>
            <v-icon
              x-large
              color="teal"
            >
              mdi-widgets
            </v-icon>
            <v-icon
              x-large
              color="teal"
            >
              mdi-gavel
            </v-icon>
          </span>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Icons'
  }
</script>

<style scoped>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.center {
  align-self: center;
}
</style>
