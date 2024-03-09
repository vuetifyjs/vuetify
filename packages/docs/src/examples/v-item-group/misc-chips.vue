<template>
  <v-card>
    <v-toolbar
      color="blue-grey"
      dark
      flat
    >
      <v-toolbar-title>Submit a post</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-text-field
        label="Title"
        model-value="My new post"
        variant="filled"
      ></v-text-field>

      <v-textarea
        label="Text"
        model-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
        variant="filled"
      ></v-textarea>

      <v-divider class="my-2"></v-divider>

      <v-item-group selected-class="bg-purple" multiple>
        <div class="text-caption mb-2">Tags</div>
        <v-item
          v-for="n in 8"
          :key="n"
          v-slot="{ selectedClass, toggle }"
        >
          <v-chip
            :class="selectedClass"
            @click="toggle"
          >
            Tag {{ n }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
      >
        Post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
