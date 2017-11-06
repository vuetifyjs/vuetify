<template>
  <div class="text-xs-center">
    <v-btn
      color="secondary"
      :loading="loading"
      @click.native="loader = 'loading'"
      :disabled="loading"
    >
      Accept Terms
    </v-btn>

    <v-btn
      :loading="loading3"
      @click.native="loader = 'loading3'"
      :disabled="loading3"
      color="blue-grey"
      dark
    >
      Upload
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>

    <v-btn
      color="success"
      :loading="loading2"
      @click.native="loader = 'loading2'"
      :disabled="loading2"
    >
      Custom Loader
      <span slot="loader">Loading...</span>
    </v-btn>

    <v-btn
      color="info"
      :loading="loading4"
      @click.native="loader = 'loading4'"
      :disabled="loading4"
    >
      Icon Loader
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
  </div>
</template>

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

<script>
  export default {
    data () {
      return {
        loader: null,
        loading: false,
        loading2: false,
        loading3: false,
        loading4: false,
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
  }
</script>
