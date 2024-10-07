---
meta:
  title: Parallax component
  description: The parallax component creates a 3d effect that makes an image appear to scroll slower than the window.
  keywords: parallax, vuetify parallax component, vue parallax component
related:
  - /components/aspect-ratios/
  - /components/cards/
  - /components/images/
---

# Parallaxe

The `v-parallax` component creates a 3d effect that makes an image appear to scroll slower than the window.

<entry-ad />

## Utilisation

Une parallaxe provoque un déplacement d'une image de fond lorsque l'utilisateur fait défiler la page.

<example file="v-parallax/usage" />

## API

- [v-parallax](/api/v-parallax)

<inline-api page="components/parallax" />

## Exemples

### Divers

#### Contenu

You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.

<example file="v-parallax/misc-content" />

#### Custom height

You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly

<example file="v-parallax/misc-custom-height" />

<backmatter />
