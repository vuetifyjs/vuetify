<template>
  <v-container
    id="home"
    class="fill-height text-center"
    tag="section"
  >
    <v-row justify="center">
      <v-col
        class="mb-4"
        cols="auto"
      >
        <span class="headline font-weight-light">Vuetify</span>

        <h1 class="display-4 font-weight-black mb-6">
          Base Preset
        </h1>

        <v-img
          class="mx-auto mb-10"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
          width="196"
        />

        <h2 class="body-2 font-weight-black">
          Important Links
        </h2>

        <v-responsive
          class="mx-auto my-4"
          max-width="60"
        >
          <v-divider />
        </v-responsive>

        <v-responsive
          class="mx-auto"
          max-width="400"
        >
          <v-row
            class="mx-auto"
            dense
          >
            <v-col
              v-for="[link, text, icon] in links"
              :key="link"
              cols="12"
              sm="6"
            >
              <v-btn
                :href="link"
                block
                depressed
                target="_blank"
              >
                <v-icon
                  left
                  v-text="icon"
                />

                {{ text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-responsive>
      </v-col>

      <v-col cols="12">
        <h2 class="body-2 font-weight-black">
          Preset Features
        </h2>

        <v-responsive
          class="mx-auto my-4"
          max-width="60"
        >
          <v-divider />
        </v-responsive>

        <v-responsive
          class="mx-auto"
          max-width="600"
        >
          <v-row
            class="mx-auto my-4"
            justify="center"
          >
            <v-col
              v-for="[text, icon, color] in features"
              :key="text"
              class="text-center d-inline-flex justify-center flex-wrap"
              cols="6"
              sm="4"
              md="3"
            >
              <v-icon
                :color="color"
                class="mb-1"
                size="56"
                v-text="icon"
              />

              <div
                class="col col-12 overline grey--text text--darken-4"
                v-text="text"
              />
            </v-col>
          </v-row>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      features: [
        ['Routing', 'mdi-road-variant', 'blue-grey'],
        ['Vuetify ESLint', 'mdi-auto-fix', 'deep-purple accent-4'],
        ['SASS', 'mdi-sass', 'pink'],
        ['Base Components', 'mdi-cube-scan', 'indigo'],
        ['View Layouts', 'mdi-view-grid-outline', 'orange'],
        ['Webfont Loader', 'mdi-format-size', 'green accent-4'],
      ],
      links: [
        ['//github.com/vuetifyjs/vuetify', 'Github', 'mdi-github-circle'],
        ['//vuetifyjs.com', 'Documentation', 'mdi-file-document'],
        ['//community.vuetifyjs.com', 'Community', 'mdi-account-multiple'],
        ['//github.com/users/johnleider/sponsors', 'Support Vuetify', 'mdi-vuetify'],
      ],
    }),
  }
</script>
