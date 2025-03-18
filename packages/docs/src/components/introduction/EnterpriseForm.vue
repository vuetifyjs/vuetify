<template>
  <v-defaults-provider
    :defaults="{
      VCheckboxBtn: {
        color: 'primary',
        density: 'compact',
      },
    }"
  >
    <v-card
      id="request-service"
      class="pa-2"
      title="Request Support"
      variant="flat"
      border
    >
      <template #append>
        <v-img
          :src="logo"
          width="96"
        />
      </template>

      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onSubmit"
      >
        <v-card-text>
          <v-label class="mb-2 font-weight-bold">Contact Information</v-label>

          <v-row class="mb-4">
            <v-col cols="12" md="6">
              <AppTextField
                v-model="name"
                :placeholder="t('name')"
                :rules="[rules.required]"
                name="name"
                prepend-inner-icon="mdi-account-circle-outline"
              />
            </v-col>

            <v-col cols="12" md="6">
              <AppTextField
                v-model="email"
                :placeholder="t('email-address')"
                :rules="[rules.required, rules.email]"
                name="email"
                prepend-inner-icon="mdi-email-outline"
              />
            </v-col>
          </v-row>

          <v-label class="mb-2 font-weight-bold">What services are you interested in?</v-label>

          <div class="mb-4">
            <v-checkbox-btn
              v-model="upgrade"
              label="Upgrading an existing project"
              name="upgrade"
            />

            <v-checkbox-btn
              v-model="review"
              :false-value="false"
              label="Application performance review"
              name="review"
            />

            <v-checkbox-btn
              v-model="sla"
              label="Direct support or SLA"
              name="sla"
            />

          <!-- <v-checkbox label="Training & workshops" /> -->
          </div>

          <v-label class="font-weight-bold">
            Are you currently a sponsor?
          </v-label>

          <a
            :href="rpath('/introduction/sponsors-and-backers/')"
            class="ms-2"
            target="_blank text-caption"
          >
            <small class="text-primary">More Information</small>
          </a>

          <v-switch
            v-model="sponsor"
            color="primary"
            density="compact"
            label="Yes"
            name="sponsor"
            hide-details
            inset
          />

          <small class="text-medium-emphasis">
            *All service packages are custom per client with pricing based upon the requested services.
          </small>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-spacer />

          <v-btn
            :append-icon="!loading && success ? '$success' : undefined"
            :color="success ? 'success' : valid ? 'primary' : undefined"
            :disabled="loading || !valid"
            :loading="loading"
            size="large"
            type="submit"
            variant="flat"
            block
          >
            <span v-if="!success && !loading">Submit</span>

            <span v-else-if="!loading">Successful</span>
          </v-btn>
        </v-card-actions>

        <div class="text-center text-caption pb-2">
          <small>
            Issues with this form?
            <a
              class="text-primary"
              href="mailto:support@vuetifyjs.com?subject=Enterprise Support"
              target="_blank"
            >
              Contact Us
            </a>
          </small>
        </div>
      </v-form>
    </v-card>
  </v-defaults-provider>
</template>

<script setup lang="ts">
  // Utilities
  import emailjs from '@emailjs/browser'

  const theme = useTheme()
  const { t } = useI18n()

  const name = shallowRef('')
  const email = shallowRef('')
  const upgrade = shallowRef(false)
  const review = shallowRef(false)
  const sla = shallowRef(false)
  const sponsor = shallowRef(false)
  const loading = shallowRef(false)
  const valid = shallowRef<boolean | null>(null)
  const success = shallowRef(false)
  const form = shallowRef<HTMLFormElement>()
  const rules = {
    required: (v: string) => !!v || 'Field is required',
    email: (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
  }

  const logo = computed(() => {
    const color = theme.current.value.dark ? 'dark' : 'light'

    return `https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-${color}.svg`
  })

  watch(success, val => {
    setTimeout(() => {
      if (val) {
        // TODO: bug with resetting checkbox
        upgrade.value = false
        review.value = false
        sla.value = false
        sponsor.value = false

        // form.value?.reset()
      }

      success.value = false
    }, 2000)
  })

  async function onSubmit () {
    loading.value = true

    try {
      const res = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.value?.$el,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      success.value = res.text === 'OK'
    } catch (e) {
      console.log(e)
    }

    loading.value = false
  }
</script>
