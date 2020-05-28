var fs = require('fs')
var childProcess = require('child_process')

var config = JSON.parse(fs.readFileSync('./Server/config.json'))
var schemas = config.schemas.map(element => {
  let schemaName =element.name;
  while (schemaName.includes(' ')) {
    schemaName = schemaName.replace(' ', '-')
  }
  return {name: schemaName, path: element.path}
});
config.schemas = schemas;
var mustache = require('mustache')

fs.readFile('./Server/server.mustache', function (err, data) {
  var output = mustache.render(data.toString(), config)
  fs.writeFileSync('./Server/server.js', output)
})

childProcess.fork('./Server/server.js')
