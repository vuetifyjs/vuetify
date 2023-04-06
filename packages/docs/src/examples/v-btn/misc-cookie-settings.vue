<template>
  <v-banner
    avatar="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
    stacked
  >
    <template v-slot:text>
      Vuetify uses cookies to enable and import the use of the website. Please see our <a href="https://www.iubenda.com/privacy-policy/76325752/cookie-policy" target="_blank">Privacy Policy</a> for more information. By clicking "Accept Cookies" or continuing to use the site, you agree to the use of cookies.
    </template>

    <template v-slot:actions>
      <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-none"
            color="blue-darken-4"
            rounded="0"
            variant="outlined"
            v-bind="props"
          >
            Manage Cookies
          </v-btn>
        </template>

        <v-card title="Cookie Settings">
          <v-card-text>
            <p class="pb-4">
              Vuetify websites use cookies to deliver and improve the visitor experience. Learn more about the cookies we use on our Cookie Policy page.
            </p>

            <v-list-subheader class="font-weight-black text-high-emphasis">Required Cookies</v-list-subheader>

            <p class="mb-4">These cookies are required for the site to function and cannot be turned off.</p>

            <v-list-subheader class="font-weight-black text-high-emphasis">Performance Cookies</v-list-subheader>

            <v-switch
              v-model="performance"
              :label="performance ? 'On' : 'Off'"
              color="blue-darken-4"
              density="compact"
              hide-details
              inline
              inset
            ></v-switch>

            <p class="mb-4">Counts website visits and clicks to understand where people most engage with links to make the experience better.</p>

            <v-list-subheader class="font-weight-black text-high-emphasis">Advertising Cookies</v-list-subheader>

            <v-switch
              v-model="advertising"
              :label="advertising ? 'On' : 'Off'"
              color="blue-darken-4"
              density="compact"
              hide-details
              inline
              inset
            ></v-switch>

            <p class="mb-16">Set by our advertising partners, these cookies are used to build a profile of your interests and show you relevant ads on other sites. They do not store personal information, but are based on uniquely identifying your browser and internet device.</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center px-6 py-3">
            <v-btn
              class="flex-grow-1 text-none"
              color="blue-darken-4"
              rounded="0"
              variant="plain"
              @click="dialog=false"
            >
              Decline All
            </v-btn>

            <v-btn
              class="text-white flex-grow-1 text-none"
              color="blue-darken-4"
              rounded="0"
              variant="flat"
              @click="dialog=false"
            >
              Save and Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        class="text-none ms-4 text-white"
        color="blue-darken-4"
        rounded="0"
        variant="flat"
      >
        Accept Cookies
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      advertising: true,
      performance: true,
    }),
  }
</script>
