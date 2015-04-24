# lino - split stream into line sized chunks

The **lino** [Node.js](http://nodejs.org/) module splits streams into line sized chunks.

[![Build Status](https://secure.travis-ci.org/michaelnisi/lino.svg)](http://travis-ci.org/michaelnisi/lino)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Usage

```js
var lino = require('lino')

var lines = lino()
lines.on('readable', function () {
  console.log('%s', lines.read())
})
lines.write('Chunks are buffered until the ')
lines.write('the first newline character ')
lines.write('is encountered.\n')
lines.write('No characters are removed.\n')
lines.write('At the end the buffer ')
lines.end('is flushed.')
```

## API

### lino(opts)

- `opts` Object Passed to both [Writable](http://nodejs.org/api/stream.html#stream_class_stream_writable) and [Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) constructors.

**lino** exports a single function that returns a [Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) stream. This duplex stream splits its inputs at line breaks to output line sized chunks.

## Installation

With [npm](https://npmjs.org/package/lino) do:

```
$ npm install lino
```

## License

[MIT License](https://raw.github.com/michaelnisi/lino/master/LICENSE)
