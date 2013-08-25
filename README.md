# lino - split stream into line sized chunks

The lino [Node.js](http://nodejs.org/) module splits streams into line sized chunks.

[![Build Status](https://secure.travis-ci.org/michaelnisi/lino.png)](http://travis-ci.org/michaelnisi/lino) [![David DM](https://david-dm.org/michaelnisi/lino.png)](http://david-dm.org/michaelnisi/lino)

## Usage
    
    var lino = require('lino')
      , fs = require('fs')

    fs.createReadStream('./LICENSE')
      .pipe(lino())
      .pipe(process.stdout)

### lino()

The `lino` module exports a single function that returns a [Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) stream.

## Installation

Install with [npm](https://npmjs.org):

    npm install lino

[![NPM](https://nodei.co/npm/lino.png)](https://npmjs.org/package/lino)

## License

[MIT License](https://raw.github.com/michaelnisi/lino/master/LICENSE)
