
// lines - transform to line sized chunks

var Transform = require('stream').Transform

module.exports = function () {
  var stream = new Transform()

  stream._transform = function (chunk, enc, cb) {
    lines(chunk, null, 0, 0)
    cb()
  }

  function lines (chunk, prev, start, end) {
    var split = -1
      , oct = chunk[end++]

    if (oct === 10) {
      split = end
    }
    if (split > -1) {
      var line = chunk.slice(start, end)
      stream.push(line)
      start = end
    }
    if (end < chunk.length) {
      lines(chunk, oct, start, end)
    }
  }

  return stream
}
