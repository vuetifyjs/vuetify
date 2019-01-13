<template>
  <v-container>
    <v-layout column>
      <!-- Dense -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Dense
        </h3>
        <v-alert
          type="success"
          dense
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          dense
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          dense
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          dense
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Default -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Default
        </h3>
        <v-alert
          type="success"
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
        >
          This is a info alert.
        </v-alert>

        <v-alert
          type="warning"
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Prominent -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Prominent
        </h3>
        <v-alert
          type="success"
          prominent
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          prominent
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          prominent
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          prominent
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Border -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Border
        </h3>
        <v-alert
          type="success"
          border="top"
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          border="right"
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          border="bottom"
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          border="left"
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Colored Border -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Colored Border
        </h3>
        <v-alert
          type="success"
          border="right"
          colored-border
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          border="bottom"
          colored-border
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          border="left"
          colored-border
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          border="top"
          colored-border
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Outline -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Outline
        </h3>
        <v-alert
          type="success"
          outlined
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          outlined
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          outlined
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          outlined
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Prominent outline -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Prominent outline
        </h3>
        <v-alert
          type="success"
          prominent
          outlined
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          prominent
          outlined
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          prominent
          outlined
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          prominent
          outlined
        >
          This is an error alert.
        </v-alert>
      </v-flex>
      <!-- Closable -->
      <v-flex>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Closable
        </h3>
        <v-alert
          v-model="alertDismissible"
          dismissible
          color="blue-grey"
          dark
        >
          <div>
            <!-- eslint-disable max-len -->
            Nullam vel sem. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Sed hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.
          </div>
        </v-alert>

        <div class="text-xs-center">
          <v-btn
            v-if="!alertDismissible"
            color="primary"
            dark
            @click="alertDismissible = true"
          >
            Reset
          </v-btn>
        </div>
      </v-flex>
      <!-- Custom icons -->
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          Custom icons
        </h3>
        <v-alert
          color="purple"
          dark
          icon="mdi-account-check"
        >
          This is a purple alert with a custom icon.
        </v-alert>

        <v-alert
          color="error"
          dense
        >
          This is an error alert with no icon.
        </v-alert>
      </v-flex>
      <!-- CSS Transitions -->
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          Custom transitions
        </h3>
        <div class="text-xs-center">
          <v-btn
            class="mb-3"
            color="primary"
            @click="alertTransition = !alertTransition"
          >
            Toggle
          </v-btn>
        </div>
        <v-alert
          v-model="alertTransition"
          type="success"
          transition="fade-transition"
        >
          This is a success alert.
        </v-alert>
      </v-flex>
      <!-- Slots -->
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          Slots
        </h3>
        <v-alert
          v-model="alertTransition2"
          class="mb-0"
          color="blue darken-3"
          dark
        >
          <template slot="prepend">
            <v-avatar
              class="pa-2 mr-3"
              color="white"
              size="64"
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
                height="100%"
                contain
              />
            </v-avatar>
          </template>
          <div>
            <!-- eslint-disable max-len -->
            Nullam vel sem. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Sed hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.
          </div>
          <v-btn
            slot="close"
            slot-scope="{ toggle }"
            icon
            @click="toggle"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-alert>
        <div class="text-xs-center">
          <v-btn
            v-if="!alertTransition2"
            color="primary"
            dark
            @click="alertTransition2 = true"
          >
            Reset
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Alerts',

  data: () => ({
    alertDismissible: true,
    alertTransition: true,
    alertTransition2: true
  })
}
</script>

<style>
  .v-alert {
    margin-bottom: 16px;
  }
</style>
