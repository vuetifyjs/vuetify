<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Simple images
      </h3>
      <v-flex>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom aspect ratio
      </h3>
      <v-flex>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1.5"
            class="grey lighten-2"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        With custom placeholder
      </h3>
      <v-flex>
        <v-layout>
          <v-img
            v-for="n in 3"
            :key="n"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="grey lighten-2"
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
      </v-flex>
    </v-layout>

    <h3 class="title grey--text mb-4 mt-5 center">
      Contain
    </h3>
    <v-flex>
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
    </v-flex>

    <h3 class="title grey--text mb-4 mt-5 center">
      Gradient
    </h3>
    <v-flex>
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
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'Images',

  data: () => ({})
}
</script>

<style scoped>
.center {
  align-self: center;
}

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
