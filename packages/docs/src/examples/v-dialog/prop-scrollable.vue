<template>
  <div class="pa-4 text-center">
    <v-dialog
      width="auto"
      scrollable
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="brown"
          prepend-icon="mdi-earth"
          text="Select Country"
          variant="outlined"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card
          prepend-icon="mdi-earth"
          title="Select Country"
        >
          <v-divider class="mt-3"></v-divider>

          <v-card-text class="px-4" style="height: 300px;">
            <v-radio-group
              v-model="dialog"
              messages="Select a Country from the radio group"
              column
            >
              <v-radio
                label="Bahamas, The"
                value="bahamas"
              ></v-radio>

              <v-radio
                label="Bahrain"
                value="bahrain"
              ></v-radio>

              <v-radio
                label="Bangladesh"
                value="bangladesh"
              ></v-radio>

              <v-radio
                label="Barbados"
                value="barbados"
              ></v-radio>

              <v-radio
                label="Belarus"
                value="belarus"
              ></v-radio>

              <v-radio
                label="Belgium"
                value="belgium"
              ></v-radio>

              <v-radio
                label="Belize"
                value="belize"
              ></v-radio>

              <v-radio
                label="Benin"
                value="benin"
              ></v-radio>

              <v-radio
                label="Bhutan"
                value="bhutan"
              ></v-radio>

              <v-radio
                label="Bolivia"
                value="bolivia"
              ></v-radio>

              <v-radio
                label="Bosnia and Herzegovina"
                value="bosnia"
              ></v-radio>

              <v-radio
                label="Botswana"
                value="botswana"
              ></v-radio>

              <v-radio
                label="Brazil"
                value="brazil"
              ></v-radio>

              <v-radio
                label="Brunei"
                value="brunei"
              ></v-radio>

              <v-radio
                label="Bulgaria"
                value="bulgaria"
              ></v-radio>

              <v-radio
                label="Burkina Faso"
                value="burkina"
              ></v-radio>

              <v-radio
                label="Burma"
                value="burma"
              ></v-radio>

              <v-radio
                label="Burundi"
                value="burundi"
              ></v-radio>
            </v-radio-group>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              text="Close"
              @click="isActive.value = false"
            ></v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="surface-variant"
              text="Save"
              variant="flat"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref('')
</script>

<script>
  export default {
    data () {
      return {
        dialog: '',
      }
    },
  }
</script>
