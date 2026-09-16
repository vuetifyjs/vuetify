<template>
  <v-container class="d-flex flex-column gr-4">

    <v-divider content-offset="2rem" opacity=".7" thickness="5" variant="dotted" gradient>CHAPTER 1.4</v-divider>

    <v-divider :content-offset="[40, -1.5]" opacity=".7" thickness="2" variant="dashed">∞</v-divider>

    <v-divider :content-offset="[12, 2.5]" opacity=".7">* * *</v-divider>

    <v-divider color="primary" content-offset="-16" opacity=".75" role="presentation" thickness="2">
      <v-avatar border="md primary opacity-75" size="14"></v-avatar>
      <v-avatar border="md primary opacity-75" color="primary" size="24" variant="text">
        <v-icon icon="mdi-arrow-down" size="16"></v-icon>
      </v-avatar>
      <v-avatar border="md primary opacity-75" size="14"></v-avatar>
    </v-divider>

  </v-container>
</template>
