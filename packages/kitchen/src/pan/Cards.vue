<template>
  <v-container>
    <v-layout column>
      <main-header>Cards</main-header>

      <core-title>Simple</core-title>
      <core-section center>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Unlimited music now</div>
          </v-card-title>
          <v-card-text>
            Listen to your favorite artists and albums whenever and wherever, online and offline.
          </v-card-text>
        </v-card>
      </core-section>

      <core-title>With media</core-title>
      <core-section center>
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
      </core-section>

      <core-title>Actions</core-title>
      <core-section center>
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
      </core-section>

      <core-title>Colors</core-title>
      <core-section>
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
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Cards',

    data: () => ({})
  }
</script>
