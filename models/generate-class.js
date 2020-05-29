var mustache = require('mustache');
var fs = require("fs");
fs.mkdirSync
/*
Returns a dictionary with all the data to render a model, for a given schema
*/
function generateModel(dbname, schema) {
    var properties = [];
    var counter = 0;

    //Goes thro all the properties in the schema
    for (const key in schema.properties) {
        var attribute = key;

        /*
        Remove all spaces in the schema title 
        EX: input: 'nome do schema'
            output: 'nome_do_schema'
        */
        while (attribute.includes(" ")) {
            attribute = attribute.replace(" ", "_").toLowerCase();
        }


        // Push all the constraints into an array to later join the array and get a string with the constraints values
        var attributes = {};
        attributes["name"] = attribute;

        //Check if the current attribute is the last one in the given schema
        attributes["last"] = !(counter < Object.keys(schema.properties).length - 1);
        properties.push(attributes)
        counter++;

    };

    //Gets all the requiered properties in the schema
    var required = [];
    for (const key in schema.required) {
        required.push(key);
    };

    // Generates a string with '?,' as many time as the ammount of existing properties
    var questionmark = '?,'.repeat(properties.length)


    /*
        Remove all spaces in the schema title 
        EX: input: 'nome do schema'
            output: 'nome-do-schema'
    */
    var schemaName = schema.title;
    while (schemaName.includes(' ')) {
        schemaName = schemaName.replace(' ', '-')
    }

    /*
       Remove all spaces in the schema title 
       EX: input: 'nome do schema'
           output: 'nome_do_schema'
   */
    var className = schema.title;
    while (className.includes(' ')) {
        className = className.replace(' ', '_')
    }


    // Data to render a model from the given schema
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

                    //Render output for creating a model
                    var output = mustache.render(data.toString(), generateModel(dbname, element));

                    /*
                    Remove all spaces in the schema title 
                        EX: input: 'nome do schema'
                            output: 'nome-do-schema'
                    */
                    var schemaName = element.title;
                    while (schemaName.includes(' ')) {
                        schemaName = schemaName.replace(' ', '-')
                    }
                    // Write model's file with the generated output
                    fs.writeFileSync("./Publish/Models/" + schemaName + ".js", output);
                });

        });
    } else {
        fs.readFile('./models/class.mustache', function (err, data) {
            //Render output for creating a model

            var output = mustache.render(data.toString(), generateModel(dbname, schemas));

            /*
            Remove all spaces in the schema title 
                EX: input: 'nome do schema'
                    output: 'nome-do-schema'
            */
            var schemaName = schemas.title;
            while (schemaName.includes(' ')) {
                schemaName = schemaName.replace(' ', '_')
            }

            // Write model's file with the generated output
            fs.writeFileSync("./Publish/Models/" + schemaName + ".js", output);
        });
    }

}