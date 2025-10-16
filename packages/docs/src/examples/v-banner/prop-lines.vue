<template>
  <div>
    <v-banner
      class="my-4"
      color="deep-purple-accent-4"
      icon="mdi-lock"
      lines="one"
    >
      <v-banner-text>
        Banner with one line of text.
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>

    <v-banner
      class="my-4"
      color="error"
      icon="mdi-weather-hurricane"
      lines="two"
    >
      <v-banner-text>
        Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Action</v-btn>
      </template>
    </v-banner>

    <v-banner
      class="my-4"
      color="warning"
      icon="$warning"
      lines="three"
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
