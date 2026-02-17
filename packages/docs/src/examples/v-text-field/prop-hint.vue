<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="For example, flowers or used cars"
            label="Your product or service"
            model-value="Grocery delivery"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="www.example.com/page"
            label="Your landing page"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="For example, flowers or used cars"
            label="Your product or service"
            model-value="Grocery delivery"
            variant="solo"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="www.example.com/page"
            label="Your landing page"
            variant="solo"
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="For example, flowers or used cars"
            label="Your product or service"
            model-value="Grocery delivery"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            hint="www.example.com/page"
            label="Your landing page"
            variant="outlined"
            persistent-hint
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
