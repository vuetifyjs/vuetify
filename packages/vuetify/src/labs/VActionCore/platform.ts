/**
 * @file platform.ts Utility constants for platform detection.
 */

function detectOS() {
  // Try modern API first
  // @ts-ignore https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
  if (navigator.userAgentData && navigator.userAgentData.platform) {
    // @ts-ignore https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
    return navigator.userAgentData.platform;
  }
  // Fallback to deprecated platform
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
  if (navigator.platform) {
    const platform = navigator.platform.toLowerCase();
    if (platform.startsWith('win')) return 'Windows';
    if (platform.startsWith('mac')) return 'macOS';
    if (platform.startsWith('linux')) return 'Linux';
    // Add more cases as needed
    return platform;
  }
  // Fallback to userAgent parsing
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'Windows';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (/android/.test(ua)) return 'Android';
  if (/iphone|ipad|ipod/.test(ua)) return 'iOS';
  return 'unknown';
}


/**
 * Indicates if the code is running in a browser environment where `window` is defined.
 * @type {boolean}
 */
export const IS_CLIENT = typeof window !== 'undefined'

/**
 * Indicates if the client platform is macOS.
 * This is determined by checking `navigator.platform` and is only relevant if `IS_CLIENT` is true.
 * @type {boolean}
 */
export const IS_MAC = IS_CLIENT && ['iOS', 'macOS'].includes(detectOS())
