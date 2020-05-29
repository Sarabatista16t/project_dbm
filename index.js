var fs = require('fs')
var childProcess = require('child_process')
var mustache = require('mustache')

//Read config file
var config = JSON.parse(fs.readFileSync('./Server/config.json'))

//Get schemas name and path. Alter schemas' name
var schemas = config.schemas.map(element => {
  /*
  Remove all spaces in the schema title 
      EX: input: 'nome do schema'
          output: 'nome-do-schema'
  */
  let schemaName = element.name;
  while (schemaName.includes(' ')) {
    schemaName = schemaName.replace(' ', '-')
  }

  return { name: schemaName, path: element.path }
});

//Replace config's schemas for new schemas
config.schemas = schemas;

//Render output for creating the server

fs.readFile('./Server/server.mustache', function (err, data) {
  var output = mustache.render(data.toString(), config)
  fs.writeFileSync('./Server/server.js', output)
})
//Run the server file
childProcess.fork('./Server/server.js')
