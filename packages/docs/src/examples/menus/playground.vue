<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
      <v-switch v-model="absolute" class="ma-2" label="Absolute"></v-switch>
      <v-switch v-model="openOnHover" class="ma-2" label="Open on hover"></v-switch>
      <v-switch v-model="closeOnClick" label="Close on click"></v-switch>
      <v-switch v-model="closeOnContentClick" label="Close on content click"></v-switch>
      <v-switch v-model="offsetX" label="X offset"></v-switch>
      <v-switch v-model="offsetY" label="Y offset"></v-switch>
      <v-switch v-model="value" class="ma-2" label="Value"></v-switch>
    </v-row>

    <v-menu
      v-model="value"
      :disabled="disabled"
      :absolute="absolute"
      :open-on-hover="openOnHover"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      disabled: false,
      absolute: false,
      openOnHover: false,
      value: false,
      closeOnClick: true,
      closeOnContentClick: true,
      offsetX: false,
      offsetY: true,
    }),
  }
</script>
