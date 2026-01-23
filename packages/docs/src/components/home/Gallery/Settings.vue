<template>
  <div>
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-h6">Settings</v-toolbar-title>
    </v-toolbar>

    <v-tabs v-model="tab" color="primary">
      <v-tab class="text-none" value="profile">Profile</v-tab>
      <v-tab class="text-none" value="security">Security</v-tab>
      <v-tab class="text-none" value="notifications">Notifications</v-tab>
    </v-tabs>

    <v-divider />

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="profile">
        <v-container class="px-md-6 py-5" fluid>
          <v-row>
            <v-col cols="12">
              <div class="d-flex align-center ga-4">
                <v-avatar image="https://cdn.vuetifyjs.com/docs/images/team/john.png" rounded="lg" size="80" />

                <div>
                  <v-btn
                    :loading="saving === 'avatar'"
                    class="mb-2 text-none"
                    color="surface-light"
                    prepend-icon="mdi-camera"
                    text="Change avatar"
                    variant="flat"
                    @click="save('avatar')"
                  />

                  <p class="text-body-2 text-medium-emphasis">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="profile.first"
                color="primary"
                label="First name"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="profile.last"
                color="primary"
                label="Last name"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="profile.email"
                color="primary"
                label="Email address"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="profile.username"
                append-inner-icon="mdi-open-in-new"
                color="primary"
                label="Username"
                prefix="github.com/"
                prepend-inner-icon="mdi-github"
                variant="outlined"
                hide-details
                @click:append-inner="onClickUsername"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="profile.x"
                append-inner-icon="mdi-open-in-new"
                color="primary"
                label="Socials"
                prepend-inner-icon="$x"
                variant="outlined"
                hide-details
                @click:append-inner="onClickSocials"
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="profile.timezone"
                :items="timezones"
                color="primary"
                label="Timezone"
                prepend-inner-icon="mdi-earth"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                :loading="saving === 'profile'"
                class="text-none"
                color="primary"
                text="Save changes"
                variant="flat"
                @click="save('profile')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="security">
        <v-container class="px-md-6 py-5" fluid>
          <v-row>
            <v-col cols="12">
              <h6 class="text-subtitle-1 font-weight-medium mb-1">Change password</h6>

              <p class="text-body-2 text-medium-emphasis">Update your password associated with your account.</p>
            </v-col>

            <v-col cols="12">
              <v-text-field
                color="primary"
                label="Current password"
                type="password"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                label="New password"
                type="password"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                color="primary"
                label="Confirm password"
                type="password"
                variant="outlined"
                hide-details
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                :loading="saving === 'password'"
                class="text-none"
                color="primary"
                text="Update password"
                variant="flat"
                @click="save('password')"
              />
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <v-row>
            <v-col cols="12">
              <h6 class="text-subtitle-1 font-weight-medium mb-1">Two-factor authentication</h6>

              <p class="text-body-2 text-medium-emphasis">Add an extra layer of security to your account.</p>
            </v-col>

            <v-col cols="12">
              <v-switch
                v-model="twoFactor"
                color="primary"
                label="Enable two-factor authentication"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-6" />

          <v-row>
            <v-col cols="12">
              <h6 class="text-subtitle-1 font-weight-medium text-error mb-1">Danger zone</h6>

              <p class="text-body-2 text-medium-emphasis mb-4">Permanently delete your account and all associated data.</p>

              <v-btn
                :loading="saving === 'delete'"
                class="text-none"
                color="error"
                prepend-icon="mdi-delete"
                text="Delete account"
                variant="tonal"
                @click="save('delete')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item value="notifications">
        <v-container class="px-md-6 py-5" fluid>
          <v-row>
            <v-col cols="12">
              <h6 class="text-subtitle-1 font-weight-medium mb-1">Email notifications</h6>

              <p class="text-body-2 text-medium-emphasis">Manage your email notification preferences.</p>

              <v-list lines="two">
                <v-list-item>
                  <template #prepend>
                    <v-checkbox-btn v-model="notifications.marketing" class="me-1" color="primary" />
                  </template>

                  <v-list-item-title>Marketing emails</v-list-item-title>
                  <v-list-item-subtitle>Receive emails about new features and updates.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-checkbox-btn v-model="notifications.security" class="me-1" color="primary" />
                  </template>

                  <v-list-item-title>Security alerts</v-list-item-title>
                  <v-list-item-subtitle>Get notified about security events on your account.</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-checkbox-btn v-model="notifications.updates" class="me-1" color="primary" />
                  </template>

                  <v-list-item-title>Product updates</v-list-item-title>
                  <v-list-item-subtitle>Stay informed about product changes and improvements.</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <v-col cols="12">
              <v-btn
                :loading="saving === 'notifications'"
                class="text-none"
                color="primary"
                text="Save preferences"
                variant="flat"
                @click="save('notifications')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
  const saving = shallowRef('')
  const tab = shallowRef('profile')
  const twoFactor = shallowRef(false)

  const profile = ref({
    first: 'John',
    last: 'Leider',
    email: 'john@vuetifyjs.com',
    username: 'johnleider',
    x: 'zeroskillz',
    timezone: 'Central Standard Time',
  })

  const notifications = ref({
    marketing: true,
    security: true,
    updates: false,
  })

  const timezones = [
    'Pacific Standard Time',
    'Eastern Standard Time',
    'Central Standard Time',
    'Greenwich Mean Time',
  ]

  function save (value: string) {
    saving.value = value

    setTimeout(() => {
      saving.value = ''
    }, 2000)
  }

  function onClickUsername () {
    window.open('https://github.com/johnleider')
  }

  function onClickSocials () {
    window.open('https://x.com/zeroskillz')
  }
</script>
