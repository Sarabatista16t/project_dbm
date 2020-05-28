var fs = require("fs");
var mustache = require('mustache');

function joinStrng(str) {

    var schemaName = str;
    while (schemaName.includes(' ')) {
        schemaName = schemaName.replace(' ', '_')
    }
    return schemaName
}

module.exports = async function generate(schemas) {

    var view = {
        models: schemas,
        name: function () {
            return joinStrng(this.title);
        }

    };


    fs.readFile('./restful-api/routes.mustache', function (err, data) {
        var output = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Controllers/api.js', output, function(){
            console.log("API ROUTES created")
        });
    });
}