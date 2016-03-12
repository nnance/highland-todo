"use strict"

const _ = require("highland")

const incomplete = function (obj) {
  return obj.complete === false
}

const filterToDos = _.pipeline((s) => {
  return s.filter(incomplete)
})

module.exports = {
  filterToDos
}
