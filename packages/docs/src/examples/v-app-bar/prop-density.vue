<template>
  <v-layout>
    <v-app-bar density="compact" absolute>
      <v-app-bar-title>Vuetify</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn text>Developer</v-btn>

      <v-btn class="mr-3" text>Help</v-btn>

      <v-divider inset vertical></v-divider>

      <v-btn
        class="mr-4 ml-5"
        color="primary"
        plain
      >
        <v-icon left icon="mdi-handshake-outline"></v-icon>

        <span>John Leider</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-sheet border>
        <v-container>
          <section>
            <h4 class="text-h4">Heading</h4>

            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consectetur quos velit inventore optio omnis, tempora nam officia, labore quibusdam error facere ipsum iste temporibus laboriosam aliquam quia vitae magni.
            </div>
          </section>
        </v-container>
      </v-sheet>
    </v-main>
  </v-layout>
</template>
