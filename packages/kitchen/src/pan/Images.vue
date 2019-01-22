<template>
  <v-container>
    <v-layout column>
      <main-header>Images</main-header>

      <core-title>
        Simple images
      </core-title>
      <core-section>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2 ma-2"
          />
        </v-layout>
      </core-section>

      <core-title>
        Custom aspect ratio
      </core-title>
      <core-section>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1.5"
            class="grey lighten-2 ma-2"
          />
        </v-layout>
      </core-section>

      <core-title>
        With custom placeholder
      </core-title>
      <core-section>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2 ma-2"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-layout>
          </v-img>
        </v-layout>
      </core-section>

      <core-title>
        Contain
      </core-title>
      <core-section>
        <v-layout>
          <v-flex>
            <div class="subheading">
              Matching
            </div>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.7"
              contain
            />
          </v-flex>
          <v-flex>
            <div class="subheading">
              Too high
            </div>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="2"
              contain
            />
          </v-flex>
          <v-flex>
            <div class="subheading">
              Too low
            </div>
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.4"
              contain
            />
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Gradient
      </core-title>
      <core-section>
        <v-layout>
          <v-flex>
            <v-img
              src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            />
          </v-flex>

          <v-flex>
            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
              <div class="fill-height bottom-gradient" />
            </v-img>
          </v-flex>

          <v-flex>
            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
              <div class="fill-height repeating-gradient" />
            </v-img>
          </v-flex>
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Images',

    data: () => ({})
  }
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
  background-image: repeating-linear-gradient(-45deg,
                      rgba(255,0,0,.25),
                      rgba(255,0,0,.25) 5px,
                      rgba(0,0,255,.25) 5px,
                      rgba(0,0,255,.25) 10px
                    );
}
</style>
