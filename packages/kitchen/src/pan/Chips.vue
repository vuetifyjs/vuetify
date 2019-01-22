<template>
  <v-container text-xs-center>
    <v-layout
      column
      variations
    >
      <main-header>Chips</main-header>

      <core-title>
        Simple
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-chip close>
            Example Chip
          </v-chip>
          <v-chip>Example Chip</v-chip>
          <v-chip close>
            <v-avatar>
              <img
                src="https://randomuser.me/api/portraits/men/35.jpg"
                alt="trevor"
              >
            </v-avatar>
            Trevor Hansen
          </v-chip>
          <v-chip>
            <v-avatar class="teal">
              A
            </v-avatar>
            ANZ Bank
          </v-chip>
        </v-layout>
      </core-section>

      <core-title>
        Colors
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-chip
            color="primary"
            text-color="white"
          >
            Primary
          </v-chip>

          <v-chip
            color="secondary"
            text-color="white"
          >
            Secondary
          </v-chip>

          <v-chip
            color="red"
            text-color="white"
          >
            Colored Chip
          </v-chip>

          <v-chip
            color="green"
            text-color="white"
          >
            Colored Chip
          </v-chip>
        </v-layout>
      </core-section>

      <core-title>
        With icons
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-chip
            color="indigo"
            text-color="white"
          >
            <v-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            Ranee
          </v-chip>

          <v-chip
            color="orange"
            text-color="white"
          >
            Premium
            <v-icon right>
              mdi-star
            </v-icon>
          </v-chip>

          <v-chip
            color="primary"
            text-color="white"
          >
            1 Year
            <v-icon right>
              mdi-cake
            </v-icon>
          </v-chip>

          <v-chip
            color="green"
            text-color="white"
          >
            <v-avatar class="green darken-4">
              1
            </v-avatar>
            Years
          </v-chip>

          <v-chip
            close
            color="teal"
            text-color="white"
          >
            <v-avatar>
              <v-icon>mdi-check-circle</v-icon>
            </v-avatar>
            Confirmed
          </v-chip>
        </v-layout>
      </core-section>

      <core-title>
        Outline
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-chip
            outline
            color="secondary"
          >
            Outline
          </v-chip>

          <v-chip
            outline
            color="primary"
          >
            Colored
          </v-chip>

          <v-chip
            outline
            color="red"
          >
            <v-icon left>
              mdi-wrench
            </v-icon>Icon
          </v-chip>
        </v-layout>
      </core-section>

      <core-title>
        Labels
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-chip label>
            Label
          </v-chip>

          <v-chip
            label
            color="pink"
            text-color="white"
          >
            <v-icon left>
              mdi-label
            </v-icon>Tags
          </v-chip>

          <v-chip
            label
            outline
            color="red"
          >
            Outline
          </v-chip>
        </v-layout>
      </core-section>

      <core-title>
        Closable
      </core-title>
      <core-section>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <div class="text-xs-center">
            <v-btn
              v-if="!chip1 && !chip2 && !chip3 && !chip4"
              color="primary"
              dark
              @click="chip1 = true, chip2 = true, chip3 = true, chip4= true"
            >
              Reset Chips
            </v-btn>
          </div>

          <v-chip
            v-model="chip1"
            close
          >
            Closable
          </v-chip>

          <v-chip
            v-model="chip2"
            close
            color="red"
            text-color="white"
          >
            Remove
          </v-chip>

          <v-chip
            v-model="chip3"
            close
            color="green"
            outline
          >
            Success
          </v-chip>

          <v-chip
            v-model="chip4"
            close
            color="orange"
            label
            outline
          >
            Complete
          </v-chip>
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Chips',

    data: () => ({
      chip1: true,
      chip2: true,
      chip3: true,
      chip4: true
    })
  }
</script>
