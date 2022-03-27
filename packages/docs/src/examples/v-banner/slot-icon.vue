<template>
  <div class="pa-4 bg-grey-lighten-4">
    <v-banner lines="two">
      <template v-slot:icon>
        <v-icon color="deep-purple-accent-4" icon="mdi-lock">
          mdi-lock
        </v-icon>
      </template>

      Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.

      <template v-slot:actions>
        <v-btn text color="deep-purple-accent-4">
          Action
        </v-btn>
        <v-btn text color="deep-purple-accent-4">
          Action
        </v-btn>
      </template>
    </v-banner>
  </div>
</template>
