<template>
  <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-container class="fill-height">
      <v-row class="flex-column-reverse flex-md-row align-center justify-center">
        <v-col cols="12" md="6">
          <h1 class="text-display-large mt-0 mb-8">John Doe</h1>
          <h3 class="text-display-medium mt-0 mb-8 font-weight-thin">Web Developer</h3>
          <v-btn class="elevation-2 rounded-xl mb-4" color="primary">
            Contact Me
          </v-btn>
        </v-col>
        <v-col class="text-center" cols="12" md="6">
          <v-avatar :size="300" class="elevation-4 mx-auto mb-8">
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>
