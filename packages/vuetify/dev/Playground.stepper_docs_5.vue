<template>
  <v-app>
    <v-locale-provider :rtl="rtl">
      <v-btn @click="rtl = !rtl">rtl</v-btn>
      <p style="padding: 20px;">Same Markup for Vuetify 2 Stepper page , example 5 </p>
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step
            step="3"
            complete
          >
            Ad type
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="4"
            complete
          >
            Ad style
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :rules="[() => false]"
            :errors="true"
            step="5"
          >
            Custom channels
            <small>Alert message</small>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="6">
            Get code
          </v-stepper-step>
        </v-stepper-header>
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
