<template>
  <div class="grey lighten-5 pa-3">
    <v-toolbar
      v-if="variant === 'vertical'"
      color="gray"
      :dark="dark"
    >
      <v-toolbar-title>Title</v-toolbar-title>

      <v-divider
        class="mx-3"
        :inset="inset"
        vertical
      ></v-divider>

      <span class="subheading">My Home</span>

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
    </v-toolbar>

    <v-layout v-else row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card :dark="dark">
          <v-list>
            <v-list-item>
              I'm a list item
            </v-list-item>

            <v-divider :inset="inset"></v-divider>

            <v-list-item>
              I'm a list item
            </v-list-item>

            <v-divider :inset="inset"></v-divider>

            <v-list-item>
              I'm a list item
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      align-center
      justify-center
      class="mt-5"
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
        ></v-select>
        <template>
          <v-switch
            v-model="dark"
            :label="`Light/Dark Theme`"
          ></v-switch>
          <v-checkbox
            v-model="inset"
            hide-details
            label="Inset"
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
        'vertical'
      ],
      items2: [

      ],
      dark: false,
      variant: 'default'
    })
  }
</script>
