<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Regular"
            model-value="John Doe"
            disabled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Regular"
            model-value="John Doe"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Solo"
            model-value="John Doe"
            variant="solo"
            disabled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Solo"
            model-value="John Doe"
            variant="solo"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Outlined"
            model-value="John Doe"
            variant="outlined"
            disabled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Outlined"
            model-value="John Doe"
            variant="outlined"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="underlined"
            model-value="John Doe"
            variant="underlined"
            disabled
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="underlined"
            model-value="John Doe"
            variant="underlined"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
