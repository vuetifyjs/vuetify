<template>
  <div>
    <v-alert
      prominent
      type="error"
    >
      <template v-slot:text>
        Nunc nonummy metus. Nunc interdum lacus sit amet orci Nullam dictum felis eu pede.
      </template>

      <template v-slot:append>
        <v-btn size="small" variant="text">Take action</v-btn>
      </template>
    </v-alert>

    <br>

    <v-alert
      color="blue-grey-darken-2"
      density="compact"
      icon="mdi-school"
      prominent
    >
      Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Aenean ut eros et nisl sagittis vestibulum. Sed aliquam ultrices mauris. Donec vitae orci sed dolor rutrum auctor.
    </v-alert>

    <br>

    <v-alert
      icon="mdi-shield-lock-outline"
      prominent
      type="info"
    >
      Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Sed in libero ut nibh placerat accumsan.. Curabitur blandit mollis lacus. Curabitur blandit mollis lacus.
    </v-alert>
  </div>
</template>
