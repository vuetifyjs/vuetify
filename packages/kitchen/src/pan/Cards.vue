<template>
  <v-container>
    <v-layout column>
      <main-header>Cards</main-header>

      <!-- Simple -->
      <v-flex align-self-center>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Simple
        </h3>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Unlimited music now</div>
          </v-card-title>
          <v-card-text>
            Listen to your favorite artists and albums whenever and wherever, online and offline.
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- With media -->
      <v-flex align-self-center>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          With media
        </h3>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Card with media</div>
          </v-card-title>
          <v-card-media>
            <v-img src="http://placekitten.com/1920/1080" />
          </v-card-media>
          <v-card-text>
            You can use cards with media like <code>VImg</code>.
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- Actions -->
      <v-flex align-self-center>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Actions
        </h3>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Unlimited music now</div>
          </v-card-title>
          <v-card-text>
            Listen to your favorite artists and albums whenever and wherever, online and offline.
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent">Listen now</v-btn>
            <v-btn text>Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <!-- Colors -->
      <v-flex align-self-center>
        <h3 class="title grey--text text-xs-center mb-4 mt-5">
          Colors
        </h3>
        <v-layout row wrap justify-space-around align-center>
          <v-card dark color="success" class="mt-2">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
            </v-card-title>
            <v-card-text>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
            <v-card-actions>
              <v-btn color="accent">Listen now</v-btn>
              <v-btn text>Details</v-btn>
            </v-card-actions>
          </v-card>
          <v-card dark color="primary darken-2" class="mt-2">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
            </v-card-title>
            <v-card-text>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
            <v-card-actions>
              <v-btn color="accent">Listen now</v-btn>
              <v-btn text>Details</v-btn>
            </v-card-actions>
          </v-card>
          <v-card dark color="teal" class="mt-2">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
            </v-card-title>
            <v-card-text>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-text>
            <v-card-actions>
              <v-btn color="accent">Listen now</v-btn>
              <v-btn text>Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Cards',

    data: () => ({})
  }
</script>
