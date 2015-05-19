// lino - split stream into line sized chunks

module.exports = Lino

var stream = require('readable-stream')
var util = require('util')

function Lino (opts) {
  if (!(this instanceof Lino)) return new Lino(opts)
  stream.Transform.call(this, opts)
}
util.inherits(Lino, stream.Transform)

Lino.prototype._transform = function _transform (chunk, enc, cb) {
  var cat
  var extra = this.extra
  if (extra) {
    var len = extra.length + chunk.length
    cat = Buffer.concat([extra, chunk], len)
    extra = null
  } else {
    cat = chunk
  }

  var start = 0
  var end = 0
  var split
  var buf
  var line
  while (end < cat.length) {
    split = -1
    buf = cat[end++]
    if (buf === 10) { // POSIX only
      split = end
    }
    if (split > -1) {
      line = cat.slice(start, end)
      this.push(line)
      start = end
    }
  }
  this.extra = cat.slice(start)
  cb()
}

Lino.prototype._flush = function _flush (cb) {
  var extra = this.extra
  if (extra) {
    this.push(extra)
  }
  cb()
}
