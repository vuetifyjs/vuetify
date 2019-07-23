<template>
  <v-form>
    <v-container grid-list-xl>
      <v-layout wrap>

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
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Outline"
            single-line
            outlined
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
