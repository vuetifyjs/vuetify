<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-system-bar></v-system-bar>

    <v-row
      class="px-6 py-3"
      align="center"
    >
      <span class="mr-4">To</span>
      <v-menu
        v-model="menu"
        bottom
        right
        transition="scale-transition"
        origin="top left"
      >
        <template v-slot:activator="{ on }">
          <v-chip
            pill
            v-on="on"
          >
            <v-avatar start>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            John Leider
          </v-chip>
        </template>
        <v-card width="300">
          <v-list dark>
            <v-list-item>
              <template v-slot:prepend>
                <v-list-item-avatar>
                  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-list-item-avatar>
              </template>
              <v-list-item-title>John Leider</v-list-item-title>
              <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  icon
                  @click="menu = false"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="() => {}">
              <template v-slot:prepend>
                <v-icon>mdi-briefcase</v-icon>
              </template>
              <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>

    <v-divider></v-divider>

    <v-text-field
      full-width
      value="Re: Vacation Request"
      label="Subject"
      single-line
    ></v-text-field>

    <v-textarea
      full-width
      single-line
      label="Message"
    ></v-textarea>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
    }),
  }
</script>
