var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var del = require("del");
var mkdirp = require("mkdirp")
var app = express();
app.use(express.static('Public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const sqlite3 = require('sqlite3').verbose()
var Promise = require('promise');



//Schemas 
var schemas =new Array();


app.post("/generate", function (req, res) {
    //Apagar pastas antigas
    del.sync(['Publish']);

    //Criação de pastas
    fs.mkdir("./Publish", function(){
        console.log("Publish created");
    });
    
    fs.mkdir("./Publish/Schemas",function(){
  
    }); 
            
        //Copy Schemas

    fs.copyFileSync('./schemas/Schema-Album.json','./Publish/Schemas/Schema-'+'Album'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Album'+'.json')));

    fs.copyFileSync('./schemas/Schema-Artist_SocialMedia.json','./Publish/Schemas/Schema-'+'Artist_SocialMedia'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Artist_SocialMedia'+'.json')));

    fs.copyFileSync('./schemas/Schema-Artist.json','./Publish/Schemas/Schema-'+'Artist'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Artist'+'.json')));

    fs.copyFileSync('./schemas/Schema-Company.json','./Publish/Schemas/Schema-'+'Company'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Company'+'.json')));

    fs.copyFileSync('./schemas/Schema-Genre.json','./Publish/Schemas/Schema-'+'Genre'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Genre'+'.json')));

    fs.copyFileSync('./schemas/Schema-Producer.json','./Publish/Schemas/Schema-'+'Producer'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Producer'+'.json')));

    fs.copyFileSync('./schemas/Schema-RecordLabel.json','./Publish/Schemas/Schema-'+'Record-Label'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Record-Label'+'.json')));

    fs.copyFileSync('./schemas/Schema-SocialMedia.json','./Publish/Schemas/Schema-'+'Social-Media'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Social-Media'+'.json')));

    fs.copyFileSync('./schemas/Schema-Song_artist.json','./Publish/Schemas/Schema-'+'Song_artist'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Song_artist'+'.json')));

    fs.copyFileSync('./schemas/Schema-Song.json','./Publish/Schemas/Schema-'+'Song'+'.json');
    schemas.push(JSON.parse(fs.readFileSync('./Publish/Schemas/Schema-'+'Song'+'.json')));



    fs.mkdir("./Publish/Database",function(){ 
        //Copy static files
        fs.copyFileSync('./sqlite-wrapper.js','./Publish/Database/sqlite-wrapper.js');


    });
    fs.mkdir('./Publish/Database/projeto', function(){
        //Database
        require("../database/generate-database.js")('./Publish/Database/projeto/projeto.db',schemas);

    })

    fs.mkdir("./Publish/Models",function(){
        //Create Models from schemas
        require("../models/generate-class.js")('./Publish/Database/projeto/projeto.db',schemas);

    });

    fs.mkdir("./Publish/Controllers", function(){
        //ROUTES
        var generate = require("../restful-api/generate-api.js");
        new Promise((result, reject)=> generate(schemas)).then(
            function(result){
                try{      

                    var api = require('../Publish/Controllers/api.js');
                    //Middleware
                    app.use('/api/', api)
                }catch(e){
                    console.log(e)
                }
            }
        );
        

    });
    
    fs.mkdir("./Publish/Views",function(){  
        console.log("Vies folder created");
    });
  

    fs.mkdir('./Publish/Public', function () {
        fs.writeFile('Publish/Public/index.js', fs.readFileSync("./index.js"), function () {
            console.log('File created in new directory');
        });

    });
    
    mkdirp.sync('./Publish/Public/Css/Js');
        
 
    res.send();
});

var server = app.listen(8080, function () {
    var host = server.address().address === "::" ? "localhost" : server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});