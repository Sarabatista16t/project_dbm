
module.exports = function(router){

var Album = require("../Models/Album.js");


router.post("/api/Album", function (req,res){
    var al = Object.assign(new Album(),req.body);
    al.save(function(result){
        console.log(result)
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


var Song = require("../Models/Song.js");


router.post("/api/Song", function (req,res){
    var al = Object.assign(new Song(),req.body);
    al.save(function(result){
        console.log(result)
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

}