var lino = require('../')

function opts () {
  return { encoding: 'utf8' }
}

module.exports = function (t, input, wanted) {
  var parser = lino(opts())
  var actual = []
  var n = 0
  parser.on('readable', function () {
    var chunk
    while ((chunk = parser.read()) !== null) {
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
