<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    theme="dark"
    max-width="400"
  >
    <v-card-title>
      <v-icon
        size="large"
        left
        icon="mdi-twitter"
      ></v-icon>
      <span class="text-h6 font-weight-light">Twitter</span>
    </v-card-title>

    <v-card-text class="text-h5">
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <v-list-item-avatar left>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </v-list-item-avatar>

        <v-list-item-header>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-header>

        <div class="d-flex justify-end">
          <v-icon class="mr-1" icon="mdi-heart"></v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1" icon="mdi-share-variant"></v-icon>
          <span class="subheading">45</span>
        </div>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
  }
</script>
