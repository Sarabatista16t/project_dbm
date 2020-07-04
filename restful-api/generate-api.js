var fs = require("fs");
var mustache = require('mustache');

module.exports.generateAPI = function(schemas, callback, callback2) {

    var view = {
        models: schemas,
        name: function() { return this.title }
    };

    fs.readFile('./restful-api/routes.mustache', function(err, data) {
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync('./Publish/Controllers/api.js', output);
        generateBackoffice(schemas, callback)
    });
}

function generateBackoffice(schemas, callback) {
    getSchemaProperties(schemas)

    var view = {
        schemas: schemas,
        title: function() { return noSpaces(this.title) },
        columns: function() { return '[' + this.required.map(e => '"' + noSpaces(e) + '"').join(',') + ']' },
        rows: function() { return noSpaces(this.title) + ".all" },
    }



    fs.readFile('./backoffice/backoffice.mustache', function(err, data) {
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync('./Publish/Controllers/backoffice.js', output);
        callback()
    });
}

module.exports.generateFrontoffice = function(callback) {
    var config = JSON.parse(fs.readFileSync("./Server/config.json"));

    var frontoffice = config.frontoffice;
    var view = {
        frontoffice: frontoffice
    }
    console.log(frontoffice)
    fs.readFile('./frontoffice/frontoffice.mustache', function(err, data) {
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync('./Publish/Controllers/frontoffice.js', output);
        callback()
    });
}

function noSpaces(word) {
    return word.replace(' ', '_')
}

function getSchemaProperties(schema) {
    const properties = schema.properties
}