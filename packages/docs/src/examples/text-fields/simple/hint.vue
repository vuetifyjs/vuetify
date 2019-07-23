<template>
  <v-form>
    <v-container grid-list-xl>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            filled
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
            outlined
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            outlined
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
