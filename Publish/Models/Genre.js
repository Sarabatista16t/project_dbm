var sqlitewrapper = require("../Database/sqlite-wrapper.js")('./Publish/Database/projeto/projeto')
 
const schemaGenre = require('../Schemas/Schema-Genre.json');

const jsf = require('json-schema-faker');
const faker = require('faker');
jsf.extend('faker', () => { return faker });

class Genre {
 constructor (id,name) {
     
    this.name = name;

    Object.defineProperty(this, "Song_id", { enumerable: false, writable: true });
    Object.defineProperty(this,"id", { enumerable: false, writable: true });

}
static create() {
 return Object.assign(new Genre(), jsf.generate(schemaGenre));
}
/////////////
static all (callback){
    sqlitewrapper.where("SELECT * FROM Genre", [], Genre, callback)
}
 
static get(id, callback){
    sqlitewrapper.where("SELECT * FROM Genre WHERE id = ?", [id], Genre, callback)
}
static delete(id, callback) {
    sqlitewrapper.run("DELETE FROM Genre WHERE id = ?", [id], callback)
}
static many(model,id, callback){
    let tablename = ('Genre' < model) ? 'Genre'+ "_" + model : model + "_" +'Genre' ;
    sqlitewrapper.where("SELECT * FROM Genre INNER JOIN  "+tablename+" ON "+tablename+".Genre_id = Genre.id WHERE  "+tablename+"."+model+"_id = ?", [id],Genre, callback);
}

static top(property,order,limit,callback){
    sqlitewrapper.where("SELECT * FROM Genre ORDER BY "+property+" "+order+" LIMIT "+limit, [], Genre, callback);
}

save(callback){
    if(this.id){
        let attr = [];
       attr.push('name =  ?');
        let values = '?,'
        let params =  [ this.name  ];
        let manymany = [];
        if(this.Song_id)  {
            if('M-M' == '1-M'){
            attr.push('Song_id =  ?');
            values += '?,';
            params.push(this.Song_id)
            }else if('M-M' == 'M-M'){
                if(Array.isArray(this.Song_id)){
                    manymany.push({stmt:"INSERT INTO Genre_Song (Genre_id, Song_id) values "+ Array(this.Song_id.length).fill("(?,?)").join(","), params: repeatValues(this.Song_id, this.id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Genre_Song (Genre_id, Song_id) values (?,?)",  params: [this.id, this.Song_id]}); 
                }
            }
        }
        params.push(this.id);
        values = values.slice(0, -1);
        var l = "UPDATE Genre SET "+attr.join(',')+" WHERE id = ?";
        sqlitewrapper.run(l,params,()=>{
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
    }else{
        let attr = [];
 attr.push( 'name');
        let values = '?,'
        let params =  [ this.name  ];
        let manymany = [];
        if(this.Song_id)  {
            if('M-M' == '1-M'){
            attr.push('Song_id');
            values += '?,';
            params.push(this.Song_id)
            }
        }
        values = values.slice(0, -1);
        var l = "INSERT INTO Genre ("+attr.join(',')+") values ("+values+")";
   
        sqlitewrapper.run(l,params,(res)=>{
            manymany = manyTo(this, attr, values, params , res.lastId);
            if(manymany.length>0){
                aux(manymany,callback)
               
            }else{
                callback()
            }
            
        })
  
     
   } 
   function aux(statements, callback){
        var call = callback;
        var elem = statements.pop()
        if(statements.length>0) call =  aux(statements,callback)
        sqlitewrapper.run(elem['stmt'],elem['params'] , call)
    
   }
     function repeatValues(arr, stat){
        var arrFinal = []
       arr.forEach((elem)=>{
            arrFinal.push(stat);
            arrFinal.push(elem)
        })
        return arrFinal;
    }    
    
function manyTo(obj,attr, values, params , id){
    var manymany = []
        if(obj.Song_id)  {
           if('M-M' == 'M-M'){
                if(Array.isArray(obj.Song_id)){
                    manymany.push({stmt:"INSERT INTO Genre_Song (Genre_id, Song_id) values "+ Array(obj.Song_id.length).fill("(?,?)").join(","), params: repeatValues(obj.Song_id, id)}); 
                }else{
                    manymany.push({stmt:"INSERT INTO Genre_Song (Genre_id, Song_id) values (?,?)",  params: [id, obj.Song_id]}); 
                }
                manymany.push({stmt:"DELETE FROM Genre_Song WHERE Genre_id= ?", params: id })

            }
        }
        return manymany
    }
}
    
} 
 
module.exports = Genre