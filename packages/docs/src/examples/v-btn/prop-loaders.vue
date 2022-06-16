<template>
  <div class="d-flex justify-center align-baseline" style="gap: 1rem">
    <v-btn
      :loading="loading[1]"
      :disabled="loading[1]"
      color="secondary"
      @click="load(1)"
    >
      Accept Terms
    </v-btn>

    <v-btn
      :loading="loading[2]"
      :disabled="loading[2]"
      color="blue-grey"
      prepend-icon="mdi-cloud-upload"
      @click="load(2)"
    >
      Upload
    </v-btn>

    <v-btn
      :loading="loading[3]"
      :disabled="loading[3]"
      color="info"
      @click="load(3)"
    >
      Custom Loader
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template>
    </v-btn>

    <v-btn
      :loading="loading[4]"
      :disabled="loading[4]"
      color="blue-grey"
      icon="mdi-cloud-upload"
      @click="load(4)"
    ></v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: [],
      }
    },
    methods: {
      load (i) {
        this.loading[i] = true
        setTimeout(() => (this.loading[i] = false), 3000)
      },
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
