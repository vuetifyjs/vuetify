<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar flat>
          <v-btn icon>
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>Albums</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-subheader>May</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="i in 6" :key="i" xs4>
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        <v-subheader>June</v-subheader>
        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex v-for="i in 6" :key="i" xs4>
              <img :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
        </v-container>
        <v-footer class="mt-5"></v-footer>
      </v-card>
    </v-flex>
  </v-layout>
</template>
