const express = require("express");

const router = express.Router();


var Album = require("../Models/Album.js");


router.post("/api/Album", function (req,res){
    var al = Object.assign(new Album(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Album", function(req,res){
    var rows = Album.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Album/:id', function (req, res) {
   Album.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Album/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Album(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Album/:id", function(req,res){
    Album.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist_SocialMedia = require("../Models/Artist_SocialMedia.js");


router.post("/api/Artist_SocialMedia", function (req,res){
    var al = Object.assign(new Artist_SocialMedia(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist_SocialMedia", function(req,res){
    var rows = Artist_SocialMedia.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist_SocialMedia/:id', function (req, res) {
   Artist_SocialMedia.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist_SocialMedia/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist_SocialMedia(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist_SocialMedia/:id", function(req,res){
    Artist_SocialMedia.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist = require("../Models/Artist.js");


router.post("/api/Artist", function (req,res){
    var al = Object.assign(new Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist", function(req,res){
    var rows = Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist/:id', function (req, res) {
   Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist/:id", function(req,res){
    Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Company = require("../Models/Company.js");


router.post("/api/Company", function (req,res){
    var al = Object.assign(new Company(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Company", function(req,res){
    var rows = Company.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Company/:id', function (req, res) {
   Company.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Company/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Company(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Company/:id", function(req,res){
    Company.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Genre = require("../Models/Genre.js");


router.post("/api/Genre", function (req,res){
    var al = Object.assign(new Genre(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Genre", function(req,res){
    var rows = Genre.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Genre/:id', function (req, res) {
   Genre.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Genre/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Genre(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Genre/:id", function(req,res){
    Genre.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Producer = require("../Models/Producer.js");


router.post("/api/Producer", function (req,res){
    var al = Object.assign(new Producer(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Producer", function(req,res){
    var rows = Producer.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Producer/:id', function (req, res) {
   Producer.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Producer/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Producer(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Producer/:id", function(req,res){
    Producer.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Record_Label = require("../Models/Record_Label.js");


router.post("/api/Record_Label", function (req,res){
    var al = Object.assign(new Record_Label(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Record_Label", function(req,res){
    var rows = Record_Label.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Record_Label/:id', function (req, res) {
   Record_Label.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Record_Label/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Record_Label(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Record_Label/:id", function(req,res){
    Record_Label.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Social_Media = require("../Models/Social_Media.js");


router.post("/api/Social_Media", function (req,res){
    var al = Object.assign(new Social_Media(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Social_Media", function(req,res){
    var rows = Social_Media.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Social_Media/:id', function (req, res) {
   Social_Media.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Social_Media/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Social_Media(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Social_Media/:id", function(req,res){
    Social_Media.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song_Artist = require("../Models/Song_Artist.js");


router.post("/api/Song_Artist", function (req,res){
    var al = Object.assign(new Song_Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song_Artist", function(req,res){
    var rows = Song_Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song_Artist/:id', function (req, res) {
   Song_Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song_Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song_Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song_Artist/:id", function(req,res){
    Song_Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song = require("../Models/Song.js");


router.post("/api/Song", function (req,res){
    var al = Object.assign(new Song(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song", function(req,res){
    var rows = Song.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song/:id', function (req, res) {
   Song.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song/:id", function(req,res){
    Song.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Album = require("../Models/Album.js");


router.post("/api/Album", function (req,res){
    var al = Object.assign(new Album(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Album", function(req,res){
    var rows = Album.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Album/:id', function (req, res) {
   Album.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Album/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Album(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Album/:id", function(req,res){
    Album.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist_SocialMedia = require("../Models/Artist_SocialMedia.js");


router.post("/api/Artist_SocialMedia", function (req,res){
    var al = Object.assign(new Artist_SocialMedia(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist_SocialMedia", function(req,res){
    var rows = Artist_SocialMedia.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist_SocialMedia/:id', function (req, res) {
   Artist_SocialMedia.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist_SocialMedia/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist_SocialMedia(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist_SocialMedia/:id", function(req,res){
    Artist_SocialMedia.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist = require("../Models/Artist.js");


router.post("/api/Artist", function (req,res){
    var al = Object.assign(new Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist", function(req,res){
    var rows = Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist/:id', function (req, res) {
   Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist/:id", function(req,res){
    Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Company = require("../Models/Company.js");


router.post("/api/Company", function (req,res){
    var al = Object.assign(new Company(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Company", function(req,res){
    var rows = Company.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Company/:id', function (req, res) {
   Company.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Company/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Company(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Company/:id", function(req,res){
    Company.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Genre = require("../Models/Genre.js");


router.post("/api/Genre", function (req,res){
    var al = Object.assign(new Genre(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Genre", function(req,res){
    var rows = Genre.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Genre/:id', function (req, res) {
   Genre.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Genre/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Genre(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Genre/:id", function(req,res){
    Genre.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Producer = require("../Models/Producer.js");


router.post("/api/Producer", function (req,res){
    var al = Object.assign(new Producer(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Producer", function(req,res){
    var rows = Producer.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Producer/:id', function (req, res) {
   Producer.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Producer/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Producer(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Producer/:id", function(req,res){
    Producer.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Record_Label = require("../Models/Record_Label.js");


router.post("/api/Record_Label", function (req,res){
    var al = Object.assign(new Record_Label(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Record_Label", function(req,res){
    var rows = Record_Label.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Record_Label/:id', function (req, res) {
   Record_Label.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Record_Label/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Record_Label(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Record_Label/:id", function(req,res){
    Record_Label.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Social_Media = require("../Models/Social_Media.js");


router.post("/api/Social_Media", function (req,res){
    var al = Object.assign(new Social_Media(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Social_Media", function(req,res){
    var rows = Social_Media.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Social_Media/:id', function (req, res) {
   Social_Media.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Social_Media/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Social_Media(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Social_Media/:id", function(req,res){
    Social_Media.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song_Artist = require("../Models/Song_Artist.js");


router.post("/api/Song_Artist", function (req,res){
    var al = Object.assign(new Song_Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song_Artist", function(req,res){
    var rows = Song_Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song_Artist/:id', function (req, res) {
   Song_Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song_Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song_Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song_Artist/:id", function(req,res){
    Song_Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song = require("../Models/Song.js");


router.post("/api/Song", function (req,res){
    var al = Object.assign(new Song(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song", function(req,res){
    var rows = Song.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song/:id', function (req, res) {
   Song.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song/:id", function(req,res){
    Song.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Album = require("../Models/Album.js");


router.post("/api/Album", function (req,res){
    var al = Object.assign(new Album(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Album", function(req,res){
    var rows = Album.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Album/:id', function (req, res) {
   Album.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Album/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Album(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Album/:id", function(req,res){
    Album.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist_SocialMedia = require("../Models/Artist_SocialMedia.js");


router.post("/api/Artist_SocialMedia", function (req,res){
    var al = Object.assign(new Artist_SocialMedia(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist_SocialMedia", function(req,res){
    var rows = Artist_SocialMedia.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist_SocialMedia/:id', function (req, res) {
   Artist_SocialMedia.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist_SocialMedia/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist_SocialMedia(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist_SocialMedia/:id", function(req,res){
    Artist_SocialMedia.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Artist = require("../Models/Artist.js");


router.post("/api/Artist", function (req,res){
    var al = Object.assign(new Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Artist", function(req,res){
    var rows = Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Artist/:id', function (req, res) {
   Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Artist/:id", function(req,res){
    Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Company = require("../Models/Company.js");


router.post("/api/Company", function (req,res){
    var al = Object.assign(new Company(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Company", function(req,res){
    var rows = Company.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Company/:id', function (req, res) {
   Company.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Company/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Company(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Company/:id", function(req,res){
    Company.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Genre = require("../Models/Genre.js");


router.post("/api/Genre", function (req,res){
    var al = Object.assign(new Genre(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Genre", function(req,res){
    var rows = Genre.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Genre/:id', function (req, res) {
   Genre.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Genre/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Genre(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Genre/:id", function(req,res){
    Genre.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Producer = require("../Models/Producer.js");


router.post("/api/Producer", function (req,res){
    var al = Object.assign(new Producer(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Producer", function(req,res){
    var rows = Producer.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Producer/:id', function (req, res) {
   Producer.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Producer/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Producer(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Producer/:id", function(req,res){
    Producer.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Record_Label = require("../Models/Record_Label.js");


router.post("/api/Record_Label", function (req,res){
    var al = Object.assign(new Record_Label(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Record_Label", function(req,res){
    var rows = Record_Label.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Record_Label/:id', function (req, res) {
   Record_Label.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Record_Label/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Record_Label(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Record_Label/:id", function(req,res){
    Record_Label.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Social_Media = require("../Models/Social_Media.js");


router.post("/api/Social_Media", function (req,res){
    var al = Object.assign(new Social_Media(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Social_Media", function(req,res){
    var rows = Social_Media.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Social_Media/:id', function (req, res) {
   Social_Media.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Social_Media/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Social_Media(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Social_Media/:id", function(req,res){
    Social_Media.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song_Artist = require("../Models/Song_Artist.js");


router.post("/api/Song_Artist", function (req,res){
    var al = Object.assign(new Song_Artist(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song_Artist", function(req,res){
    var rows = Song_Artist.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song_Artist/:id', function (req, res) {
   Song_Artist.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song_Artist/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song_Artist(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song_Artist/:id", function(req,res){
    Song_Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


var Song = require("../Models/Song.js");


router.post("/api/Song", function (req,res){
    var al = Object.assign(new Song(),req.body);
    al.save(function(result){
      res.send();
    });

    
});

router.get("/api/Song", function(req,res){
    var rows = Song.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Song/:id', function (req, res) {
   Song.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Song/:id",function(req, res){
    var aux = {"id": parseInt(req.params.id)};
    var al = Object.assign(new Song(), aux, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Song/:id", function(req,res){
    Song.delete(req.params.id,
       function(result){
        res.json(result);
    });
})


module.exports = router;