
// example - pipe file to stdout

var lino = require('../')
  , fs = require('fs')

fs.createReadStream('./LICENSE')
  .pipe(lino())
  .pipe(process.stdout)
