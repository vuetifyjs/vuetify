<template>
  <v-form>
    <v-container>
      <v-row>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Regular"
            single-line
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Solo"
            single-line
            solo
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Filled"
            single-line
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Outlined"
            single-line
            outlined
          ></v-text-field>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
