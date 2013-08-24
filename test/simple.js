
var test = require('tap').test
  , fs = require('fs')
  , lines = require('../')

test('size', function (t) {
  var reader = fs.createReadStream('simple.txt')
    , transform = lines()

  reader.on('readable', function () {
    var chunk
      , size = 4
    while (null !== (chunk = reader.read(size))) {
      transform.write(chunk)
    }
  })

  var expected = [
    new Buffer('ONE\n')
  , new Buffer('TWO\n')
  , new Buffer('THREE\n')
  , new Buffer('FOUR\n')
  , new Buffer('FIVE\n')
  ]
  reader.on('end', function () {
    t.equal(actual.length, 5, 'should be 5 lines')
    expected.forEach(function (chunk, i) {
      t.same(actual[i], chunk, '')
    })
    t.end()
  })

  var actual = []
  transform.on('readable', function () {
    var chunk
    while (null !== (chunk = transform.read())) {
      actual.push(chunk)
    }
  })
})


