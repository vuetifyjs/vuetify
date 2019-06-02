<template>
  <v-container>
    <v-layout column>
      <main-header>Windows</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-layout align-center>
          <v-item-group
            v-model="window1"
            class="shrink mr-4"
            mandatory
            tag="v-flex"
          >
            <v-item
              v-for="n in length1"
              :key="n"
            >
              <template #default="{ active, toggle }">
                <v-btn
                  :input-value="active"
                  icon
                  @click="toggle"
                >
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </template>
            </v-item>
          </v-item-group>

          <v-flex>
            <v-window
              v-model="window1"
              class="elevation-1"
              vertical
            >
              <v-window-item
                v-for="n in length1"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar color="grey" class="mr-3" />
                      <strong class="title">Title {{ n }}</strong>
                      <v-spacer />
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>With slider</core-title>
      <core-section>
        <v-layout column align-center>
          <v-slider
            v-model="window2"
            :max="length2 - 1"
          />

          <v-flex>
            <v-window
              v-model="window2"
              class="elevation-1"
              vertical
            >
              <v-window-item
                v-for="n in length2"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar color="grey" class="mr-3" />
                      <strong class="title">Title {{ n }}</strong>
                      <v-spacer />
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>Reverse</core-title>
      <core-section>
        <v-layout column align-center>
          <v-slider
            v-model="window3"
            :max="length3 - 1"
          />

          <v-flex>
            <v-window
              v-model="window3"
              class="elevation-1"
              reverse
              vertical
            >
              <v-window-item
                v-for="n in length3"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar color="grey" class="mr-3" />
                      <strong class="title">Title {{ n }}</strong>
                      <v-spacer />
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>Horizontal</core-title>
      <core-section>
        <v-layout column align-center>
          <v-slider
            v-model="window4"
            :max="length4 - 1"
          />

          <v-flex>
            <v-window
              v-model="window4"
              class="elevation-1"
            >
              <v-window-item
                v-for="n in length4"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar color="grey" class="mr-3" />
                      <strong class="title">Title {{ n }}</strong>
                      <v-spacer />
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>Horizontal & reverse</core-title>
      <core-section>
        <v-layout column align-center>
          <v-slider
            v-model="window5"
            :max="length5 - 1"
          />

          <v-flex>
            <v-window
              v-model="window5"
              class="elevation-1"
              reverse
            >
              <v-window-item
                v-for="n in length5"
                :key="n"
              >
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar color="grey" class="mr-3" />
                      <strong class="title">Title {{ n }}</strong>
                      <v-spacer />
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Windows',

    data: () => ({
      length1: 3,
      window1: 0,
      length2: 3,
      window2: 0,
      length3: 3,
      window3: 0,
      length4: 3,
      window4: 0,
      length5: 3,
      window5: 0,
    }),
  }
</script>
