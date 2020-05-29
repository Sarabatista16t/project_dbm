const sqlite3 = require('sqlite3').verbose()
var mustache = require('mustache')
var fs = require('fs')
var Promise = require('promise')

function getConstraints(attribute, name, is_not_null) {
  var constraints = {}

  for (const key in attribute) {
    if (key == 'type') {
      if (attribute[key] == 'integer') { constraints[key] = 'INTEGER' }
      if (attribute[key] == 'string') { constraints[key] = 'text' }
    }
    if (key == 'unique') { constraints[key] = 'UNIQUE' }
    if (key == 'maxLength') { constraints[key] = 'CHECK( LENGTH(' + name + ') <= ' + attribute[key] + ')' }
    if (key == 'minimum') {
      if (constraints.maximum) {
        var value = attribute.maximum
        delete constraints.maximum
        constraints.min_max = 'CHECK(' + name + '>=' + attribute[key] + ' and ' + name + '<=' + value + ')'
      } else {
        constraints[key] = 'CHECK(' + name + '>=' + attribute[key] + ')'
      }
    }
    if (key == 'maximum') {
      if (constraints.minimum) {
        var value = attribute.minimum
        delete constraints.minimum
        constraints.min_max = 'CHECK(' + name + '>=' + value + ' and ' + name + '<=' + attribute[key] + ')'
      } else {
        constraints[key] = 'CHECK(' + name + '<=' + attribute[key] + ')'
      }
    }
  }
  if (is_not_null) { constraints.not_null = 'NOT NULL' }
  return constraints
}

function createTable(schema) {
  var elementConstraint = []
  var counter = 0
  for (const element in schema.properties) {
    var attr = element
    while (attr.includes(' ')) {
      attr = attr.replace(' ', '_')
    }
    var values = {}
    values.name = attr

    const aux = getConstraints(schema.properties[element], attr, schema.required.includes(element))
    var keys = []
    for (const key in aux) {
      keys.push(aux[key])
    }
    values.constraints = keys.join(' ')
    values.last = !(counter < Object.keys(schema.properties).length - 1)
    elementConstraint.push(values)
    counter++
  }
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


function getArray(schemas, _callback) {
  var stmt = new Array();

  if (Array.isArray(schemas)) {
    for (const element of schemas) {
      fs.readFile('./database/dbscript.mustache', function (err, data) {
        _callback(mustache.render(data.toString(), createTable(element)))
      })
    }
  }
}


module.exports = async function (dbname, schemas) {
  var stmt = await getArray(schemas, (stmt) => {

    var db = new sqlite3.Database(dbname, (err) => {

      if (err) {
        console.log(err.message)
      }
      db.serialize(() => {
        db.run(stmt, function () { if (err) console.log(err) })
      });

    })

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }

    });
  })
}

