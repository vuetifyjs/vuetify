# Views
> Create views (pages) here

Views that utilize proprietary components—ones that only exist within or for that page—should keep them _scoped_ to the container view.

```bash
.
└── views
    └── home
        ├── Index.vue
        ├── Section.vue
        └── components
            ├── CustomComponent.vue
            └── CustomComponentTwo.vue
```

**Example usage**
This is an example of what importing a custom component for a **View** might look like.
```vue
<!-- src/views/home/Index.vue -->
<template>
  <div>
    <custom-component />

    <custom-component-two />
  </div>
</template>

<script>
  export default {
    components: {
      CustomComponent: () => import('./components/CustomComponent'),
      CustomComponentTwo: () => import('./components/CustomComponentTwo'),
    }
  }
</script>
```
