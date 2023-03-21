<template>
  <div class="d-flex justify-space-around align-center flex-column flex-md-row fill-height">
    <v-badge
      bordered
      color="error"
      icon="mdi-lock"
    >
      <v-btn
        color="error"
        variant="flat"
      >
        Lock Account
      </v-btn>
    </v-badge>

    <v-badge
      bordered
      location="bottom end"
      color="deep-purple-accent-4"
      dot
      offset-x="2"
      offset-y="4"
    >
      <v-avatar size="large">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
    </v-badge>

    <div class="mx-3"></div>

    <v-badge
      bordered
    >
      <template v-slot:badge>
        <v-avatar size="x-small">
          <v-img src="https://cdn.vuetifyjs.com/images/logos/v.png"></v-img>
        </v-avatar>
      </template>

      <v-avatar size="large">
        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
      </v-avatar>
    </v-badge>
  </div>
</template>
