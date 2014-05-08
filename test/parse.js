
var util = require('util')
  , lino = require('../')
  , assert = require('assert')

function opts () {
  return { encoding:'utf8' }
}

module.exports = function (t, input, wanted) {
  var parser = lino(opts())
    , actual = []
    , n = 0
  parser.on('readable', function () {
    var chunk
    while (null !== (chunk = parser.read())) {
      t.is(chunk, wanted[n++])
      actual.push(chunk)
    }
  })
  parser.on('end', function () {
    t.deepEqual(actual, wanted)
    t.end()
  })
  parser.write(input)
  parser.end()
}
