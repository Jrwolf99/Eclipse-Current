const objectTransform = function (Object, x, y, radians) {
  Object.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate3d(0, 0, 1, ${rad2Deg(
    radians
  )}deg)`;
};

const findRingRadius = () => {
  return document.querySelector(".ring").clientWidth / 2 - 75;
};

const isOutsideRing = (currXYCoords) => {
  const objectRadius = findMagnitude(currXYCoords);
  if (objectRadius > findRingRadius()) {
    return true;
  }
  return false;
};

const backUpElement = (currXYCoords) => {
  let currPolarCoords = rect2Polar(currXYCoords[0], currXYCoords[1]);
  return polar2Rect(currPolarCoords[0], currPolarCoords[1] - 10);
};

var deg2Rad = function (degree) {
  var radian = (degree * Math.PI) / 180;
  return radian;
};

var rad2Deg = function (radians) {
  var degree = (radians * 180) / Math.PI;
  return degree;
};

const findMagnitude = function (vector) {
  let magnitudeVector = Math.sqrt(
    Math.pow(vector[0], 2) + Math.pow(vector[1], 2)
  );
  return magnitudeVector;
};

/**
 * This is a function that finds the x-coordinate
 * @param {string} input CSS Translate3d() format.
 * @returns a number which is the extracted x-coordinate
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
 * @param {string} input CSS Translate3d() format.
 * @returns a number which is the extracted y-coordinate
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

const rect2Polar = function (x, y) {
  var radianTheta = Math.atan2(y, x);
  var radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var arr = new Array(radianTheta, radius);
  return arr;
};

const polar2Rect = function (radianTheta, radius) {
  var x = Math.cos(radianTheta) * radius;
  var y = Math.sin(radianTheta) * radius;
  var arr = new Array(x, y);
  return arr;
};
