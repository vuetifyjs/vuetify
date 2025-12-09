<template>
  <v-app>
    <v-container>
      <!-- Prop: variant - Base variants -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: variant - Base Variants</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="display-large">display-large</v-typography>
            <v-typography variant="display-medium">display-medium</v-typography>
            <v-typography variant="display-small">display-small</v-typography>
            <v-typography variant="headline-large">headline-large</v-typography>
            <v-typography variant="headline-medium"
              >headline-medium</v-typography
            >
            <v-typography variant="headline-small">headline-small</v-typography>
            <v-typography variant="body-large">body-large</v-typography>
            <v-typography variant="body-medium"
              >body-medium (default)</v-typography
            >
            <v-typography variant="body-small">body-small</v-typography>
            <v-typography variant="label-large">label-large</v-typography>
            <v-typography variant="label-medium">label-medium</v-typography>
            <v-typography variant="label-small">label-small</v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: variant - Responsive variants -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: variant - Responsive Variants</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="body-small lg:body-large">
              body-small lg:body-large (change à ≥1280px)
            </v-typography>
            <v-typography
              variant="body-small md:headline-small xl:headline-large"
            >
              body-small md:headline-small xl:headline-large (multiple
              breakpoints)
            </v-typography>
            <v-typography variant="label-medium lg:label-large">
              label-medium lg:label-large
            </v-typography>
            <v-typography
              variant="body-medium sm:headline-small md:headline-medium lg:headline-large"
            >
              body-medium sm:headline-small md:headline-medium lg:headline-large
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: color -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: color</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="headline-medium" color="primary">
              color="primary"
            </v-typography>
            <v-typography variant="headline-medium" color="secondary">
              color="secondary"
            </v-typography>
            <v-typography variant="headline-medium" color="success">
              color="success"
            </v-typography>
            <v-typography variant="headline-medium" color="error">
              color="error"
            </v-typography>
            <v-typography variant="headline-medium" color="warning">
              color="warning"
            </v-typography>
            <v-typography variant="headline-medium" color="info">
              color="info"
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: customVariant -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: customVariant</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography
              variant="body-medium"
              :custom-variant="{ fontSize: '20px', fontWeight: 'bold' }"
            >
              customVariant avec fontSize et fontWeight
            </v-typography>
            <v-typography
              variant="body-medium"
              :custom-variant="{
                textDecoration: 'underline',
                fontStyle: 'italic',
              }"
            >
              customVariant avec textDecoration et fontStyle
            </v-typography>
            <v-typography
              variant="headline-small"
              :custom-variant="{
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }"
            >
              customVariant avec letterSpacing et textTransform
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: tag -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: tag</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="headline-large" tag="h1">
              tag="h1" (Heading 1)
            </v-typography>
            <v-typography variant="headline-medium" tag="h2">
              tag="h2" (Heading 2)
            </v-typography>
            <v-typography variant="headline-small" tag="h3">
              tag="h3" (Heading 3)
            </v-typography>
            <v-typography variant="body-large" tag="p">
              tag="p" (Paragraph)
            </v-typography>
            <v-typography variant="body-medium" tag="span">
              tag="span" (Span)
            </v-typography>
            <v-typography variant="label-large" tag="label">
              tag="label" (Label)
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: theme -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: theme</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="headline-medium" theme="light">
              theme="light"
            </v-typography>
            <v-typography variant="headline-medium" theme="dark">
              theme="dark"
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: class -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: class</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography variant="body-medium" class="text-center">
              class="text-center"
            </v-typography>
            <v-typography variant="body-medium" class="font-weight-bold">
              class="font-weight-bold"
            </v-typography>
            <v-typography variant="body-medium" class="text-uppercase">
              class="text-uppercase"
            </v-typography>
            <v-typography variant="body-medium" class="ma-4 pa-4">
              class="ma-4 pa-4" (margin et padding)
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Prop: style -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Prop: style</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography
              variant="body-medium"
              :style="{
                backgroundColor: '#e3f2fd',
                padding: '16px',
                borderRadius: '8px',
              }"
            >
              style avec backgroundColor, padding, borderRadius
            </v-typography>
            <v-typography
              variant="headline-small"
              :style="{ border: '2px solid #1976d2', padding: '12px' }"
            >
              style avec border et padding
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Combinaison de props -->
      <v-card class="pa-4 mb-4">
        <v-card-title>Combinaison de plusieurs props</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column ga-4">
            <v-typography
              variant="body-small lg:headline-large"
              color="primary"
              tag="h1"
              class="text-center"
            >
              variant responsive + color + tag + class
            </v-typography>
            <v-typography
              variant="body-medium"
              color="success"
              :custom-variant="{ fontWeight: 'bold' }"
              :style="{ padding: '16px', backgroundColor: '#f5f5f5' }"
            >
              variant + color + customVariant + style
            </v-typography>
            <v-typography
              variant="label-medium lg:label-large"
              tag="label"
              color="error"
              class="font-weight-bold"
            >
              Responsive variant + tag + color + class
            </v-typography>
          </div>
        </v-card-text>
      </v-card>

      <!-- Instructions -->
      <v-card class="pa-4">
        <v-card-title>Instructions</v-card-title>
        <v-card-text>
          <p>
            <strong>Breakpoints responsive :</strong>
          </p>
          <ul>
            <li><strong>sm</strong>: ≥ 600px</li>
            <li><strong>md</strong>: ≥ 960px</li>
            <li><strong>lg</strong>: ≥ 1280px</li>
            <li><strong>xl</strong>: ≥ 1920px</li>
            <li><strong>xxl</strong>: ≥ 2560px</li>
          </ul>
          <p class="mt-4">
            <strong>Props disponibles :</strong>
          </p>
          <ul>
            <li>
              <code>variant</code> - Variante de typographie (base ou
              responsive)
            </li>
            <li>
              <code>color</code> - Couleur du texte (primary, secondary, etc.)
            </li>
            <li>
              <code>customVariant</code> - Styles CSS personnalisés (Object)
            </li>
            <li>
              <code>tag</code> - Élément HTML à utiliser (h1, p, span, etc.)
            </li>
            <li><code>theme</code> - Thème à appliquer (light, dark)</li>
            <li><code>class</code> - Classes CSS supplémentaires</li>
            <li><code>style</code> - Styles inline (Object)</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Playground",
  setup() {
    return {
      //
    };
  },
};
</script>
