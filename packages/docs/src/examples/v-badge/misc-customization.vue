<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-badge
        bordered
        color="error"
        icon="mdi-lock"
        overlap
      >
        <v-btn
          class="white--text"
          color="error"
          depressed
        >
          Lock Account
        </v-btn>
      </v-badge>

      <div class="mx-3"></div>

      <v-badge
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
      </v-badge>

      <div class="mx-3"></div>

      <v-badge
        avatar
        bordered
        overlap
      >
        <template v-slot:badge>
          <v-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img>
          </v-avatar>
        </template>

        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>
      </v-badge>
    </v-row>
  </v-container>
</template>
