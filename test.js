'use strict'

var test = require('tape')

test('parallel', function (t) {
  t.plan(4)

  var Ear = require('./')
  var listeners = Ear()

  var second = false
  listeners.add(function (a, b, callback) {
    t.equal(a, 1)
    t.equal(b, 2)
    process.nextTick(function () {
      t.ok(second)
      callback()
    })
  })

  listeners.add(function (a, b, callback) {
    second = true
    callback()
  })

  listeners(1, 2, function (err) {
    if (err) return t.end(err)
    t.ok(second)
  })
})

test('series', function (t) {
  t.plan(4)

  var Ear = require('./series')
  var listeners = Ear()

  var second = false
  listeners.add(function (a, b, callback) {
    t.equal(a, 1)
    t.equal(b, 2)
    process.nextTick(function () {
      t.notOk(second)
      callback()
    })
  })

  listeners.add(function (a, b, callback) {
    second = true
    callback()
  })

  listeners(1, 2, function (err) {
    if (err) return t.end(err)
    t.ok(second)
  })
})
