<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="autorun" class="ma-2" label="Automatic switching"></v-switch>
      <v-switch v-model="showArrows" class="ma-2" label="Show arrows"></v-switch>
      <v-switch v-model="vertical" class="ma-2" label="Vertical"></v-switch>
      <v-switch v-model="reverse" class="ma-2" label="Reverse"></v-switch>
    </v-row>

    <v-window
      v-model="window"
      class="elevation-1"
      :vertical="vertical"
      :show-arrows="showArrows"
      :reverse="reverse"
    >
      <v-window-item
        v-for="n in length"
        :key="n"
      >
        <v-card flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <v-avatar color="grey" class="mr-4"></v-avatar>
              <strong class="title">Title {{ n }}</strong>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-row>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      length: 3,
      window: 0,
      showArrows: false,
      vertical: false,
      reverse: false,
      autorun: false,
    }),

    created () {
      setInterval(() => {
        if (!this.autorun) return
        if (++this.window >= this.length) this.window = 0
      }, 1000)
    },
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"]
  }
</codepen-resources>
