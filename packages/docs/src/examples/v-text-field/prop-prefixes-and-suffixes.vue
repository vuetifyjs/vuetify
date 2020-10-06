<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-subheader>Prefix for dollar currency</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Amount"
          value="10.00"
          prefix="$"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Suffix for weight</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Weight"
          value="28.00"
          suffix="lbs"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Suffix for email domain</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Email address"
          value="example"
          suffix="@gmail.com"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-subheader>Suffix for time zone</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="Label Text"
          value="12:30:00"
          type="time"
          suffix="PST"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
