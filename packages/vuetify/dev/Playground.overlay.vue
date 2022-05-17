<template>
  <!-- <v-app>
    <v-card>
      <v-tabs v-model="tab" slider-color="secondary">
        <template v-for="item in items" :key="item">
          <v-tab>{{ item }}</v-tab>
        </template>
      </v-tabs>

      {{ tab }}

      <v-window v-model="tab">
        <v-window-item>
          foo
        </v-window-item>
        <v-window-item v-if="hello">
          bar
        </v-window-item>
        <v-window-item>
          baz
        </v-window-item>
      </v-window>

      <v-btn @click="hello = !hello">hello</v-btn>
      <v-btn @click="reorder">reorder</v-btn>
    </v-card>
  </v-app> -->
  <v-app>
    <v-app-bar color="grey-lighten-2" />
    <v-navigation-drawer color="grey-darken-2" temporary v-model="nav">
      <v-dialog>
        <template #activator="{ props }">
          <v-btn v-bind="props">open regular dialog</v-btn>
        </template>
        <v-card height="400">
          <v-card-title>Open</v-card-title>
          <v-dialog>
            <template #activator="{ props }">
              <v-btn v-bind="props">open nested dialog</v-btn>
            </template>
            <v-card height="200">
              <v-card-title>Open</v-card-title>
            </v-card>
          </v-dialog>
        </v-card>
      </v-dialog>
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props">menu</v-btn>
        </template>
        <v-card height="200px">
          hello
        </v-card>
      </v-menu>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-card height="200px">
          <v-btn @click="nav = !nav">Toggle nav</v-btn>
          <v-dialog fullscreen>
            <template #activator="{ props }">
              <v-btn v-bind="props">open fullscreen dialog</v-btn>
            </template>
            <v-card height="200">
              <v-card-title>Open</v-card-title>
            </v-card>
          </v-dialog>

          <v-dialog>
            <template #activator="{ props }">
              <v-btn v-bind="props">open regular dialog</v-btn>
            </template>
            <v-card height="400">
              <v-card-title>Open</v-card-title>
              <v-dialog>
                <template #activator="{ props }">
                  <v-btn v-bind="props">open nested dialog</v-btn>
                </template>
                <v-card height="200">
                  <v-card-title>Open</v-card-title>
                </v-card>
              </v-dialog>
            </v-card>
          </v-dialog>
        </v-card>

        <v-layout class="ma-10">
          <v-app-bar color="secondary" />
          <v-navigation-drawer temporary color="primary" v-model="nav2" />
          <v-main>
            <v-card height="200px">
              nested layout
              <v-btn @click="nav2 = !nav2">Toggle nav</v-btn>

              <v-menu>
                <template #activator="{ props }">
                  <v-btn v-bind="props">menu</v-btn>
                </template>
                <v-card height="400px">
                  hello
                </v-card>
              </v-menu>

              <v-dialog fullscreen>
                <template #activator="{ props }">
                  <v-btn v-bind="props">open fullscreen dialog</v-btn>
                </template>
                <v-card height="200">
                  <v-card-title>Open</v-card-title>
                </v-card>
              </v-dialog>

              <v-dialog>
                <template #activator="{ props }">
                  <v-btn v-bind="props">open regular dialog</v-btn>
                </template>
                <v-card height="400">
                  <v-card-title>Open</v-card-title>
                  <v-dialog>
                    <template #activator="{ props }">
                      <v-btn v-bind="props">open nested dialog</v-btn>
                    </template>
                    <v-card height="200">
                      <v-card-title>Open</v-card-title>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-dialog>
            </v-card>
          </v-main>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      nav: false,
      nav2: false,
      tab: 'main',
      hello: true,
      items: ['foo', 'bar', 'baz'],
    }),
    methods: {
      reorder () {
        this.items = ['bar', 'foo', 'baz']
      },
    },
  }
</script>
