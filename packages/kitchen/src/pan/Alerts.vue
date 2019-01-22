<template>
  <v-container>
    <v-layout column>
      <main-header>Alerts</main-header>

      <!-- Dense -->
      <core-title>Dense</core-title>
      <core-section>
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
      </core-section>
      <!-- Default -->
      <core-title>Default</core-title>
      <core-section>
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
      </core-section>
      <!-- Prominent -->
      <core-title>Prominent</core-title>
      <core-section>
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
      </core-section>
      <!-- Prominent & dense -->
      <core-title>Prominent & dense</core-title>
      <core-section>
        <v-alert
          type="success"
          prominent
          dense
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          prominent
          dense
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          prominent
          dense
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          prominent
          dense
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Border -->
      <core-title>Border</core-title>
      <core-section>
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
      </core-section>
      <!-- Colored Border -->
      <core-title>Colored Border</core-title>
      <core-section>
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
      </core-section>
      <!-- Dense outline -->
      <core-title>Dense outline</core-title>
      <core-section>
        <v-alert
          type="success"
          dense
          outlined
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          dense
          outlined
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          dense
          outlined
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          dense
          outlined
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Dense with border -->
      <core-section>
        <core-title>Dense with border</core-title>
        <v-alert
          type="success"
          dense
          colored-border
          border="top"
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          dense
          colored-border
          border="left"
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          dense
          colored-border
          border="bottom"
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          dense
          colored-border
          border="right"
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Outline -->
      <core-title>Outline</core-title>
      <core-section>
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
      </core-section>
      <!-- Prominent outline -->
      <core-title>Prominent outline</core-title>
      <core-section>
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
      </core-section>
      <!-- Dense Text -->
      <core-title>Dense Text</core-title>
      <core-section>
        <v-alert
          type="success"
          dense
          text
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          dense
          text
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          dense
          text
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          dense
          text
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Text -->
      <core-title>Text</core-title>
      <core-section>
        <v-alert
          type="success"
          text
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          text
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          text
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          text
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Prominent Text -->
      <core-title>Prominent Text</core-title>
      <core-section>
        <v-alert
          type="success"
          prominent
          text
        >
          This is a success alert.
        </v-alert>

        <v-alert
          type="info"
          prominent
          text
        >
          This is an info alert.
        </v-alert>

        <v-alert
          type="warning"
          prominent
          text
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          type="error"
          prominent
          text
        >
          This is an error alert.
        </v-alert>
      </core-section>
      <!-- Closable -->
      <core-title>Closable</core-title>
      <core-section>
        <v-alert
          v-model="alertClosable"
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
            v-if="!alertClosable"
            color="primary"
            dark
            @click="alertClosable = true"
          >
            Reset
          </v-btn>
        </div>
      </core-section>
      <!-- Custom icons -->
      <core-title>Custom icons</core-title>
      <core-section>
        <v-alert
          color="purple"
          dark
          icon="mdi-account-check"
        >
          This is a purple alert with a custom icon.
        </v-alert>

        <v-alert
          color="error"
          dark
        >
          This is an error alert with no icon.
        </v-alert>
      </core-section>
      <!-- CSS Transitions -->
      <core-title>Custom transitions</core-title>
      <core-section>
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
      </core-section>
      <!-- Slots -->
      <core-title>Slots</core-title>
      <core-section>
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
      </core-section>

      <!-- Closable with outline -->
      <core-title>Closable with outline</core-title>
      <core-section>
        <v-alert
          v-model="alertOutline"
          dismissible
          color="success"
          outlined
        >
          This is a closable success outline alert.
        </v-alert>

        <v-alert
          v-model="alertOutline"
          dismissible
          color="info"
          outlined
        >
          This is a closable info outline alert.
        </v-alert>

        <v-alert
          v-model="alertOutline"
          dismissible
          color="warning"
          outlined
        >
          This is a closable warning outline alert.
        </v-alert>

        <v-alert
          v-model="alertOutline"
          dismissible
          color="error"
          outlined
        >
          This is a closable error outline alert.
        </v-alert>
        <div class="text-xs-center">
          <v-btn
            v-if="!alertOutline"
            color="primary"
            dark
            @click="alertOutline = true"
          >
            Reset
          </v-btn>
        </div>
      </core-section>

      <!-- Custom icons with outline -->
      <core-title>Custom icons with outline</core-title>
      <core-section>
        <v-alert
          :value="true"
          color="success"
          outlined
          icon="mdi-account-check"
        >
          This is a success alert.
        </v-alert>

        <v-alert
          :value="true"
          color="info"
          outlined
          icon="mdi-account-check"
        >
          This is an info alert.
        </v-alert>

        <v-alert
          :value="true"
          color="warning"
          outlined
          icon="mdi-account-check"
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          :value="true"
          color="error"
          outlined
          icon="mdi-account-check"
        >
          This is a error alert.
        </v-alert>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Alerts',

    data: () => ({
      alertClosable: true,
      alertTransition: true,
      alertTransition2: true,
      alertOutline: true
    })
  }
</script>

<style>
  .v-alert {
    margin-bottom: 16px;
  }
</style>
