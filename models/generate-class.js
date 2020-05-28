var mustache = require('mustache');
var fs = require("fs");


function generateView(dbname, schema) {
    var properties = [];
    var counter = 0;
    for (const key in schema.properties) {
        var attributes = {};
        var attr = key;
        while (attr.includes(" ")) {
            attr = attr.replace(" ", "_").toLowerCase();
        }
        attributes["name"] = attr;
        attributes["last"] = !(counter < Object.keys(schema.properties).length - 1);
        properties.push(attributes)
        counter++;

    };
    var required = [];
    for (const key in schema.required) {
        required.push(key);
    };

    var questionmark = '?,'.repeat(properties.length)

    var schemaName = schema.title;
    while (schemaName.includes(' ')) {
        schemaName = schemaName.replace(' ', '-')
    }
    var className = schema.title;
    while (className.includes(' ')) {
        className = className.replace(' ', '_')
    }

    var view = {
        schemaTitle: schemaName,
        classTitle: className,
        constructorArguments: properties.map(e => { return e.name }).join(","),
        classConstructor: properties,
        name: function () { return this },
        last: function () { return this },
        classEnumerables: properties.filter(elem => !required.includes(elem)),
        name: function () { return this },
        dbname: dbname,
        questionmark: questionmark.slice(0, questionmark.length - 1),
    };
    return view;

}

module.exports = function (dbname, schemas) {
    if (Array.isArray(schemas)) {
        schemas.forEach(element => {
            if (element)
                fs.readFile('./models/class.mustache', function (err, data) {
                    var output = mustache.render(data.toString(), generateView(dbname, element));
                    var schemaName = element.title;
                    while (schemaName.includes(' ')) {
                        schemaName = schemaName.replace(' ', '_')
                    }
                    fs.writeFileSync("./Publish/Models/" +schemaName + ".js", output);
                });

        });
    } else {
        fs.readFile('./models/class.mustache', function (err, data) {
            var output = mustache.render(data.toString(), generateView(dbname, schemas));
            var schemaName = schemas.title;
            while (schemaName.includes(' ')) {
                schemaName = schemaName.replace(' ', '_')
            }
            fs.writeFileSync("./Publish/Models/" + schemaName + ".js", output);
        });
    }

}