<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-row img="/static/doc-images/lists/alison.jpeg" height="300px">
          <v-card-text class="white--text pa-0">
            <v-card-title>
              <v-btn light icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn light icon class="mr-3">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn light icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-row height="100%" class="pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Ali Conners</div>
            </v-card-row>
          </v-card-text>
        </v-card-row>
        <v-list two-line>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="indigo--text">phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>(323) 555-6789</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark>chat</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="indigo--text">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon class="indigo--text">location_on</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>1400 Main Street</v-list-tile-title>
                <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
