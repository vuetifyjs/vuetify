---
nav: App bars
meta:
  title: App-bar component
  description: The app bar component is a supercharged toolbar with advanced scrolling techniques and application layout support.
  keywords: app bars, vuetify app bar component, vue app bar component
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
---

# App bars

The `v-app-bar` component is pivotal to any graphical user interface (GUI), as it generally is the primary source of site navigation. The app-bar component works great in conjunction with a [v-navigation-drawer](/components/navigation-drawers) for providing site navigation in your application.

![App Bar Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-app-bar/v-app-bar-entry.png)

---

## Usage

The `v-app-bar` component is used for application-wide actions and information.

<usage name="v-app-bar" />

<entry />

## Anatomy

The recommended placement of elements inside of `v-app-bar` is:

* Place `v-app-bar-nav-icon` or other navigation items on the far left
* Place `v-app-bar-title` to the right of navigation
* Place contextual actions to the right of navigation
* Place overflow actions to the far right

![App Bar Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-app-bar/v-app-bar-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The App Bar container holds all `v-app-bar` components |
| 2. App Bar Icon (optional) | A styled icon button component created that is often used to control the state of a `v-navigation drawer` |
| 3. Title (optional) | A heading with increased **font-size** |
| 4. Action items (optional) | Used to highlight certain actions not in the overflow menu |
| 5. Overflow menu (optional) | Place less often used action items into a hidden menu |

## API

| Component | Description |
| - | - |
| [v-app-bar](/api/v-app-bar/) | Primary Component |
| [v-app-bar-nav-icon](/api/v-app-bar-nav-icon/) | A customized [v-btn](/components/buttons/) component that uses a default *icon* value of **$menu** |
| [v-app-bar-title](/api/v-app-bar-title/) | An extension of `v-toolbar-title` that is used for scrolling techniques |

<api-inline hide-links />

<alert type="warning">

  When a `v-btn` with the `icon` prop is used inside of `v-toolbar` and `v-app-bar` they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification. If you choose to wrap your buttons in any container, such as a `div`, you will need to apply negative margin to that container in order to properly align them.

</alert>

## Examples

### Props

<!-- #### Collapsible bars

With the **collapse** and **collapse-on-scroll** props you can easily control the state of toolbar that the user interacts with.

<example file="v-app-bar/prop-collapse" /> -->

#### Density

You can make **app-bar** dense. A dense app bar has lower height than regular one.

<example file="v-app-bar/prop-density" />

<!-- #### Elevate on scroll

When using the **elevate-on-scroll** prop, the `v-app-bar` will rest at an elevation of 0dp until the user begins to scroll down. Once scrolling, the bar raises to 4dp.

<example file="v-app-bar/prop-elevate-on-scroll" />

#### Fade image on scroll

The background image of a `v-app-bar` can fade on scroll. Use the `fade-img-on-scroll` property for this.

<example file="v-app-bar/prop-img-fade" />

#### Hiding on scroll

`v-app-bar` can be hidden on scroll. Use the `hide-on-scroll` property for this.

<example file="v-app-bar/prop-hide" /> -->

#### Images

`v-app-bar` can contain background images. You can set source via the `image` prop. If you need to customize the `v-img` properties, the app-bar provides you with an **image** slot.

<example file="v-app-bar/prop-image" />

<!-- #### Inverted scrolling

When using the **inverted-scroll** property, the bar will hide until the user scrolls past the designated threshold. Once past the threshold, the `v-app-bar` will continue to display until the users scrolls up past the threshold. If no **scroll-threshold** value is supplied a default value of _0_ will be used.

<example file="v-app-bar/prop-inverted-scroll" /> -->

#### Prominent

An `v-app-bar` with the `density="prominent"` prop can opt to have its height shrunk as the user scrolls down. This provides a smooth transition to taking up less visual space when the user is scrolling through content. Shrink height has 2 possible options, **compact** (48px) and **comfortable** (56px) sizes.

<example file="v-app-bar/prop-prominent" />
