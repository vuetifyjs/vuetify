<template>
  <v-form>
    <v-container>
      <v-row>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your product or service"
            value="Grocery delivery"
            hint="For example, flowers or used cars"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Your landing page"
            hint="www.example.com/page"
            persistent-hint
            outlined
          ></v-text-field>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
