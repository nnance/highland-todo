"use strict"

/* eslint-disable max-nested-callbacks */
const expect = require("chai").expect
const _ = require("highland")
const api = require("../index")

const data = [
  {
    subject: "Read about functional programming",
    dueDate: "01/01/2016",
    complete: false
  },
  {
    subject: "Try out the Node Stream Adventure",
    dueDate: "02/01/2016",
    complete: false
  },
  {
    subject: "Build Todo app based on Highland js",
    dueDate: "01/15/2016",
    complete: true
  }
]

describe("Functional Todo app", () => {
  describe("When filtering incomplete items", () => {
    let results
    before((done) => {
      _(data).pipe(api.filterToDos).toArray((x) => {
        results = x
        done()
      })
    })
    it("should return 2 items", () => {
      expect(results.length).to.equal(2)
    })
    it("should be sorted in descending order", () => {
      expect(results[0].dueDate).to.equal("02/01/2016")
    })
  })
})
