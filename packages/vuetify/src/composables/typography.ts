// composables/typography.ts
import { computed, inject, ref, watchEffect } from "vue";
import type { App, InjectionKey, Ref } from "vue";
import { mergeDeep } from "@/util";
import { IN_BROWSER } from "@/util/globals";

export const defaultTypography = {
  "display-large": {
    fontSize: "57px",
    lineHeight: "64px",
    fontWeight: 400,
    letterSpacing: "-0.25px",
  },

  "display-medium": {
    fontSize: "45px",
    lineHeight: "52px",
    fontWeight: 400,
    letterSpacing: "0px",
  },

  "display-small": {
    fontSize: "36px",
    lineHeight: "44px",
    fontWeight: 400,
    letterSpacing: "0px",
  },

  "headline-large": {
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: 400,
    letterSpacing: "0px",
  },

  "headline-medium": {
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: 400,
    letterSpacing: "0px",
  },

  "headline-small": {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 400,
    letterSpacing: "0px",
  },

  "body-large": {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 400,
    letterSpacing: "0.5px",
  },

  "body-medium": {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 400,
    letterSpacing: "0.25px",
  },
  "body-small": {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400,
    letterSpacing: "0.4px",
  },
  "label-large": {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 500,
    letterSpacing: "0.1px",
  },
  "label-medium": {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
  "label-small": {
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
  "custom-variant": {
    fontSize: "99px",
    lineHeight: "100px",
    fontWeight: 900,
    letterSpacing: "1px",
  },
} as const;

export type TypographyVariant = keyof typeof defaultTypography;
export type TypographyStyle = (typeof defaultTypography)[TypographyVariant];
export type TypographyOptions = Partial<
  Record<TypographyVariant, Partial<TypographyStyle>>
>;

export const TYPOGRAPHY_BREAKPOINTS = ["sm", "md", "lg", "xl", "xxl"] as const;
export type TypographyBreakpoint = (typeof TYPOGRAPHY_BREAKPOINTS)[number];

const DISPLAY_MIN_WIDTH: Record<TypographyBreakpoint, number> = {
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
};

const TYPOGRAPHY_STYLESHEET_ID = "vuetify-typography-stylesheet";

function toKebabCase(value: string) {
  return value.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function stringifyStyle(style: TypographyStyle) {
  return Object.entries(style)
    .map(([key, val]) => `${toKebabCase(key)}: ${val}`)
    .join("; ");
}

function escapeClass(value: string) {
  return value.replace(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}

function genTypographyCss(
  definitions: Record<TypographyVariant, TypographyStyle>,
) {
  const lines: string[] = [
    ".v-typography{display:block;line-height:1.5;text-decoration:none;text-transform:none;margin:0;padding:0;}",
  ];

  for (const [variant, style] of Object.entries(definitions)) {
    lines.push(
      `.v-typography.${escapeClass(variant)}{${stringifyStyle(style as TypographyStyle)}}`,
    );
  }

  for (const [breakpoint, width] of Object.entries(DISPLAY_MIN_WIDTH)) {
    lines.push(`@media (min-width: ${width}px){`);
    for (const [variant, style] of Object.entries(definitions)) {
      lines.push(
        `.v-typography.${escapeClass(`${breakpoint}:${variant}`)}{${stringifyStyle(style as TypographyStyle)}}`,
      );
    }
    lines.push("}");
  }

  return lines.join("\n");
}

function upsertTypographyStyles(styles: string) {
  if (!IN_BROWSER) return;

  let styleEl = document.getElementById(
    TYPOGRAPHY_STYLESHEET_ID,
  ) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.id = TYPOGRAPHY_STYLESHEET_ID;
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = styles;
}

export interface TypographyInstance {
  styles: Ref<Record<TypographyVariant, TypographyStyle>>;
  css: Readonly<Ref<string>>;
  getStyle: (variant: TypographyVariant) => TypographyStyle;
}

export const TypographySymbol: InjectionKey<TypographyInstance> =
  Symbol.for("vuetify:typography");

export function createTypography(
  config?: TypographyOptions,
): TypographyInstance & { install: (app: App) => void } {
  const styles = ref(
    mergeDeep({ ...defaultTypography }, config ?? {}) as Record<
      TypographyVariant,
      TypographyStyle
    >,
  );
  const css = computed(() => genTypographyCss(styles.value));

  watchEffect(() => {
    upsertTypographyStyles(css.value);
  });

  const instance: TypographyInstance = {
    styles,
    css,
    getStyle: (variant) => styles.value[variant],
  };

  function install(app: App) {
    app.provide(TypographySymbol, instance);
  }

  return { ...instance, install };
}

export function useTypography(): TypographyInstance {
  const typography = inject(TypographySymbol, null);
  if (!typography) {
    throw new Error(
      "[Vuetify] useTypography() must be used after createTypography() has been called",
    );
  }

  return typography;
}
