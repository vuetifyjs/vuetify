<template>
  <v-container class="h-100 pa-4" fluid>
    <v-row class="h-100 align-center justify-center">
      <v-sheet class="flex-1-1 px-4" color="transparent" max-width="420">
        <v-img
          class="mx-auto mb-4"
          height="60"
          max-width="60"
          src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
        />

        <div class="text-headline-small text-center mb-8 font-weight-medium">Log into your account</div>

        <v-sheet border="opacity-25 thin" class="overflow-hidden" rounded="lg">
          <v-text-field
            placeholder="Email"
            rounded="lg"
            value="john@vuetifyjs.com"
            variant="solo"
            hide-details
          />

          <v-divider />

          <v-text-field
            placeholder="Password"
            type="password"
            value="vuetify"
            variant="solo"
            hide-details
          />
        </v-sheet>

        <div class="py-4">
          <div class="d-flex justify-space-between align-center">
            <v-checkbox-btn class="ms-n3" color="primary" label="Remember me">
              <template #label>
                <span class="text-body-medium">Remember me</span>
              </template>
            </v-checkbox-btn>

            <a
              class="text-decoration-none text-primary text-body-medium font-weight-medium cursor-pointer"
              @click="emit('login')"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <v-btn
          class="text-none mb-8"
          color="primary"
          rounded="lg"
          text="Log In"
          block
          flat
          @click="emit('login')"
        />

        <div class="text-center text-body-medium">
          Don't have an account?
          <a
            class="text-decoration-none text-primary font-weight-medium cursor-pointer"
            @click="emit('login')"
          >
            Sign up
          </a>
        </div>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const emit = defineEmits(['login'])
</script>
