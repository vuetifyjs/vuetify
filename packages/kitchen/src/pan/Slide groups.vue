<template>
  <v-container>
    <v-layout column>
      <main-header>Slide groups</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group>
            <v-slide-item
              v-for="n in 25"
              :key="n"
              #default="{ active, toggle }"
            >
              <v-btn
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </core-section>

      <core-title>Multiple</core-title>
      <core-section>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group multiple>
            <v-slide-item
              v-for="n in 25"
              :key="n"
              #default="{ active, toggle }"
            >
              <v-btn
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </core-section>

      <core-title>Append & prepend icons</core-title>
      <core-section>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group
            multiple
            prepend-icon="mdi-arrow-left"
            append-icon="mdi-arrow-right"
          >
            <v-slide-item
              v-for="n in 25"
              :key="n"
              #default="{ active, toggle }"
            >
              <v-btn
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </core-section>

      <core-title>Active class</core-title>
      <core-section>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group
            multiple
            active-class="success"
          >
            <v-slide-item
              v-for="n in 25"
              :key="n"
              #default="{ toggle }"
            >
              <v-btn
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </core-section>

      <core-title>Show arrows</core-title>
      <core-section>
        <v-sheet
          class="mx-auto"
          max-width="700"
        >
          <v-slide-group
            multiple
            show-arrows
          >
            <v-slide-item
              v-for="n in 25"
              :key="n"
              #default="{ active, toggle }"
            >
              <v-btn
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                @click="toggle"
              >
                Options {{ n }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </core-section>

      <core-title>Centered active tab</core-title>
      <core-section>
        <v-slide-group
          center-active
        >
          <v-slide-item
            v-for="n in 25"
            :key="n"
            #default="{ toggle }"
          >
            <v-btn
              depressed
              rounded
              @click="toggle"
            >
              Options {{ n }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'SlideGroups',

    data: () => ({})
  }
</script>
