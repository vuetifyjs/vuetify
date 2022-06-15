<template>
  <v-row>
    <v-col cols="12">
      <v-card v-ripple>
        <v-card-text>Card with ripple</v-card-text>
        <v-card-actions>
          <v-btn>Button with ripple</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card v-ripple>
        <v-card-text>
          Outer card with ripple
          <v-card-actions>
            <v-card v-ripple.stop>
              <v-card-text>
                Inner card with <code>ripple.stop</code>
              </v-card-text>
            </v-card>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
