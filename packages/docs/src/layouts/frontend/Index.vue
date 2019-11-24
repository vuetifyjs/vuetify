<template>
  <div>
    <core-system-bar />

    <frontend-app-bar />

    <frontend-view />

    <frontend-footer />
  </div>
</template>

<script>
  export default {
    name: 'LayoutsFrontend',

    components: {
      FrontendAppBar: () => import('./AppBar'),
      FrontendFooter: () => import('./Footer'),
      FrontendView: () => import('./View'),
    },
  }
</script>
