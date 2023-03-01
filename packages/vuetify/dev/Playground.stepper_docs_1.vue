```
<template>
  <v-app>
    <v-locale-provider :rtl="rtl">
      <v-btn @click="rtl = !rtl">rtl</v-btn>
        <v-stepper v-model="e2" direction="horizontal">
          <v-stepper-header>
            <v-stepper-step
              title="Name of step 1"
              :complete="e2 > '1'"
              step="1"
            >
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              title="Name of step 2"  
              :complete="e2 > '2'"
              step="2"
            >
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
            title="Name of step 3"
            step="3">
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 1 Contents
            </v-card>

              <v-btn
                color="primary"
                @click="e2 = '2'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 2 Contents
            </v-card>

              <v-btn
                color="primary"
                @click="e2 = '3'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 3 Contents
            </v-card>

              <v-btn
                color="primary"
                @click="e2 = '1'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
    </v-locale-provider>
  </v-app>
</template>



<script>
  export default {
    name: 'Playground',
    data: () => ({
      e2:0,
      rtl: false,
      open: null,
      active: null,
      opened: [],
      isCtrl: false,
      count: 1,
    }),
  }
</script>

```
