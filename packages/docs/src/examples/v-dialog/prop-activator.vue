<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <v-dialog max-width="340">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              prepend-icon="mdi-package"
              width="204"
            >
              Slot Activator
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-package"
              text="When using the activator slot, you must bind the slot props to the activator element."
              title="Slot Activator"
            >
              <template v-slot:actions>
                <v-btn
                  class="ml-auto"
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="12" md="6">
        <v-btn
          prepend-icon="mdi-picture-in-picture-bottom-right"
          width="204"
        >
          Parent Activator

          <v-dialog activator="parent" max-width="340">
            <template v-slot:default="{ isActive }">
              <v-card
                prepend-icon="mdi-picture-in-picture-bottom-right"
                text="When using the parent as the activator, the dialog will bind its listeners to the parent element."
                title="Parent Activator"
              >
                <template v-slot:actions>
                  <v-btn
                    class="ml-auto"
                    text="Close"
                    @click="isActive.value = false"
                  ></v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-btn
          ref="btn"
          prepend-icon="mdi-variable"
          width="204"
        >
          Ref Activator
        </v-btn>

        <v-dialog :activator="btn" max-width="340">
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-variable"
              text="When using a ref, the dialog will bind its listeners to the ref element. This works for any element and custom components."
              title="Ref Activator"
            >
              <template v-slot:actions>
                <v-btn
                  class="ml-auto"
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>

      <v-col cols="12" md="6">
        <v-btn
          id="activator-target"
          prepend-icon="mdi-bullseye-arrow"
          width="204"
        >
          Target Activator
        </v-btn>

        <v-dialog activator="#activator-target" max-width="340">
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-bullseye-arrow"
              text="Pass any valid querySelector to the activator prop to bind the dialog to the target element."
              title="Target Activator"
            >
              <template v-slot:actions>
                <v-btn
                  class="ml-auto"
                  text="Close"
                  @click="isActive.value = false"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const btn = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        btn: null,
      }
    },
  }
</script>
