<template>
  <v-container>
    <v-layout column>
      <main-header>Item Groups</main-header>

      <core-title>Simple</core-title>
      <core-section center>
        <v-chip-group>
          <v-chip
            v-for="n in 3"
            :key="n"
          >
            Example Chip
          </v-chip>
        </v-chip-group>
      </core-section>

      <core-title>Multiple</core-title>
      <core-section center>
        <v-chip-group multiple>
          <v-chip
            v-for="n in 3"
            :key="n"
          >
            Example Chip
          </v-chip>
        </v-chip-group>
      </core-section>

      <core-title>Active class</core-title>
      <core-section center>
        <v-chip-group active-class="success">
          <v-chip
            v-for="n in 3"
            :key="n"
          >
            Example Chip
          </v-chip>
        </v-chip-group>
      </core-section>

      <core-title>Column</core-title>
      <core-section style="max-width: 300px;" center>
        <v-chip-group column multiple>
          <v-chip
            v-for="n in 3"
            :key="n"
          >
            Example Chip
          </v-chip>
        </v-chip-group>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'ChipGroups',

    data: () => ({})
  }
</script>
