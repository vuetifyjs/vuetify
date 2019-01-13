<template>
  <div class="text-xs-center">
    <v-tooltip left>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Left
      </v-btn>
      <span>Left tooltip</span>
    </v-tooltip>

    <v-tooltip top>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Top
      </v-btn>
      <span>Top tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Bottom
      </v-btn>
      <span>Bottom tooltip</span>
    </v-tooltip>

    <v-tooltip right>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Right
      </v-btn>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>
