<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Prefix for dollar currency</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Amount"
              value="10.00"
              prefix="$"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for weight</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Weight"
              value="28.00"
              suffix="lbs"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for email domain</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Email address"
              value="example"
              suffix="@gmail.com"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Suffix for time zone</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              label="Label Text"
              value="12:30:00"
              type="time"
              suffix="PST"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
</v-card>
</template>