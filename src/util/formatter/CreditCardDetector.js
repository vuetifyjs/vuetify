'use strict'

const CreditCardDetector = {
  blocks: {
    uatp: [4, 5, 6],
    amex: [4, 6, 5],
    diners: [4, 6, 4],
    discover: [4, 4, 4, 4],
    mastercard: [4, 4, 4, 4],
    dankort: [4, 4, 4, 4],
    instapayment: [4, 4, 4, 4],
    jcb: [4, 4, 4, 4],
    maestro: [4, 4, 4, 4],
    visa: [4, 4, 4, 4],
    general: [4, 4, 4, 4],
    generalStrict: [4, 4, 4, 7]
  },

  re: {
    // starts with 1; 15 digits, not starts with 1800 (jcb card)
    uatp: /^(?!1800)1\d{0,14}/,

    // starts with 34/37; 15 digits
    amex: /^3[47]\d{0,13}/,

    // starts with 6011/65/644-649; 16 digits
    discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

    // starts with 300-305/309 or 36/38/39; 14 digits
    diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

    // starts with 51-55/22-27; 16 digits
    mastercard: /^(5[1-5]|2[2-7])\d{0,14}/,

    // starts with 5019/4175/4571; 16 digits
    dankort: /^(5019|4175|4571)\d{0,12}/,

    // starts with 637-639; 16 digits
    instapayment: /^63[7-9]\d{0,13}/,

    // starts with 2131/1800/35; 16 digits
    jcb: /^(?:2131|1800|35\d{0,2})\d{0,12}/,

    // starts with 50/56-58/6304/67; 16 digits
    maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

    // starts with 4; 16 digits
    visa: /^4\d{0,15}/
  },

  getInfo: function (value, strictMode) {
    const blocks = CreditCardDetector.blocks
    const re = CreditCardDetector.re

    // In theory, visa credit card can have up to 19 digits number.
    // Set strictMode to true will remove the 16 max-length restrain,
    // however, I never found any website validate card number like
    // this, hence probably you don't need to enable this option.
    strictMode = !!strictMode

    if (re.amex.test(value)) return { type: 'amex', blocks: blocks.amex }
    if (re.uatp.test(value)) return { type: 'uatp', blocks: blocks.uatp }
    if (re.diners.test(value)) return { type: 'diners', blocks: blocks.diners }
    if (re.discover.test(value)) return { type: 'discover', blocks: strictMode ? blocks.generalStrict : blocks.discover }
    if (re.mastercard.test(value)) return { type: 'mastercard', blocks: blocks.mastercard }
    if (re.dankort.test(value)) return { type: 'dankort', blocks: blocks.dankort }
    if (re.instapayment.test(value)) return { type: 'instapayment', blocks: blocks.instapayment }
    if (re.jcb.test(value)) return { type: 'jcb', blocks: blocks.jcb }
    if (re.maestro.test(value)) return { type: 'maestro', blocks: strictMode ? blocks.generalStrict : blocks.maestro }
    if (re.visa.test(value)) return { type: 'visa', blocks: strictMode ? blocks.generalStrict : blocks.visa }
    return { type: 'unknown', blocks: strictMode ? blocks.generalStrict : blocks.general }
  }
}

export default CreditCardDetector
