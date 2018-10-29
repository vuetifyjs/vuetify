<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Regular"
            disabled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Regular"
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Solo"
            solo
            disabled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Solo"
            solo
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Box"
            box
            disabled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Box"
            box
            readonly
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Outline"
            outline
            disabled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            value="John Doe"
            label="Outline"
            outline
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
