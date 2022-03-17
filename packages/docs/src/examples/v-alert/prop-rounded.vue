<template>
  <div>
    <v-alert
      rounded="0"
      type="info"
      title="Info"
    >
      I'm an alert with no rounded borders. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur recusandae, est itaque laboriosam amet officia? Officia repellat provident sed est adipisci voluptatibus, voluptas reprehenderit dicta voluptatum, optio enim, placeat nostrum.
    </v-alert>

    <br>

    <v-alert
      rounded="xl"
      variant="outlined"
      title="Success"
      type="success"
    >
      I'm an alert with extra large rounded borders. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim cumque vel sapiente suscipit officia ullam quam possimus provident id neque, cupiditate fuga animi expedita, beatae ipsam in veniam inventore totam.
    </v-alert>

    <br>

    <v-alert
      title="Warning"
      rounded="pill"
      type="warning"
      prominent
    >
      I'm an alert with pill rounded borders. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ex excepturi ea odio cum libero animi vitae repellat fuga velit explicabo quae, ducimus.
    </v-alert>

    <br>

    <v-alert
      title="Error"
      prominent
      rounded="t-xl b-lg"
      type="error"
    >
      I'm an alert with top and bottom borders. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum esse quis eius delectus odio repellat voluptates ullam doloribus eaque dignissimos
    </v-alert>
  </div>
</template>
