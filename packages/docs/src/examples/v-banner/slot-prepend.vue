<template>
  <div class="pa-4 bg-grey-lighten-4">
    <v-banner
      lines="two"
      color="deep-purple-accent-4"
    >
      <template v-slot:prepend>
        <v-avatar icon="mdi-lock">
        </v-avatar>
      </template>

      <v-banner-text>
        Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.
      </v-banner-text>

      <v-banner-actions>
        <v-btn>Action</v-btn>

        <v-btn>Action</v-btn>
      </v-banner-actions>
    </v-banner>
  </div>
</template>
