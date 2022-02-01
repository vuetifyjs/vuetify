<template>
  <div>
    <div class="text-subtitle-2 mb-2">With markup</div>

    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item,i) in 3"
        :key="i"
      >
        <v-expansion-panel-title>
          Item
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div class="text-subtitle-2 mt-4 mb-2">With props</div>

    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item,i) in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
