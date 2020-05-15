/**
 * @file LocationHelper.js
 * @description Math utility to calculate distances between events.
 */

/* eslint-disable import/prefer-default-export */
/**
 * Tests whether an event is within a given radius of
 * a user.
 * @param {Number} userLat Latitude of origin
 * @param {Number} userLong Longitude of origin
 * @param {Number} radius Radius of circle defining
 * 'nearby events'
 * @param {Number} eventLat Latitude of event to test against
 * @param {Number} eventLong Longitude of event to test against
 * @returns {Boolean} If new event is the in defined radius
 */
export function isInRadius(userLoc, radius, eventLoc) {
  let distance = 0;

  const radlat1 = Math.PI * userLoc.LAT / 180;
  const radlat2 = Math.PI * eventLoc.LAT / 180;
  const theta = userLoc.LONG - eventLoc.LONG;
  const radtheta = Math.PI * theta / 180;

  distance = Math.sin(radlat1) * Math.sin(radlat2)
             + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (distance > 1) { distance = 1; }
  distance = Math.acos(distance);
  distance = distance * 180 / Math.PI;
  distance = distance * 60 * 1.1515;

  return (distance <= radius);
}
