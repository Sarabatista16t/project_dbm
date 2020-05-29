var fs = require("fs");
var mustache = require('mustache');

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
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync('./Publish/Controllers/api.js', output);
    });
}