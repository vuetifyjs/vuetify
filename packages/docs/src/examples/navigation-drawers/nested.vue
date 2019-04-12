<template>
  <v-card
    class="mx-auto"
    height="500"
    width="300"
  >
    <v-navigation-drawer
      permanent
      width="100%"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="title">Dashboard</v-list-item-title>
            <v-list-item-subtitle>subtitle</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-group
          prepend-icon="account_circle"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="(admin, i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(crud, i) in cruds"
              :key="i"
              @click=""
            >
              <v-list-item-title v-text="crud[0]"></v-list-item-title>
              <v-list-item-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
            <v-list-item-subtitle>Logged in</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]
    })
  }
</script>
