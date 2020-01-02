<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="accordion" class="ma-2" label="Accordion"></v-switch>
      <v-switch v-model="popout" class="ma-2" label="Popout"></v-switch>
      <v-switch v-model="inset" class="ma-2" label="Inset"></v-switch>
      <v-switch v-model="multiple" class="ma-2" label="Multiple"></v-switch>
      <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
      <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
      <v-switch v-model="focusable" class="ma-2" label="Focusable"></v-switch>
      <v-switch v-model="flat" class="ma-2" label="Flat"></v-switch>
      <v-switch v-model="hover" class="ma-2" label="Hover"></v-switch>
      <v-switch v-model="tile" class="ma-2" label="Tile"></v-switch>
    </v-row>

    <v-expansion-panels
      :accordion="accordion"
      :popout="popout"
      :inset="inset"
      :multiple="multiple"
      :focusable="focusable"
      :disabled="disabled"
      :readonly="readonly"
      :flat="flat"
      :hover="hover"
      :tile="tile"
    >
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      accordion: false,
      popout: false,
      inset: false,
      multiple: false,
      disabled: false,
      readonly: false,
      focusable: false,
      flat: false,
      hover: false,
      tile: false,
    }),
  }
</script>
