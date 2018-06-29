<template>
  <div>
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-step step="1" editable>Select campaign settings</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>Create an ad group</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable>Create an ad</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-stepper class="mt-5"  non-linear>
      <v-stepper-header>
        <v-stepper-step step="1" editable complete>Select campaign settings</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable>Create an ad group</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable complete>Create an ad</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-stepper value="3" class="mt-5"  non-linear>
      <v-stepper-header>
        <v-stepper-step step="1" editable complete>Select campaign settings</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" editable complete>Create an ad group</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" editable complete>Create an ad</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
