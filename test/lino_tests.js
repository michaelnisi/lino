var test = require('tap').test
var fs = require('fs')
var StringDecoder = require('string_decoder').StringDecoder
var stream = require('readable-stream')
var lino = require('../')

test('constructor', function (t) {
  t.ok(lino() instanceof stream.Transform)
  t.end()
})

test('line count', function (t) {
  t.plan(1)
  var actual = 0
  var expected = 9859 // wc -l test/rfc2616.txt
  fs.createReadStream('rfc2616.txt')
    .pipe(lino())
    .on('data', function (chunk) {
      actual++
    })
    .on('end', function () {
      t.is(actual, expected)
      t.end()
    })
    .resume()
})

test('size', function (t) {
  var reader = fs.createReadStream('five.txt')
  var transform = lino()

  reader.on('readable', function () {
    var chunk
    var size = Math.ceil(Math.random() * 64)
    while ((chunk = reader.read(size)) !== null) {
      transform.write(chunk)
    }
  })

  var expected = [
    new Buffer('ONE\n'),
    new Buffer('TWO\n'),
    new Buffer('THREE\n'),
    new Buffer('FOUR\n'),
    new Buffer('FIVE\n')
  ]
  reader.on('end', function () {
    expected.forEach(function (chunk, i) {
      t.same(actual[i], chunk, '')
    })
    t.end()
  })

  var actual = []
  transform.on('readable', function () {
    var chunk
    while ((chunk = transform.read()) !== null) {
      actual.push(chunk)
    }
  })
})

var StringDecoder = require('string_decoder').StringDecoder

test('none', function (t) {
  var trans = lino()
  var expected = 'Não sou nada.'
  var actual = []
  var decoder = new StringDecoder()
  trans.on('readable', function () {
    var chunk
    while ((chunk = trans.read()) !== null) {
      actual.push(decoder.write(chunk))
    }
  }).on('finish', function () {
    t.ok(!decoder.end())
    t.same(actual.join(), expected)
    t.end()
  })
  trans.end(expected)
})
