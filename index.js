
// lino - transform to line sized chunks

var Transform = require('stream').Transform

module.exports = function () {
  var stream = new Transform()
    , extra = null

  stream._transform = function (chunk, enc, cb) {
    var con
    if (extra) {
      var len = extra.length + chunk.length
      con = Buffer.concat([extra, chunk], len)
      extra = null
    } else {
      con = chunk
    }
    push(con, 0, 0)
    cb()
  }

  function push (chunk, start, end) {
    var split = -1
      , buf = chunk[end++]
      , next = chunk[end+1]

    if (buf === 10) {
      split = end
    } else if (buf === 13) {
      split = next === 10 ? ++end : end
    }

    if (split > -1) {
      stream.push(chunk.slice(start, end))
      start = end
    }
    extra = chunk.slice(start, chunk.length)
    if (end < chunk.length) {
      push(chunk, start, end)
    }
  }

  return stream
}
