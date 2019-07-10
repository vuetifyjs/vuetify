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

      <core-title>With media (horizontal)</core-title>
      <core-section>
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

      <core-title>Text on media</core-title>
      <core-section center>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </core-section>

      <core-title>Text on media (horizontal)</core-title>
      <core-section>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </core-section>

      <core-title>Horizontal</core-title>
      <core-section>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Unlimited music now</div>
          </v-card-title>
          <v-card-text>
            Listen to your favorite artists and albums whenever and wherever, online and offline.
          </v-card-text>
        </v-card>
      </core-section>

      <core-title>Custom actions</core-title>
      <core-section>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          />

          <v-card-title primary-title>
            <div>
              <div class="headline">Top western road trips</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat>Share</v-btn>
            <v-btn flat color="purple">Explore</v-btn>
            <v-spacer />
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier,
              not with all the bed making you'll be doing. Then we'll go with that data file!
              Hey, you add a one and two zeros to that or we walk!
              You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Cards',

    data: () => ({
      show: false,
    }),
  }
</script>
