
module.exports = function(router){

var Aluno = require("../Models/Aluno.js");


router.post("/api/Aluno", function (req,res){
    var al = Object.assign(new Aluno(),req.body);
    al.save(function(result){
        console.log(result)
      res.send();
    });

    
});

router.get("/api/Aluno", function(req,res){
    var rows = Aluno.all(
    function(result){
        res.json(result);
    });
});

router.get('/api/Aluno/:id', function (req, res) {
   Aluno.get(req.params.id,
       function(result){
        res.json(result);
    });
}); 

router.put("/api/Aluno/:id",function(req, res){
    var j = {"id": parseInt(req.params.id)};
    console.log(j)
    

    console.log(j);
    var al = Object.assign(new Aluno(), j, req.body);
    al.save(function(result){
        res.json(result);
    });

    
});

router.delete("/api/Aluno/:id", function(req,res){
    Aluno.delete(req.params.id,
       function(result){
        res.json(result);
    });
})

}