<template>
  <div>
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-item
          value="1"
          editable
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="2"
          editable
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="3"
          editable
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <v-stepper
      class="mt-12"
      non-linear
    >
      <v-stepper-header>
        <v-stepper-item
          value="1"
          complete
          editable
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="2"
          editable
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="3"
          complete
          editable
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <v-stepper
      class="mt-12"
      value="3"
      non-linear
    >
      <v-stepper-header>
        <v-stepper-item
          value="1"
          complete
          editable
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="2"
          complete
          editable
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="3"
          complete
          editable
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
