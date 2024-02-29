<template>
  <div class="pa-4 text-center">
    <v-btn-group
      color="#b2d7ef"
      rounded="pill"
      divided
      density="comfortable"
    >
      <v-btn
        class="pe-2"
        prepend-icon="mdi-account-multiple-outline"
        variant="flat"
      >
        <div class="text-none font-weight-regular">
          Share
        </div>

        <v-dialog activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Invite John to connect
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>
                <div class="text-medium-emphasis mb-4">
                  Invite collaborators to your network and grow your connections.
                </div>

                <div class="mb-2">Message (optional)</div>

                <v-textarea
                  :counter="300"
                  class="mb-2"
                  persistent-counter
                  rows="2"
                  variant="outlined"
                ></v-textarea>

                <div class="text-overline mb-2">💎 PREMIUM</div>

                <div class="text-medium-emphasis mb-1">
                  Share with unlimited people and get more insights about your network. Try Premium Free for 30 days.
                </div>

                <v-btn
                  color="primary"
                  class="text-none font-weight-bold ms-n4"
                  text="Retry Premium Free"
                  variant="text"
                ></v-btn>
              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  text="Cancel"
                  rounded="xl"
                  @click="isActive.value = false"
                ></v-btn>

                <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="Send"
                  variant="flat"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

      <v-btn
        icon
        size="small"
      >
        <v-icon icon="mdi-menu-down"></v-icon>

        <v-menu
          activator="parent"
          location="bottom end"
          transition="fade-transition"
        >
          <v-list
            density="compact"
            slim
            rounded="lg"
            min-width="250"
          >
            <v-list-item
              title="Copy link"
              prepend-icon="mdi-link"
              link
            ></v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item min-height="24">
              <template v-slot:subtitle>
                <div class="text-caption">
                  Shared with John + 1 more
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-btn-group>
  </div>
</template>
