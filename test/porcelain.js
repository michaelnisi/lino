
var test = require('tap').test
  , fs = require('fs')
  , parse = require('./parse')

function input () {
  return '?? test/parse.js\n?? test/porcelain\n'
}

function wanted () {
  return [
    '?? test/parse.js\n'
  , '?? test/porcelain\n'
  ]
}

test('porcelain', function (t) {
  parse(t, input(), wanted())
})
