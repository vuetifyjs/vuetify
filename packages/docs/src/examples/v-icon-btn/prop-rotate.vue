<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props: activatorProps, isActive }">
        <v-btn v-bind="activatorProps" text="Toggle">
          <template v-slot:append>
            <v-icon-btn
              :rotate="isActive ? 180 : 0"
              icon="$dropdown"
              opacity="var(--v-medium-emphasis-opacity)"
              size="16"
            ></v-icon-btn>
          </template>
        </v-btn>
      </template>

      <v-list>
        <v-list-item title="Item 1" link></v-list-item>
        <v-list-item title="Item 2" link></v-list-item>
        <v-list-item title="Item 3" link></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
