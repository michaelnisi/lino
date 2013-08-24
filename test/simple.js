
var test = require('tap').test
  , fs = require('fs')
  , lines = require('../')

test('basic things (non-flowing)', function (t) {
  var reader = fs.createReadStream('simple.txt')
    , transform = lines()

  var actual = []
  transform.on('readable', function () {
    var chunk
    while (null !== (chunk = transform.read())) {
      actual.push(chunk)
    }
  })

  var expected = [
    new Buffer('ONE\n')
  , new Buffer('TWO\n')
  , new Buffer('THREE\n')
  , new Buffer('FOUR\n')
  , new Buffer('FIVE\n')
  ]
  transform.on('end', function () {
    t.equal(actual.length, 5, 'should be 5 lines')
    expected.forEach(function (chunk, i) {
      t.same(actual[i], chunk, '')
    })
    t.end()
  })

  reader.pipe(transform)
})


