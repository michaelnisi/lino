var test = require('tap').test
var parse = require('./parse')

function input () {
  return 'No new line'
}

function wanted () {
  return [
    'No new line'
  ]
}

test('porcelain', function (t) {
  parse(t, input(), wanted())
})
