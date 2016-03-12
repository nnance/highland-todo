"use strict"

/* eslint-disable max-nested-callbacks */
const expect = require("chai").expect
const _ = require("highland")
const api = require("../index")

const data = [
  {
    username: "batman",
    subject: "Read about functional programming",
    dueDate: "01/01/2016",
    complete: false
  },
  {
    username: "batman",
    subject: "Try out the Node Stream Adventure",
    dueDate: "01/15/2016",
    complete: false
  },
  {
    username: "robin",
    subject: "Build Todo app based on Highland js",
    dueDate: "02/01/2016",
    complete: true
  },
  {
    username: "robin",
    subject: "Build GraphQL server for Star Wars API",
    dueDate: "03/01/2016",
    complete: false
  }
]
const incompleteCount = 3

describe("Functional Todo app", () => {
  describe("When filtering incomplete items", () => {
    let results
    before((done) => {
      _(data).through(api.filterComplete).toArray((x) => {
        results = x
        done()
      })
    })
    it("should return 3 items", () => {
      expect(results.length).to.equal(incompleteCount)
    })
  })

  describe("When sorting items", () => {
    let results
    before((done) => {
      _(data).through(api.sortByDueDate).toArray((x) => {
        results = x
        done()
      })
    })
    it("should be sorted in descending order", () => {
      expect(results[0].dueDate).to.equal("03/01/2016")
    })
  })

  describe("When grouping items by username", () => {
    let results
    before((done) => {
      _(data).through(api.groupByUser).apply((x) => {
        results = x
        done()
      })
    })
    it("should have a property for each user", () => {
      expect(Object.keys(results).length).to.equal(2)
    })
  })

  describe("After organizing items", () => {
    let results
    before((done) => {
      _(data).pipe(api.filterToDos).apply((x) => {
        results = x
        done()
      })
    })
    it("should return 2 items for batman", () => {
      expect(results.batman.length).to.equal(2)
    })
    it("should return 1 item for robin", () => {
      expect(results.robin.length).to.equal(1)
    })
    it("should be sorted in descending order", () => {
      expect(results.batman[0].dueDate).to.equal("01/15/2016")
    })
  })
})
