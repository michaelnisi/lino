
// example - buffer line

var lino = require('../'), lines

lines = lino()
lines.on('readable', function () {
  console.log('%s', lines.read())
})
lines.write('My philosophy, ')
lines.write('like color television, ')
lines.write('is all there in black and white.\n')
