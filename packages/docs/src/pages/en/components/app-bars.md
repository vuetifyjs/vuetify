---
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

<entry-ad />

## Usage

The `v-app-bar` component is used for application-wide actions and information.

<usage name="v-app-bar" />

## API

- [v-app-bar](/api/v-app-bar)
- [v-app-bar-nav-icon](/api/v-app-bar-nav-icon)

## Sub-components

### v-app-bar-nav-icon

A styled icon button component created specifically for use with [v-toolbar](/components/toolbars) and `v-app-bar`. Typically seen on the left side of a toolbar as a hamburger menu, it is often used to control the state of a navigation drawer. The `default` slot can be used to customize the icon and function of this component. This is a **functional** component.

## Caveats

<alert type="warning">

  When a `v-btn` with the `icon` prop is used inside of `v-toolbar` and `v-app-bar` they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification. If you choose to wrap your buttons in any container, such as a `div`, you will need to apply negative margin to that container in order to properly align them.

</alert>

## Examples

### Props

#### Collapsible bars

With the **collapse** and **collapse-on-scroll** props you can easily control the state of toolbar that the user interacts with.

<example file="v-app-bar/prop-collapse" />

#### Dense

You can make **app-bar** dense. A dense app bar has lower height than regular one.

<example file="v-app-bar/prop-dense" />

#### Elevate on scroll

When using the **elevate-on-scroll** prop, the `v-app-bar` will rest at an elevation of 0dp until the user begins to scroll down. Once scrolling, the bar raises to 4dp.

<example file="v-app-bar/prop-elevate-on-scroll" />

#### Fade image on scroll

The background image of a `v-app-bar` can fade on scroll. Use the `fade-img-on-scroll` property for this.

<example file="v-app-bar/prop-img-fade" />

#### Hiding on scroll

`v-app-bar` can be hidden on scroll. Use the `hide-on-scroll` property for this.

<example file="v-app-bar/prop-hide" />

#### Images

`v-app-bar` can contain background images. You can set source via the `src` prop. If you need to customize the `v-img` properties, the app-bar provides you with an **img** slot.

<example file="v-app-bar/prop-img" />

#### Inverted scrolling

When using the **inverted-scroll** property, the bar will hide until the user scrolls past the designated threshold. Once past the threshold, the `v-app-bar` will continue to display until the users scrolls up past the threshold. If no **scroll-threshold** value is supplied a default value of _0_ will be used.

<example file="v-app-bar/prop-inverted-scroll" />

#### Prominent

An `v-app-bar` with the `prominent` prop can opt to have its height shrunk as the user scrolls down. This provides a smooth transition to taking up less visual space when the user is scrolling through content. Shrink height has 2 possible options, **dense** (48px) and **short** (56px) sizes.

<example file="v-app-bar/prop-prominent" />

#### Scroll threshold

`v-app-bar` can have scroll threshold. It will start reacting to scroll only after defined via `scroll-threshold` property amount of pixels.

<example file="v-app-bar/prop-scroll-threshold" />

### Misc

#### Menu

You can easily extend the functionality of app bar by adding `VMenu` there. Click on last icon to see it in action.

<example file="v-app-bar/misc-menu" />

#### Toggle navigation drawers

Using the functional component `v-app-bar-nav-icon` you can toggle the state of other components such as a [v-navigation-drawer](/components/navigation-drawers).

<example file="v-app-bar/misc-app-bar-nav" />

<backmatter />
