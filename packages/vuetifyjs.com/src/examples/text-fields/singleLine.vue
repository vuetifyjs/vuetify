<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            label="Regular"
            single-line
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Solo"
            single-line
            solo
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Box"
            single-line
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Outline"
            single-line
            outline
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
