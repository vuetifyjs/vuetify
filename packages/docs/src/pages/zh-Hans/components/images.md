---
meta:
  title: Image 图像
  description: 图像组件提供一个灵活的接口，用于显示不同类型的图像。
  keywords: 图像，vuetify 图像组件，vue 图像组件
related:
  - /components/grids/
  - /components/aspect-ratios/
  - /components/parallax/
---

# Images（图像）

`v-img`组件包含支持富媒体的功能。 结合 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader), 你可以添加动态的渐进图像来提供更好的用户体验。

<entry-ad />

## 使用

`v-img`组件用于显示具有延迟加载和占位符的响应图像。

<usage name="v-img" />

## API

- [v-img](/api/v-img)

<inline-api page="components/images" />

## 注意

<alert type="info">

  `v-img` 组件使用 [v-intersect](/directives/intersecut) 指令，IE11 和 Safari需要 [Polyfill](/directives/intersect#polyfill)。 如果检测到浏览器不支持此功能, 图像仍将以正常方式加载。

</alert>

## 示例

### 属性

#### 宽高比

如果你想改变图像的长宽比，你可以设置一个固定的宽高比。

<example file="v-img/prop-aspect-ratio" />

#### 包含

If the provided aspect ratio doesn't match that of the actual image, the default behavior is to fill as much space as possible, clipping the sides of the image. Enabling the `contain` prop will prevent this, but will result in empty space at the sides.

<example file="v-img/prop-contain" />

#### 渐变

The `gradient` prop can be used to apply a simple gradient overlay to the image. More complex gradients should be written as a class on the content slot instead.

<example file="v-img/prop-gradient" />

#### 高度

`v-img` 组件会自动地缩放它的 `src`，并且保留它的长宽比/ 你可以通过修改 `height` 和 `max-height` 属性来限制它。

<example file="v-img/prop-max-height" />

### 插槽

#### 占位符

`v-img` has a special `placeholder` slot for placeholder to display while image's loading. Note: the example below has bad src which won't load for you to see placeholder.

<example file="v-img/slot-placeholder" />

### 其他

#### 栅格

您可以使用 `v-img` 来展示图片库。

<example file="v-img/misc-grid" />

<backmatter />
