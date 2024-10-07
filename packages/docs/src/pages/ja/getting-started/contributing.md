---
meta:
  title: コントリビュートする
  description: オープンソースに貢献することで、開発者は素晴らしいツールに自由にアクセスすることができます。 Vuetifyフレームワークの開発に役立つ方法をご覧ください。
  keywords: コントリビューションと機能のリクエスト
related:
  - /getting-started/unit-testing/
  - /about/code-of-conduct/
  - /getting-started/frequently-asked-questions/
---

# コントリビュートする

Vuetifyは、Issueをあげたり、プルリクエストを作成し、貴重なフィードバックを提供する素晴らしいコミュニティによって実現されています。 私たちの仕事は、あなたが素晴らしいアプリケーションを作成できるようにすることです。 使っているうちに、より良くすることが出来る何かに出くわすことがあります。 バグを見つけたり、追加機能のアイデアを持ったりする場合もあります。 それは、素晴らしいことです。 Vuetifyリポジトリをクローンするだけで簡単に、開発環境で作業を開始できます。

<promoted-ad slug="vuetify-discord" />

## 問題の報告

このリポジトリのIssueリストは、バグレポートと機能リクエスト専用です。 適合しないIssueは直ちにクローズされます。 Issueをあげる前に確認してください：

- 類似の [issue](https://github.com/vuetifyjs/vuetify/issues)を検索すると、すでに回答済みである可能性があります。
- [codepen](https://template.vuetifyjs.com/) やリポジトリにある [最新版](https://template.vuetifyjs.com/) で再現してみてください。
- 再現が **MINIMAL** で簡潔であることを確認してください

これらの手順により、問題を迅速にトリアージして解決するために必要なすべての情報が確保されます。 再現が完了したら、 [Vuetify Issue Creator](https://issues.vuetifyjs.com/) を使用して新しいissueを提出してください。

Issueを書くときは、できるだけ詳細を記入してください。 「再現手順」"reproduction steps"は、バグをどのように発見したかを思い出すのではなく、複製リンクをクリックした後に、別の開発者が実行する必要のある一連のアクションであることに注意してください。

複雑で適切な再現性を欠く問題は、[コアチーム][]のメンバーがクローズすることがあります。 問題の報告や複製の作成に関するその他の質問については、公式の Vuetify Discord [コミュニティ][] に参加してください。

<alert type="success">

  **ヒント**

 再現を作成するときは、必要のないすべての **要素、プロパティ、およびデータ変数** を除外してください。 問題をトリアージし、最終的に解決するのにかかる時間を大幅に削減できます。

</alert>

次のセクションでは、ローカル環境を設定する方法と、Vuetifyを開発用に設定する方法を段階的に学びます。

## ローカル開発

Vuetify リポジトリは、Vuetify ライブラリ、ドキュメント、API ジェネレータをつないだ複数のプロジェクトを同時に作業する際に一度に操作する手間を軽減する [lerna](https://github.com/lerna/lerna) monorepoです。 以下のガイドで、あっという間に立ち上がることができるようになっています。

### 環境のセットアップ

必要なソフトウェア:

- [Git](https://git-scm.com/) >v2.20
- [Node.js](https://nodejs.org/) LTS
- [Yarn](https://classic.yarnpkg.com/)

いくつかの依存関係では、 [node-gyp](https://github.com/nodejs/node-gyp#installation) を使用して自分自身をビルドします。 node-gyp 自体をインストールする必要はありませんが、Windows では追加のツールが必要になるかもしれません。 詳細は node-gyp のドキュメントを参照してください。

すべてがインストールされたら、リポジトリをクローンします:

```bash
# Using HTTPS
git clone https://github.com/vuetifyjs/vuetify.git

# Using SSH
git clone git@github.com:vuetifyjs/vuetify.git
```

<alert type="info">

[どのリモートURLを使用するべきか？](https://docs.github.com/en/free-pro-team@latest/github/using-git/which-remote-url-should-i-use)

</alert>

次に依存関係をインストールし、すべてのパッケージをリンクするために最初のビルドを実行します:

```bash
# vuetify フォルダに移動
cd vuetify

# すべてのプロジェクト依存関係をインストール
yarn

# パッケージをビルド
yarn build
```

ビルド処理は開発用のすべての Vuetify パッケージをコンパイルするので、しばらく時間がかかるかもしれません(っ🍵) パッケージがビルドされたら、開発を開始できます。

### Vuetify

Vuetifyライブラリは `packages/vuetify`にあります。 `packages/vuetify/dev` には`Playground.vue`ファイルがあります。プロジェクトのルートから `yarn dev` を実行すると、このファイルがロードされた状態で [localhost:8080](http://localhost:8080/) にある開発サーバが起動します。 プレイグラウンドで変更をテストし、準備ができたらプルリクエストにその内容をコピーできます。

[`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/) を使用して、独自のプロジェクトで vuetify をテストすることもできます:

- `packages/vuetify`に移動します
- `yarn link` を実行
- プロジェクトのディレクトリに移動します
- `yarn link vuetify` を実行

プロジェクトでvuetify-loaderを使用している場合は、vuetifyパッケージで`yarn build：lib`を実行して変更を確認する必要があります。それ以外の場合は、増分ビルドに`yarn watch`を使用できます。

#### Playground.vue

**Playground** ファイルは、Vuetifyの開発に使用されるクリーンルームであり、フレームワーク内の変更を繰り返すために推奨される方法です。

```html
<template>
  <v-container>
    <!--  -->
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
  }
</script>
```

Vuetify開発に使用される **App.vue** ファイルは、 `packages/vuetify/dev` にあります。 [v-app](/api/v-app/) と [v-main](/api/v-main/) コンポーネントとローカルの Playground.vue ファイルが含まれています。

### ドキュメンテーション

ドキュメントは `packages/docs` にありますが、 `packages/api-generator` のファイルも使用しています。 ドキュメント用の開発サーバは、プロジェクトのルートから `yarn dev docs` を実行することで起動でき、デフォルトでは [localhost:8080](http://localhost:8080/) で利用可能になります。

ドキュメントサーバを起動する前に、vuetifyパッケージで `yarn build:lib` を実行する必要があります。

### 変更/プルリクエストの送信

最初に、vuetifyリポジトリのフォークを作成して、変更をプッシュします。 フォークリポジトリに関する情報は [GitHub ドキュメント](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) にあります。

次に、フォークをリモートとしてgitに追加します:

```bash
# HTTPS を使用する場合
git remote add fork https://github.com/YOUR_USERNAME/vuetify.git

# SSH を使用する場合
git remote add fork git@github.com:YOUR_USERNAME/vuetify.git
```

#### ベースブランチの選択

開発を始める前に、変更のベースとなるブランチを知っておく必要があります。 疑問がある場合は master を使用してください。master への変更は通常、rebaseせずに別のブランチにマージすることができます。

| 変更の種類      | ブランチ     |
| ---------- | -------- |
| ドキュメンテーション | `master` |
| バグ修正       | `master` |
| 新機能        | `dev`    |
| 破壊的変更を伴う機能 | `next`   |

```bash
# 目的のブランチに切り替える
git switch master

# upstreamの変更をプル
git pull

# 作業用に新しいブランチを作成する
git switch --create fix/1234-some-issue
```

<alert type="warning">ベースブランチに直接コミットしないで、常に作業するフィーチャーブランチを作成します</alert>

[ガイドライン](#commit-guidelines)に従って変更をコミットし、`git push -u fork`でブランチをフォークにプッシュし、テンプレートに従って Vuetify リポジトリ上でプルリクエストを開きます。

<alert type="warning">

  関連しないコミットやローカルマージを含むプルリクエストは予告なしに **クローズされる** ことがあります。

</alert>

## GitHubでの作業

Vuetifyのリポジトリは [GitHub](https://github.com/vuetifyjs/vuetify) にあり、すべての開発関連情報の主要な場所です。 さらに、 [Vuetify 3](https://titan.vuetifyjs.com) で現在取り組んでいることの詳細な概要をまとめたパブリックGitHubプロジェクトもあります。

これらのサービス内で注目すべきリンクには、次のようなものがあります:

**GitHub**

- [Issues][]
- [Discussions](https://github.com/vuetifyjs/vuetify/discussions)
- [Projects](https://github.com/vuetifyjs/vuetify/projects)
- [Coding Guidelines](https://github.com/vuetifyjs/vuetify/wiki/coding-guidelines)

---

以下のセクションでは、Vuetify 開発の標準操作手順について説明します。

<promoted-ad slug="vue-jobs" />

### 課題のトリアージ

Vuetifyの規模と人気に伴い、新しい問題、質問、機能リクエストが絶えず流入しています。 これらの要求を整理するために、 [コアチーム][] は問題のトリアージだけでなく、それらを作成するためのツールを開発しました。

[Issues][]ボードは、新しいIssueに`triage`ラベルを追加するなど、いくつかの軽い自動化を備えたGitHubのラベルシステムを多用しています。

#### ドキュメント用 - 言語

`en` 以外の言語に関連するドキュメントの変更については、PRを**受け付けていません** 。 `en` 以外の言語の変更はすべて[Crowdin プロジェクト](https://crowdin.com/project/vuetify) を通して提出してください。 次の2つの方法のいずれかで翻訳を手伝うことができます:

- ドキュメントサイトから直接コンテキスト内の翻訳サービスを使用します。 ドキュメントの言語ドロップダウンで `Help Translate` を選択するだけです。
- 直接 [Crowdin プロジェクト](https://crowdin.com/project/vuetify) を介して翻訳する。

**注**: 翻訳の少なくとも50%が完了するまでは、文書サイトの言語ドロップダウンに言語は追加されません。

### 新しい機能のリクエスト

Vuetify は、新機能の提案に **RFC** (Request for comments) プロセスを使用します。 フレームワークに入るための新しい機能のために、一貫した制御されたパスを提供することを意図しています。

バグ修正やドキュメントの改善を含む多くの変更は、通常のGitHubのプルリクエストワークフローを通じて実装およびレビューできます。

ただし、いくつかの変更は_重要_であり、すこしデザインプロセスを経て、Vuetify [Core Team](/about/meet-the-team/)と[コミュニティ](https://discord.gg/eXubxyJ)の間でコンセンサスが得られるようにお願いしています。

#### はじめましょう

Vuetify に主要な機能を追加するには、あなたの RFC を `.md`ファイルとしてこのリポジトリにマージする必要があります。 開始方法のガイドは次のとおりです:

- Vuetifyの RFC リポジトリ <https://github.com/vuetifyjs/rfcs> をフォークします。

- `0000-template.md` を `active-rfcs/0000-my-feature.md` にコピー (ここでの **my-feature** は説明用です。 RFC番号はまだ**割り当てないで**ください)。

- RFCを記入します。 詳細に注意を払ってください。

  <alert type="error">!!crwd_CB_78_BC_dwrc!!  </alert>

- プルリクエストを送信します。 RFC プルリクエストとして、より大きなコミュニティからのデザインフィードバックを受け取ることになるので、それに応じて修正する準備をしておく必要があります。 新しい RFC プルリクエストは、 **Pending** ステージで保留中として開始されます。

- コンセンサスを形成し、フィードバックを統合します。 幅広いサポートを受けている RFC は、コメントを受け取らない RFC よりも進展する可能性がはるかに高くなります。

- 最終的には、[コアチーム][]が、そのRFCがVuetifyに含めるべき候補であるかどうかを決定します。

- RFC は、[コア チーム][]や[コミュニティ][]からのフィードバックに基づいて修正することができます。 大幅な変更は、新たな _最終コメント_ 期間のトリガーとなる場合があります。

- RFCは、公開討論の終了後、リジェクト理由を要約したコメントが作成され、リジェクトされる場合があります。 [コアチーム][]メンバーは、RFCに関連付けられたプルリクエストをクローズします。RFCは**Rejected**ステージに入ります。

- RFC は、_最終コメント_期間が終了した時点で受理されることがあります。 [コアチーム][]メンバーは、RFCに関連付けられたプルリクエストをマージします。その時点で、RFCは**Active**ステージに入ります。

RFC がマージされると、対応する機能が Vuetify リポジトリ内に実装されます。 次の _メジャー_ または _マイナー_ リリースの一部になります。 一度リリースされると、RFC は **Released** ステージに入り、ロックされます。

RFC についての詳細は公式リポジトリを参照してください: <https://github.com/vuetifyjs/rfcs>

### Commit ガイドライン

すべてのコミット メッセージは [angular](https://github.com/conventional-changelog/conventional-changelog) プリセットを使用して _conventional-changelog_ 標準に従う必要があります。 この標準フォーマットは 2 種類のコミットで構成されています:

- With scope: `<type>(scope): <subject>`

  ```bash
  fix(VSelect): don't close when a detachable child is clicked

  fixes #12354
  ```

- Without scope: `<type>: <subject>`

  ```bash
  docs: restructure nav components

  Moved duplicated functionality in drawer to reduce
  scope of responsibility
  ```

#### 一般的なルール

- コミットメッセージには件名が必要で、本文が含まれている場合があります。 これらは空白行で区切る必要があります。
- 件名は 60 文字以内でなければなりません。
- 件名は命令法で書く必要があります（fix, not fixed / fixes etc.）
- 本文のコピーには、解決されたすべての問題への参照が含まれている必要があります:

  ```bash
  docs(sass-variables): fix broken link to api

  resolves #3219
  resolves #3254
  ```

- 本文のコピーは72文字で折り返さなければなりません。
- 本文のコピーには、何を、なぜ、どのようにではなく、説明のみを含める必要があります。 後者はドキュメントと実装に属します。

#### コミットの種類

**angular** プリセットで使用される _commit types_ のリストは以下のとおりです:

- **feat:** 新機能や機能性をもたらすコミット。 下位互換の機能は次の **MINOR** でリリースされますが、破壊的変更は次の **MAJOR** でリリースされます。 破壊的変更を伴うコミットの本文は、 `BREAKING CHANGE`で始まる必要があります。 次に、API の変更方法を説明します。
- **fix:** vuetifyのコードベース内のバグ修正を提供するコミット。
- **docs:** ドキュメントに更新を提供するコミット。
- **style:** コードの実行方法に影響を与えないコミット、これらは単にフォーマットの変更です。
- **refactor:** バグの修正も機能の追加も行わないコミット。
- **perf:** パフォーマンスを向上させるコミット。
- **test:** 不足しているテストまたは既存のテストを修正するコミット。
- **chore:** src ファイルやテストファイルを変更しないその他のコミット。
- **revert:** 以前のコミットを元に戻すコミット。

<promoted-ad slug="vuetify-reddit" />

#### Commitizen

[Vuetifyチーム](/about/meet-the-team/) は、すべてのリポジトリコミットに対して [commitizen][] を使用します。 通常のコミット機能の変更を最小限に抑えて、読みやすく整理されたコミットが可能になります。 Commitizenはセマンティック・バージョン管理のための流動的なインターフェースを提供し、 [リリースノート](https://github.com/vuetifyjs/vuetify/releases)の作成を容易にします。

始めるには、ターミナルで以下のコマンドを実行することで [yarn](https://yarnpkg.com/)を使用して [commitizen パッケージをグローバルにインストール](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility) します。

```bash
# commitizenと従来のchangelogアダプターをインストールします
yarn global add commitizen cz-conventional-changelog

# 次に、どのアダプタをグローバルに使用するかを
# commitizenに伝える.czrcファイルを作成します。
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

<alert type="warning">

  **コマンドプロンプト** で `.czrc` ファイルを作成しても、動作しないことがあります。 予期せぬ結果が出た場合は、homeディレクトリ内のユーザフォルダにファイルを作成してください。 これは通常、プライマリハードドライブの `Users` フォルダにあります。

</alert>

完了したら、 <kbd>git commit</kbd> の代わりに、ターミナルで <kbd>git cz</kbd> コマンドを実行します。 ここから、コミット メッセージを作成するために使用される一連のプロンプトが表示されます。 詳細については、 [コミット](#commit-guidelines) のガイドラインをご覧ください。

<backmatter />

[commitizen]: https://github.com/commitizen/cz-cli
[コミュニティ]: https://community.vuetifyjs.com/
[コアチーム]: /about/meet-the-team/
[コア チーム]: /about/meet-the-team/
[Issues]: https://github.com/vuetifyjs/vuetify/issues
[Issues]: https://github.com/vuetifyjs/vuetifyjs/vuetifyjs/issues
