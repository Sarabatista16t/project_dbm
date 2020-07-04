var express = require("express");
var bodyParser = require("body-parser");
var mustacheExpress = require('mustache-express');
var fs = require("fs");
var del = require("del");
var mkdirp = require("mkdirp")
const sqlite3 = require('sqlite3').verbose()
var Promise = require('promise');

var app = express();
app.use(express.static('Public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', './Publish/Views'); //indicação de qual a pasta que irá conter   as views


//Schemas 
var schemas =new Array();


app.post("/generate", function (req, res) {
  
    fs.mkdir('./Publish/Database/projeto', function() {});

    //Copy Schemas
    fs.copyFileSync('./schemas/Schema-Album.json','./Publish/Schemas/Schema-'+'Album'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Album'+'.json')));

    fs.copyFileSync('./schemas/Schema-Artist.json','./Publish/Schemas/Schema-'+'Artist'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Artist'+'.json')));

    fs.copyFileSync('./schemas/Schema-Genre.json','./Publish/Schemas/Schema-'+'Genre'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Genre'+'.json')));

    fs.copyFileSync('./schemas/Schema-Producer.json','./Publish/Schemas/Schema-'+'Producer'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Producer'+'.json')));

    fs.copyFileSync('./schemas/Schema-RecordLabel.json','./Publish/Schemas/Schema-'+'RecordLabel'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'RecordLabel'+'.json')));

    fs.copyFileSync('./schemas/Schema-SocialMedia.json','./Publish/Schemas/Schema-'+'SocialMedia'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'SocialMedia'+'.json')));

    fs.copyFileSync('./schemas/Schema-Song.json','./Publish/Schemas/Schema-'+'Song'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Song'+'.json')));


    //Copy static files
    fs.copyFileSync('./staticFiles/sqlite-wrapper.js','./Publish/Database/sqlite-wrapper.js');
    fs.copyFileSync('./staticFiles/list.mustache','./Publish/Views/list.mustache');
    fs.copyFileSync('./staticFiles/home.mustache','./Publish/Views/home.mustache');
    fs.copyFileSync('./staticFiles/details.mustache','./Publish/Views/details.mustache');
    fs.copyFileSync('./staticFiles/insert.mustache','./Publish/Views/insert.mustache');
    fs.copyFileSync('./staticFiles/menu.mustache','./Publish/Views/menu.mustache');
    fs.copyFileSync('./staticFiles/edit.mustache','./Publish/Views/edit.mustache');

    const db = require("../database/generate-database.js");
    //Create Database
    db.generate('./Publish/Database/projeto/projeto.db','projeto',schemas, db.relations);
    
    //Create Models from schemas
    require("../models/generate-class.js")('./Publish/Database/projeto/projeto',schemas);

    //Create Routes file
    var generate = require("../restful-api/generate-api.js");
    generate.generateAPI(schemas,
    ()=>{ 
         generate.generateFrontoffice( 
            ()=>{
                var api = require('../Publish/Controllers/api.js');
                    app.use('/api', api)
                    var backoffice = require('../Publish/Controllers/backoffice.js');
                    app.use('/backoffice', backoffice)
                    var frontoffice = require('../Publish/Controllers/frontoffice.js');
                    app.use('/frontoffice', frontoffice)
            })
       
        });
       
    res.send();
});

var server = app.listen(8080, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});