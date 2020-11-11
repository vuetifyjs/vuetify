<template>
  <div>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      repellat ab similique nulla quisquam totam maxime tempora officia,
      quibusdam fugit. Eaque quaerat autem reprehenderit optio explicabo,
      molestias possimus ipsam numquam!
    </p>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="sponsorName"
              :rules="requiredRule"
              label="*Sponsorship Name"
            />

            <v-text-field
              v-model="discordId"
              :rules="requiredRule"
              label="*Discord ID"
              hint="Make sure it's your Discord ID with only digits."
            />

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="*E-mail"
              hide-details
            />

            <v-radio-group v-model="platform" :rules="requiredRule">
              <template #label>
                <p>*Platform:</p>
              </template>
              <div class="d-flex align-center justify-space-between">
                <v-radio
                  v-for="item in radioItems"
                  :key="item.value"
                  class="mb-2"
                  :label="item.label"
                  :value="item.value"
                />
              </div>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="6" lg="6" xl="6">
            <v-text-field
              v-model="companyLogo"
              hint="If your Sponsorship Tier includes a logo, please provide a SVG or PNG (160x90) file."
              label="Company Logo URL (optional)"
            />

            <v-text-field
              v-model="shippingInformation"
              label="Shipping Information (optional)"
              hint="If your Sponsorship Tier includes a physical item, please provide a shipping address."
            />

            <v-text-field v-model="comment" label="Comment (optional)" />

            <v-btn
              :disabled="!valid"
              outlined
              class="mr-4 float-right"
              :loading="loading"
              @click="submitForm"
            >
              Submit

              <v-icon
                right
                small
                v-text="
                  success == 1
                    ? 'mdi-check'
                    : success == 0
                      ? 'mdi-close'
                      : 'mdi-send'
                "
              />
            </v-btn>
            <span>{{ message }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import bucket from '@/plugins/cosmicjs'

  export default {
    name: 'ApplySponsor',
    data: () => ({
      loading: false,
      valid: false,
      success: -1,
      message: '',
      sponsorName: '',
      discordId: '',
      companyLogo: '',
      shippingInformation: '',
      email: '',
      platform: '',
      comment: '',
      radioItems: [
        {
          label: 'GitHub',
          value: 'GitHub',
        },
        {
          label: 'Open Collective',
          value: 'Open Collective',
        },
        {
          label: 'Patreon',
          value: 'Patreon',
        },
      ],
      requiredRule: [v => !!v || 'This field is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
      async submitForm () {
        if (this.$refs.form.validate()) {
          if (!bucket.available) return
          this.loading = true

          const params = {
            title: `Subscriber ${this.sponsorName}`,
            type_slug: 'subscribers',
            metafields: [
              {
                title: 'Email',
                key: 'email',
                type: 'text',
                value: this.email,
              },
              {
                title: 'Discord ID',
                key: 'discord_id',
                type: 'text',
                value: this.discordId,
              },
              {
                title: 'Sponsor Account Name',
                key: 'sponsor_account_name',
                type: 'text',
                value: this.sponsorName,
              },
              {
                title: 'Sponsoring Platform',
                key: 'sponsoring_platform',
                type: 'radio-buttons',
                value: this.platform,
                options: [
                  { value: 'GitHub' },
                  { value: 'Open Collective' },
                  { value: 'Patreon' },
                ],
              },
              {
                title: 'Shipping Information',
                key: 'shipping_information',
                type: 'text',
                value: this.shippingInformation,
              },
              {
                title: 'Comment',
                key: 'comment',
                type: 'text',
                value: this.comment,
              },
              {
                title: 'Company Logo',
                key: 'company_logo',
                type: 'text',
                value: this.companyLogo,
              },
            ],
            trigger_webhook: true,
          }

          bucket
            .addObject(params)
            .then(() => {
              this.loading = false
              this.success = 1
              this.$refs.form.reset()
              setTimeout(() => {
                this.success = -1
              }, 3000)
            })
            .catch(err => {
              console.log('err :>> ', err)
              this.success = 0
              setTimeout(() => {
                this.success = -1
              }, 3000)
            })
        }
      },
    },
  }
</script>
