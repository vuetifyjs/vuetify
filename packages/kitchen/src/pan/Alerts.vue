<template>
  <v-container text-xs-center>
    <v-layout
      column
      variations>
      <v-flex>
        <h3 class="display-2 mb-3">Colors</h3>
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
        <h3 class="display-2 mb-3">Closable</h3>
        <v-alert
          v-model="alertDismissible"
          dismissible
          type="success"
        >
          This is a success alert that is closable.
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

      <v-flex>
        <h3 class="display-2 mb-3">Custom icons</h3>
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
        <h3 class="display-2 mb-3">Custom transitions</h3>
        <div class="text-xs-center">
          <v-btn
            color="primary"
            @click="alertTransition = !alertTransition"
          >
            Toggle
          </v-btn>
        </div>
        <v-alert
          v-model="alertTransition"
          type="success"
          transition="scale-transition"
        >
          This is a success alert.
        </v-alert>
      </v-flex>

      <v-flex>
        <h3 class="display-2 mb-3">Outline</h3>
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
    alertDismissible: true,
    alertTransition: true
  })
}
</script>
