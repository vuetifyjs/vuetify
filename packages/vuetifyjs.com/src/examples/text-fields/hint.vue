<template>
  <v-form>
    <v-container>
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
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            outline
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
