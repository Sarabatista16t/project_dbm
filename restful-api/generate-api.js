var fs = require("fs");
var mustache = require('mustache');


/*
Remove all spaces from a given string
EX: input: 'nome do schema'
    output: 'nome_do_schema'
*/
function joinStrng(str) {
    var schemaName = str;
    while (schemaName.includes(' ')) {
        schemaName = schemaName.replace(' ', '_')
    }
    return schemaName
}

module.exports = function (schemas) {

    var view = {
        models: schemas,
        name: function () {
            return joinStrng(this.title);
        }

    };


    fs.readFile('./restful-api/routes.mustache', function (err, data) {

        //Render output for creating the routes
        var output = mustache.render(data.toString(), view);

        // Write routes' file with the generated output
        fs.writeFileSync('./Publish/Controllers/api.js', output);
    });
}