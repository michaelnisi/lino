
// lino - split stream into line sized chunks

module.exports = Lino

var stream = require('stream')
  , util = require('util')

function Lino (opts) {
  if (!(this instanceof Lino)) return new Lino(opts)
  stream.Transform.call(this, opts)
}
util.inherits(Lino, stream.Transform)

Lino.prototype._transform = function (chunk, enc, cb) {
  var con
    , extra = this.extra
  if (extra) {
    var len = extra.length + chunk.length
    con = Buffer.concat([extra, chunk], len)
    extra = null
  } else {
    con = chunk
  }

  var start = end = 0
  while (end < con.length) {
    var split = -1
      , buf = con[end++]
      , next = con[end+1]

    if (buf === 10) {
      split = end
    } else if (buf === 13) {
      split = next === 10 ? ++end : end
    }

    if (split > -1) {
      this.push(con.slice(start, end))
      start = end
    }
    extra = con.slice(start, con.length)
  }
  this.extra = extra
  cb()
}

Lino.prototype._flush = function (cb) {
  var extra = this.extra
  if (extra) {
    this.push(extra)
  }
  cb()
}
