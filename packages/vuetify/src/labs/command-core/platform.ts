export const IS_CLIENT = typeof window !== 'undefined';
export const IS_MAC = IS_CLIENT && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
