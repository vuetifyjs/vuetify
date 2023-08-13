<template>
  <div>
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-item
          editable
          value="1"
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          editable
          value="2"
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
          complete
          editable
          value="1"
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          editable
          value="2"
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          complete
          editable
          value="3"
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>

    <v-stepper
      class="mt-12"
      non-linear
      value="3"
    >
      <v-stepper-header>
        <v-stepper-item
          complete
          editable
          value="1"
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          complete
          editable
          value="2"
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          complete
          editable
          value="3"
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
