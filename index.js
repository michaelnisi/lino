
// lines - transform to line sized chunks

var Transform = require('stream').Transform

module.exports = function () {
  var stream = new Transform()

  stream._transform = function (chunk, enc, cb) {
    push(chunk, null, 0, 0)
    cb()
  }

  function push (chunk, prev, start, end) {
    var split = -1
      , buf = chunk[end++]
      , next = chunk[end+1]

    if (buf === 10) {
      split = end
    } else if (buf === 13) {
      split = next === 10 ? ++end : end
    }

    if (split > -1) {
      var line = chunk.slice(start, end)
      stream.push(line)
      start = end
    }
    if (end < chunk.length) {
      push(chunk, buf, start, end)
    }
  }

  return stream
}
