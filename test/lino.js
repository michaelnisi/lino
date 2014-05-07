
var test = require('tap').test
  , fs = require('fs')
  , es = require('event-stream')
  , StringDecoder = require('string_decoder').StringDecoder
  , stream = require('stream')
  , lino = require('../')

test('constructor', function (t) {
  t.ok(lino() instanceof stream.Transform)
  t.end()
})

test('lc', function (t) {
  fs.createReadStream('manifesto.txt')
    .pipe(lino())
    .pipe(es.writeArray(function (er, lines) {
      t.equal(lines.length, 46, 'should be 46 lines')
      t.end()
    }))
})

test('size', function (t) {
  var reader = fs.createReadStream('five.txt')
    , transform = lino()

  reader.on('readable', function () {
    var chunk
      , size = Math.ceil(Math.random() * 64)
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

test('overflow', function (t) {
  fs.createReadStream('rfc2616.txt')
    .pipe(lino())
    .on('end', function () {
      t.ok(true, 'should be fine')
      t.end()
    })
    .resume()
})

test('none', function (t) {
  var trans = lino()
    , expected = 'Não sou nada.'
    , actual = []

  trans.on('readable', function () {
    var chunk;
    while (null !== (chunk = trans.read())) {
      actual.push(dec(chunk))
    }
  }).on('finish', function () {
    t.same(actual.join(), expected)
    t.end()
  })
  trans.end(expected)
})

var decoder = new StringDecoder('utf8')
function dec(buf) {
  return decoder.write(buf)
}
