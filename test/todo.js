"use strict"

/* eslint-disable max-nested-callbacks */
const expect = require("chai").expect
const _ = require("highland")
const api = require("../index")

const data = [
  {
    subject: "Read about functional programming",
    complete: false
  },
  {
    subject: "Try out the Node Stream Adventure",
    complete: false
  },
  {
    subject: "Build Todo app based on Highland js",
    complete: true
  }
]

describe("Functional Todo app", () => {
  describe("When filtering incomplete items", () => {
    it("should return 2 items", (done) => {
      _(data).pipe(api.filterToDos).toArray((x) => {
        expect(x.length).to.equal(2)
        done()
      })
    })
  })
})
