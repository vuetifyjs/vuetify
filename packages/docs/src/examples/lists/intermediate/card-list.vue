<template>
  <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
    >
      <v-row class="fill-height">
        <v-card-title>
          <v-btn dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>

          <div class="flex-grow-1"></div>

          <v-btn dark icon class="mr-4">
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>

        <div class="flex-grow-1"></div>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">Ali Conners</div>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="indigo">phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>(650) 555-1234</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>chat</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>(323) 555-6789</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>chat</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="indigo">mail</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>ali_connors@example.com</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
