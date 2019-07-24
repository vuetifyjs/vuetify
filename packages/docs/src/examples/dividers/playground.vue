<template>
  <div class="grey lighten-5 pa-4">
    <v-toolbar
      v-if="variant === 'vertical'"
      color="gray"
    >
      <v-toolbar-title>Title</v-toolbar-title>

      <v-divider
        class="mx-4"
        :inset="inset"
        vertical
      ></v-divider>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>
          News
        </v-btn>

        <v-divider :inset="inset" vertical></v-divider>

        <v-btn text>
          Blog
        </v-btn>

        <v-divider :inset="inset" vertical></v-divider>

        <v-btn text>
          Music
        </v-btn>

        <v-divider :inset="inset" vertical></v-divider>
      </v-toolbar-items>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-toolbar>

    <v-layout v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list>
            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>move_to_inbox</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>move_to_inbox</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>move_to_inbox</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider :inset="inset"></v-divider>

            <v-subheader>Subheader</v-subheader>

            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>folder</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider :inset="inset"></v-divider>

            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>folder</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider :inset="inset"></v-divider>

            <v-list-item @click="">
              <v-list-item-action>
                <v-icon>folder</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>I'm a list item</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      class="mt-12"
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
      >
        <v-select
          v-model="variant"
          :items="items"
          clearable
          label="Variant"
          light
        ></v-select>
        <template>
          <v-checkbox
            v-model="inset"
            hide-details
            label="Inset"
            light
          ></v-checkbox>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      inset: false,
      items: [
        'default',
        'vertical',
      ],
      variant: 'default',
    }),
  }
</script>
