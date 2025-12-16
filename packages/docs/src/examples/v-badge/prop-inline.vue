<template>
  <v-list
    class="mx-auto"
    max-width="256"
    border
  >
    <v-list-item
      prepend-icon="mdi-inbox-arrow-down"
      title="Inbox"
      link
    >
      <template v-slot:append>
        <v-badge
          color="error"
          content="6"
          inline
        ></v-badge>
      </template>
    </v-list-item>

    <v-list-item
      prepend-icon="mdi-send"
      title="Sent Mail"
      link
    ></v-list-item>

    <v-list-item
      prepend-icon="mdi-delete"
      title="Trash"
      link
    >
      <template v-slot:append>
        <v-badge
          color="info"
          content="12"
          inline
        ></v-badge>
      </template>
    </v-list-item>

    <v-list-item
      prepend-icon="mdi-alert-circle"
      title="Spam"
      link
    ></v-list-item>
  </v-list>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2239-83228&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>