var fs = require("fs");
var mustache = require('mustache');

module.exports = function(schemas) {
   
    var view = {
        models: schemas,
        name: function(){return this.title}
    };

    
    fs.readFile('./restful-api/routes.mustache', function (err, data) {
        var output = mustache.render(data.toString(), view);
        fs.writeFileSync('./Publish/Controllers/api.js', output);
    });
}