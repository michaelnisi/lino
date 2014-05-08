
var test = require('tap').test
  , fs = require('fs')
  , lino = require('../')

test('explore', function (t) {
  var f = lino()
    , count = 0
  f.on('readable', function () {
    var chunk
    while (null !== (chunk = f.read())) {
      // console.error('line %s: %s', ++count, chunk)
    }
  })
  f.on('end', function () {
    t.end()
  })
  f.write(fs.readFileSync('porcelain'))
  f.end()
})
