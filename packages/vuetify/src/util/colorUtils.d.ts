++ packages/vuetify/src/util/colorUtils.d.ts
// Type definitions for colorUtils.mjs

export declare function contrastRatio(foreground: string, background: string): number;
export declare function getLuminance(color: string): number;
export declare function lighten(color: string, amount: number): string;
export declare function darken(color: string, amount: number): string;
export declare function fade(color: string, amount: number): string;
export declare function isDark(color: string): boolean;
export declare function isLight(color: string): boolean;
