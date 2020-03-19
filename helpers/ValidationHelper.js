/**
 * @file ValidationHelper.js
 * @description Functions to help validate data from
 * the client.
 * @author Duncan Grubbs
 */

// TODO: add more valid fields
const USER_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'age',
];
const EVENT_FIELDS = [
  'title',
  'description',
];

/**
 * Ensures fields and values array lengths are the
 * same and that they only contain string values.
 * @param {Array} fields Array of fields to validate.
 * @param {Array} values Array of values to validate
 */
function basicValidator(fields, values) {
  if (fields.length !== values.length) { return false; }
  for (let i = 0; i < fields.length; i += 1) {
    if (typeof fields[i] !== 'string') { return false; }
    if (typeof values[i] !== 'string') { return false; }
  }
  return true;
}

/**
 * Validates USER fields and values that are
 * requested to be updated
 * @param {Array} fields Fields to validate.
 * @param {Array} values Values to validate.
 */
export function validateUserFAV(fields, values) {
  if (!basicValidator(fields, values)) { return false; }

  for (let i = 0; i < fields.length; i += 1) {
    if (!USER_FIELDS.includes(fields[i])) { return false; }
  }
  return true;
}

/**
 * Validates EVENT fields and values that are
 * requested to be updated
 * @param {Array} fields Fields to validate.
 * @param {Array} values Values to validate.
 */
export function validateEventFAV(fields, values) {
  if (!basicValidator(fields, values)) { return false; }

  for (let i = 0; i < fields.length; i += 1) {
    if (!EVENT_FIELDS.includes(fields[i])) { return false; }
  }
  return true;
}
