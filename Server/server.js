var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var del = require("del");
var mkdirp = require("mkdirp")
var app = express();
app.use(express.static('Public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


//Copy static files

fs.copyFileSync('./sqlite-wrapper.js','./Publish/Database/sqlite-wrapper.js');


//Middleware
app.use('/api/Album',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Artist_SocialMedia',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Artist',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Company',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Genre',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Producer',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Record Label',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Social Media',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Song_artist',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
app.use('/api/Song',function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})


//Routes

app.post("/generate", function (req, res) {
    //Apagar pastas antigas
    del.sync(['./Publish']);
    //Criação de pastas
    fs.mkdir("./Publish", function(){});
    fs.mkdir("./Publish/Controllers", function(){});
    fs.mkdir("./Publish/Models",function(){});
    fs.mkdir("./Publish/Views",function(){});
    fs.mkdir("./Publish/Schemas",function(){});
    fs.mkdir("./Publish/Database",function(){});
    fs.mkdir('./Publish/Database/projeto', function(){
        console.log("CRIOU")
    })

    fs.mkdir('./Publish/Public', function () {
        fs.writeFile('Publish/Public/index.js', fs.readFileSync("./index.js"), function () {
            console.log('File created in new directory');
        });

    });

    //mkdirp.sync('./Publish/Public/Css/Js');

    res.send();
});


var schemas =new Array();

//Copy Schemas
fs.copyFileSync('./schemas/Schema-Album.json','./Publish/Schemas/Schema-'+'Album'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Album'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Artist_SocialMedia.json','./Publish/Schemas/Schema-'+'Artist_SocialMedia'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Artist_SocialMedia'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Artist.json','./Publish/Schemas/Schema-'+'Artist'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Artist'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Company.json','./Publish/Schemas/Schema-'+'Company'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Company'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Genre.json','./Publish/Schemas/Schema-'+'Genre'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Genre'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Producer.json','./Publish/Schemas/Schema-'+'Producer'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Producer'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-RecordLabel.json','./Publish/Schemas/Schema-'+'Record Label'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Record Label'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-SocialMedia.json','./Publish/Schemas/Schema-'+'Social Media'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Social Media'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Song_artist.json','./Publish/Schemas/Schema-'+'Song_artist'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Song_artist'+'.json')));
//Copy Schemas
fs.copyFileSync('./schemas/Schema-Song.json','./Publish/Schemas/Schema-'+'Song'+'.json')
schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Song'+'.json')));



//Database

    require("../database/generate-database.js")('./Publish/Database/projeto/projeto.db',schemas);

//Create Models from schemas
require("../models/generate-class.js")('./Publish/Database/projeto/projeto.db',schemas);

//ROUTES
require("../restful-api/generate-api.js")(schemas);

//require('../Publish/Controllers/api.js')(app);



var server = app.listen(8080, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});