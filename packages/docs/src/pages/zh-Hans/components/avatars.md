---
meta:
  title: Avatar 头像
  description: Avatar组件用于控制图像的大小和边框半径。 它可以与众多组件一起使用，提供更好的视觉环境。
  keywords: 头像，vuetify 头像组件，vue 头像组件
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# Avatars（头像）

`v-avatar` 组件通常用于显示循环用户个人资料图片。 此组件将允许您动态尺寸并添加响应图像、图标和文字的边框半径。 ** tile ** 变量可用来显示无边框半径的头像。

<entry-ad />

## 使用

头像以最简单的形式在圆形容器中显示内容。

<usage name="v-avatar" />

## API

- [v-avatar](/api/v-avatar)

<inline-api page="components/avatars" />

### 属性

#### 尺寸

头像组件中的`size`属性允许用户设置`v-avatar`的高度和宽度。 这个 prop 以1比1 的纵横比均匀进行缩放。 如果在使用`size`属性时一并使用`height`（高度）和`width`（宽度）属性，将会覆盖`size`属性。

<example file="v-avatar/prop-size" />

#### 方块

如果使用`tile`属性，avatar组件将不会有边界半径。代表说这个头像将是方方正正；没有圆角的。

<example file="v-avatar/prop-tile" />

### 插槽

#### 默认值

`v-avatar`的默认插槽可以配合`v-icon`（图标）组件、图片或文字一起使用。 将这些 props 与其他 props 混合搭配，创造出独一无二的东西。

<example file="v-avatar/slot-default" />

<discovery-ad />

### 其他

#### 高级用法

将头像与其他组件组合在一起，你就可以构建漂亮的用户界面。

<example file="v-avatar/misc-advanced" />

另一个例子是将头像和菜单结合起来。

<example file="v-avatar/misc-avatar-menu" />

#### 个人名片

使用 <strong x-id=“1”> tile </strong> prop，我们可以创建一个光滑硬衬的个人资料卡。

<example file="v-avatar/misc-profile-card" />

<backmatter />
