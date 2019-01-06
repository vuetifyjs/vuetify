<template>
  <v-container text-xs-center>
    <v-layout
      column
      variations>
      <v-flex>
        <v-alert
          :value="true"
          type="success"
        >
          This is a success alert.
        </v-alert>

        <v-alert
          :value="true"
          type="info"
        >
          This is a info alert.
        </v-alert>

        <v-alert
          :value="true"
          type="warning"
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          :value="true"
          type="error"
        >
          This is a error alert.
        </v-alert>
      </v-flex>

      <v-flex>
        <v-alert
          v-model="alert"
          dismissible
          type="success"
        >
          This is a success alert that is closable.
        </v-alert>

        <div class="text-xs-center">
          <v-btn
            v-if="!alert"
            color="primary"
            dark
            @click="alert = true"
          >
            Reset
          </v-btn>
        </div>
      </v-flex>

      <v-flex>
        <v-alert
          :value="true"
          color="success"
          icon="mdi-account-check"
        >
          This is a success alert with a custom icon.
        </v-alert>

        <v-alert
          :value="true"
          color="error"
        >
          This is an error alert with no icon.
        </v-alert>
      </v-flex>

      <v-flex>
        <div class="text-xs-center">
          <v-btn
            color="primary"
            @click="alert = !alert"
          >
            Toggle
          </v-btn>
        </div>
        <v-alert
          :value="alert"
          type="success"
          transition="scale-transition"
        >
          This is a success alert.
        </v-alert>
      </v-flex>

      <v-flex>
        <v-alert
          :value="true"
          color="success"
          outline
        >
          This is a success alert.
        </v-alert>

        <v-alert
          :value="true"
          color="info"
          outline
        >
          This is an info alert.
        </v-alert>

        <v-alert
          :value="true"
          color="warning"
          outline
        >
          This is a warning alert.
        </v-alert>

        <v-alert
          :value="true"
          color="error"
          outline
        >
          This is a error alert.
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Alerts',

  data: () => ({
    alert: true
  })
}
</script>
