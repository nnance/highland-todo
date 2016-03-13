/**
 * @file    ToDo Transformations using Highland.js
 * @author  Nick Nance
 */
"use strict"

const _ = require("highland")

/**
 * Private functions
 */

/**
 * a comparator to sort a set of objects by dueDate
 * @param  {object} a first object to compare
 * @param  {object} b second object to compare
 * @return {int}      sort indicator
 */
function sortDate(a, b) {
  if (a.dueDate < b.dueDate) {
    return -1 // eslint-disable-line no-magic-numbers
  } else if (a.dueDate > b.dueDate) {
    return 1
  } else {
    return 0
  }
}

/**
 * Public functions
 */

/**
 * remove the completed objects from the stream
 * @param  {object} stream Highlandjs stream
 * @return {object}        Highlandjs stream
 */
function filterComplete(stream) {
  return stream.where({complete: false})
}

/**
 * sort the objects from a stream by dueDate ascending
 * @param  {object} stream Highlandjs stream
 * @return {object}        Highlandjs stream
 */
function sortByDueDate(stream) {
  return stream.sortBy(sortDate)
}

/**
* sort the objects from a stream by dueDate descending
* @param  {object} stream Highlandjs stream
* @return {object}        Highlandjs stream
*/
function sortByDueDateDesc(stream) {
  return stream.sortBy(_.flip(sortDate))
}

/**
* group the objects from a stream by username.  the result will be a single
* object with a property name for each user with an array of the associated
* objects
* @param  {object} stream Highlandjs stream
* @return {object}        Highlandjs stream
*/
function groupByUser(stream) {
  return stream.group("username")
}

/**
* highlevel functions that executes a list of transformations to return the
* results required by the application
* @param  {object} stream Highlandjs stream
* @return {object}        Highlandjs stream
*/
const activeByUser = _.pipeline(
  filterComplete,
  sortByDueDateDesc,
  groupByUser
)

module.exports = {
  filterComplete,
  sortByDueDate,
  groupByUser,
  activeByUser
}
