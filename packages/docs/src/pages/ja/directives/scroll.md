---
meta:
  title: Scroll directive
  description: scroll ディレクティブは screen や要素がスクロールされたときに条件付きでメソッドを呼び出すことができます。
  keywords: scroll, vuetify scroll directive, vue scroll directive, window scroll directive
related:
  - /styles/scroll/
  - /directives/touch-support/
---

# Scroll directive

`v-scroll` ディレクティブを使用すると、ウィンドウで指定されたターゲットや要素自体( `.self` modifier)がスクロールされたときにコールバックを行なうことができます。

<entry-ad />

## 使い方

デフォルトの動作はウィンドウにバインドすることです。 追加の設定オプションが必要ない場合は、コールバック関数を渡すだけです。

<example file="v-scroll/usage" />

## API

- [v-scroll](/api/v-scroll)

<inline-api page="directives/scroll" />

## サンプル

### オプション

#### Self

`v-scroll` はデフォルトで `ウィンドウ` をターゲットにしますが、それにバインドされている要素をウォッチすることもできます。 次の例では、 **self** modifier、 `v-scroll.self`を使用して、特に [`v-card`](/components/cards) 要素をウォッチします。 これにより、メソッド `onScroll` が、カードの内容をスクロールしたときに呼び出されます。

<example file="v-scroll/option-self" />

#### ターゲット

指定した要素にイベントリスナーをバインドすることもできます。

<example file="v-scroll/option-target" />

<backmatter />
