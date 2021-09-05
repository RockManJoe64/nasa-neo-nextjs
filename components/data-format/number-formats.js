import numeral from "numeral"

/**
 * Formats a distance in km to a predefined precision
 * 
 * @param {string} distance 
 */
export function toDistance(distance) {
  var num = numeral(distance)

  return num.format('0,0.0')
}

/**
 * Formats a diameter in km to a predefined precision
 * 
 * @param {number} value 
 */
export function toDiameter(value) {
  var num = numeral(value)

  return value < 1 ? num.format('0,0.00[0000]') : num.format('0,0.0000')
}

/**
 * Formats a velocity in km to a predefined precision
 * 
 * @param {number} value 
 */
export function toVelocity(value) {
  var num = numeral(value)

  return num.format('0,0.0000')
}
