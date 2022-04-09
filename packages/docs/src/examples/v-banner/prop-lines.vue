<template>
  <div class="pa-4 bg-grey-lighten-4">
    <v-banner
      lines="one"
      icon="mdi-lock"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <v-banner-text>
        Banner with one line of text.
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>

    <v-banner
      lines="two"
      icon="mdi-lock"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <v-banner-text>
        Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>

    <v-banner
      lines="three"
      icon="mdi-lock"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <v-banner-text>
        Banner with three lines of text. One or two lines is preferable. Three lines should be considered the absolute maximum length on desktop in order to keep messages short and actionable.
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>
  </div>
</template>
