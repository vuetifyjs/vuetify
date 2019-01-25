<template>
  <v-container>
    <v-layout column>
      <main-header>Item Groups</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-item-group>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                v-for="n in 3"
                :key="n"
                xs12
                md4
              >
                <v-item>
                  <v-card
                    slot-scope="{ active, toggle }"
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center"
                    dark
                    height="200"
                    style="user-select: none;"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div
                        v-if="active"
                        class="display-3 text-xs-center"
                      >
                        Active
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
      </core-section>

      <core-title>Multiple</core-title>
      <core-section>
        <v-item-group multiple>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                v-for="n in 3"
                :key="n"
                xs12
                md4
              >
                <v-item>
                  <v-card
                    slot-scope="{ active, toggle }"
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center"
                    dark
                    height="200"
                    style="user-select: none;"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div
                        v-if="active"
                        class="display-3 text-xs-center"
                      >
                        Active
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
      </core-section>

      <core-title>Active class</core-title>
      <core-section>
        <v-item-group active-class="success">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                v-for="n in 3"
                :key="n"
                xs12
                md4
              >
                <v-item>
                  <v-card
                    slot-scope="{ active, toggle }"
                    class="d-flex align-center"
                    dark
                    height="200"
                    style="user-select: none;"
                    @click="toggle"
                  >
                    <v-scroll-y-transition>
                      <div
                        v-if="active"
                        class="display-3 text-xs-center"
                      >
                        Active
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'ItemGroups',

    data: () => ({})
  }
</script>
