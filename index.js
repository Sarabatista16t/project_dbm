var fs = require("fs");
var childProcess = require('child_process');

var del = require("del");
var mkdirp = require("mkdirp")

var config = JSON.parse(fs.readFileSync("./Server/config.json"));
var mustache = require('mustache');

del.sync(['Publish']);

fs.mkdir("./Publish", function() {
    fs.mkdir("./Publish/Schemas", function() {});
    fs.mkdir("./Publish/Views", function() {});
    fs.mkdir("./Publish/Database", function() {});
    fs.mkdir("./Publish/Models", function() {});
    fs.mkdir("./Publish/Controllers", function() {});
    fs.mkdir('./Publish/Public', function() {
        fs.mkdir('./Publish/Public/Css', function() {});
        fs.mkdir('./Publish/Public/Js', function() {});
        fs.mkdir('./Publish/Public/images', function() {});
        fs.writeFile('Publish/Public/index.js', fs.readFileSync("./index.js"), function() {});
    });

});
fs.readFile('./Server/server.mustache', function(err, data) {
    var output = mustache.render(data.toString(), config);
    fs.writeFileSync('./Server/server.js', output);
    childProcess.fork('./Server/server.js');
});