
var util = require('util')
  , lino = require('../')
  , events = ['data', 'error', 'feed']

module.exports = function (t, input, wanted) {
  var parser = lino()
    , e = 0
  events.forEach(function (ev) {
    parser.on(ev, function (n) {
      if (process.env.DEBUG) {
        console.error({ wanted: wanted[e], found: [ev, n] })
      }
      if (e >= wanted.length && (ev === 'end' || ev === 'ready')) {
        t.end()
        return
      }
      t.ok( e < wanted.length)
      var inspected = n instanceof Error ? '\n' + n.message : util.inspect(n)
      t.is(ev, wanted[e][0])
      if (ev === 'error') t.is(n.message, wanted[e][1])
      else t.deepEqual(n, wanted[e][1])
      e++
    })
  })
  if (input) parser.write(input)
}
