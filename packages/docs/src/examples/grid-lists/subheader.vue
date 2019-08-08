<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
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
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="4">
              <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-col>
          </v-row>
        </v-container>
        <v-subheader>June</v-subheader>
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="4">
              <img :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`" class="image" alt="lorem" width="100%" height="100%">
            </v-col>
          </v-row>
        </v-container>
        <v-footer class="mt-12"></v-footer>
      </v-card>
    </v-col>
  </v-row>
</template>
