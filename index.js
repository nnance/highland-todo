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
const filterComplete = _.where({complete: false})
const sortByDueDate = _.sortBy(sortDate)
const sortByDueDateDesc = _.sortBy(_.flip(sortDate))
const groupByUser = _.group("username")
const importantFields = _.pick(["title", "dueDate"])

const activeByUser = _.pipeline(
  filterComplete,
  sortByDueDateDesc,
  groupByUser
)

const listAllSortedByDate = _.pipeline(
  sortByDueDateDesc,
  importantFields
)

module.exports = {
  filterComplete,
  sortByDueDate,
  groupByUser,
  activeByUser,
  listAllSortedByDate
}
