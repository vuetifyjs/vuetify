<template>
  <div>
    <v-alert
      color="purple"
      variant="outlined"
    >
      <template v-slot:title>
        Outlined Alert
      </template>

      Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
    </v-alert>

    <br>

    <v-alert
      type="success"
      variant="outlined"
    >
      Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula laoreet iaculis. Vestibulum ullamcorper mauris at ligula.
    </v-alert>

    <br>

    <v-alert
      border="top"
      type="warning"
      variant="outlined"
      prominent
    >
      Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor.
    </v-alert>
  </div>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2747-66101&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>