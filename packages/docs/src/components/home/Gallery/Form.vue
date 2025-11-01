<template>
  <v-container class="px-md-6 py-5" fluid>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h6 font-weight-medium">Personal Information</h5>

        <p class="text-body-2 text-medium-emphasis">Use a permanent address where you can receive mail.</p>
      </v-col>

      <v-col cols="12">
        <div class="d-flex align-center ga-3">
          <v-avatar image="https://cdn.vuetifyjs.com/images/john.jpg" rounded="lg" size="80" />

          <div>
            <v-btn class="mb-2 text-none" color="surface-light" text="Change avatar" variant="flat" />

            <p class="text-body-2 text-medium-emphasis">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <v-form>
          <v-container class="px-0">
            <v-row>
              <v-col cols="12" sm="6">
                <v-label>First name</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-label>Last name</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-label>Email address</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-label>Username</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  placeholder="jonesmith"
                  variant="outlined"
                  hide-details
                >
                  <template #prepend-inner>
                    <span>example.com/</span>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-label>Timezone</v-label>
                <v-select
                  :items="['Pacific Standard Time', 'Eastern Standard Time', 'Greenwich Mean Time']"
                  :model-value="'Pacific Standard Time'"
                  color="primary"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-btn class="text-none" color="primary" text="Save" variant="flat" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <v-divider />

  <v-container class="px-md-6 py-12" fluid>
    <v-row>
      <v-col cols="12">
        <h5 class="text-h6 font-weight-medium">Change password</h5>

        <p class="text-body-2 text-medium-emphasis">Update your password associated with your account.  </p>
      </v-col>

      <v-col cols="12">
        <v-form>
          <v-container class="px-0 pt-0">
            <v-row>
              <v-col cols="12">
                <v-label>Current password</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  type="password"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-label>New password</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  type="password"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-label>Confirm password</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  type="password"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-btn class="text-none" color="primary" text="Save" variant="flat" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <v-divider />

  <v-container class="px-md-6 py-12" fluid>
    <v-row>
      <v-col cols="12" md="4">
        <h5 class="text-subtitle-1 font-weight-medium">Log out other sessions</h5>

        <p class="text-body-2 text-medium-emphasis">Please enter your password to confirm you would like to log out of your other sessions across all of your devices.</p>
      </v-col>

      <v-col cols="12" md="8">
        <v-form>
          <v-container class="px-0 pt-0">
            <v-row>
              <v-col cols="12">
                <v-label>Your password</v-label>

                <v-text-field
                  color="primary"
                  density="compact"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12">
                <v-btn class="text-none" color="primary" text="Log out other sessions" variant="flat" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

  <v-divider />

  <v-container class="px-md-6 py-12" fluid>
    <v-row align="center">
      <v-col cols="12" md="4">
        <h5 class="text-subtitle-1 font-weight-medium">Delete account</h5>

        <p class="text-body-2 text-medium-emphasis">No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.</p>
      </v-col>

      <v-col cols="12" md="8">
        <v-btn class="text-none" color="error" text="Yes, delete my account" variant="flat" />
      </v-col>
    </v-row>
  </v-container>
</template>>
