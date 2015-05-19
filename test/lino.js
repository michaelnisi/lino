var StringDecoder = require('string_decoder').StringDecoder
var fs = require('fs')
var lino = require('../')
var parse = require('./lib/parse')
var path = require('path')
var stream = require('readable-stream')
var test = require('tap').test

test('constructor', function (t) {
  t.ok(lino() instanceof stream.Transform)
  t.end()
})

function createReadStream (name) {
  var p = path.join(__dirname, 'data', name)
  return fs.createReadStream(p)
}

test('line count', function (t) {
  var wanted = 9859
  var times = 64
  t.plan(times)
  function run (i) {
    if (i === 0) return
    var found = 0
    var reader = createReadStream('rfc2616.txt')
    var writer = lino({ highWaterMark: Math.round(Math.random() * 64) })
    function write () {
      var chunk
      var ok = false
      do {
        chunk = reader.read()
        ok = chunk !== null && writer.write(chunk)
      } while (ok)
      if (!ok) writer.once('drain', write)
    }
    reader.on('readable', write)
    reader.once('end', function () {
      t.is(found, wanted)
      run(--i)
    })
    writer.on('data', function (chunk) { found++ })
    write()
  }
  run(times)
})

test('size', function (t) {
  var reader = createReadStream('five.txt')
  var transform = lino()
  reader.on('readable', function () {
    var chunk
    var size = Math.ceil(Math.random() * 64)
    while ((chunk = reader.read(size)) !== null) {
      transform.write(chunk)
    }
  })
  var wanted = [
    new Buffer('ONE\n'),
    new Buffer('TWO\n'),
    new Buffer('THREE\n'),
    new Buffer('FOUR\n'),
    new Buffer('FIVE\n')
  ]
  reader.on('end', function () {
    wanted.forEach(function (chunk, i) {
      t.same(found[i], chunk, '')
    })
    t.end()
  })
  var found = []
  transform.on('readable', function () {
    var chunk
    while ((chunk = transform.read()) !== null) {
      found.push(chunk)
    }
  })
})

test('none', function (t) {
  var trans = lino()
  var wanted = 'Não sou nada.'
  var found = []
  var decoder = new StringDecoder()
  trans.on('readable', function () {
    var chunk
    while ((chunk = trans.read()) !== null) {
      found.push(decoder.write(chunk))
    }
  }).on('finish', function () {
    t.ok(!decoder.end())
    t.same(found.join(), wanted)
    t.end()
  })
  trans.end(wanted)
})

test('porcelain', function (t) {
  var input = '?? test/parse.js\n?? test/porcelain\n'
  var wanted = ['?? test/parse.js\n', '?? test/porcelain\n']
  parse(t, input, wanted)
})

test('none', function (t) {
  var input = 'No new line'
  var wanted = ['No new line']
  parse(t, input, wanted)
})
