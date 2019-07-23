<template>
  <v-form>
    <v-container grid-list-xl>
      <v-layout row wrap>

        <v-flex xs12 sm6>

          <v-text-field
            label="Prepend"
            prepend-icon="place"
          ></v-text-field>

          <v-text-field
            label="Prepend inner"
            prepend-inner-icon="place"
          ></v-text-field>

          <v-text-field
            label="Append"
            append-icon="place"
          ></v-text-field>

          <v-text-field
            label="Append outer"
            append-outer-icon="place"
          ></v-text-field>

        </v-flex>

        <v-flex xs12 sm6>

          <v-text-field
            solo
            label="Prepend"
            prepend-icon="place"
          ></v-text-field>

          <v-text-field
            solo
            label="Prepend inner"
            prepend-inner-icon="place"
          ></v-text-field>

          <v-text-field
            solo
            label="Append"
            append-icon="place"
          ></v-text-field>

          <v-text-field
            solo
            label="Append outer"
            append-outer-icon="place"
          ></v-text-field>

        </v-flex>

        <v-flex xs12 sm6>

          <v-text-field
            filled
            label="Prepend"
            prepend-icon="place"
          ></v-text-field>

          <v-text-field
            filled
            label="Prepend inner"
            prepend-inner-icon="place"
          ></v-text-field>

          <v-text-field
            filled
            label="Append"
            append-icon="place"
          ></v-text-field>

          <v-text-field
            filled
            label="Append outer"
            append-outer-icon="place"
          ></v-text-field>

        </v-flex>

        <v-flex xs12 sm6>

          <v-text-field
            outlined
            label="Prepend"
            prepend-icon="place"
          ></v-text-field>

          <v-text-field
            outlined
            label="Prepend inner"
            prepend-inner-icon="place"
          ></v-text-field>

          <v-text-field
            outlined
            label="Append"
            append-icon="place"
          ></v-text-field>

          <v-text-field
            outlined
            label="Append outer"
            append-outer-icon="place"
          ></v-text-field>

        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
