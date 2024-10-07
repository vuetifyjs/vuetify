---
meta:
  title: 边框半径样式
  description: 使用边框半径辅助样式对元素快速应用`border-radius`样式
  keywords: 边框半径类，半径通用类，vuetify 半径辅助类
related:
  - /styles/text-and-typography/
  - /components/sheets/
  - /components/buttons/
---

# 边框半径

使用边框半径辅助样式对元素快速应用`border-radius`样式

<entry-ad />

## 使用

<example file="border-radius/usage" />

## 注意事项

<alert type="info">

  The infixes **sm**, **lg**, **xl**, and **xxl** correlate to the border radius *size* and are not affected by breakpoints.

</alert>

## SASS 变量

配置或禁用边框半径辅助类。 需要使用 [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) 库和一个已配置的 `variables.s(c|)ss` 文件。 有关如何配置变量的其他信息位于<a href=“/features/sass variables”>sass 变量</a>文档页。

基于`$border-radius-root`变量的四舍五入尺寸，该变量的默认值为<strong x-id=“1”>0.25rem</strong>。

```scss
$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 4,
  'xxl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);
```

### 覆盖半径

您可以通过在项目的` variables `文件中添加名为`$rounded`的列表来更改或添加*border-radius*大小。

```scss
$rounded: (
  'sm': $border-radius-root / 3,
  'lg': $border-radius-root * 2
);
```

## 示例

### 其他

#### 药丸和圆形

您可以使用 `.rounded-pill` 类创建药丸，并使用 `.rounded-circle ` 类来创建圆形。

<example file="border-radius/misc-pill-and-circle" />

#### 移除边框半径

使用 `.rounded-0` 辅助类来 *移除* 元素所有的半径或按边角选择的半径; 例如. `.rounded-l-0` 和 `.rounded-tr-0`.

<example file="border-radius/misc-removing-border-radius" />

#### 设置所有角的半径

通过 **rounded** 辅助类允许您修改元素的 *边框半径*. Use the `.rounded-sm`, `.rounded`, `.rounded-lg`, `.rounded-xl` and `.rounded-xxl` to add a border radius of varying size.

<example file="border-radius/misc-rounding-all-corners" />

#### 通过边设置半径

边框半径可以通过使用 **t, r, b, l** 内置类在每条边上配置; 例如. `.rounded-b-xl` 和 `.rounded-t`.

<example file="border-radius/misc-rounding-by-side" />

#### 通过角设置半径

边框半径可以通过使用  **tl, tr, br, bl** 内置类在每个角上配置; 例如.  `.rounded-br-xl` 和 `.rounded-tr`.

<example file="border-radius/misc-rounding-by-corner" />

<backmatter />
