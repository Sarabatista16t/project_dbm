const sqlite3 = require('sqlite3').verbose();
var mustache = require('mustache');
var fs = require("fs");

const path = require('path');

function getConstraints(attribute, name, is_not_null) {
    var constraints = {}
    for (const key in attribute) {
        if (key == "type") {
            if (attribute[key] == "integer")
                constraints[key] = "integer";
            if (attribute[key] == "string")
                constraints[key] = "text";
        }
        if (key == "unique")
            constraints[key] = "UNIQUE";
        if (key == "maxLength")
            constraints[key] = "CHECK( LENGTH(" + name + ") <= " + attribute[key] + ")";
        if (key == "minimum")
            if (constraints["maximum"]) {
                var value = attribute["maximum"];
                delete constraints["maximum"]
                constraints["min_max"] = "CHECK(" + name + ">=" + attribute[key] + " and " + name + "<=" + value + ")";
            } else {
                constraints[key] = "CHECK(" + name + ">=" + attribute[key] + ")";
            }
        if (key == "maximum")
            if (constraints["minimum"]) {
                var value = attribute["minimum"];
                delete constraints["minimum"]
                constraints["min_max"] = "CHECK(" + name + ">=" + value + " and " + name + "<=" + attribute[key] + ")";

            } else {
                constraints[key] = "CHECK(" + name + "<=" + attribute[key] + ")";
            }
    }
    if (is_not_null)
        constraints["not_null"] = "NOT NULL";

    return constraints;

}

function createTable(schema) {
    var elementConstraint = []
    var counter = 0;
    for (const element in schema.properties) {
        const attr = element.replace(" ", "_");

        var values = {};
        values["name"] = attr;

        let aux = getConstraints(schema.properties[element], attr, schema.required.includes(element));
        var keys = [];
        for (const key in aux) {
            keys.push(aux[key]);
        }
        values["constraints"] = keys.join(" ");
        values["last"] = !(counter < Object.keys(schema.properties).length - 1);
        elementConstraint.push(values);
        counter++;
    }
    var view = {
        table_name: schema.title,
        attributes: elementConstraint,
        attribute: function() { return this.name },
        constraints: function() { return this.constraints },
        last: function() { return this.last }

    };

    return view;

}

module.exports.relations = function generateRelations(db, element) {
    if (element.references) {
        let references = element.references
        references.forEach((elem) => {
            let tableReferences = elem['model'];
            let relationType = elem['relation'];
            let view = {
                tablename: element.title,
                tableReferences: tableReferences
            }

            if (relationType === '1-M') {
                fs.readFile('./database/one-to-many.mustache', function(err, data) {
                    var output = mustache.render(data.toString(), view);
                    db.run(output)
                });
            } else if (relationType === '1-1') {
                fs.readFile('./database/one-to-many.mustache', function(err, data) {
                    var output = mustache.render(data.toString(), view);

                    db.run(output)
                });

            } else if (relationType === 'M-M') {
                view['tableMany'] = (element.title < tableReferences) ?
                    element.title + "_" + tableReferences : tableReferences + "_" + element.title
                fs.readFile('./database/many-to-many.mustache', function(err, data) {
                    var output = mustache.render(data.toString(), view);
                    db.run(output)
                });
            }

        })
    }
}

module.exports.generate = function generate(dbpath, dbname, schemas, callback) {
    let db = new sqlite3.Database(dbpath, (err) => {
        if (err) {
            console.error(err.message);
        }

    });
    db.serialize(() => {
        //CREATE TABLES
        if (Array.isArray(schemas)) {
            schemas.forEach(element => {
                if (element)
                    fs.readFile('./database/dbscript.mustache', function(err, data) {
                        var output = mustache.render(data.toString(), createTable(element));
                        db.run(output)
                        callback(db, element)

                    });

            });
        } else {
            var view = createTable(dbname, schemas);
            fs.readFile('./database/dbscript.mustache', function(err, data) {
                var output = mustache.render(data.toString(), view);
                db.run(output);
                callback(db, schemas)

            });
        }



    });

}