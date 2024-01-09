<template>
  <v-banner
    color="pink-darken-1"
    icon="mdi-account-box"
    lines="two"
  >
    <template v-slot:prepend>
      <v-avatar></v-avatar>
    </template>

    <v-banner-text>
      Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.
    </v-banner-text>

    <v-banner-actions>
      <v-btn>Action Button</v-btn>
    </v-banner-actions>
  </v-banner>
</template>
