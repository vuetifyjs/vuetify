<template>
  <v-layout column align-center>
    <v-layout wrap justify-space-around>
      <v-switch v-model="editable" class="ma-2" label="Ediatable"></v-switch>
      <v-switch v-model="segmented" class="ma-2" label="Segmented"></v-switch>
      <v-switch v-model="loading" class="ma-2" label="Loading"></v-switch>
      <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
      <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
      <v-switch v-model="filled" class="ma-2" label="Filled"></v-switch>
      <v-switch v-model="reverse" class="ma-2" label="Reverse"></v-switch>
      <v-switch v-model="dense" class="ma-2" label="Dense"></v-switch>
      <v-switch v-model="persistentHint" class="ma-2" label="Persistent hint"></v-switch>
      <v-switch v-model="topMenu" class="ma-2" label="Menu to top"></v-switch>
    </v-layout>
    <v-container id="dropdown-playground">
      <v-overflow-btn
        class="my-2"
        :items="dropdown_font"
        :editable="editable"
        :segmented="segmented"
        :loading="loading"
        :disabled="disabled"
        :readonly="readonly"
        :filled="filled"
        :reverse="reverse"
        :dense="dense"
        :persistent-hint="persistentHint"
        :menu-props="topMenu ? 'top' : ''"
        hint="I'm a hint"
        label="Overflow Btn"
        target="#dropdown-playground"
      ></v-overflow-btn>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      editable: false,
      segmented: false,
      loading: false,
      disabled: false,
      readonly: false,
      filled: false,
      reverse: false,
      dense: false,
      persistentHint: false,
      topMenu: false,
    }),
  }
</script>
