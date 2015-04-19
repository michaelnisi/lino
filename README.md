# lino - split stream into line sized chunks

The lino [Node.js](http://nodejs.org/) module splits streams into line sized chunks.

[![Build Status](https://secure.travis-ci.org/michaelnisi/lino.svg)](http://travis-ci.org/michaelnisi/lino)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Usage

```js
var lino = require('lino')

var lines = lino()
lines.on('readable', function () {
  console.log('%s', lines.read())
})
lines.write('My philosophy, ')
lines.write('like color television, ')
lines.write('is all there in black and white.\n')
```

## API

### lino(opts)

- `opts` Object Passed to both [Writable](http://nodejs.org/api/stream.html#stream_class_stream_writable) and [Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) constructors.

Lino exports a single function that returns a [Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) stream. This duplex stream splits its inputs at line breaks to output line sized chunks.

## Installation

[![NPM](https://nodei.co/npm/lino.png)](https://npmjs.org/package/lino)

## License

[MIT License](https://raw.github.com/michaelnisi/lino/master/LICENSE)
