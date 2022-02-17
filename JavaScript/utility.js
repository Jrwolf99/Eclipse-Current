const objectTransform = function (Object, x, y, deg) {
  Object.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate3d(0, 0, 1, ${deg}deg)`;
};

var deg2Rad = function (degree) {
  var radian = (degree * Math.PI) / 180;
  return radian;
};

var rad2Deg = function (radians) {
  var degree = (radians * 180) / Math.PI;
  return degree;
};

/**
 * This is a function that finds the x-coordinate
 * of the current ball on the screen.
 * @param {string} input CSS Translate3d() format.
 * @returns a number which is the extracted x
 * coordinate for the ball.
 */
const getXCoordinateValueFromTranslate3D = function (input) {
  let output = input.toString();
  let startIndex;
  let endIndex;
  startIndex = output.indexOf("(");
  endIndex = output.indexOf("p");
  output = output.substr(startIndex + 1, endIndex - startIndex - 1);
  return parseInt(output);
};

/**
 * This is a function that finds the y-coordinate
 * of the current ball on the screen.
 * @param {string} input CSS Translate3d() format.
 * @returns a number which is the extracted y
 * coordinate for the ball.
 */
const getYCoordinateValueFromTranslate3D = function (input) {
  let output = input.toString();
  let startIndex;
  let endIndex;
  startIndex = output.indexOf(",") + 1;
  endIndex = output.indexOf("p", startIndex);
  output = output.substr(startIndex, endIndex - startIndex);
  return parseInt(output);
};

/**
 * This is a function that converts cartesian
 * to polar.
 * @param {number} x x-coordinate to convert.
 * @param {number} y y-coordinate to convert.
 * @returns this returns an array with theta (in radians)
 *  of the coordinate and radius of the coordinate.
 */
const rect2Polar = function (x, y) {
  var radianTheta = Math.atan2(y, x);
  var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var arr = new Array(radianTheta, radius);
  return arr;
};
/**
 * This function converts polar coordinates to cartesian.
 * @param {number} radianTheta This is the theta of coordinate in radians.
 * @param {number} radius This is the radius of the coordinate.
 * @returns This returns an array with the x and y coordinates of the point inputed
 */
const polar2Rect = function (radianTheta, radius) {
  var x = Math.cos(radianTheta) * radius;
  var y = Math.sin(radianTheta) * radius;
  var arr = new Array(x, y);
  return arr;
};
