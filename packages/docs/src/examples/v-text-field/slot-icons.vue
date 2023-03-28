<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="message"
            clearable
            label="Message"
            type="text"
            variant="outlined"
          >
            <template v-slot:prepend>
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
                </template>

                I'm a tooltip
              </v-tooltip>
            </template>

            <template v-slot:append-inner>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="loading"
                  color="info"
                  indeterminate
                  size="24"
                ></v-progress-circular>

                <img
                  v-else
                  height="24"
                  width="24"
                  src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                  alt=""
                >
              </v-fade-transition>
            </template>

            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" class="mt-n2">
                    <v-icon icon="mdi-menu" start></v-icon>

                    Menu
                  </v-btn>
                </template>

                <v-card>
                  <v-card-text class="pa-6">
                    <v-btn
                      color="primary"
                      size="large"
                      variant="text"
                      @click="clickMe"
                    >
                      <v-icon icon="mdi-target" start></v-icon>

                      Click me
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      message: 'Hey!',
      loading: false,
    }),

    methods: {
      clickMe () {
        this.loading = true
        this.message = 'Wait for it...'
        setTimeout(() => {
          this.loading = false
          this.message = `You've clicked me!`
        }, 2000)
      },
    },
  }
</script>
