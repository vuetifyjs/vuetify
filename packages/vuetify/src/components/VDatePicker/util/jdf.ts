/**  Gregorian & Jalali (Hijri_Shamsi,Solar) Date Converter Functions
Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
License: GNU/LGPL _ Open Source & Free :: Version: 2.80 : [2020=1399]
---------------------------------------------------------------------
355746=361590-5844 & 361590=(30*33*365)+(30*8) & 5844=(16*365)+(16/4)
355666=355746-79-1 & 355668=355746-79+1 &  1595=605+990 &  605=621-16
990=30*33 & 12053=(365*33)+(32/4) & 36524=(365*100)+(100/4)-(100/100)
1461=(365*4)+(4/4) & 146097=(365*400)+(400/4)-(400/100)+(400/400)  */

export const jalaliToGregorian = (jy: number, jm: number, jd: number) => {
  var salA, gy, gm, gd, days
  jy += 1595
  days = -355668 + (365 * jy) + (parseInt(jy / 33) * 8) +
    parseInt(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186)
  gy = 400 * parseInt(days / 146097)
  days %= 146097
  if (days > 36524) {
    gy += 100 * parseInt(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }
  gy += 4 * parseInt(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += parseInt((days - 1) / 365)
    days = (days - 1) % 365
  }
  gd = days + 1
  salA = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (gm = 0; gm < 13 && gd > salA[gm]; gm++) gd -= salA[gm]
  return [gy, gm, gd]
}

export const gregorianToJalali = (gy: number, gm: number, gd: number) => {
  var gDM, jy, jm, jd, gy2, days
  gDM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  gy2 = (gm > 2) ? (gy + 1) : gy
  days = 355666 + (365 * gy) + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) + parseInt((gy2 + 399) / 400) + gd + gDM[gm - 1]
  jy = -1595 + (33 * parseInt(days / 12053))
  days %= 12053
  jy += 4 * parseInt(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += parseInt((days - 1) / 365)
    days = (days - 1) % 365
  }
  if (days < 186) {
    jm = 1 + parseInt(days / 31)
    jd = 1 + (days % 31)
  } else {
    jm = 7 + parseInt((days - 186) / 30)
    jd = 1 + ((days - 186) % 30)
  }
  return [jy, jm, jd]
}
