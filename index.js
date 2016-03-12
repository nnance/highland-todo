"use strict"

const _ = require("highland")

function filterComplete(stream) {
  return stream.filter((obj) => obj.complete === false)
}

function sortByDueDate(stream) {

  return stream.sortBy(_.flip(sortDate))

  function sortDate(a, b) {
    if (a.dueDate < b.dueDate) {
      return -1
    } else if (a.dueDate > b.dueDate) {
      return 1
    } else {
      return 0
    }
  }
}

function groupByUser(stream) {
  return stream.group("username")
}

const filterToDos = _.pipeline(
  filterComplete,
  sortByDueDate,
  groupByUser
)

module.exports = {
  filterComplete,
  sortByDueDate,
  groupByUser,
  filterToDos
}
