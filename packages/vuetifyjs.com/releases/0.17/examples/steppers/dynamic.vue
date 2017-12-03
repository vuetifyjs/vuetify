<template>
  <div>
    <v-card class="mb-3">
      <v-card-text>
        <div>{{ typeof steps }}</div>
        <v-text-field
          label="# of steps"
          :value="steps"
          @input="onInput"
          min="1"
          max="6"
          hint="This demo has a maximum of 6 steps"
          type="number"
          persistent-hint
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="n"
            :step="n"
            :complete="e1 > n"
            editable
          >
            Step {{ n }}
          </v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          :step="n"
          v-for="n in steps"
          :key="n"
        >
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="nextStep(n)">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        e1: 1,
        steps: 2
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      }
    },

    methods: {
      onInput (val) {
        this.steps = parseInt(val)
      },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      }
    }
  }
</script>
