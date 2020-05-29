const sqlite3 = require('sqlite3').verbose()
var mustache = require('mustache')
var fs = require('fs')
var Promise = require('promise')



/*
  Returns a dictionary with all the constrains an attribute has.
*/
function getConstraints(attribute, name, is_not_null) {
  var constraints = {}

  for (const key in attribute) {
    //Chack attributes typy
    if (key == 'type') {
      if (attribute[key] == 'integer') { constraints[key] = 'INTEGER' }
      if (attribute[key] == 'string') { constraints[key] = 'text' }
    }

    //Checks remaning contraints
    if (key == 'unique') { constraints[key] = 'UNIQUE' }
    if (key == 'maxLength') { constraints[key] = 'CHECK( LENGTH(' + name + ') <= ' + attribute[key] + ')' }
    if (key == 'minimum') {
      //Checks if this is a case where there are both a minimum and a maximun  contraints
      if (constraints.maximum) {
        var value = attribute.maximum
        delete constraints.maximum
        constraints.min_max = 'CHECK(' + name + '>=' + attribute[key] + ' and ' + name + '<=' + value + ')'
      } else {
        constraints[key] = 'CHECK(' + name + '>=' + attribute[key] + ')'
      }
    }
    if (key == 'maximum') {
      //Checks if this is a case where there are both a minimum and a maximun  contraints

      if (constraints.minimum) {
        var value = attribute.minimum
        delete constraints.minimum
        constraints.min_max = 'CHECK(' + name + '>=' + value + ' and ' + name + '<=' + attribute[key] + ')'
      } else {
        constraints[key] = 'CHECK(' + name + '<=' + attribute[key] + ')'
      }
    }
  }
  //Checks if the given attribute is not null
  if (is_not_null) { constraints.not_null = 'NOT NULL' }
  return constraints
}


/*
Generates the text of the script for creating a table for a giving schema
*/
function createTable(schema) {
  var elementConstraint = []
  var counter = 0


  // Goes thro all the attributes of the schema
  for (const element in schema.properties) {
    var attribute = element
    while (attribute.includes(' ')) {
      attribute = attribute.replace(' ', '_')
    }
    var values = {}
    values.name = attribute

    // get all the constraints for the current attribute
    const constrains = getConstraints(schema.properties[element], attribute, schema.required.includes(element))



    //Push all the constraints into an array to later join the array and get a string with the constraints values
    var keys = []
    for (const key in constrains) {
      //Gets the constrait value for the current key
      keys.push(constrains[key])
    }
    values.constraints = keys.join(' ')


    //Check if the current attribute is the last one in the given schema
    values.last = !(counter < Object.keys(schema.properties).length - 1)
    elementConstraint.push(values)
    counter++
  }


  /*
  Remove all spaces in the schema title 
  EX: input: 'nome do schema'
      output: 'nome_do_schema'
  */
  var schemaName = schema.title
  while (schemaName.includes(' ')) {
    schemaName = schemaName.replace(' ', '_')
  }

  var view = {
    table_name: schemaName,
    attributes: elementConstraint,
    attribute: function () { return this.name },
    constraints: function () { return this.constraints },
    last: function () { return this.last }

  }

  return view
}

/*
Render a script with the data for table creation. After it's rendered, call the callback on the output from the mustache.render
*/
function renderTable(schemas, _callback) {
  var stmt = new Array();

  if (Array.isArray(schemas)) {
    for (const element of schemas) {
      fs.readFile('./database/dbscript.mustache', function (err, data) {
        _callback(mustache.render(data.toString(), createTable(element)))
      })
    }
  } else {
    fs.readFile('./database/dbscript.mustache', function (err, data) {
      _callback(mustache.render(data.toString(), createTable(schemas)))
    })
  }

}


module.exports = async function (dbname, schemas) {
  //Awaits for the script for creating tables, for every given schema
  var stmt = await renderTable(schemas, (stmt) => {

    //Once the render is complete

    //Open database
    var db = new sqlite3.Database(dbname, (err) => {

      if (err) {
        console.log(err.message)
      }

      // Run rendered script
      db.serialize(() => {
        db.run(stmt, function () { if (err) console.log(err) })
      });

    })
    //Close database
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }

    });
  })
}

