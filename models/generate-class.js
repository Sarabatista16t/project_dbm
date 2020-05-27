var mustache = require('mustache');
var fs = require("fs");
  

function generateView(dbname,schema) {
    var properties = [];
    var counter = 0;
    for (const key in schema.properties) {
        var attributes = {};
        attributes["name"] = key.replace(" ", "_").toLowerCase();
        attributes["last"] = !(counter < Object.keys(schema.properties).length - 1);
        properties.push(attributes)
        counter ++;

    };
    var required = [];
    for (const key in schema.required) {
        required.push(key);
    };

    var questionmark = '?,'.repeat(properties.length)

    var view = {
        classTitle: schema.title,
        constructorArguments: properties.map(e=> {return e.name}).join(","),
        classConstructor: properties,
        name: function () { return this },
        last: function(){return this},
        classEnumerables: properties.filter(elem => !required.includes(elem)),
        name: function () { return this },
        dbname: dbname,
        questionmark: questionmark.slice(0, questionmark.length -1 ),
    }; 
    return view;
   
}

module.exports = function (dbname,schemas) {
    if (Array.isArray(schemas)) {
        schemas.forEach(element => {
        if(element)
        fs.readFile('./models/class.mustache', function (err, data) {
            var output = mustache.render(data.toString(), generateView(dbname, element));
            fs.writeFileSync("./Publish/Models/" + element.title + ".js", output);
        });

        });
    } else {
        fs.readFile('./models/class.mustache', function (err, data) {
            var output = mustache.render(data.toString(), generateView(dbname, schemas));
            fs.writeFileSync("./Publish/Models/" + schemas.title + ".js", output);
        });
    }

}