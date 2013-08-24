
// example - pipe file to stdout

var lines = require('../')
    fs = require('fs')

var reader = fs.createReadStream('./LICENSE')
  , transformer = lines()
  , writer = process.stdout

reader.pipe(transformer).pipe(writer)
