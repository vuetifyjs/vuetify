---
meta:
  title: よくある質問（FAQ）
  description: 問題が発生しましたか？ Vuetifyコミュニティでよく寄せられる質問をご覧ください。
  keywords: よくある質問（FAQ）
related:
  - /getting-started/contributing/
  - /features/treeshaking/
---

# よくある質問（FAQ）

特定の問題で行き詰っていますか？ チケットを作成する前に、これらの一般的な落とし穴のいくつかを確認してください。 それでも探しているものが見つからない場合は、GitHubで[issue](https://issues.vuetifyjs.com/)を提出するか、[コミュニティ](https://community.vuetifyjs.com/) で質問してみてください。

<promoted-ad slug="vuetify-discord" />

## 目次

- [Vuetify v3はいつリリースされますか?](#version-3)
- [Search Vuetifyが正常に動作しないのはなぜですか?](#search-broke)
- [Sass/Scssが原因でアプリケーションをコンパイルできない.](#sass-compile-error)
- [v2でのグリッドとv1.5の比較例はありますか？](#v2-v15-grid)
- [Error: Cannot find module 'node-sass'.](#cannot-find-module-sass)
- [Invalid CSS after @content: expected "}", was "($material-light);".](#invalid-css-content)
- [アプリケーションが動作しません。](#my-application-is-not-working)
- [I'm seeing $attrs is readonly and/or $listeners is readonly in the console.](#attrs-is-readonly)
- [I'm seeing Error Module parse "failed". Unexpected token in the terminal.](#unexpected-token)
- [routerのあるcodepenテンプレートはありますか?](#codepen-template-with-router)
- [Vuetifyコンポーネントを拡張するにはどうすればよいですか?](#extend-components)
- [私のアプリが正しく描画されません。](#my-application-does-not-look-correct)
- [Menu/Dialog/Navigation drawer が適切に表示できない。](#menu-dialog-drawer)
- [コンテンツが縦にオーバーフローしていないのに、スクロールバーが表示されます。](#scrollbar-overflow)
- [コンテンツを縦方向に中央に配置するにはどうすればよいですか?](#vertically-center-content)
- [My _/_ link is active when I'm on _/home_ page.](#link-active-home)
- [モバイルデバイスでアプリケーションがレスポンシブにならないのはなぜですか?](#mobile-responsiveness)
- [Font Awesome, Material Design Icons, Material Iconsを使いたい。](#custom-icons)
- [&lt;v-dialog>がクリック後すぐに閉じてしまう。](#dialog-close-click)
- [最新バージョンにアップグレードするにはどうすればいいですか?](#latest-version-upgrade)
- [バグを報告したり、機能をリクエストしたりするにはどうすればいいですか?](#report-request-feature)
- [vuetify-loader がすべてのコンポーネントをロードしません](#vuetify-loader-components)
- [version 1.5 はいつまでサポートされますか？](#v15-lts)
- [v1.5ドキュメントにアクセスするにはどうすればよいですか?](#v15-docs)
- [[Vue warn]: Unknown custom element: &lt;v-app>](#unknown-element)
- [SCRIPT5022: Expected identifier, string or number](#script5022)
- [Error: Could not find a declaration file for module 'vuetify/lib'](#typescript-declaration-file)

## Questions

ここにある質問をお持ちですか? [Discordコミュニティ](https://community.vuetifyjs.com/) で教えていただくか、 [Issue Generator](https://issues.vuetifyjs.com/) でリクエストを作成してください。

---

- **Vuetify v3 はいつリリースされますか？** { #version-3 }

  [GitHub](https://titan.vuetifyjs.com) で進捗状況をフォローするか、 [ロードマップ](/introduction/roadmap/) で今後の展望を確認してください。

<br>

- **Sass / scss エラーが原因でアプリケーションがコンパイルされません。**{ #sass-compile-error }

  sass-loader バージョンに従って適切な options オブジェクトを使用し、webpack が正しく設定されていることを確認します。 詳細は [webpack install](/getting-started/installation/#webpack-install) のセクションを参照してください。

<br>

- **Search Vuetifyが正常に動作しないのはなぜですか？**{ #search-broke }

  現時点では、Algolia docsearchは主要なプロダクションサイトをクロールします: [https://vuetifyjs.com/](https://vuetifyjs.com/).

<br>

- **v2 と v1.5 グリッドを比較する例はありますか？**{ #v2-v15-grid }

  [グリッド例はこちら](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32)でご覧いただけます。

<br>

- **Error: Cannot find module 'node-sass'.**{ #cannot-find-module-sass }

  `package.json` にある `@vue/cli-*` パッケージが少なくとも **^3.5.0** であることを確認してください。

<br>

- **Invalid CSS after @content: expected "}", was "($material-light);".**{ #invalid-css-content}

  `package.json` で `node-sass` の代わりに **sass** を使用していることを確認してください。

<br>

- **私のアプリケーションが動作しません。**{ #my-application-is-not-working }

  まず、Vue.jsとVuetifyの最新バージョンを使用していることを確認してください。 以下の [テンプレート](https://template.vuetifyjs.com/) を使って codepen で再現してみてください。 通常、環境外で問題を再現できない場合は、問題はローカルに存在することを意味します。 それでも問題を解決できない場合、[コミュニティ](https://community.vuetifyjs.com)にcodepenを提供し、適切なヘルプチャンネルで問題を解決してください。

<br>

- **I'm seeing `$attrs is readonly` and/or `$listeners is readonly` in the console**{ #attrs-is-readonly }

  VuetifyはTypescriptを利用しており、現在Vueオブジェクトをimport およびextendする必要があります。 This has the potential in some applications to generate a warning messages. There is currently an ongoing [GitHub discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases.

<br>

- **ターミナルでエラーが表示されます。 `Error in ./node_modules/vuetify/src/dir/file.js Module parse failed: Unexpected token (<lineno>:<characterno>)` **{ #unexpected-token }

  IntelliJ IDEA や WebStorm などの IDE を使用している場合、使用するコンポーネントの `vuetify/src` ディレクトリを指す自動インポートが追加されることがよくあります。 import 文のパスを `vuetify/src` から `vuetify/lib` に変更します。

<br>

- **router付きのcodepenテンプレートはありますか？**{ #codepen-template-with-router }

  はい。 [Vuetify Codepen Router Template](https://codepen.io/johnjleider/pen/PMZvpr)

<br>

- **Vuetifyコンポーネントを拡張するにはどうすればいいですか?**{ #extend-components }

  Vuetifyコンポーネントは、vueで `extends` オプションを使用することで簡単に拡張できます。 [Codepen Example](https://codepen.io/whoistobias/pen/yLNgjwy)

```js
// src/components/ActivateBtn
import { VBtn } from 'vuetify/lib'

export default {
  extends: VBtn,

  methods: {
    // ここではVBtnのgenContentメソッドをoverwriteして
    // デフォルトのgenContentメソッドをオーバーライドします。
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-btn__contents'
      }, [
        'Activate ',
        this.$slots.default
      ])
    }
  }
}
```

<br>

- **アプリケーションが正しく表示されません。**{ #my-application-does-not-look-correct }

  Vuetifyは `v-app` コンポーネントを使用する必要があります。 アプリケーション全体をラップする必要があり、テーマを含むフレームワーク機能の多くの中心点となります。 [アプリケーション](/components/application/) ページに記載されている適切なマークアップに従っていることを確認してください。

<br>

- **メニュー/ダイアログ/ナビゲーションドロワーが正しく開きません。**{ #menu-dialog-drawer }

  コンポーネントが `v-app` 要素でラップされていることを確認します。 **activator** スロットに配置されていないコンポーネントをアクティブ化するために要素を使用している場合。 クリックイベントの伝播を停止するようにします。 これらのコンポーネントは **v-outside click** ディレクティブを使用し、直ちに閉じます。

<br>

- **自身のコンテンツが垂直にあふれていなくてもスクロールバーが表示されています。**{ #scrollbar-overflow }

  Vuetifyは [ress reset](https://github.com/filipelinhares/ress) の若干変更されたバージョンを使用しており、デフォルトではブラウザー間の動作を正常化するためにhtmlスクロールバーがオンになります。 これはデザインの選択であり、何度も議論されてきました。 この機能を持つことと持たないことには賛否両論があり、現在のところ、この機能をそのままにしておくことに賛成の票が集まっています。 この機能を無効にしたい場合は、スタイルファイルに`html { overflow-y: auto }` を追加するだけです。 詳細については、 [CSS リセット](/styles/css-reset/) ページをご覧ください。

- **コンテンツを縦方向に中央に配置するにはどうすればいいですか？**{ #vertically-center-content }

  **fill-height** prop を `v-container` に適用します。 This helper class normally only adds **height: 100%**, but for the container, it also looks for a child `v-layout` and applies the needed classes to vertically center the content.

<promoted-ad slug="vuetify-reddit" />

- **My _/_ link is active when I'm on _/home_ page.**{ #link-active-home }

  Add the **exact** to the link that points to absolute /. 詳細については、公式の Vue ルーター [ドキュメント](https://router.vuejs.org/ja/api/#router-link) をご覧ください。

<br>

- **モバイルデバイスでアプリケーションがレスポンシブにならないのはなぜですか?**{ #mobile-responsiveness }

  index.htmlの `<head>` セクション内に適切なmetaタグがあることを確認してください。

```html
<!-- public/index.html -->
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
</html>
```

<br>

- **Font Awesome, Material Design Icons, Material Iconsをどのように使えばいいですか？**{ #custom-icons }

  詳細については、 [アイコンガイド](/features/icon-fonts/) をご覧ください。

<br>

- **ボタンをクリックした直後に &lt;v-dialog> が閉じられるのはなぜですか？**{ #dialog-close-click }

  `v-menu` や `v-dialog` などに **activator** スロットを使用しない場合 クリックイベントの伝播を手動で停止する必要があります。 これを行うには、click イベントに `.stop` 修飾子を追加するだけです。

```html
<!-- Vue Component -->
<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>...</v-card>
    </v-dialog>

    <v-btn @click.stop="dialog = true">
      Open Dialog
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>

```

<br>

- **最新バージョンにアップグレードするにはどうすればいいですか？**{ #latest-version-upgrade }

  最新バージョンへのアップグレード方法については、 [リリースと移行](/getting-started/releases-and-migrations/) ページを参照してください。 さらに、必要な変更はすべてのリリースの **アップグレードガイド** に記載されています。

  **Releases**:

- [Latest](https://github.com/vuetifyjs/vuetify/releases/latest)
- [v2.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0)
- [v1.5.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.5.0)
- [v1.4.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.4.0)
- [v1.3.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.0)
- [v1.2.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.2.0)
- [v1.1.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.1.0)
- [v1.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.0.0)
- [v0.17.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.17.0)
- [v0.16.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.16.0)
- [v0.15.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.15.0)
- [v0.14.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.14.0)
- [v0.13.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.13.0)
- [v0.12.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.12.0)

<br>

- **バグの報告や機能のリクエスト方法は？**{ #report-request-feature }

  必要な情報がすべて提供されていることを確認するために、このプロセスに役立つ[Issue Generator](https://issues.vuetifyjs.com)を作成しました。 ジェネレーターを使用せずに作成されたissueは自動的にクローズされてしまいますので、必ずこちらをご利用ください。

<br>

- **vuetify-loader がすべてのコンポーネントをロードしません。**{ #vuetify-loader-components }

  vuetify-loader は _動的_ コンポーネントに制限があります。 詳細については、 [制限](/features/treeshaking/#limitations) セクションを必ずチェックしてください。

<br>

- **バージョン 1.5 はどのくらいの期間サポートされますか?**{ #v15-lts }

  2020年7月まで。 詳細については、 [長期サポート](/introduction/long-term-support/) ページをご覧ください。

<br>

- **v1.5ドキュメントにアクセスするにはどうすればいいですか？**{ #v15-docs }

  [https://v15.vuetifyjs.com](https://v15.vuetifyjs.com)

<br>

- **[Vue warn]: Unknown custom element: &lt;v-app>**{ #unknown-element }

  最新バージョンの [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) と [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) が **package.json** にインストールされていることを確認してください。

<br>

- **SCRIPT5022: Expected identifier, string or number**{ #script5022 }

  vue-cli-3 の **モダンモード** をサポートするために、 `vuetify/lib` はトランスパイルされません。 vue-cli に `vuetify` パッケージをトランスパイルするように指示する必要があります。 これは、Vuetifyのcliプラグインをインストールするときに自動的に設定されます。 古いバージョンを使用している場合は、 `vue.config.js` の `transpileDependencies` 配列に 'vuetify' を追加してください。

<br>

- **When adding typescript - Error: Could not find a declaration file for module 'vuetify/lib'**{ #typescript-declaration-file }

  `tsconfig.json` の `compilerOptions` キーを vuetify typeで更新します:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vuetify"]
  }
}
```

## ヘルプが必要なとき

問題に関するヘルプが必要な場合は、ヘルプチャンネルをご利用ください。

- [Vuetify Professional Support](https://vuetifyjs.com/en/introduction/enterprise-support/)
- [Discordコミュニティ](https://community.vuetifyjs.com/)
- [GitHub Discussions](https://discussions.vuetifyjs.com/)

<br>

追加のお問い合わせは、[John Leider](mailto:john@vuetifyjs.com) または[Heather Leider](mailto:heather@vuetifyjs.com) までお願いします。

<promoted-ad type="theme" />

<backmatter />
