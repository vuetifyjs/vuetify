<template>
  <v-card dark flat>
    <v-toolbar flat height="72">
      <v-switch
        v-model="$vuetify.theme.dark"
        hint="This toggles the global state of the Vuetify theme"
        inset
        label="Vuetify Theme Dark"
        persistent-hint
      ></v-switch>
    </v-toolbar>

    <v-card-text>
      <v-list>
        <v-subheader>I inherit dark from my parent</v-subheader>

        <v-list-item>
          <v-list-item-title>One</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Two</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Three</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="mb-y"></v-divider>

      <v-theme-provider root>
        <v-list rounded="b">
          <v-subheader>
            <span>I inherit from the root</span>

            <strong>&nbsp;$vuetify.theme.dark</strong>
          </v-subheader>

          <v-list-item>
            <v-list-item-title>One</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Two</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Three</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-theme-provider>
    </v-card-text>
  </v-card>
</template>
