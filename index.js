"use strict"

const _ = require("highland")

function filterComplete(stream) {
  return stream.where({complete: false})
}

function sortDate(a, b) {
  if (a.dueDate < b.dueDate) {
    return -1
  } else if (a.dueDate > b.dueDate) {
    return 1
  } else {
    return 0
  }
}

function sortByDueDate(stream) {
  return stream.sortBy(sortDate)
}

function sortByDueDateDesc(stream) {
  return stream.sortBy(_.flip(sortDate))
}

function groupByUser(stream) {
  return stream.group("username")
}

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
