<template>
  <v-container fluid class="pa-0">
    <v-row align="center">
      <v-col cols="12" sm="6">
        <div class="text-center">
          <div class="my-2">
            <v-btn x-small color="secondary" dark>Extra small Button</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="primary" dark>Small Button</v-btn>
          </div>
          <div class="my-2">
            <v-btn color="warning" dark>Normal Button</v-btn>
          </div>
          <div class="my-2">
            <v-btn color="error" dark large>Large Button</v-btn>
          </div>
          <div class="my-2">
            <v-btn x-large color="success" dark>Extra large Button</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-center">
          <div class="my-2">
            <v-btn color="secondary" fab x-small dark>
              <v-icon>mdi-television</v-icon>
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="primary" fab small dark>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="warning" fab dark>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="error" fab large dark>
              <v-icon>mdi-alarm</v-icon>
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="success" fab x-large dark>
              <v-icon>mdi-domain</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
