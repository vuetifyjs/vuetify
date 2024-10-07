---
meta:
  title: 响应式显示
  description: 使用 Vuetify 断点服务访问显示视图信息。
  keywords: 断点，网格断点
related:
  - /directives/resize/
  - /styles/display/
  - /styles/text-and-typography/
---

# 响应式显示

使用 Vuetify，您可以根据窗口大小控制应用程序的各个方面。 此功能与 [网格系统 (grids)](/components/grids/) 和其它辅助类 (如 [display](/styles/display/)) 一起生效。

<entry-ad />

<breakpoints-table />

## 断点服务

**断点服务** 是访问组件内的视图信息的一个编程方法。 它暴露了 `$vuetify`对象上的一些属性，这些属性可用于根据视口大小控制应用程序的各个方面。 `name` 属性与当前活动的断点相关；例如： *xs, sm, md, lg, xl*。

在下面的代码片段中, 我们使用切换语句和当前断点名称来修改 [v-card](/components/cards/) 组件的 **height** 属性：

```html
<!-- Vue Component -->

<template>
  <v-card :height="height">
    ...
  </v-card>
</template>

<script>
  export default {
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
        }
      },
    },
  }
</script>
```

## 使用

让我们尝试一个真实的例子，其中包含一个`v-dialog`组件，您想将其转换为移动设备上的全屏对话框。 要跟踪这一点，我们需要确定屏幕的大小与我们正在比较的值的相对大小。 在下面的代码片段中，我们使用` mounted `和`beforeDestroy`生命周期钩子将`resize`侦听器绑定到窗口。

```html
<!-- Vue Component -->

<script>
  export default {
    data: () => ({ isMobile: false }),

    beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 600
      },
    },
  }
</script>
```

即使选择使用 [v-resize](/directives/resize/) 指令，也需要多余的模板。 取而代之的是，让我们访问 `$vuetify. breakpoint ` 对象的 ** mobile ** 属性。 这将返回布尔值 `true` 或 `false`，具体取决于当前视口是否大于或小于<strong x-id=“1”>mobile-breakpoint</strong>选项。

```html
<!-- Vue Component -->

<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile">
    ...
  </v-dialog>
</template>
```

断点服务是 _动态的_ 并且当Vuetify **初始化** 启动和调整视图大小时更新。

### 断点服务对象

以下是断点服务的公共签名：

```ts
{
  // 断点
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean

  // 条件
  xsOnly: boolean
  smOnly: boolean
  smAndDown: boolean
  smAndUp: boolean
  mdOnly: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgOnly: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xlOnly: boolean

  // 如果屏幕宽度 < mobileBreakpoint 时为 true
  mobile: boolean
  mobileBreakpoint: number

  // 当前断点的名称 (例如. 'md')
  name: string

  // 尺寸
  height: number
  width: number

  // 阈值
  // 可通过选项配置
  {
    xs: number
    sm: number
    md: number
    lg: number
  }

  // 滚动条
  scrollBarWidth: number
}
```

通过 `$vuetify.breakpoint.<property>` 来访问Vue 文件中的这些属性。; 其中 `<property>` 对应于  [断点服务](#breakpoint-service-object) 对象中列出的值。 在下面的代码段中，当组件触发挂载生命周期钩子时，我们将当前视图宽度记录到控制台：

```html
<!-- Vue Component -->

<script>
  export default {
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
    }
  }
</script>
```

`$vuetify` 对象支持SSR (服务端渲染)，包括诸如NUXT等平台 断点服务检测高度和宽度为 **0**。 这将初始断点大小设置为<strong x-id=“1”>xs</strong>并且在某些情况下，当客户端在NUXT中时，会导致布局处于替换为 _snap_ 。 在下一节中，我们将演示如何在Vue组件的模板和脚本标记中使用`boolean`断点值。

### 断点条件

断点和条件值返回一个从当前视口大小获取的 `boolean` 值。 此外，断点服务模仿 [Vuetify Grid](/components/grids) 命名约定，并可以访问如`xlOnly`、`xsOnly`、`mdAndDown`等属性。 在下面的示例中，我们将`v-sheet`的最小高度更改为<strong x-id=“1”>300</strong>，在超小屏幕上只显示圆角：

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="$vuetify.breakpoint.xs ? 300 : '20vh'"
    :rounded="$vuetify.breakpoint.xsOnly"
  >
    ...
  </v-sheet>
</template>
```

这些*条件值*启用了响应功能，以便对默认情况下或根本不支持响应的Vuetify功能。 在下一节中，我们将定制 _JavaScript和CSS_ 中使用的 **默认** 断点值。

### Mobile断点

<alert type="info">

  **v2.3.0+ 新增**

</alert>

`mobileBreakpoint` 选项接受断点名称 (*xs, sm, md, lg, xl*) 作为有效的配置选项。 一旦设置，提供的值会被传播到支持的组件，如 [v-navigation-drawer](/components/navigation-drawers/)。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm' // 这个值等于960
  },
})
```

单个组件可以使用 `mobile-breakpoint` 属性重写它继承的 **默认** 值。 在下面的示例中，当视口大小小于 _1024px_ 时，我们强制 `v-banner` 进入<em x-id=“3”> mobile状态</em>：

```html
<template>
  <v-banner mobile-breakpoint="1024">
    ...
  </v-banner>
</template>
```

在下一节中，我们将探讨如何自定义决定大小分段的阈值。

### 阈值

<alert type="warning">

  本节修改`$grid-breakpoints` SASS 变量。 有关设置的更多信息，请访问[SASS variables]（/features/SASS variables/）页面。

</alert>

` thresholds ` 选项修改用于视图计算的值。 以下代码片段覆盖 *xs* 至 *lg* 的断点并增加 `scrollBarWidth` 为 _24_。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
})
```

您可能会注意到，断点服务中没有 `xl` 属性，这是有意的。 Viewport 计算总是从 _0_ 开始然后向上工作。 `xs` 阈值的值为 _340_ 意味着窗口大小为 _0 到 340_ 被认为是一个 *超小的* 屏幕。

要将这些更改传播到 *css辅助类* ，我们需要使用我们的新值更新 `$grid-breakpoints` SASS变量。 在 **大的和超大的** 屏幕上，我们从定义的断点中 *减去* 浏览器滚动条的宽度。

```scss
// styles/variables.scss

$grid-breakpoints: (
  'xs': 0,
  'sm': 340px,
  'md': 540px,
  'lg': 800px - 24px,
  'xl': 1280px - 24px
);
```

<backmatter />
