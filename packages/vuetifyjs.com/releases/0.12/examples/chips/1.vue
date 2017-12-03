<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex md6 sm12>
        <div class="text-xs-center">
          <v-chip close>Example Chip</v-chip>
        </div>
        <div class="text-xs-center">
          <v-chip>Example Chip</v-chip>
        </div>
      </v-flex>
      <v-flex md6 sm12 xs12>
        <div class="text-xs-center">
          <v-chip close>
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor">
            </v-avatar>
            Trevor Hansen
          </v-chip>
        </div>
        <div class="text-xs-center">
          <v-chip>
            <v-avatar class="teal">A</v-avatar>
            ANZ Bank
          </v-chip>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>