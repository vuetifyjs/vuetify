<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        style="--v-list-prepend-gap: 0px"
        permanent
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-right"
                variant="text"
              />
            </template>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
          />
          <v-list-item
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
          />
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          />
          <v-list-item
            prepend-icon="mdi-file-document-outline"
            title="Files"
            value="files"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px">
        <v-container>
          <p>
            This example demonstrates that list item text is properly hidden in rail mode
            when the prepend gap is reduced to 0px. With the fix, the text should be
            completely hidden and not visible at the edge of the drawer.
          </p>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  // No script needed
</script>

<example-meta lang="json">
  {
    "title": "Rail with reduced prepend gap",
    "description": "Demonstrates that list item text is hidden in rail mode when the prepend gap is reduced",
    "height": "300"
  }
</example-meta>
