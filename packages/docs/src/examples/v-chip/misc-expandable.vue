<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-row
      align="center"
      class="pa-6"
    >
      <span class="me-4">To</span>

      <v-menu
        v-model="menu"
        location="top start"
        origin="top start"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-chip
            v-bind="props"
            link
            pill
          >
            <v-avatar start>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>

            John Leider
          </v-chip>
        </template>

        <v-card width="300">
          <v-list bg-color="black">
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar image="https://cdn.vuetifyjs.com/images/john.png"></v-avatar>
              </template>

              <v-list-item-title>John Leider</v-list-item-title>

              <v-list-item-subtitle>john@google.com</v-list-item-subtitle>

              <template v-slot:append>
                <v-list-item-action>
                  <v-btn
                    variant="text"
                    icon
                    @click="menu = false"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item prepend-icon="mdi-briefcase" link>
              <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>

    <v-divider></v-divider>

    <div class="pa-3">
      <v-text-field
        label="Subject"
        model-value="Re: Vacation Request"
        variant="underlined"
        single-line
      ></v-text-field>

      <v-textarea
        label="Message"
        variant="underlined"
        single-line
      ></v-textarea>
    </div>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const menu = ref(false)
</script>

<script>
  export default {
    data: () => ({
      menu: false,
    }),
  }
</script>
