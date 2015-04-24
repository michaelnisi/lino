// example - buffer line

var lino = require('../')

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
