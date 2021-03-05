<template>
  <div :id="file" v-bind="attrs">
    <pre data-lang="html">{{ template }}</pre>
    <pre data-lang="js">{{ script }}</pre>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'

  var b = 1

  // https://static.codepen.io/assets/embed/ei.js
  let embed = function embed(e, target, r) {
    var n = {
      _HTML_TYPES: [
        'html',
        'xml',
        'haml',
        'markdown',
        'slim',
        'pug',
        'application/x-slim',
      ],
      _CSS_TYPES: [
        'css',
        'less',
        'scss',
        'sass',
        'stylus',
        'postcss',
        'text/css',
        'text/x-sass',
        'text/x-scss',
        'text/x-less',
        'text/x-styl',
      ],
      _JS_TYPES: [
        'js',
        'javascript',
        'coffeescript',
        'livescript',
        'typescript',
        'babel',
        'text/javascript',
        'text/x-coffeescript',
        'text/x-livescript',
        'text/typescript',
      ],
      _CUSTOM_EDITOR_TYPES: {
        vue: 'js',
        flutter: 'js',
      },
      cmModeToType: function (e) {
        var t = this._getSafeInputMode(e);
        return this._getType(t);
      },
      _getSafeInputMode: function (e) {
        return ('string' == typeof e ? e : e.name).toLowerCase();
      },
      syntaxToType: function (e) {
        return this._getType(e);
      },
      _getType: function (e) {
        return -1 !== this._HTML_TYPES.indexOf(e)
          ? 'html'
          : -1 !== this._CSS_TYPES.indexOf(e)
          ? 'css'
          : -1 !== this._JS_TYPES.indexOf(e)
          ? 'js'
          : this._CUSTOM_EDITOR_TYPES[e]
          ? this._CUSTOM_EDITOR_TYPES[e]
          : 'unknown';
      },
    };

    var i = function e(t) {
      'loading' === document.readyState
        ? setTimeout(function () {
            e(t);
          }, 9)
        : t();
    };
    var a = [
      'title',
      'description',
      'tags',
      'html_classes',
      'head',
      'stylesheets',
      'scripts',
    ];
    var o = function (e) {
      for (var t = {}, r = e.attributes, n = 0, i = r.length; n < i; n++) {
        var a = r[n].name;
        0 === a.indexOf('data-') && (t[a.replace('data-', '')] = r[n].value);
      }
      return (t = l(t)), u(t) ? ((t.user = s(t, e)), t) : null;
    };
    var s = function (e, t) {
      if ('string' == typeof e.user) return e.user;
      for (var r = 0, n = t.children.length; r < n; r++) {
        var i = (t.children[r].href || '').match(
          /codepen\.(io|dev)\/(\w+)\/pen\//i
        );
        if (i) return i[2];
      }
      return 'anon';
    };
    var u = function (e) {
      return 'prefill' in e || e['slug-hash'];
    };
    var l = function (e) {
      return (
        e.href && (e['slug-hash'] = e.href),
        e.type && (e['default-tab'] = e.type),
        e.safe &&
          ('true' === e.safe
            ? (e.animations = 'run')
            : (e.animations = 'stop-after-5')),
        e
      );
    };
    var getCodepenUrl = function (e) {
      var t = p(e),
        r = e.preview && 'true' === e.preview ? 'embed/preview' : 'embed';
      if ('prefill' in e) return [t, r, 'prefill'].join('/');
      var n = f(e);
      return [t, e.user ? e.user : 'anon', r, e['slug-hash'] + '?' + n]
        .join('/')
        .replace(/\/\//g, '//');
    };
    var p = function (e) {
      return e.host ? d(e.host) : 'https://codepen.io';
    };
    var d = function (e) {
      return e.match(/^\/\//) || !e.match(/https?:/)
        ? document.location.protocol + '//' + e
        : e;
    };
    var f = function (e) {
      var t = '';
      for (var r in e)
        'prefill' !== r &&
          ('' !== t && (t += '&'), (t += r + '=' + encodeURIComponent(e[r])));
      return t;
    };
    var getHeight = function (el) {
      return el.height ? el.height : 300;
    };
    var h = function (attrs, el) {
      var r;
      var fragment = document.createDocumentFragment();

      fragment.appendChild(createIFrame(attrs));

      if ('prefill' in attrs) {
        r = createForm(attrs, el);
        fragment.appendChild(r);
      }

      insertFragment(el, fragment);

      r && r.submit();
    };
    var createElement = function (name, attrs) {
      var el = document.createElement(name);
      for (var n in attrs)
        Object.prototype.hasOwnProperty.call(attrs, n) &&
          el.setAttribute(n, attrs[n]);
      return el;
    };
    var createForm = function (e, t) {
      var r = createElement('form', {
        class: 'cp_embed_form',
        style: 'display: none;',
        method: 'post',
        action: getCodepenUrl(e),
        target: e.name,
      });
      for (var i in ((e.data = (function (e) {
        if (e.hasAttribute('data-prefill')) {
          var t = {},
            r = e.getAttribute('data-prefill');
          for (var i in (r = JSON.parse(decodeURI(r) || '{}')))
            a.indexOf(i) > -1 && (t[i] = r[i]);
          for (
            var o = e.querySelectorAll('[data-lang]'), s = 0;
            s < o.length;
            s++
          ) {
            var u = o[s],
              l = u.getAttribute('data-lang');
            u.getAttribute('data-options-autoprefixer') &&
              (t.css_prefix = 'autoprefixer');
            var c = n.syntaxToType(l);
            (t[c] = u.innerText), l !== c && (t[c + '_pre_processor'] = l);
            var p = u.getAttribute('data-lang-version');
            p && (t[c + '_version'] = p);
          }
          return JSON.stringify(t);
        }
      })(t)),
      e))
        'prefill' !== i &&
          r.appendChild(
            createElement('input', {
              type: 'hidden',
              name: i,
              value: e[i],
            })
          );
      return r;
    };
    var createIFrame = function (attrs) {
      var t;
      var r = getCodepenUrl(attrs);
      t = attrs['pen-title'] ? attrs['pen-title'] : 'CodePen Embed';
      var n = {
        allowfullscreen: 'true',
        allowpaymentrequest: 'true',
        allowTransparency: 'true',
        class: 'cp_embed_iframe ' + (attrs.class ? attrs.class : ''),
        frameborder: '0',
        height: getHeight(attrs),
        width: '100%',
        name: attrs.name || 'CodePen Embed',
        scrolling: 'no',
        src: r,
        style: 'width: 100%; overflow:hidden; display:block;',
        title: t,
      };

      return (
        'prefill' in attrs == !1 && (n.loading = 'lazy'),
        attrs['slug-hash'] &&
          (n.id = 'cp_embed_' + attrs['slug-hash'].replace('/', '_')),
        createElement('iframe', n)
      );
    };
    var insertFragment = function (el, fragment) {
      if (el.parentNode) {
        var r = document.createElement('div');
        return (
          (r.className = 'cp_embed_wrapper'),
          r.appendChild(fragment),
          el.parentNode.replaceChild(r, el),
          r
        );
      }
      return el.appendChild(fragment), el;
    };

    function embedInTarget(target) {
      target = 'string' == typeof target ? target : '.codepen';
      for (var t = document.querySelectorAll(target), i = 0; i < t.length; i++) {
        var el = t[i];
        var attrs = o(el);

        attrs && ((attrs.name = 'cp_embed_' + b++), h(attrs, el));
      }
      // "function" == typeof __CodePenIFrameAddedToPage && __CodePenIFrameAddedToPage()
    }

    embedInTarget(target);
  };

  export default {
    name: 'CodepenEmbed',

    props: {
      file: String,
      pen: Object,
    },

    computed: {
      version: get('app/version'),
      attrs () {
        return {
          'data-height': 500,
          'data-default-tab': 'html,result',
          'data-prefill': this.prefill,
          'data-editable': true,
          'data-class': this.file,
          'data-pen-title': this.file,
        }
      },
      prefill () {
        const json = {
          title: 'Hello',
          description: 'This is a description',
          html_classes: ['loading', 'no_js'],
          stylesheets: this.cssResources,
          scripts: this.jsResources,
        }

        return JSON.stringify(json, null, 0)
      },
      additionalResources () {
        const resources = this.pen.codepenResources || '{}'

        return Object.assign(
          { css: [], js: [] },
          JSON.parse(
            resources.replace(/(<codepen-resources.*?>|<\/codepen-resources>$)/g, ''),
          ),
        )
      },
      additionalScript () {
        const additional = this.pen.codepenAdditional || ''

        return additional
          .replace(/(<codepen-additional.*?>|<\/codepen-additional>$)/g, '')
          .replace(/\n {2}/g, '\n')
          .trim() + (additional ? '\n\n' : '')
      },
      cssResources () {
        return [
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
          'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
          'https://fonts.googleapis.com/css?family=Material+Icons',
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.css`,
        ]
      },
      editors () {
        const html = this.template && 0b100
        const css = this.style.content && 0b010
        const js = this.script && 0b001

        return (html | css | js).toString(2)
      },
      jsResources () {
        return [
          'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js',
          'https://unpkg.com/vue@next/dist/vue.global.js',
          `https://unpkg.com/vuetify@${this.version}/dist/vuetify.js`,
        ]
      },
      script () {
        const imports = /(import*) ([^'\n]*) from ([^\n]*)/g
        let component = /export default {([\s\S]*)}/g.exec(this.pen.script || '')

        component = ((component && component[1]) || '')
          .replace(/\n {2}/g, '\n')
          .trim()

        let script = /<script>([\s\S]*)export default {/g.exec(this.pen.script || '')

        script = ((script && script[1]) || '')
          .replace(imports, '')
          .replace(/\n {2}/g, '\n')
          .trim()

        script += script ? '\n\n' : ''

        return this.additionalScript + script +
          `const { createApp } = Vue
  const { createVuetify } = Vuetify

  const vuetify = createVuetify()

  const app = createApp({
    template: '#app-template',
    ${component}
  }).use(vuetify).mount('#app')`
      },
      style () {
        return {
          content: (this.pen.style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
          language: /<style.*lang=["'](.*)["'].*>/.exec(this.pen.style || ''),
        }
      },
      template () {
        const template = (this.pen.template || '')
          .replace(/(<template>|<\/template>$)/g, '')
          .replace(/\n/g, '\n  ')
          .trim()

        return `<script type="text/x-template" id="app-template">
    <v-app>
      ${template}
    </v-app>
  <\/script>

  <div id="app"></div>`
      }
    },

    mounted () {
      embed(this.$el, `#${this.file}`)
    }
  }
</script>
