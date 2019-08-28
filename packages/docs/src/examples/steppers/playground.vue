<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-slider v-model="steps" label="Steps" min="2" max="20"></v-slider>
      </v-col>
      <v-switch v-model="vertical" label="Vertical"></v-switch>
      <v-switch v-model="altLabels" label="altLabels"></v-switch>
      <v-switch v-model="editable" label="Editable"></v-switch>
    </v-row>
    <v-stepper
      v-model="e1"
      :vertical="vertical"
      :alt-labels="altLabels"
    >
      <template v-if="vertical">
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            :editable="editable"
          >
            Step {{ n }}
          </v-stepper-step>

          <v-stepper-content
            :key="`${n}-content`"
            :step="n"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="nextStep(n)"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </template>
      </template>
      <template v-else>
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              :editable="editable"
            >
              Step {{ n }}
            </v-stepper-step>

            <v-divider
              v-if="n !== steps"
              :key="n"
            ></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="n in steps"
            :key="`${n}-content`"
            :step="n"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="nextStep(n)"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        e1: 1,
        steps: 2,
        vertical: false,
        altLabels: false,
        editable: true,
      }
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
      vertical () {
        this.e1 = 2
        requestAnimationFrame(() => this.e1 = 1) // Workarounds
      },
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
      },
    },
  }
</script>
