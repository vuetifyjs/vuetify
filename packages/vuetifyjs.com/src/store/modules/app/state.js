import components from '@/data/components'
import deprecatedIn from '@/data/deprecatedIn'
import newIn from '@/data/newIn'
import removed from '@/data/removed'

const docPage = [
  {
    text: 'Generic.Pages.introduction',
    href: 'introduction'
  },
  {
    text: 'Generic.Pages.usage',
    href: 'usage'
  },
  {
    text: 'Generic.Pages.api',
    href: 'api'
  },
  {
    text: 'Generic.Pages.supplemental',
    href: 'supplemental'
  },
  {
    text: 'Generic.Pages.examples',
    href: 'examples'
  }
]

export default () => ({
  appDrawer: null,
  appFooter: true,
  appSnackbar: {
    color: 'success',
    href: false,
    msg: '',
    text: 'Close',
    to: false,
    timeout: 6000
  },
  appToolbar: null,
  components,
  currentVersion: null,
  deprecatedIn,
  isFullscreen: false,
  loadedLangs: [],
  newIn,
  releases: [],
  removed,
  stateless: false,
  tablesOfContents: {
    Components: {
      Doc: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.usage',
          href: 'usage'
        },
        {
          text: 'Generic.Pages.api',
          href: 'api'
        },
        {
          text: 'Generic.Pages.supplemental',
          href: 'supplemental'
        },
        {
          text: 'Generic.Pages.examples',
          href: 'examples'
        }
      ]
    },
    GettingStarted: {
      QuickStart: [
        {
          text: 'GettingStarted.QuickStart.header',
          href: 'introduction'
        },
        {
          text: 'GettingStarted.QuickStart.browserHeader',
          href: 'supported-browsers'
        },
        {
          text: 'GettingStarted.QuickStart.vueCliHeader',
          href: 'vue-cli-3'
        },
        {
          text: 'GettingStarted.QuickStart.cdnHeader',
          href: 'cdn-install'
        },
        {
          text: 'GettingStarted.QuickStart.newHeader',
          href: 'new-applications'
        },
        {
          text: 'GettingStarted.QuickStart.existingHeader',
          href: 'existing-applications'
        },
        {
          text: 'GettingStarted.QuickStart.ie11Header',
          href: 'ie11-support'
        }
      ],
      WhyVuetify: [
        {
          text: 'GettingStarted.WhyVuetify.header',
          href: 'introduction'
        },
        {
          text: 'GettingStarted.WhyVuetify.designHeader',
          href: 'design-principles'
        },
        {
          text: 'GettingStarted.WhyVuetify.communityHeader',
          href: 'active-help'
        },
        {
          text: 'GettingStarted.WhyVuetify.comparisonHeader',
          href: 'comparison-to-other-frameworks'
        }
      ],
      Contributing: [
        {
          text: 'GettingStarted.Contributing.header',
          href: 'introduction'
        },
        {
          text: 'GettingStarted.Contributing.issuesHeader',
          href: 'reporting-issues'
        },
        {
          text: 'GettingStarted.Contributing.pullRequestsHeader',
          href: 'pull-requests'
        },
        {
          text: 'GettingStarted.Contributing.localDevHeader',
          href: 'setup-local-dev'
        }
      ]
    },
    Framework: {
      Icons: [
        {
          text: 'Framework.Icons.header',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.usage',
          href: 'usage'
        },
        {
          text: 'Framework.Icons.installHeader',
          href: 'installing-fonts'
        },
        {
          text: 'Framework.Icons.customIconsHeader',
          href: 'using-custom-icons'
        },
        {
          text: 'Framework.Icons.reusableHeader',
          href: 'reusable-custom-icons'
        },
        {
          text: 'Framework.Icons.customComponentHeader',
          href: 'custom-components'
        }
      ],
      Internationalization: [
        {
          text: 'Framework.Internationalization.header',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.api',
          href: 'api'
        },
        {
          text: 'Framework.Internationalization.gettingStarted',
          href: 'getting-started'
        },
        {
          text: 'Framework.Internationalization.createTranslation',
          href: 'create-translation'
        },
        {
          text: 'Framework.Internationalization.customComponents',
          href: 'custom-components'
        },
        {
          text: 'Framework.Internationalization.vueI18nHeader',
          href: 'vue-i18n'
        },
        {
          text: 'Framework.Internationalization.rtlHeader',
          href: 'rtl'
        }
      ]
    },
    Layout: {
      PreDefined: [
        {
          text: 'Layout.PreDefined.header',
          href: 'introduction'
        },
        {
          text: 'Layout.PreDefined.markupHeader',
          href: 'default-application-markup'
        },
        {
          text: 'Layout.PreDefined.appHeader',
          href: 'all-about-app'
        }
      ],
      Grid: docPage,
      GridLists: docPage,
      Breakpoints: [
        {
          text: 'Layout.Breakpoints.header',
          href: 'introduction'
        },
        {
          text: 'Layout.Breakpoints.breakpointHeader',
          href: 'breakpoint-object'
        }
      ],
      Alignment: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.examples',
          href: 'examples'
        }
      ],
      Display: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Layout.Display.visibilityHeader',
          href: 'visibility'
        },
        {
          text: 'Layout.Display.overflowHeader',
          href: 'overflow'
        },
        {
          text: 'Layout.Display.displayHeader',
          href: 'display'
        },
        {
          text: 'Generic.Pages.examples',
          href: 'examples'
        }
      ],
      Elevation: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Layout.Elevation.playgroundHeader',
          href: 'playground'
        }
      ],
      Spacing: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Layout.Spacing.playgroundHeader',
          href: 'playground'
        },
        {
          text: 'Generic.Pages.howItWorks',
          href: 'how-it-works'
        }
      ]
    },
    Motion: {
      Scrolling: [
        {
          text: 'Motion.Scrolling.header',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.usage',
          href: 'usage'
        },
        {
          text: 'Generic.Pages.api',
          href: 'api'
        }
      ],
      Transitions: [
        {
          text: 'Motion.Transitions.header',
          href: 'introduction'
        },
        {
          text: 'Generic.Pages.examples',
          href: 'examples'
        },
        {
          text: 'Motion.Transitions.createYourOwnHeader',
          href: 'create-your-own'
        }
      ]
    },
    Guides: {
      ALaCarte: [
        {
          text: 'Guides.ALaCarte.header',
          href: 'introduction'
        },
        {
          text: 'Guides.ALaCarte.importHeader',
          href: 'importing-components'
        },
        {
          text: 'Guides.ALaCarte.styleHeader',
          href: 'required-styles'
        },
        {
          text: 'Guides.ALaCarte.loaderHeader',
          href: 'vuetify-loader'
        }
      ],
      SSR: [
        {
          text: 'Guides.ServerSideRendering.header',
          href: 'introduction'
        },
        {
          text: 'Guides.ServerSideRendering.structureHeader',
          href: 'structure'
        },
        {
          text: 'Guides.ServerSideRendering.applicationHeader',
          href: 'application'
        },
        {
          text: 'Guides.ServerSideRendering.routingHeader',
          href: 'routing'
        },
        {
          text: 'Guides.ServerSideRendering.stateControlHeader',
          href: 'state-control'
        },
        {
          text: 'Guides.ServerSideRendering.metaDataHeader',
          href: 'meta-data'
        },
        {
          text: 'Guides.ServerSideRendering.redirectsHeader',
          href: 'redirects'
        },
        {
          text: 'Guides.ServerSideRendering.webAppSupportHeader',
          href: 'web-app-support'
        }
      ],
      VueCli3: [
        {
          text: 'Overview',
          href: 'introduction'
        },
        {
          text: 'Get Started',
          href: 'get-started'
        }
      ],
      Internationalization: [
        {
          text: 'Generic.Pages.api',
          href: 'api'
        },
        {
          text: 'Guides.Internationalization.gettingStarted',
          href: 'usage'
        },
        {
          text: 'Guides.Internationalization.createTranslation',
          href: 'translation'
        },
        {
          text: 'Guides.Internationalization.customComponents',
          href: 'custom'
        }
      ]
    },
    Style: {
      Colors: [
        {
          text: 'Generic.Pages.introduction',
          href: 'introduction'
        },
        {
          text: 'Style.Colors.classesHeader',
          href: 'classes'
        },
        {
          text: 'Style.Colors.javascriptPackHeader',
          href: 'javascript-color-pack'
        },
        {
          text: 'Style.Colors.stylusPackHeader',
          href: 'stylus-color-pack'
        },
        {
          text: 'Style.Colors.colorHeader',
          href: 'material-colors'
        }
      ],
      Theme: [
        {
          text: 'Style.Theme.header',
          href: 'introduction'
        },
        {
          text: 'Additional.Generator.header',
          href: 'theme-generator'
        },
        {
          text: 'Style.Theme.lightAndDarkHeader',
          href: 'light-and-dark'
        },
        {
          text: 'Style.Theme.customizingHeader',
          href: 'customizing'
        },
        {
          text: 'Style.Theme.optionHeader',
          href: 'options'
        },
        {
          text: 'Style.Theme.stylusHeader',
          href: 'stylus-guide'
        }
      ],
      Typography: [
        {
          text: 'Style.Typography.fontHeader',
          href: 'font-sizes'
        },
        {
          text: 'Style.Typography.weightsHeader',
          href: 'font-weights'
        },
        {
          text: 'Style.Typography.transformHeader',
          href: 'text-transforms'
        },
        {
          text: 'Style.Typography.wrapHeader',
          href: 'text-wrapping'
        }
      ],
      Content: [
        {
          text: 'Style.Content.header',
          href: 'introduction'
        },
        {
          text: 'Style.Content.blockquoteHeader',
          href: 'block-quote'
        },
        {
          text: 'Style.Content.paragraphsHeader',
          href: 'paragraphs'
        },
        {
          text: 'Style.Content.codeHeader',
          href: 'code'
        },
        {
          text: 'Style.Content.variablesHeader',
          href: 'variables'
        },
        {
          text: 'Style.Content.userInputHeader',
          href: 'user-input'
        }
      ]
    }
  }
})
