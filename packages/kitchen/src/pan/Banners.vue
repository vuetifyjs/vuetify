<template>
  <v-container>
    <v-layout column>
      <main-header>Banners</main-header>

      <sub-header>One-line</sub-header>

      <core-title>Default</core-title>
      <core-section>
        <v-banner single-line>
          No Internet connection
        </v-banner>
      </core-section>

      <core-title>With actions</core-title>
      <core-section>
        <v-banner single-line>
          No Internet connection
          <template slot="actions">
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>Dismissable</core-title>
      <core-section>
        <v-checkbox v-model="v0" label="Visible" />
        <v-banner v-model="v0" single-line transition="slide-y-transition">
          No Internet connection
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With icon</core-title>
      <core-section>
        <v-banner single-line icon="mdi-wifi-strength-alert-outline">
          No Internet connection
        </v-banner>
      </core-section>

      <core-title>With icon slot</core-title>
      <core-section>
        <v-banner single-line>
          <v-icon slot="icon" color="warning" size="40">mdi-wifi-strength-alert-outline</v-icon>
          No Internet connection
        </v-banner>
      </core-section>

      <core-title>With action and icon</core-title>
      <core-section>
        <v-banner single-line icon="mdi-wifi-strength-alert-outline">
          No Internet connection
          <template slot="actions">
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With actions and icon</core-title>
      <core-section>
        <v-banner single-line icon="mdi-wifi-strength-alert-outline">
          No Internet connection
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With click:icon event</core-title>
      <core-section>
        <v-banner single-line icon="mdi-wifi-strength-alert-outline" @click:icon="alert">
          No Internet connection
        </v-banner>
      </core-section>

      <core-title>With click:icon event and icon slot</core-title>
      <core-section>
        <v-banner single-line @click:icon="alert">
          <v-icon slot="icon" color="warning" size="40">mdi-wifi-strength-alert-outline</v-icon>
          No Internet connection
        </v-banner>
      </core-section>

      <core-title>Visibility control</core-title>
      <core-section>
        <v-checkbox v-model="v1" label="Visible" />
        <v-banner v-model="v1" single-line icon="mdi-wifi-strength-alert-outline">
          No Internet connection
          <template slot="actions">
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>Visibility control + transition</core-title>
      <core-section>
        <v-checkbox v-model="v2" label="Visible" />
        <v-banner v-model="v2" single-line transition="slide-y-transition" icon="mdi-wifi-strength-alert-outline">
          No Internet connection
          <template slot="actions">
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>Text overflow</core-title>
      <core-section>
        <v-banner single-line icon="mdi-wifi-strength-alert-outline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <sub-header>Two-line</sub-header>

      <core-title>Default</core-title>
      <core-section>
        <v-banner>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
        </v-banner>
      </core-section>

      <core-title>With icon</core-title>
      <core-section>
        <v-banner icon="mdi-wifi-strength-alert-outline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
        </v-banner>
      </core-section>

      <core-title>With icon slot</core-title>
      <core-section>
        <v-banner>
          <v-icon slot="icon" size="40" color="warning">mdi-wifi-strength-alert-outline</v-icon>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With actions</core-title>
      <core-section>
        <v-banner>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With actions and icon</core-title>
      <core-section>
        <v-banner icon="mdi-wifi-strength-alert-outline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With click:icon event</core-title>
      <core-section>
        <v-banner icon="mdi-wifi-strength-alert-outline" @click:icon="alert">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>With click:icon event and icon slot</core-title>
      <core-section>
        <v-banner @click:icon="alert">
          <v-icon slot="icon" size="40" color="warning">mdi-wifi-strength-alert-outline</v-icon>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions>
            <v-btn text color="primary">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>Visibility control</core-title>
      <core-section>
        <v-checkbox v-model="v3" label="Visible" />
        <v-banner v-model="v3" icon="mdi-wifi-strength-alert-outline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>

      <core-title>Visibility control + transition</core-title>
      <core-section>
        <v-checkbox v-model="v4" label="Visible" />
        <v-banner v-model="v4" transition="slide-y-transition" icon="mdi-wifi-strength-alert-outline">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus nec sem id malesuada.
          Curabitur lacinia sem et turpis euismod, eget elementum ex pretium.
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss">Dismiss</v-btn>
            <v-btn text color="primary">Retry</v-btn>
          </template>
        </v-banner>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Banners',

    data: () => ({
      v0: true,
      v1: true,
      v2: true,
      v3: true,
      v4: true,
    }),

    methods: {
      alert () {
        alert('Clicked on icon')
      },
    },
  }
</script>
