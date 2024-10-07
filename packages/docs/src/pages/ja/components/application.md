---
meta:
  title: Application service
  description: Vuetifyには、任意のVueアプリケーション用のレイアウト(ボイラープレート)を簡単に作成できるデフォルトマークアップが備わっています。
  keywords: default layout, vuetify default markup, vuetify default layout
related:
  - /features/theme/
  - /components/app-bars/
  - /components/navigation-drawers/
---

# Application

Vuetifyでは、`v-app`コンポーネント、ならびに `v-navigation-drawer`、`v-app-bar`、`v-footer` などのコンポーネントの **app** プロパティによって、`<v-main>`コンポーネントを中心とする適切なサイジングが行われます。これはアプリケーションのブートストラップに役立ちます。 そのため、レイアウトのサイズ指定と格闘することなく、真にユニークなインターフェースを作り上げることができます。 `v-app` は、すべてのアプリケーションで**必須**のコンポーネントです。 v-app は Vuetify の多くのコンポーネントや機能のマウントポイントとなり、デフォルトのアプリケーションの _variant_ (**dark/light**) を子コンポーネントに伝播させたり、Safari などのブラウザーで特定の種類のクリックイベントに対する適切なクロスブラウザーサポートを提供したりします。 `v-app` は、アプリケーション内で**一度だけ**レンダリングする必要があります。

<entry-ad />

## API

- [v-app](/api/v-app)
- [v-main](/api/v-main)

<inline-api page="components/application" />

<alert type="error">

  アプリケーションを正しく動作させるには、`v-app` コンポーネントでアプリケーションを**ラップ**する必要があります。 このコンポーネントは、**クロスブラウザーでの互換性**を確保するために必要です。 Vuetifyは、ページ内に含まれる複数の孤立したVuetifyインスタンスをサポートしていません。 `v-app` はアプリの本体であれば**どこにでも**配置できますが、1つのみ必要であり、**すべての Vuetify コンポーネントの親**である必要があります。

</alert>

<alert type="info">

  1つのアプリケーションで複数のレイアウトを使用する場合、Vuetifyコンポーネントを使用するそれぞれのルートレイアウトのファイルについて、その各テンプレートのルートに `v-app` を配置する必要があります。

</alert>

## デフォルトのアプリケーションマークアップ

以下は、Vuetify のデフォルトのアプリケーションマークアップの例です。 **app** プロパティを適用すれば、レイアウト要素はどこにでも配置できます。 ページコンテンツとレイアウト要素を連動させるためのキーコンポーネントが`v-main`です。 `v-main`コンポーネントは指定された **app** コンポーネントの構造に応じて動的なサイズになります。 `v-bottom-navigation` を含め、上のようなコンポーネントのいずれか、またはすべての組み合わせを使用できます。

[vue-router](https://router.vuejs.org/) を使用する場合は、`v-main` の中にビューを配置することをお勧めします。

```html
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 -->
  <v-main>

    <!-- アプリケーションに適切なgutterを提供 -->
    <v-container fluid>

      <!-- vue-routerを使用する場合 -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
```

<alert type="info">

  **app** prop を適用すると、自動的に position: **fixed** がレイアウト要素に適用されます。 アプリケーションで _absolute_ な要素が必要な場合、**absolute** prop でこの動作を上書きできます。

</alert>

## Application コンポーネント

以下は **app** prop をサポートするすべてのコンポーネントのリストです。これらすべてがアプリケーションのレイアウト要素として使用できます。 これらは組み合わせることができますが、それぞれのコンポーネントが存在できるのは常に**1つのみ**です。 ただし、コンポーネントを交換することは可能で、レイアウトもそれに対応します。 どのようなレイアウトが作成できるかを紹介するさまざまな例については、 [ワイヤフレーム](/getting-started/wireframes) ページをご覧ください。

これらのアプリケーション用の各コンポーネントは、レイアウトシステム内で影響を与える既定の領域と優先順位を持ちます。

- [v-app-bar](/components/app-bars): 常にアプリケーションの最上部に配置されます。優先度は `v-system-bar` より低くなっています。
- [v-bottom-navigation](/components/bottom-navigation): 常にアプリケーションの下部に配置されます。`v-footer`よりも高い優先度となっています。
- [v-footer](/components/footer): `v-bottom-navigation` よりも低い優先度で、常にアプリケーションの下部に配置されます。
- [v-navigation-drawer](/components/navigation-drawers): アプリケーションの左側または右側に配置されます。設定により、`v-app-bar` の横または下に配置できます。
- [v-system-bar](/components/system-bars): `v-app-bar`よりも高い優先度で、常にアプリケーションの上部に配置されます。

<app-img src="https://cdn.vuetifyjs.com/images/layouts/app.png" alt="Vuetify Application" />

## Application service

**アプリケーションサービス**は、Vuetify のレイアウトの設定に使用します。 アプリケーションサービスは `v-main コンポーネント`と通信し、アプリケーションのコンテンツのサイズを適切に調整します。 アクセス可能ないくつかのプロパティを以下に紹介します。

```ts
{
  bar: number
  bottom: number
  footer: number
  insetFooter: number
  left: number
  right: number
  top: number
}
```

これらの値は、**app** プロパティでコンポーネントの追加や削除を行うと自動的に更新されます。 これらの値は**編集できず**、_読み取り専用_です。 これらの値にアクセスするには、**$vuetify** オブジェクトのapplication プロパティを参照します。

```js
console.log(this.$vuetify.application.top) // 56
```

<alert type="error">

  アプリケーションを正しく動作させるには、`v-app` コンポーネントでアプリケーションを**ラップ**する必要があります。 v-app コンポーネントは、**クロスブラウザーでの互換性**を確保するために必要です。 Vuetifyは、ページ内に含まれる複数の孤立したVuetifyインスタンスをサポートしていません。 `v-app` はアプリの本体であれば**どこにでも**配置できますが、1つのみ必要であり、**すべての Vuetify コンポーネントの親**である必要があります。

</alert>

## アクセシビリティ

デフォルトでは、`v-main`には[**main**](https://www.w3.org/TR/html51/grouping-content.html#the-main-element)の[TR](https://www.w3.org/TR/html51/)タグが割り当てられます。これはドキュメントやアプリケーションの`body`のメインコンテンツ領域であることを示します。

<backmatter />
