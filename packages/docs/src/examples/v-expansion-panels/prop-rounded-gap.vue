<template>
  <v-container>
    <v-expansion-panels
      :rounded="[20, 8]"
      gap="8"
      variant="accordion"
      static
    >
      <v-expansion-panel
        v-for="i in 3"
        :key="i"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Item"
      ></v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
