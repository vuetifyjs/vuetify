---
meta:
  title: Vuetifyを使用する理由
  description: Vuetifyはとてもアクティブなコミュニティがあり、マテリアルデザインコンポーネントの簡単な使い方を提供しています。また、継続的にアップデートされています。
  keywords: vuetifyの理由、vuetifyを選ぶ理由、ベストなvueフレームワーク、ベストなuiフレームワーク
related:
  - /getting-started/installation/
  - /introduction/roadmap/
  - /about/meet-the-team/
nav: Vuetifyを選ぶ理由
---

# はじめに

Vuetify の概要、アプリケーションを新規に作成する方法、API リファレンス、サンプル コード、チュートリアルなどの詳細をご覧ください。

<promoted-ad slug="vuemastery-getting-started" />

## はじめましょう

Vuetifyを試す最も簡単な方法は、サイト内の[Codepenのテンプレート](https://template.vuetifyjs.com/)を使用することです。 テンプレートはドキュメント内のすべての例で使用されており、Vuetifyフレームワークで遊んでみるのに絶好のサンドボックスです。 ローカル `index.html` ファイルで試したい場合は、[CDN](/getting-started/installation/#usage-with-cdn) を使用する方法についてのガイドがあります。

**Nuxt** や **VuePress**など、追加のインストール オプションについては、 [インストール](/getting-started/installation/) ページを参照してください。

## Vuetifyとは?

Vuetifyは、Vue.js上に構築された包括的なUIフレームワークです。 Vuetifyのプロジェクトの目標は、開発者が豊かで魅力的なユーザー エクスペリエンスを構築するために必要なツールを提供することです。 Vuetifyが他のフレームワークと異なるのは、[Material Designの設計](https://material.io/)に基づく何百もの慎重に作成されたコンポーネントを習得しやすく、マスターする価値があるように、ゼロから設計されていることです。

Vuetifyはモバイルファーストのデザイン アプローチを採用しており、スマートフォン、タブレット、PCのいずれでも、そのままで機能するアプリケーションを作成できます。

開発の経験があり、他のライブラリ/フレームワークとVuetifyとの違いを知りたい場合は、[Vue Framework比較チャート](#comparison)をご覧ください。

## Vuetifyを選ぶ理由

[Vue.js](https://vuejs.org/) は、2014年に最初にリリースされてから成長を続け、世界で最も人気のある JavaScript フレームワークの一つとなっています。 人気の理由の1つは、広範囲で利用できる_コンポーネント_を備え、開発者がシンプルなモジュールを作成してアプリケーション全体で再利用できることです。  Vue.jsのさまざまなUIライブラリは、このようなモジュールに特定のスタイル ガイドラインを適用し、拡張性の高いWebアプリケーションの構築に必要なツールを提供するコレクションです。

Vuetifyは [Material Designの設計](https://material.io/)に厳密に従って開発され、すべてのコンポーネントはモジュール性、応答性、そしてパフォーマンスに細心の注意を払って作成されています。 アプリケーションはユニークで動的な[レイアウト](/features/layouts/)になるようカスタマイズし、[SASS変数](/features/sass-variables/)を使ってコンポーネントのスタイルもカスタマイズできます。

Vuetifyの開発サイクルは非常に活発で、毎週のようにパッチをリリースし、コミュニティから上がる問題や報告に迅速に対応しています。そのため、バグ修正や機能強化がより頻繁に手元に届きます。 さらに、すべてのメジャー リリースには、以前のマイナーバージョンに対する18ヶ月間の[長期サポート](/introduction/long-term-support/) が付属します。

他のフレームワークとは異なり、Vuetifyで開発を進める場合、あなたは決して一人ではありません。 問題に当たって困っている場合は、 Vuetifyの大規模な[Discordコミュニティを活用し](https://community.vuetifyjs.com/)、多数のパブリック ヘルプ チャンネルで他のVuetify開発者に協力を求めることができます。 もっとパーソナライズされたサポート ソリューションが必要な場合は、 Vuetifyが**GitHubスポンサーシップ**を通じて個人や企業に合わせたオプションを提供する[エリート サポート](https://github.com/sponsors/johnleider)をご利用ください。 [Vuetifyの開発を応援](/about/sponsors-and-backers/)するための他のいくつかの方法もチェックしてみてください。

以下は、UIライブラリを選択する際に開発者や企業にとって重要であると考えられる、人気Vue.jsフレームワークとその機能のリストです。

<vuetify-comparison />

今すぐ始めませんか？ [インストール](/getting-started/installation/) ページに進み、素晴らしいアイデアを今すぐ形にしてみましょう。

## Feature Guides

詳細な機能ガイドでVuetify内部の仕組みを学び、熟練した**v-developer**になりましょう。 各ガイドは、[レイアウト](/features/layouts/)を使ってレスポンシブなページを構築する方法、[SASS 変数](/features/sass-variables/)を使用してアプリケーションのスタイルをカスタマイズする方法、[Tree Shaking](/features/treeshaking/)によってアプリケーションのパッケージ サイズを削減する方法など、開発エクスペリエンスを最大限に活用するための情報を提供するように設計されています。

| 機能                                                | スキル レベル | 所要時間 |
| ------------------------------------------------- | ------- | ---- |
| [右書き言語対応 （RTL）](/features/bidirectionality/)      | 初級      | 1分   |
| [グローバル設定](/features/global-config/)               | 初級      | 1分   |
| [Icons](/features/icon-fonts/)                    | 初級      | 15 分 |
| [レイアウト](/features/layouts/)                       | 初級      | 5 分  |
| [テーマ](/features/theme/)                           | 初級      | 15 分 |
| [アクセシビリティ(a11y)](/features/accessibility)         | 中級      | 10 分 |
| [ブレークポイント](/features/breakpoints)                 | 中級      | 15 分 |
| [国際化 (i18n)](/features/internationalization/)     | 中級      | 5 分  |
| [プログラムによるスクロール](/features/scrolling/)             | 中級      | 2 分  |
| [SASS変数](/features/sass-variables/)               | 中級      | 10 分 |
| [プリセット](/features/presets/)                       | 上級      | 15 分 |
| [Tree Shaking (不要コードの削除)](/features/treeshaking/) | 上級      | 15 分 |

探しているトピックが見つかりませんか？ ぜひ改善にご協力ください。 [john@vuetifyjs.com](mailto:john@vuetifyjs.com) までご意見をお寄せいただくか、 [Discordコミュニティ](https://community.vuetifyjs.com/) にご参加ください。

<promoted-ad slug="vuetify-discord" />

<backmatter />
