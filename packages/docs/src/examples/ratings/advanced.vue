<template>
  <v-card
    class="mx-auto hide-overflow"
    style="max-width: 600px;"
  >
    <v-layout>
      <v-flex xs6 d-flex>
        <v-img
          src="https://cdn.vuetifyjs.com/images/ratings/fortnite1.png"
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <v-container
          grid-list-md
          pa-0
          pl-2
          style="margin: -4px 0"
        >
          <v-layout wrap>
            <v-flex xs7 d-flex>
              <v-img
                src="https://cdn.vuetifyjs.com/images/ratings/fortnite2.png"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                src="https://cdn.vuetifyjs.com/images/ratings/fortnite3.png"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                src="https://cdn.vuetifyjs.com/images/ratings/fortnite4.png"
              ></v-img>
            </v-flex>
            <v-flex xs7 d-flex>
              <v-img
                src="https://cdn.vuetifyjs.com/images/ratings/fortnite5.png"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-card-title class="align-start">
      <div>
        <span class="headline">FORTNITE</span>
        <div class="grey--text font-weight-light">Video game</div>
      </div>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        width="400"
      >
        <v-icon slot="activator">
          mdi-share-variant
        </v-icon>
        <v-card>
          <v-card-title>
            <span class="title font-weight-bold">Share</span>
            <v-spacer></v-spacer>
            <v-btn
              class="mx-0"
              icon
              @click="dialog = false"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="indigo">mdi-facebook-box</v-icon>
              </v-list-tile-action>
              <v-card-title>Facebook</v-card-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon color="cyan">mdi-twitter-box</v-icon>
              </v-list-tile-action>
              <v-card-title>Twitter</v-card-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>mdi-email</v-icon>
              </v-list-tile-action>
              <v-card-title>Email</v-card-title>
            </v-list-tile>
          </v-list>
          <v-text-field
            ref="link"
            :label="copied ? 'Link copied' : 'Click to copy link'"
            class="pa-3"
            readonly
            value="https://g.co/kgs/nkrK43"
            @click="copy"
          ></v-text-field>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <span class="pl-2 grey--text text--darken-2 font-weight-light caption">16,544 reviews</span>
      <v-spacer></v-spacer>
      <v-rating
        v-model="rating"
        length="10"
        readonly
      >
        <v-icon
          slot="item"
          slot-scope="props"
          :color="props.isFilled ? 'purple darken-4' : ''"
          v-text="`mdi-numeric-${props.index}-box`"
        ></v-icon>
      </v-rating>
    </v-card-actions>
    <div class="pa-3 pt-0 caption">
      <em>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.</em>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      copied: false,
      dialog: false,
      rating: 10
    }),

    methods: {
      copy () {
        const markup = this.$refs.link
        markup.focus()
        document.execCommand('selectAll', false, null)
        this.copied = document.execCommand('copy')
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
