---
meta:
  title: Composant Alerte
  description: Le composant v-alert est utilisé pour transmettre des informations à l'utilisateur. Conçues pour se démarquer, les alertes se déclinent en quatre styles contextuels.
  keywords: v-alert, alerts, vue alert component, vuetify alert component
related:
  - /components/buttons/
  - /components/icons/
  - /components/snackbars/
---

# Alertes

The `v-alert` component is used to convey important information to the user through the use of contextual types, icons, and colors. These default types come in 4 variations: **success**, **info**, **warning**, and **error**. Des icônes par défaut sont attribuées qui aident à représenter les différentes actions que chaque type représente. De nombreuses parties d'une alerte telles que `border`, `icon`, et `color` peuvent également être personnalisées pour s'adapter à presque toutes les situations.

<entry-ad />

## Utilisation

Alerts in their simplest form are flat [sheets of paper](/components/sheets) that display a message.

<usage name="v-alert" />

## API

- [v-alert](/api/v-alert)

<inline-api page="components/alerts" />

## Exemples

### Propriétés

#### Border

L'accessoire **border** ajoute une simple bordure à l'un des 4 côtés de l'alerte. This can be combined with props like **color**, **dark**, and **type** to provide unique accents to the alert.

<example file="v-alert/prop-border" />

#### Bordure colorée

L'accessoire **colored-border** supprime l'arrière-plan de l'alerte afin d'accentuer l'accessoire **border**. If a **type** is set, it will use the type's default color. Si aucune **color** ou **type** n'est défini, la couleur sera par défaut la couleur inversée du thème appliqué (noir pour la lumière et blanc / gris pour l'obscurité).

<example file="v-alert/prop-colored-border" />

#### Compact

L'élément **dense** diminue la hauteur de l'alerte pour créer un style simple et compact. When combined with the **border** prop, the border thickness will be decreased to stay consistent with the style.

<example file="v-alert/prop-dense" />

#### Rejetable

L'élément **dismissible** ajoute un bouton de fermeture à la fin du composant d'alerte. Cliquez sur ce bouton pour définir sa valeur sur false et masquer efficacement l'alerte. Vous pouvez restaurer l'alerte en liant **v-model** et en le définissant sur true. L'icône de fermeture a automatiquement un `aria-label` appliqué qui peut être modifié en modifiant le **close-label** prop ou en changeant la valeur de **close** dans vos paramètres régionaux. Pour plus d'informations sur la manière de modifier globalement vos paramètres régionaux, accédez à la [page Internationalisation](/features/internationalization).

<example file="v-alert/prop-dismissible" />

#### Icônes

La propriété **icon** vous permet d'ajouter une icône au début du composant d'alerte. Si un **type** est fourni, cela remplacera l'icône par défaut de ce type d'alerte. Additionally, setting the **icon** prop to _false_ will remove the icon altogether.

<example file="v-alert/prop-icon" />

#### Contour

Le paramètre **outlined** inverse le style d'une alerte, le paramètre hérité **color** s'applique alors au contour et au texte de l'alerte. L'arrière plan, lui, devient transparent.

<example file="v-alert/prop-outlined" />

<discovery-ad />

#### Importante

Le paramètre **prominent** rend une alerte plus grande en augmentant sa hauteur ainsi qu'en ajoutant un cercle qui surligne l'icone. En appliquant, à la fois, le paramètre **prominent** et le paramètre **dense**, l'alerte prendra l'apparence d'une alerte normale mais avec l'effet de **prominent** sur l'icone.

<example file="v-alert/prop-prominent" />

#### Texte

Le paramètre **text** est une simple variante d'une alerte qui réduit l'opacité du paramètre **color** de l'arrière plan. Similar to other styled props, **text** can be combined with other props like **dense**, **prominent**, **outlined**, and **shaped** to create a unique and customized component.

<example file="v-alert/prop-text" />

#### Shaped

The **shaped** prop will add **border-radius**  at the top-left and bottom-right of the alert. Similar to other styled props, **shaped** can be combined with other props like **dense**, **prominent**, **outlined** and **text** to create a unique and customized component

<example file="v-alert/prop-shaped" />

#### Transition

Le paramètre **transition** permet d'appliquer une transition visible quand l'alerte est affichée ou cachée. For more information, you can check out any of [Vuetify's prebuilt transitions](/styles/transitions#motion) or review how to [create your own](/styles/transitions#create-your-own).

<example file="v-alert/prop-transition" />

#### Twitter

By combining **color**, **dismissible**, **border**, **elevation**, **icon**, and **colored-border** props, you can create stylish custom alerts such as this Twitter notification.

<example file="v-alert/misc-twitter" />

#### Type

Le paramètre **type** amène 4 styles par défauts de  `v-alert` : **success**, **info**, **warning**, and **error**. Each of these styles provides a default icon and color. La couleur par défaut peut être configurée globalement en personnalisant [Le thème Vuetify](/features/theme).

<example file="v-alert/prop-type" />

## Accessibilité

<vuetify-ad slug="vs-video-accessibility" />

By default, `v-alert` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert) which denotes that the alert \"is a live region with important and usually time-sensitive information.\" When using the **dismissible** prop, the close icon will receive a corresponding `aria-label`. This value can be modified by changing either the **close-label** prop or globally through customizing the [Internationalization](/features/internationalization)'s default value for the _close_ property.

<backmatter />
