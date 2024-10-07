---
meta:
  title: レイアウトの作成
  description: ステップ・バイ・ステップのガイドでVuetifyの幅広いレイアウト・システムのパワーを活用する方法をご紹介します。
  keywords: layouts, pre-made layouts, vuetify layouts, pre-made vuetify layouts, vue layouts, material layouts, material design layouts
related:
  - /getting-started/installation/
  - /getting-started/wireframes/
---


# レイアウト

カスタマイズ可能で拡張性の高いレイアウトオプションを使用して、美しいユーザーエクスペリエンスを構築しましょう。

<alert type="warning">

  以下のセクションでは、Vue CLIを使用して新しいVuetifyアプリケーションを作成します。Vue、HTML、CSS、およびJavaScriptへの基本的な理解があることを前提としています。 Vue CLIを使用してVuetifyをインストールする方法の詳細は、[インストールページ](/getting-started/installation/#vue-cli-install)　を参照してください。

</alert>

## 使い方

Vuetifyには、組み込みのレイアウトシステムが付属しています。 [v-app-bar](/components/app-bars/) や [v-footer](/components/footer/) などのコンポーネントは、 **app** という特別なプロパティをサポートしています。 このプロパティは、対応するコンポーネントがアプリケーションのレイアウトの一部であることを Vuetify に通知します。 このセクションでは、レイアウト システムの仕組み、複数のレイアウト コンポーネントを組み合わせる方法、およびそれらをすべて動的に変更する方法の基本について説明します。

Vuetifyには、 `v-app` と `v-main` という2つのプライマリレイアウトコンポーネントがあります。 `v-app` コンポーネントはアプリケーションのルートであり、デフォルトの Vue エントリポイント `<div id="app">` を直接置き換えます。 `v-main` コンポーネントは、 `main` HTML 要素とアプリケーションの __content__ ルートのセマンティックな置き換えです。 VueがDOMにマウントされると、レイアウトの一部であるVuetifyコンポーネントは、現在の高さや幅をフレームワークコアに登録します。 `v-main` コンポーネントはこれらの値を受け取り、コンテナのサイズを調整します。

わかりやすく説明するために、基本的なVuetifyレイアウトを作成しましょう:

```html
<v-app>
  <v-main>
    Hello World
  </v-main>
</v-app>
```

テンプレートにレイアウトコンポーネントがない場合、 `v-main` はサイズを調整する必要はなく、ページ全体を占有します。 [v-app-bar](/components/app-bars/)を`v-main`要素の上に追加することで変更してみましょう:

```html
<v-app>
  <!-- appプロパティが必要です -->
  <v-app-bar app></v-app-bar>

  <v-main>
    Hello World
  </v-main>
</v-app>
```

`v-app-bar` に **app** プロパティを与えたので、Vuetifyはレイアウトの一部であることを認識しています。 `v-main` は、バーの登録された高さを取得し、その利用可能なコンテンツ領域から同じ量を削除します。 - この場合、**64px** のスペースが `v-main` のコンテナの上部から削除されます。

<alert type="info">

  Vuetifyには、アプリケーションのUI領域をスキャフォールディングするために使用される [wireframes](/getting-started/wireframes/) と呼ばれる複数の事前作成されたレイアウトが用意されています。

</alert>

最後に、`v-container`コンポーネントでコンテンツをラップしてgutterを追加してみましょう:

```html
<v-app>
  <v-app-bar app></v-app-bar>

  <v-main>
    <v-container>
      Hello World
    </v-container>
  </v-main>
</v-app>
```

Up next, we take our newly established baseline and enhance it with new layout components and customization options.

## Combining layout components

More to follow

## Dynamic layouts

More to follow

<backmatter />
