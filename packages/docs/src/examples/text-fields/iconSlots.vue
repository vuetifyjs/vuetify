<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="message"
            outline
            clearable
            label="Message"
            type="text"
          >
            <v-tooltip
              slot="prepend"
              bottom
            >
              <v-icon slot="activator">mdi-help-circle-outline</v-icon>
              I'm a tooltip
            </v-tooltip>

            <v-fade-transition
              slot="append"
              leave-absolute
            >
              <v-progress-circular
                v-if="loading"
                size="24"
                color="info"
                indeterminate
              ></v-progress-circular>
              <img v-else width="24" height="24" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" alt="">
            </v-fade-transition>

            <v-menu
              slot="append-outer"
              style="top: -12px"
              offset-y
            >
              <v-btn slot="activator">
                <v-icon left>menu</v-icon>
                Menu
              </v-btn>
              <v-card>
                <v-card-text class="pa-4">
                  <v-btn large text color="primary" @click="clickMe"><v-icon left>mdi-target</v-icon>Click me</v-btn>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      message: 'Hey!',
      loading: false
    }),

    methods: {
      clickMe () {
        this.loading = true
        this.message = 'Wait for it...'
        setTimeout(() => {
          this.loading = false
          this.message = 'You\'ve clicked me!'
        }, 2000)
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
