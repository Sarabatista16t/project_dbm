var express = require('express');
var router = express.Router();
const path = require('path');


var Album = require("../Models/Album.js");


router.post("/Album", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new Album(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/Album", function(req,res){
    var rows = Album.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/Album/:id', function (req, res) {
   Album.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/Album/:id",function(req, res){
    Album.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new Album(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/Album/:id", function(req,res){
    Album.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/Album/:model/:id', function (req, res) {
    Album.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var Artist = require("../Models/Artist.js");


router.post("/Artist", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new Artist(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/Artist", function(req,res){
    var rows = Artist.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/Artist/:id', function (req, res) {
   Artist.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/Artist/:id",function(req, res){
    Artist.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new Artist(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/Artist/:id", function(req,res){
    Artist.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/Artist/:model/:id', function (req, res) {
    Artist.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var Genre = require("../Models/Genre.js");


router.post("/Genre", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new Genre(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/Genre", function(req,res){
    var rows = Genre.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/Genre/:id', function (req, res) {
   Genre.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/Genre/:id",function(req, res){
    Genre.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new Genre(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/Genre/:id", function(req,res){
    Genre.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/Genre/:model/:id', function (req, res) {
    Genre.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var Producer = require("../Models/Producer.js");


router.post("/Producer", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new Producer(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/Producer", function(req,res){
    var rows = Producer.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/Producer/:id', function (req, res) {
   Producer.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/Producer/:id",function(req, res){
    Producer.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new Producer(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/Producer/:id", function(req,res){
    Producer.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/Producer/:model/:id', function (req, res) {
    Producer.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var RecordLabel = require("../Models/RecordLabel.js");


router.post("/RecordLabel", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new RecordLabel(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/RecordLabel", function(req,res){
    var rows = RecordLabel.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/RecordLabel/:id', function (req, res) {
   RecordLabel.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/RecordLabel/:id",function(req, res){
    RecordLabel.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new RecordLabel(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/RecordLabel/:id", function(req,res){
    RecordLabel.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/RecordLabel/:model/:id', function (req, res) {
    RecordLabel.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var SocialMedia = require("../Models/SocialMedia.js");


router.post("/SocialMedia", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new SocialMedia(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/SocialMedia", function(req,res){
    var rows = SocialMedia.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/SocialMedia/:id', function (req, res) {
   SocialMedia.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/SocialMedia/:id",function(req, res){
    SocialMedia.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new SocialMedia(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/SocialMedia/:id", function(req,res){
    SocialMedia.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/SocialMedia/:model/:id', function (req, res) {
    SocialMedia.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});



var Song = require("../Models/Song.js");


router.post("/Song", function (req,res){
    console.log("BODY>>>>>> " + Object.keys(req.body))
    var al = Object.assign(new Song(),req.body);
    al.save(function(result){
      res.send(result);
    });
});

router.get("/Song", function(req,res){
    var rows = Song.all(
    function(result){
        var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
});

router.get('/Song/:id', function (req, res) {
   Song.get(req.params.id,
       function(result){
         var r = [];
        for(var i in result){
            var key = result[i];
            var prop = Object.getOwnPropertyNames(key);
            var elem ={}
            prop.forEach((p)=>{
                elem[p]=(key[p])
            })
            r.push(elem)
        }
        res.json(r);
    });
}); 

router.put("/Song/:id",function(req, res){
    Song.get(req.params.id, (obj)=>{
        var o = obj[0]
        var data = {};
        Object.getOwnPropertyNames(o).forEach((val,index,arr)=>{
            data[val]= o[val];
        }) 
        var al = Object.assign(new Song(),data, req.body);
        al.save(function(result){
            res.json(result);
        });
    })
    

    
});

router.delete("/Song/:id", function(req,res){
    Song.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

router.get('/Song/:model/:id', function (req, res) {
    Song.many(req.params.model, req.params.id, (rows) => {
        res.json(rows)});
});




module.exports = router